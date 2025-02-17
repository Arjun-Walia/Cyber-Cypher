document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
      alert("Please log in first!");
      window.location.href = "index.html";
      return;
  }

  try {
      // Decode the token to get the userId
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId;

      // Fetch the user profile
      const response = await fetch(`http://localhost:3001/api/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
          throw new Error("Failed to fetch user profile");
      }

      const user = await response.json();

      // Update the UI with user data
      document.getElementById("username").innerText = user.username;
      document.getElementById("bio").innerText = user.bio || "Learning Enthusiast";
      document.getElementById("profile-pic").src = user.profilePic || "https://via.placeholder.com/150";
      document.getElementById("progress-fill").style.width = user.progress + "%";
      document.getElementById("progress-text").innerText = `${user.progress}% completed`;

      const achievementsContainer = document.getElementById("achievements-container");
      achievementsContainer.innerHTML = user.achievements.length
          ? user.achievements.map(ach => `<div class="achievement-card"><p>${ach}</p></div>`).join("")
          : "<p>No achievements yet</p>";

      document.getElementById("daily-goal").value = user.dailyGoal || "";
  } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to load profile. Please try again.");
  }
});

// Function to update profile
async function updateProfile() {
  const token = localStorage.getItem("authToken");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.userId;

  const bio = document.getElementById("update-bio").value;
  const profilePic = document.getElementById("update-profile-pic").value;

  try {
      const response = await fetch(`http://localhost:3001/api/profile/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ bio, profilePic }),
      });

      if (!response.ok) {
          throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
      window.location.reload(); // Refresh the page to show updated data
  } catch (error) {
      console.error("Update Profile Error:", error);
      alert("Failed to update profile. Please try again.");
  }
}

// Function to update daily goal
async function updateDailyGoal() {
  const token = localStorage.getItem("authToken");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.userId;

  const dailyGoal = document.getElementById("daily-goal").value;

  try {
      const response = await fetch(`http://localhost:3001/api/profile/${userId}/goal`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ dailyGoal }),
      });

      if (!response.ok) {
          throw new Error("Failed to update daily goal");
      }

      alert("Daily goal updated successfully!");
  } catch (error) {
      console.error("Update Daily Goal Error:", error);
      alert("Failed to update daily goal. Please try again.");
  }
}

// Function to logout
function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "index.html";
}