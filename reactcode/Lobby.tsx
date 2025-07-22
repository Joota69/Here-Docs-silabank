import React, { useState } from "react";
import tano from './assets/tano.png';

const SEGMENTS = [
    { color: "red", label: "Segmento 1" },
    { color: "yellow", label: "Segmento 2" },
    { color: "green", label: "Segmento 3" },
    { color: "blue", label: "Segmento 4" },
];

function darkenColor(color: string, amount: number) {
    const colors: Record<string, string> = {
        red: "#b71c1c",
        yellow: "#fbc02d",
        green: "#388e3c",
        blue: "#1976d2",
    };
    return colors[color] || color;
}

function CircleSegments() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 96 96"
            className="rounded-full"
            overflow="visible"
            style={{ display: "block" }}
        >
            {SEGMENTS.map((seg, i) => {
                const isHovered = hovered === i;
                const startAngle = (i * 90) - 90;
                const endAngle = ((i + 1) * 90) - 90;
                const radius = isHovered ? 54 : 48;
                const center = 48;

                const start = {
                    x: center + radius * Math.cos((Math.PI / 180) * startAngle),
                    y: center + radius * Math.sin((Math.PI / 180) * startAngle),
                };
                const end = {
                    x: center + radius * Math.cos((Math.PI / 180) * endAngle),
                    y: center + radius * Math.sin((Math.PI / 180) * endAngle),
                };

                return (
                    <path
                        key={i}
                        d={`M${center},${center} L${start.x},${start.y} A${radius},${radius} 0 0,1 ${end.x},${end.y} Z`}
                        fill={isHovered ? darkenColor(seg.color, 0.2) : seg.color}
                        opacity={isHovered ? 1 : 1}
                        style={{
                            cursor: "pointer",
                            transition: "opacity 0.2s, fill 0.2s, d 0.2s",
                        }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    />
                );
            })}
            <circle cx={48} cy={48} r={30} fill="white" />
        </svg>
    );
}

function Lobby() {
    return (
        <div
            className="flex flex-col md:flex-row justify-between items-center gap-16"
            style={{
                height: "90vh",
                marginLeft: "4rem",
                marginRight: "4rem",
            }}
        >
            <div className="flex-1 flex items-center justify-center h-full">
                <div style={{ width: "100%", height: "100%", padding: "5vw", overflow: "show" }}>
                    <CircleSegments />
                </div>
            </div>

            <div>
                <p>Elige tu facultad</p>
                <img
                    src={tano}
                    alt="Imagen central"
                    className="w-24 h-24 rounded-full"
                />
            </div>




            <div className="flex-1 flex items-center justify-center h-full">
                <div style={{ width: "100%", height: "100%", padding: "5vw", overflow: "show" }}>
                    <CircleSegments />
                </div>
            </div>
        </div>
    );
}

export default Lobby;
