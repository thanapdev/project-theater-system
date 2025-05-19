// App State
let currentPage = "home";
let selectedMovie = null;
let selectedSeats = [];
let comboDetails = []; // Will store selected combo details including options

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
  {
    name: "Small Popcorn Combo",
    basePrice: 6.99,
    options: {
      flavors: ["Butter", "Cheese", "Caramel"],
      drinks: ["Small", "Medium", "Large"]
    }
  },
  {
    name: "Medium Popcorn Combo",
    basePrice: 9.99,
    options: {
      flavors: ["Butter", "Cheese", "Caramel"],
      drinks: ["Medium", "Large"]
    }
  },
  {
    name: "Large Popcorn Combo",
    basePrice: 12.99,
    options: {
      flavors: ["Butter", "Cheese", "Caramel"],
      drinks: ["Large"]
    }
  }
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
      <div class="container">
        <!-- Movie Info -->
        <div class="movie-info card mb-6">
          <img src="${selectedMovie.image}" alt="${selectedMovie.title}" class="w-full h-96 object-cover rounded-md mb-4">
          <h3 class="text-xl font-bold">${selectedMovie.title}</h3>
          <p class="showtime-text">Showtime: 7:30 PM</p>
        </div>

        <!-- Booking Form -->
        <div class="booking-form card mb-6">
          <!-- Seat Selection -->
          <div class="card p-4 mb-6">
            <h4 class="text-lg font-semibold mb-2">Select Your Seats</h4>
            <div class="showtime-text text-center text-gray-400 font-semibold mb-2">Screen</div><br>
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
            <p class="showtime-text text-sm text-gray-400 text-center">Click seats to select/deselect</p>
          </div>

        <!-- Popcorn Combos -->
