// Function to Show Sections Dynamically
function showSection(sectionId) {
    let sections = document.querySelectorAll(".section");
    sections.forEach(section => section.style.display = "none");

    document.getElementById(sectionId).style.display = "block";
}

// BMI Calculation
function calculateBMI() {
    let height = parseFloat(document.getElementById("height").value) / 100;
    let weight = parseFloat(document.getElementById("weight").value);
    let targetWeight = parseFloat(document.getElementById("targetWeight").value);
    
    if (height && weight) {
        let bmi = (weight / (height * height)).toFixed(2);
        document.getElementById("bmiResult").innerText = bmi;

        let status = "";
        if (bmi < 18.5) {
            status = "Underweight";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = "Normal Weight";
        } else if (bmi >= 25 && bmi <= 29.9) {
            status = "Overweight";
        } else {
            status = "Obese";
        }

        document.getElementById("bmiStatus").innerText = status;
    } else {
        alert("Please enter valid height and weight.");
    }
}
function calculateBMI() {
    let height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
    let weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight values.");
        return;
    }

    let bmi = (weight / (height * height)).toFixed(2);
    document.getElementById("bmiResult").innerText = bmi;

    let status = "";
    if (bmi < 18.5) {
        status = "Underweight";
        showWeightGainWorkouts();
    } else if (bmi < 24.9) {
        status = "Normal weight";
        showGeneralWorkouts();
    } else {
        status = "Overweight";
        showWeightLossWorkouts();
    }

    document.getElementById("bmiStatus").innerText = status;
}

function showWeightGainWorkouts() {
    document.getElementById("workout").innerHTML = `
        <h2 style="color: white;">Workouts for Weight Gain</h2>
        <ul style="color: white;">
            <li>Strength Training (3-4 times a week)</li>
            <li>Calisthenics (Push-ups, Squats, Pull-ups)</li>
            <li>Progressive Overload Training</li>
            <li>High-Calorie Diet Plan</li>
        </ul>
        <h3 style="color: white;">Recommended Exercises:</h3>
        <ol style="color: white;">
            <li><b>Pull-ups:</b> Perform 3 sets of 6-10 reps.</li>
            <video width="320" height="240" controls>
                <source src="../Videos/pullups.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            
            <li><b>Push-ups:</b> Perform 3 sets of 12-15 reps.</li>
            <video width="320" height="240" controls>
                <source src="../Videos/pushups.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <li><b>Squats:</b> Perform 3 sets of 10-15 reps.</li>
            <video width="320" height="240" controls>
                <source src="../Videos/squat.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </ol>
    `;
}



