import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Swiper from "react-native-swiper";

export default (SwiperTips = () => {
  const Police = `wear nose mask when leaving the house`;
  const [fireService] = useState(
    "wash your hands after touching a sharp surface"
  );
  const [Ambulance] = useState("please call the ambulance services ");

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>{Police}</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>{fireService}</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>{Ambulance}</Text>
        </View>
      </Swiper>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    // height:"20%"
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#55488B",
    padding: 10,
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#55488B",
    padding: 10,
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#55488B",
    padding: 10,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 10,
  },
  container: {
    height: "30%",
  },
});
