import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Dimensions,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as firebase from "firebase";
import "firebase/firebase-firestore";
import { BarIndicator } from "react-native-indicators";
import ElevatedView from "react-native-elevated-view";

export default SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = () => {
    if (!email && !password && !phoneNumber && !name && !confirmPassword) {
      alert("one or more of the fields is null");
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          return firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .set({
              fullname: name,
              email: email,
              phoneNumber: phoneNumber
            });
        })
        .then(handleNavigation)
        .catch(error => {
          if (error) {
            alert(error);
            setLoading(false);
          }
        });
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate("Login");
  };

  const handleNavigation = () => {
    navigation.navigate("SettingsDrawer");
  };
  return (
    <>
      <StatusBar backgroundColor="#32295A" />
      {loading ? (
        <BarIndicator
          color="#55488B"
          amianting={loading}
          style={{ alignSelf: "center" }}
        />
      ) : (
        <View style={styles.container}>
          <ElevatedView elevation={3} style={styles.subcontainer}>
            <View style={styles.inputContainer}>
              <Icon name="account-circle" size={24} />
              <TextInput
                style={styles.textInput}
                placeholder="full name"
                onChangeText={text => setName(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="email" size={25} />
              <TextInput
                placeholder="email"
                style={styles.textInput}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="call" size={25} />
              <TextInput
                placeholder="phone number"
                style={styles.textInput}
                onChangeText={text => setPhoneNumber(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={25} />
              <TextInput
                placeholder="password"
                style={styles.textInput}
                onChangeText={text => setPassword(text)}
                autoCapitalize={false}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={25} />
              <TextInput
                placeholder="confirm password"
                style={styles.textInput}
                onChangeText={text => setConfirmPassword(text)}
                autoCapitalize={false}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={signup}
              activeOpacity={0.7}
            >
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={handleLoginNavigation}
              activeOpacity={0.7}
            >
              <Text style={{ color: "#55488B", fontSize: 18 }}>
                Have account already login
              </Text>
            </TouchableOpacity>
          </ElevatedView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dedede"
  },
  subcontainer: {
    height: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100,
    borderRadius: 2
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
    paddingLeft: 10
  },
  textInput: {
    width: 220
  },
  btnLogin: {
    margin: 20,
    width: 250,
    backgroundColor: "#55488B",
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "#55488B",
    paddingVertical: 10,
    alignItems: "center"
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  }
});
