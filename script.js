// HEADER SCROLL
const header = document.querySelector("#header");

window.addEventListener("scroll", () =>{
    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }
});

// HERO SLIDES

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide(){
    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if(currentSlide >= slides.length){
        
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
}

setInterval(changeSlide,5000);

// ENQUIRY FORM

const enquiryForm = document.querySelector("#enquiry-form");

const messageBox = document.querySelector("#formMessage");

enquiryForm.addEventListener("submit",function(event){

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();

    const email = document.querySelector("#email").value.trim();

    const question = document.querySelector("#question").value.trim();

    messageBox.className = "";
    messageBox.style.display = "none";

    // Empty form

    if(name === "" && email === "" && question === ""){

        messageBox.classList.add("error");

        messageBox.style.display = "block";

        messageBox.textContent = "Please complete the form before submiting.";

        return;
    }

    // Missing fields

    if(name === "" || email === "" || question === ""){

        messageBox.classList.add("error");

        messageBox.style.display = "block";

        messageBox.textContent = "Please fill in all required fields."

        return;
    }

    // Message too short

    if(question.length < 10){

        messageBox.classList.add("error");

        messageBox.style.display = "block";

        messageBox.textContent = "Question must contain at least 10 characters."

        return;
    }

    // SUCCESSFUL SUBMISSION

    messageBox.classList.add("success");

    messageBox.style.display = "block";

    messageBox.textContent = "Your enquiry has been submitted successfully! Our team will contact you soon";

    enquiryForm.reset();

    setTimeout(function(){

        document.querySelector("#parallax2")
        .scrollIntoView({
            behavior:"smooth"});

    },2500);

});