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
        displayMessage(message, 'You', 'right');
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
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
};

document.querySelector('.form-msg').addEventListener('submit', sendMessage);

socket.on("serverMessage", (data) => {
    const { message, timestamp } = data;
    displayMessage(message, 'Agent', 'left');
});