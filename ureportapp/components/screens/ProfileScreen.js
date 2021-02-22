import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import img from "../images/arm-robber.jpg";
import ImagePicker from "react-native-image-crop-picker";
import { Card, H3, Button } from "native-base";

export default (ProfileScreen = ({ navigation }) => {
  const [name, setname] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [city, SetCity] = useState("Wa");
  const [country, setCountry] = useState("Ghana");
  const [imgDisplay, setImgDisplay] = useState(null);

  useEffect(() => {
    let userid = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .get()
      .then((Snapshot) => {
        setEmail(Snapshot.data().email),
          setname(Snapshot.data().fullname),
          setPhoneNumber(Snapshot.data().phoneNumber);
      });
  }, []);

  const handleupload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      let imagepath = {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
      };
      setImgDisplay(imagepath);
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
          <Text style={styles.txtTitle}>User Profile</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={imgDisplay} style={styles.imgStyle} />
          <TouchableOpacity activeOpacity={0.72} onPress={handleupload}>
            <Icon name="camera" size={25} />
          </TouchableOpacity>
        </View>
        <Card style={styles.txtContainer}>
          <H3>Name: {name}</H3>
        </Card>
        <Card style={styles.txtContainer}>
          <H3>Email: {email}</H3>
        </Card>
        <Card style={styles.txtContainer}>
          <H3>Phone :{phoneNumber}</H3>
        </Card>
        <Card style={styles.txtContainer}>
          <H3>City/Town :{city}</H3>
        </Card>
        <Card style={styles.txtContainer}>
          <H3>Country :{country}</H3>
        </Card>
        <Button style={styles.btnUpdate}>
          <Text style={styles.btnTxt}>Update profile</Text>
        </Button>
      </View>
    </>
  );
});
ProfileScreen.navigationOptions = {
  title: "Profile",
  drawerIcon: ({ tintColor }) => (
    <Icon name="user-circle-o" style={{ fontSize: 20, color: tintColor }} />
  ),
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
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
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#dedede",
    margin: 10,
    width: "100%",
  },
  imgStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: "#dedede",
    borderWidth: 1,
  },
  txtContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#dedede",
    margin: 5,
    width: "100%",
    paddingVertical: 10,
  },
  btnUpdate: {
    backgroundColor: "#55488B",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: "100%",
  },
  btnTxt: {
    marginVertical: 10,
    fontSize: 20,
    color: "white",
  },
  txtInput: {},
});
