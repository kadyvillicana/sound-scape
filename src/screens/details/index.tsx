import React, { FC, useEffect, useState } from "react";
import { DimensionValue, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomImage from "../../components/custom-image";
import CustomText from "../../components/custom-text";
import { usePlayerContext } from "../../context/player-context";
import { Slider } from "@miblanchard/react-native-slider";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../styles/variables";
import { NavigationProp } from "@react-navigation/native";
import { useTrackContext } from "../../context/tracks-context";
import MainAreaView from "../../components/main-area-view";

interface DetailScreenProps {
  navigation: NavigationProp<any, any>;
}

export const DetailScreen: FC<DetailScreenProps> = ({ navigation }) => {
  const { currentTrack, findImageBySize } = usePlayerContext();
  const { playNextTrack, playPastTrack } = useTrackContext();
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderBackgroundWidth, setSliderBackgroundWidth] = useState<DimensionValue>("0%");

  useEffect(() => {
    setSliderBackgroundWidth(`${sliderValue.toFixed(2) * 100}%`);
  }, [sliderValue]);

  return (
    <MainAreaView style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ellipsis-h" size={20} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <CustomText style={{ fontWeight: "400" }} fontSize="medium">
            Playing From
          </CustomText>
          <CustomText isPrimary style={{ fontWeight: "400" }}>
            Poll, Top Tracks this week
          </CustomText>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-down" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.trackContainer}>
        <View
          style={[
            styles.colorView,
            {
              width: sliderBackgroundWidth,
            },
          ]}
        />
        <View style={styles.imageContainer}>
          <CustomImage
            style={styles.trackImage}
            imgSize="extralarge"
            imgSrc={{
              uri: findImageBySize("extralarge"),
            }}
          />
        </View>
        <View style={{ paddingTop: 45, alignItems: "center", paddingLeft: 15, paddingRight: 15 }}>
          <CustomText fontSize="big" style={{ fontWeight: "500" }}>
            {currentTrack.name}
          </CustomText>
          <CustomText style={{ paddingTop: 15 }}>{currentTrack.artist.name}</CustomText>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "85%" }}>
            <Slider
              minimumValue={0}
              maximumValue={1}
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
              value={sliderValue}
              minimumTrackTintColor={colors.ternairyBackgroundColor}
              onValueChange={(value) => setSliderValue(value[0])}
            />
          </View>
        </View>
        <View style={styles.playerControls}>
          <TouchableOpacity onPress={playPastTrack}>
            <Icon name="backward" size={25} color={colors.secondaryFontColor} />
          </TouchableOpacity>
          <Icon name="play" size={40} color={colors.secondaryFontColor} />
          <TouchableOpacity onPress={playNextTrack}>
            <Icon name="forward" size={25} color={colors.secondaryFontColor} />
          </TouchableOpacity>
        </View>
      </View>
    </MainAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingBottom: 0,
  },
  colorView: {
    flex: 1,
    position: "absolute",
    backgroundColor: colors.progressBarBackgroundColor,
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    paddingTop: Platform.OS === "ios" ? 0 : 15,
  },
  headerText: {
    alignItems: "center",
  },
  trackContainer: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: colors.white,
  },
  imageContainer: {
    paddingTop: 65,
    alignItems: "center",
  },
  trackImage: {
    borderRadius: 50,
  },
  playerControls: {
    flexDirection: "row",
    gap: 55,
    paddingTop: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  thumb: {
    backgroundColor: colors.mainBackgroundColor,
    borderColor: colors.secondaryBackgroundColor,
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 20,
  },
  track: {
    backgroundColor: "white",
    borderRadius: 1,
    height: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },
});
