import axios from "axios";
import { API_KEY } from "@env";
import { GetTrackInfoResponse } from "../context/player-context";

const API_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?api_key=${API_KEY}&format=json&method=`;

const getTrackInfoByMBID = async (mbid: string): Promise<GetTrackInfoResponse | undefined> => {
  try {
    const response = await axios.get<GetTrackInfoResponse>(
      API_ENDPOINT + `track.getInfo&mbid=${mbid}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (response?.data) {
      return response.data;
    }
    return undefined;
  } catch (error) {
    console.log(error);
  }
};

export { getTrackInfoByMBID };
