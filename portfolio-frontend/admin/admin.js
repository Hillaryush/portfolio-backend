// ================= CONFIG =================
const API_URL = "https://portfolio-backend-1-khak.onrender.com/api/admin";

console.log("ADMIN JS LOADED 🚀");

const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      showMessage("Please fill all fields", "error");
      return;
    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Logging in...`;

    try {

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.success) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("adminLoggedIn", "true");

        showMessage("Login Successful ✅ Redirecting...", "success");

        setTimeout(() => {
          window.location.href = "/admin/dashboard.html";
        }, 800);

      } else {

        showMessage("Invalid credentials ❌", "error");
        loginBtn.disabled = false;
        loginBtn.innerHTML = `<i class="fas fa-right-to-bracket"></i> Login`;

      }

    } catch (error) {

      console.error(error);
      showMessage("Server error — try again ❌", "error");
      loginBtn.disabled = false;
      loginBtn.innerHTML = `<i class="fas fa-right-to-bracket"></i> Login`;

    }

  });

}

function showMessage(msg, type) {
  if (!loginMessage) return;
  loginMessage.textContent = msg;
  loginMessage.style.color = type === "success" ? "#7cf6b0" : "#f06b6b";
  loginMessage.style.marginTop = "12px";
  loginMessage.style.fontSize = "14px";
  loginMessage.style.textAlign = "center";
}

// ================= DASHBOARD =================

const container = document.getElementById("messagesContainer");

let allMessages = [];

if (container) {
  // Guard: redirect if not logged in
  if (!localStorage.getItem("adminLoggedIn")) {
    window.location.href = "/admin/admin-login.html";
  } else {
    loadMessages();
  }
}

// ================= LOAD MESSAGES =================

async function loadMessages() {

  try {

    const token = localStorage.getItem("token");

    const res = await fetch(`https://portfolio-backend-1-khak.onrender.com/api/messages`, {
      headers: { Authorization: token }
    });

    const data = await res.json();
    console.log("MESSAGES:", data);

    allMessages = data;
    renderMessages(data);

  } catch (err) {
    console.error("Error loading messages ❌", err);
  }

}

// ================= RENDER MESSAGES =================

function renderMessages(messages) {

  const container = document.getElementById("messagesContainer");
  if (!container) return;

  container.innerHTML = "";

  if (messages.length === 0) {
    container.innerHTML = `<div class="empty-state"><h3>No messages found 📭</h3></div>`;
    return;
  }

  messages.forEach(msg => {

    const div = document.createElement("div");
    div.classList.add("message-card");
    div.innerHTML = `
      <div class="card-header">
        <h3>${msg.name}</h3>
        <span>${new Date(msg.time).toLocaleString()}</span>
      </div>
      <p class="email">${msg.email}</p>
      <p class="message">${msg.message}</p>
      <button class="delete-btn" onclick="deleteMessage('${msg._id}')">Delete</button>
    `;
    container.appendChild(div);

  });

}

// ================= SEARCH =================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filtered = allMessages.filter(msg =>
      msg.name.toLowerCase().includes(value) ||
      msg.email.toLowerCase().includes(value) ||
      msg.message.toLowerCase().includes(value)
    );
    renderMessages(filtered);
  });
}

// ================= DELETE MESSAGE =================

async function deleteMessage(id) {

  if (!confirm("Are you sure you want to delete this message?")) return;

  try {

    const token = localStorage.getItem("token");

    await fetch(`https://portfolio-backend-1-khak.onrender.com/api/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });

    loadMessages();

  } catch (err) {
    console.error("Delete error ❌", err);
  }

}

// ================= LOGOUT =================

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}