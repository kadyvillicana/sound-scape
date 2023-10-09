import React, { FC, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { API_KEY, TOP_TRACKS_LIMIT } from "@env";
import { usePlayerContext } from "./player-context";
import { useProfileContext } from "./profile-context";

const API_ENDPOINT = "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks";

interface Artist {
  name: string;
  mbid: string;
  url: string;
}

interface Album {
  artist: string;
  title: string;
  mbid: string;
  url: string;
  image: ImageP[];
}

interface Tag {
  name: string;
  url: string;
}

interface Wiki {
  published: string;
  summary: string;
  content: string;
}

interface Attr {
  country: string;
  page: number;
  perPage: number;
  totalPages: number;
  total: number;
}

export interface ImageP {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}
interface Tracks {
  track: Track[];
  "@attr": Attr;
}

export interface Track {
  name: string;
  duration: number;
  listeners: number;
  mbid: string;
  url: string;
  artist: Artist;
  image: ImageP[];
  album?: Album;
  toptags?: {
    tag: Tag[];
  };
  wiki?: Wiki;
}

export interface GetTracksResponse {
  tracks: Tracks;
}

interface TrackContextValues {
  tracks: any;
  playTrack: (arg: number) => void;
  playNextTrack: any;
  playPastTrack: any;
}

export const TrackContext = createContext<TrackContextValues | undefined>(undefined);

export const TrackContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultTracks: Track[] = [];
  const [tracks, setTracks] = useState(defaultTracks);
  const { setCurrentTrack } = usePlayerContext();
  const { addListenedTrackToList } = useProfileContext();
  const [trackIndex, setTrackIndex] = useState(0);

  const getTracksByCountry = async (country: string): Promise<void> => {
    try {
      const endpoint = `${API_ENDPOINT}&country=${country}&api_key=${API_KEY}&format=json&limit=${TOP_TRACKS_LIMIT}`;
      const { data } = await axios.get<GetTracksResponse>(endpoint, {
        headers: {
          Accept: "application/json",
        },
      });
      if (data?.tracks?.track) {
        avoidDuplicatedDate(data.tracks.track);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const avoidDuplicatedDate = (fetchedTracks: Track[]) => {
    if (fetchedTracks.length > 0) {
      const newArrayList: Track[] = [];
      fetchedTracks.forEach((track) => {
        if (!newArrayList.some((o) => o.mbid === track.mbid)) {
          newArrayList.push({ ...track });
        }
      });
      setTracks(newArrayList);
    }
  };

  const playTrack = (idx: number) => {
    setTrackIndex(idx);
    setCurrentTrack(tracks[idx]);
    const listenedTrack = {
      ...tracks[idx],
      date: new Date(),
    };
    addListenedTrackToList(listenedTrack);
  };

  const playNextTrack = () => {
    const nextTrackIndex = trackIndex + 1;
    if (nextTrackIndex === tracks.length) {
      // end of list
      return;
    }
    playTrack(nextTrackIndex);
  };

  const playPastTrack = () => {
    const pastTrackIndex = trackIndex - 1;
    if (pastTrackIndex < 0) {
      // end of list
      return;
    }
    playTrack(pastTrackIndex);
  };

  useEffect(() => {
    void getTracksByCountry("mexico");
  }, []);

  return (
    <TrackContext.Provider value={{ tracks, playNextTrack, playPastTrack, playTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => {
  const ctx = useContext(TrackContext);
  if (!ctx) throw new Error("Attempt to use track context outside its scope");
  return ctx;
};
