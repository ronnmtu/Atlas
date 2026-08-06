
// const tripForm = document.getElementById("tripForm");
// const tripContainer = document.getElementById("tripContainer");
// const destinationSelect = document.getElementById("destination");

// let trips = JSON.parse(localStorage.getItem("trips")) || [];

// // Load saved destinations from wishlist
// const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
// wishlist.forEach(place => {

//   const option = document.createElement("option");

//   option.value = place.name;
//   option.textContent = place.name;

//   destinationSelect.appendChild(option);

// });

// // Suggestions when typing
// destinationInput.addEventListener("input", () => {

//   const value = destinationInput.value.toLowerCase();

//   const match = wishlist.find(place =>
//     place.name.toLowerCase().includes(value)
//   );

//   if (match) {

//     destinationInput.value = match.name;

//   }

// });

// renderTrips();

// tripForm.addEventListener("submit", saveTrip);

// function saveTrip(e) {

//   e.preventDefault();

//   const destination = document.getElementById("destination").value.trim();
//   const startDate = document.getElementById("startDate").value;
//   const endDate = document.getElementById("endDate").value;
//   const budget = document.getElementById("budget").value;
//   const travelers = document.getElementById("travelers").value;
//   const notes = document.getElementById("notes").value.trim();

//   if (destination === "") {

//     alert("Please enter a destination.");
//     return;

//   }

//   if (startDate === "" || endDate === "") {

//     alert("Please select your travel dates.");
//     return;

//   }
//   if (budget <= 0) {

//     alert("Budget must be greater than 0.");
//     return;

//   }

//   const trip = {

//     id: Date.now(),

//     destination,

//     startDate,

//     endDate,

//     budget,

//     travelers,

//     notes

//   };

//   trips.push(trip);

//   localStorage.setItem("trips", JSON.stringify(trips));

//   renderTrips();

//   tripForm.reset();

//   alert("Trip saved successfully!");

// }

// function renderTrips() {

//   tripContainer.innerHTML = "";

//   if (trips.length === 0) {

//     tripContainer.innerHTML = `
//             <p>No trips planned yet.</p>
//         `;

//     return;

//   }
//   trips.forEach(trip => {

//     const today = new Date();
//     const tripDate = new Date(trip.startDate);

//     const daysLeft = Math.ceil(
//       (tripDate - today) /
//       (1000 * 60 * 60 * 24)
//     );

//     const card = document.createElement("div");

//     card.classList.add("trip-card");

//     card.innerHTML = `

//             <h3>${trip.destination}</h3>

//             <p><strong>Start:</strong> ${trip.startDate}</p>

//             <p><strong>End:</strong> ${trip.endDate}</p>

//             <p><strong>Budget:</strong> $${trip.budget}</p>

//             <p><strong>Travellers:</strong> ${trip.travelers}</p>

//             <p><strong>Notes:</strong> ${trip.notes || "None"}</p>

//             <p><strong>Countdown:</strong>
//             ${daysLeft >= 0 ? daysLeft + " days left" : "Trip Completed"}
//             </p>

//             <button onclick="deleteTrip(${trip.id})">

//                 Delete

//             </button>

//         `;

//     tripContainer.appendChild(card);

//   });

// }

// function deleteTrip(id) {

//   if (!confirm("Delete this trip?")) return;

//   trips = trips.filter(trip => trip.id !== id);

//   localStorage.setItem("trips", JSON.stringify(trips));

//   renderTrips();

// }

// function updateSummary() {

//   document.getElementById("tripCount").textContent = trips.length;

//   const totalBudget = trips.reduce((sum, trip) => {

//     return sum + Number(trip.budget);

//   }, 0);

//   document.getElementById("budgetTotal").textContent =
//     "$" + totalBudget;

//   if (trips.length) {

//     const next = [...trips].sort((a, b) =>

//       new Date(a.startDate) - new Date(b.startDate)

//     )[0];

//     document.getElementById("nextTrip").textContent =
//       next.destination;

//   } else {

//     document.getElementById("nextTrip").textContent = "None";

//   }

// }

// const budgetInput = document.getElementById("budget");
// const budgetLevel = document.getElementById("budgetLevel");

// budgetInput.addEventListener("input", () => {

//   const value = Number(budgetInput.value);

//   if (value < 500) {
//     budgetLevel.textContent = "Budget Trip";
//   } else if (value < 2000) {
//     budgetLevel.textContent = "Mid-range Trip";
//   } else {
//     budgetLevel.textContent = "Luxury Trip";
//   }

// });

// ==========================================================
// ATLAS TRIP PLANNER
// Part 1 - Setup, Loading Data, Form Features
// ==========================================================

