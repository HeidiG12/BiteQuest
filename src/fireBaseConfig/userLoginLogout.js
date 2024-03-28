import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../fireBaseConfig/OAuth.js';
import Cookies from 'js-cookie'; // Import js-cookie

function Login() {
    const [userName, setUserName] = useState('');

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

    return (
        userName ? (
            <div>
                Welcome, {userName}
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <button onClick={handleGoogle}>Sign in with Google</button>
        )
    );
}

export default Login;
