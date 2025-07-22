import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore from "swiper";

function Semesters() {
    const years = [2022, 2023, 2024, 2025];
    const [selectedYear, setSelectedYear] = useState(2024);
    const ciclos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    const swiperRef = useRef<SwiperCore>();

    const handleYearClick = (year: number) => {
        setSelectedYear(year);
        const idx = years.indexOf(year);
        swiperRef.current?.slideTo(idx);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Regresar */}
            <div className="px-6 mt-4">
                <button className="text-black text-sm flex items-center gap-2 hover:underline">
                    ← Regresar
                </button>
            </div>

            {/* Años (Swiper) */}
            <div className="flex justify-center mt-6">
                <Swiper
                    spaceBetween={24}
                    slidesPerView={3}
                    centeredSlides
                    initialSlide={years.indexOf(selectedYear)}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper: SwiperCore) => {
                        const newYear = years[swiper.realIndex];
                        setSelectedYear(newYear);
                    }}
                    className="w-80"
                >
                    {years.map((year, idx) => (
                        <SwiperSlide key={year}>
                            <button
                                className={`text-2xl font-medium transition select-none ${
                                    year === selectedYear
                                        ? "text-black font-bold"
                                        : "text-gray-400"
                                }`}
                                onClick={() => {
                                    // Solo permite cambiar si es el año de la izquierda o derecha
                                    const selectedIdx = years.indexOf(selectedYear);
                                    if (idx === selectedIdx - 1 || idx === selectedIdx + 1) {
                                        handleYearClick(year);
                                    }
                                }}
                                tabIndex={-1} // Opcional: evita tabulación
                                style={{ userSelect: "none" }} // Extra protección
                            >
                                {year}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Ciclos */}
            <div className="mt-10 flex justify-center">
                <div className="flex flex-wrap gap-4 items-center">
                    {ciclos.map((ciclo, idx) => (
                        <div key={ciclo} className="flex items-center">
                            <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm cursor-pointer hover:scale-110 transition">
                                {ciclo}
                            </div>
                            {idx < ciclos.length - 1 && (
                                <div className="w-4 mx-1 text-gray-600">→</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón principal */}
            <div className="mt-12 flex justify-center">
                <button className="bg-[#ab0026] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-800 transition">
                    Descargar plan de estudios
                </button>
            </div>

            {/* Asistente Walky */}
            <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
                <div className="bg-white shadow px-4 py-2 rounded-lg max-w-xs text-sm">
                    Solicitar ayuda para elegir tu plan de cursos ideal con:
                </div>
                <button className="bg-[#ab0026] text-white px-4 py-4 rounded-full shadow-lg font-bold">
                    Walky
                </button>
            </div>
        </div>
    );
}

export default Semesters;