function showGeneralWorkouts() {
    document.getElementById("workout").innerHTML = `
        <h2 style="color: white;">General Fitness Workouts</h2>
        <ul style="color: white;">
            <li>Cardio (Running, Cycling, Swimming)</li>
            <li>Full-Body Strength Training</li>
            <li>Flexibility Exercises (Yoga, Stretching)</li>
        </ul>
        
       
<h3 style="color: white; text-align: center;">Recommended Workout:</h3>
        <img src="../Images/yoga.jpg" alt="Yoga Workout" width="400" height="250" 
             style="display: block; margin: 10px auto; border-radius: 10px;">
              <video width="320" height="240" controls>
                <source src="../Videos/sprints.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <video width="320" height="240" controls>
                <source src="../Videos/cycling.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
}


function showWeightLossWorkouts() {
    document.getElementById("workout").innerHTML = `
        <h2>Workouts for Weight Loss</h2>
        <ul style="color: white;">
            <li>HIIT Workouts</li>
            <li>Cardio (Jump Rope, Running, Cycling)</li>
            <li>Strength Training (Fat-Burning Focus)</li>
            <li>Caloric Deficit Diet</li>
        </ul>
        <h3>Watch this weight loss workout guide:</h3>
        <video width="320" height="240" controls>
                <source src="../Videos/jump_rope.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
             <video width="320" height="240" controls>
                <source src="../Videos/deadlift.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
    `;
}

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}

function updateNutritionPlan() {
    let bmi = parseFloat(document.getElementById("bmiResult").innerText);
    let nutritionDetails = document.getElementById("nutritionDetails");

    if (!bmi) {
        nutritionDetails.innerHTML = `<p>Please calculate your BMI first.</p>`;
        return;
    }

    let planTitle = "";
    let mealPlans = [];

    // Determine the meal plan based on the BMI value
    if (bmi < 18.5) {
        planTitle = "Weight Gain Meal Plan";
        mealPlans = [
            { food: "Oatmeal with peanut butter & banana", calories: "450 kcal", image: "../Images/peanut.jpg" },
            { food: "Nuts & Greek yogurt", calories: "300 kcal", image: "../Images/yogrt.jpg" }
        ];
    }
    else if (bmi < 24.9) {
        planTitle = "Balanced Nutrition Meal Plan";
        mealPlans = [
            { food: "Scrambled eggs with whole-grain toast", calories: "350 kcal", image: "../Images/egg.jpg" },
            { food: "Hummus & veggie sticks", calories: "250 kcal", image: "../Images/vegstcik.jpg" }
        ];
    } else {
        planTitle = "Weight Loss Meal Plan";
        mealPlans = [
            { food: "Smoothie with spinach, banana & almond milk", calories: "300 kcal", image: "../Images/ALmond.jpg" },
            { food: "Grilled chicken salad with olive oil dressing", calories: "400 kcal", image: "../Images/Grilled.jpg" }
        ];
    }

    // Generate HTML for the meal plans
    let mealPlanHTML = `<h3>${planTitle}</h3><div class="meal-plan-container">`;

    mealPlans.forEach(meal => {
        mealPlanHTML += `
            <div class="meal-card">
                <img src="${meal.image}" alt="${meal.food}" class="meal-image">
                <p class="meal-name">${meal.food}</p>
                <p class="meal-calories">Calories: ${meal.calories}</p>
            </div>
        `;
    });

    mealPlanHTML += `</div>`;
    nutritionDetails.innerHTML = mealPlanHTML;
}// Function to Show Sections Dynamically
function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}

// BMI Calculation
// function calculateBMI() {
//     const height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
//     const weight = parseFloat(document.getElementById("weight").value);

//     if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
//         alert("Please enter valid height and weight values.");
//         return;
//     }

//     const bmi = (weight / (height * height)).toFixed(2);
//     document.getElementById("bmiResult").innerText = bmi;

//     let status = "";
//     if (bmi < 18.5) {
//         status = "Underweight";
//         showWeightGainWorkouts();
//     } else if (bmi < 24.9) {
//         status = "Normal weight";
//         showGeneralWorkouts();
//     } else {
//         status = "Overweight";
//         showWeightLossWorkouts();
//     }

//     document.getElementById("bmiStatus").innerText = status;
// }

// function showWeightGainWorkouts() {
//     const workoutContainer = document.getElementById("workout");
//     workoutContainer.innerHTML = `
//         <h2 style="color: white;">Workouts for Weight Gain</h2>
//         <ul style="color: white;">
//             <li>Strength Training (3-4 times a week)</li>
//             <li>Calisthenics (Push-ups, Squats, Pull-ups)</li>
//             <li>Progressive Overload Training</li>
//             <li>High-Calorie Diet Plan</li>
//         </ul>
//         <h3 style="color: white;">Recommended Exercises:</h3>
//         <ol style="color: white;">
//             <li><b>Pull-ups:</b> Perform 3 sets of 6-10 reps.</li>
//             <video width="320" height="240" controls>
//                 <source src="Videos/pullups.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
            
//             <li><b>Push-ups:</b> Perform 3 sets of 12-15 reps.</li>
//             <video width="320" height="240" controls>
//                 <source src="Videos/pushups.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>

//             <li><b>Squats:</b> Perform 3 sets of 10-15 reps.</li>
//             <video width="320" height="240" controls>
//                 <source src="Videos/squat.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//         </ol>
//     `;
// }

// function showGeneralWorkouts() {
//     const workoutContainer = document.getElementById("workout");
//     workoutContainer.innerHTML = `
//         <h2 style="color: white;">General Fitness Workouts</h2>
//         <ul style="color: white;">
//             <li>Cardio (Running, Cycling, Swimming)</li>
//             <li>Full-Body Strength Training</li>
//             <li>Flexibility Exercises (Yoga, Stretching)</li>
//         </ul>
        
       
// <h3 style="color: white; text-align: center;">Recommended Workout:</h3>
//         <img src="images/yoga.jpg" alt="Yoga Workout" width="400" height="250" 
//              style="display: block; margin: 10px auto; border-radius: 10px;">
//               <video width="320" height="240" controls>
//                 <source src="Videos/sprints.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//             <video width="320" height="240" controls>
//                 <source src="Videos/cycling.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//         `;
// }

// function showWeightLossWorkouts() {
//     const workoutContainer = document.getElementById("workout");
//     workoutContainer.innerHTML = `
//         <h2>Workouts for Weight Loss</h2>
//         <ul style="color: white;">
//             <li>HIIT Workouts</li>
//             <li>Cardio (Jump Rope, Running, Cycling)</li>
//             <li>Strength Training (Fat-Burning Focus)</li>
//             <li>Caloric Deficit Diet</li>
//         </ul>
//         <h3>Watch this weight loss workout guide:</h3>
//         <video width="320" height="240" controls>
//                 <source src="Videos/jump_rope.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//              <video width="320" height="240" controls>
//                 <source src="Videos/deadlift.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//     `;
// }

