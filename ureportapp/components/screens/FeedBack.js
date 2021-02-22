import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Textarea, InputGroup, Button, Card } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
export default (FeedBack = ({ navigation }) => {
  const [feed, setFeed] = useState("");

  const submintFeed = () => {
    firebase
      .firestore()
      .collection("feed")
      .doc()
      .set({
        feed: feed,
      })
      .then((error) => (error ? alert(error) : alert("sent")));
  };

  return (
    <>
      <StatusBar backgroundColor="#32295A" />
      <View style={styles.headLogo}>
        <TouchableOpacity
          style={styles.header1}
          onPress={navigation.toggleDrawer}
        >
          <Icon name="align-justify" size={25} color="white" />
        </TouchableOpacity>
        <View style={styles.header2}>
          <Text style={styles.txtTitle}>Feed Back</Text>
        </View>
      </View>
      <View style={styles.container}>
        <InputGroup>
          <Textarea
            style={styles.txtInput}
            bordered
            rowSpan={5}
            placeholder="decribe your feed back here "
            onChangeText={(text) => setFeed(text)}
          />
        </InputGroup>
        <InputGroup>
          <Button success style={styles.btnUpdate} onPress={submintFeed}>
            <Text style={styles.btnTxt}>submit</Text>
          </Button>
        </InputGroup>
      </View>
    </>
  );
});
FeedBack.navigationOptions = {
  title: "Feed Back",
  drawerIcon: ({ tintColor }) => (
    <Icon name="star" style={{ fontSize: 20, color: tintColor }} />
  ),
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    margin: 5,
    alignItems: "center",
  },
  headLogo: {
    height: "10%",
    width: "100%",
    backgroundColor: "#55488B",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  txtTitle: {
    color: "#fefefe",
    fontWeight: "bold",
    fontSize: 24,
    paddingRight: 10,
  },

  header1: {
    width: "10%",
    margin: 10,
    justifyContent: "flex-start",
  },
  header3: {
    width: "80%",
    margin: 10,
    justifyContent: "center",
  },
  txtInput: {
    // backgroundColor: "whitesmoke",
    // borderWidth: 1,
    // borderColor: "#dedede",
    width: "100%",
    // height: 150,
    justifyContent: "flex-start",
  },
  btnUpdate: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  btnTxt: {
    alignSelf: "center",
    marginVertical: 6,
    fontSize: 20,
    color: "white",
  },
});
