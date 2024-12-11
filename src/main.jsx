import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './Navbar.jsx'
import './index.css';
import Body from './Body.jsx';
import Admin from './Admin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <Body/>
  </StrictMode>,
)
