import "../StyleSheets/Profile.css";
import React from "react";
import pic8 from "../imgs/gator.jpg";

const Joyin = () => {
  return (
    <div className="profilePageStruct">
      <div class="flex-container">
        <div class="flex-item">
          <img className="profilePic" src={pic8} alt="profile picture" />
          <h1 className="profileName">Gator</h1>
          <h1 className="profileUserName">Gator123</h1>
        </div>

        <div class="flex-item" style={{ width: "90%", "padding-top": "10px" }}>
          <div className="flex-container">
            <div class="flex-item headingBig" style={{ width: "90%" }}>
              2 Reviews
            </div>
            <div class="flex-item headingBig" style={{ width: "90%" }}>
              3 Friends
            </div>
            <div class="flex-item headingBig" style={{ width: "90%" }}>
              4 Following
            </div>
          </div>
          <p style={{textAlign:"left"}}>add follow button</p>
          <h1
            className="profileName"
            style={{
              "text-align": "left",
              "margin-left": "45px",
              "margin-top": "30px",
            }}
          >
            Profile Bio
          </h1>
          <h1
            className="paragraph"
            style={{
              "text-align": "left",
              "margin-left": "9px",
              "margin-top": "10px",
            }}
          >
            Words of profile bio
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Joyin;
