import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase, { firestore } from "firebase";
import { Card, Button, Input, InputGroup } from "native-base";

export default (DeleteContact = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [numbers, setNumbers] = useState(["233553826524"]);
  const [contact, setcontact] = useState();

  const db = firebase.firestore();
  let userid = firebase.auth().currentUser.uid;

  //add neighbour contact
  const addContact = () => {
    if (!contact) {
      alert("please enter a number");
    } else if (contact.length !== 10 && contact.length !== 12) {
      alert("please enter a valid phone number");
    } else if (isNaN(contact)) {
      alert("please enter numbers only");
    } else {
      numbers.push(contact);
      setcontact("");
    }
  };

  //send contact to database
  const sendContact = () => {
    if (numbers.length > 1) {
      db.collection("contact")
        .doc(userid)
        .set(
          {
            contact: numbers,
          },
          { merge: true }
        )
        .catch((error) => console.log(error));
    } else {
      alert("please provide numbers");
    }
  };
  //@clearAll clear all contacts
  const handleDelteAll = () => {
    db.collection("contact")
      .doc(userid)
      .delete();
  };

  //@del delete a single contact
  const handleDelteOne = (id) => {
    db.collection("contact")
      .doc(userid)
      .update({
        contact: firestore.FieldValue.arrayRemove(id, 1),
      });
  };
  //@component will update
  useEffect(() => {
    addContact, sendContact, handleDelteAll, handleDelteOne;
  });
  //@fetch fetch data from database
  useEffect(() => {
    let numbers = [];
    db.collection("contact")
      .doc(userid)
      .get()
      .then((Snapshot) => {
        Snapshot.data().contact.map((e) => {
          numbers.push(e);
        });
        setContacts(numbers);
      })

      .catch((error) => console(error));
  }, [handleDelteAll, handleDelteOne, addContact, sendContact]);

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
          <Text style={styles.txtTitle}>Edit Contacts</Text>
        </View>
      </View>
      <InputGroup>
        <Input
          placeholder="enter contact"
          onChangeText={(text) => setcontact(text)}
          value={contact}
          clearButtonMode="always"
        />
        <Button onPress={addContact} style={styles.addBtn}>
          <Text style={styles.addTxt}>+</Text>
        </Button>
      </InputGroup>
      <InputGroup
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button style={styles.saveBtn} onPress={sendContact}>
          <Text style={styles.saveTxt}>save</Text>
        </Button>
      </InputGroup>

      <View>
        <ScrollView>
          {contacts.map((data) => {
            return (
              <Card style={styles.contactContainer}>
                <Text style={styles.contactTxt}>{data}</Text>
                <Icon
                  name="remove"
                  color="red"
                  size={25}
                  style={styles.deleteBtn}
                  onPress={() => handleDelteOne(data)}
                />
              </Card>
            );
          })}
          <Card>
            <Button onPress={handleDelteAll} style={styles.clearAllBtn} danger>
              <Text style={styles.clearAllTxt}>clear all</Text>
            </Button>
          </Card>
        </ScrollView>
      </View>
    </>
  );
});
// customizing my drawer
DeleteContact.navigationOptions = {
  title: "Edit contact",
  drawerIcon: ({ tintColor }) => (
    <Icon name="phone" style={{ fontSize: 20, color: tintColor }} />
  ),
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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

  header1: {
    width: "10%",
    margin: 10,
    justifyContent: "flex-start",
  },
  contactContainer: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  contactTxt: {
    fontSize: 20,
    marginLeft: 20,
  },
  deleteBtn: {
    marginRight: 20,
  },
  clearAllBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginRight: 10,
  },
  addBtn: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: "dimgray",
  },
  addTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  clearAllTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  saveBtn: {
    width: "100%",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#55488D",
  },
  saveTxt: {
    fontSize: 20,
    color: "white",
  },
});
