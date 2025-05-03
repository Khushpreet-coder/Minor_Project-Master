// ====== MOBILE NAV MENU TOGGLE ======
const navLinks = document.getElementById("navLinks");
function showMenu() { navLinks.style.right = "0"; }
function hideMenu() { navLinks.style.right = "-200px"; }

// ====== SCROLL SPY FOR NAVIGATION ======
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".nav-links ul li a");
  const top = window.scrollY;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      links.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-links ul li a[href*=${id}]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
});

// ====== BLOG “READ MORE” POPUP ======
function openForm(title, description) {
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-description").innerText = description;
  document.getElementById("popupForm").style.display = "flex";
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// ====== LOGIN / SIGNUP MODAL TOGGLE ======
function showLoginForm() {
  document.getElementById("loginPopup").style.display = "flex";
  showLogin();  // Always show login first
}
function closePopup() {
  document.getElementById("loginPopup").style.display = "none";
}
function showSignup() {
  const role = document.getElementById("loginRole").value;
  if (role === "admin") {
    alert("Admins cannot sign up. Only users can register.");
    return;
  }
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}
function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

// ====== SIGNUP FUNCTION ======
async function signup() {
  const name = document.getElementById("signupName").value.trim();
  const age = document.getElementById("signupAge").value.trim();
  const gender = document.getElementById("signupGender").value;
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!name || !age || !gender || !email || !password) {
    return alert("Please fill all fields.");
  }

  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!pwRegex.test(password)) {
    return alert("Password must be ≥8 characters with upper, lower, digit, and special char.");
  }

  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, gender, email, password })
    });
    const data = await res.json();
    if (data.success) {
      alert("Signup successful! Please log in.");
      showLogin();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Signup failed:", err);
    alert("Signup failed. Try again.");
  }
}

// ====== LOGIN FUNCTION ======
async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const role = document.getElementById("loginRole").value;

  if (!email || !password || !role) {
    return alert("Please fill all fields.");
  }

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });
    const data = await res.json();
    if (data.success) {
      alert("Login successful!");
      setTimeout(() => {
        window.location.href = role === "admin"
          ? "/admin/admin_dashboard.html"
          : "/user/user_dashboard.html";
      }, 300);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Try again.");
  }
}
// // ====== SHOW NUTRITION PLAN DETAILS (POPUP + SCROLL) ======
function showDetails(plan) {
  let details = {
      "weightLoss": `
          <h2>Weight Loss Plan</h2>
          <p>A well-balanced diet focusing on calorie deficit while ensuring essential nutrients.</p>
          <h3>Recommended Foods:</h3>
          <ul>
              <li>Leafy greens (Spinach, Kale)</li>
              <li>Lean proteins (Chicken breast, Fish)</li>
              <li>Whole grains (Brown rice, Quinoa, Oats)</li>
              <li>Fruits & Vegetables (Berries, Apples, Carrots)</li>
          </ul>
          <h3>Diet Tip:</h3>
          <p>Eat smaller, frequent meals and stay hydrated. Avoid processed foods and excess sugar.</p>
      `,
      "muscleGain": `
          <h2>Muscle Gain Plan</h2>
          <p>High-protein diet designed to build and repair muscles after workouts.</p>
          <h3>Recommended Foods:</h3>
          <ul>
              <li>Lean meats (Chicken, Beef, Turkey)</li>
              <li>Eggs and Dairy (Greek Yogurt, Cottage Cheese)</li>
              <li>Complex Carbs (Sweet potatoes, Brown rice, Whole wheat bread)</li>
              <li>Healthy Fats (Nuts, Avocados, Olive oil)</li>
          </ul>
          <h4>Diet Tip:</h4>
          <p>Combine protein intake with strength training for best muscle gain results.</p>
      `
  };

  document.getElementById("nutritionInfo").innerHTML = details[plan];
  document.getElementById("nutritionDetails").style.display = "block";
}


function closeDetails() {
  document.getElementById("nutritionDetails").style.display = "none";
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
