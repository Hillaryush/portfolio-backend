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

// ── Progress bar injection (runs once on page load) ──────────────────────────
(function injectProgressBar() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const btn = form.querySelector("button");
  if (!btn) return;

  // Wrap button in a relative container so the bar sits flush underneath
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "position:relative;display:inline-block;";
  btn.parentNode.insertBefore(wrapper, btn);
  wrapper.appendChild(btn);

  // Create the progress bar element
  const bar = document.createElement("div");
  bar.id = "sendProgressBar";
  bar.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #a78bfa, #7c3aed, #a78bfa);
    background-size: 200% 100%;
    border-radius: 0 0 8px 8px;
    transition: width 0.3s ease;
    animation: shimmer 1.5s infinite linear;
    opacity: 0;
  `;
  wrapper.appendChild(bar);

  // Inject shimmer keyframe once
  if (!document.getElementById("progressBarStyle")) {
    const style = document.createElement("style");
    style.id = "progressBarStyle";
    style.textContent = `
      @keyframes shimmer {
        0%   { background-position: 200% center; }
        100% { background-position: -200% center; }
      }
      @keyframes progressSuccess {
        0%   { background: linear-gradient(90deg, #34d399, #059669); }
        100% { background: linear-gradient(90deg, #34d399, #059669); }
      }
      @keyframes progressError {
        0%   { background: #f87171; }
        100% { background: #f87171; }
      }
    `;
    document.head.appendChild(style);
  }
})();

// ── Progress bar helpers ──────────────────────────────────────────────────────
function progressStart() {
  const bar = document.getElementById("sendProgressBar");
  if (!bar) return;
  bar.style.transition = "width 0.3s ease";
  bar.style.background = "linear-gradient(90deg, #a78bfa, #7c3aed, #a78bfa)";
  bar.style.backgroundSize = "200% 100%";
  bar.style.opacity = "1";
  bar.style.width = "0%";
  // Animate to ~80% quickly, then slow — gives "waiting" feel
  setTimeout(() => { bar.style.transition = "width 0.4s ease"; bar.style.width = "30%"; }, 50);
  setTimeout(() => { bar.style.transition = "width 1.5s ease"; bar.style.width = "75%"; }, 500);
}

function progressSuccess() {
  const bar = document.getElementById("sendProgressBar");
  if (!bar) return;
  bar.style.transition = "width 0.3s ease";
  bar.style.background = "linear-gradient(90deg, #34d399, #059669)";
  bar.style.backgroundSize = "100%";
  bar.style.animation = "none";
  bar.style.width = "100%";
  setTimeout(() => {
    bar.style.transition = "opacity 0.5s ease";
    bar.style.opacity = "0";
    setTimeout(() => { bar.style.width = "0%"; }, 500);
  }, 700);
}

function progressError() {
  const bar = document.getElementById("sendProgressBar");
  if (!bar) return;
  bar.style.transition = "width 0.2s ease";
  bar.style.background = "#f87171";
  bar.style.animation = "none";
  bar.style.width = "100%";
  setTimeout(() => {
    bar.style.transition = "opacity 0.5s ease";
    bar.style.opacity = "0";
    setTimeout(() => { bar.style.width = "0%"; }, 500);
  }, 1000);
}

// ── Contact form submit ───────────────────────────────────────────────────────
document
  .getElementById("contactForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = document.querySelector("#contactForm button");
    const status = document.getElementById("formStatus");

    const name    = document.getElementById("name").value;
    const email   = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    button.disabled  = true;
    button.innerText = "Sending...";
    progressStart();

    setTimeout(() => {
      if (button.innerText === "Sending...") {
        button.innerText = "Almost there...";
      }
    }, 5000);

    try {
      const res = await fetch(
        "https://portfolio-backend-1-khak.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const data = await res.json();

      if (data.success) {
        progressSuccess();
        status.innerHTML = "Message sent successfully ✅";
        document.getElementById("contactForm").reset();
      } else {
        progressError();
        status.innerHTML = "Failed to send ❌";
      }
    } catch (err) {
      progressError();
      status.innerHTML = "Server error ❌";
    }

    button.disabled  = false;
    button.innerText = "Send Message";
  });

// ── Scroll reveal animations ──────────────────────────────────────────────────
const reveals = document.querySelectorAll(".reveal-up, .reveal-pop");

window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const revealTop    = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
});