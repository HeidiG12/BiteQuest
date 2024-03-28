import React from 'react';
import './App.css';
import LoginButton from "./fireBaseConfig/userLoginLogout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { AuthProvider } from './components/AuthContext'; // Adjust this import based on the actual file location
import UserInputReview from "./components/userInputReview";

const clientId = "your_client_id.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    };
    gapi.load('client:auth2', start);
  });

  return (
    <AuthProvider>
    <div className="App">
      {/* Your components that consume the auth context */}
      <LoginButton/>
      <UserInputReview/>
    </div>
  </AuthProvider>
);
}


export default App;
