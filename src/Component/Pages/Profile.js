import "../StyleSheets/Profile.css";
import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../fireBaseConfig/OAuth.js';
import Cookies from 'js-cookie'; //if error, install with this-> npm install js-cookie --legacy-peer-deps
import googleLogo from "../imgs/GoogleLogo.png";


const Profile = () => {
  return (
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
              <input className="inputBoxSignin" 
              />
            </div>
            

            <div id = "inputBoxSpacing">
              <p1 className="paragraph" id = "inputBoxSpacing"> Username* </p1>
            </div>

            <div>
              <input className="inputBoxSignin" 
              />
            </div>

            <div id = "inputBoxSpacing">
              <p1 className="paragraph" id = "inputBoxSpacing"> Email* </p1>
            </div>

            <div>
              <input className="inputBoxSignin" 
              />
            </div>

            <div id = "inputBoxSpacing">
              <p1 className="paragraph" id = "inputBoxSpacing"> Password* </p1>
            </div>

            <div>
              <input className="inputBoxSignin" 
              />
            </div>

            <div>
              <button className = "signInButton">Start your BiteQuest!</button>
            </div>
            
            <div>
              <p1 className = "paragraph" id = "centerParagraph">or log in using</p1>
            </div>

          <div>
          <button className = "image-button">
            <img className = "button-icon" src = {googleLogo}/>  Continue with Google
          </button>
          </div>
      
      </div>
    </div>
  );
};

export default Profile;

 <button className = "signInButton">
               
              </button>