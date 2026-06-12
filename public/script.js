const socket = io();

const username = prompt("Enter your name:");

socket.emit("join", username);

const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value) {

        const time = new Date().toLocaleTimeString();

        socket.emit(
            "chat message",
            `[${time}] ${username}: ${input.value}`
        );

        input.value = "";
    }
});

socket.on("chat message", (msg) => {
    const li = document.createElement("li");

    li.textContent = msg;

    messages.appendChild(li);

    messages.scrollTop = messages.scrollHeight;
});