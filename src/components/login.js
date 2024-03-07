import React, { useState } from 'react'; // Import useState
import { GoogleLogin } from 'react-google-login';

const clientID = "577803103733-skfigtm3cm0cmfllh8e2k4ejmq626tce.apps.googleusercontent.com";

function Login() {
    const [user, setUser] = useState(null); // State to hold user data on successful login

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS!!! CURRENT USER: ", res.profileObj);
        setUser(res.profileObj); // Set user data upon successful login
        
    };

    const onFailure = (res) => {
        console.log("LOGIN FAILED! RESULT: ", res);
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            {user && <div> <h1>Welcome:  {user.name}!</h1> </div>} {/* Display text when user is logged in */}
        </div>
    );
}

export default Login;
