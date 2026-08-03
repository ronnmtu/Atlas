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

setInterval(changeSlide,7000);
