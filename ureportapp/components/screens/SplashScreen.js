import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { BarIndicator } from "react-native-indicators";
import firebase from "firebase";
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged(user =>
        navigation.navigate(user ? "SettingsDrawer" : "Login")
      );
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#32295A" />
      <View style={styles.container}>
        <Text>Your safety, our priority</Text>
        <View style={styles.indicator}>
          <BarIndicator color="#55488B" size={50} />
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  indicator: {
    height: "20%"
  }
});
