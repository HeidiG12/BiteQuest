import React, { useState, useEffect } from "react";
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

const initialFriendsData = [
  { name: "Joyin", pic: pic1, reviews: 8, following: 4, email: "Joyin@gmail.com", Bio: "Hello I'm Joyin", description: "Joyin: An intrepid explorer of cultural landscapes, blending artistry and anthropology to uncover the beauty in diversity ", follow: false, restaurantName1: "Cafe Delight", review1: "An exquisite experience with flavors that dance on the palate.", restaurantName2: "Seaside Eats", review2: "The seafood is fresh, flavorful, and served with a beautiful ocean view."},
  { name: "Tina", pic: pic3, reviews: 2, following: 5, email: "Tina@gmail.com", Bio: "Hello I'm Tina", description: "Tina: A tech-savvy trailblazer, harnessing innovation to create seamless experiences and shape the future of digital connectivity. ", follow: false, restaurantName1: "Cafe Delight", review1: "An exquisite experience with flavors that dance on the palate.", restaurantName2: "Seaside Eats", review2: "The seafood is fresh, flavorful, and served with a beautiful ocean view."},
  { name: "Heidi", pic: pic2, reviews: 1, following: 7, email: "Heidi@gmail.com", Bio: "Hello I'm Heidi", description: "Heidi: A compassionate healer, blending ancient wisdom with modern practices to nurture holistic wellness in mind, body, and spirit.", follow: false, restaurantName1: "Cafe Delight", review1: "An exquisite experience with flavors that dance on the palate.", restaurantName2: "Seaside Eats", review2: "The seafood is fresh, flavorful, and served with a beautiful ocean view."},
  { name: "Jess", pic: pic4, reviews: 9, following: 8, email: "Jess@gmail.com", Bio: "Hello I'm Jess", description: "Jess: A visionary eco-entrepreneur, weaving sustainability into every aspect of life with boundless creativity and infectious enthusiasm.", follow: false, restaurantName1: "Cafe Delight", review1: "An exquisite experience with flavors that dance on the palate.", restaurantName2: "Seaside Eats", review2: "The seafood is fresh, flavorful, and served with a beautiful ocean view."},
  { name: "Tenders", pic: pic5, reviews: 3, following: 1, email: "Tenders@gmail.com", Bio: "Hello I'm Tenders", description: "Tenders: A culinary virtuoso, crafting unforgettable gastronomic experiences that tantalize the senses and ignite the soul.", follow: false, restaurantName1: "Cafe Delight", review1: "An exquisite experience with flavors that dance on the palate.", restaurantName2: "Seaside Eats", review2: "The seafood is fresh, flavorful, and served with a beautiful ocean view."},
  { name: "Albert", pic: pic6, reviews: 2, following: 8, email: "Albert@gmail.com", Bio: "Hello I'm Albert", description: "Albert: A cerebral architect of code, sculpting digital realms with precision and ingenuity to push the boundaries of possibility.", follow: false, restaurantName1: "Cafe Delight", review1: "An exquisite experience with flavors that dance on the palate.", restaurantName2: "Seaside Eats", review2: "The seafood is fresh, flavorful, and served with a beautiful ocean view."},
  { name: "Alberta", pic: pic7, reviews: 2, following: 4, email: "Alberta@gmail.com", Bio: "Hello I'm Alberta", description: "Alberta: A nurturing force of nature, cultivating community and fostering growth with a heart as vast as the prairies.", follow: false, restaurantName1: "Cafe Delight", review1: "An exquisite experience with flavors that dance on the palate.", restaurantName2: "Seaside Eats", review2: "The seafood is fresh, flavorful, and served with a beautiful ocean view."},
  { name: "Gator", pic: pic8, reviews: 5, following: 6, email: "Gator@gmail.com", Bio: "Hello I'm Gator", description: "Gator: A dynamic performer, electrifying stages with raw talent and infectious energy, leaving audiences in awe of his magnetic presence.", follow: false, restaurantName1: "Cafe Delight", review1: "An exquisite experience with flavors that dance on the palate.", restaurantName2: "Seaside Eats", review2: "The seafood is fresh, flavorful, and served with a beautiful ocean view."},
];


const Friends = () => {
  const [friendsData, setFriendsData] = useState(() => {
    const storedFriendsData = localStorage.getItem('friendsData');
    return storedFriendsData ? JSON.parse(storedFriendsData) : initialFriendsData;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const filteredFriends = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    localStorage.setItem('friendsData', JSON.stringify(friendsData));
  }, [friendsData]);
  return (
    <div className="home">
      <div className="header">
        <div className="logo1"></div>
      </div>
      <div className="about">
        <div className="headingdiv">
          <h2>Your Friends</h2>
          <input
            type="text"
            placeholder="Search For Friends"
            style={{
              height: "35px",
              padding: '5px 25px', // Adjust padding as needed
              fontSize: '15px',
              borderRadius: '10px', // Makes it rounded
              border: '1px solid orange', // Example border color
              backgroundColor: 'white', // Orange background
              color: 'black', // Text color
              marginRight: '0px', // Add space between input and button      
              marginLeft: "50px"
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="fhomePictures">
          {filteredFriends.map((friend, index) => (
            <>
              {searchTerm ? (<> {<div className="fpic" key={index}>

                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  to={`/friends/${friend.name}`}
                  id={friend.name}
                  className="homeResults"
                >
                  <button className="buttonEdit">
                    <img src={friend.pic} alt={friend.name} width="100%" height="300px" />
                  </button>
                  {friend.name}
                </Link>


              </div>}</>) : (<> {friend?.follow && <div className="fpic" key={index}>

                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  to={`/friends/${friend.name}`}
                  id={friend.name}
                  className="homeResults"
                >
                  <button className="buttonEdit">
                    <img src={friend.pic} alt={friend.name} width="100%" height="300px" />
                  </button>
                  {friend.name}
                </Link>


              </div>}</>)}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
