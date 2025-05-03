// admin_dashboard.js (UPDATED FOR CALORIES)

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Admin Dashboard Script Loaded!");

  function loadUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'Unknown error');
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';
        data.users.forEach((user, idx) => {
          const tr = document.createElement('tr');
          tr.setAttribute('data-user-id', user.id);
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${user.name}</td>
            <td>${user.gender}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>
              <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        alert('Could not load user list. Check console.');
      });
  }

  function loadWorkouts() {
    fetch('/workouts')
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'Failed to fetch workouts');
        const workoutContainer = document.getElementById('workout-container');
        workoutContainer.innerHTML = '';

        data.workouts.forEach(workout => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <div class="card-content">
              <h4>${workout.title}</h4>
              <p>${workout.details}</p>
              <p><strong>Category:</strong> ${workout.category}</p>
              <button class="delete-workout" data-id="${workout.id}">Delete</button>
            </div>
          `;
          workoutContainer.appendChild(card);
        });
      })
      .catch(err => {
        console.error('Error loading workouts:', err);
      });
  }

  function loadNutritionPlans() {
    fetch('/nutrition')
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'Failed to fetch nutrition plans');
        const container = document.getElementById('nutrition-container');
        container.innerHTML = '';

        data.nutrition.forEach(plan => {
          const card = document.createElement('div');
          card.className = 'nutrition-card';
          card.innerHTML = `
            <img src="${plan.image_url}" alt="Nutrition Image">
            <div class="nutrition-card-content">
              <h4>${plan.title}</h4>
              <p><strong>Category:</strong> ${plan.category}</p>
              <p><strong>Calories:</strong> ${plan.calories || 'N/A'}</p>
              <button class="delete-nutrition" data-id="${plan.id}">Delete</button>
            </div>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error('Error loading nutrition plans:', err);
      });
  }

  window.showSection = (sectionId) => {
    document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
    const active = document.getElementById(sectionId);
    if (active) active.style.display = 'block';
    else console.error(`Section "${sectionId}" not found`);

    if (sectionId === 'user-management') loadUsers();
    if (sectionId === 'workout-management') loadWorkouts();
    if (sectionId === 'nutrition-management') loadNutritionPlans();
  };

  document.querySelectorAll('.sidebar ul li').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('onclick').match(/'([^']+)'/)[1];
      showSection(target);
    });
  });

  const addWorkoutButton = document.getElementById('addWorkout');
  const workoutContainer = document.getElementById('workout-container');

  if (addWorkoutButton && workoutContainer) {
    addWorkoutButton.addEventListener('click', () => {
      const userInput = prompt('Enter Workout Title, Details, and Category (comma-separated):');
      if (!userInput) return alert('Input required!');
      const [title, details, category] = userInput.split(',').map(item => item.trim());
      if (!title || !details || !category) return alert('All three fields are required!');

      fetch('/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, details, category })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Workout added.');
          loadWorkouts();
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Error adding workout:', err);
        alert('Failed to add workout.');
      });
    });

    workoutContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-workout')) {
        const workoutId = e.target.getAttribute('data-id');
        if (!confirm('Are you sure you want to delete this workout?')) return;

        fetch(`/workouts/${workoutId}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert('Workout deleted.');
              loadWorkouts();
            } else {
              alert(data.message);
            }
          })
          .catch(err => {
            console.error('Error deleting workout:', err);
            alert('Failed to delete workout.');
          });
      }
    });
  }

  const addNutritionButton = document.getElementById('addNutrition');
  const nutritionContainer = document.getElementById('nutrition-container');

  if (addNutritionButton && nutritionContainer) {
    addNutritionButton.addEventListener('click', () => {
      const input = prompt('Enter Nutrition Title, Image URL, Category, and Calories (comma-separated):');
      if (!input) return alert('Input required!');
      const [title, image_url, category, calories] = input.split(',').map(item => item.trim());
      if (!title || !image_url || !category || !calories) return alert('All four fields are required!');

      fetch('/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, image_url, category, calories })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Nutrition plan added.');
          loadNutritionPlans();
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Error adding nutrition plan:', err);
        alert('Failed to add nutrition plan.');
      });
    });

    nutritionContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-nutrition')) {
        const nutritionId = e.target.getAttribute('data-id');
        if (!confirm('Are you sure you want to delete this nutrition plan?')) return;

        fetch(`/nutrition/${nutritionId}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert('Nutrition plan deleted.');
              loadNutritionPlans();
            } else {
              alert(data.message);
            }
          })
          .catch(err => {
            console.error('Error deleting nutrition plan:', err);
            alert('Deletion failed.');
          });
      }
    });
  }

  loadUsers();
  loadWorkouts();
});

function loadBlogs() {
  fetch('/blogs')
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw new Error(data.message || 'Error loading blogs');
      const blogContainer = document.getElementById('blogContainer');
      blogContainer.innerHTML = '';

      data.blogs.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
          <img src="${blog.image_url}" alt="Blog Image" />
          <div class="card-content">
            <h4>${blog.title}</h4>
            <p>${blog.description ? blog.description.substring(0, 80) + '...' : 'No description'}</p>
            <button onclick="readBlog('${blog.title}', \`${blog.description}\`)">Read More</button>
            <button onclick="deleteBlog(${blog.id})">Delete</button>
          </div>
        `;
        blogContainer.appendChild(card);
      });
    })
    .catch(err => console.error('Blog loading error:', err));
}
// —— Add Blog —— //
const addBlogButton = document.getElementById('addBlog');
if (addBlogButton) {
  addBlogButton.addEventListener('click', () => {
    const input = prompt('Enter Blog Title, Image URL, and Description (comma-separated)');
if (!input || !input.trim()) {
  alert('All fields are required!');
  return;
}

const [title, image_url, description] = input.split(',').map(x => x.trim());

// Check if any of the three fields is empty
if (!title || !image_url || !description) {
  alert('All fields are required!');
  return;
}

    fetch('/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, image_url, description })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Blog added.');
        loadBlogs();
      } else {
        alert(data.message || 'Failed to add blog');
      }
    });
  });
}

// Handle blog deletion
function deleteBlog(id) {
  if (!confirm("Are you sure you want to delete this blog?")) return;
  fetch(`/blogs/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      loadBlogs(); // refresh the blog list
    })
    .catch(err => console.error("Failed to delete blog:", err));
}

// Handle blog read more
function readBlog(title, description) {
  alert(`${title}\n\n${description}`);
}

// Load blogs when the dashboard loads or when switching to blog section
window.showSection = (sectionId) => {
  document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
  const active = document.getElementById(sectionId);
  if (active) active.style.display = 'block';

  if (sectionId === 'user-management') loadUsers();
  if (sectionId === 'workout-management') loadWorkouts();
  if (sectionId === 'nutrition-management') loadNutritionPlans();
  if (sectionId === 'blog-management') loadBlogs(); // 👈 Add this line!
};

// And optionally call once when DOM is ready:
loadBlogs(); // 👈 To show blogs immediately when admin loads

