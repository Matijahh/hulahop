import { memo, useEffect, useMemo, useState } from "react";
import { get } from "lodash";
import { Stage, Layer, Image, Group } from "react-konva";
import styled, { css } from "styled-components";
import useImage from "use-image";

const Container = styled.div`
  canvas {
    border-radius: 6px 0 0px 0;
    width: 100% !important;
    position: relative !important;
    height: auto !important;
  }

  .konvajs-content {
    width: 100% !important;

    ${(props) => {
      if (props.autoHeight) {
        return css`
          /* height: unset !important; */
        `;
      } else if (props.maxHeight) {
        return css`
          height: ${props.maxHeight} !important;
        `;
      } else {
        return css`
          height: auto !important;
        `;
      }
    }}/* height: 250px !important; */
  }
`;

const PreviewJsonImage = ({
  previewImageUrl,
  json,
  autoHeight = false,
  maxHeight,
  productData,
}) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const MainImage = useMemo(() => {
    return () => {
      const [mainProductImage] = useImage(previewUrl, "anonymous", "origin");

      return (
        <Image
          width={500}
          height={500}
          className="main-image"
          image={mainProductImage}
        />
      );
    };
  }, [previewUrl]);

  useEffect(() => {
    const mainProductImage = new window.Image();
    mainProductImage.src = previewImageUrl;
    mainProductImage.onload = () => {
      setLoading(false);
    };
    return () => {
      mainProductImage.onload = null;
    };
  }, []);

  useEffect(() => {
    if (previewImageUrl) {
      const previewIndex = previewImageUrl.indexOf("images");
      const previewUrl =
        previewImageUrl.slice(0, previewIndex + 6) +
        "/compressed" +
        previewImageUrl.slice(previewIndex + 6);
      setPreviewUrl(previewUrl);
    }
  }, [previewImageUrl]);

  useEffect(() => {
    if (json) {
      const preview = json[0].image;
      const previewIndex = preview.indexOf("images");
      const previewUrl =
        preview.slice(0, previewIndex + 6) +
        "/compressed" +
        preview.slice(previewIndex + 6);
      json[0].image = previewUrl;
    }
  }, [json]);

  return (
    <Container autoHeight={autoHeight} maxHeight={maxHeight}>
      <Stage width={500} height={500} style={{ width: "100%" }}>
        <Layer
          style={{
            width: "100%",
          }}
        >
          <MainImage />
          <Group
            clipFunc={(ctx) => {
              productData &&
                ctx.rect(
                  get(productData, "product.x_position"),
                  get(productData, "product.y_position"),
                  get(productData, "product.frame_width"),
                  get(productData, "product.frame_height")
                );
            }}
          >
            {json?.map((item) => {
              const [imageURL] = useImage(item.image, "anonymous", "origin");

              return (
                <Image
                  key={item.id}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  image={imageURL}
                />
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </Container>
  );
};

export default memo(PreviewJsonImage);
