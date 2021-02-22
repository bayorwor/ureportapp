import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ureport from "../images/UreportApp-Logo.png";
import * as firebase from "firebase";
import { BarIndicator } from "react-native-indicators";
import { db } from "../utils/ConfigFirebase";
import ElevatedView from "react-native-elevated-view";

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    login;
  }, []);

  const login = () => {
    try {
      if (!email || !password) {
        alert("email or password input is null");
      } else {
        setLoading(true);
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(handleNavigation)
          .catch(error => {
            if (error) {
              alert(error);
              setLoading(false);
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  };

  console.disableYellowBox = true;
  const handleSignupNavigation = () => {
    navigation.navigate("Signup");
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
          <Image
            source={ureport}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "#55488B",
              marginTop: -100
            }}
          />
          <ElevatedView elevation={3} style={styles.subcontainer}>
            <View style={styles.inputContainer}>
              <Icon name="account-circle" size={24} />
              <TextInput
                style={styles.textInput}
                placeholder="enter email"
                onChangeText={text => setEmail(text)}
                autoCapitalize={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={25} />
              <TextInput
                placeholder="password"
                style={styles.textInput}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity
              style={{ margin: 10 }}
              activeOpacity={0.72}
              onPress={() => navigation.navigate("Forget")}
            >
              <Text style={{ color: "#55488B" }}>reset password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLogin}
              activeOpacity={0.72}
              onPress={login}
            >
              <Text style={styles.btnText}>log in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={handleSignupNavigation}
              activeOpacity={0.72}
            >
              <Text style={{ color: "#55488B", fontSize: 18 }}>
                create new account
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
    height: "50%",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2
  },
  inputContainer: {
    width: 250,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 75,
    borderColor: "#55488B",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
