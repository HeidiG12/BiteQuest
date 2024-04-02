let accessToken = null;

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        accessToken = data.accessToken;
        sessionStorage.setItem('accessToken', accessToken); // Store the token
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('friendRequestSection').style.display = 'block';
        loadFriendRequests();
    })
    .catch(error => console.error('Error:', error));
}

function loadFriendRequests() {
    fetch('http://localhost:3000/myRequests', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('friendRequestsList');
        list.innerHTML = ''; // Clear list
        data.forEach(req => {
            const listItem = document.createElement('li');
            listItem.textContent = `${req} `;
            const acceptBtn = document.createElement('button');
            acceptBtn.textContent = 'Accept';
            acceptBtn.onclick = () => respondToRequest(req, true);
            const declineBtn = document.createElement('button');
            declineBtn.textContent = 'Decline';
            declineBtn.onclick = () => respondToRequest(req, false);
            listItem.appendChild(acceptBtn);
            listItem.appendChild(declineBtn);
            list.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

function sendRequest() {
    const toUser = document.getElementById('toUser').value;

    fetch('http://localhost:3000/sendRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ to: toUser }),
    })
    .then(() => alert('Friend request sent!'))
    .catch(error => console.error('Error:', error));
}

function loadFriends() {
    fetch('http://localhost:3000/myFriends')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('friendsList');
        list.innerHTML = ''; // Clear list
        data.forEach(friend => {
            const listItem = document.createElement('li');
            listItem.textContent = friend;
            list.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

function respondToRequest(from, accept) {
    fetch('http://localhost:3000/respondRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ from, accept }),
    })
    .then(() => {
        alert(`Request ${accept ? 'accepted' : 'declined'}.`);
        loadFriendRequests(); // Reload requests to reflect changes
        loadFriends(); // Update friends list
    })
    .catch(error => console.error('Error:', error));
}
// Attempt to re-establish session on page load
document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        accessToken = token;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('friendRequestSection').style.display = 'block';
        loadFriendRequests();
    }
});
