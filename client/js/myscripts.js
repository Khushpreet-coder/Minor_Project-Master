// function login() {
//   console.log("✅ login() called");

//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;
//   const role = document.getElementById("loginRole").value;

//   if (!email || !password || !role) {
//     return alert("Please fill out all fields.");
//   }

//   fetch("http://localhost:5000/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password, role })
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log("🟢 Server response:", data); // Debug the response

//       if (data.success) {
//         alert("Login successful!");
        
//         setTimeout(() => {
//           window.location.href =
//             role === "admin"
//               ? "/admin/admin_dashboard.html"
//               : "/user/user_dashboard.html";
//         }, 100);
//       } else {
//         alert("Invalid credentials.");
//       }
//     })
//     .catch(err => {
//       console.error("🔴 Login error:", err);
//       alert("An error occurred while logging in. Please try again later.");
//     });
// }
// // ==== Popup Controls ====

// Show the login/signup popup
// ==== Popup Controls ====

// Show the login/signup popup
// helper to swap forms
function showSignup() {
  document.getElementById("loginForm").style.display  = "none";
  document.getElementById("signupForm").style.display = "block";
}
function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display  = "block";
}

// SIGNUP
function signup() {
  const name     = document.getElementById("signupName").value.trim();
  const age      = document.getElementById("signupAge").value.trim();
  const gender   = document.getElementById("signupGender").value;
  const email    = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name||!age||!gender||!email||!password) {
    return alert("Please fill all fields.");
  }

  fetch("/signup", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name, age, gender, email, password})
  })
  .then(r=>r.json())
  .then(d=>{
    if (d.success) {
      alert("Signup successful! Please log in.");
      showLogin();
    } else {
      alert(d.message);
    }
  })
  .catch(()=>alert("Signup failed. Try again."));
}

// LOGIN
function login() {
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const role     = document.getElementById("loginRole").value;

  if (!email||!password||!role) {
    return alert("Please fill all fields.");
  }

  fetch("/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({email, password, role})
  })
  .then(r=>r.json())
  .then(d=>{
    if (d.success) {
      alert("Login successful!");
      window.location.href = role === "admin"
        ? "/admin/admin_dashboard.html"
        : "/user/user_dashboard.html";
    } else {
      alert(d.message);
    }
  })
  .catch(()=>alert("Login error. Try again."));
}
