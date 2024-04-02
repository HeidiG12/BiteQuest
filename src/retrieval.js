// Import the functions you need from the SDKs you need
//import {initializeApp} from 'firebase/app';
//import {getAnalytics} from 'firebase/analytics';
//import {getFirestore} from 'firebase/firestore';
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 var firebaseConfig = {
    apiKey: "AIzaSyDY7XjksxyklzjofNZ-J3CBYj_ovmA0Oho",
    authDomain: "bitequest-68fcf.firebaseapp.com",
    databaseURL: "https://bitequest-68fcf-default-rtdb.firebaseio.com",
    projectId: "bitequest-68fcf",
    storageBucket: "bitequest-68fcf.appspot.com",
    messagingSenderId: "198288473851",
    appId: "1:198288473851:web:ca305f85aa1e475d5afa5e",
    measurementId: "G-NGK8MVZX91"
 };

 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 const app = initializeApp(firebaseConfig);
 //const analytics = getAnalytics(app); 
 //import {getDatabase, onValue, ref, child, get, set, update, remove} from 'firebase/database';
 //const db = getDatabase();
 //let name = document.getElementById("name");
 //let find = document.getElementById("find");
 //let GetBtn = document.getElementById("GetBtn");

function trial() {
    alert("Hello, world!");
    console.log("here");
    document.getElementById("demo").innerHTML = "hello";    //To print to doc  
}
//document.getElementById("GetBtn").addEventListener("click", trial);