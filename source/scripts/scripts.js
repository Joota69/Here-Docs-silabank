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
    setTimeout(() => {
        window.location.href = "/source/html/informatica.html";
    }, 3000);
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












let cursosPorCiclo = {};
const botonesContainer = document.getElementById("cursos-container");

async function cargarCursos() {
    try {
        const response = await fetch("/mallasCurriculares/mallasIngenieriaInformatica/cursos_por_ciclo_informatica_2022.txt"); 
        const texto = await response.text(); 
        procesarTexto(texto); 
        asignarEventosBotones(); 
    } catch (error) {
        console.error("Error cargando el archivo:", error);
    }
}

function procesarTexto(texto) {
    const lineas = texto.split("\n").map(linea => linea.trim()); 
    let cicloActual = null;

    lineas.forEach(linea => {
        if (linea === "") return; 

        if (linea.match(/^(primer|segundo|tercer|cuarto|quinto|sexto|séptimo|octavo|noveno|décimo)$/i)) { 
            cicloActual = linea;
            cursosPorCiclo[cicloActual] = [];
        } else if (cicloActual) {
            cursosPorCiclo[cicloActual].push(linea);
        }
    });
}


function asignarEventosBotones() {
    const ciclos = Object.keys(cursosPorCiclo);
    ciclos.forEach((ciclo, index) => {
        const boton = document.getElementById(ciclo);
        if (boton) {
            boton.onclick = () => mostrarCursos(ciclo);
        }
    });
}


function mostrarCursos(ciclo) {
    botonesContainer.innerHTML = ""; // Limpiar opciones previas

    cursosPorCiclo[ciclo].forEach((curso) => {
        const button = document.createElement("button");
        button.textContent = curso;
        button.classList.add("curso-button");
        botonesContainer.appendChild(button);
    });

    descargarSilabosPorCiclo(ciclo);
}

cargarCursos();


function descargarSilabosPorCiclo(ciclo) {

    const botonDescargar = document.getElementById("descargarMallaoCurso");
    botonDescargar.style.backgroundColor = "blue";  
    botonDescargar.textContent = `Descargar sílabos de ${ciclo}`;
    let linkMap = {
        "primer": "https://drive.google.com/drive/folders/1ZPwgFELx13X4s9UxwPBBiOq3K5aZIQC6?usp=sharing",
        "segundo": "https://drive.google.com/drive/folders/14flvnkyqOT7pIApHCeRjPzGN9sZqSP1q?usp=sharing",
        "tercer": "https://drive.google.com/drive/folders/1II8rec5Fc3wX3AihE4OBO79BHeJZAhRG?usp=drive_link",
        "cuarto": "https://drive.google.com/drive/folders/1_u991sNitQEBR_AG3Az9ec_gzW0FWj9v?usp=drive_link",
        "quinto": "https://drive.google.com/drive/folders/1tSiM3pj5pOp2VvDrZiLpd56Db9FhjRj8?usp=drive_link",
        "sexto": "https://drive.google.com/drive/folders/1Ukl3UTE4yAVkfxEo4auive-ZxU_w0gfa?usp=drive_link",
        "séptimo": "https://drive.google.com/drive/folders/1_TofLWrDz5_W8xqkWwziIhR5ZBDXmV_s?usp=drive_link",
        "octavo": "https://drive.google.com/drive/folders/1dfoWHFm3LQngqcbudoXD5b0HVdqkE92N?usp=drive_link",
        "noveno": "https://drive.google.com/drive/folders/1ngdPCQPcrKVuGCUJjVlvp3UPwJQENUsZ?usp=drive_link",
        "décimo": "https://drive.google.com/drive/folders/1iZlGR_0GC7rq0S0fiy_xZc0F-MNco2y-?usp=drive_link"
    };

    if (linkMap[ciclo.toLowerCase()]) {
        botonDescargar.href = linkMap[ciclo.toLowerCase()];
    } else {
        botonDescargar.href = "#"; 
    }
    botonDescargar.onclick = () => {
        const cursosSeleccionados = Array.from(cursosDropdown.selectedOptions).map(option => option.textContent);
        descargarSilabos(ciclo, cursosSeleccionados);
    };

}


