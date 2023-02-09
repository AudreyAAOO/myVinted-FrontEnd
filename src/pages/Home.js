import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";

import heroBanner from "../assets/img/herobanner.jpg";

//import des components
import OfferCard from "../components/OfferCard";

export default function Home() {
    //! STATE 
    // State qui me sert à récupérer la data
    const [data, setData] = useState([]); // ou ({}) ?? 
    // State qui me sert à savoir si la data a été récupérée
    const [isLoading, setIsLoading] = useState(true);

    // La callback de mon useEffect va être appelée une seule fois au premier rendu de mon composant
    useEffect(() => {
        console.log("---- useEffect executed ---- (*＾▽＾)／ ");
        // Je déclare la fonction qui fait la requête
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://lereacteur-vinted-api.herokuapp.com/offers"
                );
                //console.log(response.data);
                // Je stocke le résultat dans data
                setData(response.data);
                // Je fais paser isLoading à false
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []); //todo ne pas oublier le tableau vide
//! RENDER
    return isLoading ? (
        <p>
            Loading...
        </p>
    ) : (<>
        <section className="sectionHero">
            <img src={heroBanner} alt="bannière" />

        </section>
        <h1>Articles populaires</h1>
        <main className="main">
            {data.offers.map((offer) => {
                //console.log(offer._id);
                //console.log(offer.product_name);
                return (<OfferCard offerInfos={offer} key={offer._id} />
                );
            })}

        </main>
    </>)

}