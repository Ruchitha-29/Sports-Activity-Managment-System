console.log("✅ Main script initialized.");

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature, .testimonial-card, .footer-content').forEach(el => {
    observer.observe(el);
  });
});

// Login modal logic
const loginLink = document.getElementById("login-link");
const modal = document.getElementById("login-modal");
const closeModal = document.getElementById("close-modal");
const loginForm = document.getElementById("login-form");
const errorText = document.getElementById("login-error");

if (loginLink) {
  loginLink.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    errorText.textContent = "";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    if (errorText) {
      errorText.textContent = "";
    }
  }
});

// Login form submit
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Login successful!");
          modal.classList.add("hidden");
          errorText.textContent = "";
          window.location.href = "dashboard.html"; // redirect on success
        } else {
          errorText.textContent = data.message || "Login failed.";
        }
      })
      .catch(err => {
        console.error("Login error:", err);
        errorText.textContent = "Server error. Please try again later.";
      });
  });
}

console.log("✅ script.js is running");

