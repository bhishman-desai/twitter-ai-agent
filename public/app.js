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
        socket.emit('clientMessage', {
            room: roomId,
            message: msgInput.value
        });
        msgInput.value = "";
    }
    msgInput.focus();
};

document.querySelector('.form-msg').addEventListener('submit', sendMessage);

socket.on("serverMessage", (data) => {
    const { message, timestamp } = data;
    const li = document.createElement('li');
    li.className = 'post post--left';
    li.innerHTML = `
        <div class="post__header post__header--reply">
            <span class="post__header--name">Agent</span>
            <span class="post__header--time">${timestamp}</span>
        </div>
        <div class="post__text">${message}</div>
    `;
    chatDisplay.appendChild(li);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});