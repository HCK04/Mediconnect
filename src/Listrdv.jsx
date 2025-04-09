import React, { useState, useEffect } from "react";
import axios from "axios";

const ListeRendezvous = () => {
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
        .get(`/api/rendezvous/patient/${user.id}`)
        .then((response) => setRendezvous(response.data.data))
        .catch((error) => console.error("Error fetching rendezvous:", error));
    }
  }, [user]);

  return (
    <div>
      <h2>My Appointments</h2>
      {rendezvous.length === 0 ? (
        <p>You have no appointments scheduled.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rendezvous.map((rdv) => (
              <tr key={rdv.id}>
                <td>{`${rdv.doctor.first_name} ${rdv.doctor.last_name}`}</td>
                <td>{rdv.rendezvous_date}</td>
                <td>{rdv.rendezvous_time}</td>
                <td>{rdv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListeRendezvous;
