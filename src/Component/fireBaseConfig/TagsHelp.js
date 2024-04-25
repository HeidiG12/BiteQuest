// Import database configuration and references from Firebase configuration.
import {db, dbRef} from '../fireBaseConfig/OAuth'
import {onValue, ref, child, get} from "firebase/database";

// Select all checkbox elements for tag input.
var checkboxes = document.querySelectorAll("input[type=checkbox][name=boxes]");
let enabledSettings = []

// Add change event listeners to checkboxes to handle user selections.
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

// Function to display selected tags visually in the webpage.
function displaySelected(enabledSettings) {
    document.getElementById("selectedDiv").innerHTML = "";
    enabledSettings.forEach((tag) => {
        var newlabel = document.createElement("label");
        newlabel.className = "selected";
        newlabel.innerHTML = tag;
        document.getElementById("selectedDiv").appendChild(newlabel);
    });
}

// Toggle display utility function.
function myDisplay(x) {
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Function to fetch data based on selected tags.
async function getData(arrFinal) {   
    var testing = [];
    var results = document.getElementById("results");
    if (results) {
      document.getElementById("results").innerHTML = "";
    }
    for (const restaurant of arrFinal) {
        var path = ref(db, `Restaurants/${restaurant.toUpperCase()}`);
        await onValue(path, (snapshot)=> {
        if (snapshot.exists()) {
            console.log("should be printing results");
            return (
                <div> 
                    <button type="button" className="results" value="{snapshot.val().name}" id="snapshot.val().name"></button>
                </div>
            );
        }
        });
    };
    return testing;
}

// Function to validate selected tags.
function checkingTagsSelected(x) {
    console.log("Heere:", x);
    return tagSearch(x);
}

// Function to search tags and compute tag-based logic.
async function tagSearch(tagsSelected)  {
    let map = new Map();
    let go = false;
    let sortedArr = [];
    let arrFinal = []
    var index = 0;
    for(const tag of tagsSelected) {
        console.log("element: ", tag);
        index += 1;
        await get(child(dbRef, `Tags/${tag.toUpperCase()}`)).then((snapshot)=>{
            if (snapshot.exists()) {
                console.log("exists");
            }
            sortedArr = mixingSort(snapshot, sortedArr, index);
        });
    }
    arrFinal = await sortingResults(sortedArr, tagsSelected, arrFinal);
    return arrFinal;
}

// Helper function for mixing sort based on tags and index.
function mixingSort(snapshot, sortedArr, index) {
    var arr = [];
    let filteredArray = [];
    snapshot.forEach((childSnapshot) => {
        arr.push(childSnapshot.key);
    });
    if (index!=1) {
        filteredArray = arr.filter(value => sortedArr.includes(value));
        return filteredArray;
    }
    return arr;
}

var mapSorted = new Map();

// Function to sort the results based on some accumulated criteria.
async function sortingResults(sortedArr, tagsSelected, arrFinal) {
    console.log("Here: ");
    
    for (const i of tagsSelected) {
        for (const j of sortedArr) {
            await get(child(dbRef, `Tags/${i.toUpperCase()}/${j}`)).then((snapshot)=>{
                if (mapSorted.has(snapshot.key)) {
                    mapSorted.set(snapshot.key, mapSorted.get(snapshot.key)+snapshot.val());
                }
                else {
                    mapSorted.set(snapshot.key, snapshot.val());
                }
            })
        }
    }
    
    mapSorted.forEach((values, keys) => {
        console.log(keys, values);
    });

    let arrSorted = Array.from(mapSorted.values());
    arrSorted.sort(function(a, b) {
        return b - a;
    });
    
    for(const k of arrSorted) {
        mapSorted.forEach((keys, values) => {
            if (keys === k) {
                arrFinal.push(values);
                mapSorted.delete(values);
            }
        });
    }
    
    console.log("ArrFinal: ", arrFinal);
    return arrFinal;
}

// Export all utility and processing functions.
export {displaySelected, myDisplay, getData, checkingTagsSelected, tagSearch, mixingSort, sortingResults};
