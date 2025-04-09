import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./img/MdConnectLogo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Track if the navbar is expanded

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle navbar expansion
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 w-full py-3 shadow-lg shadow-gray-300 backdrop-blur-lg bg-white bg-opacity-80 md:top-0 lg:max-w-screen-xl border-b border-gray-200 transition-all duration-300 ease-in-out ${
        scrolled ? "-translate-x-full" : ""
      }`}
    >
      <div className="px-5">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Mediconnect Logo"
              className="h-4 w-8 object-contain" // Made the logo smaller
            />
            <h3 className="text-xl font-bold text-blue-700 tracking-wide"> {/* Smaller text size */}
              MEDICONNECT
            </h3>
          </Link>

          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 text-gray-600 transition duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={toggleNavbar}
            aria-label="Toggle Navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation Links (Only visible when expanded) */}
          <nav
            className={`${
              isOpen ? "flex" : "hidden"
            } md:flex md:items-center md:gap-8 transition-all duration-300 ease-in-out`}
          >
            <Link
              to="/Rdv"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:bg-blue-100 hover:text-blue-800"
            >
              Rendez-vous
            </Link>
            <Link
              to="/doctor/1"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:bg-blue-100 hover:text-blue-800"
            >
              Parler à un Docteur
            </Link>
            <Link
              to="/Patients"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:bg-blue-100 hover:text-blue-800"
            >
              Espace Docteur
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to=""
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 shadow transition duration-200 hover:bg-gray-200 hover:shadow-md"
            >
              Se Connecter
            </Link>

            <Link
              to=""
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow transition duration-200 hover:bg-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
      {/* Expanding Navbar when clicked */}
      <div
        className={`md:hidden fixed top-0 right-0 z-20 w-64 h-full bg-white border-l border-gray-200 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center mt-8">
          <Link
            to="/Rdv"
            className="w-full text-center py-4 text-lg font-medium text-gray-600 transition duration-200 hover:bg-blue-100 hover:text-blue-800"
          >
            Rendez-vous
          </Link>
          <Link
            to="/doctor/1"
            className="w-full text-center py-4 text-lg font-medium text-gray-600 transition duration-200 hover:bg-blue-100 hover:text-blue-800"
          >
            Parler à un Docteur
          </Link>
          <Link
            to="/Patients"
            className="w-full text-center py-4 text-lg font-medium text-gray-600 transition duration-200 hover:bg-blue-100 hover:text-blue-800"
          >
            Espace Docteur
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
