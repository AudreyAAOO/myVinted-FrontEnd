import './App.css';
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//Pages
import Home from './pages/Home';
import Offer from './pages/Offer';
import Page404 from './pages/Page404';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Publish from './pages/Publish';
import Payment from './pages/Payment';

//Components
import Footer from "./components/Footer";
import Header from './components/Header';

//! import icônes
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faHeart, faCircleQuestion);

// <FontAwesomeIcon icon="fa-regular fa-circle-question" />
// <FontAwesomeIcon icon="fa-regular fa-magnifying-glass" /> 

function App() {

  //! STATE 
  // State qui me sert à récupérer la data

  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("yourTokenVinted") || null);
  const [search, setSearch] = useState("");
  const [id, setId] = useState(Cookies.get("yourIdVinted") || null);


  //! COMPORTEMENTS 

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleTokenAndId = (token, id) => {
    if (token && id) {
      setToken(token);
      setId(id);
      Cookies.set("yourTokenVinted", token, { expires: 14 });
      Cookies.set("yourIdVinted", id, { expires: 14 });
    } else {
      setToken(null);
      setId(null);
      Cookies.remove("yourTokenVinted");
      Cookies.remove("yourIdVinted");
    }
  };


  //!RENDER
  return (

    // Router doit contenir tout mon site
    <Router>
      {/* Mon Header apparait sur toutes mes pages */}
      <Header  /* Passer des props token à mon header */
        handleTokenAndId={handleTokenAndId} token={token} search={search} setSearch={setSearch} />

      {/* Le composant Routes doit contenir toutes mes 'Route' il affiche un composant à la fois */}
      <Routes>

        {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
        <Route path="/" element={<Home search={search} />} />
        <Route path="/signup" element={<Signup handleTokenAndId={handleTokenAndId} />} /> {/* Passer des props token à Signup */}
        <Route path="/login" element={<Login handleTokenAndId={handleTokenAndId} />} /> {/* Passer des props token à Login */}
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/offer/:id" element={<Offer token={token} />} /> {/* chemin dynamique */}
        <Route path="/payment" element={<Payment token={token} />} />
        <Route path="*" element={<Page404 />} />
      </Routes>   

      {/* Mon Footer apparait sur toutes mes pages */}
      <Footer />
    </Router >

  );
}

export default App;
