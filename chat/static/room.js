console.log("Sanity check from room.js.");

const roomName = JSON.parse(document.getElementById('roomName').textContent);

const chatLog = document.querySelector("#chatLog");
const chatMessageInput = document.querySelector("#chatMessageInput");
const chatMessageSend = document.querySelector("#chatMessageSend");
const onlineUsersSelector = document.querySelector("#onlineUsersSelector");

function addOnlineUser(username) {
    if (document.querySelector(`option[value='${username}']`)) return;
    
    const newOption = document.createElement("option");
    newOption.value = username;
    newOption.textContent = username;
    onlineUsersSelector.appendChild(newOption);
}

function removeOnlineUser(username) {
    const userOption = document.querySelector(`option[value='${username}']`);
    if (userOption) {
        userOption.remove();
    }
}

chatMessageInput.focus();

chatMessageInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

chatMessageSend.addEventListener('click', sendMessage);

function sendMessage() {
    const message = chatMessageInput.value.trim();
    if (message.length === 0) return;
    
    console.log(`ارسال پیام به اتاق ${roomName}: ${message}`);
    
    chatLog.value += `You: ${message}\n`;
    chatMessageInput.value = "";
}

