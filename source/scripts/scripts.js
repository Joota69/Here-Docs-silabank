



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
    let detalles = document.getElementById('detalles-cursos');
    var downloadBtn = document.getElementById('download-link');
    var currentText = downloadBtn.textContent;
    var option = downloadOptions[ciclo.toUpperCase()];

    if (option && currentText === option.text) {
        // Si ya está mostrando ese ciclo, volver a la malla completa
        downloadBtn.href = downloadOptions['COMPLETO'].url;
        downloadBtn.textContent = downloadOptions['COMPLETO'].text;
        downloadBtn.style.backgroundColor = downloadOptions['COMPLETO'].color;

        // Ocultar detalles de los cursos
        detalles.style.display = 'none';
        detalles.innerHTML = "";  // Limpia el contenido
    } else {
        // Si no, cambiar al enlace, texto y color del ciclo seleccionado y mostrar los detalles
        downloadBtn.href = option.url;
        downloadBtn.textContent = option.text;
        downloadBtn.style.backgroundColor = option.color;

        // Muestra los detalles de los cursos para el ciclo seleccionado
        detalles.innerHTML = ""; // Primero limpia el contenido anterior
        cursosPorCiclo[ciclo].forEach(curso => {
            const div = document.createElement('div');
            div.textContent = curso;
            div.className = 'detalle-curso';
            detalles.appendChild(div);
        });
        detalles.style.display = 'block'; // Asegúrate de que el contenedor sea visible
    }
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



var downloadOptions = {
    'PRIMER': { url: 'https://drive.google.com/file/d/URL_DE_PRIMER_CICLO', text: 'Descargar Sílabos del Primer Ciclo', color: '#F44336' }, // Rojo
    'SEGUNDO': { url: 'https://drive.google.com/file/d/URL_DE_SEGUNDO_CICLO', text: 'Descargar Sílabos del Segundo Ciclo', color: '#E91E63' }, // Rosa
    'TERCER': { url: 'https://drive.google.com/file/d/URL_DE_TERCER_CICLO', text: 'Descargar Sílabos del Tercer Ciclo', color: '#9C27B0' }, // Púrpura
    'CUARTO': { url: 'https://drive.google.com/file/d/URL_DE_CUARTO_CICLO', text: 'Descargar Sílabos del Cuarto Ciclo', color: '#673AB7' }, // Púrpura oscuro
    'QUINTO': { url: 'https://drive.google.com/file/d/URL_DE_QUINTO_CICLO', text: 'Descargar Sílabos del Quinto Ciclo', color: '#3F51B5' }, // Índigo
    'SEXTO': { url: 'https://drive.google.com/file/d/URL_DE_SEXTO_CICLO', text: 'Descargar Sílabos del Sexto Ciclo', color: '#2196F3' }, // Azul
    'SÉPTIMO': { url: 'https://drive.google.com/file/d/URL_DE_SEPTIMO_CICLO', text: 'Descargar Sílabos del Séptimo Ciclo', color: '#03A9F4' }, // Azul claro
    'OCTAVO': { url: 'https://drive.google.com/file/d/URL_DE_OCTAVO_CICLO', text: 'Descargar Sílabos del Octavo Ciclo', color: '#00BCD4' }, // Cian
    'NOVENO': { url: 'https://drive.google.com/file/d/URL_DE_NOVENO_CICLO', text: 'Descargar Sílabos del Noveno Ciclo', color: '#009688' }, // Verde azulado
    'DÉCIMO': { url: 'https://drive.google.com/file/d/URL_DE_DECIMO_CICLO', text: 'Descargar Sílabos del Décimo Ciclo', color: '#4CAF50' }, // Verde 
    'COMPLETO': { url: 'https://drive.google.com/file/d/URL_DE_LA_MALLA_COMPLETA/view?usp=sharing', text: 'Descargar Malla 2025', color: '#a90a2e' } // Rojo Naranja
};




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