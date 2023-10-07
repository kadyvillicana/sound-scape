import React, { FC, createContext, useContext, useState } from "react";
import { Track } from "../screens/home";

interface PlayerContextValues {
  currentTrack: any;
  setCurrentTrack: any;
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

export const PlayerContext = createContext<PlayerContextValues | undefined>(undefined);

export const PlayerContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(defaultTrack);

  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = (): PlayerContextValues => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("Attempt to use error handle context outside its scope");
  return ctx;
};
