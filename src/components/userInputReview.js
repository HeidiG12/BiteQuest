import React from 'react';
import { useAuth } from '../components/AuthContext';
import { getDatabase, ref, set } from "firebase/database";

function UserInputReview() {
  const { currentUser } = useAuth();
  const db = getDatabase();

  // Function to write data to the database
  const writeData = () => {
    if (currentUser) {
        <p>this is running</p>
        
      set(ref(db, 'users/' + currentUser.uid), {
        username: currentUser.displayName,
        email: currentUser.email,
      })
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    } else {
      console.log("No user logged in");
    }
  };

  return (
    <div>
      {currentUser ? (
        <>
          <p>{`${currentUser.displayName} ${currentUser.uid} ${currentUser.email}`}</p>
          <button onClick={writeData}>Save to Database</button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

export default UserInputReview;
