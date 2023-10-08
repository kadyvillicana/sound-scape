import React, { FC, createContext, useContext } from "react";
import useBoundedArray from "../hooks/use-bounded-array";
// import { Track } from "./tracks-context";

interface ProfileContextValues {
  listenedTracks: any;
  setListenedTracks: any;
}

export const ProfileContext = createContext<ProfileContextValues | undefined>(undefined);

export const ProfileContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listenedTracks, setListenedTracks] = useBoundedArray();

  return (
    <ProfileContext.Provider value={{ listenedTracks, setListenedTracks }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("Attempt to use profile context outside its scope");
  return ctx;
};
