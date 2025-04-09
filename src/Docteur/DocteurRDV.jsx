import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorRendezvous = () => {
  const [rendezvous, setRendezvous] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/user"); // Fetch logged-in user info
      setUser(response.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/rendezvous/doctor/${user.id}`)
        .then((response) => setRendezvous(response.data.data))
        .catch((error) => console.error("Error fetching rendezvous:", error));
    }
  }, [user]);

  const handleConfirm = (id) => {
    axios
      .put(`/api/rendezvous/${id}/confirm`)
      .then((response) => {
        setRendezvous(rendezvous.map((rdv) => (rdv.id === id ? response.data.data : rdv)));
      })
      .catch((error) => console.error("Error confirming rendezvous:", error));
  };

  const handleCancel = (id) => {
    axios
      .put(`/api/rendezvous/${id}/cancel`)
      .then((response) => {
        setRendezvous(rendezvous.map((rdv) => (rdv.id === id ? response.data.data : rdv)));
      })
      .catch((error) => console.error("Error canceling rendezvous:", error));
  };

  return (
    <div>
      <h2>Doctor's Appointments</h2>
      {rendezvous.length === 0 ? (
        <p>You have no pending appointments.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rendezvous.map((rdv) => (
              <tr key={rdv.id}>
                <td>{`${rdv.patient.first_name} ${rdv.patient.last_name}`}</td>
                <td>{rdv.rendezvous_date}</td>
                <td>{rdv.rendezvous_time}</td>
                <td>{rdv.status}</td>
                <td>
                  {rdv.status === "pending" && (
                    <>
                      <button onClick={() => handleConfirm(rdv.id)}>Confirm</button>
                      <button onClick={() => handleCancel(rdv.id)}>Cancel</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorRendezvous;
