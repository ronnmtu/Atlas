// HEADER SCROLL
const header = document.querySelector("#header");

window.addEventListener("scroll", () =>{
    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }
});

const typingElement = document.getElementById("typing");

const words = [
  "Bring your dreams to life",
  "Plan your next adventure",
  "Smooth,Fast,Convenient",
  "Travel with Atlas"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent =
      currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typingElement.textContent =
      currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(type, deleting ? 60 : 120);
}

type();



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

    },4000);

});