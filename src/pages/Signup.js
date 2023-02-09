import "./signUpSignIn.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";

export default function Signup() {
    //! STATE
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [data, setData] = useState();

    //! COMPORTEMENTS
    const yourToken = (Math.random(16) * 1000);
    const Navigate = useNavigate();

    const handleSubmit = (event) => {
        console.log('submit');
        event.preventDefault();
        if (password.length <= 2) {
            setErrorMsg("La longueur de votre mot de passe doit être supérieure à 8"); // Je donne comme nouvelle valeur à mon message d'erreur une string
        } else if (username === "" || email === "") {
            console.log('vide');
            setErrorMsg("Veuillez remplir tous les champs");
        } else {
            setErrorMsg(""); // Je fais disparaître mon message d'erreur
            Cookies.set("yourToken", yourToken, { expires: 30 });
            console.log("yourToken", yourToken);
            <Header yourToken={yourToken} />

        }
        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `https://lereacteur-vinted-api.herokuapp.com/user/signup`,
                {
                    username, // "username": username
                    email,
                    password,
                    newsletter: newsletter,
                }
            );

            setData(response.data);
            setIsConnected(true);

            console.log("isConnected ? ", isConnected);
            console.log("response.data: ", response.data);
            <Navigate to="/" />
        } catch (error) {
            console.log(error.response);
        }
    };


    //! RENDER
    return (<>

        <div className="cadreForm" onSubmit={handleSubmit}>
            <p className="titreForm">Inscris-toi avec ton email</p>
            <div className="leFormulaire">
                <form id="form" >
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

                    <span><input type="checkbox" name="newsletter" id="" value={newsletter} onClick={
                        (event) => {
                            console.log(event.target.value);  //! event.target.value correspond au contenu de mon input           
                            setNewsletter(!newsletter);  // Je stocke dans mon state le contenu de mon input
                        }
                    } />
                        S'inscrire à notre newsletter</span>
                    <p>En m'inscrivant je confirme avoir lu et accepté les{"\u00A0"}
                        <a href="https://www.vinted.fr/terms_and_conditions">Termes & Conditions</a>{"\u00A0"}et
                        Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.</p>

                    <button className="Button" type="submit">S'inscrire</button>
                </form>

            </div>
            <Link to={"/login"}> Tu as déjà un compte ? Connecte-toi !</Link>
            <Link to={"/"}>retourner sur la page d'accueil</Link>
        </div>

    </>);
}