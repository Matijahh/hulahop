import { useEffect, useState } from "react";
import { Image as KonvaImage } from "react-konva";

const CustomImage = ({ imageUrl, ...props }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImage(img);
    };
    img.src = imageUrl;

    return () => {
      // Clean up on unmount if necessary
      if (img) {
        img.onload = null;
      }
    };
  }, [imageUrl]);

  return image ? <KonvaImage {...props} image={image} /> : null;
};

export default CustomImage;
