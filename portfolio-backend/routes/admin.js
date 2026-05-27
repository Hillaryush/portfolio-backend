const form = document.getElementById("adminLoginForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      status.textContent = "Login successful ✅";
      status.style.color = "green";

      // redirect
      window.location.href = "dashboard.html";

    } else {
      status.textContent = data.message;
      status.style.color = "red";
    }

  } catch (err) {
    console.error(err);
    status.textContent = "Server error ❌";
  }
});