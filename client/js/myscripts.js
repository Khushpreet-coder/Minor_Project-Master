var navLinks= document.getElementById("navLinks");
function showMenu()
{
navLinks.style.right="0";

}
function hideMenu()
{
navLinks.style.right="-200px";
    
}
window.addEventListener("scroll", function () {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll(".nav-links ul li a");
  
    sections.forEach((section) => {
      let top = window.scrollY;
      let offset = section.offsetTop - 100;
      let height = section.offsetHeight;
      let id = section.getAttribute("id");
  
      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          document
            .querySelector(".nav-links ul li a[href*=" + id + "]")
            .classList.add("active");
        });
      }
    });
  });

  // Open the popup and display the details of the clicked card
function openForm(title, description) {
  // Set the title and description inside the popup
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-description").innerText = description;
  
  // Show the popup
  document.getElementById("popupForm").style.display = "flex";
}

// Close the popup
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

  

function toggleSignupButton() {
  let role = document.getElementById("loginRole").value;
  let signupBtn = document.getElementById("signupBtn");
  let signupForm = document.getElementById("signupForm");

  if (role === "admin") {
      signupBtn.style.display = "none"; // Hide Signup button
      signupForm.style.display = "none"; // Hide Signup form if it's open
  } else {
      signupBtn.style.display = "block"; // Show Signup button
  }
}

function showSignup() {
  let role = document.getElementById("loginRole").value;
  if (role === "admin") {
      alert("Admins cannot sign up.");
      return;
  }
  
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
}

function closePopup() {
  document.getElementById("loginPopup").style.display = "none";
}

function showLoginForm() {
  document.getElementById("loginPopup").style.display = "flex";
}

function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
      alert("Please fill out all fields.");
      return;
  }

  alert("Login successful!");
  closePopup();
}

function signup() {
  let name = document.getElementById("signupName").value;
  let age = document.getElementById("signupAge").value;
  let gender = document.getElementById("signupGender").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;

  if (name === "" || age === "" || gender === "" || email === "" || password === "") {
      alert("Please fill out all fields.");
      return;
  }

  alert("Signup successful!");
  showLogin();
}

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