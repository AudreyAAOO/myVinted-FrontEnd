import "./offerCard.css";
import userEmptyState from "../assets/img/userEmptyState.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const OfferCard = ({ offerInfos }) => {
	//console.log({offerInfos})

	return (
		<>
			<Link to={`/offer/${offerInfos._id}`} style={{ textDecoration: "none" }}>
				<section className="offerCard">
					<div className="avatarCard">
						
						{/* Si le vendeur a un avatar, je l'affiche */}
						{offerInfos.owner.account.avatar ? (
							<img src={offerInfos.owner.account.avatar.secure_url} alt="owner" />
						// {/* Sinon je mets un avatar par défault */}
						) : ( 
							<img src={userEmptyState} alt="owner"/>
						)}
						
						<span>{offerInfos.owner.account.username}</span>
					</div>
					<div className="card">
						{<img src={offerInfos.product_image.secure_url} alt="product" />}
					</div>
					<div className="legend-article">
						<span className="price">
							<p>{offerInfos.product_price} €</p>
							<FontAwesomeIcon icon="heart" />
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
