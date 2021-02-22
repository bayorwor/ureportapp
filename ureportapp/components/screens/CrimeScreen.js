import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Foundation";
import Octicon from "react-native-vector-icons/Octicons";
import Asms from "react-native-sms-android";
import Geolocation from "react-native-geolocation-service";
import IconAwesome from "react-native-vector-icons/FontAwesome";

console.disableYellowBox = true;

export default (CrimeScreen = ({ navigation }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);

  // geting the latitude and longtitude of a current user
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        let lnt = parseFloat(position.coords.latitude);
        let lng = parseFloat(position.coords.longitude);
        setLatitude(lnt);
        setlongitude(lng);
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
        distanceFilter: 1,
      }
    );
  }, []);

  //sms or message for delivering

  const [numbers, setNumbers] = useState([
    "233553826524",
    "233505419444",
    "233545413086",
  ]);

  //constants messages that can be delivered

  const FloodMessage = `flood just occured in my neighbourhood , please help us out right now.
     www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const ArmRobbery = `please help, we've been robbered along kumasi road.
    www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const fireServices = `there is a fire case here right now, please help us out.
    www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const Kidnap = `i have been kidnap arround Takoradi, please help me find my life.
    www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const fight = `There is a serious fight ongoing here and we need the help of the security agency.
    www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const accident = `somebody is in a critical condition here and we need the help of an ambulance or can do.
    www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  //function that send sms to the contacts and others

  sendingSms = (Receivers, Messagex) => {
    Receivers.map(
      async (Numbers) =>
        await Asms.sms(Numbers, Messagex, "sendDirect", (error) => {
          if (error) {
            alert(error);
          } else {
            alert("sent");
          }
        })
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#32295A" />

      <View style={styles.container}>
        <View style={styles.headLogo}>
          <TouchableOpacity
            style={styles.header1}
            onPress={navigation.openDrawer}
          >
            <IconAwesome name="align-justify" size={25} color="white" />
          </TouchableOpacity>
          <View style={styles.header2}>
            <Text style={styles.txtTitle}>Other Emergency</Text>
          </View>
        </View>

        <View style={styles.mainEmergencyContainer}>
          <View>
            <Text style={styles.txtHeader}>One click emergency assistance</Text>
          </View>
          <View style={styles.emeContainer}>
            <TouchableOpacity
              style={styles.emeBtn}
              activeOpacity={0.71}
              onPress={() => sendingSms(numbers, Kidnap)}
            >
              <Octicon name="gist-secret" size={50} color="#55488B" />
              <Text>kidnap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emeBtn}
              activeOpacity={0.71}
              onPress={() => sendingSms(numbers, ArmRobbery)}
            >
              <Icon name="kabaddi" size={50} color="#55488B" />
              <Text>Robbery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emeBtn}
              activeOpacity={0.71}
              onPress={() => sendingSms(numbers, fireServices)}
            >
              <Icon name="fire" size={50} color="#55488B" />
              <Text>fire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emeBtn}
              activeOpacity={0.71}
              onPress={() => sendingSms(numbers, FloodMessage)}
            >
              <Icons name="home" color="#55488B" size={50} />
              <Text>flood</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emeBtn}
              activeOpacity={0.71}
              onPress={() => sendingSms(numbers, fight)}
            >
              <Icon name="doctor" size={50} color="#55488B" />
              <Text>medic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emeBtn}
              activeOpacity={0.71}
              onPress={() => sendingSms(numbers, accident)}
            >
              <Icon name="ambulance" size={50} color="#55488B" />
              <Text>Rides</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headLogo: {
    height: "10%",
    width: "100%",
    backgroundColor: "#55488B",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  emeContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
  },
  emeBtn: {
    margin: 10,
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dedede",
  },
  txtTitle: {
    color: "#fefefe",
    fontWeight: "bold",
    fontSize: 24,
    paddingRight: 10,
  },
  reportBtn: {
    width: "50%",
    borderRadius: 25,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 20,
    flexDirection: "row",
  },
  mainEmergencyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtHeader: {
    fontWeight: "bold",
    margin: 10,
    fontSize: 20,
  },
  header1: {
    width: "10%",
    margin: 10,
    justifyContent: "flex-start",
  },
  header2: {
    //width: "10%",
    flex: 1,
    justifyContent: "flex-end",
    margin: 10,
  },
});
