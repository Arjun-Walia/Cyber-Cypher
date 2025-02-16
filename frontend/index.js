// Function to toggle between login and signup forms
function toggleForm(formType) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (formType === "login") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else if (formType === "signup") {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
}

// Function to handle login
async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();

    // Save the token to localStorage
    localStorage.setItem("authToken", data.token);

    // Redirect to the profile page
    window.location.href = "profile.html";
  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message);
  }
}

// Function to handle signup
async function signup() {
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Signup failed. Please try again.");
    }

    const data = await response.json();
    alert(data.message);

    // Switch to the login form after successful signup
    toggleForm("login");
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
}
