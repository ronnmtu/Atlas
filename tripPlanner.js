
const tripForm = document.getElementById("tripForm");
const tripContainer = document.getElementById("tripContainer");
const destinationSelect = document.getElementById("destination");

let trips = JSON.parse(localStorage.getItem("trips")) || [];

// Load saved destinations from wishlist
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
wishlist.forEach(place => {

  const option = document.createElement("option");

  option.value = place.name;
  option.textContent = place.name;

  destinationSelect.appendChild(option);

});

// Suggestions when typing
destinationInput.addEventListener("input", () => {

  const value = destinationInput.value.toLowerCase();

  const match = wishlist.find(place =>
    place.name.toLowerCase().includes(value)
  );

  if (match) {

    destinationInput.value = match.name;

  }

});

renderTrips();

tripForm.addEventListener("submit", saveTrip);

function saveTrip(e) {

  e.preventDefault();

  const destination = document.getElementById("destination").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const budget = document.getElementById("budget").value;
  const travelers = document.getElementById("travelers").value;
  const notes = document.getElementById("notes").value.trim();

  if (destination === "") {

    alert("Please enter a destination.");
    return;

  }

  if (startDate === "" || endDate === "") {

    alert("Please select your travel dates.");
    return;

  }
  if (budget <= 0) {

    alert("Budget must be greater than 0.");
    return;

  }

  const trip = {

    id: Date.now(),

    destination,

    startDate,

    endDate,

    budget,

    travelers,

    notes

  };

  trips.push(trip);

  localStorage.setItem("trips", JSON.stringify(trips));

  renderTrips();

  tripForm.reset();

  alert("Trip saved successfully!");

}

function renderTrips() {

  tripContainer.innerHTML = "";

  if (trips.length === 0) {

    tripContainer.innerHTML = `
            <p>No trips planned yet.</p>
        `;

    return;

  }
  trips.forEach(trip => {

    const today = new Date();
    const tripDate = new Date(trip.startDate);

    const daysLeft = Math.ceil(
      (tripDate - today) /
      (1000 * 60 * 60 * 24)
    );

    const card = document.createElement("div");

    card.classList.add("trip-card");

    card.innerHTML = `

            <h3>${trip.destination}</h3>

            <p><strong>Start:</strong> ${trip.startDate}</p>

            <p><strong>End:</strong> ${trip.endDate}</p>

            <p><strong>Budget:</strong> $${trip.budget}</p>

            <p><strong>Travellers:</strong> ${trip.travelers}</p>

            <p><strong>Notes:</strong> ${trip.notes || "None"}</p>

            <p><strong>Countdown:</strong>
            ${daysLeft >= 0 ? daysLeft + " days left" : "Trip Completed"}
            </p>

            <button onclick="deleteTrip(${trip.id})">

                Delete

            </button>

        `;

    tripContainer.appendChild(card);

  });

}

function deleteTrip(id) {

  if (!confirm("Delete this trip?")) return;

  trips = trips.filter(trip => trip.id !== id);

  localStorage.setItem("trips", JSON.stringify(trips));

  renderTrips();

}

function updateSummary() {

  document.getElementById("tripCount").textContent = trips.length;

  const totalBudget = trips.reduce((sum, trip) => {

    return sum + Number(trip.budget);

  }, 0);

  document.getElementById("budgetTotal").textContent =
    "$" + totalBudget;

  if (trips.length) {

    const next = [...trips].sort((a, b) =>

      new Date(a.startDate) - new Date(b.startDate)

    )[0];

    document.getElementById("nextTrip").textContent =
      next.destination;

  } else {

    document.getElementById("nextTrip").textContent = "None";

  }

}