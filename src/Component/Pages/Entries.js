import React, {useState} from "react";
import { get, ref, query, limitToLast, child} from "firebase/database";
import {db, dbRef, auth} from '../fireBaseConfig/OAuth';
import "../StyleSheets/Entries.css";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [entriesRest, setEntriesRest] = useState([]);
  const [date, setDate] = useState([]);
  const [post, setPost] = useState([]);
  const [print, setPrint] = useState(false);

  async function queryData() {
    var keysArr = [];
    var postArr = [];
    var dateArr = [];
    var restArr = [];
    var restUpArr = [];
    var iter = 0;
    let num = 100;  //Gets the first 100 entries 
    const que = query(ref(db, `users/${auth.currentUser.uid}/entries`), limitToLast(num));
    await get(que).then((snapshot)=> {
      console.log("child count: " + snapshot.size);
      snapshot.forEach(childSnapshot => {
        console.log(childSnapshot.key);
        keysArr.push(childSnapshot.key);
        restUpArr.push(childSnapshot.val());
      });
    });
    const que2 = query(ref(db, `users/${auth.currentUser.uid}/entriespost`), limitToLast(num));
    await get(que2).then((snapshot)=> {
      console.log("child count: " + snapshot.size);
      snapshot.forEach(childSnapshot => {
        postArr.push(childSnapshot.val());
      });
    });
    const que3 = query(ref(db, `users/${auth.currentUser.uid}/entriestime`), limitToLast(num));
    await get(que3).then((snapshot)=> {
      console.log("child count: " + snapshot.size);
      snapshot.forEach(childSnapshot => {
        dateArr.push(childSnapshot.val());
      });
    });
    for (const restUp of restUpArr) {
      await get(child(dbRef, `Restaurants/${restUpArr[iter]}`)).then((snapshot)=> {
        restArr.push(snapshot.val().name);
      }); 
      iter += 1;
    }
    setEntries(keysArr.reverse());
    setPost(postArr.reverse());
    setDate(dateArr.reverse());
    setEntriesRest(restArr.reverse());
    console.log("size: " + entries.length);
    console.log(entries);
    setPrint(true);

  }
  if (!print) {
    queryData();
  }
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
          {console.log("return print: " + entries)}
          {console.log(post)}
          {console.log(date)}
          {console.log(entriesRest)}
          {(Array.from(entries)).map((item2, index) => ( 
            <div>
              <div className="base">
                <div className="line">
                  <label className="name">Restaurant: {entriesRest[index]}</label>
                  <label className="date">{date[index]}</label>
                </div>
                <br></br><br></br>
                <label>{post[index]}</label><br></br>
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
export default Entries;
