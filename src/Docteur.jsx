import React, { useState } from "react";

function Docteur({  }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{doctorInfo.name}</h1>
            <p>{doctorInfo.specialty}</p>
            <p>Tel: {doctorInfo.phone}</p>
          </div>
          <div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded">
              Log Out
            </button>
          </div>
        </div>  
      </nav>
      
      {/* Dashboard */}
      <div className="container mx-auto p-6">
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold">Total Patients</h2>
            <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
          </div>
        </div>

        {/* Patients List */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Patients</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{patient.name}</td>
                  <td className="px-4 py-2">{patient.age}</td>
                  <td className="px-4 py-2">{patient.phone}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handlePatientClick(patient)}
                      className="text-white bg-blue-600 px-2 py-1 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800 text-lg font-bold"
              >
                ×
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                <strong>Age:</strong> {selectedPatient.age}
              </p>
              <p>
                <strong>Phone:</strong> {selectedPatient.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedPatient.email}
              </p>
              <p>
                <strong>Address:</strong> {selectedPatient.address}
              </p>
              <p>
                <strong>Medical History:</strong> {selectedPatient.history}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Docteur;
