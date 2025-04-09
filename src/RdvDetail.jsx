import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RdvDetail = ({ history }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const users = useSelector((state) => state.AllUsers);
  const doctor = users.find((user) => user.id === Number(id));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!doctor) {
    return <div>Docteur non trouvé</div>;
  }

  // Handle the click on a time slot
  const handleTimeClick = (time) => {
    if (doctor.bookedTimes.includes(time)) {
      alert("Ce créneau horaire est déjà réservé.");
    } else {
      setSelectedTime(time);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTime) {
      // Pass the data directly through props to the next component
      navigate("/Confirmer", {
        state: {
          name,
          email,
          phone,
          symptoms,
          description,
          selectedTime,
          doctor,
        },
      });
    } else {
      alert("Veuillez sélectionner un créneau horaire.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center mb-6">
        <img
          src={doctor.imageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold">{doctor.first_name} {doctor.last_name}</h2>
        <p className="text-lg text-gray-600">{doctor.specialite ? doctor.specialite.specialite : 'Non spécifié'}</p>
        <p className="text-sm text-gray-500">Téléphone: {doctor.tel}</p>
        <p className="text-sm text-gray-500">Adresse: {doctor.adress}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            placeholder="Votre Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Votre Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="text"
            placeholder="Votre Téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Symptômes</label>
          <select
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="douleur-poitrine">Douleur à la poitrine</option>
            <option value="essoufflement">Essoufflement</option>
            <option value="fatigue">Fatigue excessive</option>
            <option value="vertiges">Vertiges</option>
            <option value="palpitations">Palpitations cardiaques</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description des symptômes</label>
          <textarea
            placeholder="Décrivez vos symptômes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mt-4">Sélectionner l'heure</label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {doctor.availableTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeClick(time)}
                className={`w-full py-1 text-center rounded-md text-sm ${
                  doctor.bookedTimes.includes(time)
                    ? "bg-gray-300 cursor-not-allowed"
                    : selectedTime === time
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 hover:bg-green-400"
                }`}
                disabled={doctor.bookedTimes.includes(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {selectedTime && (
          <p className="mt-2 text-center text-lg">
            Vous avez sélectionné le créneau: {selectedTime}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full"
        >
          Confirmer le rendez-vous
        </button>
      </form>
    </div>
  );
};

export default RdvDetail;
