import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Body from './Body';
import Navbar from './Navbar';
import AjouterForm from './AjouterForm';
import Admin from './Admin';
import SearchBar from './SearchBar';
import Docteur from './Docteur';
import './index.css' 
import Rdv from './Rdv';
import RdvDetail from './RdvDetail';
import ConfirmRdv from './confirm-rdv';
import store from "./redux/store";
import { Provider } from "react-redux";
import Doctor from './Docteur/Confrdv';
import DetailPatient from './Docteur/DetailPatient';
import ListeRendezvous from './Listrdv';
import Listepatients from './DevTestFiles/PatientList';
import DoctorRendezvous from './Docteur/DocteurRDV';

function App() {

  const [selectedId,setSelectedId] = useState()

  return (
    <>
    <Provider store={store}>
      <Navbar />
        {/* Ensure content is pushed down */}
        <div className="pt-16"></div>
        <Routes>
          <Route path='/' element={<Body/>}></Route>
          <Route path='/AjouterForm' element={<AjouterForm/>}></Route>
          <Route path='/Admin' element={<Admin setSelectedId={setSelectedId} />}></Route>
          <Route path='/Rdv' element={<Rdv/>}></Route>
          <Route path="/doctor/:id" element={<RdvDetail />} />
          <Route path="/Confirmer" element={<ConfirmRdv />}/>
          <Route path="/Patients" element={<Doctor />}/>
          <Route path="/patients/:patientId" element={<DetailPatient />} />
          <Route path="/test2" element={<ListeRendezvous />}/>
          <Route path="/test3" element={<DoctorRendezvous />}/>


          //DevTest
          <Route path="/ListePatient" element={<Listepatients />}/>

        </Routes>
      </Provider>
    </>
  );
}
  
export default App;