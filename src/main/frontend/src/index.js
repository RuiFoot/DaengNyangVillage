import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './app';
import { BrowserRouter } from "react-router-dom";
import NavVillage from './layout/NavVillage';
import Footer from './layout/footer';
import SideBar from './layout/SideBar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavVillage />
      <SideBar />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

