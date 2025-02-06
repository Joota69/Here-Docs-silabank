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











const botonesContainer = document.getElementById("botones-container");
const cursosDropdown = document.getElementById("cursos-dropdown");






let cursosPorCiclo = {};
console.log(cursosPorCiclo);

async function cargarCursos() {
    try {
        const response = await fetch("/Here-Docs-silabank/mallasCurriculares/mallasIngenieriaInformatica/cursos_por_ciclo_informatica_2022.txt"); 
        const texto = await response.text(); 
        procesarTexto(texto); 
        generarBotones(); 
    } catch (error) {
        console.error("Error cargando el archivo:", error);
    }
}

function procesarTexto(texto) {
    const lineas = texto.split("\n").map(linea => linea.trim()); // Separar líneas y limpiar espacios
    let cicloActual = null;

    lineas.forEach(linea => {
        if (linea === "") return; // Ignorar líneas vacías

        if (linea.match(/^(primer|segundo|tercero|cuarto|quinto|sexto|séptimo|octavo|noveno|décimo)$/i)) { 
            cicloActual = linea;
            cursosPorCiclo[cicloActual] = [];
        } else if (cicloActual) {
            cursosPorCiclo[cicloActual].push(linea);
        }
    });
}

function generarBotones() {
    Object.keys(cursosPorCiclo).forEach((ciclo) => {
        const boton = document.createElement("button");
        boton.textContent = ciclo;
        boton.classList.add("ciclo-btn");
        boton.onclick = () => mostrarCursos(ciclo);
        botonesContainer.appendChild(boton);
    });
}

// Función para mostrar los cursos en el dropdown
function mostrarCursos(ciclo) {
    cursosDropdown.innerHTML = ""; // Limpiar opciones previas

    // Agregar una opción por cada curso
    cursosPorCiclo[ciclo].forEach((curso) => {
        const option = document.createElement("option");
        option.textContent = curso;
        cursosDropdown.appendChild(option);
    });
}

// Llamar a la función para cargar los cursos
cargarCursos();
