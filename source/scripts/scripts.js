function abrirCarrera1() {
    let circle1 = document.querySelector(".circleOfCareer");
    let circle2 = document.querySelector(".circleOfInformatica");

    // Fade out and scale down the first circle
    circle1.style.opacity = "0";
    circle1.style.transform = "scale(0.8)";

    setTimeout(() => {
        circle1.style.display = "none";
        circle2.style.display = "flex";

        setTimeout(() => {
            circle2.style.opacity = "1";
            circle2.style.transform = "scale(1)";
        }, 100);
    }, 500); 
}


function abrirCarrera2(){
    let circle1 = document.querySelector(".circleOfCareer");
    let circle2 = document.querySelector(".circleOfAmbiental");

    circle1.style.opacity = "0";
    circle1.style.transform = "scale(0.8)";

    setTimeout(() => {
        circle1.style.display = "none";
        circle2.style.display = "flex";

        setTimeout(() => {
            circle2.style.opacity = "1";
            circle2.style.transform = "scale(1)";
        }, 100);
    }, 500); 
}

function abrirCarrera3(){
    let circle1 = document.querySelector(".circleOfCareer");
    let circle2 = document.querySelector(".circleOfBiomedica");

    circle1.style.opacity = "0";
    circle1.style.transform = "scale(0.8)";

    setTimeout(() => {
        circle1.style.display = "none";
        circle2.style.display = "flex";

        setTimeout(() => {
            circle2.style.opacity = "1";
            circle2.style.transform = "scale(1)";
        }, 100);
    }, 500); 
}

function abrirCarrera4(){
    let circle1 = document.querySelector(".circleOfCareer");
    let circle2 = document.querySelector(".circleOfIndustrial");

    circle1.style.opacity = "0";
    circle1.style.transform = "scale(0.8)";

    setTimeout(() => {
        circle1.style.display = "none";
        circle2.style.display = "flex";

        setTimeout(() => {
            circle2.style.opacity = "1";
            circle2.style.transform = "scale(1)";
        }, 100);
    }, 500); 
}

