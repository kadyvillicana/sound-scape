import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomImage from "./custom-image";
import CustomText from "./custom-text";

import { Track } from "../context/tracks-context";

const TrackItem = (item: Track, playTrackFn: any) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        paddingTop: 10,
      }}
      onPress={() => playTrackFn}
    >
      <View
        style={{
          padding: 10,
        }}
      >
        <CustomImage
          imgSize={"medium"}
          imgSrc={{
            uri: "",
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", gap: 5 }}>
        <View>
          <CustomText fontSize="small">{item.listeners}</CustomText>
        </View>
        <View>
          <CustomText fontSize="regular" isPrimary style={{ fontWeight: "400" }}>
            {item.name}
          </CustomText>
        </View>
        <View>
          <CustomText fontSize="medium" style={{ fontWeight: "300" }}>
            {/* {item.artist.name} */}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrackItem;
