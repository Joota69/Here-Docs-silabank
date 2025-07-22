import { useState } from "react";
import cayetanoLogo from "./assets/cayetanoLogo.png";
import pfp from "./assets/pfp.png";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-[#a90a2e] shadow-md">
            <div className="container mx-auto flex justify-between py-4 px-6">

                {/* Logo and title */}
                <div className="flex items-center space-x-4 justify-start flex-shrink-0 ml-2">
                    <img src={cayetanoLogo} alt="Logo" className="h-14 w-[14vw] object-contain" />
                    <h1 className="text-2xl font-bold text-white">My Website</h1>
                </div>

                {/* Hamburger for mobile */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Desktop menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    <ul className="flex space-x-8">
                        <li>
                            <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">About</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">Services</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">Contact</a>
                        </li>
                    </ul>

                    {/* Profile picture */}
                    <div className="ml-6">
                        <img
                            src={pfp}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover shadow"
                        />
                    </div>
                </nav>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <nav className="md:hidden bg-[#a90a2e] px-6 pb-4">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">About</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">Services</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">Contact</a>
                        </li>
                    </ul>
                    <div className="mt-4 flex justify-end">
                        <img
                            src={pfp}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover shadow"
                        />
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
