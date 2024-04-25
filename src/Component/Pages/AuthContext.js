// Import React and necessary hooks, and Firebase authentication methods
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../fireBaseConfig/OAuth'; // Import your Firebase auth

// Create a React context for authentication state
const AuthContext = createContext();

// Custom hook to provide easy access to the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component that wraps part of the application to provide authentication state
export const AuthProvider = ({ children }) => {
  // State to hold the current authenticated user
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // Listen for changes in the authentication state and update currentUser accordingly
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    // Provide the currentUser context to components that consume this context
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};


