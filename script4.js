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

//day tabs

function renderDayTabs(){

    dayTabs.innerHTML = "";

    Object.keys(itinerary).forEach(day => {

        const btn =
        document.createElement("button");

        btn.classList.add("day-tab");

        if(day === currentDay){
            btn.classList.add("active");
        }

        btn.textContent =
        day.replace("Day","Day ");

        btn.addEventListener(
            "click",
            () => {

                currentDay = day;

                renderDayTabs();
                renderActivities();

            }
        );

        dayTabs.appendChild(btn);

    });

}

//add day

addDayBtn.addEventListener(
    "click",
    () => {

        const totalDays =
        Object.keys(itinerary).length + 1;

        const newDay =
        `Day${totalDays}`;

        itinerary[newDay] = [];

        currentDay = newDay;

        saveData();

        renderDayTabs();
        renderActivities();

    }
);