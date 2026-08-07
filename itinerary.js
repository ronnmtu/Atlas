//load trip data

const trips =
JSON.parse(
    localStorage.getItem("trips")
) || [];

let currentTrip = null;

if (trips.length > 0) {
    currentTrip = trips[trips.length - 1];
}

//itinerary storage

let itinerary =
JSON.parse(
    localStorage.getItem(
        "waypointItinerary"
    )
) || {
    Day1: []
};

let currentDay =
Object.keys(itinerary)[0];

// elements

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

//hero + overview data

if(currentTrip){

    const destinationEl =
    document.getElementById(
        "destination"
    );

    const durationEl =
    document.getElementById(
        "duration"
    );

    const travellersEl =
    document.getElementById(
        "travellers"
    );

    const heroDestination =
    document.getElementById(
        "hero-destination"
    );

    const heroDates =
    document.getElementById(
        "hero-dates"
    );

    if(destinationEl){
        destinationEl.textContent =
        currentTrip.destination;
    }

    if(durationEl){
        durationEl.textContent =
        `${currentTrip.startDate} → ${currentTrip.endDate}`;
    }

    if(travellersEl){
        travellersEl.textContent =
        `${currentTrip.travelers} Traveller(s)`;
    }

    if(heroDestination){
        heroDestination.textContent =
        currentTrip.destination;
    }

    if(heroDates){
        heroDates.textContent =
        `${currentTrip.startDate} → ${currentTrip.endDate}`;
    }
}

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

    Object.keys(itinerary)
    .forEach(day => {

        const btn =
        document.createElement("button");

        btn.classList.add("day-tab");

        if(day === currentDay){
            btn.classList.add("active");
        }

        btn.textContent =
        day.replace(
            "Day",
            "Day "
        );

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

//render acts

function renderActivities(){

    timeline.innerHTML = "";

    itinerary[currentDay]
    .forEach(
        (activity,index) => {

            const card =
            document.createElement("article");

            card.classList.add(
                "activity-card"
            );

            card.innerHTML =

            `
            <div class="activity-time">
                ${activity.time}
            </div>

            <div class="activity-details">

                <h3 class="${
                    activity.completed
                    ? "completed"
                    : ""
                }">

                    ${activity.title}

                </h3>

                <p>
                    ${activity.location}
                </p>

            </div>

            <div class="activity-actions">

                <button class="complete-btn">
                    ${
                        activity.completed
                        ? "Completed"
                        : "Complete"
                    }
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
            `;

            /* COMPLETE */

            card
            .querySelector(".complete-btn")
            .addEventListener(
                "click",
                () => {

                    activity.completed =
                    !activity.completed;

                    saveData();

                    renderActivities();

                }
            );

            /* DELETE */

            card
            .querySelector(".delete-btn")
            .addEventListener(
                "click",
                () => {

                    itinerary[currentDay]
                    .splice(index,1);

                    saveData();

                    renderActivities();

                }
            );

            timeline.appendChild(card);

        });

    updateStats();

}

//modal

const modal =
document.getElementById(
    "activityModal"
);

const saveActivityBtn =
document.getElementById(
    "saveActivity"
);

const closeModalBtn =
document.getElementById(
    "closeModal"
);

addActivityBtn.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "hidden"
        );

    }
);

closeModalBtn.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );

    }
);

saveActivityBtn.addEventListener(
    "click",
    () => {

        const time =
        document.getElementById(
            "activityTime"
        ).value;

        const title =
        document.getElementById(
            "activityTitle"
        ).value;

        const location =
        document.getElementById(
            "activityLocation"
        ).value;

        if(
            !time ||
            !title ||
            !location
        ){

            alert(
                "Please complete all fields."
            );

            return;

        }

        itinerary[currentDay]
        .push({

            time,
            title,
            location,

            completed:false

        });

        saveData();

        renderActivities();

        modal.classList.add(
            "hidden"
        );

        document.getElementById(
            "activityTime"
        ).value = "";

        document.getElementById(
            "activityTitle"
        ).value = "";

        document.getElementById(
            "activityLocation"
        ).value = "";

    }
);

//stats

function updateStats(){

    let totalActivities = 0;
    let completed = 0;

    Object.values(itinerary)
    .forEach(day => {

        totalActivities +=
        day.length;

        day.forEach(activity => {

            if(activity.completed){
                completed++;
            }

        });

    });

    activityCount.textContent =
    `${totalActivities} Planned`;

    let progress = 0;

    if(totalActivities > 0){

        progress =
        Math.round(
            (completed /
            totalActivities) * 100
        );

    }

    progressText.textContent =
    `${progress}%`;

    const circle =
    document.querySelector(".circle");

    if(circle){

        circle.style.background =

        `conic-gradient(
            #63d7d8 ${progress}%,
            rgba(255,255,255,.08) 0
        )`;

    }

    const totalStat = document.getElementById("total-activities-stat");
    const completedStat = document.getElementById("completed-stat");
    const daysStat = document.getElementById("days-stat");
    const travellerStat = document.getElementById("traveller-stat");

    if (totalStat) {
        totalStat.textContent = totalActivities;
    } 

    if (completedStat) {
        completedStat.textContent = completed;
    }

    if (daysStat) {
        daysStat.textContent = Object.keys(itinerary).length;
    }

    if (travellerStat && currentTrip) {
         travellerStat.textContent = currentTrip.travelers;
    }

}

//notes

notesBox.value =
localStorage.getItem(
    "waypointNotes"
) || "";

notesBox.addEventListener(
    "input",
    () => {

        localStorage.setItem(
            "waypointNotes",
            notesBox.value
        );

    }
);

//download

document
.getElementById(
    "download-btn"
)
.addEventListener(
    "click",
    () => {

        window.print();

    }
);

//print

document
.getElementById(
    "print-btn"
)
.addEventListener(
    "click",
    () => {

        window.print();

    }
);

//share

document
.getElementById(
    "share-btn"
)
.addEventListener(
    "click",
    async () => {

        if(navigator.share){

            try{

                await navigator.share({

                    title:
                    "Waypoint Itinerary",

                    text:
                    "Check out my trip itinerary."

                });

            }

            catch(error){

                console.log(error);

            }

        }

        else{

            alert(
                "Sharing is not supported in this browser."
            );

        }

    }
);

//weather

async function loadWeather() {
    if (!currentTrip) {
        document.getElementById("weather-condition").textContent =
            "No trip selected";
        return;
    }

    const destination = currentTrip.destination;
    const city = destination.split(",")[0];
    const apiKey = "YOUR_API_KEY_HERE";

    try {
        // Get coordinates
        const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        );

        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            throw new Error("City not found");
        }

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        // Get current weather
        const weatherResponse = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        const weatherData = await weatherResponse.json();

        document.getElementById("weather-temp").textContent =
            `${Math.round(weatherData.main.temp)}°C`;

        document.getElementById("weather-condition").textContent =
            weatherData.weather[0].description;

        document.getElementById("weather-location").textContent = city;

    } catch (error) {
        console.error(error);

        document.getElementById("weather-condition").textContent =
            "Weather unavailable";
    }
}

//initial load

renderDayTabs();
renderActivities();
loadWeather();