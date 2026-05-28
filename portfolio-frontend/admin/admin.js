// ================= CONFIG =================

const API_URL = "https://portfolio-backend-1-khak.onrender.com";

// ================= LOGIN =================

console.log("ADMIN JS LOADED 🚀");

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    loginBtn.innerText = "Logging in...";

    try {

      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (res.ok && data.token) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("adminLoggedIn", "true");

        alert("Login Successful ✅");

        window.location.href = "dashboard.html";

      } else {

        alert(data.message || "Invalid credentials ❌");

      }

    } catch (err) {

      console.error("Login error ❌", err);
      alert("Server error ❌");

    } finally {

      loginBtn.innerText = "Login";

    }

  });

}

// ================= DASHBOARD =================

const container = document.getElementById("messagesContainer");

let allMessages = [];

if (container) {
  loadMessages();
}

// ================= LOAD MESSAGES =================

async function loadMessages() {

  try {

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/messages`, {
      headers: {
        Authorization: token
      }
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

    container.innerHTML = `
      <div class="empty-state">
        <h3>No messages found 📭</h3>
      </div>
    `;

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

      <button class="delete-btn" onclick="deleteMessage('${msg._id}')">
        Delete
      </button>
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

  const confirmDelete = confirm(
    "Are you sure you want to delete this message?"
  );

  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/api/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
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