import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlayerContextProvider } from "../../context/player-context";

import { HomeScreen } from "../../screens/home";
import { DetailScreen } from "../../screens/details";
import { TrackContextProvider } from "../../context/tracks-context";
import { ProfileScreen } from "../../screens/profile";
import { ProfileContextProvider } from "../../context/profile-context";

const SCREEN_OPTIONS = { header: () => null };

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={SCREEN_OPTIONS} initialRouteName="Home">
    <MainStack.Group>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Group>
    <MainStack.Group screenOptions={{ animation: "slide_from_bottom" }}>
      <MainStack.Screen name="Details" component={DetailScreen} />
    </MainStack.Group>
  </MainStack.Navigator>
);

const MainNavigatorImpl = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ProfileContextProvider>
          <PlayerContextProvider>
            <TrackContextProvider>
              <MainStackNavigator />
            </TrackContextProvider>
          </PlayerContextProvider>
        </ProfileContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export const MainNavigator = MainNavigatorImpl;
