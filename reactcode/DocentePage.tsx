function DocentePage() {
    return (
        <div
            className="flex flex-col-reverse md:flex-row items-center justify-center px-6 py-8 gap-8"
            style={{ minHeight: '80vh' }}
        >
            {/* Columna izquierda - 60% */}
            <div className="flex-[0.6] space-y-6 flex flex-col justify-center items-center">
                <p className="text-gray-600 text-md md:text-xl flex justify-center ">
                    <strong>Correo institucional:</strong>&nbsp;peter.montalvo@upch.pe
                </p>

                {/* Descripción del docente */}
                <div
                    className="p-4 rounded-md text-justify shadow-md bg-gray-50 text-md md:text-xl"
                    style={{ maxWidth: '95%', width: '100%' }}>
                    Magíster en informática con mención en Ciencias de la Computación y titulado en Ingeniería de Sistemas, quinto superior, con la capacidad de brindar valor a la información mediante uso de tecnologías de información. Especializado en desarrollo de software, administración de base de datos, análisis de datos y uso de técnicas avanzadas de Machine Learning y Deep Learning.
                </div>

                {/* Etiquetas de habilidades */}
                <div className="flex flex-wrap gap-2 justify-center">
                    <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded font-bold">Inteligencia Artificial</span>
                    <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded font-bold">Desarrollo de Software</span>
                    <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded font-bold">Desarrollo de Software</span>
                </div>
            </div>

            {/* Columna derecha - 40% */}
            <div className="flex-[0.4] flex flex-col items-center justify-center">
                <div className="w-80 h-80 bg-gray-300 rounded-full"></div>
                <p className="font-bold text-xl text-center mt-4">Peter Jonathan Montalvo García</p>
            </div>
        </div>
    );
}

export default DocentePage;
