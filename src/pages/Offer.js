import "./offer.css";
import userEmptyState from "../assets/img/userEmptyState.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const Offer = ({ token }) => {

  //! refaire une requête pour mettre les annonces à jour
  // State qui me sert à récupérer la data
  const [data, setData] = useState([]);
  // State qui me sert à savoir si la data a été récupérée
  const [isLoading, setIsLoading] = useState(true);


  //! Je récupère l'id présent dans l'url
  const params = useParams();
  const id = params.id;
  //console.log(params);


  useEffect(() => {
    console.log("---- useEffect executed ---- (*＾▽＾)／ ");
    // Je déclare la fonction qui fait la requête
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //`https://site--myvinted--hw4gvwsxlwd5.code.run/offer/${id}`,
          // `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`,
          // `https://myvinted.back.aikane.fr/offer/${id}`,
          `http://127.0.0.1:3100/offer/${id}`,
          // urlPerso + `/offer/${id}`,
          // urlReacteur + `/offer/${id}`,
        );
        console.log("response.data: ", response.data);
        // Je stocke le résultat dans data
        setData(response.data);
        // Je fais paser isLoading à false
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  //! RENDER
  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <section className="offer">

      {/* on veut afficher plusieurs images alors on n'a plus besoin de data.product_image &&
          <img src={data.product_image.secure_url} alt="product" />
        } */}


      {data.product_pictures.map((image, index) => {

        return <div className="left-column">
          <img key={index} src={image.secure_url} alt="product" />
        </div>
      })}


      <div className="right-column">
        <Link to={"/"}>retourner sur la page d'accueil</Link>

        <p className="offerPrice">{data.product_price} €</p>

        {data.product_details.map((detail, index) => { // Je parcours product_details

          const key = Object.keys(detail)[0]; // Je récupère le nom de la clé de detail
          //console.log("key: ", key)
          //console.log("detail[key]: ", detail[key])
          return (<>
            <div key={index} className="offerDetails">

              <div className="divOfferDetails">
                <span className="clé">{key} : </span> {/* J'affiche le nom dela clef  */}
              </div>
              <div> <span className="contenu">{detail[key]}</span> {/* et son contenu */}
              </div>
            </div>
          </>)
        })}
        <p className="offerName">{data.product_name}</p>
        <p className="offerDescription">{data.product_description}</p>

        <div className="offerAvatar">
          {/* Si le vendeur a un avatar, je l'affiche */}
          {data.owner.account.avatar ? (
            <img src={data.owner.account.avatar.secure_url} alt="owner" />
            // {/* Sinon je mets un avatar par défault */}
          ) : (
            <img src={userEmptyState} alt="owner" />
          )}

          <span>{data.owner.account.username}</span>

        </div>

        {!token ? (
          <Link to={"/login"}>
            <button className="offerButton">Acheter</button>
          </Link>
        ) : (
          <Link to="/payment"
            state=
            {{
              product_name: "data.product_name",
              product_price: "data.product_price"
            }}>
            {/*pkoi yavait écrit  data="null" ?? */}
            <button className="offerButton" >Acheter</button>
          </Link>
        )}

      </div>

    </section >
  )

}

export default Offer;