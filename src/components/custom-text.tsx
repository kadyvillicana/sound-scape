import React, { FC, ReactNode } from "react";
import { Text, ViewStyle } from "react-native";

interface CustomTextProps {
  children: ReactNode; // The content to be displayed inside the Text
  style?: ViewStyle;
  fontSize?: "small" | "medium" | "regular" | "big";
}

const CustomText: FC<CustomTextProps> = ({ children, style, fontSize }) => {
  const getFontSize = (size: string) => {
    switch (size) {
      case "regular":
        return 16;
      case "big":
        return 26;
      case "medium":
        return 14;
      case "small":
        return 12;
      default:
        return 16;
    }
  };

  const size = getFontSize(fontSize || "medium");

  return (
    <Text
      style={[
        {
          fontSize: size,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
