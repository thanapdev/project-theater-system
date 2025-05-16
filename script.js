const movies = [
  {
    id: 1,
    title: "Epic Adventure",
    type: "now",
    image: "https://placehold.co/300x450?text=Epic+Adventure ",
    description:
      "Join the hero on an epic journey through mystical lands to save the kingdom.",
    showtimes: ["10:00 AM", "1:00 PM", "4:30 PM", "7:30 PM", "10:00 PM"],
  },
  {
    id: 2,
    title: "Space Warriors",
    type: "now",
    image: "https://placehold.co/300x450?text=Space+Warriors ",
    description:
      "A thrilling sci-fi saga about warriors fighting in distant galaxies.",
    showtimes: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM", "10:30 PM"],
  },
  {
    id: 3,
    title: "Mystery of Shadows",
    type: "soon",
    image: "https://placehold.co/300x450?text=Mystery+of+Shadows ",
    description:
      "A detective uncovers a dark conspiracy in this gripping film.",
  },
  {
    id: 4,
    title: "Ocean's Fury",
    type: "soon",
    image: "https://placehold.co/300x450?text=Oceans+Fury ",
    description:
      "An underwater adventure where nature fights back.",
  },
];

const combos = [
  { name: "Small Popcorn Combo", price: 6.99 },
  { name: "Medium Popcorn Combo", price: 9.99 },
  { name: "Large Popcorn Combo", price: 12.99 },
];

let currentPage = "home";
let selectedMovie = null;
let selectedSeats = [];
let comboQuantity = 1;

function renderApp() {
  const app = document.getElementById("app");
  switch (currentPage) {
    case "home":
      app.innerHTML = renderHome();
      break;
    case "booking":
      app.innerHTML = renderBooking();
      break;
    case "summary":
      app.innerHTML = renderSummary();
      break;
    case "ticket":
      app.innerHTML = renderTicket();
      break;
  }
}

