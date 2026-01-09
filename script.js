document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send");
  const messageInput = document.getElementById("message");
  const chatBox = document.getElementById("chat");

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    messageInput.value = "";

    try {
      const res = await fetch(
        "https://ltg-chat-backend.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message })
        }
      );

      const data = await res.json();
      addMessage(data.reply, "bot");
    } catch (err) {
      addMessage("Server not responding ❌", "bot");
      console.error(err);
    }
  }
});
a