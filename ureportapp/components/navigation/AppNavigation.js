import React, { useState, useEffect } from "react";

import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems,
} from "react-navigation";
import { Card, InputGroup, H3 } from "native-base";
import logo from "../images/fire.jpg";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icons from "react-native-vector-icons/FontAwesome5";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import Personnel from "../screens/Personnel";
import PublicServices from "../screens/PublicServices";
import CrimeScreen from "../screens/CrimeScreen";
import MapScreen from "../screens/MapScreen";
import SplashScreen from "../screens/SplashScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DailyTips from "../screens/DailyTips";
import FeedBack from "../screens/FeedBack";
import LogOut from "../screens/LogOut";
import ForgetPassword from "../screens/ForgetPassword";
import DeleteContact from "../screens/DeleteContact";
import { ScrollView, Image, Dimensions } from "react-native";
import * as firebase from "firebase";
import "firebase/firebase-firestore";
//Desc => Main Bottom Navigation
const mainAppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLebel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="home" size={30} />
        ),
      },
    },
    Corona: {
      screen: Personnel,
      navigationOptions: {
        tabBarLebel: "corona",
        tabBarIcon: ({ tintColor }) => (
          <Icons color={tintColor} name="biohazard" size={30} />
        ),
      },
    },
    Alert: {
      screen: CrimeScreen,
      navigationOptions: {
        tabBarLebel: "alert",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="notifications-active" size={30} />
        ),
      },
    },
    Public: {
      screen: PublicServices,
      navigationOptions: {
        tabBarLebel: "public",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="call" size={30} />
        ),
      },
    },
  },
  {
    //order of the tab bar
    initialRouteName: "Home",
    order: ["Home", "Alert", "Public", "Corona"],

    // how tab should behave
    navigationOptions: {
      tabBarVisible: true,
    },
    tabBarOptions: {
      activeTintColor: "#55488B",
      inactiveTintColor: "#000",
    },
  }
);

//@Drawer shows custom side drawer
const CustomDrawer = (props) => {
  const [name, setname] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    let userid = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .get()
      .then((Snapshot) => {
        setname(Snapshot.data().fullname),
          setEmail(Snapshot.data().email),
          setPhoneNumber(Snapshot.data().phoneNumber);
      });
  }, []);

  return (
    <>
      <Card
        style={{
          height: "40%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#55488D",
          position: "relative",
        }}
      >
        <Image
          source={logo}
          style={{ height: 100, width: 100, borderRadius: 50 }}
        />
        <InputGroup style={{ marginVertical: 5 }}>
          <H3 style={{ color: "yellow" }}>{name}</H3>
        </InputGroup>
        <InputGroup style={{ marginVertical: 5 }}>
          <H3 style={{ color: "#fefefe" }}>{phoneNumber}</H3>
        </InputGroup>
        <InputGroup style={{ marginVertical: 5 }}>
          <H3 style={{ color: "#dedede", fontStyle: "italic" }}>{email}</H3>
        </InputGroup>
      </Card>

      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </>
  );
};
//drawer navigation for settings and others
const SettingsDrawer = createDrawerNavigator(
  {
    Home: mainAppNavigator,
    Contacts: DeleteContact,
    DailyTips: DailyTips,
    Profile: ProfileScreen,
    FeedBack: FeedBack,
    LogOut: LogOut,
  },
  {
    contentComponent: CustomDrawer,
    drawerBackgroundColor: "#dedede",
    drawerWidth: Dimensions.get("screen").width - 50,
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#55488B",
    },
  }
);

// switch navigation for swithing the screen
const NavigationConfig = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    Forget: ForgetPassword,
    MapScreen: MapScreen,
    ProfileScreen: ProfileScreen,
    SettingsDrawer: SettingsDrawer,
    App: mainAppNavigator,
  },
  {
    initialRouteName: "Splash",
  }
);

mainAppNavigator.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="home" style={{ fontSize: 20, color: tintColor }} />
  ),
};
export default (AppContainer = createAppContainer(NavigationConfig));
