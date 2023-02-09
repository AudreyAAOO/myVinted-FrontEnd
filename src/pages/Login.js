import "./signUpSignIn.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
    //! STATE
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState();
    //const [errorMsg, setErrorMsg] = useState("");

    //! COMPORTEMENTS

const handleSubmit = (event) => {
        console.log('submit');
        event.preventDefault();
        fetchData();
        }
       
    
const fetchData = async () => {
        try {
            const response = await axios.post(
                `https://lereacteur-vinted-api.herokuapp.com/user/login`,
                {
                    email,
                    password,
                }
            );
            setData(response.data);
            console.log("response.data: ", response.data);
          
        } catch (error) {
            console.log(error.response);
        }
    };
    //! RENDER
    return (<>

        <div className="cadreForm" onSubmit={handleSubmit}>
            <p className="titreForm">Se connecter</p>
            <div className="leFormulaire">
                <form id="form" >
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
                    {/* <p className={errorMsg && "red"}>{errorMsg}</p> */}

                    <button className="Button" type="submit">Se connecter</button>
                </form>

            </div>
            <Link to={"/signup"}> Pas encore de compte ? Inscris-toi !</Link>
            <Link to={"/"}>retourner sur la page d'accueil</Link>
        </div>

    </>);

}