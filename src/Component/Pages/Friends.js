import React from "react";
import "../StyleSheets/Friends.css";
import pic1 from "../imgs/harrys.png";
import pic2 from "../imgs/swamp.png";
import pic3 from "../imgs/maudes.png";
import pic4 from "../imgs/satchel.png";
import pic5 from "../imgs/bistro.png";
import pic6 from "../imgs/bolay.png";
import pic7 from "../imgs/luke.png";
import pic8 from "../imgs/apa.png";

const Friends = () => {
  return (
    <div className="home">
      <div className="about">
        <h2>Your Friends</h2>
        <div className="homePictures">
          <button className="pic">
            <img src={pic1} alt="Harry's" />
            <div class="card-text">Joyin</div>
          </button>
          <button className="pic">
            <img src={pic3} alt="Maudes" />
            <div class="card-text">Tina</div>
          </button>
          <button className="pic">
            <img src={pic2} alt="Swamp" />
            <div class="card-text">Heidi</div>
          </button>
          <button className="pic">
            <img src={pic4} alt="Satchel" />
            <div class="card-text">Jess</div>
          </button>
        </div>
        <div className="homePictures">
          <button className="pic">
            <img src={pic5} alt="Bistro" />
            <div class="card-text">Tenders</div>
          </button>
          <button className="pic">
            <img src={pic6} alt="Bolay" />
            <div class="card-text">Albert</div>
          </button>
          <button className="pic">
            <img src={pic7} alt="Luke" />
            <div class="card-text">Alberta</div>
          </button>
          <button className="pic">
            <img src={pic8} alt="Apa" />
            <div class="card-text">Gator</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friends;
