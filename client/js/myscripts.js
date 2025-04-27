// Show Signup form (with Admin signup restriction)
function showSignup() {
  const role = document.getElementById("loginRole").value;

  if (role === "admin") {
    alert("Admin cannot sign up. Only users can sign up.");
    return;  // Do not open signup form if admin selected
  }

  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

// Show Login form
function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

// ================= SIGNUP =================
function signup() {
  const name     = document.getElementById("signupName").value.trim();
  const age      = document.getElementById("signupAge").value.trim();
  const gender   = document.getElementById("signupGender").value;
  const email    = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !age || !gender || !email || !password) {
    return alert("Please fill all fields.");
  }

  // ✅ Password strength check (Frontend validation also)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return alert("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
  }

  fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, gender, email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Signup successful! Please login.");
      showLogin(); // Switch back to login form
    } else {
      alert(data.message);
    }
  })
  .catch(() => alert("Signup failed. Please try again."));
}

// ================= LOGIN =================
function login() {
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const role     = document.getElementById("loginRole").value;

  if (!email || !password || !role) {
    return alert("Please fill all fields.");
  }

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Login successful!");
      setTimeout(() => {
        window.location.href = role === "admin"
          ? "/admin/admin_dashboard.html"
          : "/user/user_dashboard.html";
      }, 500);
    } else {
      alert(data.message);
    }
  })
  .catch(() => alert("Login error. Try again."));
}

// ================ Show/Hide Login Popup (Optional if you have Popup) ================

// Open popup
function showLoginForm() {
  document.getElementById("loginPopup").style.display = "block";
  showLogin(); // Always show login form first when popup opens
}

// Close popup
function closePopup() {
  document.getElementById("loginPopup").style.display = "none";
}
