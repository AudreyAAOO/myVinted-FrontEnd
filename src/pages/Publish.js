import "./publish.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as React from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import axios from "axios";

export default function Publish({ token }) {
    //! STATE
    const [picture, setPicture] = useState();    // State qui va contenir l'image sélectionnée
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [rate, setRate] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [exchange, setExchange] = useState(false);
    const [imageToDisplay, setImageToDisplay] = useState();  // State qui va contenir la réponse du serveur


    //! COMPORTEMENTS

    console.log("token : ", token);
    console.log("color : ", color);


    const handlePublish = async (event) => {
        event.preventDefault();
        console.log("test event:", event);
        try {

            const formData = new FormData();// constructeur FormData

            formData.append("picture", picture);
            formData.append("titre", titre);
            formData.append("description", description);
            formData.append("brand)", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("rate", rate);
            formData.append("city", city);
            formData.append("price", price);
            formData.append("exchange", setExchange);

            console.log("formData:", formData);

            const response = await axios.post(
                "https://site--myvinted--hw4gvwsxlwd5.code.run/offer/publish",
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setImageToDisplay(response.data);
            console.log("response axios :", response);
            console.log("imageToDisplay :", imageToDisplay);

        } catch (error) {
            console.log("message: ", error.message);
        }
    }

    //! RENDER
    return !token ? (
        <Navigate to="/login" />
    ) : (<>

        <div className="cadreFormPublish" >

            <div className="formulaire-publish">
                <h2 className="titreForm">vends ton article</h2>
                <form onSubmit={handlePublish} id="form">


                    {/***************** INPUT ADD PHOTO */}
                    <div className="section-img-publish">
                        <div className="ligne-form-addFiles">

                            <label htmlFor="addPhoto" className="addPhoto">
                                <h4>+ Ajoute une photo</h4>
                            </label>
                            <input
                                type="file"
                                onChange={(event) => {
                                    // console.log(event.target.files[0]);
                                    setPicture(event.target.files[0]);
                                }}
                            // style={{ display: "none" }}
                            />


                            {/* <div>
                <Button type="file" id="addPhoto" name="addPhoto" accept="image/*,.jpg, .png, .jpeg"
                    variant="contained">+ Ajoute une photo</Button>
            </div> */}
                        </div>
                    </div>
                    {/***************** TITRE ET DESCRIPTION */}
                    <div className="section-form-publish">
                        <div className="ligne-form">
                            <h4>Titre </h4>
                            <input
                                value={titre}
                                type="text"
                                name="titre"
                                placeholder="ex: chemise Sézane verte"
                                onChange={(event) => {
                                    setTitre(event.target.value);
                                }}
                            />
                        </div>
                        <div className="ligne-form">
                            <h4>Décris ton article </h4>
                            {/* <input
                        value={description}
                        type="text"
                        name="description"
                        placeholder="ex: porté quelquefois, taille correctement"
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    /> */}
                            <textarea value={description}
                                type="textarea"
                                name="description"
                                placeholder="ex: porté quelquefois, taille correctement"
                                rows="5"
                                cols="90"
                                wrap="hard"
                                maxLength="300"
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }} >
                            </textarea>
                        </div>
                    </div>
                    {/***************** INPUT DETAILS */}
                    <div className="section-form-publish">
                        <div className="ligne-form">
                            <h4>Marque</h4>
                            <input
                                value={brand}
                                type="text"
                                name="brand"
                                placeholder="ex: Zara"
                                onChange={(event) => {
                                    setBrand(event.target.value);
                                }}
                            />
                        </div>
                        <div className="ligne-form">
                            <h4>Taille</h4>
                            <input
                                value={size}
                                type="text"
                                name="size"
                                placeholder="ex: L / 40 / 12"
                                onChange={(event) => {
                                    setSize(event.target.value);
                                }}
                            /></div>
                        <div className="ligne-form">
                            <h4>Couleur</h4>
                            <input
                                value={color}
                                type="text"
                                name="color"
                                placeholder="ex: Fushia"
                                onChange={(event) => {
                                    setColor(event.target.value);
                                }}
                            /></div>
                        <div className="ligne-form">
                            <h4>Etat</h4>
                            <input
                                value={rate}
                                type="text"
                                name="rate"
                                placeholder="Neuf avec étiquette"
                                onChange={(event) => {
                                    setRate(event.target.value);
                                }}
                            /></div>
                        <div className="ligne-form">
                            <h4>Lieu</h4>
                            <input
                                value={city}
                                type="text"
                                name="city"
                                placeholder="ex: Paris"
                                onChange={(event) => {
                                    setCity(event.target.value);
                                }}
                            /></div>
                    </div>

                    {/***************** INPUT PRICE ET CHECKBOX */}
                    <div className="section-form-publish">
                        <div className="ligne-form">
                            <h4>Prix</h4>
                            <input
                                value={price}
                                type="number"
                                placeholder="0,00€"
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                            />
                        </div>
                        <div className="ligne-form">
                            <h4>

                                {exchange ? (
                                    <label
                                        htmlFor="exchange"
                                        className="checkbox-checked"
                                    ></label>
                                ) : (
                                    <label
                                        htmlFor="exchange"
                                        className="checkbox-no-checked"
                                    ></label>
                                )}
                                <input
                                    value={exchange}
                                    type="checkbox"
                                    onChange={() => {
                                        setExchange(!exchange)
                                    }}

                                />
                                je suis intéressé.e par les échanges</h4></div>
                    </div>


                    <button className="button" type="submit">Ajouter</button>

                    {/* afficher l'image  */}
                    <div className="ligne-form">

                        {picture && <img src={URL.createObjectURL(picture)} alt="preview" />}
                    </div>
                </form>

                <div className="link-home">
                    <Link to={"/"}>retourner sur la page d'accueil</Link>
                </div>
            </div>
        </div>
    </>);


}