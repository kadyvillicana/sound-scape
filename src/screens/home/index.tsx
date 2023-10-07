import React, { FC, useEffect, useState } from "react";
import { API_KEY } from "@env";
import axios from "axios";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import MainAreaView from "../../components/main-area-view";
import CustomText from "../../components/custom-text";
import CustomImage from "../../components/custom-image";
import { NavigationProp } from "@react-navigation/native";

interface Artist {
  name: string;
  mbid: string;
  url: string;
}

interface ImageP {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

interface Track {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any, any>;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const defaultTracks: Track[] = [];

  const [tracks, setTracks] = useState(defaultTracks);
  const [isLoading, setIsLoading] = useState(false);

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

  const trackItem = (track: Track) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 10,
        }}
        onPress={() => navigation.navigate("Details")}
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
        renderItem={({ item }) => trackItem(item)}
      />
    </MainAreaView>
  );
};
