import { memo, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Stage, Layer, Image as KImage, Group, Rect } from "react-konva";
import styled, { css } from "styled-components";
import useImage from "use-image";
import { get } from "lodash";

/* ---------------------------- styled container ---------------------------- */

const Container = styled.div`
  canvas {
    border-radius: 10px;
    width: 100% !important;
    position: relative !important;
    height: 100% !important;
  }

  .konvajs-content {
    width: 100% !important;
    height: 100% !important;

    ${(props) => {
      if (props.autoHeight) {
        return css``;
      } else if (props.maxHeight) {
        return css`
          height: ${props.maxHeight} !important;
        `;
      } else {
        return css`
          height: auto !important;
        `;
      }
    }}
  }
`;

/* --------------------------------- helpers -------------------------------- */

const CANVAS_W = 500;
const CANVAS_H = 500;

// Insert "/compressed" after "images" segment if present
function withCompressed(url) {
  if (!url) return url;
  const idx = url.indexOf("images");
  return idx === -1
    ? url
    : url.slice(0, idx + 6) + "/compressed" + url.slice(idx + 6);
}

function isValidNumber(n) {
  return typeof n === "number" && Number.isFinite(n);
}

/* ------------------------- small, focused components ---------------------- */

// Background product image (compressed), stretched to canvas.
// Calls onNaturalSize ONLY when size changes or URL changes.
const BaseImage = memo(function BaseImage({ url, onNaturalSize }) {
  const [img, status] = useImage(url, "anonymous", "origin");
  const lastReportedRef = useRef({ url: null, w: null, h: null });

  useEffect(() => {
    if (status !== "loaded" || !img) return;

    const w = img.naturalWidth || img.width || 0;
    const h = img.naturalHeight || img.height || 0;

    // Only report if: we have dimensions, AND
    //   - url changed, OR
    //   - dimensions changed
    const changed =
      url !== lastReportedRef.current.url ||
      w !== lastReportedRef.current.w ||
      h !== lastReportedRef.current.h;

    if (w > 0 && h > 0 && changed) {
      lastReportedRef.current = { url, w, h };
      onNaturalSize?.(w, h);
    }
  }, [status, url, img, onNaturalSize]);

  return (
    <KImage
      image={img || undefined}
      width={CANVAS_W}
      height={CANVAS_H}
      listening={false}
      perfectDrawEnabled={false}
    />
  );
});

// Design image (compressed). One request only via useImage.
const DesignImage = memo(function DesignImage({ item }) {
  const [img] = useImage(item.image, "anonymous", "origin");
  return (
    <KImage
      x={item.x}
      y={item.y}
      rotation={item.rotation}
      width={item.width}
      height={item.height}
      image={img || undefined}
      listening={false}
      perfectDrawEnabled={false}
    />
  );
});

/* ------------------------------- main comp -------------------------------- */

const PreviewJsonImage = ({
  previewImageUrl,
  json = [],
  autoHeight = false,
  back,
  maxHeight,
  productData,
  debugClip = false, // set true to visualize the clip rect
}) => {
  const stageRef = useRef(null);

  // Only update if size actually changed (prevents render loops)
  const [{ w: natW, h: natH }, setNatural] = useState({
    w: CANVAS_W,
    h: CANVAS_H,
  });
  const handleNaturalSize = useCallback((w, h) => {
    setNatural((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
  }, []);

  // Always use compressed URLs for PRODUCT and DESIGN to avoid huge downloads
  const baseUrl = useMemo(
    () => withCompressed(previewImageUrl),
    [previewImageUrl]
  );
  const designItems = useMemo(
    () =>
      (Array.isArray(json) ? json : []).map((it) => ({
        ...it,
        image: withCompressed(it.image),
        // coerce numeric fields just in case
        x: Number(it.x),
        y: Number(it.y),
        width: Number(it.width),
        height: Number(it.height),
        rotation: Number(it.rotation) || 0,
      })),
    [json]
  );

  // Raw clip values from productData (may be original image coords)
  const rawX = back
    ? get(productData, "product.x_position_back")
    : get(productData, "product.x_position");
  const rawY = back
    ? get(productData, "product.y_position_back")
    : get(productData, "product.y_position");
  const rawW = back
    ? get(productData, "product.frame_width_back")
    : get(productData, "product.frame_width");
  const rawH = back
    ? get(productData, "product.frame_height_back")
    : get(productData, "product.frame_height");

  const ox = Number(rawX);
  const oy = Number(rawY);
  const ow = Number(rawW);
  const oh = Number(rawH);

  // Scale factors from natural product image → canvas size
  const scaleX = natW ? CANVAS_W / natW : 1;
  const scaleY = natH ? CANVAS_H / natH : 1;

  // Heuristic: if clip looks too big for canvas, treat as original-space & scale
  const looksOriginalSpace =
    (isValidNumber(ow) && ow > CANVAS_W * 1.2) ||
    (isValidNumber(oh) && oh > CANVAS_H * 1.2) ||
    (isValidNumber(ox) && ox > CANVAS_W * 1.2) ||
    (isValidNumber(oy) && oy > CANVAS_H * 1.2);

  const clipX = looksOriginalSpace ? ox * scaleX : ox;
  const clipY = looksOriginalSpace ? oy * scaleY : oy;
  const clipW = looksOriginalSpace ? ow * scaleX : ow;
  const clipH = looksOriginalSpace ? oh * scaleY : oh;

  const hasClip =
    [clipX, clipY, clipW, clipH].every(isValidNumber) &&
    (clipW ?? 0) > 0 &&
    (clipH ?? 0) > 0;

  // If your design item coordinates are also in original space, scale them too:
  const designLooksOriginalSpace = designItems.some(
    (it) =>
      it.x > CANVAS_W * 1.2 ||
      it.y > CANVAS_H * 1.2 ||
      it.width > CANVAS_W * 1.2 ||
      it.height > CANVAS_H * 1.2
  );

  const scaledDesignItems = useMemo(
    () =>
      designLooksOriginalSpace
        ? designItems.map((it) => ({
            ...it,
            x: it.x * scaleX,
            y: it.y * scaleY,
            width: it.width * scaleX,
            height: it.height * scaleY,
          }))
        : designItems,
    [designItems, designLooksOriginalSpace, scaleX, scaleY]
  );

  const clipProps = hasClip
    ? { clipX, clipY, clipWidth: clipW, clipHeight: clipH }
    : {};

  return (
    <Container autoHeight={autoHeight} maxHeight={maxHeight}>
      <Stage
        ref={stageRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={{ width: "100%" }}
      >
        <Layer listening={false}>
          {/* Background (product) */}
          <BaseImage url={baseUrl} onNaturalSize={handleNaturalSize} />

          {/* Foreground (design), optionally clipped */}
          <Group listening={false} {...clipProps}>
            {scaledDesignItems.map((item) => (
              <DesignImage key={item.id} item={item} />
            ))}

            {debugClip && hasClip && (
              <Rect
                x={clipX}
                y={clipY}
                width={clipW}
                height={clipH}
                stroke="red"
                dash={[6, 4]}
                listening={false}
              />
            )}
          </Group>
        </Layer>
      </Stage>
    </Container>
  );
};

export default memo(PreviewJsonImage);
