import logo from './logo.svg';
import './App.css';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import {useEffect} from 'react';
import { gapi } from 'gapi-script';

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
      <LoginButton/>
      <LogoutButton/>
    </div>
  );
}

export default App;
