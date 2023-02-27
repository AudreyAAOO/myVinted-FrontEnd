import "./checkoutForm.css";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutForm = ({ product_name, product_price }) => {
	// idAcheteur
	//! STATE
	const [isLoading, setIsLoading] = useState(false);
	const [completed, setCompleted] = useState(false); // state pour le paiement fait/non fait

	//! COMPORTEMENT
	const stripe = useStripe();
	const elements = useElements();
	const userId = Cookies.get("yourIdVinted");

	const handlePayment = async (event) => {
		try {
			event.preventDefault();

			//! Je récupère les données bancaires de l'input CardElement
			const cardElement = elements.getElement(CardElement);
			console.log("cardElement", cardElement);

			// Demande de création d'un token via l'API Stripe
			// On envoie les données bancaires à STRIPE dans la requête pour qu'il valide le code de carte de l'utilisateur et qu'il me renvoie un token.
			const stripeResponse = await stripe.createToken(cardElement, {
				name: userId,
			});
			const stripeToken = stripeResponse.token.id;
			//const stripeToken = stripeResponse.token.idAcheteur;

			console.log("stripeResponse", stripeResponse);

			// Une fois le token reçu depuis l'API Stripe
			//   Je fais une requête à mon back en envoyant le stripetoken
			const response = await axios.post(
				//`https://site--myvinted--hw4gvwsxlwd5.code.run/payment`,
				`https://lereacteur-vinted-api.herokuapp.com/payment`,
				{
					amount: product_price,
					//currency: "eur",
					title: product_name,
					//description: { description },
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
					<form onSubmit={handlePayment}>
						<div className="sectionBank">
							<h5>Informations bancaires</h5>
							<CardElement />
						</div>

						<div className="sectionButtonPayment">
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
