import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Body from './Body';
import Navbar from './Navbar';
import AjouterForm from './AjouterForm';
import Admin from './Admin';
import SearchBar from './SearchBar';
import Docteur from './Docteur';
function App() {

  const [selectedId,setSelectedId] = useState()

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Body/>}></Route>
        <Route path='/AjouterForm' element={<AjouterForm/>}></Route>    
        <Route path='/Admin' element={<Admin setSelectedId={setSelectedId} />}></Route>
      </Routes>
    </>
  );
}
  
export default App;