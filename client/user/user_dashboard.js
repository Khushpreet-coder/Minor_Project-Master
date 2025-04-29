
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("✅ User Dashboard Script Loaded!");

//   let bmiCategory = "";

//   // Show Sections (Profile, Workouts, Nutrition, Blogs)
//   window.showSection = function (sectionId) {
//     document.querySelectorAll(".section").forEach(section => {
//       section.style.display = "none";
//     });
//     const active = document.getElementById(sectionId);
//     if (active) active.style.display = "block";
//   };

//   // BMI Calculation
//   window.calculateBMI = function () {
//     const height = parseFloat(document.getElementById("height").value) / 100;
//     const weight = parseFloat(document.getElementById("weight").value);

//     if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
//       alert("Please enter valid height and weight values.");
//       return;
//     }

//     const bmi = (weight / (height * height)).toFixed(2);
//     document.getElementById("bmiResult").innerText = bmi;

//     if (bmi < 18.5) {
//       bmiCategory = "underweight";
//     } else if (bmi < 24.9) {
//       bmiCategory = "normal";
//     } else {
//       bmiCategory = "overweight";
//     }

//     document.getElementById("bmiStatus").innerText = bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1);

//     fetchAdminWorkouts(bmiCategory);
//   };

//   // Always show Static BMI workouts first
//   function showStaticBMIWorkouts(category) {
//     const workoutContainer = document.getElementById("workoutContainer");

//     if (category === "underweight") {
//       workoutContainer.innerHTML += `
//         <h3 style="color:white;">Basic Workouts for Weight Gain</h3>
//         <ul style="color:white;">
//           <li>Strength Training (3-4 times a week)</li>
//           <li>Calisthenics (Push-ups, Squats, Pull-ups)</li>
//           <li>Progressive Overload Training</li>
//           <li>High-Calorie Diet Plan</li>
//         </ul>
//         <h4 style="color:white;">Recommended Exercises:</h4>
//         <ol style="color:white;">
//           <li><b>Pull-ups:</b> 3 sets of 6-10 reps</li>
//           <video width="320" height="240" controls>
//             <source src="../Videos/pullups.mp4" type="video/mp4">
//           </video>

//           <li><b>Push-ups:</b> 3 sets of 12-15 reps</li>
//           <video width="320" height="240" controls>
//             <source src="../Videos/pushups.mp4" type="video/mp4">
//           </video>

//           <li><b>Squats:</b> 3 sets of 10-15 reps</li>
//           <video width="320" height="240" controls>
//             <source src="../Videos/squat.mp4" type="video/mp4">
//           </video>
//         </ol>
//       `;
//     } else if (category === "normal") {
//       workoutContainer.innerHTML += `
//         <h3 style="color:white;">Basic General Fitness Workouts</h3>
//         <ul style="color:white;">
//           <li>Cardio (Running, Cycling, Swimming)</li>
//           <li>Full-Body Strength Training</li>
//           <li>Flexibility Exercises (Yoga, Stretching)</li>
//         </ul>
//         <img src="../Images/yoga.jpg" width="400" height="250" style="display: block; margin: 10px auto; border-radius: 10px;">
//         <video width="320" height="240" controls>
//           <source src="../Videos/sprints.mp4" type="video/mp4">
//         </video>
//         <video width="320" height="240" controls>
//           <source src="../Videos/cycling.mp4" type="video/mp4">
//         </video>
//       `;
//     } else if (category === "overweight") {
//       workoutContainer.innerHTML += `
//         <h3 style="color:white;">Basic Workouts for Weight Loss</h3>
//         <ul style="color:white;">
//           <li>HIIT Workouts</li>
//           <li>Cardio (Jump Rope, Running, Cycling)</li>
//           <li>Strength Training (Fat-Burning Focus)</li>
//           <li>Caloric Deficit Diet</li>
//         </ul>
//         <video width="320" height="240" controls>
//           <source src="../Videos/jump_rope.mp4" type="video/mp4">
//         </video>
//         <video width="320" height="240" controls>
//           <source src="../Videos/deadlift.mp4" type="video/mp4">
//         </video>
//       `;
//     }
//   }

//   // Fetch Admin Added Workouts
//   function fetchAdminWorkouts(category) {
//     const workoutContainer = document.getElementById("workoutContainer");

//     workoutContainer.innerHTML = `
      
//       <h3 style="color:white;">For ${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
//     `;

//     // Show Static Plans first
//     showStaticBMIWorkouts(category);

