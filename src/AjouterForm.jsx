import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AjouterUserAction } from "./redux/actions/adminAction";
import { useNavigate } from "react-router-dom";
import pfp from "./img/hero.png";

function AjouterForm() {
  const maladies = [
    { id: 1, maladie: "tari9" },
    { id: 2, maladie: "rkabi" },
    { id: 3, maladie: "dajaj" },
  ];
  
  const dispatch = useDispatch();
  const DEFAULT_PFP = pfp;
  const [user, setUser] = useState({
    id: "",
    role: "",
    first_name: "",
    last_name: "",
    adress: "",
    maladie: {},
    tel: "",
    date: "",
    photo_profile: DEFAULT_PFP,
  });

  const [selectedRole, setSelectedRole] = useState("");
  const users = useSelector((state) => state.AllUsers);
  const navigate = useNavigate();

  function ajouterUser() {
    const currentdate = new Date().toISOString();
    const updatedUser = { ...user, date: currentdate, photo_profile: DEFAULT_PFP };
    dispatch(AjouterUserAction(updatedUser));
    navigate("/Admin");
  }

  function increment() {
    return users.length + 1;
  }

  function InputsChange(e) {
    let key = e.target.name;
    let value = e.target.value;
    let _user = { ...user, id: increment() };
    _user[key] = value;
    setUser(_user);
  }

  function handleRoleChange(e) {
    const role = e.target.value;
    const updatedUser = { ...user, role };
    
    if (role === "Docteur" || role === "Admin") {
      updatedUser.tel = "none";
    }

    setSelectedRole(role);
    setUser(updatedUser);
  }

  function SelectOnChange(selected) {
    const selectedItem = maladies.find((item) => {
      return selected == item.id;
    });
    setUser({ ...user, maladie: selectedItem });
  }

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 mt-12">
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
              >
                <option value="Patient">Patient</option>
                <option value="Docteur">Docteur</option>
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
                  ></input>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  onChange={InputsChange}
                  name="adress"
                />
              </div>

              {selectedRole !== "Docteur" && selectedRole !== "Admin" && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
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
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      Tel
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="tel"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                      onChange={InputsChange}
                      value={user.tel}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={ajouterUser}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
              >
                Ajouter Utilisateur
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AjouterForm;
