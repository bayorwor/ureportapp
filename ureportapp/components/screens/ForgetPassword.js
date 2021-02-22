import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import firebase from "firebase";
import ElevatedView from "react-native-elevated-view";

export default (ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const getresetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        if (!email) {
          alert("incorrect mail ");
        } else {
          alert("sent");
        }
      })
      .then(() => navigation.navigate("Login"))

      .catch((error) => alert(error));
  };

  return (
    <>
      <StatusBar backgroundColor="#32295A" />
      <Icon
        name="arrow-back"
        size={30}
        style={styles.backBtn}
        onPress={() => navigation.navigate("Login")}
      />
      <View style={styles.container}>
        <ElevatedView elevation={3} style={styles.subcontainer}>
          <Text style={{ fontSize: 18 }}>please provide your email</Text>
          <View style={styles.inputContainer}>
            <Icon name="account-circle" size={24} />
            <TextInput
              style={styles.textInput}
              placeholder="enter email"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize={false}
            />
          </View>

          <TouchableOpacity
            style={styles.btnLogin}
            activeOpacity={0.72}
            onPress={getresetPassword}
          >
            <Text style={styles.btnText}>Send Code</Text>
          </TouchableOpacity>
        </ElevatedView>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dedede",
  },
  subcontainer: {
    height: "50%",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    marginHorizontal: 10,
  },
  inputContainer: {
    width: 250,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 90,
    borderColor: "#55488B",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  textInput: {
    width: 220,
  },
  btnLogin: {
    margin: 20,
    width: 250,
    backgroundColor: "#55488B",
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "#55488B",
    paddingVertical: 10,
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  backBtn: {
    margin: 10,
  },
});
