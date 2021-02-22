import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import firebase from "firebase";

export default HomeScreen = props => {
  //function for modal display

  const [visible, setVisible] = useState(!true);
  const [contact, setcontact] = useState([]);
  const [value, setvalue] = useState(["233505419444", "233553826524"]);

  const addContact = () => {
    contact.push(contact);
    props.setn(contact);
  };

  useEffect(() => {
    setvalue(contact);
  }, []);

  const sendContact = () => {
    let userid = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("contact")
      .doc(userid)
      .set({
        contact: contact
      })
      .catch(error => alert(error));
  };

  showModal = () => {
    setVisible(true);
  };

  closeModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    showModal;
  });

  return (
    <>
      <StatusBar backgroundColor="#32295A" />
      <Modal
        style={{ alignItems: "center", justifyContent: "center" }}
        visible={visible}
        onRequestClose={() => closeModal}
        animationType={"slide"}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => closeModal()}
          >
            <Icon name="highlight-off" size={30} color="red" />
            <Text>close</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Icon name="call" size={25} />
            <TextInput
              placeholder="phone number"
              style={styles.textInput}
              onChangeText={text => setcontact(text)}
            />
            <TouchableOpacity onPress={addContact}>
              <Icon name="send" size={25} color="#56756D" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={sendContact}>
            <Icon name="share" size={25} color="#56756D" />
            <Text>upload</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.container}>
        <View style={styles.conactInstructions}>
          <TouchableOpacity onPress={showModal}>
            <Text style={styles.addLink}>please add contacts</Text>
          </TouchableOpacity>
          <Text> to the emergency response</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    height: "60%",
    alignSelf: "center",
    backgroundColor: "#dedede",
    borderRadius: 10
  },
  modalBtn: {
    margin: 15,
    height: "20%",
    width: 150,
    borderColor: "#56756D",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  closeBtn: {
    width: "100%",
    alignItems: "center",
    margin: 0,
    marginTop: -1,
    marginBottom: 10
  },
  conactInstructions: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  addLink: {
    color: "blue",
    fontSize: 18
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 90,
    borderColor: "#56756D",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10
  },
  textInput: {
    width: "80%"
  }
});
