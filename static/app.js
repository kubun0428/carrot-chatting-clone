document.addEventListener("DOMContentLoaded", function () {
  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${amOrPm} ${formattedHours}:${formattedMinutes}`;
  }

  let chatForm = document.querySelector("#chat-form");
  chatForm.addEventListener("submit", handleSubmit);

  async function readChat() {
    const response = await fetch("/chats");
    const jsonResponse = await response.json();
    const ul = document.querySelector("#new-chat");
    ul.innerHTML = "";
    jsonResponse.forEach(displayChat);
  }

  async function createChat(value) {
    const response = await fetch("/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: new Date(),
        content: value,
      }),
    });
    readChat();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector("#chat-form input").value;
    if (input.trim() !== "") {
      await createChat(input);
      document.querySelector("#chat-form input").value = "";
      await readChat();
    }
  }

  async function displayChat(chat) {
    if (!chat.content.trim()) return;

    const newChat = document.createElement("div");
    newChat.classList.add("chat-me");

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("chat-me__time");

    const date = new Date(chat.id);
    timeDiv.innerText = formatTime(date);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("chat-me__content");
    contentDiv.innerText = chat.content;

    newChat.appendChild(timeDiv);
    newChat.appendChild(contentDiv);

    document.querySelector("#new-chat").appendChild(newChat);

    newChat.style.display = "flex";
    newChat.style.justifyContent = "flex-end";
    newChat.style.marginBottom = "10px";
    newChat.style.alignItems = "center";
  }
});
