
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import CheckoutForm from "./components/CheckoutForm";

// Je me connecte à mon compte stripe en front en fournissant ma clef publique
const stripePromise = loadStripe(
    "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF"
);

// urlPerso + `/offer/${id}`,
// urlReacteur + `/offer/${id}`,


const Payment = () => {
    return (<>
        <p> $$$$$$$$$$$$$$ </p>



        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>

    </>)
}

export default Payment;