import "../components/checkoutForm.css";
import { useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";


const Payment = ({ token }) => {

    const location = useLocation();

    // destructuring
 
    // if (product_price) {
    //     const { product_price } = location.state;
    // }
    // if (product_name) {
    //     const { product_name } = location.state;
    // }
    const { product_price, product_name } = location.state || {};
   // console.log("location.state", location);
    // console.log("product_name", product_name);
    // console.log("product_price", product_price);
    //const { product_price, product_name } = location.state;

    //! STRIPE    
    // Je me connecte à mon compte stripe en front en fournissant ma clef publique
    const stripePromise = loadStripe(
        // perso "pk_test_51MbRPeA7BASDl2o24eqljvPtATOQzjj9YKrbsa2jHk8OvACetkOx8UvWYuieg0daXIetI5q4R0pL6MQrgp31r54o00z3qiKMNg"
        // reacteur  
        "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
    );


    //const fraisLivraison = Math.round((product_price / 20) * 100) / 100;
    //const fraisProtection = Math.round((product_price / 60) * 100) / 100; // avec toFixed(2); ?

    const fraisLivraison = 4;
    const fraisProtection = 3;

    const total = product_price + fraisLivraison + fraisProtection;


    //! RENDER
    return token ? (<>
        <div className="containerPayment">
            <section>
                <div>
                    <h5>Résumé de la commande</h5>
                    <p>Commande :</p>
                </div>
                <div className="section">
                    <span>{product_name}</span>
                    <span>{product_price} €</span>
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
                    Il ne vous reste plus qu'un étape pour vous offrir {product_name}. Vous
                    allez payer {total} (frais de protection et frais de port inclus).
                </p>

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