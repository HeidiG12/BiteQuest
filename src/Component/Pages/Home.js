import React, {useState} from "react";
import "../StyleSheets/Home.css";
import { Link } from "react-router-dom";
import pic1 from "../imgs/harrys.png";
import pic2 from "../imgs/sublime tacos.jpg";
import pic3 from "../imgs/maudes.png";
import pic4 from "../imgs/flaco.jpg";
import pic5 from "../imgs/cryBaby.jpeg";
import pic6 from "../imgs/bolay.png";
import pic7 from "../imgs/paris.jpg";
import pic8 from "../imgs/apa.png";
import { get, ref, query, limitToLast, child} from "firebase/database";
import {db, dbRef} from '../fireBaseConfig/OAuth';

const Home = () => {
  const [reviews, setReviews] = useState([]); // State to hold review data
  const [rest, setRest] = useState([]); // State to hold restaurant data
  const [once, setOnce] = useState(false); // State to check if data has been fetched

  async function retrieveRecent(){
  // Array initialization
  var keysArr = [];
  var userArr = [];
  var postArr = [];
  var restArr = [];
  var restUpArr = [];

  // Firebase query to get recent reviews
  let num = 4;
  const que = query(ref(db, `Reviews`), limitToLast(num));

  await get(que).then((snapshot)=> {
    snapshot.forEach(childSnapshot => {
      console.log(childSnapshot.key);
      keysArr.push(childSnapshot.key);
      userArr.push(childSnapshot.val());
    });
  });

  // Fetching detailed data for each review
  let iter = 0;
  for (const user of userArr) {
    await get(child(dbRef, `usersData/${user}/entriespost/${keysArr[iter]}`)).then((snapshot)=> {
      postArr.push(snapshot.val());
    });
    await get(child(dbRef, `usersData/${user}/entries/${keysArr[iter]}`)).then((snapshot)=> {
      restUpArr.push(snapshot.val());
    });
    await get(child(dbRef, `Restaurants/${restUpArr[iter]}`)).then((snapshot)=> {
      restArr.push(snapshot.val().name);
    }); 
    iter += 1;
  }

  setReviews(postArr.reverse()); // Setting state with reversed arrays
  setRest(restArr.reverse());
  setOnce(true);
  } 

  // Fetching data if not done before
  if (!once) {
    retrieveRecent();
  }

  // Return the main structure of the Home component with all sections and conditional rendering for recent quests
  return (
    <div className="home">
      <div className="header">
        <div className="logo1"></div>
      </div>
      <div className="about">
        <h2>Featured</h2>
        <div className="homePictures">
          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/results/${"HARRY'S SEAFOOD BAR & GRILLE"}`}
              id={"HARRY'S SEAFOOD BAR & GRILLE"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic1} alt="Harry's" />
              </button>
              {"Harry's Seafood Bar & Grille"}
            </Link>
          </div>

          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/results/${"MAUDE'S CAFE"}`}
              id={"MAUDE'S CAFE"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic3} alt="Maudes" />
              </button>
              {"Maude's Cafe"}
            </Link>
          </div>

          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/results/${"SUBLIME TACOS"}`}
              id={"SUBLIME TACOS"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic2} alt="Sublime Tacos" />
              </button>
              {"Sublime Tacos"}
            </Link>
          </div>

          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/results/${"FLACO'S CUBAN BAKERY"}`}
              id={"FLACO'S CUBAN BAKERY"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic4} alt="Flaco" />
              </button>
              {"Flaco's Cuban Bakery"}
            </Link>
          </div>
        </div>

        <div className="homePictures">
          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/results/${"CRY BABY’S"}`}
              id={"CRY BABY’S"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic5} alt="Cry Baby" />
              </button>
              {"Cry Baby's"}
            </Link>
          </div>

          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/results/${"BOLAY FRESH BOLD KITCHEN"}`}
              id={"BOLAY FRESH BOLD KITCHEN"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic6} alt="Bolay" />
              </button>
              {"Bolay"}
            </Link>
          </div>

          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/results/${"PARIS BANH MI"}`}
              id={"PARIS BANH MI"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic7} alt="Paris Banh Mi" />
              </button>
              {"Paris Banh Mi"}
            </Link>
          </div>

          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/results/${"MI APÁ LATIN CAFÉ"}`}
              id={"MI APÁ LATIN CAFÉ"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic8} alt="Apa" />
              </button>
              {"Mi Apá Latin Café"}
            </Link>
          </div>
        </div>
      </div>

      <div className="about">
        <h2>Recent Quests</h2>
        {once ? 
        (
          <div className="recent">
            {(Array.from(reviews)).map((post, index) => ( 
              <div className="showRecent">
                <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                }}
                to={`/results/${rest[index].toUpperCase()}`}
                id={rest[index]}
                className="homeResults"
              >
              <button className="buttonEditRecent">"{post}"
              </button>
              <label className="cap">{rest[index]}</label>
              </Link>
              </div>
          ))
        }
          </div>
        )
        :
        (
        <p>Loading...</p>)
        }
      </div>
    </div>
  );
};

// Exporting the Home component for use in routing and other components
export default Home;
