const movies = [
  {
    id: 1,
    title: "Epic Adventure",
    image: "https://placehold.co/300x450?text=Epic+Adventure ",
  },
  {
    id: 2,
    title: "Space Warriors",
    image: "https://placehold.co/300x450?text=Space+Warriors ",
  },
  {
    id: 3,
    title: "Mystery of Shadows",
    image: "https://placehold.co/300x450?text=Mystery+of+Shadows ",
  },
  {
    id: 4,
    title: "Ocean's Fury",
    image: "https://placehold.co/300x450?text=Oceans+Fury ",
  },
  {
    id: 5,
    title: "City Lights",
    image: "https://placehold.co/300x450?text=City+Lights ",
  },
  {
    id: 6,
    title: "Desert Storm",
    image: "https://placehold.co/300x450?text=Desert+Storm ",
  },
  {
    id: 7,
    title: "The Last Hero",
    image: "https://placehold.co/300x450?text=The+Last+Hero ",
  },
  {
    id: 8,
    title: "Zombie Attack",
    image: "https://placehold.co/300x450?text=Zombie+Attack ",
  },
  {
    id: 9,
    title: "Sky High",
    image: "https://placehold.co/300x450?text=Sky+High ",
  },
  {
    id: 10,
    title: "Midnight Escape",
    image: "https://placehold.co/300x450?text=Midnight+Escape ",
  },
];

function renderApp() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="container">
      <h2 class="text-3xl font-bold mb-6 text-yellow">Now Showing</h2>
      <div class="carousel">
        <div class="carousel-track" id="carouselTrack">
          ${movies.map(m => `
            <div class="carousel-item">
              <img src="${m.image}" alt="${m.title}">
              <h3>${m.title}</h3>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="container">
      <h2 class="text-3xl font-bold mb-6 text-yellow">Available Movies</h2>
      <div class="movie-grid">
        ${movies.map(m => `
          <div class="card">
            <img src="${m.image}" alt="${m.title}">
            <h3 class="mt-2">${m.title}</h3>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  // Start the auto slider
  startCarousel();
}

function startCarousel() {
  const track = document.getElementById("carouselTrack");
  let index = 0;

  setInterval(() => {
    index++;
    if (index * 310 > movies.length * 310) index = 0;
    track.style.transform = `translateX(-${index * 310}px)`;
  }, 3000);
}

renderApp();