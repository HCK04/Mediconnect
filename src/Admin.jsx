import React, { useState } from "react";
import { Link } from "react-router-dom";


function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleVoirClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const users = [
    {
      name: "Dr. tari9",
      status: "Médecin",
      date: "12/01/2023",
      contact: "tari9@tari9.com",
      role: "Cardiologue",
      imageUrl: "https://robohash.org/mail@ashallendesign.co.uk",
    },
    {
      name: "7amouda belakoul",
      status: "Patient",
      date: "15/02/2022",
      contact: "9irat@tari9.com",
      role: "Patient",
      imageUrl:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      name: "Dr. lokmane",
      status: "Médecin",
      date: "08/11/2021",
      contact: "lokma@tari9.com",
      role: "Pédiatre",
      imageUrl: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
    },
  ];

  return (
    <>
      <section className="container mx-auto p-6 font-sans h-screen mt-12">
        <div className="w-full h-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full h-full overflow-x-auto">
            <table className="w-full h-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Date d'inscris</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.map((user, index) => (
                  <tr className="text-gray-700" key={index}>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={user.imageUrl}
                            alt="Profil"
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-600">{user.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {/* Add capsule-style labels with dynamic colors */}
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold leading-tight rounded-full ${
                          user.status === "Médecin"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">{user.date}</td>
                    <td className="px-4 py-3 text-sm border">{user.contact}</td>
                    <td className="px-4 py-3 text-sm border">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-sm font-medium leading-5 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                          Modifier
                        </button>
                        <button
                          onClick={() => handleVoirClick(user)}
                          className="px-2 py-1 text-sm font-medium leading-5 text-white bg-green-600 rounded-lg hover:bg-green-700"
                        >
                          Voir
                        </button>
                        <button className="px-2 py-1 text-sm font-medium leading-5 text-white bg-red-600 rounded-lg hover:bg-red-700">
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Link to = {"/AjouterForm"}>
        <button className="px-2 py-1 text-sm font-medium leading-5 text-white bg-red-600 rounded-lg hover:bg-red-700">
          Ajouter Utilisateur
        </button>
      </Link>

      {/* card */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96 transition-transform transform scale-95 opacity-100 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Détails de l'utilisateur
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800 text-lg font-bold"
              >
                ×
              </button>
            </div>
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <img
                  src={selectedUser.imageUrl}
                  alt="Profil"
                  className="w-16 h-16 rounded-full border-2 border-indigo-500 mr-6"
                />
                <div>
                  <p className="text-2xl font-semibold text-gray-800">
                    {selectedUser.name}
                  </p>
                  <p className="text-sm text-gray-600">{selectedUser.role}</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p className="text-lg font-medium">
                  Statut:
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold leading-tight rounded-full ${
                      selectedUser.status === "Médecin"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </p>
                <p className="text-lg font-medium">
                  Date d'inscription:{" "}
                  <span className="text-gray-500">{selectedUser.date}</span>
                </p>
                <p className="text-lg font-medium">
                  Contact:{" "}
                  <span className="text-gray-500">{selectedUser.contact}</span>
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
