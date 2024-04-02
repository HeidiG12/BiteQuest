const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = 'yourSecretKey'; // Use a secure, environment-specific key in production

app.use(cors());
app.use(bodyParser.json());

let users = {
  "testUser": { password: 'hashedPassword', friends: [], friendRequests: [] },
  "testFriend": { password: 'friendPassword', friends: [], friendRequests: [] }
};

users['testUser'].friendRequests.push('testFriend');

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple authentication: In a real app, hash and check password securely
  if (users[username] && users[username].password === password) {
    const accessToken = jwt.sign({ username }, jwtSecret);
    res.json({ accessToken });
  } else {
    res.send('Username or password is incorrect');
  }
});

// Updated to use authentication middleware
app.post('/sendRequest', authenticateToken, (req, res) => {
  const { to } = req.body;
  const from = req.user.username;
  
  if (!users[to]) users[to] = { friends: [], friendRequests: [] };
  if (!users[from]) users[from] = { friends: [], friendRequests: [] };

  users[to].friendRequests.push(from);
  res.send('Friend request sent.');
});

// Now requires authentication
app.get('/myRequests', authenticateToken, (req, res) => {
  const username = req.user.username;
  if (!users[username]) return res.status(404).send('User not found');
  
  res.json(users[username].friendRequests);
});

// Accept/Decline request
app.post('/respondRequest', (req, res) => {
  const { from, accept } = req.body;
  const to = 'testUser'; // Assuming the current user is 'testUser'

  if (accept) {
    users[to].friends.push(from); // Add friend to the current user's friends list
    users[from].friends.push(to); // Add the current user to the friend's friends list
  }

  // Remove the friend request regardless of acceptance status
  users[to].friendRequests = users[to].friendRequests.filter(req => req !== from);

  res.send(`Request ${accept ? 'accepted' : 'declined'}.`);
});

// Endpoint to get the list of friends for the current user
app.get('/myFriends', (req, res) => {
  const username = 'testUser'; // Assuming the current user is 'testUser'
  const friends = users[username].friends;
  res.json(friends);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
