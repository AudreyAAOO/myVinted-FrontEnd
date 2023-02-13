// import "./sell.css";
import { useState } from "react";

// ne pas oublier import axios from "axios";

export default function Sell({ picture, setPicture }) {
    //! STATE
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    // State qui va contenir mon image sélectionnée



    //! COMPORTEMENTS

    //! RENDER
    return (<>
        <h1>vends ton article</h1>

        <form>




            <label htmlFor="addPhoto">
                <span>+ Ajoute une photo</span>
            </label>
            <input type="file" id="addPhoto" name="addPhoto" accept="image/*,.jpg, .png, .jpeg"

                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setPicture(event.target.files[0]);
                }}
            ></input>


            <input
                value={username}
                type="text"
                placeholder="Nom d'utilisateur"
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />

            <input
                type="email"
                name="email"
                id="email"
                // placeholder="Email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}

            />



            <input type="submit" />
        </form>
    </>)
}