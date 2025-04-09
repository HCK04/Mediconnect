import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import pfp from "./img/hero.png";

function AjouterForm() {
  const maladies = [
    { id: 1, maladie: "migraine" },
    { id: 2, maladie: "hypertension" },
    { id: 3, maladie: "anémie" },
  ];

  const navigate = useNavigate();
  const DEFAULT_PFP = pfp;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState({
    role: "Patient",
    first_name: "",
    last_name: "",
    adress: "",
    maladie: {},
    tel: "",
    photo_profile: DEFAULT_PFP,
  });

  const [selectedRole, setSelectedRole] = useState("Patient");

  async function ajouterUser() {
    try {
        const userData = {
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            adress: user.adress,
            tel: user.tel,
            maladie: user.maladie,
            photo_profile: user.photo_profile
        };

        const response = await axios.post('http://localhost:8000/api/users', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        setSuccessMessage("Utilisateur ajouté avec succès!");
        setTimeout(() => {
            navigate("/Admin");
        }, 2000);
    } catch (error) {
        console.error('Error:', error);
        setErrorMessage(error.response?.data?.message || "Erreur lors de l'ajout de l'utilisateur");
    }
  }

  function handleRoleChange(e) {
    const role = e.target.value;
    setSelectedRole(role);
    setUser(prev => ({
      ...prev,
      role
    }));
  }

  function InputsChange(e) {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function SelectOnChange(selected) {
    const selectedItem = maladies.find(item => item.id === parseInt(selected));
    setUser(prev => ({
      ...prev,
      maladie: selectedItem
    }));
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 mt-12">
      {/* Show success message */}
      {successMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <p className="text-center">{successMessage}</p>
        </div>
      )}

      {/* Show error message */}
      {errorMessage && (
        <div className="fixed top-0 left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p className="text-center">{errorMessage}</p>
        </div>
      )}

      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Ajouter un Utilisateur
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
              Role
            </h2>
            <select
              className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset"
              onChange={handleRoleChange}
              value={selectedRole}
            >
              <option value="Patient">Patient</option>
              <option value="Médecin">Médecin</option>
              <option value="Admin">Admin</option>
            </select>

            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2 mt-4">
              Information personnelles
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  onChange={InputsChange}
                  name="first_name"
                  value={user.first_name}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  onChange={InputsChange}
                  value={user.last_name}
                ></input>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="tel"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  pattern="[0-9]{10}"
                  placeholder="0XXXXXXXXX"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  onChange={InputsChange}
                  value={user.tel}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  onChange={InputsChange}
                  name="adress"
                  value={user.adress}
                />
              </div>
            </div>

            {selectedRole === "Patient" && (
              <div className="mt-4">
                <label
                  htmlFor="state"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Type Maladie
                </label>
                <select
                  name="maladie"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset"
                  onChange={(e) => {
                    SelectOnChange(e.target.value);
                  }}
                >
                  {maladies.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.maladie}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={ajouterUser}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Ajouter Utilisateur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterForm;
