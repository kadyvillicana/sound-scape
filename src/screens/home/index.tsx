import React, { FC, useEffect, useState } from "react";
import { API_KEY } from "@env";
import axios from "axios";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, DimensionValue } from "react-native";
import MainAreaView from "../../components/main-area-view";
import CustomText from "../../components/custom-text";
import CustomImage from "../../components/custom-image";
import { usePlayerContext } from "../../context/player-context";
import { Slider } from "@miblanchard/react-native-slider";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../../styles/variables";

interface Artist {
  name: string;
  mbid: string;
  url: string;
}

interface ImageP {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

export interface Track {
  name: string;
  duration: number;
  listeners: number;
  mbid: string;
  url: string;
  artist: Artist;
  image: ImageP[];
}

interface Attr {
  country: string;
  page: number;
  perPage: number;
  totalPages: number;
  total: number;
}

interface Tracks {
  track: Track[];
  attr: Attr;
}

interface GetTracksResponse {
  tracks: Tracks;
}

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const defaultTracks: Track[] = [];

  const [tracks, setTracks] = useState(defaultTracks);
  const [isLoading, setIsLoading] = useState(false);
  const { currentTrack, setCurrentTrack } = usePlayerContext();
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderBackgroundWidth, setSliderBackgroundWidth] = useState<DimensionValue>("0%");

  const getData = async (): Promise<void> => {
    setIsLoading(true);
    const { data } = await axios.get<GetTracksResponse>(
      `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=${API_KEY}&format=json&limit=10`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    setTracks(data.tracks.track);
    setIsLoading(false);
  };

  useEffect(() => {
    void getData();
  }, []);

  useEffect(() => {
    setSliderBackgroundWidth(`${sliderValue * 100}%`);
  }, [sliderValue]);

  const playTrack = (idx: number) => {
    setCurrentTrack(tracks[idx]);
  };

  const trackItem = (track: Track, idx: number) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 10,
        }}
        onPress={() => playTrack(idx)}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <CustomImage
            imgSize={"medium"}
            imgSrc={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center", gap: 5 }}>
          <View>
            <CustomText fontSize="small">{track.listeners}</CustomText>
          </View>
          <View>
            <CustomText fontSize="regular" isPrimary style={{ fontWeight: "400" }}>
              {track.name}
            </CustomText>
          </View>
          <View>
            <CustomText fontSize="medium" style={{ fontWeight: "300" }}>
              {track.artist.name}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );

  return (
    <MainAreaView style={styles.mainView}>
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
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => navigation.navigate("Details")}
            >
              <CustomImage
                imgSize="small"
                isCircle
                imgSrc={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
                }}
              />
              <CustomText style={styles.miniPlayerTrackName}>{currentTrack.name}</CustomText>
            </TouchableOpacity>
            <View style={styles.miniPlayerControls}>
              <Icon name="backward" size={15} color={colors.secondaryFontColor} />
              <Icon name="play" size={25} color={colors.secondaryFontColor} />
              <Icon name="forward" size={15} color={colors.secondaryFontColor} />
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
  mainView: {
    backgroundColor: colors.mainBackgroundColor,
  },
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
    // alignItems: "center",
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
});
