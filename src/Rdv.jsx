import React, { useState, useEffect } from "react";
import { FaUserMd, FaPhone, FaStar, FaRegStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ListeMedecins = () => {
  const [medecins, setMedecins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => {
        const doctors = response.data.filter(user => user.role === "Médecin");
        setMedecins(doctors);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
        setIsLoading(false);
      });
  }, []);

  const renderEtoiles = (etoile) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          i < etoile ? 
            <FaStar key={i} className="text-yellow-400" /> :
            <FaRegStar key={i} className="text-gray-300" />
        ))}
      </div>
    );
  };

  const handleDoctorClick = (medecin, e) => {
    e.preventDefault();
    navigate("/Confirmer", {
      state: {
        doctor: medecin,
        name: "",
        email: "",
        phone: "",
        symptoms: "",
        description: "",
        selectedTime: ""
      }
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 mb-6 font-['Poppins']">
            Nos Médecins Spécialistes
          </h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-['Playfair_Display'] italic">
            Prenez rendez-vous avec nos experts médicaux qualifiés
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {medecins.map((medecin) => (
              <motion.div
                key={medecin.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div onClick={(e) => handleDoctorClick(medecin, e)} className="cursor-pointer">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative">
                      <div className="h-32 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjAuMjUiIGZpbGw9Im5vbmUiPjwvY2lyY2xlPgo8L3N2Zz4=')]"></div>
                      </div>
                      <div className="absolute -bottom-12 inset-x-0 flex justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                          <img
                            src={medecin.image_url || 'https://via.placeholder.com/100'}
                            alt={`Dr. ${medecin.last_name}`}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-16 pb-6 px-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
                          <FaUserMd className="text-blue-500" />
                          Dr. {medecin.first_name} {medecin.last_name}
                        </h3>
                        <p className="text-blue-600 font-medium mt-1">
                          {medecin.specialite?.specialite || "Médecin Généraliste"}
                        </p>
                        <div className="mt-3 flex justify-center">
                          {renderEtoiles(medecin.etoile)}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-gray-600">
                          <FaPhone className="mr-2 text-blue-500" />
                          <span>{medecin.tel}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MdLocationOn className="mr-2 text-blue-500 text-lg" />
                          <span className="truncate">{medecin.adress}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                      >
                        Prendre Rendez-vous
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ListeMedecins;
