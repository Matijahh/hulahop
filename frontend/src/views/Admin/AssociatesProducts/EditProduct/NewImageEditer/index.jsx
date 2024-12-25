/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useRef, useState } from "react";
import useImage from "use-image";
import { get } from "lodash";

import { Stage, Layer, Image, Transformer, Rect, Group } from "react-konva";
import { ImageContainer } from "../styled";

import DeleteIcon from "@mui/icons-material/Delete";

const ImageComponent = ({
  imageProps,
  isSelected,
  onSelect,
  onChange,
  dragBoundFunc,
}) => {
  const [image] = useImage(imageProps.image, "anonymous", "origin");

  const imageRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={imageRef}
        {...imageProps}
        draggable
        image={image}
        onDragEnd={(e) => {
          onChange({
            ...imageProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...imageProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        dragBoundFunc={dragBoundFunc}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          ignoreStroke={true}
          keepRatio={true} // Ensure the aspect ratio is maintained during transformation
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const NewImageEditor = ({
  imgURL,
  pickImageUrl,
  formik,
  selectedId,
  selectImage,
  imageRef,
  productData,
  handleSubmit,
  setShowFrame,
  showFrame,
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState([]);

  const stageRef = useRef();

  const MainImage = useMemo(() => {
    return () => {
      const [mainProductImage, status] = useImage(
        imgURL,
        "anonymous",
        "origin"
      );

      return (
        <Image
          width={500}
          height={500}
          className="main-image"
          image={mainProductImage}
        />
      );
    };
  }, [imgURL]);

  useEffect(() => {
    setLoading(true);

    const savedState = localStorage.getItem("canvasState");

    if (pickImageUrl !== images[0]?.image) {
      setImages([
        {
          x: get(productData, "x_position"),
          y: get(productData, "y_position"),
          width: get(productData, "frame_width") * 0.7,
          height: get(productData, "frame_height") * 0.7,
          image: pickImageUrl,
          id: "image1",
        },
      ]);
    } else if (savedState) {
      setImages(JSON.parse(savedState));
    }

    const mainProductImage = new window.Image();

    mainProductImage.src = imgURL;
    mainProductImage.onload = () => {
      setLoading(false);
    };

    return () => {
      mainProductImage.onload = null;
    };
  }, [pickImageUrl]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("canvasState");
    };
  }, []);

  useEffect(() => {
    if (formik.values?.customizedJson?.imageObj) {
      localStorage.setItem(
        "canvasState",
        formik.values?.customizedJson?.imageObj
      );
      setImages(JSON.parse(formik.values?.customizedJson?.imageObj));
    }
  }, [formik.values?.customizedJson?.imageObj]);

  useEffect(() => {
    if (
      images.length > 0 &&
      images[0].image &&
      typeof images[0].image !== "object"
    ) {
      localStorage.setItem("canvasState", JSON.stringify(images));
      formik.setFieldValue("customizedJson", {
        ...formik.values.customizedJson,
        imageObj: JSON.stringify(images),
      });
    }
  }, [images]);

  const removeImage = () => {
    const updatedImages = images.filter((img) => img.id !== selectedId);
    setImages(updatedImages);
    localStorage.removeItem("canvasState");
  };

  const SaveImage = async () => {
    const stage = stageRef.current.getStage();
    selectImage(null);
    setShowFrame(false);

    const dataURL = await stage.toDataURL({
      mimeType: "image/png",
      quality: 1.0,
    });

    handleSubmit(dataURL);
  };

  const dragBoundFunc = (pos, imageProps) => {
    return {
      x: Math.min(
        Math.max(pos.x, get(productData, "x_position")),
        parseFloat(get(productData, "x_position")) +
          parseFloat(get(productData, "frame_width")) -
          imageProps.width
      ),
      y: Math.min(
        Math.max(pos.y, get(productData, "y_position")),
        parseFloat(get(productData, "y_position")) +
          parseFloat(get(productData, "frame_height")) -
          imageProps.height
      ),
    };
  };

  return (
    <ImageContainer>
      <div className="image-action-buttons">
        <div className="button-list">
          <div className="list-item">
            <DeleteIcon onClick={removeImage} />
          </div>
          <div
            className="item"
            onClick={() => SaveImage()}
            ref={imageRef}
          ></div>
        </div>
      </div>

      <div className="container-canvas">
        <Stage width={500} height={500} ref={stageRef}>
          <Layer>
            <MainImage />
            {showFrame && (
              <Rect
                x={get(productData, "x_position")}
                y={get(productData, "y_position")}
                width={get(productData, "frame_width")}
                height={get(productData, "frame_height")}
                stroke="black"
                strokeWidth={1}
              />
            )}
            <Group
              clipFunc={(ctx) => {
                ctx.rect(
                  get(productData, "x_position"),
                  get(productData, "y_position"),
                  get(productData, "frame_width"),
                  get(productData, "frame_height")
                );
              }}
            >
              {images.map((img, i) => {
                return (
                  <ImageComponent
                    key={i}
                    imageProps={img}
                    isSelected={img.id === selectedId}
                    onSelect={() => {
                      selectImage(img.id);
                    }}
                    onChange={(newAttrs) => {
                      const updatedImages = images.slice();
                      updatedImages[i] = newAttrs;
                      setImages(updatedImages);
                      selectImage(null);
                      setShowFrame(false);
                    }}
                    dragBoundFunc={(po) => dragBoundFunc(po, img)}
                  />
                );
              })}
            </Group>
          </Layer>
        </Stage>
      </div>
    </ImageContainer>
  );
};

export default NewImageEditor;
