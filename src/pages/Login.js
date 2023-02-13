import "./signUpSignIn.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import Cookies from "js-cookie";

export default function Login(handleToken) {
    //! STATE
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [data, setData] = useState();
    //const [errorMsg, setErrorMsg] = useState("");

    //! COMPORTEMENTS
    const navigate = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `https://site--myvinted--hw4gvwsxlwd5.code.run/user/login`,
                //`https://lereacteur-vinted-api.herokuapp.com/user/login`,
                {
                    email,
                    password,
                }
            );
            console.log("response.data: ", response.data);

            if (response.data.token) {
                // Cookies.set("yourTokenVinted", response.data.token, { expires: 14 });
                handleToken(response.data.token);
                navigate("/");
            }

        } catch (error) {
            console.log("error.response.data", error.response.data);
            console.log("error.response.status", error.response.status);
        }
    };



    //! RENDER
    return (<>

        <div className="cadreForm" onSubmit={handleLogin}>
            <p className="titreForm">Se connecter</p>
            <div className="leFormulaire">
                <form id="form" onSubmit={handleLogin}>
                    <input
                        type="email"
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
                    {/* <p className={errorMsg && "red"}>{errorMsg}</p> */}

                    <button className="button" type="submit">Se connecter</button>
                </form>

            </div>
            <div className="ligne-form">
            <Link to={"/signup"}>Pas encore de compte ? Inscris-toi !</Link>
            <Link to={"/"}>retourner sur la page d'accueil</Link></div>
        </div>

    </>);

}