import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Admin({ setSelectedId }) {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    tel: "",
    adress: "",
    role: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'delete' or 'update'

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setIsDeleteModalOpen(false);
      setSuccessMessage("L'utilisateur a été supprimé avec succès");
      setMessageType("delete");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit user
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/users/${selectedUser.id}`,
        editForm
      );
      fetchUsers(); // Refresh the users list
      setIsEditModalOpen(false);
      setSuccessMessage("L'utilisateur a été modifié avec succès");
      setMessageType("update");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Search functionality
  const handleSearch = () => {
    const filtered = users.filter((user) => {
      const searchTerm = searchBar.toLowerCase();
      return (
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.tel.includes(searchTerm)
      );
    });
    setFilteredUsers(filtered);
  };

  // View user details
  const handleVoirClick = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${userId}`
      );
      setSelectedUser(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="container mx-auto px-10">
      {/* Success Message - Fixed at top */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-0 left-0 right-0 z-50 ${
            messageType === "delete" ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-3">
              {messageType === "delete" ? (
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              <p
                className={`text-lg font-semibold ${
                  messageType === "delete" ? "text-red-700" : "text-green-700"
                }`}
              >
                {successMessage}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Bar */}
      <label className="mx-auto mt-40 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
        <input
          id="search-bar"
          placeholder="Rechercher un utilisateur"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />
        <button
          className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
          onClick={handleSearch}
        >
          <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
            Rechercher
          </span>
        </button>
      </label>

      {/* Add User Button */}
      <div className="flex justify-center mt-10">
        <Link to="/AjouterForm">
          <button className="px-4 py-2 text-sm font-medium leading-5 text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Ajouter Utilisateur</span>
          </button>
        </Link>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3">Utilisateur</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Date d'inscription</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
              <tr key={user.id} className="text-gray-700">
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
                        : user.role === "Patient"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "Admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm border">{user.date}</td>
                <td className="px-4 py-3 text-sm border">{user.tel}</td>
                <td className="px-4 py-3 text-sm border">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setEditForm({
                          first_name: user.first_name,
                          last_name: user.last_name,
                          tel: user.tel,
                          adress: user.adress,
                          role: user.role,
                        });
                        setIsEditModalOpen(true);
                      }}
                      className="px-2 py-1 text-sm font-medium leading-5 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleVoirClick(user.id)}
                      className="px-2 py-1 text-sm font-medium leading-5 text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(user.id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="px-2 py-1 text-sm font-medium leading-5 text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              Détails de l'utilisateur
            </h2>
            <div className="space-y-3">
              <div>
                <p>
                  <strong>Nom:</strong> {selectedUser.first_name}{" "}
                  {selectedUser.last_name}
                </p>
                <p>
                  <strong>Rôle:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Téléphone:</strong> {selectedUser.tel}
                </p>
                <p>
                  <strong>Adresse:</strong> {selectedUser.adress}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Modifier l'utilisateur</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block">Prénom</label>
                <input
                  type="text"
                  value={editForm.first_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, first_name: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Nom</label>
                <input
                  type="text"
                  value={editForm.last_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, last_name: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Téléphone</label>
                <input
                  type="text"
                  value={editForm.tel}
                  onChange={(e) =>
                    setEditForm({ ...editForm, tel: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Adresse</label>
                <input
                  type="text"
                  value={editForm.adress}
                  onChange={(e) =>
                    setEditForm({ ...editForm, adress: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Confirmer la suppression?
            </h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleDelete(selectedUser)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirmer
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
