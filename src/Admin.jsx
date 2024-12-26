import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SupprimerUserAction } from "./redux/actions/adminAction";

function Admin({ setSelectedId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleVoirClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const dispatch = useDispatch();

  function confirmDelete() {
    dispatch(SupprimerUserAction(selectedUser));
    setIsDeleteModalOpen(false);
  }

  function showDeleteCard() {
    setIsDeleteModalOpen(true);
  }

  const users = useSelector((state) => state.AllUsers);

  const handleSearch = () => {
    if (searchBar === "") {
      console.log("Please enter a valid search term");
      return;
    } else {
      const filtered = users.filter((user) => {
        return user.first_name.toLowerCase().includes(searchBar.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchBar.toLowerCase());
      });
      setFilteredUsers(filtered);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <label
        class="mx-auto mt-40 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
        for="search-bar"
      >
        <input
          id="search-bar"
          placeholder="Rechercher un utilisateur  "
          class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />
        <button
          class="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
          onClick={handleSearch}
        >
          <div class="relative">
            <div class="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
              <svg
                class="opacity-0 animate-spin w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>

            <div class="flex items-center transition-all opacity-1 valid:">
              <span class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                Rechercher
              </span>
            </div>
          </div>
        </button>
      </label>

      <section className="container mx-auto p-6 font-sans h-screen mt-12">
        <div className="w-full h-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full h-full overflow-x-auto">
            <table className="w-full h-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Date d'inscris</th>
                  <th className="px-4 py-3">Tel</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {(filteredUsers.length > 0 ? filteredUsers : users).map(
                  (user, index) => (
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
                              {user.last_name} {user.first_name}
                            </p>
                            <p className="text-xs text-gray-600">{user.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold leading-tight rounded-full ${
                            user.role === "Médecin"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm border">{user.date}</td>
                      <td className="px-4 py-3 text-sm border">{user.Tel}</td>
                      <td className="px-4 py-3 text-sm border">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedId(user.id)}
                            className="px-2 py-1 text-sm font-medium leading-5 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleVoirClick(user)}
                            className="px-2 py-1 text-sm font-medium leading-5 text-white bg-green-600 rounded-lg hover:bg-green-700"
                          >
                            Voir
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user.id);
                              showDeleteCard();
                            }}
                            className="px-2 py-1 text-sm font-medium leading-5 text-white bg-red-600 rounded-lg hover:bg-red-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Link to={"/AjouterForm"}>
        <button className="px-2 py-1 text-sm font-medium leading-5 text-white bg-red-600 rounded-lg hover:bg-red-700">
          Ajouter Utilisateur
        </button>
      </Link>

      {/* delete Card */}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-sm">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

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
                      selectedUser.role === "Médecin"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedUser.role}
                  </span>
                </p>
                <p className="text-lg font-medium">
                  Date d'inscription:{" "}
                  <span className="text-gray-500">{selectedUser.date}</span>
                </p>
                <p className="text-lg font-medium">
                  Tel: <span className="text-gray-500">{selectedUser.Tel}</span>
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
