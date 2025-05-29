# CinemaMax - Movie Booking System

CinemaMax is a simple, modern web application for booking movie tickets online. The project demonstrates a single-page application (SPA) approach using only HTML, CSS, and vanilla JavaScript—no frameworks required.

---

## Features

- **Now Showing & Coming Soon:**  
  Browse movies that are currently showing or coming soon, complete with posters and titles.

- **Movie Booking:**  
  Select a movie, choose your seats, and pick popcorn combos with customizable options.

- **Booking Summary:**  
  Review your selected seats and combos before confirming your booking.

- **Digital Ticket:**  
  Instantly receive a digital ticket after booking, including all your selections.

- **Sidebar Navigation:**  
  Responsive sidebar for easy navigation between Home, Now Showing, Coming Soon, Bookings, Contact, and About Me.

- **About Me:**  
  Learn about the developer, with a profile picture, bio, and GitHub link.

---

## How It Works

1. **Home / Now Showing:**  
   The homepage displays a carousel and grid of movies that are currently showing. Click any movie to start booking.

2. **Booking:**  
   - Select your seats (multiple selection supported).
   - Choose popcorn combos, flavors, drink sizes, and quantities.
   - Your selections and total price are summarized in real time.

3. **Summary:**  
   Review all your choices. Confirm to receive your digital ticket.

4. **Ticket:**  
   View your ticket details, including movie, seats, combos, and showtime.

5. **Navigation:**  
   Use the sidebar to switch between pages. The About Me page introduces the developer.

---

## Tech Stack

- **HTML5**  
- **CSS3** (custom, responsive design)
- **Vanilla JavaScript** (all logic and rendering)

No frameworks, build tools, or backend required.

---

## Project Structure

```
project-theater-system/
│
├── index.html         # Home page (Now Showing)
├── nowShowing.html    # Now Showing movies
├── comingSoon.html    # Coming Soon movies
├── aboutMe.html       # About the developer
├── styles.css         # Main stylesheet
├── script.js          # All app logic and rendering
└── README.md          # Project documentation
```

---

## How to Run

1. **Download or Clone** this repository.
2. Open `index.html` (or any HTML file) in your web browser.
3. Use the sidebar to navigate and try booking a movie.

> **Note:**  
> All content is rendered client-side. No backend/server is required.

---

## Customization

- **Add/Edit Movies:**  
  Update the `movies` array in `script.js` to change the movie list.

- **Edit Combos:**  
  Update the `combos` array in `script.js` to change popcorn combo options.

- **About Me:**  
  Edit the `aboutMe` section in `script.js` (look for `currentPage === "aboutMe"`) to update your profile info.

---

## Developer

- **GitHub:** [thanapdev](https://github.com/thanapdev)

---

Enjoy booking your movies with **CinemaMax**!