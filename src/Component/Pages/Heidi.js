import "../StyleSheets/Profile.css";
import React from "react";
import pic2 from "../imgs/ocean.jpg";

const Joyin = () => {
  return (
    <div className="profilePageStruct">
      <div class="flex-container">
        <div class="flex-item">
          <img className="profilePic" src={pic2} alt="profile picture" />
          <h1 className="profileName">Heidi</h1>
          <h1 className="profileUserName">Heidi24</h1>
        </div>

        <div class="flex-item" style={{ width: "90%", "padding-top": "10px" }}>
          <div className="flex-container">
            <div class="flex-item headingBig" style={{ width: "90%" }}>
              5 Reviews
            </div>
            <div class="flex-item headingBig" style={{ width: "90%" }}>
              3 Friends
            </div>
            <div class="flex-item headingBig" style={{ width: "90%" }}>
              6 Following
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
            I love hispanic food!!!!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Joyin;
