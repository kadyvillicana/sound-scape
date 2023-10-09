import React, { FC, useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  DimensionValue,
  Platform,
} from "react-native";

import MainAreaView from "../../components/main-area-view";
import CustomText from "../../components/custom-text";
import CustomImage from "../../components/custom-image";

import { usePlayerContext } from "../../context/player-context";
import { Track, useTrackContext } from "../../context/tracks-context";

import { Slider } from "@miblanchard/react-native-slider";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../../styles/variables";

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { tracks, playNextTrack, playTrack, playPastTrack } = useTrackContext();
  const { currentTrack, findImageBySize } = usePlayerContext();
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderBackgroundWidth, setSliderBackgroundWidth] = useState<DimensionValue>("0%");

  useEffect(() => {
    setSliderBackgroundWidth(`${sliderValue * 100}%`);
  }, [sliderValue]);

  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}></View>
        <View
          style={{
            flex: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomText isPrimary fontSize="medium" style={{ fontWeight: "500" }}>
            Top tracks - Mexico
          </CustomText>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <CustomImage
            imgSize="small"
            isCircle
            imgSrc={require("../../assets/images/profile-image.jpeg")}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const trackItem = (track: Track, idx: number) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 10,
        }}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <CustomImage
            imgSize={"small"}
            imgSrc={{
              uri: track.image[1]["#text"],
              cache: "only-if-cached",
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center", gap: 5 }}>
          <View>
            <CustomText
              fontSize="regular"
              isPrimary
              style={{
                fontWeight: "400",
                color:
                  currentTrack.mbid !== "" && track.mbid === currentTrack.mbid
                    ? colors.activeGreen
                    : colors.primaryFontColor,
              }}
            >
              {track.name}
            </CustomText>
          </View>
          <View>
            <CustomText fontSize="medium" style={{ fontWeight: "300" }}>
              {track.artist.name}
            </CustomText>
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingRight: 20,
            justifyContent: "center",
          }}
          onPress={() => playTrack(idx)}
        >
          {track.mbid === currentTrack.mbid ? (
            <Icon name="pause" size={25} color={colors.activeGreen} />
          ) : (
            <Icon name="play" size={25} color={colors.secondaryFontColor} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  if (tracks && tracks.length > 0 && tracks[0].name !== "")
    return (
      <MainAreaView>
        <Header />
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.mbid}
          renderItem={({ item, index }) => trackItem(item, index)}
        />
        {currentTrack && currentTrack.name !== "" && (
          <View style={styles.miniPlayer}>
            <View
              style={[
                styles.colorView,
                {
                  width: sliderBackgroundWidth,
                },
              ]}
            />
            <View style={styles.miniPlayerHeader}>
              <TouchableOpacity
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
                onPress={() => navigation.navigate("Details")}
              >
                <CustomImage
                  imgSize="small"
                  isCircle
                  imgSrc={{
                    uri: findImageBySize("small"),
                    cache: "only-if-cached",
                  }}
                />
                <View style={{ flex: 1 }}>
                  <CustomText style={styles.miniPlayerTrackName}>{currentTrack.name}</CustomText>
                </View>
              </TouchableOpacity>
              <View style={styles.miniPlayerControls}>
                <TouchableOpacity onPress={playPastTrack}>
                  <Icon name="backward" size={15} color={colors.secondaryFontColor} />
                </TouchableOpacity>
                <Icon name="play" size={25} color={colors.secondaryFontColor} />
                <TouchableOpacity onPress={playNextTrack}>
                  <Icon name="forward" size={15} color={colors.secondaryFontColor} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
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
          </View>
        )}
      </MainAreaView>
    );
};

const styles = StyleSheet.create({
  colorView: {
    flex: 1,
    position: "absolute",
    backgroundColor: colors.progressBarBackgroundColor,
    height: 200,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  miniPlayer: {
    flex: 1,
    width: "100%",
    position: "absolute",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    bottom: 0.01,
    backgroundColor: colors.secondaryBackgroundColor,
    height: 150,
  },
  miniPlayerHeader: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  miniPlayerTrackName: { fontWeight: "500", paddingLeft: 15 },
  miniPlayerControls: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Platform.OS === "ios" ? 0 : 15,
  },
});
