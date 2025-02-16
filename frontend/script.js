// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Text Animation
const texts = [
  "To personalized learning!",
  "To innovative education!",
  "To a smarter future!",
  "To interactive lessons!",
];

let index = 0;
const textElement = document.getElementById("changing-text");

function changeText() {
  textElement.classList.remove("fade-in");
  textElement.classList.add("fade-out");

  setTimeout(() => {
    index = (index + 1) % texts.length;
    textElement.textContent = texts[index];

    textElement.classList.remove("fade-out");
    textElement.classList.add("fade-in");
  }, 1000);
}

setInterval(changeText, 3000);

// Calendar Initialization
document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");

  if (!calendarEl) {
    console.error("❌ Calendar container not found! Check your HTML.");
    return;
  }

  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: [
      {
        title: "Sample Event",
        start: new Date().toISOString().split("T")[0],
      },
    ],
  });

  calendar.render();
});