// ---------- Elements ----------

const tripForm = document.getElementById("tripForm");
const tripContainer = document.getElementById("tripContainer");

const destinationSelect = document.getElementById("destination");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const budget = document.getElementById("budget");
const travelers = document.getElementById("travelers");
const notes = document.getElementById("notes");

const budgetLevel = document.getElementById("budgetLevel");
const countdownPreview = document.getElementById("countdownPreview");
const travelQuote = document.getElementById("travelQuote");

const tripCount = document.getElementById("tripCount");
const budgetTotal = document.getElementById("budgetTotal");
const nextTrip = document.getElementById("nextTrip");

// ---------- Local Storage ----------

let trips = JSON.parse(localStorage.getItem("trips")) || [];

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ==========================================================
// LOAD DESTINATIONS INTO DROPDOWN
// ==========================================================

wishlist.forEach(place => {

  const option = document.createElement("option");

  option.value = place.name;

  option.textContent = place.name;

  destinationSelect.appendChild(option);

});

// ==========================================================
// RANDOM TRAVEL QUOTES
// ==========================================================

const quotes = [

  "🌍 The world is too big to stay in one place.",

  "✈ Adventure begins where plans start.",

  "🏝 Collect moments, not things.",

  "🗺 Travel is the only thing you buy that makes you richer.",

  "🌅 Every journey begins with one decision."

];

if (travelQuote) {

  travelQuote.textContent =

    quotes[Math.floor(Math.random() * quotes.length)];

}

// ==========================================================
// BUDGET INDICATOR
// ==========================================================

budget.addEventListener("input", () => {

  const value = Number(budget.value);

  if (value <= 0) {

    budgetLevel.textContent = "";

  }

  else if (value < 500) {

    budgetLevel.textContent = "💚 Budget Friendly";

  }

  else if (value < 2000) {

    budgetLevel.textContent = "💙 Mid-Range";

  }

  else {

    budgetLevel.textContent = "💎 Luxury Trip";

  }

});

// ==========================================================
// COUNTDOWN PREVIEW
// ==========================================================

startDate.addEventListener("change", () => {

  if (startDate.value === "") {

    countdownPreview.textContent = "";

    return;

  }

  const today = new Date();

  const tripDay = new Date(startDate.value);

  const days = Math.ceil(

    (tripDay - today) /

    (1000 * 60 * 60 * 24)

  );

  if (days >= 0) {

    countdownPreview.textContent =

      `🛫 Your trip begins in ${days} days`;

  }

});

// ==========================================================
// FORM PROGRESS BAR
// ==========================================================

const formFields = document.querySelectorAll(

  "#tripForm input, #tripForm select, #tripForm textarea"

);

formFields.forEach(field => {

  field.addEventListener("input", updateProgress);

});

function updateProgress() {

  const progressFill = document.getElementById("progressFill");

  if (!progressFill) return;

  let completed = 0;

  formFields.forEach(field => {

    if (field.value.trim() !== "") {

      completed++;

    }

  });

  const percent =

    (completed / formFields.length) * 100;

  progressFill.style.width = percent + "%";

}

// ==========================================================
// DESTINATION IMAGES
// ==========================================================

const destinationImages = {

  "Bali, Indonesia": "images/bali.jfif",

  "Banff, Canada": "images/banff.jfif",

  "Paris, France": "images/paris.jfif",

  "Kyoto, Japan": "images/kyoto.jpg",

  "Maui, Hawaii": "images/maui.jfif",

  "Reykjavik, Iceland": "images/reyjavik.jfif",

  "New York City, USA": "images/new york.jfif",

  "Rome, Italy": "images/rome.jfif",

  "Santorini, Greece": "images/santorini.jfif",

  "Patagonia, Chile": "images/patagonia.jfif",

  "Barcelona, Spain": "images/barcelona.jfif",

  "Istanbul, Turkey": "images/instabul.jfif"

};

// ==========================================================
// COUNTRY FLAGS
// ==========================================================

const destinationFlags = {

  "Bali, Indonesia": "🇮🇩",

  "Banff, Canada": "🇨🇦",

  "Paris, France": "🇫🇷",

  "Kyoto, Japan": "🇯🇵",

  "Maui, Hawaii": "🇺🇸",

  "Reykjavik, Iceland": "🇮🇸",

  "New York City, USA": "🇺🇸",

  "Rome, Italy": "🇮🇹",

  "Santorini, Greece": "🇬🇷",

  "Patagonia, Chile": "🇨🇱",

  "Barcelona, Spain": "🇪🇸",

  "Istanbul, Turkey": "🇹🇷"

};

// ==========================================================
// SAVE TRIP
// (Part 2 continues here)
// ==========================================================