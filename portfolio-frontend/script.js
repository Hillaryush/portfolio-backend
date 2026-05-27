// Typing effect (safe)
const typedText = ["Full Stack Developer", "Problem Solver", "Tech Enthusiast"];
let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
  const el = document.getElementById("typed");
  if (!el) return;

  if (i < typedText.length) {
    if (!isDeleting && j <= typedText[i].length) {
      current = typedText[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      current = typedText[i].substring(0, j--);
    }

    el.textContent = current;

    if (j === typedText[i].length) isDeleting = true;
    if (j === 0 && isDeleting) {
      isDeleting = false;
      i = (i + 1) % typedText.length;
    }
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

// Contact form
document
  .getElementById("contactForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const button = document.querySelector("#contactForm button");
    const status = document.getElementById("formStatus");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    button.disabled = true;
    button.innerText = "Sending...";

    try {

      const res = await fetch(
        "https://portfolio-backend-1-khak.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {

        status.innerHTML = "Message sent successfully ✅";

        document.getElementById("contactForm").reset();

      } else {

        status.innerHTML = "Failed to send ❌";

      }

    } catch (err) {

      status.innerHTML = "Server error ❌";

    }

    button.disabled = false;
    button.innerText = "Send Message";

});

// Scroll reveal animations
const reveals = document.querySelectorAll(".reveal-up, .reveal-pop");

window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
});