import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import TotalContacts from './components/pages/TotalContacts';
import Logout from './components/pages/Logout';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Toaster position='top-right' toastOption={{duration: 1000}} />
      <Routes>
        <Route path= "/" element={ <Login /> }/>
        <Route path="/register" element={ <Register /> }/>
        <Route path="/total_contacts" element={ <TotalContacts /> }/>
        <Route path="/logout" element={ <Logout /> }/>
      </Routes>
    </>
  );
}

export default App;
