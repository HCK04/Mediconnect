import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const ConfirmRdv = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor } = location.state || {};
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    symptoms: "",
    description: "",
    selectedTime: "",
    gender: "",
    age: "",
    insurance: "",
    emergencyContact: "",
    previousConditions: "",
    currentMedications: "",
    allergies: ""
  });

  // Liste des symptômes prédéfinis
  const symptomsList = [
    "Fièvre",
    "Douleurs musculaires",
    "Maux de tête",
    "Fatigue",
    "Toux",
    "Difficultés respiratoires",
    "Douleurs abdominales",
    "Autre"
  ];

  // Fetch available slots when component mounts
  useEffect(() => {
    if (doctor?.id) {
      const fetchAvailableSlots = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8000/api/rdv/available-slots/${doctor.id}`
          );
          console.log('Available slots:', response.data);
          setAvailableSlots(response.data.available_slots || []);
        } catch (error) {
          console.error('Error fetching available slots:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAvailableSlots();
    }
  }, [doctor]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!location.state) {
    return <div>Erreur: Aucun médecin sélectionné.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.selectedTime) {
      alert("Veuillez sélectionner un horaire");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/rdv", {
        doctor_id: doctor.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        symptoms: formData.symptoms,
        description: formData.description,
        selectedTime: formData.selectedTime,
        gender: formData.gender,
        age: formData.age,
        insurance: formData.insurance,
        emergencyContact: formData.emergencyContact,
        previousConditions: formData.previousConditions,
        currentMedications: formData.currentMedications,
        allergies: formData.allergies
      });

      console.log('Appointment created:', response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error creating appointment:', error.response?.data || error.message);
      alert(error.response?.data?.message || "Une erreur s'est produite lors de la création du rendez-vous");
    }
  };

  const TimeSlotSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Horaires Disponibles
      </h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {availableSlots.map((time) => (
                <motion.button
                  key={time}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, selectedTime: time }))}
                  className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 
                    ${formData.selectedTime === time 
                      ? 'bg-blue-500 text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {time}
                  {formData.selectedTime === time && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="text-gray-500 text-lg font-medium">
                Aucun créneau disponible aujourd'hui
              </p>
              <p className="text-gray-400 mt-2">
                Veuillez réessayer un autre jour
              </p>
            </div>
          )}
        </div>
      )}

      {formData.selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100"
        >
          <p className="text-blue-800 font-medium text-center">
            Horaire sélectionné: {formData.selectedTime}
          </p>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-800">Rendez-vous enregistré</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Informations du Patient</h3>
                <p><span className="font-medium">Nom:</span> {formData.name}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">Téléphone:</span> {formData.phone}</p>
                <p><span className="font-medium">Genre:</span> {formData.gender}</p>
                <p><span className="font-medium">Âge:</span> {formData.age}</p>
                <p><span className="font-medium">Assurance:</span> {formData.insurance}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Détails du Rendez-vous</h3>
                <p><span className="font-medium">Médecin:</span> Dr. {doctor.first_name} {doctor.last_name}</p>
                <p><span className="font-medium">Horaire:</span> {formData.selectedTime}</p>
                <p><span className="font-medium">Symptômes:</span> {formData.symptoms}</p>
                <p><span className="font-medium">Description:</span> {formData.description}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="bg-yellow-50 border-l-4 border-green-500 p-4 rounded">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-green-500">
                    En attente de confirmation par le médecin
                  </p>
                </div>
                <p className="mt-2 text-sm text-green-500">
                  Vous recevrez un email dès que le médecin aura confirmé votre rendez-vous.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/Rdv')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Retour à la liste des médecins
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Doctor Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
                <img
                  src={doctor?.image_url || 'default-doctor.jpg'}
                  alt={doctor?.first_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Dr. {doctor?.first_name} {doctor?.last_name}
                </h2>
                <p className="text-lg text-blue-600 font-medium">
                  {doctor?.specialite?.specialite || "Médecin Généraliste"}
                </p>
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Personal Information Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Informations Personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info Fields */}
                <motion.div
                  className="space-y-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="votre@email.com"
                    />
                  </div>
                </motion.div>

                {/* Additional Info Fields */}
                <motion.div
                  className="space-y-6"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Âge</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="120"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Informations Médicales
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Symptômes</label>
                  <select
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Sélectionner les symptômes</option>
                    {symptomsList.map(symptom => (
                      <option key={symptom} value={symptom}>{symptom}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description détaillée</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Décrivez vos symptômes en détail..."
                  />
                </div>
              </div>
            </div>

            {/* Time Slot Section */}
            <TimeSlotSection />

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <motion.button
                type="button"
                onClick={() => navigate("/Rdv")}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Retour
              </motion.button>
              <motion.button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Confirmer le rendez-vous
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </div>
  );
};

export default ConfirmRdv;
