// App State
let currentPage = "home";
let selectedMovie = null;
let selectedSeats = [];
let comboQuantity = 1;
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

const popcornTotal = comboDetails.reduce((sum, c) => sum + c.basePrice * c.quantity, 0);

function toggleCombo(index) {
  const combo = combos[index];
  const isChecked = document.getElementById(`combo-${index}`).checked;
  const flavor = document.getElementById(`flavor-${index}`)?.value || combo.options.flavors[0];
  const drink = document.getElementById(`drink-${index}`)?.value || combo.options.drinks[0];
  const quantity = parseInt(document.getElementById(`quantity-${index}`)?.value) || 1;

  if (isChecked) {
    comboDetails.push({
      index,
      name: combo.name,
      basePrice: combo.basePrice,
      quantity,
      flavor,
      drink
    });
  } else {
    comboDetails = comboDetails.filter(c => c.index !== index);
  }

  renderApp();
}

function updateComboOption(index) {
  const combo = combos[index];
  const isChecked = document.getElementById(`combo-${index}`).checked;

  if (!isChecked) return;

  const flavor = document.getElementById(`flavor-${index}`).value;
  const drink = document.getElementById(`drink-${index}`).value;
  const quantity = parseInt(document.getElementById(`quantity-${index}`).value);

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
  <div class="space-y-4">
    ${combos.map((combo, idx) => {
      const detail = comboDetails.find(c => c.index === idx);
      const quantity = detail ? detail.quantity : 1;
      const flavor = detail ? detail.flavor : combo.options.flavors[0];
      const drink = detail ? detail.drink : combo.options.drinks[0];

      return `
        <div class="border-b border-gray-700 pb-4">
          <label class="flex items-center gap-2 mb-2">
            <input 
              type="checkbox" 
              id="combo-${idx}" 
              onclick="toggleCombo(${idx})"
            />
            <span>${combo.name}</span>
            <span class="font-medium">$${combo.basePrice.toFixed(2)}</span>
          </label>

          <div id="combo-options-${idx}" class="${!detail ? 'hidden' : ''} ml-6 space-y-2">
            <div>
              <label>Flavor:</label>
              <select id="flavor-${idx}" onchange="updateComboOption(${idx})" class="ml-2 bg-secondary-1 text-main-color rounded px-2 py-1">
                ${combo.options.flavors.map(f => `<option value="${f}" ${f === flavor ? 'selected' : ''}>${f}</option>`).join("")}
              </select>
            </div>
            <div>
              <label>Drink Size:</label>
              <select id="drink-${idx}" onchange="updateComboOption(${idx})" class="ml-2 bg-secondary-1 text-main-color rounded px-2 py-1">
                ${combo.options.drinks.map(d => `<option value="${d}" ${d === drink ? 'selected' : ''}>${d}</option>`).join("")}
              </select>
            </div>
            <div>
              <label>Quantity:</label>
              <input type="number" min="1" value="${quantity}" id="quantity-${idx}" onchange="updateComboOption(${idx})" class="w-16 ml-2 bg-secondary-1 text-main-color rounded px-2 py-1">
            </div>
          </div>
        </div>
      `;
    }).join("")}
  </div>
</div>


<div class="border-t border-gray-700 pt-4">
  <h4 class="font-medium mb-2">Popcorn Combos:</h4>
  <div class="space-y-2">
    ${comboDetails.length > 0 ? comboDetails.map(combo => `
      <div>
        <p class="text-sm">${combo.quantity} x ${combo.name} — Flavor: ${combo.flavor}, Drink: ${combo.drink}</p>
        <p class="text-xs text-gray-400">Total: $${(combo.basePrice * combo.quantity).toFixed(2)}</p>
      </div>
    `).join("") : '<p class="text-sm">No combos selected</p>'}
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
        
        <!-- ✅ This is where we place the updated combo list -->
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