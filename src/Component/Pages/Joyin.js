import "../StyleSheets/Profile.css";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

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


const Joyin = () => {
  const [friendsData, setFriendsData] = useState(() => {
    const storedFriendsData = localStorage.getItem('friendsData');
    return storedFriendsData ? JSON.parse(storedFriendsData) : initialFriendsData;
  });
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const friend = friendsData.find(friend => friend.name === name);
    setSelectedFriend(friend);
  }, [name, friendsData]);

  useEffect(() => {
    localStorage.setItem('friendsData', JSON.stringify(friendsData));
  }, [friendsData]);

  const handleFollowToggle = () => {
    if (selectedFriend) {
      const updatedFriendsData = friendsData.map(friend =>
        friend.name === selectedFriend.name ? { ...friend, follow: !friend.follow } : friend
      );
      setFriendsData(updatedFriendsData);
    }
  };

  const friend = friendsData.find((f) => f.name === name);
  
  const [thumbsState, setThumbsState] = useState({});

  const handleLike = (entryId) => {
    setThumbsState({ ...thumbsState, [entryId]: { like: true, dislike: false } });
  };

  const handleDislike = (entryId) => {
    setThumbsState({ ...thumbsState, [entryId]: { like: false, dislike: true } });
  };

  if (!friend) {
    return <div>No friend found with the name "{name}".</div>;
  }

  return (
    <div className="profilePageStruct">
      <div class="flex-container">
        <div class="flex-item">
          <img className="profilePic" src={selectedFriend?.pic} alt="profile picture" />
          <h1 className="profileName">{selectedFriend?.name}</h1>
          <h1 className="profileUserName">{selectedFriend?.email}</h1>
          {!selectedFriend?.follow ? <button className="followbtn" onClick={handleFollowToggle}>
            Follow
          </button> : <button className="unfollowbtn" onClick={handleFollowToggle}>
            Unfollow
          </button>}

        </div>

        <div class="flex-item" style={{ width: "90%", "padding-top": "10px" }}>
          <div className="flex-container">
            <div class="flex-item headingBig" style={{ width: "80%" }}>
              {selectedFriend?.reviews} Reviews
            </div>
            <div class="flex-item headingBig" style={{ width: "80%" }}>
              {selectedFriend?.following} Following
            </div>
          </div>
          <h1
            className="profileName"
            style={{
              "text-align": "left",
              "margin-left": "60px",
              "margin-top": "30px",
            }}
          >
            Profile Bio
          </h1>
          <h1
            className="paragraph"
            style={{
              "text-align": "left",
              "margin-left": "23px",
              "margin-top": "10px",
            }}
          >
            {selectedFriend?.Bio}

          </h1>
          <h1
            className="paragraph"
            style={{
              "text-align": "left",
              "margin-left": "23px",
              "margin-top": "10px",
            }}
          >
            {selectedFriend?.description}
          </h1>
          <h1
            className="paragraph"
            style={{
              "text-align": "left",
              "margin-left": "23px",
              "margin-top": "10px",
            }}
          >
            27,Oct
          </h1>
          <h1
            className="paragraph"
            style={{
              "text-align": "left",
              "margin-left": "23px",
              "margin-top": "10px",
            }}
          >
            Scorpioo
          </h1>
        </div>
      </div>
      <div className="entries-section">
        <h1 className="entries-heading" >
          Entries
        </h1>
        <div>
          <div className="entry">
            <h2 className="entry-title">Cafe Delight</h2>
            <p className="entry-description">An exquisite experience with flavors that dance on the palate.</p>
            <button
              onClick={() => handleLike("cafeDelight")}
              style={{
                color: thumbsState["cafeDelight"]?.like ? "green" : "gray",
              }}
            >
              👍
            </button>
            <button
              onClick={() => handleDislike("cafeDelight")}
              style={{
                color: thumbsState["cafeDelight"]?.dislike ? "red" : "gray",
              }}
            >
              👎
            </button>
          </div>

          <div className="entry">
            <h2 className="entry-title">Seaside Eats</h2>
            <p className="entry-description">The seafood is fresh, flavorful, and served with a beautiful ocean view.</p>
            <button
              onClick={() => handleLike("seasideEats")}
              style={{
                color: thumbsState["seasideEats"]?.like ? "green" : "gray",
              }}
            >
              👍
            </button>
            <button
              onClick={() => handleDislike("seasideEats")}
              style={{
                color: thumbsState["seasideEats"]?.dislike ? "red" : "gray",
              }}
            >
              👎
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Joyin;
