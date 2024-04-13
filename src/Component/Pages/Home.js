import React from "react";
import "../StyleSheets/Home.css";
import pic1 from "../imgs/harrys.png";
import pic2 from "../imgs/swamp.png";
import pic3 from "../imgs/maudes.png";
import pic4 from "../imgs/satchel.png";
import pic5 from "../imgs/bistro.png";
import pic6 from "../imgs/bolay.png";
import pic7 from "../imgs/luke.png";
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
          <button className="pic">
            <img src={pic1} alt="Harry's" />
            <div class="card-text">Harry's Seafood Bar & Grille</div>
          </button>
          <button className="pic">
            <img src={pic3} alt="Maudes" />
            <div class="card-text">Maude's Cafe</div>
          </button>
          <button className="pic">
            <img src={pic2} alt="Swamp" />
            <div class="card-text">The Swamp Resturant</div>
          </button>
          <button className="pic">
            <img src={pic4} alt="Satchel" />
            <div class="card-text">Satchel’s Pizza</div>
          </button>
        </div>
        <div className="homePictures">
          <button className="pic">
            <img src={pic5} alt="Bistro" />
            <div class="card-text">Bistro 1245</div>
          </button>
          <button className="pic">
            <img src={pic6} alt="Bolay" />
            <div class="card-text">Bolay</div>
          </button>
          <button className="pic">
            <img src={pic7} alt="Luke" />
            <div class="card-text">Luke's New York Bagel</div>
          </button>
          <button className="pic">
            <img src={pic8} alt="Apa" />
            <div class="card-text">Mi Apá Latin Café</div>
          </button>
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
