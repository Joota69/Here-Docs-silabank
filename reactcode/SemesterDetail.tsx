import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore from "swiper";

function SemesterDetail() {
    const years = [2022, 2023, 2024, 2025];
    const [selectedYear, setSelectedYear] = useState(2024);
    const ciclo = "I";

    const leftNote = "¡No olvides matricularte en los cursos electivos de tu carrera!";
    const rightNote = "¡Recuerda que debes llevar al menos 4 cursos complementarios a lo largo de tu carrera!";

    const courses = [
        "Cálculo Diferencial",
        "Álgebra Lineal",
        "Filosofía",
        "I. a la Ingeniería Informática",
        "Comunicación y Redacción",
        "Química General",
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="bg-[#ab0026] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Logo_Universidad_Peruana_Cayetano_Heredia.png/640px-Logo_Universidad_Peruana_Cayetano_Heredia.png"
                        alt="Logo UPCH"
                        className="h-10"
                    />
                    <h1 className="text-xl font-bold">WALKY</h1>
                </div>
                <nav className="hidden md:flex gap-6 text-sm">
                    <a href="#" className="hover:underline">Inicio</a>
                    <a href="#" className="hover:underline">Sobre nosotros</a>
                    <a href="#" className="hover:underline">Contacto</a>
                </nav>
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">👤</span>
                </div>
            </header>

            {/* Regresar */}
            <div className="px-6 mt-4">
                <button className="text-black text-sm flex items-center gap-2 hover:underline">
                    ← Regresar
                </button>
            </div>

            {/* Swiper Años */}
            <div className="flex justify-center mt-6">
                <Swiper
                    spaceBetween={24}
                    slidesPerView={3}
                    centeredSlides
                    initialSlide={years.indexOf(selectedYear)}
                    onSlideChange={(swiper: SwiperCore) => {
                        const newYear = years[swiper.realIndex];
                        setSelectedYear(newYear);
                    }}
                    className="w-80"
                >
                    {years.map((year) => (
                        <SwiperSlide key={year}>
                            <button
                                className={`text-2xl font-medium transition ${year === selectedYear
                                        ? "text-black font-bold"
                                        : "text-gray-400"
                                    }`}
                            >
                                {year}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Mensajes motivacionales y ciclo */}
            <div className="flex justify-center items-center mt-6 px-4 text-center">
                <div className="w-1/3 text-sm text-gray-600 flex-1 text-left">{leftNote}</div>
                <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-xl mx-4">
                    {ciclo}
                </div>
                <div className="w-1/3 text-sm text-gray-600 flex-1 text-right">{rightNote}</div>
            </div>

            {/* Lista de cursos */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 px-4">
                {courses.map((course, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-100 rounded-lg p-4 shadow w-48 flex flex-col gap-2 items-center"
                    >
                        <h3 className="text-center font-medium text-sm">{course}</h3>
                        <button className="bg-white text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-200">
                            Descargar sílabo
                        </button>
                       <button className="bg-white text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-200">
                            Ver al Docente
                        </button>
                    </div>
                ))}
            </div>

            {/* Botones de acción */}
            <div className="mt-12 flex justify-center gap-6 flex-wrap px-4">
                <button className="bg-[#ab0026] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-800 transition">
                    Descargar todos los sílabos
                </button>
                <button className="bg-[#ab0026] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-800 transition">
                    Solicitar ayuda para elegir mi plan de cursos ideal
                </button>
            </div>

            {/* Asistente Walky (opcional) */}
            <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
                <div className="bg-white shadow px-4 py-2 rounded-lg max-w-xs text-sm">
                    Solicitar ayuda para elegir tu plan de cursos ideal con:
                </div>
                <button className="bg-[#ab0026] text-white px-4 py-2 rounded-full shadow-lg font-bold">
                    Walky
                </button>
            </div>
        </div>
    );
}

export default SemesterDetail;
