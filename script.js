// App State
let currentPage = "home";
let selectedMovie = null;
let selectedSeats = [];
let comboQuantity = 1;

// Movie List
const movies = [
  { id: 1, title: "Epic Adventure", image: "https://placehold.co/300x450?text=Epic+Adventure " },
  { id: 2, title: "Space Warriors", image: "https://placehold.co/300x450?text=Space+Warriors " },
  { id: 3, title: "Mystery of Shadows", image: "https://placehold.co/300x450?text=Mystery+of+Shadows " },
  { id: 4, title: "Ocean's Fury", image: "https://placehold.co/300x450?text=Oceans+Fury " },
  { id: 5, title: "City Lights", image: "https://placehold.co/300x450?text=City+Lights " },
  { id: 6, title: "Desert Storm", image: "https://placehold.co/300x450?text=Desert+Storm " },
  { id: 7, title: "The Last Hero", image: "https://placehold.co/300x450?text=The+Last+Hero " },
  { id: 8, title: "Zombie Attack", image: "https://placehold.co/300x450?text=Zombie+Attack " },
  { id: 9, title: "Sky High", image: "https://placehold.co/300x450?text=Sky+High " },
  { id: 10, title: "Midnight Escape", image: "https://placehold.co/300x450?text=Midnight+Escape " },
];

// Popcorn Combos
const combos = [
  { name: "Small Popcorn Combo", price: 6.99 },
  { name: "Medium Popcorn Combo", price: 9.99 },
  { name: "Large Popcorn Combo", price: 12.99 },
];

