

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get,set, onValue } from "firebase/database";
import "../StyleSheets/Friends.css";
import { GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import img from "../imgs/profleAv.png";
import { useAuth } from '../fireBaseConfig/AuthContext.js';
import { auth, imageDb } from '../fireBaseConfig/OAuth.js';
import Cookies from 'js-cookie'; //if error, install with this-> npm install js-cookie --legacy-peer-deps


function Friends() {
  const [userIds, setUserIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userBioResults, setUserBioResults] = useState([]);
  const [userFollowingResults, setUserFollowingResults] = useState([]);

  const [error, setError] = useState(null);
  const [userFound, setUserFound] = useState(false);
  const [followingCount, setFollowingCount] = useState(0);



  const [profile, setProfile] = useState(null);
  const db = getDatabase();
  const {currentUser} = useAuth();
  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const userIdList = [];
      snapshot.forEach((childSnapshot) => {
        userIdList.push(childSnapshot.key);
      });
      setUserIds(userIdList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const results = await Promise.all(
        userIds.map(async (userId) => {
          const userRef = ref(db, `users/${userId}/Email`);
          const userSnapshot = await get(userRef);
          return { userId, email: userSnapshot.val() };
        })
      );

      setSearchResults(results);
    };

    fetchData();
  }, [userIds]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setError(null); // Clear error message when user starts typing again
  };
  
  // const currentUserRef = ref(db, 'users/' + currentUser.uid);
  const handleAddFriend = () => {
    const userRef = ref(db, 'users/' + currentUser.uid);
  
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userProfile = snapshot.val();
        setProfile(userProfile); // Update the profile state
  
        const currentFollowingCount = userProfile.numFollowing || 0; // Default to 0 if numFollowing is undefined
        const newFollowingCount = currentFollowingCount + 1;
        
        setFollowingCount(newFollowingCount); // Update the following count state
  
        // Here you also need to update the numFollowing in Firebase
        const updateRef = ref(db, 'users/' + currentUser.uid + '/numFollowing');
        set(updateRef, newFollowingCount);
  
      } else {
        alert('Profile not found');
      }
    }).catch((error) => {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch profile data');
    });
    window.alert('Friend added');
  };
  

  const handleDeleteFriend = (event) => {
    const userRef = ref(db, 'users/' + currentUser.uid);
  
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userProfile = snapshot.val();
        setProfile(userProfile); // Update the profile state
  
        const currentFollowingCount = userProfile.numFollowing || 0; // Default to 0 if numFollowing is undefined
        const newFollowingCount = currentFollowingCount - 1;
        
        setFollowingCount(newFollowingCount); // Update the following count state
  
        // Here you also need to update the numFollowing in Firebase
        const updateRef = ref(db, 'users/' + currentUser.uid + '/numFollowing');
        set(updateRef, newFollowingCount);
  
      } else {
        alert('Profile not found');
      }
    }).catch((error) => {
      console.error('Error fetching user data:', error);
      window.alert('Failed to fetch profile data');
    });

    window.alert('Friend Unadded');
  };

  const handleSearch = async () => {
    const foundResult = searchResults.find(result =>
      result.email && result.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (foundResult) {
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${foundResult.userId}/ProfileName`);
        const bioRef = ref(db, `users/${foundResult.userId}/ProfileDescription`);
        const numFollowingRef = ref(db, `users/${foundResult.userId}/numFollowing`);
        

        const userSnapshot = await get(userRef);
        const bioSnapshot = await get(bioRef);
        const followSnapshot = await get(numFollowingRef)

        const profileName = bioSnapshot.val();
        const bio = userSnapshot.val();
        const numFollowingCountfound = followSnapshot.val();
  
        if (profileName) {
          // Display the found result with profile name
          setSearchResults([{ ...foundResult, profileName}]);
          setUserBioResults([{ ...foundResult, bio}]);
          setUserFollowingResults([{...foundResult, numFollowingCountfound}]);
          setUserFound(true);
          setError(null);
        } else {
          // Profile name not found, display error
          setUserFound(false);
          setError("Profile name not found.");
        }
      } catch (error) {
        console.error("Error fetching profile name:", error);
        setUserFound(false);
        setError("Error fetching profile name.");
      }
    } else {
      // Display an error message
      setUserFound(false);
      window.alert("No user found with that email.!");
      setError("No user found with that email.");
    }
  };
  

  // const handleSearch = () => {
  //   const foundResult = searchResults.find(result =>
  //     result.email && result.email.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   if (foundResult) {
  //     // Display the found result
  //     setSearchResults([foundResult]);
  //     setUserFound(true);
  //     setError(null);
  //   } else {
  //     // Display an error message
  //     setUserFound(false);
  //     setError("No user found with that email.");
  //   }
  // };

  const magnifyingGlassSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.03.062.058.095.083l.007.006.002.002a.977.977 0 0 0 .128.115l4.516 4.517a.5.5 0 0 0 .708-.708l-4.517-4.516a.977.977 0 0 0-.115-.128l-.002-.002-.006-.007a.977.977 0 0 0-.083-.094v-.001zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>
  );
  return (
    <div >
      <h2 className = 'center'>Find BiteQuest Friends</h2>
      
      <div className = 'layout' style={{ width: '75%' }}>
        <div className = 'layout'style={{ display: 'flex', alignItems: 'center', 'padding-left': '0px', 'margin-right': '180px' }}>
          <input
             type="text"
                placeholder="Search by Email"
                value={searchTerm}
                onChange={handleSearchChange}
                className = 'search'
                style={{
                flexGrow: 1,
                padding: '5px 5px', // Adjust padding as needed
                fontSize: '15px',
                borderRadius: '10px', // Makes it rounded
                border: '1px solid orange', // Example border color
                backgroundColor: 'white', // Orange background
                color: 'black', // Text color
                marginRight: '0px', // Add space between input and button                
                }}
              />
            <button type="submit" onClick = {handleSearch}style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                {magnifyingGlassSVG}
            </button>
          </div>
          </div>

      {/* <input
        type="text"
        placeholder="Search by Email"
        value={searchTerm}
        onChange={handleSearchChange}
        className = 'search'
      /> */}

      {/* <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}

      <ul>
        {searchResults.map((result) => (
          <li key={result.userId}>{`${result.userId}: ${result.email}`}</li>
        ))}
      </ul>  */}

{/* Other JSX elements */}
{userFound && (
      <div>
        <div className= "profilePageStruct">    
    <div class="flex-container">
      <div class="flex-item">
        <img className = "profilePic" src = {img} alt = "profile picture" style={{ border: '4px solid rgb(255, 209, 122)', borderRadius: '50%' }}/>
        {/* <h1 className = 'profileName'>{profileName}</h1> */}
        {/* <h1 className = 'profileUserName'>{userName}</h1> */}
        <h1 className = 'profileUserName'>   {userBioResults.map((result) => (
    <h key={result.userId}>{result.bio}
</h>

  ))}</h1>
  <button className = 'standardButton' onClick={handleAddFriend}> Follow </button>
  <button className = 'standardButton' onClick={handleDeleteFriend}> Unfollow </button>

      </div>

      <div class = "flex-item" style={{ width: '100%','padding-top':'10px'}}>
        <div className = 'flex-container'>
        <div class="flex-item headingBig" style={{ width: '40%' }}>0 Reviews</div> 
        <div class="flex-item headingBig" style={{ width: '40%' ,'margin-right':'220px' }}>0  Following</div> 
        {/* {searchResults.map((result) => (
    <h key={result.userId}>{result.numFollowingCountfound}</h>
  ))} */}
               
      </div>
      <h1 className = 'profileName' style={{ 'text-align': 'left', 'margin-left': '45px','margin-top' :'30px' }}>Profile Bio</h1>
      <h1 className = 'paragraph' style={{ 'text-align': 'left', 'margin-left': '38px','margin-top' :'10px' }}> {searchResults.map((result) => (
    <h key={result.userId}>{result.profileName}</h>
  ))}</h1>

      </div>
      
    </div>
    {/* <button className = 'standardButton' onClick={handleLogout}>Logout</button> */}

    </div>




      </div>
    )}

    </div>
  );
}

export default Friends;



