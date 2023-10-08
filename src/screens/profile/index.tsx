import React, { FC } from "react";
import { NavigationProp } from "@react-navigation/native";
import MainAreaView from "../../components/main-area-view";
import CustomText from "../../components/custom-text";
import { FlatList, TouchableOpacity, View } from "react-native";
import CustomImage from "../../components/custom-image";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../styles/variables";
import { useProfileContext } from "../../context/profile-context";

interface ProfileScreenProps {
  navigation: NavigationProp<any, any>;
}

export const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const { listenedTracks } = useProfileContext();
  const sortedListenedTracks =
    listenedTracks && listenedTracks.length > 0
      ? listenedTracks.sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Icon name="chevron-left" size={25} color={colors.white} />
        </TouchableOpacity>
        <View
          style={{
            flex: 6,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CustomText fontSize="medium" style={{ fontWeight: "500" }}>
            Mi Perfil
          </CustomText>
          <CustomText isPrimary style={{ fontWeight: "400" }}>
            Ultimas Canciones Reproducidas
          </CustomText>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    );
  };

  const trackItem = (track: any, idx: number) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 10,
        }}
        onPress={() => console.log(idx)}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <CustomImage
            imgSize={"medium"}
            imgSrc={{
              uri: track.image[1]["#text"],
              cache: "only-if-cached",
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center", gap: 5 }}>
          <View>
            <CustomText fontSize="small">{JSON.stringify(track.date) || ""}</CustomText>
          </View>
          <View>
            <CustomText fontSize="regular" isPrimary style={{ fontWeight: "400" }}>
              {track.name}
            </CustomText>
          </View>
          <View>
            <CustomText fontSize="medium" style={{ fontWeight: "300" }}>
              {track.artist.name}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainAreaView>
      <Header />
      <FlatList
        keyExtractor={(item) => item.mbid}
        data={sortedListenedTracks}
        renderItem={({ item, index }) => trackItem(item, index)}
      />
    </MainAreaView>
  );
};
