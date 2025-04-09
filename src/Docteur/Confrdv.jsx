import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Doctor() {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); // <-- Hook to navigate
  const doctorId = 1; // Replace with dynamic doctor ID if needed

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${doctorId}`)
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctor:", error);
      });

    axios.get(`http://localhost:8000/api/patients`)
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error("Error fetching patients:", error);
      });
  }, []);

  const goToDetails = (id) => {
    navigate(`/patients/${id}`);
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Dashboard */}
      <div className="container mx-auto p-6">
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold">Total Patients Assigned</h2>
            <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
          </div>
        </div>

        {/* Patients List */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Assigned Patients</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{patient.first_name} {patient.last_name}</td>
                  <td className="px-4 py-2">{patient.tel}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => goToDetails(patient.id)}
                      className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td className="px-4 py-2" colSpan={3}>No patients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
