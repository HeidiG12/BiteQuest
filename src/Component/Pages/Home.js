import React from "react";
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

const Home = () => {
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
        <p>need to write code to have recent reviews show up here</p>
      </div>
    </div>
  );
};

export default Home;
