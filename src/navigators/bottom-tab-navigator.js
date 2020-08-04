import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  HomeNavigator,
  ProfileNavigator,
  SearchNavigator
} from "./screen-stack-navigators";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  if (routeName === "Home") {
    return <Feather name="home" size={24} color="black" />;
  } else if (routeName === "Profile") {
    return <AntDesign name="calendar" size={24} color={tintColor} />;
  } else if (routeName === "Search") {
    return <AntDesign name="Trophy" size={24} color="black" />;
  }
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeNavigator,
    Profile: ProfileNavigator,
    Search: SearchNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray"
    }
  }
);

export default BottomTabNavigator;
