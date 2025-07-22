type Course = {
    title: string;
    credits: number;
    cycle: string;
    status: 'Pendiente' | 'Desaprobado' | 'Nuevo';
    color: string;
};

const courses: Course[] = [
    { title: 'Taller de Gimnasio', credits: 1, cycle: 'I', status: 'Pendiente', color: 'bg-blue-200' },
    { title: 'Cálculo Vectorial', credits: 4, cycle: 'III', status: 'Desaprobado', color: 'bg-blue-200' },
    { title: 'Física para Ingeniería 3', credits: 4, cycle: 'IV', status: 'Pendiente', color: 'bg-blue-200' },
    { title: 'Comunicación de Datos y Redes', credits: 4, cycle: 'V', status: 'Desaprobado', color: 'bg-blue-200' },
    { title: 'Desarrollo Profesional I', credits: 4, cycle: 'VI', status: 'Nuevo', color: 'bg-blue-200' },
    { title: 'Métodos Numéricos', credits: 4, cycle: 'VII', status: 'Pendiente', color: 'bg-yellow-300' },
];

function EnrollmentPlan() {
    return (
        <div className="px-8 py-10 bg-white text-black">
            <h1 className="text-3xl font-bold text-center mb-10">Mi plan de matrícula inteligente</h1>

            {/* Cards de cursos */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
                {courses.map((course, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <div className={`relative p-4 rounded-lg shadow-md flex flex-col items-center justify-between ${course.color} min-h-[140px] w-full`}>
                            <h3 className="text-sm font-semibold text-center mb-3 leading-tight">{course.title}</h3>
                        </div>
                        <div className="flex flex-col items-center mt-2 gap-1">
                            <div
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${course.status === 'Pendiente'
                                    ? 'bg-gray-300 text-gray-700'
                                    : course.status === 'Desaprobado'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-green-400 text-white'
                                    }`}
                            >
                                {course.status}
                            </div>
                            <div>
                                <span className="px-3 py-1 rounded-lg bg-gray-200 text-gray-800 text-xs font-bold">
                                    Créditos: {course.credits}
                                </span>
                            </div>
                            <div>
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-yellow-900 font-bold text-xs">
                                    {course.cycle}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contenedor inferior completo */}
            <div className="flex flex-col md:flex-row gap-8 w-full mb-10">
                {/* Barra de progreso y leyenda */}
                <div className="flex-1 flex flex-col items-start justify-between gap-4">
                    {/* Barra */}
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-2 w-full">
                            <div className="font-semibold text-left">Créditos usados:</div>
                            <div className="font-bold text-right">
                                {courses.reduce((acc, c) => acc + c.credits, 0)}/30
                            </div>
                        </div>
                        {(() => {
                            const totalCredits = 30;
                            const usedCredits = courses.reduce((acc, c) => acc + c.credits, 0);
                            const colorCredits: Record<string, number> = {};
                            courses.forEach(c => {
                                colorCredits[c.color] = (colorCredits[c.color] || 0) + c.credits;
                            });
                            const sortedColors = Object.entries(colorCredits).sort((a, b) => b[1] - a[1]);
                            const leftColor = sortedColors.length > 0 ? sortedColors[0][0] : "bg-gray-300";
                            const rightColor =
                                usedCredits < totalCredits
                                    ? "bg-gray-300"
                                    : sortedColors.length > 0
                                        ? sortedColors[sortedColors.length - 1][0]
                                        : "bg-gray-300";
                            return (
                                <div className="relative flex items-center w-full">
                                    <span className={`w-10 h-10 rounded-full absolute -left-3 z-10 ${leftColor}`} />
                                    <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden flex relative">
                                        {sortedColors.map(([color, credits]) => (
                                            <div
                                                key={color}
                                                className={`h-full ${color}`}
                                                style={{
                                                    width: `${(credits / totalCredits) * 100}%`
                                                }}
                                            />
                                        ))}
                                        {usedCredits < totalCredits && (
                                            <div
                                                className="h-full bg-gray-300"
                                                style={{
                                                    width: `${((totalCredits - usedCredits) / totalCredits) * 100}%`
                                                }}
                                            />
                                        )}
                                    </div>
                                    <span className={`w-10 h-10 rounded-full absolute -right-3 z-10 ${rightColor}`} />
                                </div>
                            );
                        })()}
                    </div>

                    {/* Leyenda de colores */}
                    <div className="flex flex-col items-start text-xs mt-2 font-medium gap-2 w-full">
                        {(() => {
                            const colorCreditType: Record<string, string> = {
                                "bg-blue-200": "Cursos regulares",
                                "bg-yellow-300": "Cursos electivos",
                                "bg-red-200": "Cursos complementarios",
                            };
                            const usedColors = Array.from(new Set(courses.map(c => c.color)));
                            return (
                                <>
                                    {usedColors.map(color => (
                                        <span key={color} className="flex items-center gap-2">
                                            <span className={`inline-block w-4 h-4 rounded-full ${color}`} />
                                            <span>{colorCreditType[color] || color}</span>
                                        </span>
                                    ))}
                                </>
                            );
                        })()}
                    </div>

                    {/* Botón */}
                    <div className="text-center w-full">
                        <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-all text-sm font-semibold w-full md:w-auto">
                            descargar mi plan de estudios
                        </button>
                    </div>
                </div>

                {/* Asistente Walky */}
                <div className="flex flex-col items-center gap-2 w-full md:max-w-[300px] bg-gray-100 p-4 rounded-lg">
                    <div className="relative w-full mb-2">
                        <div className="bg-white rounded-lg shadow px-4 py-3 text-sm leading-relaxed">
                            Esta es la <strong>ruta académica</strong> que mejor se adecúa a tu <strong>situación actual</strong>, considerando:
                            <ul className="list-disc ml-5 mt-1">
                                <li>cursos desaprobados</li>
                                <li>créditos disponibles</li>
                                <li>reglas institucionales</li>
                            </ul>
                            <br />
                            Te ayudará a nivelarte sin sobrecargar tu matrícula, <strong>maximizando tu progreso</strong>.
                        </div>
                        <div className="absolute left-6 -bottom-3 w-4 h-4 bg-white rounded-tl-full rotate-45 shadow" />
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <span className="text-5xl" role="img" aria-label="Walky">🧑‍🎓</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnrollmentPlan;
