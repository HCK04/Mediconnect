import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Body from './Body';
import Navbar from './Navbar';
import AjouterForm from './AjouterForm';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Body/>}></Route>
        <Route path='/AjouterForm' element={<AjouterForm/>}></Route>    
      </Routes>
    </>
  );
}

export default App;
