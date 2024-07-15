const modeSwitch = document.getElementById('mode-switch');
const chatBox = document.getElementById('chat-box');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCbb_-MF_yvtHSqM7Q6h5DapjXCcAe4MNU",
  authDomain: "chatbox-74eb8.firebaseapp.com",
  projectId: "chatbox-74eb8",
  storageBucket: "chatbox-74eb8.appspot.com",
  messagingSenderId: "779170489408",
  appId: "1:779170489408:web:e0bd088f6549583c26eba5",
  measurementId: "G-YTCPG0CCYL"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Function to append message to chat box
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <p>${message.content}</p>
        <div class="meta">${message.username} • ${message.timestamp}</div>
    `;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Function to send message
function sendMessage() {
    const username = usernameInput.value.trim();
    const messageText = messageInput.value.trim();

    if (username === '' || messageText === '') {
        alert('Silakan masukkan nama dan pesan Anda!');
        return;
    }

    const message = {
        username: username,
        content: messageText,
        timestamp: getCurrentTime()
    };

    // Save message to Firebase
    database.ref('messages').push(message);
    messageInput.value = ''; // Clear input field
}

// Function to get current time
function getCurrentTime() {
    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta' // Adjust timezone as needed
    };
    return now.toLocaleDateString('id-ID', options);
}

// Listen for new messages from Firebase
database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    appendMessage(message);
});

// Dark mode toggle
modeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkModeEnabled', modeSwitch.checked);
});

// Load stored dark mode preference from localStorage
const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
}

// Snow animation generation
const numSnowflakes = 10;
const snowContainer = document.createElement('div');
snowContainer.classList.add('snow-container');
document.body.appendChild(snowContainer);

for (let i = 0; i < numSnowflakes; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.setProperty('--random-x', Math.random());
    snowflake.style.setProperty('--duration', `${Math.random() * 10 + 10}s`);
    snowContainer.appendChild(snowflake);
}
