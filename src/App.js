import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
//pages
import Home from './pages/Home';
import Offer from './pages/Offer';

//components
import Footer from "./components/Footer";
import Header from './components/Header';

// import icones
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faHeart, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faHeart, faCircleQuestion);
// <FontAwesomeIcon icon="heart" />
//<FontAwesomeIcon icon="fa-regular fa-circle-question" />

function App() {
  //! STATE 
  // State qui me sert à récupérer la data
  const [data, setData] = useState();
  // State qui me sert à savoir si la data a été récupérée
  const [isLoading, setIsLoading] = useState(true);

  // La callback de mon useEffect va être appelée une seule fois au premier rendu de mon composant
  useEffect(() => {
    console.log("useEffect executed");
    // Je déclare la focntion qui fait la requête
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        // Je stocke le résultat dans data
        setData(response.data);
        // Je fais paser isLoading à false
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  //! COMPORTEMENTS 



  //!RENDER
  return (
    isLoading ? (
      <p>Loading ...</p>
    ) : (

      // Router doit contenir tout mon site
      <Router>
        {/* Mon Header apparait sur toutes mes pages */}
        <Header />

        {/* Le composant Routes doit contenir toutes mes Route il affiche un composant à la fois */}
        <Routes>

          {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
          <Route path="/" element={<Home />} />
          <Route path="/offer" element={<Offer />} />

        </Routes>
        {/* Mon Footer apparait sur toutes mes pages */}
        <Footer />
      </Router >



    )
  );
}

export default App;
