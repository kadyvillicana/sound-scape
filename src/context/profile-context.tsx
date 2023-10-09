import React, { FC, createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileContextValues {
  listenedTracks: any;
  addListenedTrackToList: any;
}

export const ProfileContext = createContext<ProfileContextValues | undefined>(undefined);

export const ProfileContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listenedTracks, setListenedTracks] = useState([]);
  const MAX_ITEMS = 10;

  const addListenedTrackToList = (listenedTrack) => {
    setListenedTracks((prevItems) => {
      let updatedItems;
      if (prevItems && prevItems.find((dup) => dup.mbid === listenedTrack.mbid)) {
        updatedItems = prevItems;
      } else if (prevItems.length >= MAX_ITEMS) {
        updatedItems = [...prevItems.slice(0, 9), listenedTrack];
      } else {
        updatedItems = [...prevItems, listenedTrack];
      }

      try {
        void AsyncStorage.setItem("listened_tracks", JSON.stringify(updatedItems));
      } catch (err) {
        console.log("Failed to set item", err);
      }

      return updatedItems;
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("listened_tracks");
        if (storedData !== null) {
          setListenedTracks(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Failed to load the data from storage", error);
      }
    };
    void loadData();
  }, []);

  return (
    <ProfileContext.Provider value={{ listenedTracks, addListenedTrackToList }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("Attempt to use profile context outside its scope");
  return ctx;
};
