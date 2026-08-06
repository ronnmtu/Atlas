
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