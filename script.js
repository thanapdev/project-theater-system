// App State
let currentPage = "home";
let selectedMovie = null;
let selectedSeats = [];
let comboDetails = []; // Will store selected combo details including options

// Movie List
const movies = [
  { id: 1, title: "Epic Adventure", image: "https://placehold.co/300x450?text=Epic+Adventure " , type: "now" },
  { id: 2, title: "Space Warriors", image: "https://placehold.co/300x450?text=Space+Warriors " , type: "now"},
  { id: 3, title: "Mystery of Shadows", image: "https://placehold.co/300x450?text=Mystery+of+Shadows " , type: "now"},
  { id: 4, title: "Ocean's Fury", image: "https://placehold.co/300x450?text=Oceans+Fury " , type: "now"},
  { id: 5, title: "City Lights", image: "https://placehold.co/300x450?text=City+Lights " , type: "now"},
  { id: 6, title: "Desert Storm", image: "https://placehold.co/300x450?text=Desert+Storm " , type: "now"},
  { id: 7, title: "The Last Hero", image: "https://placehold.co/300x450?text=The+Last+Hero " , type: "now"},
  { id: 8, title: "Zombie Attack", image: "https://placehold.co/300x450?text=Zombie+Attack " , type: "now"},
  { id: 9, title: "Sky High", image: "https://placehold.co/300x450?text=Sky+High " , type: "now"},
  { id: 10, title: "Midnight Escape", image: "https://placehold.co/300x450?text=Midnight+Escape " , type: "now"},
   // Coming Soon (10 movies)
  { id: 11, title: "Alien Invasion", image: "https://placehold.co/300x450?text=Alien+Invasion ", type: "soon" },
  { id: 12, title: "Dragon Fire", image: "https://placehold.co/300x450?text=Dragon+Fire ", type: "soon" },
  { id: 13, title: "Time Traveler", image: "https://placehold.co/300x450?text=Time+Traveler ", type: "soon" },
  { id: 14, title: "Robot Revolution", image: "https://placehold.co/300x450?text=Robot+Revolution ", type: "soon" },
  { id: 15, title: "Shadow Realm", image: "https://placehold.co/300x450?text=Shadow+Realm ", type: "soon" },
  { id: 16, title: "Neon City", image: "https://placehold.co/300x450?text=Neon+City ", type: "soon" },
  { id: 17, title: "Kingdom of Magic", image: "https://placehold.co/300x450?text=Kingdom+of+Magic ", type: "soon" },
  { id: 18, title: "Underwater Odyssey", image: "https://placehold.co/300x450?text=Underwater+Odyssey ", type: "soon" },
  { id: 19, title: "Cyber Rebellion", image: "https://placehold.co/300x450?text=Cyber+Rebellion ", type: "soon" },
  { id: 20, title: "The Final Battle", image: "https://placehold.co/300x450?text=The+Final+Battle ", type: "soon" }
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
    // เหมือนเดิม - แสดงทั้ง carousel และ available movies
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

  else if (currentPage === "nowShowing") {
    // แสดงเฉพาะ Now Showing
    const nowMovies = movies.filter(m => m.type === "now");
    if (nowMovies.length === 0) nowMovies = [...movies]; // fallback

    app.innerHTML = `
      <section class="container">
        <h2 class="text-3xl font-bold mb-6 text-accent">Now Showing</h2>
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

  else if (currentPage === "comingSoon") {
    // แสดงเฉพาะ Coming Soon
    const soonMovies = movies.filter(m => m.type === "soon");

    app.innerHTML = `
      <section class="container mt-8">
        <h2 class="text-3xl font-bold mb-6 text-accent">Coming Soon</h2>
        <div class="movie-grid">
          ${soonMovies.map(m => `
            <div class="card opacity-70">
              <img src="${m.image}" alt="${m.title}">
              <h3>${m.title}</h3>
              <p class="text-sm text-gray-400 mt-1">Details coming soon...</p>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }


  else if (currentPage === "booking") {
    app.innerHTML = `
    
      <div class="container">
       <!-- Back to Home Button -->
      <button class="gohomebtn btn-primary mb-4" onclick="goToHome()">← Back to Home</button>
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
<div class="popcorn-layout mt-8 grid md:grid-cols-2 gap-4 undercard">

  <!-- Left Side - Combo Options -->
  <div class="card p-4">
    <h4 class="text-lg font-semibold mb-6">Popcorn Combos</h4>
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

  <!-- Right Side - Summary Box -->
  <div class="card p-4 h-fit sticky top-24">
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
      <section class="container showtime-text">
        <button class="gohomebtn btn-primary mb-4" onclick="goToHome()">← Back to Home</button>
        <div class="card p-6 max-w-3xl mx-auto gohomebtn">
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
          <br><button onclick="goToTicket()" class="btn-primary w-full py-3">Confirm Booking</button>
        </div>
      </section>
    `;
  }

  else if (currentPage === "ticket") {
    const ticketId = Math.floor(100000 + Math.random() * 900000);

    app.innerHTML = `
      <section class="container">
        <button class="gohomebtn btn-primary mb-4" onclick="goToHome()">← Back to Home</button>
        <div class="card p-6 max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6 text-accent">CinemaMax Ticket</h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 mx-auto mb-4 text-accent">
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
          <br><button class="btn-primary w-full py-3 mt-6 mb-4" onclick="goToHome()">Back to Home</button>
        </div>
      </section>
    `;
  }

  else if (currentPage === "aboutMe") {
  app.innerHTML = `
    <section class="about-me">
      <img src="https://avatars.githubusercontent.com/u/102853264?v=4" alt="thanapdev GitHub Avatar" />
      <h1>Thanapong Yamkamol</h1>
      <p>
        <strong>Full Stack Developer | Web Enthusiast</strong>
      </p>
      <p>
        Hello! My name is Thanapong Yamkamol, also known as <b>thanapdev</b>.<br>
        I am the developer of CinemaMax, this online movie ticket booking system.<br>
        I am passionate about Web Development, JavaScript, and new technologies.<br>
        <br>
        Check out more of my projects at
        <a href="https://github.com/thanapdev" target="_blank">GitHub: thanapdev</a>
      </p>
      <p>
        Contact: <a href="mailto:thanap151255@gmail.com">thanap151255@gmail.com</a>
      </p>
    </section>
  `;
}
}

// Navigation Functions
function goToBooking(movieId) {
  selectedMovie = movies.find(m => m.id === movieId);
  currentPage = "booking";
  selectedSeats = [];
  comboDetails = [];
  renderApp();

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
        ...comboDetails[existingIndex],
        flavor,
        drink,
        quantity
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

  // Animate collapsible after re-rendering
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

  const flavor = document.getElementById(`flavor-${index}`)?.value || combo.options.flavors[0];
  const drink = document.getElementById(`drink-${index}`)?.value || combo.options.drinks[0];
  const quantity = parseInt(document.getElementById(`quantity-${index}`)?.value) || 1;

  const existingIndex = comboDetails.findIndex(c => c.index === index);
  if (existingIndex > -1) {
    comboDetails[existingIndex] = {
      ...comboDetails[existingIndex],
      flavor,
      drink,
      quantity
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

  renderApp();
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
  if (!track) return;

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
window.changeComboQuantity = changeComboQuantity;
window.goToSummary = goToSummary;
window.goBackSummary = goBackSummary;
window.goToTicket = goToTicket;

// Start App
renderApp();

// ตรวจสอบ path ก่อน render main
const app = document.getElementById('app');
const path = window.location.pathname;

if (app) {
  if (path.endsWith("index.html") || path === "/" || path.endsWith("/")) {
    currentPage = "home";
    renderApp();
  } else if (path.endsWith("nowShowing.html")) {
    currentPage = "nowShowing";
    renderApp();
  } else if (path.endsWith("comingSoon.html")) {
    currentPage = "comingSoon";
    renderApp();
  } else if (path.endsWith("booking.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get("movieId"));
    selectedMovie = movies.find(m => m.id === movieId);
    currentPage = "booking";
    renderApp();
  } else if (path.endsWith("aboutMe.html")) {
    currentPage = "aboutMe";
    renderApp();
  }
}