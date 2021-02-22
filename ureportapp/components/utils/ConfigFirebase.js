import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBl7jbp_1pSjm4y34XF6OBK7QKmscyaM4A",
  authDomain: "ureport-7d983.firebaseapp.com",
  databaseURL: "https://ureport-7d983.firebaseio.com",
  projectId: "ureport-7d983",
  storageBucket: "",
  messagingSenderId: "799747241690",
  appId: "1:799747241690:web:1ef1b55d86ab8616"
};
// Initialize Firebase
export default firebase = Firebase.initializeApp(firebaseConfig);

//  export const db = app.database();

// export default !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();
