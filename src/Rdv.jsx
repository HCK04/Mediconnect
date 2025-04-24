import React, { useState, useEffect } from "react";
import { FaUserMd, FaPhone, FaStar, FaRegStar, FaCalendarAlt, FaSearch, FaFilter } from "react-icons/fa";
import { MdLocationOn, MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ListeMedecins = () => {
  const [medecins, setMedecins] = useState([]);
  const [filteredMedecins, setFilteredMedecins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedStars, setSelectedStars] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const navigate = useNavigate();

  const starOptions = [
    { value: "", label: "Toutes les étoiles" },
    { value: "5", label: "5 étoiles" },
    { value: "4", label: "4 étoiles et plus" },
    { value: "3", label: "3 étoiles et plus" },
  ];

  const genderOptions = [
    { value: "", label: "Tous les genres" },
    { value: "M", label: "Homme" },
    { value: "F", label: "Femme" },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        const doctors = response.data.filter(user => user.role === "Médecin");
        setMedecins(doctors);
        setFilteredMedecins(doctors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const cities = [...new Set(medecins.map(doctor => {
    const city = doctor.adress.split(',').pop().trim();
    return city;
  }))].sort();

  useEffect(() => {
    const filtered = medecins.filter(doctor => {
      const matchesSearch = doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStars = selectedStars === "" || 
                          (selectedStars === "5" && doctor.etoile === 5) ||
                          (selectedStars === "4" && doctor.etoile >= 4) ||
                          (selectedStars === "3" && doctor.etoile >= 3);
      
      const city = doctor.adress.split(',').pop().trim();
      const matchesCity = selectedCity === "" || city === selectedCity;
      
      const matchesGender = selectedGender === "" || 
                           (selectedGender === "F" && doctor.first_name.match(/^(Sophie|Marie|Anne|Claire)/)) ||
                           (selectedGender === "M" && !doctor.first_name.match(/^(Sophie|Marie|Anne|Claire)/));

      return matchesSearch && matchesStars && matchesCity && matchesGender;
    });
    setFilteredMedecins(filtered);
  }, [searchTerm, selectedStars, selectedCity, selectedGender, medecins]);

  const FiltersSection = () => (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mt-6 border border-gray-100"
        >
          <div className="space-y-6">
            {/* Stars Filter */}
            <div className="filter-group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FaStar className="mr-2 text-yellow-400" />
                Notation
              </label>
              <div className="flex flex-wrap gap-2">
                {starOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStars(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                      ${selectedStars === option.value
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div className="filter-group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <MdLocationOn className="mr-2 text-blue-500" />
                Ville
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCity("")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${selectedCity === ""
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Toutes les villes
                </button>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                      ${selectedCity === city
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="filter-group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FaUserMd className="mr-2 text-blue-500" />
                Genre
              </label>
              <div className="flex gap-2">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedGender(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-1 
                      ${selectedGender === option.value
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          <motion.button
            onClick={() => {
              setSelectedStars("");
              setSelectedCity("");
              setSelectedGender("");
            }}
            className="mt-6 w-full py-2 px-4 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaFilter className="text-gray-400" />
            Réinitialiser les filtres
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderStars = (rating) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          {i < rating ? (
            <FaStar className="w-4 h-4 text-yellow-400" />
          ) : (
            <FaRegStar className="w-4 h-4 text-gray-300" />
          )}
        </motion.span>
      ))}
    </div>
  );

  const DoctorsList = () => (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
    >
      <AnimatePresence mode="wait">
        {filteredMedecins.map((medecin) => (
          <motion.div
            key={medecin.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div 
              onClick={() => navigate("/Confirmer", { state: { doctor: medecin } })}
              className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-20 h-20">
                  <img
                    src={medecin.image_url}
                    alt={`Dr. ${medecin.last_name}`}
                    className="w-full h-full rounded-full object-cover border-2 border-blue-100 group-hover:border-blue-300 transition-colors duration-300"
                  />
                  {medecin.etoile >= 4 && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full">
                      <MdVerified className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full">
                    <FaUserMd className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Dr. {medecin.first_name} {medecin.last_name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm">
                    {medecin.specialite?.specialite || "Médecin Généraliste"}
                  </p>
                  <div className="mt-1">
                    {renderStars(medecin.etoile)}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaPhone className="w-4 h-4 text-blue-500" />
                  <span>{medecin.tel}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MdLocationOn className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="line-clamp-2">{medecin.adress}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <FaCalendarAlt className="w-5 h-5" />
                <span>Prendre Rendez-vous</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-blue-600 font-medium">Chargement des médecins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Nos Médecins Spécialistes
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Prenez rendez-vous avec nos experts médicaux qualifiés en quelques clics
        </p>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Rechercher un médecin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <FaFilter className="text-blue-500" />
              <span>Filtres</span>
            </button>
          </div>

          <FiltersSection />
        </div>
      </motion.div>

      <DoctorsList />

      {filteredMedecins.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-8"
        >
          Aucun médecin ne correspond à votre recherche
        </motion.div>
      )}
    </div>
  );
};

export default ListeMedecins;
