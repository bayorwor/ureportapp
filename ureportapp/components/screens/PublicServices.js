import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  StatusBar
} from "react-native";
import SwiperTips from "../screens/SwiperTips";
import ElevatedView from "react-native-elevated-view";
import fire from "../images/fire.jpg";
import police from "../images/police.png";
import ambulance from "../images/ambulance.png";
import pds from "../images/pds.png";

export default PublicServices = () => {
  dialPolice = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = "tel:${0500566510}";
    } else {
      phoneNumber = "telprompt:${0500566510}";
    }
    Linking.openURL(phoneNumber);
  };

  //call the fire services
  dialFireService = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = "tel:${1234567890}";
    } else {
      phoneNumber = "telprompt:${1234567890}";
    }
    Linking.openURL(phoneNumber);
  };

  //call the Ambulance services
  dialAmbulance = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = "tel:${1234567890}";
    } else {
      phoneNumber = "telprompt:${1234567890}";
    }
    Linking.openURL(phoneNumber);
  };
  //call the PDS
  dialPds = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = "tel:${1234567890}";
    } else {
      phoneNumber = "telprompt:${1234567890}";
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <>
      <StatusBar backgroundColor="#32295A" />
      <SwiperTips />
      <View style={styles.container}>
        <ElevatedView
          elevation={3}
          style={{
            margin: 20,
            borderRadius: 10,
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <View style={styles.btnMainContainer}>
            <View style={styles.holdContainer}>
              <TouchableOpacity
                style={styles.btnContainer}
                activeOpacity={0.7}
                onPress={dialFireService}
              >
                <Image source={fire} style={styles.imageStyle} />
                <Text style={styles.btnText}>fire serice</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnContainer}
                activeOpacity={0.7}
                onPress={dialPolice}
              >
                <Image source={police} style={styles.imageStyle} />
                <Text style={styles.btnText}>police</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnContainer}
                activeOpacity={0.7}
                onPress={dialPds}
              >
                <Image source={pds} style={styles.imageStyle} />
                <Text style={styles.btnText}>P.D.S</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnContainer}
                activeOpacity={0.7}
                onPress={dialAmbulance}
              >
                <Image source={ambulance} style={styles.imageStyle} />
                <Text style={styles.btnText}>Ambulance </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ElevatedView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  btnMainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center"
  },
  holdContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center"
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    borderColor: "#dedede",
    borderRadius: 5,
    height: "45%",
    width: "40%",
    borderWidth: 1,
    marginTop: 20
  },
  btnText: {
    alignSelf: "center",
    fontSize: 18,
    marginVertical: 10
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 60
  }
});
