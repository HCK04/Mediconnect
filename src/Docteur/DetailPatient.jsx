import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailPatient() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${patientId}`)
      .then(res => {
        setPatient(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching patient:", err);
        setLoading(false);
      });
  }, [patientId]);

  const handleCancel = () => {
    setCanceling(true);
    // Example: call backend to cancel appointment
    setTimeout(() => {
      setCanceling(false);
      setShowCancelModal(false);
      alert("Appointment cancelled (simulation)");
    }, 1500);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!patient) return <div className="p-6">Patient not found.</div>;

  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Patient Details</h1>
        </div>
      </nav>

      {/* Patient Details Section */}
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{patient.first_name} {patient.last_name}</h2>
          <div className="space-y-3">
            <p><strong>Phone:</strong> {patient.tel}</p>
            <p><strong>Address:</strong> {patient.adress}</p>
            <p><strong>Role:</strong> {patient.role}</p>
            <p><strong>Joined:</strong> {new Date(patient.date).toLocaleDateString()}</p>
            <p><strong>Booked Times:</strong> {patient.booked_times?.map(t => t.booked_time).join(", ") || "N/A"}</p>
          </div>

          <div className="mt-6 flex justify-start">
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Cancel Appointment?</h3>
              <button onClick={() => setShowCancelModal(false)} className="text-gray-600 hover:text-gray-800 text-lg font-bold">×</button>
            </div>
            <p className="mt-4">Are you sure you want to cancel this appointment?</p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200"
              >
                No, Keep Appointment
              </button>
              <button
                onClick={handleCancel}
                className={`px-4 py-2 text-sm font-medium text-white ${canceling ? "bg-gray-600" : "bg-red-600"} rounded-lg hover:bg-red-700`}
                disabled={canceling}
              >
                {canceling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPatient;
