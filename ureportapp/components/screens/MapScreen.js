import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import img from "../images/uber1.png";
import Asms from "react-native-sms-android";

export default MapScreen = ({ navigation }) => {
  //getting the coordinates from state
  const [region, setRegion] = useState({
    latitude: 5.6833306,
    longitude: -0.2833322,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121
  });

  //sms request for ambulance or trosky
  const [numbers, setNumbers] = useState(["233505419444", "233500566510"]);
  const Message = `I need an ambulance now, please call ASAP.`;

  const sendingSms = (Receivers, Messagex) => {
    Receivers.map(
      async Numbers =>
        await Asms.sms(Numbers, Messagex, "sendDirect", error => {
          if (error) {
            alert(error);
          } else {
            alert("sent");
          }
        })
    );
  };

  useEffect(() => onRegionChange);
  //getting coordinates base on region change
  const onRegionChange = region => {
    setRegion(region);
  };
  //getting the coordinates for the cars or ambulance
  const ambulance = [
    { id: 1, latitude: 5.6833301, longitude: -0.2833321 },
    { id: 2, latitude: 5.6883302, longitude: -0.2893322 },
    { id: 3, latitude: 5.6933303, longitude: -0.2833523 },
    { id: 4, latitude: 5.6833304, longitude: -0.2893324 },
    { id: 5, latitude: 5.6893306, longitude: -0.2833322 }
  ];

  return (
    <>
      <StatusBar backgroundColor="#32295A" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btnback}
            onPress={() => navigation.navigate("App")}
          >
            <Icon name="arrow-back" size={25} color="#fefefe" />
            <Text style={styles.txtHeader}>go back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region}
            onRegionChange={onRegionChange}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            mapType={"standard"}
          >
            {ambulance.map(data => {
              return (
                <Marker
                  coordinate={{
                    latitude: data.latitude,
                    longitude: data.longitude
                  }}
                  image={img}
                />
              );
            })}
          </MapView>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.requestBtn}
            onPress={() => sendingSms(numbers, Message)}
          >
            <Text style={styles.txtRequest}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "70%"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  header: {
    height: 60,
    backgroundColor: "#55488B",
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    padding: 20
  },
  txtHeader: {
    color: "#fefefe"
  },
  btnback: {
    flexDirection: "row"
  },
  tabContainer: {
    height: 60,
    backgroundColor: "#fefefe",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  requestBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    backgroundColor: "#55488B",
    borderRadius: 10
  },
  txtRequest: {
    color: "#fefefe",
    margin: 10,
    fontSize: 20
  }
});
