import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import RecordScreen from "../screens/RecordScreen";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";

import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 


const LoginNavigator2 = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen},
  }
)


//BottomTabNavigator design
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

const ProRecNavigator = createStackNavigator(
  {
    Profile: { screen: ProfileScreen},
    Record: { screen: RecordScreen}
  }
)

const HomeNavigator = createBottomTabNavigator(
  {//switch navigator
  // Login: { screen: LoginScreen },
  // Register: { screen: RegisterScreen},
  Home: { screen: HomeScreen},
  // Profile: { screen: ProfileScreen},
  Profile: ProRecNavigator,
  Search: { screen: SearchScreen},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray"
    }
  }
  );

const MainNavigator = createStackNavigator(
  {
    LoginRegi: LoginNavigator2,
    HomePage: HomeNavigator,
  }
)


const Drawer = createAppContainer(MainNavigator);

export default Drawer;
