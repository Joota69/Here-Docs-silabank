



let cursosPorCiclo = {};
const botonesContainer = document.getElementById("botones-container");
const cursosDropdown = document.getElementById("cursos-dropdown");

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
    let detalles = document.getElementById('detalles-cursos'); // Asegúrate de que este contenedor está listo en el HTML
    detalles.innerHTML = ""; // Limpiar contenidos anteriores
    detalles.style.display = 'block'; // Preparar el contenedor para nuevos detalles

    cursosPorCiclo[ciclo].forEach(curso => {
        const div = document.createElement('div');
        div.textContent = curso;
        div.className = 'detalle-curso'; // Asumiendo que tienes estilos para esto
        detalles.appendChild(div);
    });

    // Animación para mostrar detalles
    detalles.style.opacity = '0';
    detalles.style.transform = 'translateY(20px)';
    setTimeout(() => {
        detalles.style.opacity = '1';
        detalles.style.transform = 'translateY(0px)';
    }, 100);
}


let currentNode = null; // Almacena el nodo actualmente centrado

document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('click', function() {
        // Alternar la clase 'no-arrow' en cada clic
        this.classList.toggle('no-arrow');

        const rect = this.getBoundingClientRect();
        const centerX = (window.innerWidth / 2) - (rect.left + rect.width / 2); // Centrar horizontalmente

        if (currentNode === this) {
            this.style.transform = '';
            currentNode = null;
        } else {

            if (currentNode) {
                currentNode.style.transform = '';
            }

            this.style.transform = `translateX(${centerX}px)`;
            currentNode = this;
        }

        document.querySelectorAll('.node').forEach(n => {
            if (n !== currentNode) {
                n.classList.toggle('hidden', currentNode !== null);
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', function () {
   

    window.addEventListener('resize', () => {
        // Recalcular la posición en redimensiones para mantener la precisión
        document.querySelectorAll('.node').forEach(node => {
            if (!node.classList.contains('centered')) {
                const rect = node.getBoundingClientRect();
                node.style.left = `${rect.left}px`;
                node.style.top = `${rect.top}px`;
            }
        });
    });
});







// Llamar a la función para cargar los cursos
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





document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        freeMode: true,
        grabCursor: true,
        slideToClickedSlide: true,
        initialSlide: getIndexForCurrentYear() // Configura el slide inicial al año actual
    });

    // Función para obtener el índice del slide del año actual
    function getIndexForCurrentYear() {
        const currentYear = new Date().getFullYear().toString();
        const allSlides = document.querySelectorAll('.swiper-slide');
        for (let i = 0; i < allSlides.length; i++) {
            if (allSlides[i].textContent === currentYear) {
                showContentForYear(currentYear); // Muestra el contenido del año actual
                return i; // Retorna el índice del año actual
            }
        }
        return 0; // Si el año actual no está en los slides, retorna el primer slide
    }

    // Muestra el contenido basado en el año
    function showContentForYear(year) {
        document.querySelectorAll('.content').forEach(content => {
            content.style.display = 'none'; // Oculta todos los contenidos
        });
        const activeContent = document.getElementById('content' + year);
        if (activeContent) {
            activeContent.style.display = 'block'; // Muestra el contenido del año seleccionado
        }
    }

    // Evento clic para cada slide
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.addEventListener('click', function() {
            const selectedYear = this.dataset.year;
            showContentForYear(selectedYear); // Muestra el contenido para el año seleccionado
        });
    });
});