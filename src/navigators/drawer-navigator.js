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
import Tab4Screen from "../screens/Tab4Screen";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const LoginNavigator2 = createSwitchNavigator(
  {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen},
  }
)


//BottomTabNavigator design
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  if (routeName === "today") {
    return <AntDesign name="caretright" size={24} color='#3C1278' />;
  } else if (routeName === "future") {
    return <AntDesign name="forward" size={24} color='#3C1278' />;
  } else if (routeName === "past") {
    return <AntDesign name="banckward" size={24} color='#3C1278' />;
  } else if (routeName === "history") {
    return <FontAwesome name="history" size={24} color='#3C1278' />;
  }
  
};

const ProRecNavigator = createStackNavigator(
  {
    Future: { screen: ProfileScreen},
    Record: { screen: RecordScreen}
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
)

const HomeNavigator = createBottomTabNavigator(
  {//switch navigator
  // Login: { screen: LoginScreen },
  // Register: { screen: RegisterScreen},
  today: { screen: HomeScreen},
  // Profile: { screen: ProfileScreen},
  future: ProRecNavigator,
  past: { screen: SearchScreen},
  history: { screen: Tab4Screen }
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

const MainNavigator = createSwitchNavigator(
  {
    LoginRegi: LoginNavigator2,
    HomePage: HomeNavigator,
  }
)


const Drawer = createAppContainer(MainNavigator);

export default Drawer;
