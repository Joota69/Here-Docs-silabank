import pfp from './assets/pfp.png';

function UserData() {
    return (
        <div className="flex w-screen h-screen bg-gray-100 items-center">
            <div className="flex-[4] bg-gray-300 m-4 rounded-xl h-[70vh] flex flex-col items-center justify-between py-8">
                <div className="font-bold text-xl">Texto en negrita encima</div>
                <div className="flex items-center justify-center">
                    <img
                        src={pfp}
                        alt="Perfil"
                        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                </div>
                <div className="italic text-lg">Texto grande en italic abajo</div>
            </div>
            <div className="flex-[6] bg-gray-400 m-4 rounded-xl h-[70vh] flex flex-col py-8">
                <div className="font-bold text-xl mb-4 text-center">Texto en negrita arriba</div>
                <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 px-4">
                    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-4">
                        <div className="font-semibold mb-2">Texto 1</div>
                        <img
                            src={pfp}
                            alt="Perfil 1"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-4">
                        <div className="font-semibold mb-2">Texto 2</div>
                        <img
                            src={pfp}
                            alt="Perfil 2"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-4">
                        <div className="font-semibold mb-2">Texto 3</div>
                        <img
                            src={pfp}
                            alt="Perfil 3"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-4">
                        <div className="font-semibold mb-2">Texto 4</div>
                        <img
                            src={pfp}
                            alt="Perfil 4"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserData;
