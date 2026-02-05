const API = "https://jobflow-backend-7wjj.onrender.com";

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

function switchTab(tab) {
  if (tab === 'login') {
    loginForm.style.display = "flex";
    signupForm.style.display = "none";
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    document.getElementById("loginError").textContent = "";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    document.getElementById("signupError").textContent = "";
  }
}

// Login Handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");

  errorEl.textContent = "Logging in...";

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Invalid credentials");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "index.html";
  } catch (error) {
    errorEl.textContent = "❌ " + error.message;
    errorEl.style.color = "#ff6b6b";
  }
});

// Signup Handler
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const errorEl = document.getElementById("signupError");

  if (password.length < 6) {
    errorEl.textContent = "❌ Password must be at least 6 characters";
    return;
  }

  errorEl.textContent = "Creating account...";

  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Signup failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "index.html";
  } catch (error) {
    errorEl.textContent = "❌ " + error.message;
    errorEl.style.color = "#ff6b6b";
  }
});