function renderHome() {
  return `
    <div class="container fade-in">
      <header class="text-center mb-10">
        <h1 class="text-4xl text-yellow">CinemaMax</h1>
        <p class="text-lg text-gray-300">Experience the magic of movies</p>
      </header>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-yellow">Now Showing</h2>
        <div class="movie-grid">
          ${movies
            .filter((m) => m.type === "now")
            .map(
              (m) => `
              <div class="card" onclick="selectMovie(${m.id})">
                <img src="${m.image}" alt="${m.title}">
                <div class="mt-2">
                  <h3>${m.title}</h3>
                  <p class="text-sm text-gray-400 mt-1">${m.description}</p>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 text-yellow">Coming Soon</h2>
        <div class="movie-grid">
          ${movies
            .filter((m) => m.type === "soon")
            .map(
              (m) => `
              <div class="card opacity-70">
                <img src="${m.image}" alt="${m.title}">
                <div class="mt-2">
                  <h3>${m.title}</h3>
                  <p class="text-sm text-gray-400 mt-1">${m.description}</p>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderBooking() {
  if (!selectedMovie) return "";
  return `
    <div class="container fade-in">
      <button class="back-button" onclick="goBack()">← Back to Movies</button>
      <h2 class="text-3xl font-bold mb-6 text-yellow">Book Tickets for "${selectedMovie.title}"</h2>
      
      <div class="grid">
        <!-- Movie Info -->
        <div class="card mb-6">
          <img src="${selectedMovie.image}" alt="${selectedMovie.title}" class="w-full h-64 object-cover rounded-md mb-4">
          <h3 class="text-xl font-bold">${selectedMovie.title}</h3>
          <p class="text-gray-300 mt-2">${selectedMovie.description}</p>
          <h4 class="text-lg font-semibold mt-4">Showtimes</h4>
          <div class="flex flex-wrap gap-2 mt-2">
            ${selectedMovie.showtimes.map(t => `<button class="btn-primary">${t}</button>`).join("")}
          </div>
        </div>

        <!-- Seat Selection -->
        <div class="card">
          <h4 class="text-lg font-semibold mb-4">Select Your Seats</h4>
          <div class="grid grid-cols-10 gap-2 w-fit mx-auto mb-4">
            ${Array.from({ length: 50 }, (_, i) => {
              const seatNum = i + 1;
              return `<button class="seat${selectedSeats.includes(seatNum) ? " selected" : ""}" onclick="toggleSeat(${seatNum})">${seatNum}</button>`;
            }).join("")}
          </div>
          <p class="text-sm text-gray-400 text-center">Click seats to select/deselect</p>
        </div>

        <!-- Popcorn Combos -->
        <div class="card mt-6">
          <h4 class="text-lg font-semibold mb-2">Popcorn Combos</h4>
          <div class="space-y-2">
            ${combos.map((combo, idx) => `
              <div class="flex justify-between items-center">
                <span>${combo.name}</span>
                <div class="flex items-center gap-2">
                  <button onclick="changeComboQty(-1)" class="btn-secondary px-2">-</button>
                  <span>${comboQuantity}</span>
                  <button onclick="changeComboQty(1)" class="btn-secondary px-2">+</button>
                  <span class="font-medium">$${(combo.price * comboQuantity).toFixed(2)}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <button onclick="goToSummary()" class="btn-primary w-full py-3 mt-6" ${selectedSeats.length === 0 ? "disabled" : ""}>
          Proceed to Summary
        </button>
      </div>
    </div>
  `;
}

function renderSummary() {
  const totalSeats = selectedSeats.length;
  const popcornTotal = combos.reduce((sum, c) => sum + c.price * comboQuantity, 0);
  const totalPrice = totalSeats * 12 + popcornTotal;

  return `
    <div class="container fade-in">
      <button class="back-button" onclick="goBackSummary()">← Back to Booking</button>
      <div class="card p-6 mx-auto max-w-3xl">
        <h2 class="text-3xl font-bold mb-6 text-yellow text-center">Booking Summary</h2>

        <div class="space-y-4 mb-6">
          <div>
            <h3 class="text-xl font-semibold">${selectedMovie.title}</h3>
            <p class="text-gray-400">Showtime: 7:30 PM</p>
          </div>

          <div class="border-t border-gray-700 pt-4">
            <h4 class="font-medium mb-2">Selected Seats:</h4>
            <div class="flex flex-wrap gap-2">
              ${selectedSeats.map(s => `<span class="px-3 py-1 bg-yellow text-black rounded-full text-sm">Seat ${s}</span>`).join("")}
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
            <p class="text-2xl font-bold text-yellow">$${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <button onclick="goToTicket()" class="btn-primary w-full py-3 mt-6">Confirm Booking</button>
      </div>
    </div>
  `;
}

function renderTicket() {
  const ticketId = Math.floor(100000 + Math.random() * 900000);

  return `
    <div class="container fade-in">
      <div class="ticket mx-auto">
        <div style="position: absolute; top: 1rem; right: 1rem; font-size: 0.75rem; color: #6b7280;">Ticket ID: ${ticketId}</div>
        <h2 class="text-3xl font-bold mb-6 text-yellow text-center">CinemaMax Ticket</h2>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>

        <p class="text-xl font-semibold">${selectedMovie.title}</p>
        <p class="text-gray-400 mt-1">Showtime: 7:30 PM</p>

        <div class="space-y-4 mb-6 mt-4">
          <div class="summary-item">
            <span>Seats:</span>
            <span>${selectedSeats.join(", ") || "No seats selected"}</span>
          </div>
          <div class="summary-item">
            <span>Popcorn Combos:</span>
            <span>${comboQuantity} x Large Popcorn Combo</span>
          </div>
          <div class="summary-item">
            <span>Date:</span>
            <span>Today, ${new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div class="border-t border-gray-700 pt-4 text-center">
          <p class="text-sm text-gray-400">Please arrive at least 15 minutes before showtime.</p>
          <p class="text-sm text-gray-400 mt-1">Enjoy your movie experience!</p>
        </div>

        <button onclick="goBackHome()" class="btn-primary w-full py-2 mt-6">Back to Home</button>
      </div>
    </div>
  `;
}

// Event handlers
window.selectMovie = function(id) {
  selectedMovie = movies.find(m => m.id === id);
  currentPage = "booking";
  renderApp();
};

window.goBack = function() {
  currentPage = "home";
  renderApp();
};

window.toggleSeat = function(seat) {
  const index = selectedSeats.indexOf(seat);
  if (index > -1) {
    selectedSeats.splice(index, 1);
  } else {
    selectedSeats.push(seat);
  }
  renderApp();
};

window.changeComboQty = function(change) {
  comboQuantity = Math.max(0, comboQuantity + change);
  renderApp();
};

window.goToSummary = function() {
  currentPage = "summary";
  renderApp();
};

window.goBackSummary = function() {
  currentPage = "booking";
  renderApp();
};

window.goToTicket = function() {
  currentPage = "ticket";
  renderApp();
};

window.goBackHome = function() {
  currentPage = "home";
  selectedMovie = null;
  selectedSeats = [];
  comboQuantity = 1;
  renderApp();
};

renderApp();