import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { HomeScreen } from "../../screens/home";

const SCREEN_OPTIONS = { header: () => null };

const MainStack = createNativeStackNavigator();

function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={SCREEN_OPTIONS} initialRouteName="Home">
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen name="Details" component={DetailsScreen} />
    <MainStack.Screen name="Profile" component={ProfileScreen} />
  </MainStack.Navigator>
);

const MainNavigatorImpl = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export const MainNavigator = MainNavigatorImpl;
