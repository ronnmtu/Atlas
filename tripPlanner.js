const form = document.getElementById("tripForm");
const tripContainer = document.getElementById("tripContainer");

let trips = JSON.parse(localStorage.getItem("trips")) || [];

renderTrips();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const trip = {
    id: Date.now(),
    destination: document.getElementById("destination").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    budget: document.getElementById("budget").value,
    travelers: document.getElementById("travelers").value,
    notes: document.getElementById("notes").value,
  };

  if (trip.startDate > trip.endDate) {
    alert("End date must be after start date.");
    return;
  }

  trips.push(trip);

  localStorage.setItem("trips", JSON.stringify(trips));

  renderTrips();

  form.reset();
});

function renderTrips() {
  tripContainer.innerHTML = "";

  trips.forEach((trip) => {
    const card = document.createElement("div");
    card.classList.add("trip-card");
    card.innerHTML = `
      <h3>${trip.destination}</h3>
      <p><strong>Dates:</strong> ${trip.startDate} - ${trip.endDate}</p>
      <p><strong>Budget:</strong> $${trip.budget}</p>
      <p><strong>Travellers:</strong> ${trip.travelers}</p>
      <p>${trip.notes}</p>
      <button onclick="deleteTrip(${trip.id})">Delete</button>
    `;

    tripContainer.appendChild(card);
  });
}

function deleteTrip(id) {
  trips = trips.filter((trip) => trip.id !== id);

  localStorage.setItem("trips", JSON.stringify(trips));

  renderTrips();
}
