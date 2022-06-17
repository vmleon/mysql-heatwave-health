import React from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';
import Footer from './Footer';

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

/* <Link to="/dasboard">Dashboard</Link>
    <Link to="/config">Config</Link>
     */
