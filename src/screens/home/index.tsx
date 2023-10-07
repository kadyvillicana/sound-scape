import React, { FC, useEffect, useState } from "react";
import { API_KEY } from "@env";
import axios from "axios";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, DimensionValue } from "react-native";
import MainAreaView from "../../components/main-area-view";
import CustomText from "../../components/custom-text";
import CustomImage from "../../components/custom-image";
import { usePlayerContext } from "../../context/player-context";
import { Slider } from "@miblanchard/react-native-slider";

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

// interface HomeScreenProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   navigation: NavigationProp<any, any>;
// }

export const HomeScreen: FC = () => {
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
    setSliderBackgroundWidth(`${sliderValue.toFixed(2) * 100}%`);
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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View>
            <CustomText style={{}} fontSize="small">
              Another text
            </CustomText>
          </View>
          <View>
            <CustomText style={{}} fontSize="regular">
              {track.name}
            </CustomText>
          </View>
          <View>
            <CustomText style={{}} fontSize="medium">
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
    <MainAreaView styles={{ backgroundColor: "blue" }}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.mbid}
        renderItem={({ item, index }) => trackItem(item, index)}
      />
      {currentTrack && currentTrack.name !== "" && (
        <View
          style={{
            flex: 1,
            width: "100%",
            position: "absolute",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            bottom: 0.01,
            paddingBottom: 30,
            backgroundColor: "yellow",
            height: 150,
          }}
        >
          {/* <View style={[styles.colorView, { flex: sliderValue + 1, backgroundColor: "blue" }]} /> */}
          <View
            style={[
              styles.colorView,
              {
                flex: 1,
                width: sliderBackgroundWidth,
                backgroundColor: "red",
                height: 200,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            ]}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomImage
              imgSize="small"
              isCircle
              imgSrc={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
              }}
            />
            <Text>{currentTrack.name}</Text>
          </View>
          <View>
            <Slider
              minimumValue={0}
              maximumValue={1}
              value={sliderValue}
              onValueChange={(value) => setSliderValue(value[0])}
              // animateTransitions
              // minimumTrackTintColor="#d14ba6"
              // thumbStyle={styles.thumb}
              // trackStyle={styles.track}
            />
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
  },
});
