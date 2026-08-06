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

//elements

const dayTabs =
document.querySelector(".day-tabs");

const timeline =
document.querySelector(".timeline");

const addDayBtn =
document.getElementById("add-day-btn");

const addActivityBtn =
document.getElementById("add-activity-btn");

const activityCount =
document.getElementById("activity-count");

const progressText =
document.getElementById("progress-percent");

const notesBox =
document.querySelector("textarea");

//save

function saveData(){

    localStorage.setItem(
        "waypointItinerary",
        JSON.stringify(itinerary)
    );

}