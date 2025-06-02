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


let chatSocket = null;

function connect() {
    chatSocket = new WebSocket("ws://" + window.location.host + "/ws/chat/" + roomName + "/");

    chatSocket.onopen = function(e) {
        console.log("Successfully connected to the WebSocket.");
    }

    chatSocket.onclose = function(e) {
        console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...");
        setTimeout(function() {
            console.log("Reconnecting...");
            connect();
        }, 2000);
    };

    chatSocket.onerror = function(err) {
        console.log("WebSocket encountered an error: " + err.message);
        console.log("Closing the socket.");
        chatSocket.close();
    }

    chatSocket.send(JSON.stringify({
    "message": chatMessageInput.value,
    }));


    chatMessageSend.onclick = function() {
    if (chatMessageInput.value.length === 0) return;
    chatSocket.send(JSON.stringify({
        "message": chatMessageInput.value,
    }));
    chatMessageInput.value = "";
};

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log(data);

    switch (data.type) {
        case "chat_message":
            chatLog.value += data.user + ": " + data.message + "\n";  // new
            break;
        default:
            console.error("Unknown message type!");
            break;
    }
    chatLog.scrollTop = chatLog.scrollHeight;
};



