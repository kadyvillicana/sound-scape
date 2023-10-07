import React, { FC, useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { API_KEY } from "@env";
import axios from "axios";

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

export const HomeScreen: FC = () => {
  const defaultTracks: Track[] = [];

  const [tracks, setTracks] = useState(defaultTracks);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (): Promise<void> => {
    setIsLoading(true);
    const { data } = await axios.get<GetTracksResponse>(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=${API_KEY}&format=json&limit=10`,
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <Image
            style={{
              width: 65,
              height: 65,
            }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ padding: 5 }}>
            <Text>Another text</Text>
          </View>
          <View style={{ padding: 5 }}>
            <Text>{track.name}</Text>
          </View>
          <View style={{ padding: 5 }}>
            <Text>{track.artist.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.mbid}
        renderItem={({ item }) => trackItem(item)}
      />
    </View>
  );
};
