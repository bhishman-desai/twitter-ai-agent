const socket = io('/tweets');

const msgInput = document.querySelector('#message');
const chatDisplay = document.querySelector('.chat-display');

const generateRoomId = () => {
    return 'room-' + Math.random().toString(36).substr(2, 9);
};

const roomId = generateRoomId();

socket.emit('joinRoom', roomId);

const sendMessage = (e) => {
    e.preventDefault();
    if (msgInput.value) {
        const message = msgInput.value;
        socket.emit('clientMessage', {
            room: roomId,
            message: message
        });

        /* Display user's message */
        displayMessage(message, 'You', 'right');

        /* Show typing indicator */
        showTypingIndicator();

        msgInput.value = "";
    }
    msgInput.focus();
};

const displayMessage = (message, sender, alignment) => {
    const li = document.createElement('li');
    li.className = `post post--${alignment}`;
    li.innerHTML = `
        <div class="post__header">
            <span class="post__header--name">${sender}</span>
        </div>
        <div class="post__text">${message}</div>
    `;
    chatDisplay.appendChild(li);
    li.scrollIntoView({ behavior: 'smooth' });
};

/* Function to show a typing animation with wave effect */
const showTypingIndicator = () => {
    removeTypingIndicator(); // Ensure only one exists
    const li = document.createElement('li');
    li.className = 'post post--left typing-indicator';
    li.innerHTML = `
        <div class="post__header">
            <span class="post__header--name">Agent</span>
        </div>
        <div class="post__text">
            <div class="wave">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatDisplay.appendChild(li);
    li.scrollIntoView({ behavior: 'smooth' });
};

/* Function to remove typing animation */
const removeTypingIndicator = () => {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
};

document.querySelector('.form-msg').addEventListener('submit', sendMessage);

socket.on("serverMessage", (data) => {
    const { message } = data;

    /* Remove typing animation once a response is received */
    removeTypingIndicator();

    /* Display server's message */
    displayMessage(message, 'Agent', 'left');
});
