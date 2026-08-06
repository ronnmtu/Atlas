//storage

let itinerary =
JSON.parse(localStorage.getItem("waypointItinerary")) || {

    Day1: [
        {
            time: "09:00",
            title: "Beach Walk",
            location: "Bamburi Beach",
            completed: false
        }
    ]

};

let currentDay = Object.keys(itinerary)[0];