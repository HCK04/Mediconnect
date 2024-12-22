import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AjouterForm() {

    // All consts
    const maladies = [{id: 1, maladie: "tari9"}, {id:2, maladie: "rkabi"}, {id:3, maladie: "dajaj"}]
    const dispatch = useDispatch()
    const [user, setUser] = useState({role: "", first_name: "", last_name: "", adress: "", maladie: {}, tel: ""} )



    function InputsChange(e){
        let key = e.target.name
        let value = e.target.value
        let _user = {...user}
        _user[key] = value
        setUser(_user)
    }

    function SelectOnChange(selected){
        const selectedItem = maladies.find((item)=>{
            return selected == item.id
        })
        setUser({...user, maladie: selectedItem})
    }

    function AjouterButton(){
      
    }


    console.log(user)
  return (
    <>
      <div class="bg-gray-100 dark:bg-gray-900 mt-12">
        <div class="w-full max-w-3xl mx-auto p-8">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Ajouter un Utilisateur
            </h1>

            <div class="mb-6">
                
              <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                Role
              </h2>
            <select class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset">
              <option value="week">Docteur</option>
              <option value="month">Patient</option>
              <option value="year">Admin</option>
            </select>

              <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                Information personnelles
              </h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="first_name"
                    class="block text-gray-700 dark:text-white mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    onChange={InputsChange}
                    name="first_name"
                    
                  ></input>
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block text-gray-700 dark:text-white mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    onChange={InputsChange}
                  ></input>
                </div>
              </div>

              <div class="mt-4">
                <label
                  for="address"
                  class="block text-gray-700 dark:text-white mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  onChange={InputsChange}
                  name="adress"
                />
              </div>

              <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    for="state"
                    class="block text-gray-700 dark:text-white mb-1"
                  >
                    Type Maladie
                  </label>
                <select name="maladie" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset" onChange={(e)=>{SelectOnChange(e.target.value)}}>
                    {maladies.map((item, index)=>{
                        return(
                            <option value={item.id} key={index}>{item.maladie}</option>
                        )

                    })}
                    
                </select>
                </div>
                <div>
                  <label
                    for="zip"
                    class="block text-gray-700 dark:text-white mb-1"
                  >
                    Tel
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="tel"
                    class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    onChange={InputsChange}
                  />
                </div>
              </div>
            </div>

            <div class="mt-8 flex justify-end">
              <button class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">
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
