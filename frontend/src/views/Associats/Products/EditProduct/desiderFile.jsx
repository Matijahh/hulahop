import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { Stage, Layer, Rect, Text, Image, Transformer } from "react-konva";
import { ChromePicker } from "react-color";

const DesignCanvas = () => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [selectedId, selectShape] = useState(null);
  const [tshirtImage, setTshirtImage] = useState(null);

  const stageRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const image = new window.Image();
    image.src = "/tshirt.png";
    image.onload = () => setTshirtImage(image);
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = tshirtImage.width;
    canvas.height = tshirtImage.height;

    // Draw T-shirt image
    // context.drawImage(tshirtImage, 0, 0, tshirtImage.width, tshirtImage.height);

    // Draw canvas content
    const dataURL = stageRef.toDataURL();
    const canvasImage = new window.Image();
    canvasImage.src = dataURL;
    context.drawImage(canvasImage, 0, 0);

    // Trigger download
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "tshirt_design.png";
    a.click();
  };

  return (
    <div>
      <Stage
        width={400}
        height={400}
        onMouseDown={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      >
        <Layer>
          <Image image={"https://picsum.photos/200"} width={400} height={400} />

          <Rect
            width={200}
            height={300}
            fill="white"
            draggable
            onClick={(e) => selectShape(e.target)}
          />
          <Text
            text={text}
            x={100}
            y={150}
            fontSize={20}
            fill={color}
            draggable
            onClick={(e) => selectShape(e.target)}
          />
          {selectedId && (
            <Transformer
              anchorSize={6}
              borderEnabled={false}
              keepRatio={false}
              rotateEnabled={false}
              node={stageRef.findOne(`.${selectedId}`)}
            />
          )}
        </Layer>
      </Stage>
      <div>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder={t("Enter text")}
        />
        <ChromePicker
          color={color}
          onChange={(color) => handleColorChange(color)}
        />
        <button onClick={handleDownload}>{t("Download Design")}</button>
      </div>
    </div>
  );
};

export default DesignCanvas;
