alert("Hello World!");
import logo from './logo.svg';
import './App.css';
import './index.html';
import { initializeApp } from 'firebase/app';
import {getDatabase, onValue, ref, child, get, set, update, remove} from 'firebase/database';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
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
const app = initializeApp(firebaseConfig);
const db = getDatabase();
let name = document.getElementById("name");
let find = document.getElementById("find");
const dbRef = ref(db);
const dsrref = ref(db); 

let flavorsDiv = document.getElementById("flavorsDiv");
let cuisineDiv = document.getElementById("cuisineDiv");
let restrictDiv = document.getElementById("restrictDiv");
const buttonGroupPressed = e => { 
    const isButton = e.target.nodeName === 'BUTTON';
    //if(!isButton) {
        //return
    //}
    console.log(e.target.id);
    if (e.target.id.includes("&")) {
        var rest = e.target.id.replace('&', '*')
        //console.log("Modified: ", rest);
        window.open(`destination.html?myVar=${rest}`, "_blank");
    }
    else {
        window.open(`destination.html?myVar=${e.target.id}`, "_blank");
    }
} 
alert("linked");//console.log("linked");
window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("flavorButton").addEventListener("click",  function() {
        myDisplay(flavorsDiv);
        console.log("pressed");
    }, );
    document.getElementById("cuisineButton").addEventListener("click",  function() {
        myDisplay(cuisineDiv);
    }, );
    document.getElementById("restrictButton").addEventListener("click",  function() {
        myDisplay(restrictDiv);
    }, );
    document.getElementById("tagSubmit").addEventListener("click", function() {
        checkingTagsSelected();
    }, );
    document.getElementById("results").addEventListener("click", buttonGroupPressed);
});
var checkboxes = document.querySelectorAll("input[type=checkbox][name=boxes]");
let enabledSettings = []
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        enabledSettings = 
        Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
        let tags = "";
        enabledSettings.forEach(function (item) {
            tags += item +",";
        });
        console.log(enabledSettings)
        displaySelected(enabledSettings);
    })
});
function displaySelected(enabledSettings) {
    document.getElementById("selectedDiv").innerHTML = "";
    enabledSettings.forEach((tag) => {
        var newlabel = document.createElement("label");
        newlabel.className = "selected";
        newlabel.innerHTML = tag;
        document.getElementById("selectedDiv").appendChild(newlabel);
    });
}

function myDisplay(x) {
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
async function getData(arrFinal) {    //CHANGE THIS LATER TO JUST PRINTING NOT CALLING ON DATABASE 
    var testing = [];
    //console.log("getting Data: ", arrFinal);
    var results = document.getElementById("results");
    if (results) {
      document.getElementById("results").innerHTML = "";
    }
    for (var i = 0; arrFinal.lenght; i++) {
        var path = ref(db, `Restaurants/${arrFinal[i].toUpperCase()}`);
        await onValue(path, (snapshot)=> {
        if (snapshot.exists()) {
          var newElement = document.createElement("input");
          newElement.type = "button";
          newElement.className = "results";
          newElement.value = snapshot.val().name;
          newElement.id = snapshot.val().name;
          document.getElementById("results").appendChild(newElement);
          testing.push(snapshot.val().name);
        }
        });
    };
    return testing;
}
function checkingTagsSelected() {
    var form = enabledSettings;
    var tagsSelected = [];
    for (var i=0; i<form.length; i++) {
        tagsSelected.push(form[i]);
    }
    tagSearch(tagsSelected);
}
async function tagSearch(tagsSelected)  {
    let map = new Map();
    let go = false;
    let sortedArr = [];
    let arrFinal = []
    for (var j=0; j<tagsSelected.length; j++) {
        const path = ref(db, `Tags/${tagsSelected[j].toUpperCase()}`);
        await get(child(dbRef, `Tags/${tagsSelected[j].toUpperCase()}`)).then((snapshot)=>{
            sortedArr = mixingSort(snapshot, j, sortedArr);
        });
    }
    //await arrFinal = sortingResults(sortedArr, tagsSelected, arrFinal);
    arrFinal = await sortingResults(sortedArr, tagsSelected, arrFinal);
    //console.log(arrFinal);
    return arrFinal;
    //console.log("ArrFINAL: ", )
}
function mixingSort(snapshot, j, sortedArr) {
    //console.log(typeof(snapshot));
    var arr = [];
    let filteredArray = [];
    snapshot.forEach((childSnapshot) => {
        arr.push(childSnapshot.key);
    });
    if (j!=0) {
        filteredArray = arr.filter(value => sortedArr.includes(value));
        return filteredArray;
    }
    return arr;
}
var mapSorted = new Map();
async function sortingResults(sortedArr, tagsSelected, arrFinal) {
    //console.log("Here: ", mapSorted);
    for (var i=0; i<tagsSelected.length; i++) {
        for (var j=0; j<sortedArr.length; j++) {
            //var path = ref(db, `Tags/${tagsSelected[i].toUpperCase()}/${sortedArr[j]}`);
            await get(child(dbRef, `Tags/${tagsSelected[i].toUpperCase()}/${sortedArr[j]}`)).then((snapshot)=>{
                //onValue(path, (snapshot)=> {
                //get(child(dbRef, `Tags/${tags.toUpperCase()}/${restaurant}`)).then((snapshot)=>{
                //console.log("snapshot: ", snapshot.key, snapshot.val());
                if (mapSorted.has(snapshot.key)) {
                    mapSorted.set(snapshot.key, mapSorted.get(snapshot.key)+snapshot.val());
                    //console.log("element: ", snapshot.key, mapSorted.get(snapshot.key))
                }
                else {
                    mapSorted.set(snapshot.key, snapshot.val());
                    //console.log("element: ", snapshot.key, mapSorted.get(snapshot.key))
                }
            })
        }
    }
    //console.log("Final Map: ");
    mapSorted.forEach((values, keys) => {
        //console.log(keys, values);
    });

    let arrSorted = Array.from(mapSorted.values());
    arrSorted.sort(function(a, b) {
        return b - a;
    });
    //let arrFinal = [];
    //console.log("Sorted Numbers: ", arrSorted);
    for(var k=0; k<arrSorted.length; k++) {
        mapSorted.forEach((keys, values) => {
            if (keys === arrSorted[k]) {
                arrFinal.push(values);
                mapSorted.delete(values);
            }
        });
    }
    //mapSorted.clear();
    getData(arrFinal);
    return arrFinal;
}

export {tagSearch, sortingResults, mixingSort};
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Hello</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

//export default App;
