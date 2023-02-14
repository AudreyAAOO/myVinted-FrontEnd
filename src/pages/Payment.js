import "../components/checkoutForm.css";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import CheckoutForm from "../components/CheckoutForm";




// urlPerso + `/offer/${id}`,
// urlReacteur + `/offer/${id}`,

//! 
const Payment = () => {

    const location = useLocation();
    
    // Je me connecte à mon compte stripe en front en fournissant ma clef publique
const stripePromise = loadStripe(
    "pk_test_51MbRPeA7BASDl2o24eqljvPtATOQzjj9YKrbsa2jHk8OvACetkOx8UvWYuieg0daXIetI5q4R0pL6MQrgp31r54o00z3qiKMNg"
);


    // destructuring
    const { price, title, description } = location.state;   //id


    return (<>

        <Elements stripe={stripePromise}>
            <CheckoutForm price={price} title={title} description={description} />   {/*id={id}*/}
        </Elements>

    </>)
}

export default Payment;