# Personalized Learning Platform - README

This project is a web-based personalized learning platform designed to provide users with access to educational resources, track their progress, and engage in interactive learning activities.

## Table of Contents

*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Project Structure](#project-structure)
*   [Setup and Installation](#setup-and-installation)
*   [Running the Application](#running-the-application)
*   [API Endpoints (Placeholder)](#api-endpoints-placeholder)
*   [Authentication](#authentication)
*   [Page Descriptions](#page-descriptions)
    *   [Main Page (main.html)](#main-page-mainhtml)
    *   [Tests Page (tests.html)](#tests-page-testshtml)
    *   [Classes Page (classes.html)](#classes-page-classeshtml)
    *   [Class Player Page (classplayer.html)](#class-player-page-classplayerhtml)
    *   [Assignments Page (assignments.html)](#assignments-page-assignmentshtml)
    *   [Profile Page (profile.html)](#profile-page-profilehtml)
    *   [Login/Signup Page (index.html)](#loginsignup-page-indexhtml)
*   [Styling (styles.css)](#styling-stylescss)
*   [JavaScript (script.js and index.js)](#javascript-scriptjs-and-indexjs)
*   [Future Enhancements](#future-enhancements)
*   [Contributing](#contributing)
*   [License](#license)

## Features

*   **User Authentication:**  Login and signup functionality (currently with placeholder alerts; requires backend integration).
*   **Responsive Design:**  The website is fully responsive and adapts to different screen sizes (desktops, tablets, and mobile phones).
*   **Dark Theme:**  A visually appealing dark theme is implemented throughout the website.
*   **Navigation:**  A consistent navigation bar allows users to easily access different sections of the platform.
*   **Homepage (main.html):**
    *   Displays a welcome message with animated text.
    *   Includes a custom-designed, interactive calendar.
    *   Shows a notification card for important updates.
*   **Tests Page (tests.html):**
    *   Provides access to subject-specific tests (Physics, Maths, Chemistry).
    *   Uses a tabbed interface to organize tests by subject.
    *   Displays test cards with descriptions and "Start" buttons.
*   **Classes Page (classes.html):**
    *   Presents a list of available classes, organized by subject.
    *   Each class is represented by a tile with a play button.
    *   Clicking a tile takes the user to the `classplayer.html` page, passing the subject as a query parameter.
*   **Class Player Page (classplayer.html):**
    *   Dynamically loads and plays YouTube videos based on the selected subject.
    *   Displays the lecture title and description.
    *   Includes a placeholder comments section.
*   **Assignments Page (assignments.html):**
    *   Lists available assignments with download links (placeholders).
    *   Includes "Upload" and "Take A Quiz" buttons (placeholders).
*   **Profile Page (profile.html):**
    *   Displays user profile information (username, bio, profile picture).
    *   Shows a progress bar.
    *   Lists achievements (placeholder data).
    *   Allows users to update their profile information (bio, profile picture URL).
    *   Allows users to set a daily learning goal.
    *   Includes a "Logout" button.
*   **Login/Signup Page (index.html):**
    * Provides separate forms for login and signup.
    * Uses a visually appealing dark theme design.
    * Includes basic form validation (checks for empty fields).
    * Placeholder functions for login and signup (requires backend integration).

## Technologies Used

*   **HTML5:**  For structuring the web pages.
*   **CSS3:**  For styling the website, including the dark theme and custom components.
*   **Tailwind CSS:**  A utility-first CSS framework for rapid UI development and responsive design.
*   **JavaScript:**  For dynamic behavior, including:
    *   Hamburger menu toggling.
    *   Tab switching (on the Tests page).
    *   Dynamic video loading (on the Class Player page).
    *   Form handling (on the Login/Signup page - currently placeholders).
    *   Fetching user data and updating the UI (profile picture, progress, etc.).
    *   Custom calendar generation.
*   **Font Awesome:** For icons (e.g., play button, hamburger menu).
*   **Google Fonts:**  For the Lexend and Rubik fonts.
*   **YouTube API:** (Implicitly used) for embedding videos.
*   **Fetch API:** For making asynchronous requests to the backend (e.g., for user authentication and profile data).
* **MathJax:** For rendering mathematical equations.

## Project Structure

The project consists of the following files:

*   **`index.html`:**  The login/signup page.
*   **`main.html`:**  The main homepage of the application.
*   **`tests.html`:**  The page for accessing tests.
*   **`classes.html`:** The page for accessing class videos.
*   **`classplayer.html`:** The page for playing individual class videos.
*   **`assignments.html`:** The page for accessing assignments.
*   **`profile.html`:**  The user profile page.
*   **`styles.css`:**  The main stylesheet containing global styles and CSS variables.
*   **`script.js`:**  The main JavaScript file containing shared functionality (navbar, hamburger menu, etc.).
*   **`index.js`:** JavaScript file specific to `index.html` (login/signup form handling).
*   **`profile.js`:** Contains functions to update profile.
*   **`images/`:**  A directory containing images used in the project (e.g., `logo2.png`, `logoMain.png`).  You should replace the placeholder images with your actual logo.

## Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the Project Directory:**
    ```bash
    cd <project-directory-name>
    ```

3.  **Install Dependencies (if any):**  This project primarily uses Tailwind CSS, which is included via a CDN link.  If you decide to use a local installation of Tailwind or add other dependencies (e.g., a JavaScript testing framework), you'll need to install them using npm or yarn:
    ```bash
    npm install  # Or: yarn install
    ```

4.  **Backend Setup:**  You'll need to set up your backend server (e.g., Node.js with Express) to handle user authentication, data storage, and API requests.  The provided code assumes a backend running on `http://localhost:3001`, but you'll need to adjust this to match your actual backend configuration.  The API endpoints are placeholders and need to be implemented.

5.  **Replace Placeholder Content:**
    *   Replace the placeholder images in the `images/` directory with your actual logo and any other images you need.
    *   Replace the placeholder text and descriptions in `tests.html`, `classes.html`, `assignments.html`, and `classplayer.html` with your actual content.
    *   Replace the placeholder video IDs in `classplayer.html` with the correct YouTube video IDs.
    *   Replace the placeholder achievements in `profile.html` with actual achievement data.
    *   Update the API endpoint URLs in `script.js` and `index.js` to point to your actual backend API.

## Running the Application

1.  **Start your backend server.**  The instructions for this will depend on your backend technology (Node.js, Python/Flask, etc.).
2.  **Open `index.html` in your web browser.**  You can do this directly by double-clicking the file, or by using a local development server (e.g., Live Server in VS Code, `python -m http.server`, etc.).

## API Endpoints (Placeholder)

The provided code includes placeholder API endpoints that you'll need to replace with your actual backend endpoints:

*   **Login:** `POST http://localhost:3001/api/login` (Expects `username` and `password` in the request body.  Returns a JWT on success.)
*   **Signup:** `POST http://localhost:3001/api/signup` (Expects `username`, `email`, and `password` in request body).
*   **Get User Profile:** `GET http://localhost:3001/api/profile/${userId}` (Requires a valid JWT in the `Authorization` header.  Returns user profile data.)
*   **Update User Profile:** `PUT http://localhost:3001/api/profile/${userId}` (Requires a valid JWT.  Expects `bio` and `profilePic` in the request body.)
*   **Update Daily Goal:** `PUT http://localhost:3001/api/profile/${userId}/goal` (Requires a valid JWT.  Expects `dailyGoal` in the request body.)

**Important:** These are just *placeholders*. You *must* implement the corresponding backend logic to handle these requests and interact with your database.

## Authentication

The code assumes a JSON Web Token (JWT) based authentication system.  The `login()` function (in `index.js`) expects the backend to return a JWT upon successful login.  This token is then stored in `localStorage` and included in the `Authorization` header of subsequent requests to protected API endpoints (like fetching the user profile).  You'll need to implement the JWT generation and verification logic on your backend.

## Page Descriptions

### Main Page (main.html)

*   **Purpose:** The landing page of the application. Provides a general overview and access to other sections.
*   **Key Features:**
    *   Animated welcome text.
    *   Custom-designed calendar (basic month/year navigation).
    *   Notification card (placeholder).

### Tests Page (tests.html)

*   **Purpose:** Allows users to access and take subject-specific tests.
*   **Key Features:**
    *   Tabbed interface (Physics, Maths, Chemistry).
    *   Test cards with descriptions and "Start" buttons (placeholders).
    *   Content within each card scrolls vertically if it overflows.

### Classes Page (classes.html)

*   **Purpose:** Provides access to video lectures for different subjects and topics.
*   **Key Features:**
    *   Tiles for each class, categorized by subject.
    *   Clicking a tile opens `classplayer.html` with the appropriate subject passed as a query parameter.

### Class Player Page (classplayer.html)

*   **Purpose:** Displays and plays a specific lecture video based on the selected subject.
*   **Key Features:**
    *   Dynamically loads the YouTube video based on the `subject` query parameter.
    *   Displays the lecture title and description.
    *   Includes a placeholder comments section.

### Assignments Page (assignments.html)

*   **Purpose:** Lists available assignments for users to download.
*   **Key Features:**
    *   Assignment tiles with descriptions and "Download" buttons (placeholders).
    *   "Upload" and "Take A Quiz" buttons (placeholders).

### Profile Page (profile.html)

*   **Purpose:** Displays and allows editing of user profile information.
*   **Key Features:**
    *   Displays user's profile picture, username, and bio.
    *   Shows a progress bar.
    *   Lists achievements (placeholder data).
    *   Provides forms to update the user's bio and profile picture URL.
    *   Allows users to set a daily learning goal.
    *   Includes a "Logout" button.

### Login/Signup Page (index.html)

*   **Purpose:** Handles user authentication (login and signup).
*   **Key Features:**
    *   Separate forms for login and signup.
    *   Toggles between the two forms.
    *   Placeholder functions for login and signup (requires backend integration).
    *   Uses the provided form template and styling.

## Styling (styles.css)

The `styles.css` file contains global styles and CSS variables for the entire website.  It defines the dark theme colors, fonts, and common styles for elements like buttons, input fields, and the navbar.  It also includes styles for:

*   **Moving Background:** The animated dot background.
*   **Custom Scrollbar:** Styles for the scrollbar to match the dark theme.
*   **Notification Card:** Styles for the notification card on `main.html`.
*   **Calendar:** Styles for the custom calendar on `main.html`.
* **Form Styles:** Styles for login and signup form.

Tailwind CSS classes are used extensively throughout the project for layout, spacing, and basic styling.  `styles.css` complements Tailwind by providing custom styles and overriding defaults where necessary.

## JavaScript (script.js and index.js)

*   **`script.js`:** This file contains shared JavaScript functionality used across multiple pages:
    *   `setupHamburgerMenu()`:  Handles the mobile menu toggle on all pages with a navbar.
    *   `adjustNavbar()`:  Handles responsive navbar adjustments (hiding/showing elements on different screen sizes).
    *   Profile picture loading: Fetches and displays the user's profile picture in the navbar.
    *   Changing text animation (for `main.html`).
    *   Custom calendar generation (for `main.html`).
    *   Tab switching logic (for `tests.html`).
    *   Video loading logic (for `classplayer.html`).

*   **`index.js`:** This file contains JavaScript code specific to the `index.html` page (login/signup):
    *   `toggleForm()`:  Switches between the login and signup forms.
    *   `login()`:  Placeholder function for handling login (needs backend integration).
    *   `signup()`: Placeholder function for handling signup (needs backend integration).

## Future Enhancements

*   **Backend Integration:**  Connect the frontend to a fully functional backend for user authentication, data persistence (user profiles, progress, assignments, test results, etc.), and dynamic content loading.
*   **Real-time Updates:** Implement real-time updates for notifications, progress tracking, and other dynamic elements using technologies like WebSockets.
*   **Interactive Tests:** Create interactive tests with multiple-choice questions, drag-and-drop activities, and immediate feedback.
*   **Assignment Uploads:** Implement functionality for users to upload their completed assignments.
*   **Class Management:** Add features for instructors to create and manage classes, upload videos and assignments, and track student progress.
*   **Comments System:** Develop a fully functional comments system for the class player page.
*   **Search Functionality:** Implement a robust search feature to allow users to easily find specific content.
*   **Accessibility:**  Improve accessibility by adding ARIA attributes, ensuring proper keyboard navigation, and providing alternative text for images.
*   **User Roles:** Implement different user roles (e.g., student, instructor, administrator) with varying levels of access and permissions.
* **Progress Tracking:** Implement detailed progress tracking for users, showing their completion status for different modules, tests, and assignments.
* **Personalized Recommendations:** Use user data to provide personalized recommendations for classes, tests, and assignments.

## Contributing

Contributions to this project are welcome!  If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details. (You should create a LICENSE file and choose an appropriate license.)