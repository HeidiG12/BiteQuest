import logo from './logo.svg';
import './Component/StyleSheets/App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Component/Pages/Home';
import Entries from './Component/Pages/Entries';
import Journal from './Component/Pages/Journal';
import Friends from './Component/Pages/Friends';
import {useEffect} from 'react';
import { gapi } from 'gapi-script';
import Profile from "./Component/Pages/Profile";
import React from 'react';
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
// /Users/tina/Desktop/BiteQuest/src/Component/fireBaseConfig/AuthContext.js


import { AuthProvider } from "./Component/fireBaseConfig/AuthContext.js";

const clientId = "577803103733-skfigtm3cm0cmfllh8e2k4ejmq626tce.apps.googleusercontent.com"
//Client Secret: 577803103733-skfigtm3cm0cmfllh8e2k4ejmq626tce.apps.googleusercontent.com 


function App() {
  
  useEffect(()=>{
    function start()  {
      gapi.client.init({
        clientId: clientId,
        scope:""
      })
    };
    gapi.load('client:auth2', start);
  });
  
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
          <Route path="/friends/Joyin" element={<Joyin/>}></Route>
          <Route path="/friends/Tina" element={<Tina/>}></Route>
          <Route path="/friends/Heidi" element={<Heidi/>}></Route>
          <Route path="/friends/Jess" element={<Jess/>}></Route>
          <Route path="/friends/Tenders" element={<Tenders/>}></Route>
          <Route path="/friends/Albert" element={<Albert/>}></Route>
          <Route path="/friends/Alberta" element={<Alberta/>}></Route>
          <Route path="/friends/Gator" element={<Gator/>}></Route>

        </Routes>
      </Router>
    </div>
    </AuthProvider>
  );
}
export default App;
