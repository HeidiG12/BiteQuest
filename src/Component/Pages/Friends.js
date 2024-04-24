import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get,onValue } from "firebase/database";

function Friends() {
  const [userIds, setUserIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const userIdList = [];
      snapshot.forEach((childSnapshot) => {
        userIdList.push(childSnapshot.key);
      });
      setUserIds(userIdList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const results = await Promise.all(
        userIds.map(async (userId) => {
          const userRef = ref(db, `users/${userId}/Email`);
          const userSnapshot = await get(userRef);
          return { userId, profileName: userSnapshot.val() };
        })
      );
      setSearchResults(results);
    };

    fetchData();
  }, [userIds]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredResults = searchResults.filter((result) =>
    result.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search by UID"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredResults.map((result) => (
          <li key={result.userId}>{`${result.userId}: ${result.profileName}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
