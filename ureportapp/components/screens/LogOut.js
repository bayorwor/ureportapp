import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Card, Button, InputGroup } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
//import "firebase/firestore";

export default (LogOut = ({ navigation }) => {
  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
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
          <Text style={styles.txtTitle}>Log Out</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Card style={styles.txtContainer}>
          <Text style={styles.txtInstructions}>
            Are you sure you want to log out , if yes click on the button to log
            out of the system
          </Text>
        </Card>
        <Card>
          <InputGroup>
            <Button style={styles.btnSignOut} onPress={signout} danger>
              <Text style={styles.btnTxt}>Log Out</Text>
            </Button>
          </InputGroup>
        </Card>
      </View>
    </>
  );
});
LogOut.navigationOptions = {
  title: "log out",
  drawerIcon: ({ tintColor }) => (
    <Icon name="power-off" style={{ fontSize: 20, color: tintColor }} />
  ),
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    height: "80%",
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
  btnSignOut: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    marginVertical: 5,
    fontSize: 20,
    color: "white",
  },
  txtInstructions: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 35,
    fontStyle: "italic",
  },
  txtContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