// Render App UI
function renderApp() {
  const app = document.getElementById("app");

  if (currentPage === "home") {
    app.innerHTML = `
      <section class="container">
        <h2 class="text-3xl font-bold mb-6 text-accent">Now Showing</h2>
        <div class="carousel">
          <div class="carousel-track" id="carouselTrack">
            ${movies.map(m => `
              <div class="carousel-item" onclick="goToBooking(${m.id})">
                <img src="${m.image}" alt="${m.title}">
                <h3>${m.title}</h3>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="container">
        <h2 class="text-3xl font-bold mb-6 text-accent">Available Movies</h2>
        <div class="movie-grid">
          ${movies.map(m => `
            <div class="card" onclick="goToBooking(${m.id})">
              <img src="${m.image}" alt="${m.title}">
              <h3>${m.title}</h3>
            </div>
          `).join("")}
        </div>
      </section>
    `;
    startCarousel();
  }

  else if (currentPage === "booking") {
    app.innerHTML = `
      <section class="container">
        <button class="btn-primary mb-4" onclick="goToHome()">← Back to Home</button>
        <h2 class="text-3xl font-bold mb-6 text-accent">Book "${selectedMovie.title}"</h2>

        <div class="grid gap-8 md:grid-cols-2">
          <!-- Movie Info -->
          <div class="card">
            <img src="${selectedMovie.image}" alt="${selectedMovie.title}" class="w-full h-96 object-cover rounded-md mb-4">
            <h3 class="text-xl font-bold">${selectedMovie.title}</h3>
            <p class="mt-2">Showtime: 7:30 PM</p>
          </div>

          <!-- Booking Form -->
          <div>
            <!-- Seat Selection -->
            <div class="card p-4 mb-6">
              <h4 class="text-lg font-semibold mb-2">Select Your Seats</h4>
              <div class="text-center text-gray-400 font-semibold mb-2">Screen</div>
              <div class="grid grid-cols-10 gap-2 justify-center mx-auto w-fit mb-4">
                ${Array.from({ length: 50 }, (_, i) => {
                  const seatNum = i + 1;
                  return `
                    <button 
                      class="seat${selectedSeats.includes(seatNum) ? ' selected' : ''}" 
                      onclick="toggleSeat(${seatNum})"
                    >
                      ${seatNum}
                    </button>
                  `;
                }).join('')}
              </div>
              <p class="text-sm text-gray-400 text-center">Click seats to select/deselect</p>
            </div>

            <!-- Popcorn Combos -->
            <div class="card p-4 mb-6">
              <h4 class="text-lg font-semibold mb-2">Popcorn Combos</h4>
              <div class="space-y-2">
                ${combos.map((combo, idx) => `
                  <div class="flex justify-between items-center">
                    <span>${combo.name}</span>
                    <div class="flex items-center gap-2">
                      <button onclick="changeComboQty(-1)" class="btn-secondary px-2">−</button>
                      <span>${comboQuantity}</span>
                      <button onclick="changeComboQty(1)" class="btn-secondary px-2">+</button>
                      <span class="font-medium">$${(combo.price * comboQuantity).toFixed(2)}</span>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Summary Button -->
            <button onclick="goToSummary()" class="btn-primary w-full py-3" ${selectedSeats.length === 0 ? "disabled" : ""}>
              Proceed to Summary
            </button>
          </div>
        </div>
      </section>
    `;
  }

  else if (currentPage === "summary") {
    const totalSeats = selectedSeats.length;
    const popcornTotal = combos.reduce((sum, c) => sum + c.price * comboQuantity, 0);
    const totalPrice = totalSeats * 12 + popcornTotal;

    app.innerHTML = `
      <section class="container">
        <button class="btn-primary mb-4" onclick="goBackSummary()">← Back to Booking</button>
        <div class="card p-6 max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-accent text-center">Booking Summary</h2>

          <div class="space-y-4 mb-6">
            <div>
              <h3 class="text-xl font-semibold">${selectedMovie.title}</h3>
              <p class="text-gray-400">Showtime: 7:30 PM</p>
            </div>

            <div class="border-t border-gray-700 pt-4">
              <h4 class="font-medium mb-2">Selected Seats:</h4>
              <div class="flex flex-wrap gap-2">
                ${selectedSeats.map(s => `<span class="px-3 py-1 bg-accent text-main-color rounded-full text-sm">Seat ${s}</span>`).join("")}
              </div>
              <p class="text-sm text-gray-400 mt-1">Price per seat: $12</p>
            </div>

            <div class="border-t border-gray-700 pt-4">
              <h4 class="font-medium mb-2">Popcorn Combos:</h4>
              <div>
                <p class="text-sm">${comboQuantity} x Large Popcorn Combo</p>
                <p class="text-sm text-gray-400">Total: $${popcornTotal.toFixed(2)}</p>
              </div>
            </div>

            <div class="border-t border-gray-700 pt-4">
              <h4 class="font-medium mb-2">Total Amount:</h4>
              <p class="text-2xl font-bold text-accent">$${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <button onclick="goToTicket()" class="btn-primary w-full py-3">Confirm Booking</button>
        </div>
      </section>
    `;
  }

  else if (currentPage === "ticket") {
    const ticketId = Math.floor(100000 + Math.random() * 900000);

    app.innerHTML = `
      <section class="container">
        <button class="btn-primary mb-4" onclick="goBackHome()">← Back to Home</button>
        <div class="card p-6 max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6 text-accent">CinemaMax Ticket</h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-16 h-16 mx-auto mb-4 text-accent">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <h3 class="text-2xl font-bold">${selectedMovie.title}</h3>
          <p class="text-gray-400 mt-1">Showtime: 7:30 PM</p>

          <div class="mt-6 space-y-3 text-left">
            <p><strong>Seats:</strong> ${selectedSeats.join(", ") || "No seats selected"}</p>
            <p><strong>Combos:</strong> ${comboQuantity} x Large Popcorn Combo</p>
            <p><strong>Date:</strong> Today, ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="mt-6 text-center text-sm text-gray-400">
            Please arrive at least 15 minutes before showtime.
          </div>

          <button onclick="goBackHome()" class="btn-primary w-full py-3 mt-6">Back to Home</button>
        </div>
      </section>
    `;
  }
}

// Navigation Functions
function goToBooking(movieId) {
  selectedMovie = movies.find(m => m.id === movieId);
  currentPage = "booking";
  renderApp();
}

function goToHome() {
  currentPage = "home";
  selectedMovie = null;
  selectedSeats = [];
  comboQuantity = 1;
  renderApp();
}

function toggleSeat(seat) {
  const index = selectedSeats.indexOf(seat);
  if (index > -1) {
    selectedSeats.splice(index, 1);
  } else {
    selectedSeats.push(seat);
  }
  renderApp();
}

function changeComboQty(change) {
  comboQuantity = Math.max(1, comboQuantity + change);
  renderApp();
}

function goToSummary() {
  currentPage = "summary";
  renderApp();
}

function goBackSummary() {
  currentPage = "booking";
  renderApp();
}

function goToTicket() {
  currentPage = "ticket";
  renderApp();
}

// Carousel Animation
function startCarousel() {
  const track = document.getElementById("carouselTrack");
  let index = 0;
  setInterval(() => {
    index++;
    if (index * 310 > movies.length * 310) index = 0;
    track.style.transform = `translateX(-${index * 310}px)`;
  }, 3000);
}

// Sidebar Toggle
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Make functions globally accessible in HTML
window.goToBooking = goToBooking;
window.goToHome = goToHome;
window.toggleSeat = toggleSeat;
window.changeComboQty = changeComboQty;
window.goToSummary = goToSummary;
window.goBackSummary = goBackSummary;
window.goToTicket = goToTicket;

// Start App
renderApp();
startCarousel();