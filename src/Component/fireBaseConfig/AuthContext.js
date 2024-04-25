import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../fireBaseConfig/OAuth'; // Import your Firebase auth

// Create a context for authentication data
const AuthContext = createContext();

// Custom hook to use the auth context value
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component that manages the authentication state
export const AuthProvider = ({ children }) => {
  // State to hold the current user
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // Listen for changes to the user's authentication status
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // Provide the currentUser in the context for access throughout the application
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};


