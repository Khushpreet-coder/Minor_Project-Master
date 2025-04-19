function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("open");
    document.querySelector(".content").classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    
    const initialScreen = document.getElementById("initial-screen");
    const sections = document.querySelectorAll("section");

    function showSection(sectionId) {
        
        initialScreen.style.display = "none";   
        sections.forEach(sec => sec.style.display = "none");

        document.getElementById(sectionId).style.display = "block";
    }
    document.querySelectorAll(".sidebar ul li").forEach(item => {
        item.addEventListener("click", function () {
            const sectionId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showSection(sectionId);
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const initialScreen = document.getElementById("initial-screen");
    const sections = document.querySelectorAll("section");

    function showSection(sectionId) {
      
        if (initialScreen) initialScreen.style.display = "none";
        sections.forEach(sec => sec.style.display = "none");

        const activeSection = document.getElementById(sectionId);
        if (activeSection) activeSection.style.display = "block";
    }  
    document.querySelector("[onclick=\"showSection('user-management')\"]").addEventListener("click", function () {
        showSection("user-management");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const initialScreen = document.getElementById("initial-screen");
    const sections = document.querySelectorAll("section");

    function showSection(sectionId) {
       
        if (initialScreen) initialScreen.style.display = "none";
        sections.forEach(sec => sec.style.display = "none");

        const activeSection = document.getElementById(sectionId);
        if (activeSection) activeSection.style.display = "block";
    }

    
    document.querySelector("[onclick=\"showSection('workout-management')\"]").addEventListener("click", function () {
        showSection("workout-management");
    });

    // Add & Delete Workout Functionality
    const addWorkoutButton = document.getElementById("addWorkout"); 
    const workoutContainer = document.querySelector("#workout-management .row"); 

    if (!addWorkoutButton || !workoutContainer) {
        console.error("Error: Add Workout Button or container not found!");
        return;
    }

    addWorkoutButton.addEventListener("click", function () {
        console.log("Add Workout Button Clicked!");

        const userInput = prompt("Enter Workout Title and Details (separated by a comma):");

        if (!userInput) {
            alert("Input is required!");
            return;
        }
        const [title, details] = userInput.split(",").map(item => item.trim());

        if (!title || !details) {
            alert("Both Title and Details are required!");
            return;
        }

        addWorkoutCard(title, details);
    });

   
    function addWorkoutCard(title, details) {
        const workoutCard = document.createElement("div");
        workoutCard.classList.add("card");

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const cardTitle = document.createElement("h4");
        cardTitle.textContent = title;

        const cardDetails = document.createElement("p");
        cardDetails.textContent = details;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-workout");

        
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardDetails);
        cardContent.appendChild(deleteButton);

        workoutCard.appendChild(cardContent);

        workoutContainer.appendChild(workoutCard);
        console.log("New Workout Added!");
    }

  
    workoutContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-workout")) {
            console.log("Deleting Workout:", event.target.closest(".card"));
            event.target.closest(".card").remove();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const initialScreen = document.getElementById("initial-screen");
    const sections = document.querySelectorAll("section");

    function showSection(sectionId) {
        // Hide the initial screen
        if (initialScreen) initialScreen.style.display = "none";

        // Hide all sections
        sections.forEach(sec => sec.style.display = "none");

        // Show the selected section
        const activeSection = document.getElementById(sectionId);
        if (activeSection) activeSection.style.display = "block";
    }

    // Attach event listener to "Manage Workouts" button in the sidebar
    document.querySelector("[onclick=\"showSection('workout-management')\"]").addEventListener("click", function () {
        showSection("workout-management");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded!");

    const addNutritionButton = document.getElementById("addNutrition");
    const nutritionContainer = document.getElementById("nutrition-container");

    if (!addNutritionButton || !nutritionContainer) {
        console.error("Error: Button or container not found!");
        return;
    }

    addNutritionButton.addEventListener("click", function () {
        console.log("Add Nutrition Button Clicked!");

        // Ask for user input (Title & Image URL in one prompt)
        const userInput = prompt("Enter Nutrition Plan Title and Image URL (separated by a comma):");

        if (!userInput) {
            alert("Input is required!");
            return;
        }

        const [title, imageUrl] = userInput.split(",").map(item => item.trim());

        if (!title || !imageUrl) {
            alert("Both Title and Image URL are required!");
            return;
        }

        
        addNutritionCard(title, imageUrl);
    });

    function addNutritionCard(title, imageUrl) {
        const nutritionCard = document.createElement("div");
        nutritionCard.classList.add("nutrition-card");

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Nutrition Image";

        const cardContent = document.createElement("div");
        cardContent.classList.add("nutrition-card-content");

        const cardTitle = document.createElement("h4");
        cardTitle.textContent = title;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-nutrition");

        // Append elements
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(deleteButton);

        nutritionCard.appendChild(img);
        nutritionCard.appendChild(cardContent);

        nutritionContainer.appendChild(nutritionCard);
        console.log("New Nutrition Plan Added!");
    }

   
    nutritionContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-nutrition")) {
            console.log("Deleting Nutrition Plan:", event.target.closest(".nutrition-card"));
            event.target.closest(".nutrition-card").remove();
        }
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const initialScreen = document.getElementById("initial-screen");
    const sections = document.querySelectorAll("section");

    window.showSection = function (sectionId) {
        if (initialScreen) initialScreen.style.display = "none";

        sections.forEach(sec => sec.style.display = "none");

        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.style.display = "block";
        } else {
            console.error(`Section with ID "${sectionId}" not found.`);
        }
    };
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Blog Script Loaded!");

    const addBlogButton = document.getElementById("addBlog"); // Updated ID for blogs
    const blogContainer = document.querySelector("#blog-management .row"); // Target blog card container

    if (!addBlogButton || !blogContainer) {
        console.error("Error: Button or blog container not found!");
        return;
    }

    addBlogButton.addEventListener("click", function () {
        console.log("Add Blog Button Clicked!");

        // Ask for user input (Title & Image URL in one prompt)
        const userInput = prompt("Enter Blog Title and Image URL (separated by a comma):");

        if (!userInput) {
            alert("Input is required!");
            return;
        }

        const [title, imageUrl] = userInput.split(",").map(item => item.trim());

        if (!title || !imageUrl) {
            alert("Both Title and Image URL are required!");
            return;
        }

        // ✅ Add Blog Card if Inputs are Provided
        addBlogCard(title, imageUrl);
    });

    // Function to add a new blog card
    function addBlogCard(title, imageUrl) {
        const blogCard = document.createElement("div");
        blogCard.classList.add("card");

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Blog Image";

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const cardTitle = document.createElement("h4");
        cardTitle.textContent = title;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-blog");

        // Append elements
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(deleteButton);

        blogCard.appendChild(img);
        blogCard.appendChild(cardContent);

        blogContainer.appendChild(blogCard);
        console.log("New Blog Added!");
    }

    blogContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-blog")) {
            console.log("Deleting Blog:", event.target.closest(".card"));
            event.target.closest(".card").remove();
        }
    });
});




  

