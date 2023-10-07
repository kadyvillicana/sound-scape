import React, { FC } from "react";
import { Dimensions, Image, ImageSourcePropType } from "react-native";

interface CustomImageProps {
  imgSrc: ImageSourcePropType; // Image source, e.g., {uri: 'https://example.com/image.jpg'}
  imgSize?: "small" | "medium" | "large" | "extralarge"; // Size of the image (optional)
}

const CustomImage: FC<CustomImageProps> = ({ imgSrc, imgSize }) => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  const getImgSize = (size: string) => {
    switch (size) {
      case "small":
        return 0.04;
      case "medium":
        return 0.08;
      case "large":
        return 0.15;
      case "extralarge":
        return 0.3;
      default:
        return 0.08;
    }
  };

  const size = getImgSize(imgSize || "small");

  return (
    <Image
      style={[
        {
          resizeMode: "cover",
          width: SCREEN_HEIGHT * size,
          height: SCREEN_HEIGHT * size,
          borderRadius: 10,
        },
      ]}
      source={imgSrc}
    />
  );
};

export default CustomImage;
