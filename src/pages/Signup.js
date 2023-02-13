import "./signUpSignIn.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";
// import Header from "../components/Header";

export default function Signup({ handleToken }) {
    //! STATE
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    //const [isConnected, setIsConnected] = useState(false);
    //const [data, setData] = useState();


    //! COMPORTEMENTS

    // Permet de naviguer
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setErrorMsg(""); // Je fais disparaitre le message d'erreur

        try {
            //   Requête axios :
            // - Premier argument : l'url que j'interroge
            // - deuxième : le body que j'envoie

            const response = await axios.post(
                `https://site--myvinted--hw4gvwsxlwd5.code.run/user/signup`,
                // `https://lereacteur-vinted-api.herokuapp.com/user/signup`,

                {
                    username, // username: username
                    email,
                    password,
                    newsletter: newsletter,
                }
            );

            if (password.length <= 2) {
                setErrorMsg("La longueur de votre mot de passe doit être supérieure à 2");
                console.log("token:", response.data.email);
                console.log("token:", response.data.username);
            }

            if (response.data.token) {  //   Si je reçois bien un token
                // Cookies.set("yourTokenVinted", response.data.token, { expires: 30 });
                // Je l'enregistre dans mon state et mes cookies
                handleToken(response.data.token); // handleToken reçu en props
                console.log(`Bravo, vous avez soumis votre formulaire. Votre email est ${email}`);
                console.log("token:", response.data.token);
                navigate("/"); // Et je redirige vers Home
            }

        } catch (error) {
            console.log("error.response.data", error.response.data);
            console.log("error.response.status", error.response.status);

            if (error.response.data.message === "Missing parameters") {
                setErrorMsg("Veuillez remplir tous les champs s'il vous plait");
            }

            //   Si je reçois un message d'erreur "This email already has an account"
            if (error.response.data.message === "This email already has an account") {
                setErrorMsg("Cet email est déjà utilisé, veuillez créer un compte avec un mail valide.");
            }
        };
    }
    //! RENDER
    return (<>

        <div className="cadreForm" >
            <p className="titreForm">Inscris-toi avec ton email</p>
            <div className="leFormulaire">
                <form id="form" onSubmit={handleSignup}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={
                            (event) => {
                                console.log(event.target.value);  //! event.target.value correspond au contenu de mon input           
                                setUsername(event.target.value);  // Je stocke dans mon state le contenu de mon input
                            }
                        }
                    />

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={
                            (event) => {
                                console.log(event.target.value);  //! event.target.value correspond au contenu de mon input           
                                setEmail(event.target.value);  // Je stocke dans mon state le contenu de mon input

                            }
                        }
                    />
                    <input
                        autoComplete="off"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={
                            (event) => {
                                console.log(event.target.value);  //! event.target.value correspond au contenu de mon input           
                                setPassword(event.target.value);  // Je stocke dans mon state le contenu de mon input
                            }
                        }
                    />
                    {/* Le contenu de ma balise p dépend du state errorMsg */}
                    <p className={errorMsg && "red"}>{errorMsg}</p>

                    <div>

                        <input type="checkbox" name="newsletter" value={newsletter} onChange={
                            (event) => {
                                console.log(event.target.value);  //! event.target.value correspond au contenu de mon input           
                                setNewsletter(!newsletter);  // Je stocke dans mon state le contenu de mon input
                            }
                        } />
                        <span>S'inscrire à notre newsletter</span>
                        <p>En m'inscrivant je confirme avoir lu et accepté les{"\u00A0"}
                            <a href="https://www.vinted.fr/terms_and_conditions">Termes & Conditions</a>{"\u00A0"}et
                            Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.</p>

                    </div>

                    <button className="button" type="submit">S'inscrire</button>
                </form>

            </div>
            <div className="ligne-form">
            <Link to={"/login"}> Tu as déjà un compte ? Connecte-toi !</Link>
            <Link to={"/"}>retourner sur la page d'accueil</Link></div>
        </div>

    </>);



}