import logo from './logo.svg';
import './Component/StyleSheets/App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components from their respective directories
import Navbar from './Component/Navbar';
import Home from './Component/Pages/Home';
import Entries from './Component/Pages/Entries';
import Journal from './Component/Pages/Journal';
import Friends from './Component/Pages/Friends';
import Profile from "./Component/Pages/Profile";
import Tags from './Component/Pages/Tags';
import Results from './Component/Pages/Results';
import Review from './Component/Pages/Review';
import Joyin from './Component/Pages/Joyin';
import Tina from './Component/Pages/Tina';
import Heidi from './Component/Pages/Heidi';
import Jess from './Component/Pages/Jess';
import Tenders from './Component/Pages/Tenders';
import Albert from './Component/Pages/Albert';
import Alberta from './Component/Pages/Alberta';
import Gator from './Component/Pages/Gator';

import React from 'react';

import {useEffect} from 'react';
import { gapi } from 'gapi-script';

import { AuthProvider } from "./Component/fireBaseConfig/AuthContext.js";

const clientId = "577803103733-skfigtm3cm0cmfllh8e2k4ejmq626tce.apps.googleusercontent.com"
//Client Secret: 577803103733-skfigtm3cm0cmfllh8e2k4ejmq626tce.apps.googleusercontent.com 

//Define the main App component
function App() {
  // useEffect to initialize Google API client on component mount.
  useEffect(()=>{
    function start()  {
      gapi.client.init({
        clientId: clientId,
        scope:""
      })
    };
    gapi.load('client:auth2', start);
  });

  // Render the app within the AuthProvider context and Router.
  return (
    <AuthProvider>
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/entries" element={<Entries/>}></Route>
          <Route path="/friends" element={<Friends/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/review" element={<Review/>}></Route>
          <Route path="/search" element={<Tags/>}></Route>
          <Route path="/results/:restaurant" element={<Results/>}></Route>
          <Route path="/:restaurant" element={<Home/>}></Route>
          <Route path="/friends/:name" element={<Joyin />}></Route>
        </Routes>
      </Router>
    </div>
    </AuthProvider>
  );
}

// Export the App component as the default export.
export default App;
