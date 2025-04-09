import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const ConfirmRdv = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor } = location.state || {};
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Predefined time slots
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30"
  ];

  // Get booked slots from the database
  useEffect(() => {
    if (doctor && selectedDate) {
      axios
        .get(
          `http://localhost:8000/api/rdv/available-slots/${doctor.id}/${selectedDate}`
        )
        .then((response) => {
          const bookedSlots = response.data;
          const available = timeSlots.filter(
            (slot) => !bookedSlots.includes(slot)
          );
          setAvailableSlots(available);
        })
        .catch((error) => {
          console.error("Error fetching available slots:", error);
          setAvailableSlots(timeSlots); // Fallback to all slots if error
        });
    }
  }, [doctor, selectedDate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    symptoms: "",
    description: "",
    selectedTime: "",
    appointmentDate: ""
  });

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
    try {
      const response = await axios.post("http://localhost:8000/api/rdv", {
        doctor_id: doctor.id,
        patient_name: formData.name,
        patient_email: formData.email,
        patient_phone: formData.phone,
        symptoms: formData.symptoms,
        description: formData.description,
        time_slot: formData.selectedTime,
        appointment_date: selectedDate
      });

      if (response.status === 201) {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Une erreur s'est produite lors de la création du rendez-vous.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Prendre rendez-vous avec Dr. {doctor.first_name} {doctor.last_name}
        </h2>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-6 bg-green-50 rounded-lg"
          >
            <h3 className="text-xl text-green-600 font-semibold">
              Rendez-vous confirmé!
            </h3>
            <p className="text-gray-600 mt-2">
              Vous recevrez bientôt un email de confirmation.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date du rendez-vous
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Créneau horaire
                </label>
                <select
                  name="selectedTime"
                  value={formData.selectedTime}
                  onChange={handleInputChange}
                  required
                  disabled={!selectedDate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un horaire</option>
                  {availableSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Symptômes
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/Rdv")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Retour
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Confirmer le rendez-vous
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ConfirmRdv;
