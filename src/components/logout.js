import React, { useState } from 'react'; // Import useState
import { GoogleLogout } from 'react-google-login';

const clientId = "577803103733-skfigtm3cm0cmfllh8e2k4ejmq626tce.apps.googleusercontent.com";

function Logout() {
    const [isLoggedOut, setIsLoggedOut] = useState(false); // State to indicate if user has logged out

    const onSuccess = () => {
        console.log("Logout successful!");
        setIsLoggedOut(true); // Update state to indicate logout success
    };

    return (
        <div id='signOutButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
            {isLoggedOut && <div>You have successfully logged out.</div>} {/* Display message on successful logout */}
        </div>
    );
}

export default Logout;
