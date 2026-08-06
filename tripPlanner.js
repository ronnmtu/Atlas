
const tripForm = document.getElementById("tripForm");
const tripContainer = document.getElementById("tripContainer");
const destinationInput = document.getElementById("destination");

let trips = JSON.parse(localStorage.getItem("trips")) || [];

// Load saved destinations from wishlist
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

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

