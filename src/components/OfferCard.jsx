import "./offerCard.css";
import userEmptyState from "../assets/img/userEmptyState.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";

const OfferCard = ({ offerInfos }) => {
	// const [errorMsg, setErrorMsg] = useState("");

	// const handleResearch = async (event) => {
	// 	event.preventDefault();
	// 	setErrorMsg(""); // Je fais disparaitre le message d'erreur

	// try {
	// 	//   Requête axios :
	// 	// - Premier argument : l'url que j'interroge
	// 	// - deuxième : le body que j'envoie

	// 	const response = axios.get(
	// 		`https://lereacteur-vinted-api.herokuapp.com/offers`,

	// 		{
	// 			title: String,
	// 			priceMin: Number,
	// 			priceMax: Number,
	// 			sort: "price-desc" || "price-asc",
	// 			page: Number,
	// 			limit: Number,
	// 		}
	// 	);

	// 	console.log("response.status", response.data);
	// } catch (error) {
	// 	console.log("error.response.data", error.response.data);
	// 	console.log("error.response.status", error.response.status);
	// }

	return (
		<>
			<Link to={`/offer/${offerInfos._id}`}>
				<section className="offerCard">
					<div className="avatarCard">
						{/* Si le vendeur a un avatar, je l'affiche */}
						{offerInfos.owner.account.avatar ? (
							<img
								src={offerInfos.owner.account.avatar.secure_url}
								alt={offerInfos.product_name}
							/>
						) : (
							// {/* Sinon je mets un avatar par défault */}
							<img src={userEmptyState} alt="owner" />
						)}

						<span>{offerInfos && offerInfos.owner.account.username}</span>
					</div>

					<div className="card">
						{
							<img
								src={offerInfos.product_image.secure_url}
								alt={offerInfos.title}
							/>
						}
						{console.log("--- product_image:", product_image)}
						{console.log(
							"+++ product_image.secure_url:",
							product_image.secure_url
						)}
					</div>

					<div className="legend-article">
						<span className="price">
							<p>{offerInfos.product_price} €</p>
							<FontAwesomeIcon icon={["far", "heart"]} />
						</span>

						<div className="description">
							{/* Je parcours product_detail */}
							{offerInfos.product_details.map((detail, index) => {
								//console.log("clic:", detail);
								if (detail.TAILLE) {
									// Si l'objet detail a une clef TAILLE, je l'affiche
									return <p key={index}>{detail.TAILLE}</p>;
								} else if (detail.MARQUE) {
									// Si l'objet a un clef MARQUE je l'affiche
									return <p key={index}>{detail.MARQUE}</p>;
								} else {
									return null;
								}
							})}
						</div>
					</div>
				</section>
			</Link>
		</>
	);
};

export default OfferCard;
