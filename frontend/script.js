// Hamburger Menu Toggle (All Pages)
function setupHamburgerMenu(hamburgerId, menuId, openIconId, closeIconId) {
    const hamburger = document.getElementById(hamburgerId);
    const navLinks = document.getElementById(menuId);
    const menuIconOpen = document.getElementById(openIconId);
    const menuIconClose = document.getElementById(closeIconId);

    if (hamburger && navLinks && menuIconOpen && menuIconClose) { // Check for null
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("hidden");
            menuIconOpen.classList.toggle("hidden");
            menuIconClose.classList.toggle("hidden");
        });
    } else {
        console.error(`One or more elements not found for hamburger menu: ${hamburgerId}`);
    }
}

// --- Responsive Navbar Adjustments (All Pages) ---
function adjustNavbar() {
    const logo = document.getElementById('logo-link');
    const searchContainer = document.getElementById('search-container');
    // Use a more robust way to find the *current* page's hamburger
    const hamburger = document.getElementById('hamburger-home') || document.getElementById('hamburger-tests') || document.getElementById('hamburger-classes') || document.getElementById('hamburger-player');

    if (window.innerWidth < 768) {
        // Hide logo and search bar
        logo.classList.add('hidden');
        searchContainer.classList.add('hidden');
        // Remove ml-auto to position hamburger on the left
        if (hamburger) { // Check if hamburger exists
            hamburger.classList.remove('ml-auto');
        }

    } else {
        // Show logo and search bar
        logo.classList.remove('hidden');
        searchContainer.classList.remove('hidden');
        // Reset hamburger position
        if (hamburger) { // Check if hamburger exists
            hamburger.classList.remove('ml-auto');
        }
    }
}

