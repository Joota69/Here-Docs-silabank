import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-creative";

import Silabos from "./Silabos";
import UserData from "./User-data";
import Lobby from "./Lobby";

const segments = [0, 1, 2];
const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf"];
const segmentComponents = [Silabos, UserData, Lobby, Silabos];

// Cantidad de segmentos por círculo
const segmentsPerCircle = [4, 3, 1];
const segmentLabelsByCircle = [
    ["Informática", "Ambiental", "Biomédica", "Industrial"],
    ["Química", "Nutrición", "Biología"],
    ["Farmacia y Bioquímica"],
];
const segmentTitles = ["Ingenierías", "Ciencias Naturales y Aplicadas", "Farmacia y Bioquímica"];



function CircleSegments({
    index,
    onClickSegment,
}: {
    index: number;
    onClickSegment: (segmentIndex: number) => void;
}) {
    const segmentCount = segmentsPerCircle[index];
    const segmentTexts = segmentLabelsByCircle[index];
    const size = 220;
    const radius = 105;
    const textRadius = 65;

    if (segmentCount === 1) {
        return (
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${size} ${size}`}
                className="cursor-pointer"
                style={{ maxWidth: size, maxHeight: size }}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill={colors[0]}
                    stroke="#333"
                    strokeWidth={3}
                    className="transition-all duration-300 ease-in-out hover:opacity-70"
                    onClick={() => onClickSegment(index)}
                />
                <text
                    x={size / 2}
                    y={size / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none"
                    fill="#333"
                    fontSize={size / 16}
                    fontWeight="bold"
                >
                    {segmentTexts[0]}
                </text>
            </svg>
        );
    }

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${size} ${size}`}
            className="cursor-pointer"
            style={{ maxWidth: size, maxHeight: size }}
        >
            {Array.from({ length: segmentCount }).map((_, i) => {
                const angle = (Math.PI * 2) / segmentCount;
                const startAngle = i * angle;
                const endAngle = startAngle + angle;

                const x1 = size / 2 + radius * Math.cos(startAngle);
                const y1 = size / 2 + radius * Math.sin(startAngle);
                const x2 = size / 2 + radius * Math.cos(endAngle);
                const y2 = size / 2 + radius * Math.sin(endAngle);

                const textAngle = startAngle + angle / 2;
                const textX = size / 2 + textRadius * Math.cos(textAngle);
                const textY = size / 2 + textRadius * Math.sin(textAngle);

                return (
                    <g key={i}>
                        <path
                            d={`M${size / 2},${size / 2} L${x1},${y1} A${radius},${radius} 0 ${
                                angle > Math.PI ? 1 : 0
                            },1 ${x2},${y2} Z`}
                            fill={colors[i % colors.length]}
                            stroke="#333"
                            strokeWidth={3}
                            className="transition-all duration-300 ease-in-out hover:opacity-70"
                            onClick={() => onClickSegment(index)}
                        />
                        <text
                            x={textX}
                            y={textY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="select-none"
                            fill="#333"
                            fontSize={size / 16}
                            fontWeight="bold"
                        >
                            {segmentTexts[i] || ""}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}


function Careers() {
    const [current, setCurrent] = useState(0);
    const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
    const swiperRef = useRef<SwiperType>();

    const getSegmentLabel = (index: number) => {
        switch (index) {
            case 0:
                return "Estás viendo Informática, Ambiental, Biomedica, Industrial";
            case 1:
                return "Estás viendo Química, Biología, No sé";
            case 2:
                return "Estás viendo Psicología";
            default:
                return "Bienvenido";
        }
    };

    const handleSegmentClick = (segmentIndex: number) => {
        swiperRef.current?.slideToLoop(segmentIndex);
    };

    if (selectedSegment !== null) {
        const SelectedComponent = segmentComponents[selectedSegment];
        return (
            <div className="py-10">
                <button
                    className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => setSelectedSegment(null)}
                >
                    🔙 Volver
                </button>
                <SelectedComponent />
            </div>
        );
    }

    return (
        <div className="w-full px-2 py-8 md:px-8 md:py-16 transition-all duration-500 ease-in-out">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-2">Careers at Heredocs</h2>
            <p className="text-center mb-6 text-gray-700 text-base md:text-lg">
                Swipe para explorar nuestras carreras.
            </p>

            <div className="w-full flex justify-center">
                <div className="w-full max-w-2xl md:max-w-4xl">
                    <Swiper
                        modules={[EffectCreative]}
                        slidesPerView={1.2}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: -120 },
                            1024: { slidesPerView: 3, spaceBetween: -180 },
                        }}
                        centeredSlides
                        spaceBetween={-380}
                        loop={true}
                        onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className="w-full"
                    >
                        {segments.map((index) => (
                            <SwiperSlide key={index}>
                                {({ isActive }) => (
                                    <div
                                        className={`flex flex-col items-center transition-all duration-500 ease-in-out ${
                                            isActive
                                                ? "scale-100 opacity-100 z-20"
                                                : "scale-90 opacity-40 z-10"
                                        }`}
                                        style={{
                                            minHeight: "260px",
                                            maxHeight: "320px",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] flex items-center justify-center">
                                            <CircleSegments
                                                index={index}
                                                onClickSegment={handleSegmentClick}
                                            />
                                        </div>
                                       <p className="mt-2 text-center font-medium text-base md:text-lg">
                                            {segmentTitles[index]}
                                        </p>

                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <p className="text-center mt-6 text-gray-600 transition-opacity duration-500 ease-in-out text-sm md:text-base">
                {getSegmentLabel(current)}
            </p>

            <div className="flex justify-center mt-4 gap-2">
                {segments.map((_, i) => (
                    <span
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                            i === current ? "bg-gray-800" : "bg-gray-300"
                        } transition-colors duration-500 ease-in-out`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Careers;