//     // Then load admin workouts dynamically
//     fetch('/workouts')
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           data.workouts.forEach(workout => {
//             if (workout.category && workout.category.toLowerCase() === category) {
//               const card = document.createElement('div');
//               card.className = 'card';
//               card.innerHTML = `
//                 <div class="card-content">
//                   <h4 style="color:white;">${workout.title}</h4>
//                   <p style="color:white;">${workout.details}</p>
//                 </div>
//               `;
//               workoutContainer.appendChild(card);
//             }
//           });
//         } else {
//           console.error('Failed to fetch workouts:', data.message);
//         }
//       })
//       .catch(err => {
//         console.error('Error fetching workouts:', err);
//       });
//   }

//   // Nutrition Plan
//   window.updateNutritionPlan = function () {
//     const bmi = parseFloat(document.getElementById("bmiResult").innerText);
//     const nutritionDetails = document.getElementById("nutritionDetails");

//     if (isNaN(bmi)) {
//       nutritionDetails.innerHTML = `<p>Please calculate your BMI first!</p>`;
//       return;
//     }

//     let title = "";
//     let meals = [];

//     if (bmi < 18.5) {
//       title = "Weight Gain Meal Plan";
//       meals = [
//         { food: "Oatmeal with Peanut Butter & Banana", calories: "450 kcal", image: "../Images/peanut.jpg" },
//         { food: "Nuts & Greek Yogurt", calories: "300 kcal", image: "../Images/yogrt.jpg" }
//       ];
//     } else if (bmi < 24.9) {
//       title = "Balanced Nutrition Meal Plan";
//       meals = [
//         { food: "Scrambled Eggs with Toast", calories: "350 kcal", image: "../Images/egg.jpg" },
//         { food: "Hummus & Veggie Sticks", calories: "250 kcal", image: "../Images/vegstcik.jpg" }
//       ];
//     } else {
//       title = "Weight Loss Meal Plan";
//       meals = [
//         { food: "Spinach-Banana Smoothie", calories: "300 kcal", image: "../Images/ALmond.jpg" },
//         { food: "Grilled Chicken Salad", calories: "400 kcal", image: "../Images/Grilled.jpg" }
//       ];
//     }

//     let mealHTML = `<h3>${title}</h3><div class="meal-plan-container">`;
//     meals.forEach(meal => {
//       mealHTML += `
//         <div class="meal-card">
//           <img src="${meal.image}" alt="${meal.food}" class="meal-image">
//           <p class="meal-name">${meal.food}</p>
//           <p class="meal-calories">Calories: ${meal.calories}</p>
//         </div>
//       `;
//     });
//     mealHTML += `</div>`;

//     nutritionDetails.innerHTML = mealHTML;
//   };
// });

// user_dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ User Dashboard Script Loaded!");

  let bmiCategory = "";

  window.showSection = function (sectionId) {
    document.querySelectorAll(".section").forEach(section => {
      section.style.display = "none";
    });
    const active = document.getElementById(sectionId);
    if (active) active.style.display = "block";
  };

  window.calculateBMI = function () {
    const height = parseFloat(document.getElementById("height").value) / 100;
    const weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      alert("Please enter valid height and weight values.");
      return;
    }

    const bmi = (weight / (height * height)).toFixed(2);
    document.getElementById("bmiResult").innerText = bmi;

    if (bmi < 18.5) {
      bmiCategory = "underweight";
    } else if (bmi < 24.9) {
      bmiCategory = "normal";
    } else {
      bmiCategory = "overweight";
    }

    document.getElementById("bmiStatus").innerText = bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1);

    fetchAdminWorkouts(bmiCategory);

    const getPlanBtn = document.getElementById("getNutritionBtn");
    if (getPlanBtn) {
      getPlanBtn.onclick = () => updateNutritionPlan();
    }
  };

  function fetchAdminWorkouts(category) {
    const workoutContainer = document.getElementById("workoutContainer");
    workoutContainer.innerHTML = `<h3 style="color:white;">For ${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;

    fetch('/workouts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          data.workouts.forEach(workout => {
            if (workout.category && workout.category.toLowerCase() === category) {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                <div class="card-content">
                  <h4 style="color:white;">${workout.title}</h4>
                  <p style="color:white;">${workout.details}</p>
                </div>
              `;
              workoutContainer.appendChild(card);
            }
          });
        }
        showStaticBMIWorkouts(category);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }

  function showStaticBMIWorkouts(category) {
    const workoutContainer = document.getElementById("workoutContainer");

    if (category === "underweight") {
      workoutContainer.innerHTML += `
        <h3 style="color:white;">Basic Workouts for Weight Gain</h3>
        <ul style="color:white;">
          <li>Strength Training (3-4 times a week)</li>
          <li>Calisthenics (Push-ups, Squats, Pull-ups)</li>
          <li>Progressive Overload Training</li>
          <li>High-Calorie Diet Plan</li>
        </ul>
        <h4 style="color:white;">Recommended Exercises:</h4>
        <ol style="color:white;">
          <li><b>Pull-ups:</b> 3 sets of 6-10 reps</li>
          <video width="320" height="240" controls>
            <source src="../Videos/pullups.mp4" type="video/mp4">
          </video>
          <li><b>Push-ups:</b> 3 sets of 12-15 reps</li>
          <video width="320" height="240" controls>
            <source src="../Videos/pushups.mp4" type="video/mp4">
          </video>
          <li><b>Squats:</b> 3 sets of 10-15 reps</li>
          <video width="320" height="240" controls>
            <source src="../Videos/squat.mp4" type="video/mp4">
          </video>
        </ol>
      `;
    } else if (category === "normal") {
      workoutContainer.innerHTML += `
        <h3 style="color:white;">Basic General Fitness Workouts</h3>
        <ul style="color:white;">
          <li>Cardio (Running, Cycling, Swimming)</li>
          <li>Full-Body Strength Training</li>
          <li>Flexibility Exercises (Yoga, Stretching)</li>
        </ul>
        <img src="../Images/yoga.jpg" width="400" height="250" style="display: block; margin: 10px auto; border-radius: 10px;">
        <video width="320" height="240" controls>
          <source src="../Videos/sprints.mp4" type="video/mp4">
        </video>
        <video width="320" height="240" controls>
          <source src="../Videos/cycling.mp4" type="video/mp4">
        </video>
      `;
    } else if (category === "overweight") {
      workoutContainer.innerHTML += `
        <h3 style="color:white;">Basic Workouts for Weight Loss</h3>
        <ul style="color:white;">
          <li>HIIT Workouts</li>
          <li>Cardio (Jump Rope, Running, Cycling)</li>
          <li>Strength Training (Fat-Burning Focus)</li>
          <li>Caloric Deficit Diet</li>
        </ul>
        <video width="320" height="240" controls>
          <source src="../Videos/jump_rope.mp4" type="video/mp4">
        </video>
        <video width="320" height="240" controls>
          <source src="../Videos/deadlift.mp4" type="video/mp4">
        </video>
      `;
    }
  }

  window.updateNutritionPlan = function () {
    const nutritionDetails = document.getElementById("nutritionDetails");
    nutritionDetails.innerHTML = `<h3>Nutrition Plans for ${bmiCategory}</h3><div class="meal-plan-container"></div>`;

    const container = nutritionDetails.querySelector(".meal-plan-container");

    fetch('/nutrition')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          showStaticNutritionPlans(bmiCategory);

          data.nutrition.forEach(plan => {
            if (plan.category && plan.category.toLowerCase() === bmiCategory) {
              const card = document.createElement('div');
              card.className = 'meal-card';
              card.innerHTML = `
                <img src="${plan.image_url}" alt="${plan.title}" class="meal-image" onerror="this.onerror=null; this.src='../Images/default.jpg';">
                <p class="meal-name">${plan.title}</p>
              `;
              container.appendChild(card);
            }
          });
        }
      })
      .catch(err => console.error('Error fetching nutrition:', err));
  }

  function showStaticNutritionPlans(category) {
    const nutritionDetails = document.getElementById("nutritionDetails");
    const container = nutritionDetails.querySelector(".meal-plan-container");
    if (!container) return;

    let meals = [];
    if (category === "underweight") {
      meals = [
        { food: "Oatmeal with Peanut Butter & Banana", calories: "450 kcal", image: "../Images/peanut.jpg" },
        { food: "Nuts & Greek Yogurt", calories: "300 kcal", image: "../Images/yogrt.jpg" }
      ];
    } else if (category === "normal") {
      meals = [
        { food: "Scrambled Eggs with Toast", calories: "350 kcal", image: "../Images/egg.jpg" },
        { food: "Hummus & Veggie Sticks", calories: "250 kcal", image: "../Images/vegstcik.jpg" }
      ];
    } else {
      meals = [
        { food: "Spinach-Banana Smoothie", calories: "300 kcal", image: "../Images/ALmond.jpg" },
        { food: "Grilled Chicken Salad", calories: "400 kcal", image: "../Images/Grilled.jpg" }
      ];
    }

    meals.forEach(meal => {
      const card = document.createElement('div');
      card.className = 'meal-card';
      card.innerHTML = `
        <img src="${meal.image}" alt="${meal.food}" class="meal-image" onerror="this.onerror=null; this.src='../Images/default.jpg';">
        <p class="meal-name">${meal.food}</p>
        <p class="meal-calories">Calories: ${meal.calories}</p>
      `;
      container.appendChild(card);
    });
  }
});
