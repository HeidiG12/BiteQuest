<<<<<<< HEAD
import React, {Component} from 'react';
import './App.css';
import './Tags.css';
import {Style} from './style.js';
import {getData} from './tags';
import {displayRest} from './displayRest.js';

const App = () => {
    return (
        <Style></Style>
    );
=======
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
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/entries" element={<Entries/>}></Route>
          <Route path="/journal" element={<Journal/>}></Route>
          <Route path="/friends" element={<Friends/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </Router>
    </div>
  );
>>>>>>> 5e2335ce5b9b4571e62b79791db8c0f2f9704f15
}
export default App;
