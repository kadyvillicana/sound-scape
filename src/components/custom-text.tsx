import React, { FC, ReactNode } from "react";
import { Text, TextStyle } from "react-native";
import { colors } from "../styles/variables";

interface CustomTextProps {
  children: ReactNode; // The content to be displayed inside the Text
  style?: TextStyle;
  fontSize?: "small" | "medium" | "regular" | "big";
  isPrimary?: boolean;
}

const CustomText: FC<CustomTextProps> = ({ children, style, fontSize, isPrimary }) => {
  const getFontSize = (size: string) => {
    switch (size) {
      case "regular":
        return 14;
      case "big":
        return 26;
      case "medium":
        return 12;
      case "small":
        return 10;
      default:
        return 16;
    }
  };

  const size = getFontSize(fontSize || "regular");

  return (
    <Text
      style={[
        {
          fontSize: size,
          fontWeight: "200",
          color: isPrimary ? colors.primaryFontColor : colors.secondaryFontColor,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
