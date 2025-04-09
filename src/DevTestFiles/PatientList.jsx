import React, { useState, useEffect } from "react";
import { FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Listepatients = () => {
  const [medecins, setMedecins] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users") // Your API endpoint
      .then((response) => {
        // Filter only the doctors (role = 'Médecin')
        const doctors = response.data.filter(user => user.role === "Patient");
        setMedecins(doctors); // Set the filtered doctors to state
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []); // Empty array ensures the effect runs once, when the component mounts

  const renderEtoiles = (etoile) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-${i < etoile ? "yellow" : "gray"}-500`}>
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Liste des patients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Iterate over the filtered doctors (medecins) */}
        {medecins.map((medecin) => (
          <Link key={medecin.id} to={`/doctor/${medecin.id}`} className="hover:no-underline">
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col items-center text-center">
                <img
                  src={medecin.image_url} // Use image_url from the API response
                  alt="Profile"
                  className="w-20 h-20 rounded-full mb-4 border-2 border-blue-500"
                />
                <h3 className="text-xl font-semibold flex items-center text-gray-800">
                  <FaUserMd className="text-blue-500 mr-2" />
                  {medecin.first_name} {medecin.last_name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {medecin.role} - {medecin.role_code === 1 ? medecin.specialite?.specialite : medecin.maladie?.maladie}
                </p>
                <p className="text-gray-500 text-sm mt-1">Tel: {medecin.tel}</p>
                <div className="mt-3">{renderEtoiles(medecin.etoile)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listepatients;
