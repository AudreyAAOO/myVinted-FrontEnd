import "./payment.css";
import { useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";


const Payment = ({ token }) => {

    const location = useLocation();
    const { product_price, product_name } = location.state || {};
    console.log("location.state", location.state);
    // destructuring =
    // if (product_price) {
    //     const { product_price } = location.state;
    // }
    // if (product_name) {
    //     const { product_name } = location.state;
    // }

    //! STRIPE    
    // Je me connecte à mon compte stripe en front en fournissant ma clef publique
    const stripePromise = loadStripe(
        'pk_test_51MbRPeA7BASDl2o24eqljvPtATOQzjj9YKrbsa2jHk8OvACetkOx8UvWYuieg0daXIetI5q4R0pL6MQrgp31r54o00z3qiKMNg');

    const protectionFees = (product_price / 12).toFixed(2);
    const shippingFees = Math.round((product_price / 20)).toFixed(2);
    const total = Number(product_price) + Number(protectionFees) + Number(shippingFees);

    //! RENDER
    return token ? (<>
        <div className="containerPayment">
            <section>
                <div className="section_shopping">
                    <h4>Résumé de la commande</h4>
                    <h5>Commande :</h5>
                    <span>{product_name} : {product_price} €</span>
                </div>
                <div className="section_fees">
                    <p>Frais protection acheteurs : {protectionFees} €</p>
                    <p>Frais de port : {shippingFees} €</p>
                </div>
                <div className="section_total">
                    <p>
                        Il ne vous reste plus qu'un étape pour vous offrir {product_name}. Vous
                        allez payer {total} (frais de protection et frais de port inclus).
                    </p>
                    <h5>Total : {total} €</h5>
                </div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm product_price={product_price} product_name={product_name} />
                </Elements>
            </section>
        </div>
    </>) : (
        <Navigate to={"/login"} />
    )
}

export default Payment;