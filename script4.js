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

//activities

function renderActivities(){

    timeline.innerHTML = "";

    itinerary[currentDay].forEach(
        (activity,index) => {

            const card =
            document.createElement("article");

            card.classList.add(
                "activity-card"
            );

            card.innerHTML = `
            
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

                    <button
                    class="complete-btn">

                        ${
                            activity.completed
                            ? "Completed"
                            : "Complete"
                        }

                    </button>

                    <button
                    class="delete-btn">

                        Delete

                    </button>

                </div>

            `;

           //complete

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

            //delete

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

//add actitvity

addActivityBtn.addEventListener(
    "click",
    () => {

        const time =
        prompt("Enter activity time:");

        if(!time) return;

        const title =
        prompt("Activity name:");

        if(!title) return;

        const location =
        prompt("Location:");

        if(!location) return;

        itinerary[currentDay].push({

            time,
            title,
            location,

            completed:false

        });

        saveData();

        renderActivities();

    }
);

//stats

function updateStats(){

    let totalActivities = 0;

    let completed = 0;

    Object.values(itinerary)
    .forEach(day=>{

        totalActivities +=
        day.length;

        day.forEach(activity=>{

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
            completed /
            totalActivities *
            100
        );

    }

    progressText.textContent =
    `${progress}%`;

    const circle =
    document.querySelector(".circle");

    circle.style.background =
    `conic-gradient(
        #63d7d8 ${progress}%,
        rgba(255,255,255,.08) 0
    )`;

}