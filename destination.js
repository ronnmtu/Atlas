const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    blurb: "Beach and culture",
    category: "beach",
    image: "images/bali.jfif"
  },

  {
    id: 2,
    name: "Banff, Canada",
    blurb: "Mountains and hikes",
    category: "adventure",
    image: "images/banff.jfif"
  },

  {
    id: 3,
    name: "Paris, France",
    blurb: "City of lights",
    category: "city",
    image: "images/paris.jfif"
  },

  {
    id: 4,
    name: "Kyoto, Japan",
    blurb: "Temples and gardens",
    category: "culture",
    image: "images/kyoto.jpg"
  },

  {
    id: 5,
    name: "Maui, Hawaii",
    blurb: "Tropical paradise",
    category: "beach",
    image: "images/maui.jfif"
  },

  {
    id: 6,
    name: "Reykjavik, Iceland",
    blurb: "Northern lights and geysers",
    category: "adventure",
    image: "images/reyjavik.jfif"
  },

  {
    id: 7,
    name: "New York City, USA",
    blurb: "The city that never sleeps",
    category: "city",
    image: "images/new york.jfif"
  },

  {
    id: 8,
    name: "Rome, Italy",
    blurb: "Ancient history and cuisine",
    category: "culture",
    image: "images/rome.jfif"
  },

  {
    id: 9,
    name: "Santorini, Greece",
    blurb: "White-washed buildings and sunsets",
    category: "beach",
    image: "images/santorini.jfif"

  },

  {
    id: 10,
    name: "Patagonia, Chile",
    blurb: "Glaciers and trekking",
    category: "adventure",
    image: "images/patagonia.jfif"
  },

  {
    id: 11,
    name: "Barcelona, Spain",
    blurb: "Art and architecture",
    category: "city",
    image: "images/barcelona.jfif"
  },

  {
    id: 12,
    name: "Istanbul, Turkey",
    blurb: "A blend of cultures and history",
    category: "culture",
    image: "images/instabul.jfif"
  },
];



function renderDestinations(list) {
  const grid = document.getElementById("destination-grid");
  grid.innerHTML = ""; // clear before re-rendering

  list.forEach(dest => {
    const card = document.createElement("div");
    card.classList.add("destination-card");
    card.innerHTML = `
      <img src="${dest.image}" alt="${dest.name}">
      <h3>${dest.name}</h3>
      <p>${dest.blurb}</p>
      <button class="save-btn" data-id="${dest.id}">Save</button>
    `;
    grid.appendChild(card);
  });
}

renderDestinations(destinations); // initial render, all destinations
const filterButtons = document.querySelectorAll(".filter-btn");

const grid = document.getElementById("destination-grid");

grid.addEventListener("click", (event) => {
  // only react if a save button was clicked
  if (!event.target.classList.contains("save-btn")) return;

  const id = Number(event.target.dataset.id);
  const destination = destinations.find(dest => dest.id === id);

  showToast(`${destination.name} saved to your wishlist.`);
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active from all buttons first
    filterButtons.forEach(b => b.classList.remove("active"));
    // add active to the one just clicked
    btn.classList.add("active");

    const category = btn.dataset.category;
    const filtered = category === "all"
      ? destinations
      : destinations.filter(dest => dest.category === category);
    renderDestinations(filtered);
  });
});