import "./checkoutForm.css";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutForm = ({ product_name, product_price }) => {
	
	//! STATE
	const [isLoading, setIsLoading] = useState(false);
	const [completed, setCompleted] = useState(false); 

	//! COMPORTEMENT
	const stripe = useStripe();
	const elements = useElements();
	const userId = Cookies.get("yourIdVinted");

	const handlePayment = async (event) => {
		try {
			event.preventDefault();

			//! Je récupère les données bancaires de l'input CardElement
			const cardElement = elements.getElement(CardElement);
			// console.log("cardElement", cardElement);

			// Demande de création d'un token via l'API Stripe
			// On envoie les données bancaires à STRIPE dans la requête pour qu'il valide le code de carte de l'utilisateur et qu'il me renvoie un token.
			const stripeResponse = await stripe.createToken(cardElement, {
				name: userId,
			});
			const stripeToken = stripeResponse.token.id;
			//const stripeToken = stripeResponse.token.idAcheteur;
			// console.log("stripeToken", stripeToken);
			// console.log("stripeResponse", stripeResponse);

			// Une fois le token reçu depuis l'API Stripe
			//   Je fais une requête à mon back en envoyant le stripetoken
			const response = await axios.post(
				`https://site--myvinted--hw4gvwsxlwd5.code.run/payment`,
				//`https://lereacteur-vinted-api.herokuapp.com/payment`,
				//`http://127.0.0.1:3200/payment`,
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
				console.log("if response.data", response.data);
				setIsLoading(false);
				setCompleted(true);
			} else {
				console.log("else response.data", response.data);
				console.log("else erreur");
			}
		} catch (error) {
			console.log("catch error.response.data", error.response.data);
			console.log("catch error.response.status", error.response.status);
		}
	};

	//! RENDER
	return (
		<>
			{!completed ? (
				<form className="containerForm" onSubmit={handlePayment}>
					<div className="sectionBank">
						<h5>Informations bancaires</h5>
						<div className="cardElement">
							<CardElement />
						</div>
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

					{/* {finalConfirmation && (
					<div className="w-full h-full fixed top-0 left-0 bg-[#fff8] font-baloo text-xl">
						<div className="max-w-3xl w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fff] px-10 py-6 rounded-3xl flex flex-col gap-5 items-center shadow-pg-item">
							<p>
								Votre trajet est bien réservé, vous allez recevoir un email de
								confirmation
							</p>
							<Link
								to={URL_HOME}
								className="px-7 py-3 bg-pg-blue text-white rounded-full shadow-pg-item"
							>
								Retour à l'accueil
							</Link>
						</div>
					</div>
				)} */}
				</form>
			) : (
				<span>Paiement effectué ! </span>
			)}
		</>
	);
};

export default CheckoutForm;
