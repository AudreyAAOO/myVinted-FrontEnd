import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
const CheckoutForm = () => {
	//! STATE
	const [isLoading, setIsLoading] = useState(false);
	const [completed, setCompleted] = useState(false); // state pour le paiement fait/non fait

	//! COMPORTEMENT
	const stripe = useStripe();
	const elements = useElements();

	const handlePayment = async (event) => {
		event.preventDefault();
		try {
			const cardElement = elements.getElement(CardElement); // Je récupère le contenu de l'input CardElement
			console.log(cardElement);
			// Demande de création d'un token via l'API Stripe
			// On envoie les données bancaires à STRIPE dans la requête pour qu'il valide le code de carte de l'utilisateur et qu'il me renvoie un token.
			const stripeResponse = await stripe.createToken(cardElement, {
				name: "id de l'acheteur",
			});
			const stripeToken = stripeResponse.token.id;
			console.log(stripeResponse);

			// Une fois le token reçu depuis l'API Stripe
			//   Je fais une requête à mon back en envoyant le stripetoken

			const response = await axios.post(
				`https://site--myvinted--hw4gvwsxlwd5.code.run/user/payment`,
				{
					stripeToken: stripeToken,
				}
			);
			console.log(response.data);
			// Si la réponse du serveur est favorable, la transaction a eu lieu
			if (response.data.status === "succeeded") {
				setIsLoading(false);
				setCompleted(true);
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	//! RENDER
	return (
		<>
			{!completed ? (
				<form style={{ width: "300px" }} onSubmit={handlePayment}>
					<h4>Résumé de la commande</h4>
					<div>Frais </div>
					<CardElement />
					{completed ? (
						<p>Paiement effectué</p>
					) : (
						<button disabled={isLoading} type="submit">
							Payer
						</button>
					)}{" "}
				</form>
			) : (
				<span>Paiement effectué ! </span>
			)}
		</>
	);
};

export default CheckoutForm;