// --- DOMContentLoaded Event (Runs on all pages) ---
document.addEventListener('DOMContentLoaded', () => {
    // Set up hamburger menus (all pages) - Only if they exist on the page!
    if (document.getElementById("hamburger-home")) {
        setupHamburgerMenu("hamburger-home", "mobile-menu-home", "menu-icon-open-home", "menu-icon-close-home"); // main.html
    }
    if (document.getElementById("hamburger-tests")) {
        setupHamburgerMenu("hamburger-tests", "mobile-menu-tests", "menu-icon-open-tests", "menu-icon-close-tests"); // tests.html
    }
    if (document.getElementById("hamburger-classes")) {
        setupHamburgerMenu("hamburger-classes", "mobile-menu-classes", "menu-icon-open-classes", "menu-icon-close-classes"); // classes.html
    }
    if (document.getElementById("hamburger-player")) {
        setupHamburgerMenu("hamburger-player", "mobile-menu-player", "menu-icon-open-player", "menu-icon-close-player"); // classplayer.html
    }

    // --- Profile Picture Loading (All pages with navbar) ---
    const profilePicElement = document.getElementById('navbar-profile-pic');
    if (profilePicElement) { // Only run if the element exists
        const token = localStorage.getItem("authToken"); // Requires user login/authentication

        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.userId;

            fetch(`http://localhost:3001/api/profile/${userId}`, {  // Your API endpoint
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                return response.json();
            })
            .then(user => {
                profilePicElement.src = user.profilePic || 'https://via.placeholder.com/150'; // User's pic or placeholder
                profilePicElement.alt = `${user.username}'s Profile Picture`; // Accessibility
            })
            .catch(error => {
                console.error('Error fetching profile picture:', error);
                profilePicElement.src = 'https://via.placeholder.com/150'; // Fallback placeholder
            });
        }
    }

    // --- Tab Switching Logic (tests.html ONLY) ---
    const physicsTab = document.getElementById('physics-tab');
    const mathsTab = document.getElementById('maths-tab');
    const chemistryTab = document.getElementById('chemistry-tab');
    const physicsContent = document.getElementById('physics-content');
    const mathsContent = document.getElementById('maths-content');
    const chemistryContent = document.getElementById('chemistry-content');

    if (physicsTab && mathsTab && chemistryTab && physicsContent && mathsContent && chemistryContent) {
        physicsTab.addEventListener('click', () => {
            setActiveTab(physicsTab, physicsContent);
            setInactiveTab(mathsTab, mathsContent);
            setInactiveTab(chemistryTab, chemistryContent);
        });

        mathsTab.addEventListener('click', () => {
            setActiveTab(mathsTab, mathsContent);
            setInactiveTab(physicsTab, physicsContent);
            setInactiveTab(chemistryTab, chemistryContent);
        });

        chemistryTab.addEventListener('click', () => {
            setActiveTab(chemistryTab, chemistryContent);
            setInactiveTab(physicsTab, physicsContent);
            setInactiveTab(mathsTab, mathsContent);
        });

        function setActiveTab(tab, content) {
            tab.classList.add('active-tab');
            content.classList.remove('hidden');
        }

        function setInactiveTab(tab, content) {
            tab.classList.remove('active-tab');
            content.classList.add('hidden');
        }
    }

// --- classplayer.html specific logic ---
if (document.getElementById('video-player')) { // Check if we're on classplayer.html
    const videoPlayer = document.getElementById('video-player');
    const classTitle = document.getElementById('class-title');
    const lectureDescription = document.getElementById('lecture-description');

    // Get the subject from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');

    let videoId = '';
    let title = '';
    let description = '';

    // Set video ID, title, and description based on the subject
    switch (subject) {
        case 'maths_algebra':
            videoId = 'UCdxT4d8k5c'; // Algebra
            title = 'Math Class - Algebra Basics';
            description = 'This lecture covers the fundamentals of Algebra, including variables, equations, and expressions.';
            break;
        case 'maths_calculus':
            videoId = 'PvdZM_dodvU'; // Calculus
            title = 'Math Class - Calculus 1';
            description = 'This section will cover limits, derivatives, and basic integration techniques. Key concepts include the power rule, chain rule, product rule, and quotient rule for differentiation, and the power rule and basic u-substitution for integration.';
            break;
        case 'maths_geometry':
            videoId = '7v2vYv6Pl7g'; // Geometry
            title = 'Math Class - Geometry Basics';
            description = 'This section will cover fundamental geometric shapes (triangles, circles, quadrilaterals, etc.), area and perimeter calculations, the Pythagorean theorem, and basic trigonometry (sine, cosine, tangent).';
            break;
        case 'physics_kinematics':
            videoId = 'hY9zZrYuDVk'; // Kinematics
            title = 'Physics Class - Introduction to Kinematics';
            description = 'This lecture covers fundamental concepts of motion in one dimension, including: Displacement, Velocity, and Acceleration; Equations of Motion (SUVAT); Motion Graphs; Free Fall and Projectile Motion.';
            break;
        case 'physics_forces':
            videoId = 'aPwqkZCBouU'; // Forces
            title = 'Physics Class - Forces and Newtons Laws';
            description = 'This section will cover Newton\'s Three Laws of Motion, types of forces (friction, tension, normal force, gravity), free-body diagrams, and solving problems involving forces and motion.';
            break;
        case 'physics_energy':
            videoId = 'M6R4bWT-eOU'; // Energy
            title = 'Physics Class - Energy and Work';
            description = 'This section will cover different forms of energy (kinetic, potential, thermal), the work-energy theorem, conservation of energy, and power.';
            break;
        case 'chemistry_atomic':
            videoId = 'qx5iy82Im-k'; // Atomic Bonding
            title = 'Chemistry Class - Atomic Structure and Bonding';
            description = 'This lecture covers the fundamentals of atomic structure and chemical bonding, including: Structure of the Atom, Electron Configuration, Ionic and Covalent Bonding, Lewis Structures, and VSEPR Theory.';
            break;
        case 'chemistry_stoichiometry':
            videoId = 'rsFBARfoRtk'; // Stoichiometry
            title = 'Chemistry Class - Stoichiometry';
            description = "This section will cover mole calculations, balancing chemical equations, limiting reactants, and percent yield.";
            break;
        case 'chemistry_acids':
            videoId = 'IF7DGTWCK_c'; // Acids and Bases
            title = 'Chemistry Class - Acids and Bases';
            description = 'This section will cover the properties of acids and bases, pH calculations, titrations, and buffer solutions.';
            break;
        default:
            videoId = ''; // Or a default video
            title = 'No Class Selected';
            description = 'Please select a class from the Classes page.';
    }

    // Set the video source and text content *after* we have the videoId
    if (videoId) {
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`; // Autoplay
    }
    classTitle.textContent = title;
    lectureDescription.textContent = description;
}

    // Initial adjustment on load
    adjustNavbar();

    // Adjust on window resize
    window.addEventListener('resize', adjustNavbar);
});


// --- Changing Text (Hero Section - main.html ONLY) ---
// Only run this code if we're on a page with the 'changing-text' element
if (document.getElementById('changing-text')) { // Check if the element exists
    const changingText = document.getElementById('changing-text');
    const texts = ["To personalised learning!", "Let's get started.", "Explore your courses."];
    let textIndex = 0;

    setInterval(() => {
        changingText.classList.add('opacity-0'); // Fade out
        setTimeout(() => {
            textIndex = (textIndex + 1) % texts.length;
            changingText.textContent = texts[textIndex];
            changingText.classList.remove('opacity-0'); // Fade in
        }, 1000); // Match the CSS transition duration
    }, 4000); // Change text every 4 seconds
}


// --- Custom Calendar Logic (main.html ONLY) ---
// Only run this code if we're on a page with the 'calendar' element.
if (document.getElementById('calendar')) {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function generateCalendar(month, year) {
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.innerHTML = ''; // Clear previous content

        const today = new Date(); // Get today's date

        // Month and Year Header
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `
            <button class="prev-month-btn"><i class="fas fa-chevron-left"></i></button>
            <span>${monthNames[month]} ${year}</span>
            <button class="next-month-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        calendarDiv.appendChild(header);

        // Add event listeners for prev/next buttons
        header.querySelector('.prev-month-btn').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });

        header.querySelector('.next-month-btn').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });

        // Day Names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayNamesDiv = document.createElement('div');
        dayNamesDiv.className = 'calendar-day-names';
        dayNames.forEach(dayName => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.className = 'day-name';
            dayNameDiv.textContent = dayName;
            dayNamesDiv.appendChild(dayNameDiv);
        });
        calendarDiv.appendChild(dayNamesDiv);

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day'; // Keep the 'day' class for consistent styling
            calendarDiv.appendChild(emptyDay);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = i;

            // Highlight today's date
            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                dayDiv.classList.add('today');
            }
            calendarDiv.appendChild(dayDiv);
        }
    }
    // Initial calendar generation
    generateCalendar(currentMonth, currentYear);
}

// --- Form Toggle (index.html) ---
function toggleForm(formId) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (formId === 'login') {
        loginForm.style.display = 'flex'; // Or 'block', depending on your layout
        signupForm.style.display = 'none';
    } else if (formId === 'signup') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex'; // Or 'block'
    }
}

// --- Placeholder Login/Signup Functions (index.html) ---
// Replace these with your actual authentication logic!
function login(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    alert('Login functionality not yet implemented.');
    // Here you would typically:
    // 1. Get the username and password from the input fields.
    // 2. Send a request to your server to authenticate the user.
    // 3. Handle the server's response (success/failure).
    // 4. If successful, redirect to the main page (e.g., main.html).
    // 5. If unsuccessful, display an error message.
}

function signup(event) {
    event.preventDefault();
    alert('Signup functionality not yet implemented.');
    // Similar steps as login, but for creating a new user.
}