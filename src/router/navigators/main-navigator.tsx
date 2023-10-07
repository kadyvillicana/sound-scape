import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { PlayerContextProvider } from "../../context/player-context";

import { HomeScreen } from "../../screens/home";
import { DetailScreen } from "../../screens/details";
import { TrackContextProvider } from "../../context/tracks-context";

const SCREEN_OPTIONS = { header: () => null };

const MainStack = createNativeStackNavigator();

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={SCREEN_OPTIONS} initialRouteName="Home">
    <MainStack.Group>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Group>
    <MainStack.Group screenOptions={{ presentation: "modal" }}>
      <MainStack.Screen name="Details" component={DetailScreen} />
    </MainStack.Group>
  </MainStack.Navigator>
);

const MainNavigatorImpl = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PlayerContextProvider>
          <TrackContextProvider>
            <MainStackNavigator />
          </TrackContextProvider>
        </PlayerContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export const MainNavigator = MainNavigatorImpl;