<div class="card p-4 mb-6">
  <h4 class="text-lg font-semibold mb-2">Popcorn Combos</h4>

  <!-- Grid Layout -->
  <div class="grid md:grid-cols-2 gap-6">
    <!-- Left Side - Combo Selection -->
    <div>
      ${combos.map((combo, idx) => {
        const detail = comboDetails.find(c => c.index === idx);
        const isVisible = detail ? 'open' : '';
        const isChecked = detail ? 'checked' : '';
        const flavor = detail?.flavor || combo.options.flavors[0];
        const drink = detail?.drink || combo.options.drinks[0];
        const quantity = detail?.quantity || 1;

        return `
          <div class="border-b border-gray-700 pb-4">
            <!-- Checkbox -->
            <label class="flex items-center gap-2 mb-2 cursor-pointer">
              <input type="checkbox" id="combo-${idx}" onclick="toggleCombo(${idx})" ${isChecked}>
              <span class="font-medium">${combo.name}</span>
              <span class="ml-auto text-accent">$${combo.basePrice.toFixed(2)}</span>
            </label>

            <!-- Options -->
            <div id="combo-options-${idx}" class="collapsible ${isVisible} mt-3 ml-6 space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="w-full sm:w-24">Flavor:</label>
                <select id="flavor-${idx}" onchange="updateComboOption(${idx})" class="bg-secondary-1 text-main-color rounded px-3 py-1 w-full sm:w-auto">
                  ${combo.options.flavors.map(f => `<option value="${f}" ${f === flavor ? 'selected' : ''}>${f}</option>`).join("")}
                </select>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="w-full sm:w-24">Drink Size:</label>
                <select id="drink-${idx}" onchange="updateComboOption(${idx})" class="bg-secondary-1 text-main-color rounded px-3 py-1 w-full sm:w-auto">
                  ${combo.options.drinks.map(d => `<option value="${d}" ${d === drink ? 'selected' : ''}>${d}</option>`).join("")}
                </select>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="w-full sm:w-24">Quantity:</label>
                <div class="flex items-center justify-between sm:justify-start w-full max-w-xs">
                  <button onclick="changeComboQuantity(${idx}, -1)" class="btn-secondary px-2 mr-2">−</button>
                  <input type="number" min="1" value="${quantity}" id="quantity-${idx}" onchange="updateComboOption(${idx})" class="w-16 bg-secondary-1 text-main-color rounded px-2 py-1 text-center">
                  <button onclick="changeComboQuantity(${idx}, 1)" class="btn-secondary px-2 ml-2">+</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <!-- Right Side - Summary of Selected Combos -->
    <div class="p-4 bg-secondary-1 rounded-md h-fit sticky top-24">
      <h5 class="font-bold mb-4">Your Selections</h5>
      <div class="space-y-2 mb-4">
        ${comboDetails.length > 0 
          ? comboDetails.map(c => `
              <div class="flex justify-between">
                <span>${c.quantity} x ${c.name}</span>
                <span>$${(c.basePrice * c.quantity).toFixed(2)}</span>
              </div>
            `).join("")
          : '<p class="text-sm text-gray-400">No combos selected</p>'
        }
      </div>
      <div class="border-t border-gray-600 pt-3 mt-3">
        <div class="flex justify-between font-bold">
          <span>Total:</span>
          <span>$${comboDetails.reduce((sum, c) => sum + c.basePrice * c.quantity, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
</div>

          <!-- Summary Button -->
          <button onclick="goToSummary()" class="btn-primary w-full py-3" ${selectedSeats.length === 0 || comboDetails.length === 0 ? "disabled" : ""}>
            Proceed to Summary
          </button>
        </div>
      </div>
    `;
  }

  else if (currentPage === "summary") {
    const totalSeats = selectedSeats.length;
    const popcornTotal = comboDetails.reduce((sum, c) => sum + c.basePrice * c.quantity, 0);
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
              <div class="space-y-2">
                ${comboDetails.length > 0 
                  ? comboDetails.map(combo => `
                    <div>
                      <p class="text-sm">${combo.quantity} x ${combo.name} — Flavor: ${combo.flavor}, Drink: ${combo.drink}</p>
                      <p class="text-xs text-gray-400">Total: $${(combo.basePrice * combo.quantity).toFixed(2)}</p>
                    </div>
                  `).join("")
                  : '<p class="text-sm">No combos selected</p>'
                }
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
            <p><strong>Combos:</strong> ${
              comboDetails.length > 0 
                ? comboDetails.map(c => `${c.quantity} x ${c.name} (${c.flavor}, ${c.drink})`).join('<br>')
                : 'None'
            }</p>
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

function changeComboQuantity(index, change) {
  const combo = combos[index];
  const existingIndex = comboDetails.findIndex(c => c.index === index);

  if (existingIndex > -1) {
    const newQty = Math.max(1, comboDetails[existingIndex].quantity + change);
    comboDetails[existingIndex] = {
      ...comboDetails[existingIndex],
      quantity: newQty
    };
  } else {
    comboDetails.push({
      index,
      name: combo.name,
      basePrice: combo.basePrice,
      quantity: 1,
      flavor: combo.options.flavors[0],
      drink: combo.options.drinks[0]
    });
    document.getElementById(`combo-${index}`).checked = true;
    document.getElementById(`combo-options-${index}`).classList.add('open');
  }

  renderApp();
}

// Navigation Functions
function goToBooking(movieId) {
  selectedMovie = movies.find(m => m.id === movieId);
  currentPage = "booking";
  selectedSeats = [];
  comboDetails = [];
  renderApp();

  // Animate collapsible after render
  setTimeout(() => {
    comboDetails.forEach(detail => {
      const optionDiv = document.getElementById(`combo-options-${detail.index}`);
      if (optionDiv) optionDiv.classList.add('open');
    });
  }, 100);
}

function goToHome() {
  currentPage = "home";
  selectedMovie = null;
  selectedSeats = [];
  comboDetails = [];
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

function toggleCombo(index) {
  const combo = combos[index];
  const isChecked = document.getElementById(`combo-${index}`).checked;

  if (isChecked) {
    const flavor = combo.options.flavors[0];
    const drink = combo.options.drinks[0];
    const quantity = 1;

    const existingIndex = comboDetails.findIndex(c => c.index === index);
    if (existingIndex > -1) {
      comboDetails[existingIndex] = {
        index,
        name: combo.name,
        basePrice: combo.basePrice,
        quantity,
        flavor,
        drink
      };
    } else {
      comboDetails.push({
        index,
        name: combo.name,
        basePrice: combo.basePrice,
        quantity,
        flavor,
        drink
      });
    }
  } else {
    comboDetails = comboDetails.filter(c => c.index !== index);
  }

  renderApp();

  // After re-render, animate collapsible
  setTimeout(() => {
    const optionDiv = document.getElementById(`combo-options-${index}`);
    if (optionDiv) {
      if (isChecked) {
        optionDiv.classList.add('open');
      } else {
        optionDiv.classList.remove('open');
      }
    }
  }, 100);
}

function updateComboOption(index) {
  const combo = combos[index];
  const isChecked = document.getElementById(`combo-${index}`).checked;
  if (!isChecked) return;

  const flavor = document.getElementById(`flavor-${index}`).value;
  const drink = document.getElementById(`drink-${index}`).value;
  const quantity = parseInt(document.getElementById(`quantity-${index}`).value) || 1;

  const existingIndex = comboDetails.findIndex(c => c.index === index);
  if (existingIndex > -1) {
    comboDetails[existingIndex] = {
      ...comboDetails[existingIndex],
      flavor,
      drink,
      quantity
    };
  }

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

if (menuToggle && sidebar && overlay) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// Make functions globally accessible
window.goToBooking = goToBooking;
window.goToHome = goToHome;
window.toggleSeat = toggleSeat;
window.toggleCombo = toggleCombo;
window.updateComboOption = updateComboOption;
window.goToSummary = goToSummary;
window.goBackSummary = goBackSummary;
window.goToTicket = goToTicket;

// Start App
renderApp();
startCarousel();