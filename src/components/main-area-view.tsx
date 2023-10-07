import React, { ReactNode, FC } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MainAreaViewProps {
  children: ReactNode; // The content to be displayed inside the MainAreaView
  styles?: ViewStyle; // Additional styles for the MainAreaView (optional)
}

const MainAreaView: FC<MainAreaViewProps> = ({ children, styles }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles,
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default MainAreaView;
