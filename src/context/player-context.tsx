import React, { FC, createContext, useContext, useState } from "react";
import { Track } from "./tracks-context";

interface PlayerContextValues {
  currentTrack: Track;
  setCurrentTrack: any;
  findImageBySize: (arg: string) => string;
}

const defaultTrack: Track = {
  name: "",
  duration: 0,
  listeners: 0,
  mbid: "",
  url: "",
  artist: {
    name: "",
    mbid: "string",
    url: "string",
  },
  image: [],
};

export interface GetTrackInfoResponse {
  track: Track;
}

export const PlayerContext = createContext<PlayerContextValues | undefined>(undefined);

export const PlayerContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(defaultTrack);

  const findImageBySize = (imgSize: string) => {
    if (!currentTrack.image) {
      return "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
    }
    for (const image of currentTrack.image) {
      if (image.size === imgSize) {
        return image["#text"];
      }
    }
    return "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack, findImageBySize }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = (): PlayerContextValues => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("Attempt to use player context outside its scope");
  return ctx;
};
