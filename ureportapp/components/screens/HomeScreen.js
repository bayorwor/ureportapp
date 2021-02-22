import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import Asms from "react-native-sms-android";
import firebase, { firestore } from "firebase";
import "firebase/firebase-firestore";
import Geolocation from "react-native-geolocation-service";

console.disableYellowBox = true;

export default (HomeScreen = ({ navigation }) => {
  // initial states
  const [latitude, setLatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [numbers, setNumbers] = useState();
  const userid = firebase.auth().currentUser.uid;
  const db = firebase.firestore();

  //allowing permissions for location
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((granted) => {
        if (granted) {
          PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.SEND_SMS
          );
        }
      });
    } else {
      return;
    }
  });

  // geting the latitude and longtitude of a current user
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (position.coords.accuracy > 30) {
          return;
        } else {
          setLatitude(position.coords.latitude);
          setlongitude(position.coords.longitude);
        }
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
        distanceFilter: 30,
      }
    );
  }, []);

  //fetching contact from firebase and setting it to state
  useEffect(() => {
    let numbers = [];
    db.collection("contact")
      .doc(userid)
      .get()
      .then((Snapshot) => {
        Snapshot.data().contact.forEach((e) => {
          numbers.push(e);
        });
        setNumbers(numbers);
      })

      .catch((error) => console(error));
  }, []);

  //sms or message for delivering
  const Message = `please help me out , i am in a serious danger at here.
   www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const sendingSms = (Receivers, Messagex) => {
    Receivers.map(async (pnumbers) => {
      console.log(pnumbers);
      await Asms.sms(pnumbers, Messagex, "sendDirect", (error) => {
        if (error) {
          alert(error);
        } else {
          return;
        }
      });
    });
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
            <Icons name="align-justify" size={25} color="white" />
          </TouchableOpacity>
          <View style={styles.header2}>
            <Text style={styles.txtTitle}>ureport</Text>
          </View>
        </View>

        <View style={styles.mainEmergencyContainer}>
          <View style={styles.emeContainer}>
            <TouchableOpacity
              activeOpacity={0.71}
              style={styles.emeBtn}
              onPress={() => sendingSms(numbers, Message)}
            >
              <Text style={styles.btnTxt}>Help me!!</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainEmergencyContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  emeBtn: {
    backgroundColor: "#933f41",
    margin: 30,
    borderRadius: 100,
    height: 200,
    width: 200,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 20,
    borderColor: "#d35658",
  },
  txtTitle: {
    color: "#fefefe",
    fontWeight: "bold",
    fontSize: 24,
    paddingRight: 10,
  },
  reportBtn: {
    width: "50%",
    height: "50%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    flexDirection: "row",
    borderWidth: 10,
  },
  btnTxt: {
    color: "#fefefe",
    fontSize: 20,
    fontStyle: "italic",
  },

  header1: {
    width: "10%",
    margin: 10,
    justifyContent: "flex-start",
  },
  header2: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 10,
  },
  header3: {
    width: "10%",
    margin: 10,
    justifyContent: "center",
  },
});
