import React, { useEffect, useMemo, useRef, useState } from "react";
import { get } from "lodash";
import useImage from "use-image";
import { REST_URL_SERVER } from "../../../../../utils/constant";

import { Stage, Layer, Image, Transformer, Rect, Group } from "react-konva";
import { ImageContainer } from "../styled";

import DeleteIcon from "@mui/icons-material/Delete";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import FlipToBackIcon from "@mui/icons-material/FlipToBack";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";

const ImageComponent = ({
  back,
  imageProps,
  isSelected,
  onSelect,
  onChange,
  productData,
}) => {
  const [image] = useImage(imageProps.image, "anonymous", "origin");
  const [dragging, setDragging] = useState(false);

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
      <Group
        draggable
        clipFunc={
          !dragging
            ? (ctx) => {
                ctx.rect(
                  back
                    ? get(productData, "x_position_back")
                    : get(productData, "x_position"),
                  back
                    ? get(productData, "y_position_back")
                    : get(productData, "y_position"),
                  back
                    ? get(productData, "frame_width_back")
                    : get(productData, "frame_width"),
                  back
                    ? get(productData, "frame_height_back")
                    : get(productData, "frame_height")
                );
              }
            : undefined
        }
      >
        <Image
          onClick={onSelect}
          onTap={onSelect}
          ref={imageRef}
          {...imageProps}
          draggable
          image={image}
          onDragStart={() => setDragging(true)}
          onDragEnd={(e) => {
            onChange({
              ...imageProps,
              x: e.target.x(),
              y: e.target.y(),
            });
            setDragging(false);
          }}
          opacity={dragging ? 0.3 : 1}
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
              rotation: e.target.attrs.rotation,
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
      </Group>
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
  setBackIndicator,
}) => {
  const [images, setImages] = useState([]);
  const [imagesBack, setImagesBack] = useState([]);
  const [back, setBack] = useState(false);

  const stageRef = useRef();
  const stageRefBack = useRef();

  const MainImage = useMemo(() => {
    return () => {
      const [mainProductImage, status] = useImage(
        back
          ? `${REST_URL_SERVER}/images/compressed/${get(
              productData,
              "image_id_back"
            )}`
          : imgURL,
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
  }, [productData, back, imgURL]);

  useEffect(() => {
    const savedState = back
      ? localStorage.getItem("canvasStateBack")
      : localStorage.getItem("canvasState");

    if (!back) {
      if (pickImageUrl !== images[0]?.image) {
        const img = new window.Image();
        img.src = pickImageUrl;
        const maxWidth = get(productData, "frame_width") * 0.7;
        const maxHeight = get(productData, "frame_height") * 0.7;
        const width = img?.width;
        const height = img?.height;
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        setImages([
          {
            x: parseInt(get(productData, "x_position")),
            y: parseInt(get(productData, "y_position")),
            width: width * ratio,
            height: height * ratio,
            image: pickImageUrl,
            id: "image1",
          },
        ]);
      } else if (savedState) {
        setImages(JSON.parse(savedState));
      }
    } else {
      if (pickImageUrl !== imagesBack[0]?.image) {
        const img = new window.Image();
        img.src = pickImageUrl;
        const maxWidth = get(productData, "frame_width_back") * 0.7;
        const maxHeight = get(productData, "frame_height_back") * 0.7;
        const width = img?.width;
        const height = img?.height;
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        setImagesBack([
          {
            x: parseInt(get(productData, "x_position_back")),
            y: parseInt(get(productData, "y_position_back")),
            width: width * ratio,
            height: height * ratio,
            image: pickImageUrl,
            id: "image1",
          },
        ]);
      } else if (savedState) {
        setImagesBack(JSON.parse(savedState));
      }
    }
  }, [pickImageUrl]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("canvasState");
      localStorage.removeItem("canvasStateBack");
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
    if (formik.values?.customizedJsonBack?.imageObj) {
      localStorage.setItem(
        "canvasStateBack",
        formik.values?.customizedJsonBack?.imageObj
      );
      setImagesBack(JSON.parse(formik.values?.customizedJsonBack?.imageObj));
    }
  }, [formik.values?.customizedJsonBack?.imageObj]);

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

  useEffect(() => {
    if (
      imagesBack.length > 0 &&
      imagesBack[0].image &&
      typeof imagesBack[0].image !== "object"
    ) {
      localStorage.setItem("canvasStateBack", JSON.stringify(imagesBack));
      formik.setFieldValue("customizedJsonBack", {
        ...formik.values.customizedJsonBack,
        imageObj: JSON.stringify(imagesBack),
      });
    }
  }, [imagesBack]);

  const removeImage = () => {
    // There is no need for this line of code since we are always going to have only one image and delete should remove it
    //const updatedImages = images.filter((img) => img.id !== selectedId);
    back ? setImagesBack([]) : setImages([]);
    back
      ? localStorage.removeItem("canvasStateBack")
      : localStorage.removeItem("canvasState");
  };

  const centerImage = () => {
    const updatedImages = (back ? imagesBack : images).map((img) => ({
      ...img,
      rotation: 0,
      x: back
        ? parseFloat(get(productData, "x_position_back"))
        : parseFloat(get(productData, "x_position")),
      y: back
        ? parseFloat(get(productData, "y_position_back"))
        : parseFloat(get(productData, "y_position")),
    }));
    back ? setImagesBack(updatedImages) : setImages(updatedImages);
  };

  const SaveImage = async () => {
    const stage = stageRef.current.getStage();
    const stageBack = stageRefBack.current.getStage();
    selectImage(null);

    const dataURL = await stage.toDataURL({
      mimeType: "image/png",
      quality: 1.0,
    });

    const dataURLBack = await stageBack.toDataURL({
      mimeType: "image/png",
      quality: 1.0,
    });

    handleSubmit(dataURL, dataURLBack);
  };

  return (
    <ImageContainer>
      <div className="image-action-buttons">
        <div className="button-list">
          <div className="list-item" onClick={removeImage}>
            <DeleteIcon />
          </div>
        </div>
        <div className="item" onClick={() => SaveImage()} ref={imageRef}></div>
        <div className="button-list">
          <div className="list-item" onClick={centerImage}>
            <ControlCameraIcon />
          </div>
        </div>
        {get(productData, "image_id_back") && (
          <div className="button-list">
            <div
              className="list-item"
              onClick={() => {
                setBackIndicator(!back);
                setBack(!back);
              }}
            >
              {back ? <FlipToFrontIcon /> : <FlipToBackIcon />}
            </div>
          </div>
        )}
      </div>
      <div className="container-canvas">
        {!back ? (
          <Stage width={500} height={500} ref={stageRef}>
            <Layer>
              <MainImage />
              <Rect
                x={get(productData, "x_position")}
                y={get(productData, "y_position")}
                width={get(productData, "frame_width")}
                height={get(productData, "frame_height")}
                stroke="#004E6480"
                strokeWidth={1}
                dashEnabled
                dash={[6]}
              />
              {images.map((img, i) => {
                return (
                  <ImageComponent
                    back={back}
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
                    productData={productData}
                  />
                );
              })}
            </Layer>
          </Stage>
        ) : (
          <Stage width={500} height={500} ref={stageRefBack}>
            <Layer>
              <MainImage />
              <Rect
                x={get(productData, "x_position_back")}
                y={get(productData, "y_position_back")}
                width={get(productData, "frame_width_back")}
                height={get(productData, "frame_height_back")}
                stroke="#004E6480"
                strokeWidth={1}
                dashEnabled
                dash={[6]}
              />
              {imagesBack.map((img, i) => {
                return (
                  <ImageComponent
                    back={back}
                    key={i}
                    imageProps={img}
                    isSelected={img.id === selectedId}
                    onSelect={() => {
                      selectImage(img.id);
                    }}
                    onChange={(newAttrs) => {
                      const updatedImages = imagesBack.slice();
                      updatedImages[i] = newAttrs;
                      setImagesBack(updatedImages);
                      selectImage(null);
                      setShowFrame(false);
                    }}
                    productData={productData}
                  />
                );
              })}
            </Layer>
          </Stage>
        )}
      </div>
    </ImageContainer>
  );
};

export default NewImageEditor;
