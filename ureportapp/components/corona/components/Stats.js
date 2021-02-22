import React from "react";
import useStats from "../utils/useStats";
import { View, Text, StyleSheet } from "react-native";
export default function Stats({ url }) {
  const { stats, loading, error } = useStats(url);

  if (loading) return <Text>Loading...</Text>;
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.ConfirmedContainer}>
        <Text style={styles.confirmedTxt}>Confirmed:</Text>
        <Text style={styles.confirmedTxt}>{stats.confirmed.value}</Text>
      </View>
      <View style={styles.deathContainer}>
        <Text style={styles.deaathTxt}>Deaths:</Text>
        <Text style={styles.deaathTxt}>{stats.deaths.value}</Text>
      </View>
      <View style={styles.recoveredContainer}>
        <Text style={styles.recoveredTxt}>Recovered:</Text>
        <Text style={styles.recoveredTxt}>{stats.recovered.value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    height: "49%",
  },
  ConfirmedContainer: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "red",
  },
  deathContainer: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#dedede",
  },
  recoveredContainer: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "green",
  },
  confirmedTxt: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
  },
  deaathTxt: {
    fontSize: 20,
    // color: '',
  },
  recoveredTxt: {
    fontSize: 20,
    color: "#fefefe",
  },
});
