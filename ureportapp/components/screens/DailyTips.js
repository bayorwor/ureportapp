import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { BarIndicator } from "react-native-indicators";

export default (DailyTips = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);

  useEffect(() => {
    try {
      if (list == null) {
        let dailyList = [];
        setLoading(true);
        firebase
          .firestore()
          .collection("dailyTips")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              return dailyList.push(doc.data());
            });
            setList(dailyList);
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

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

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
          <Text style={styles.txtTitle}>Daily Tips</Text>
        </View>
      </View>
      {loading ? (
        <BarIndicator
          color="#55488B"
          amianting={loading}
          style={{ alignSelf: "center" }}
        />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            {list == null
              ? null
              : list.map((dat) => {
                  return (
                    <View style={styles.tipsContainer}>
                      <Text>{dat.daily}</Text>
                      <View style={styles.shareContainer}>
                        <Text style={styles.txtdate}>{dat.datetime}</Text>
                      </View>
                    </View>
                  );
                })}
          </ScrollView>
        </View>
      )}
    </>
  );
});
DailyTips.navigationOptions = {
  title: "Daily News",
  drawerIcon: ({ tintColor }) => (
    <Icon name="book" style={{ fontSize: 20, color: tintColor }} />
  ),
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    margin: 5,
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
  tipsContainer: {
    margin: 1,
    borderColor: "#dedede",
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    elevation: 1,
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
  shareContainer: {
    paddingTop: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopWidth: 1,
    borderColor: "#dedede",
  },
});
