import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";

// images
import hero from "../assets/img/hero.svg";
import herobanner from "../assets/img/hero-img-fond.jpg";

//import des components
import OfferCard from "../components/OfferCard";

export default function Home({ search }) {
    //! STATE 
    // State qui me sert à récupérer la data
    const [data, setData] = useState([]); 
    // State qui me sert à savoir si la data a été récupérée
    const [isLoading, setIsLoading] = useState(true);

    // La callback de mon useEffect va être appelée une seule fois au premier rendu de mon composant
    useEffect(() => {
        // Je déclare la fonction qui fait la requête
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://site--myvinted--hw4gvwsxlwd5.code.run/offers?title=${search}`,
                    // const urlReacteur = `https://lereacteur-vinted-api.herokuapp.com`;
                );
                setData(response.data);
                // Je fais paser isLoading à false
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
                console.log(error.response.data);
            }
        };
        fetchData();

    }, [search]);// pour déclencher un useEffect lors d'une recherche




    //! RENDER
    return isLoading ? (
        <p>
            Loading...
        </p>
    ) : (<>
        <section className="sectionHero">
            <img className="banniere" src={herobanner} alt="bannière" />
            <img className="whiteEffect" src={hero} alt="effet déchiré" />


        </section>
        <h1>Articles populaires</h1>
        <main className="main">
            {data.offers && data.offers.map((offer) => {
                return (<OfferCard offerInfos={offer} key={offer._id} />
                );
            })}

        </main>
    </>)

}