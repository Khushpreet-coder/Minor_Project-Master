// // Admin Dashboard Script

// document.addEventListener("DOMContentLoaded", function () {
//     console.log("✅ Admin Dashboard Script Loaded!");
  
//     // ==================== Load Users for Admin Dashboard ====================
//     const loadUsers = () => {
//       fetch('/users')
//         .then(res => res.json())
//         .then(data => {
//           if (!data.success) throw new Error(data.message || 'Unknown error');
//           const tbody = document.getElementById('userTableBody');
//           tbody.innerHTML = '';
//           data.users.forEach((user, idx) => {
//             const tr = document.createElement('tr');
//             tr.innerHTML = `
//               <td>${idx + 1}</td>
//               <td>${user.name}</td>
//               <td>${user.gender}</td>
//               <td>${user.age}</td>
//               <td>${user.email}</td>
//               <td>
//                 <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
//                 <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
//               </td>
//             `;
//             tbody.appendChild(tr);
//           });
//         })
//         .catch(err => {
//           console.error('Failed to fetch users:', err);
//           alert('Could not load user list. Check console for details.');
//         });
//     };
  
//     // Initial load of users
//     loadUsers();
  
//     // ==================== Sidebar & Section Navigation ====================
//     function toggleSidebar() {
//       document.querySelector(".sidebar").classList.toggle("open");
//     }
  
//     window.showSection = function (sectionId) {
//       const sections = document.querySelectorAll("section");
//       sections.forEach(sec => sec.style.display = 'none');
//       const active = document.getElementById(sectionId);
//       if (active) active.style.display = 'block';
//       else console.error(`Section with ID "${sectionId}" not found.`);
  
//       // If switching back to Manage Users, reload the user list
//       if (sectionId === 'user-management') loadUsers();
//     };
  
//     document.querySelectorAll('.sidebar ul li').forEach(item => {
//       item.addEventListener('click', () => {
//         const target = item.getAttribute('onclick')
//           .match(/'([^']+)'/)[1];
//         showSection(target);
//       });
//     });
  
//     // ==================== Manage Workouts ====================
//     const addWorkoutButton = document.getElementById("addWorkout");
//     const workoutContainer = document.querySelector("#workout-management .row");
//     if (addWorkoutButton && workoutContainer) {
//       addWorkoutButton.addEventListener("click", () => {
//         const input = prompt("Enter Workout Title and Details (comma-separated):");
//         if (!input) return alert("Input required");
//         const [title, details] = input.split(',').map(s => s.trim());
//         if (!title || !details) return alert("Both required");
//         const card = document.createElement('div');
//         card.className = 'card';
//         card.innerHTML = `<div class="card-content"><h4>${title}</h4><p>${details}</p><button class="delete-workout">Delete</button></div>`;
//         workoutContainer.appendChild(card);
//       });
//       workoutContainer.addEventListener('click', e => {
//         if (e.target.classList.contains('delete-workout')) e.target.closest('.card').remove();
//       });
//     }
  
//     // ==================== Manage Nutrition Plans ====================
//     const addNutritionButton = document.getElementById("addNutrition");
//     const nutritionContainer = document.getElementById("nutrition-container");
//     if (addNutritionButton && nutritionContainer) {
//       addNutritionButton.addEventListener("click", () => {
//         const input = prompt("Enter Nutrition Title and Image URL (comma-separated):");
//         if (!input) return alert("Input required");
//         const [title, url] = input.split(',').map(s => s.trim());
//         if (!title || !url) return alert("Both required");
//         const card = document.createElement('div');
//         card.className = 'nutrition-card';
//         card.innerHTML = `<img src="${url}" alt=""><div class="nutrition-card-content"><h4>${title}</h4><button class="delete-nutrition">Delete</button></div>`;
//         nutritionContainer.appendChild(card);
//       });
//       nutritionContainer.addEventListener('click', e => {
//         if (e.target.classList.contains('delete-nutrition')) e.target.closest('.nutrition-card').remove();
//       });
//     }
  
//     // ==================== Manage Blogs ====================
//     const addBlogButton = document.getElementById("addBlog");
//     const blogContainer = document.querySelector("#blog-management .row");
//     if (addBlogButton && blogContainer) {
//       addBlogButton.addEventListener("click", () => {
//         const input = prompt("Enter Blog Title and Image URL (comma-separated):");
//         if (!input) return alert("Input required");
//         const [title, url] = input.split(',').map(s => s.trim());
//         if (!title || !url) return alert("Both required");
//         const card = document.createElement('div');
//         card.className = 'card';
//         card.innerHTML = `<img src="${url}" alt=""><div class="card-content"><h4>${title}</h4><button class="delete-blog">Delete</button></div>`;
//         blogContainer.appendChild(card);
//       });
//       blogContainer.addEventListener('click', e => {
//         if (e.target.classList.contains('delete-blog')) e.target.closest('.card').remove();
//       });
//     }
//   });
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Admin Dashboard Script Loaded!");
  
    // —— Load Users into the Table —— //
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
                <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
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
  
    // Initial load
    loadUsers();
  
    // —— Delete User Handler —— //
    document.getElementById('userTableBody').addEventListener('click', (e) => {
      if (e.target.closest('.delete-btn')) {
        const tr     = e.target.closest('tr');
        const userId = tr.getAttribute('data-user-id');
        if (!confirm('Are you sure you want to delete this user?')) return;
  
        fetch(`/users/${userId}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert('User deleted.');
              tr.remove();
            } else {
              alert(data.message);
            }
          })
          .catch(err => {
            console.error('Error deleting user:', err);
            alert('Deletion failed. See console.');
          });
      }
    });
  
    // —— Sidebar & Section Navigation —— //
    window.showSection = (sectionId) => {
      document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
      const active = document.getElementById(sectionId);
      if (active) active.style.display = 'block';
      else console.error(`Section "${sectionId}" not found`);
  
      // If returning to Users, reload list
      if (sectionId === 'user-management') loadUsers();
    };
  
    document.querySelectorAll('.sidebar ul li').forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('onclick').match(/'([^']+)'/)[1];
        showSection(target);
      });
    });
  
    // —— (Optional) Manage Workouts, Nutrition, Blogs —— //
    // You can keep your existing code for add/delete there,
    // or integrate it here following the same pattern.
  });
  