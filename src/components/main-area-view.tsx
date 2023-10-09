import React, { ReactNode, FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../styles/variables";

interface MainAreaViewProps {
  children: ReactNode; // The content to be displayed inside the MainAreaView
  style?: ViewStyle; // Additional styles for the MainAreaView (optional)
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.mainBackgroundColor,
  },
});

const MainAreaView: FC<MainAreaViewProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.mainView,
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default MainAreaView;
