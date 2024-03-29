import "./offer.css";
import userEmptyState from "../assets/img/userEmptyState.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const Offer = ({ token }) => {
  //! refaire une requête pour mettre les annonces à jour
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //! Je récupère l'id présent dans l'url
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--myvinted--hw4gvwsxlwd5.code.run/offer/${id}`,
        );
        setData(response.data);
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
        console.log('image ---> ', image.url);
        return <div key={index} className="left-column">
          <img src={image.url} alt="product" />
        </div>
      })}
      <div className="right-column">
        <Link to={"/"} className="linkHome">retourner sur la page d'accueil</Link>
        <p className="offerPrice">{data.product_price} €</p>
        {data.product_details.map((detail, index) => { // Je parcours product_details
          const key = Object.keys(detail)[0]; // Je récupère le nom de la clé de detail
          return (
            <div key={index} className="offerDetails">
              <div className="divOfferDetails">
                <span className="clé">{key} : </span> {/* J'affiche le nom dela clef  */}
              </div>
              <div> <span className="contenu">{detail[key]}</span> {/* et son contenu */}
              </div>
            </div>
          )
        })}
        <p className="offerName">{data.product_name}</p>
        <p className="offerDescription">{data.product_description}</p>

        <div className="offerAvatar">
          {data.owner.account.avatar ? (
            // Si le vendeur a un avatar, je l'affiche
            <img src={data.owner.account.avatar.secure_url} alt="owner" />
          ) : (
            // Sinon je mets un avatar par défault 
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
              product_name: data.product_name,
              product_price: data.product_price,
            }}>
            <button className="offerButton">Acheter</button>
          </Link>
        )}
      </div>
    </section >
  )
}
export default Offer;