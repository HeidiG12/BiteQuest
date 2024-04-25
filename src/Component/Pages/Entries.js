import React, {useState} from "react";
import { get, ref, query, limitToLast, child} from "firebase/database";
import {db, dbRef, auth} from '../fireBaseConfig/OAuth';
import "../StyleSheets/Entries.css";

const Entries = () => {
  // State variables to store entries, restaurant names, dates, posts, and loading state
  const [entries, setEntries] = useState([]);
  const [entriesRest, setEntriesRest] = useState([]);
  const [date, setDate] = useState([]);
  const [post, setPost] = useState([]);
  const [print, setPrint] = useState(false);

  // Asynchronous function to fetch data related to user's entries
  async function queryData() {
    var keysArr = [];
    var postArr = [];
    var dateArr = [];
    var restArr = [];
    var restUpArr = [];
    var iter = 0;
    let num = 100;  //Gets the first 100 entries 

    // Query user entries from Firebase
    const que = query(ref(db, `usersData/${auth.currentUser.uid}/entries`), limitToLast(num));
    await get(que).then((snapshot)=> {
      snapshot.forEach(childSnapshot => {
        keysArr.push(childSnapshot.key);
        restUpArr.push(childSnapshot.val());
      });
    });

    // Query post details associated with entries
    const que2 = query(ref(db, `usersData/${auth.currentUser.uid}/entriespost`), limitToLast(num));
    await get(que2).then((snapshot)=> {
      snapshot.forEach(childSnapshot => {
        postArr.push(childSnapshot.val());
      });
    });

    // Query timestamps of entries
    const que3 = query(ref(db, `usersData/${auth.currentUser.uid}/entriestime`), limitToLast(num));
    await get(que3).then((snapshot)=> {
      snapshot.forEach(childSnapshot => {
        dateArr.push(childSnapshot.val());
      });
    });

    // Resolve restaurant names from the IDs
    for (const restUp of restUpArr) {
      await get(child(dbRef, `Restaurants/${restUpArr[iter]}`)).then((snapshot)=> {
        restArr.push(snapshot.val().name);
      }); 
      iter += 1;
    }

    // Set state with the retrieved data, reversed for chronological order
    setEntries(keysArr.reverse());
    setPost(postArr.reverse());
    setDate(dateArr.reverse());
    setEntriesRest(restArr.reverse());
    setPrint(true);

  }

  // Invoke queryData once if data hasn't been printed yet
  if (!print) {
    queryData();
  }

  // Render UI based on the current state
  return (
    <div>
      {entries.length === 0 ? 
      (
        <div>
          <h1>No entries yet</h1>
        </div>
      )
      :
      print ? 
      (
        <div>
          <h1>Recent Entries</h1>
          {(Array.from(entries)).map((item2, index) => ( 
            <div>
              <div className="base">
                <div className="line">
                  <label className="name">Restaurant: {entriesRest[index]}</label>
                  <label className="date">{date[index]}</label>
                </div>
                <br></br><br></br>
                <label className="entriesPost">{post[index]}</label><br></br>
              </div>
              <br></br>
            </div>
          ))
          }
        </div>
      )
      :
      (
      <div>
        <p>
          retrieving...
        </p>
      </div>
      )}
    </div>
  );
};

// Export the Entries component
export default Entries;
