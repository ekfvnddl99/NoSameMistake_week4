import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import RecordHome from "../screens/RecordHome";
import CategoryScreen from "../screens/CategoryScreen";
import LoginScreen from "../screens/Login";

//Add navigators with screens in this file
export const HomeNavigator = createStackNavigator({
  Home: { screen: LoginScreen }
});

export const SettingsNavigator = createStackNavigator({
  Settings: { screen: SettingsScreen }
});

export const ProfileNavigator = createStackNavigator(
  {
  Profile: { screen: ProfileScreen },
  Record: { screen: RecordHome },
  Category: { screen: CategoryScreen}
  },
  {
    initialRouteName: 'Profile'
  }
  );

export const SearchNavigator = createStackNavigator({
  Search: { screen: SearchScreen }
});

// export const FloatingNavigator = createStackNavigator({
//   Record: { screen: RecordScreen },
//   Category: { screen: CategoryScreen}
// },
// {
//   initialRouteName: 'Record'
// }
// );


