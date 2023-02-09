import './App.css';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from './pages/Home';
import Offer from './pages/Offer';
import Page404 from './pages/Page404';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Sell from './pages/Sell';


//components
import Footer from "./components/Footer";
import Header from './components/Header';

// import icones
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faHeart, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faHeart, faCircleQuestion);

// <FontAwesomeIcon icon="fa-regular fa-circle-question" />

function App() {
  //! STATE 
  // State qui me sert à récupérer la data

  //! COMPORTEMENTS 

  //!RENDER
  return (

    // Router doit contenir tout mon site
    <Router>
      {/* Mon Header apparait sur toutes mes pages */}
      <Header />

      {/* Le composant Routes doit contenir toutes mes 'Route' il affiche un composant à la fois */}
      <Routes>

        {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/offer/:id" element={<Offer />} /> {/* chemin dynamique */}
        <Route path="*" element={<Page404 />} />
      </Routes>
      {/* Mon Footer apparait sur toutes mes pages */}
      <Footer />
    </Router >

  );
}

export default App;
