import React from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/Friends.css";
import pic1 from "../imgs/mountain.jpeg";
import pic2 from "../imgs/ocean.jpg";
import pic3 from "../imgs/meadow.jpg";
import pic4 from "../imgs/forest.jpg";
import pic5 from "../imgs/tenders.jpg";
import pic6 from "../imgs/albert.jpg";
import pic7 from "../imgs/alberta.jpg";
import pic8 from "../imgs/gator.jpg";

const Friends = () => {
  return (
    <div className="home">
      <div className="header">
        <div className="logo1"></div>
      </div>
      <div className="about">
        <h2>Your Friends</h2>
        <div className="homePictures">
          <div className="pic">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
              to={`/friends/Joyin`}
              id={"Joyin"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic1} alt="Mountains" />
              </button>
              {"Joyin"}
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
              to={`/friends/Tina`}
              id={"Tina"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic3} alt="Meadow" />
              </button>
              {"Tina"}
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
              to={`/friends/Heidi`}
              id={"Heidi"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic2} alt="Ocean" />
              </button>
              {"Heidi"}
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
              to={`/friends/Jess`}
              id={"Jess"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic4} alt="Forest" />
              </button>
              {"Jess"}
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
              to={`/friends/Tenders`}
              id={"Tenders"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic5} alt="Tenders" />
              </button>
              {"Tenders"}
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
              to={`/friends/Albert`}
              id={"Albert"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic6} alt="Albert" />
              </button>
              {"Albert"}
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
              to={`/friends/Alberta`}
              id={"Alberta"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic7} alt="Alberta" />
              </button>
              {"Alberta"}
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
              to={`/friends/Gator`}
              id={"Gator"}
              className="homeResults"
            >
              <button className="buttonEdit">
                <img src={pic8} alt="Gator" />
              </button>
              {"Gator"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
