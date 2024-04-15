import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import NavVillage from './NavVillage';
import Footer from './footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavVillage />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
