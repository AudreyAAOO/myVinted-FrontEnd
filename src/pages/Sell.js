// import "./sell.css";
// import { useState } from "react";

// ne pas oublier import axios from "axios";

export default function Sell(picture, setPicture) {
    //! STATE

    //! COMPORTEMENTS

    //! RENDER
    return (<>

        <p>vendre un truc</p>


        <input
            type="email"
            name="email"
            id="email"
            // placeholder="Email"
            value=""

        />
        <label htmlFor="addPhoto">

            <span>+ Ajoute une photo</span>
        </label>
        <input type="addPhoto" id="addPhoto" name="addPhoto" accept="image/*,.jpg, .png, .jpeg">

            onChange={(event) => {
                console.log(event.target.files[0]);
                setPicture(event.target.files[0]);

            }}

        </input>








    </>)
}