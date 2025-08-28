document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Store user information including role
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("login-error").textContent = "Invalid credentials";
    }
  } catch (err) {
    document.getElementById("login-error").textContent = "Login failed.";
    console.error(err);
  }
});
