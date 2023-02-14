import "./checkoutForm.css";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ price, title, description, id }) => {
	//! STATE
	const [isLoading, setIsLoading] = useState(false);
	const [completed, setCompleted] = useState(false); // state pour le paiement fait/non fait

	//! COMPORTEMENT
	const stripe = useStripe();
	const elements = useElements();

	const fraisLivraison = Math.round((price / 20) * 100) / 100;
	const fraisProtection = Math.round((price / 60) * 100) / 100; // avec toFixed(2); ?

	const total = price + fraisLivraison + fraisProtection;

	const handlePayment = async (event) => {
		try {
			event.preventDefault();

			//! Je récupère les données bancaires de l'input CardElement
			const cardElement = elements.getElement(CardElement);
			console.log("cardElement", cardElement);

			// Demande de création d'un token via l'API Stripe
			// On envoie les données bancaires à STRIPE dans la requête pour qu'il valide le code de carte de l'utilisateur et qu'il me renvoie un token.
			const stripeResponse = await stripe.createToken(cardElement, {
				name: id,
			});

			const stripeToken = stripeResponse.token.id;
			console.log("stripeResponse", stripeResponse);

			// Une fois le token reçu depuis l'API Stripe
			//   Je fais une requête à mon back en envoyant le stripetoken
			const response = await axios.post(
				`https://site--myvinted--hw4gvwsxlwd5.code.run/payment`,
				{
					amount: {price},
					currency: "eur",
					title: {title},
					description: { description },
					token: stripeToken, // On envoie ici le token
				}
			);
			console.log("response.data", response.data);
			// Si la réponse du serveur est favorable, la transaction a eu lieu
			if (response.data === "succeeded") {
				console.log("response.data", response.data);
				setIsLoading(false);
				setCompleted(true);
			} else {
				console.log("response.data", response.data);
				console.log("erreur");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	//! RENDER
	return (
		<>
			{!completed ? (
				<div className="containerPayment">
					<form style={{ width: "300px" }} onSubmit={handlePayment}>
						<h4>Résumé de la commande</h4>

						<div className="section">
							<span>Commande :</span> <span>{title} </span>
							<span>{price} €</span>
						</div>
						<div className="section">
							<span>Frais protection acheteurs :</span>
							<span>{fraisProtection}</span>
						</div>
						<div className="section">
							<span>Frais de port :</span>
							<span>{fraisLivraison} €</span>
						</div>

						<div className="section">
							<span>Total :</span>
							<span> {total} €</span>
						</div>

						<p>
							Il ne vous reste plus qu'un étape pour vous offrir {title}. Vous
							allez payer {total} (frais de protection et frais de port inclus).
						</p>
						<div className="section">
                        <h5>Informations bancaires pour le paiement</h5>
                            <CardElement />
						</div>


						<div className="section">
							{completed ? (
								<p>Paiement effectué, merci pour votre achat.</p>
							) : (
								<button
									disabled={isLoading}
									type="submit"
									className="buttonPayment"
								>
									Payer
								</button>
							)}
						</div>
					</form>
				</div>
			) : (
				<span>Paiement effectué ! </span>
			)}
		</>
	);
};

export default CheckoutForm;
