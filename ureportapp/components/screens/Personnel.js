import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import image from "../images/image.jpg";
import * as firebase from "firebase";
import "firebase/firebase-firestore";
import { BarIndicator } from "react-native-indicators";
import Asms from "react-native-sms-android";
import Icon from "react-native-vector-icons/FontAwesome";
import IndePage from "../corona/pages/index";

export default (Personnel = ({ navigation }) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numbers, setNumbers] = useState(["233505419444", "233500566510"]);
  const Message = `I need a securrity personnel, please call ASAP.`;

  const sendingSms = (Receivers, Messagex) => {
    Receivers.map(
      async (Numbers) =>
        await Asms.sms(Numbers, Messagex, "sendDirect", (error) => {
          if (error) {
            alert(error);
          } else {
            alert("sent");
          }
        })
    );
  };

  useEffect(() => {
    try {
      if (list == null) {
        let personnelList = [];
        setLoading(true);
        firebase
          .firestore()
          .collection("personnel")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              return personnelList.push(doc.data());
            });
            setList(personnelList);
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error getting documents", err);
          });
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#32295A" />
      <View style={styles.headLogo}>
        <TouchableOpacity
          style={styles.header1}
          onPress={navigation.openDrawer}
        >
          <Icon name="align-justify" size={25} color="white" />
        </TouchableOpacity>
        <View style={styles.header2}>
          <Text style={styles.txtTitle}>Corona Statistics</Text>
        </View>
      </View>
      {loading ? (
        <BarIndicator
          color="#55488B"
          amianting={loading}
          style={{ alignSelf: "center" }}
        />
      ) : (
        // <ScrollView>
        <IndePage />
        /* <View style={styles.container}>
            {list == null
              ? null
              : list.map(dat => {
                  return (
                    <View style={styles.card} key={dat.uid}>
                      <Image source={image} style={styles.img} />
                      <View style={styles.subcard}>
                        <Text style={styles.txtCompany}>{dat.company}</Text>
                        <Text style={styles.txtName}>{dat.name}</Text>
                        <Text style={styles.txtYears}>{dat.age}Years</Text>
                        <Text style={styles.txtHeight}>
                          {dat.height}FT Tall
                        </Text>
                        <View style={styles.btnContainer}>
                          <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={0.72}
                            onPress={() => sendingSms(numbers, Message)}
                          >
                            <Text style={styles.txtBtn}>request</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
          </View> */
        // </ScrollView>
      )}
    </>
  );
});

//export default Personnel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    margin: 2,
    borderColor: "#dedede",
    backgroundColor: "whitesmoke",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    elevation: 2,
    paddingVertical: 10,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#55488B",
    marginRight: 10,
    marginLeft: 10,
  },
  subcard: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "whitesmoke",
    marginLeft: 10,
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
  },
  txtCompany: {
    fontSize: 14,
  },
  txtName: {
    fontSize: 14,
  },
  txtYears: {
    fontSize: 14,
    color: "#dedede",
    fontStyle: "italic",
  },
  txtHeight: {
    fontSize: 14,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  btn: {
    backgroundColor: "#55488B",
    borderRadius: 15,
    height: 30,
    width: 100,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    color: "#fefefe",
  },
  header1: {
    width: "10%",
    margin: 10,
    justifyContent: "flex-start",
  },
  header2: {
    //width: "10%",
    flex: 1,
    justifyContent: "flex-end",
    margin: 10,
  },
});
