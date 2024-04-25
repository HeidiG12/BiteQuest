

import "../StyleSheets/Profile.css";
import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { useAuth } from '../fireBaseConfig/AuthContext.js';
import { auth, imageDb } from '../fireBaseConfig/OAuth.js';
import Cookies from 'js-cookie'; //if error, install with this-> npm install js-cookie --legacy-peer-deps
import googleLogo from "../imgs/GoogleLogo.png";
import profile from "../imgs/profile.png";
import img from "../imgs/profleAv.png";
import {v4} from 'uuid';
import { getDatabase, ref, onValue,get,set } from "firebase/database";



const Profile = () => {
  const {currentUser} = useAuth();
  const db = getDatabase();
  const [profile, setProfile] = useState(null);
  const [profileName, setProfileName] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  const [numFollowing, setNumFollowing] = useState(0);


  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
      password: '',
  })
  // At the top of your file or in a separate constants file
const DEFAULT_PROFILE_DESCRIPTION = "As a self-proclaimed foodie, I embark on a never-ending journey fueled by a profound passion for exploring the vast world of flavors, textures, and aromas. My days are marked by the anticipation of discovering new dishes and the stories behind them, whether it's a hidden street food stall offering the perfect bite of spicy, tangy chaat, or a high-end restaurant that transforms familiar ingredients into works of edible art. I find joy in the details—the history of a centuries-old recipe, the careful balance of spices in a regional dish, or the innovative techniques chefs use to push the boundaries of what we consider food. Sharing these experiences, whether through vivid descriptions, tips on where to find the best eats, or discussions about the cultural significance of food, is just as thrilling as the quest itself. For me, food is more than sustenance; it's a language that communicates love, tradition, innovation, and community."
useEffect(() => {
  if (currentUser) {
    const userRef = ref(db, 'users/' + currentUser.uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const unsubscribe = onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setProfile(snapshot.val());
          } else {
            setProfile(null);
          }
        }, {
          onlyOnce: true
        });

        setProfileName(data.ProfileName || currentUser.displayName || '');  // Use existing or display name if no profile name
        setProfileDescription(data.ProfileDescription || DEFAULT_PROFILE_DESCRIPTION);  // Default description if empty
        setNumFollowing(data.numFollowing || 0);  // Set numFollowing to 0 if no data
      } else {
        // Set defaults if no data exists
        setProfileName(currentUser.displayName || '');  
        setProfileDescription(DEFAULT_PROFILE_DESCRIPTION);
        setNumFollowing(0);  // Always set numFollowing to 0 if no data
        // Set the defaults in the database as well
        set(ref(db, 'users/' + currentUser.uid), {
          ProfileName: currentUser.displayName || '',
          ProfileDescription: DEFAULT_PROFILE_DESCRIPTION,
          Email: currentUser.email,
          numFollowing: 0  // Always set numFollowing to 0 for new users
        })
        .then(() => {
          console.log("Default user data saved successfully!");
        })
        .catch((error) => {
          console.error("Error writing default user data: ", error);
        });
      }
    }).catch((error) => {
      console.error("Error fetching user data: ", error);
    });
  }
}, [currentUser, db]);

  // useEffect(() => {
  //   if (currentUser) {
  //     const userRef = ref(db, 'users/' + currentUser.uid);
  //     get(userRef).then((snapshot) => {
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();

  //         const unsubscribe = onValue(userRef, (snapshot) => {
  //           if (snapshot.exists()) {
  //               setProfile(snapshot.val());
  //           } else {
  //               setProfile(null);
  //           }
  //       }, {
  //           onlyOnce: true // If you want to fetch data only once and not listen for changes
  //       });

  //         setProfileName(data.ProfileName || currentUser.uid);  // Use existing or UID if no profile name
  //         setProfileDescription(data.ProfileDescription || DEFAULT_PROFILE_DESCRIPTION);  // Default description if empty
  //         setNumFollowing(data.numFollowing || profile.numFollowing)
          
  //       } else {
  //         // Set defaults if no data exists
  //         if (currentUser) {
  //           set(ref(db, 'users/' + currentUser.uid), {
  //             ProfileName: profileName,
  //             ProfileDescription: profileDescription,
  //             Email: currentUser.email,
  //             numFollowing: 0
              
  //           })
  //           .then(() => {
  //             console.log("Data saved successfully!");
  //           })
  //           .catch((error) => {
  //             console.error("Error writing document: ", error);
  //           });
  //         } else {
  //           console.log("No user logged in");
  //         }
  //         setNumFollowing(0);
  //         setProfileName(currentUser.displayName);  
  //         setProfileDescription(DEFAULT_PROFILE_DESCRIPTION);
  //       }
  //     }).catch((error) => {
  //       console.error("Error fetching user data: ", error);
  //     });
  //   }
  // }, [currentUser, db]);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setEditProfile(false); // Updates the state to 'false' when the button is clicked
    writeData(); // Call writeData to save the user input to the database
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'profileName') {
      setProfileName(value);
    } else if (name === 'profileDescription') {
      setProfileDescription(value);
    }
  };
  const [editProfile, setEditProfile] = useState(false);
  // const [img, setImg] = useState('')
  const [hasProfilePic, setHasProfilePic] = useState(false);

  const writeData = () => {
    if (currentUser) {
      set(ref(db, 'users/' + currentUser.uid), {
        ProfileName: profileName,
        ProfileDescription: profileDescription,
        Email: currentUser.email,
        numFollowing: numFollowing
      })
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    } else {
      console.log("No user logged in");
    }
  };

  const handleEditProfileClick = () => {


    setEditProfile(true); // Updates the state to 'true' when the button is clicked
  };

  const handleSaveProfileClick = () => {

    setEditProfile(false); // Updates the state to 'false' when the button is clicked
  };

  useEffect(() => {
      // Check if user info is stored in cookies
      const userNameFromCookie = Cookies.get('userName');
      if (userNameFromCookie) {
          setUserName(userNameFromCookie);
      }
  }, []);

  const handleGoogle = async (e) => {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          // Setting the user's display name and storing it in cookies
          const displayName = user.displayName || 'User';
          setNumFollowing(0)
          setUserName(displayName);
          Cookies.set('userName', displayName, { expires: 7 }); // Set cookie to expire in 7 days
      } catch (error) {
          console.error("SignIn error:", error.code, error.message);
      }
  };

  const handleLogout = async () => {
      try {
          await signOut(auth); // Sign out the user
          Cookies.remove('userName'); // Remove the user's name from cookies
          setUserName(''); // Optionally reset userName state if you still need it for any reason
          
      } catch (error) {
          console.error("SignOut error:", error);
      }
  };

  // setUserName(formData.Username)
  const handleEmail = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
  
    const { name, email, password, username} = formData;
  
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return; // Stop execution if the email is not valid
    }
  
    // Password strength validation criteria
    const passwordMinLength = 8;
    const passwordHasNumber = /\d/;
    const passwordHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const passwordHasUppercase = /[A-Z]/;
    const passwordHasLowercase = /[a-z]/;
  
    if (
      password.length < passwordMinLength ||
      !passwordHasNumber.test(password) ||
      !passwordHasSpecialChar.test(password) ||
      !passwordHasUppercase.test(password) ||
      !passwordHasLowercase.test(password)
    ) {
      alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return; // Stop execution if the password is not strong
    }
  
    // If email and password validation pass, you can proceed to create user or any other logic
   

    //once everything is a valid populated variable.
    if(name && email && password && username){

      try {
        // Attempt to sign up / register the user with the provided email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Optionally: Update the user's profile or handle the signed-up user information
        // You might want to set the display name here if your app uses it
        setUserName(username)
        // Update state and cookies as necessary
        setUserName(username||user.displayName);
        Cookies.set('userName', user.displayName || username, { expires: 7 });
    
        alert("User signed up successfully!");
    
        // Redirect the user or perform other actions upon successful signup
      } catch (error) {
        if(error.code === 'auth/email-already-in-use'){
          try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUserName(user.displayName || formData.username); // Fallback to formData username if displayName is not available
            Cookies.set('userName', user.displayName || formData.username, { expires: 7 });
      
          } catch (error){
            if (error === 'auth/invalid-credential'){
              alert("wrong pass");
            } else {
              // Handle other errors (such as network issues, etc.)
              alert(`Sign in failed: ${error.message}`);
            }
          }
        }
        console.error("Error signing up:", error.code, error.message);
        // Handle errors here, such as displaying a message to the user
        // alert(`Error: ${error.message}`);
      }
  
    }

    // alert(`${name} ${email} ${password} ${username}`);
    // Proceed with createUserWithEmailAndPassword or other logic here




  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target; // Destructure the name and value from the event target
    setFormData({
      ...formData, // Spread the existing formData
      [name]: value, // Update the changed value based on the field's name
    });

    // setUserName(formData.userName)
  };

    // New state to hold the following count
    const [followingCount, setFollowingCount] = useState(0);

    // Function to fetch friends data from local storage
    const getFriendsData = () => {
      const storedFriendsData = localStorage.getItem('friendsData');
      return storedFriendsData ? JSON.parse(storedFriendsData) : [];
    };
  
    // useEffect hook to update following count
    useEffect(() => {
      const friendsData = getFriendsData();
      const friendsCount = friendsData.reduce((count, friend) => {
        return friend.follow ? count + 1 : count;
      }, 0);
      setFollowingCount(friendsCount);
    }, []);


  return (
    
  <div>
  {/* THE LOG IN AND SIGN UP OPTION ONLY AVAILABLE IF USERNAME IS TRUE */}
    {!userName &&(
      <div className="my-class">    
        <div className = "signInBackBox">

            <div>
            <h1 className = "heading">Log In to BiteQuest</h1>  
            </div>
            <div>
            <h1 className = "paragraph">New user? No problem. Sign up below the same way.</h1>  
            </div>
        
            <div id = "inputBoxSpacing">
              <p1 className="paragraph" id = "inputBoxSpacing"> Profile Name* </p1>
            </div>

            <div>
              <input 
                name="name"
                className="inputBoxSignin"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            

            <div id = "inputBoxSpacing">
              <p1 className="paragraph" id = "inputBoxSpacing"> Username* </p1>
            </div>

            <div>
              <input className="inputBoxSignin" 
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div id = "inputBoxSpacing">
              <p1 className="paragraph" id = "inputBoxSpacing"> Email* </p1>
            </div>

            <div>
              <input
                  name="email"
                  className="inputBoxSignin"
                  value={formData.email}
                  onChange={handleInputChange}
              />
            </div>

            <div id = "inputBoxSpacing">
              <p1 className="paragraph" id = "inputBoxSpacing"> Password* </p1>
            </div>

            <div>
              <input
                type= "password"
                name="password"
                className="inputBoxSignin"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <button className = "signInButton"
              onClick = {handleEmail}
              >Start your BiteQuest!</button>
            </div>
            
            <div>
              <p1 className = "paragraph" id = "centerParagraph">or log in using</p1>
            </div>

          <div>
          <button className = "image-button" onClick = {handleGoogle}>
            
            <img className = "button-icon" src = {googleLogo}/>  Continue with Google
          </button>
          </div>
      
      </div>

     
    </div>
    )}
    
    {userName && !editProfile && (
      <div className= "profilePageStruct">
    
      <div class="flex-container">
        <div class="flex-item">
        
          <img className = "profilePic" src = {img} alt = "profile picture" style={{ border: '4px solid rgb(255, 209, 122)', borderRadius: '50%' }}/>
          {/* <h1 className = 'profileName'>{profileName}</h1> */}
          {/* <h1 className = 'profileUserName'>{userName}</h1> */}
          <h1 className = 'profileUserName'>{profileName}</h1>
          <button className = 'standardButton' onClick={handleEditProfileClick}> Edit Profile </button>
        </div>

        <div class = "flex-item" style={{ width: '90%','padding-top':'10px'}}>
          <div className = 'flex-container'>
          <div class="flex-item headingBig" style={{ width: '40%' }}>2 Reviews</div>
          <div class="flex-item headingBig" style={{ width: '40%' }}>{numFollowing} Following</div>
          <button className = 'standardButton flex-item headingBig'style={{'margin-right':'30px' }} onClick={handleLogout}>Logout</button>           
        </div>
        <h1 className = 'profileName' style={{ 'text-align': 'left', 'margin-left': '75px','margin-top' :'30px' }}>Profile Bio</h1>
        <h1 className = 'paragraph' style={{ 'text-align': 'left', 'margin-left': '38px','margin-top' :'10px' }}>{profileDescription}</h1>
        </div>
        
      </div>
      {/* <button className = 'standardButton' onClick={handleLogout}>Logout</button> */}

      </div>
    )}

    {editProfile &&(
    <div class = 'editPageStruct'>
      <div class = 'flex-container'>
          <div class = 'flex-item'>
            <img className = "profilePic" src = {img} alt = "profile picture"style={{ border: '4px solid rgb(255, 209, 122)', borderRadius: '50%' }}/>
{/*             
            <h1 className = 'profileName'>{formData.name}</h1>
            <h1 className = 'profileUserName'>{userName}</h1>
            <input type = 'file' style={{ display: 'none' }} class = 'standardButton' onChange={(e)=>setImg(e.target.files[0])}/>
      
            <input
                type="file"
                id="fileInput"
                className="file-input"
                onChange={(e) => setImg(e.target.files[0])}
                onClick={handleChangePhotoClick}
                style={{ display: 'none' }} // Hide the actual input element
              />
              <label htmlFor="fileInput" className="standardButton">
                Change Photo
              </label>

              <button class = 'standardButton' onClick = {handleDelete}>delete</button> */}


          </div>

          <div className = 'flex-item' style={{ width: '90%' }}>
            
          <form onSubmit={handleSubmit}>
            <div className="inputGroup editInputBoxSpacing" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <label htmlFor="profileName" className="paragraph editInputBoxSpacing" style={{ fontWeight: '500' }}>
                Profile Name
              </label>
              <input
                name="profileName"
                value={profileName}
                onChange={handleChange}
                id="profileName"
                className="inputBoxSignin"
                style={{ border: '1px solid black', borderRadius: '5px', width: '90%' }}
              />
            </div>

            <div className="inputGroup" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <label htmlFor="profileName" className="paragraph editInputBoxSpacing" style={{ fontWeight: '500' }}>
                Profile Description
              </label>
              <textarea
                name="profileDescription"
                value={profileDescription}
                onChange={handleChange}
                className="inputBoxSignin"
                style={{ border: '1px solid black', borderRadius: '5px', width: '90%','height': '100%', 'padding-bottom':'100px' }}
              />
              <button 
              type="submit"
              // onClick = {handleSaveProfileClick}
              class = 'saveButton'
              > Save </button>
              
            </div>
            </form>
          </div>
          
      </div>
    </div>
    )}
               



</div>

  );
};

export default Profile;

 <button className = "signInButton">
               
              </button>