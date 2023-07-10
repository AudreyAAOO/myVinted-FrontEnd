import "./publish.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as React from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";



export default function Publish({ token }) {

    const navigate = useNavigate();

    //! STATE
    const [picture, setPicture] = useState();    // State qui va contenir l'image sélectionnée
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [files, setFiles] = useState("");
    const [exchange, setExchange] = useState(false);
    const [imageToDisplay, setImageToDisplay] = useState();  // State qui va contenir la réponse du serveur
    const [errorMsg, setErrorMsg] = useState("");


    //! COMPORTEMENTS

    // console.log("token : ", token);

    const handlePublish = async (event) => {
        event.preventDefault();
        setErrorMsg("");
        // console.log("file:", picture); //voir les détails de l'image
        if (picture === "" || title === "" || description === "" || brand === "" || size === "" || condition === "" || city === "" || price === "" || exchange === "" ) {
            // console.log("Missing parameters");
            setErrorMsg("Veuillez entrer tous les champs svp");
        }

        try {

            const formData = new FormData(); // constructeur FormData
            formData.append(`picture`, picture);
            // formData.append("upload_preset", "dqlooqdn");
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("price", price);
            formData.append("exchange", setExchange);

            for (let i = 0; i < files.length; i++) {
                formData.append(`images`, files[i])
            }

            const response = await axios.post(
                // `https://site--myvinted--hw4gvwsxlwd5.code.run/offer/publish`,
                // `https://lereacteur-vinted-api.herokuapp.com/offer/publish`,
                // `https://myvinted.back.aikane.fr/offer/publish`,
                `http://localhost:3200/offer/publish`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("response axios :", response);
            setImageToDisplay(response.data);
            alert(`Votre annonce a bien été enregistrée !`);
            navigate("/");

        } catch (error) {
            console.log("message: ", error.response);
            console.log("message: ", error.response.data);
        }
    }

    //! RENDER
    return !token ? (
        <Navigate to="/login" />
    ) : (<>
        <div className="cadreFormPublish" >
            <div className="formulaire-publish">
                <h2>vends ton article</h2>
                <form onSubmit={handlePublish} id="form">
                    {/***************** INPUT ADD PHOTO */}
                    <div className="section-img-publish">
                        <div className="ligne-form-addFiles">
                            {/* ajouter attribut pr plusieurs photos */}
                            <label htmlFor="addPhoto" className="addPhoto">
                                <h4>+ Ajoute une photo</h4>
                            </label>
                            <input
                                id="addPhoto"
                                type="file"
                                multiple="multiple"
                                onChange={(event) => {
                                    setPicture(event.target.files[0]);
                                    setFiles(event.target.files);
                                }}
                            />

                        </div>
                    </div>
                    {/***************** TITRE ET DESCRIPTION */}
                    <div className="section-form-publish">
                        <div className="ligne-form">
                            <h4>Titre </h4>
                            <input
                                value={title}
                                type="text"
                                name="title"
                                placeholder="ex: chemise Sézane verte"
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                        </div>
                        <div className="ligne-form">
                            <h4>Décris ton article </h4>

                            <textarea
                                value={description}
                                type="textarea"
                                name="description"
                                placeholder="ex: porté quelquefois, taille correctement"
                                rows="5"
                                cols="90"
                                wrap="hard"
                                // exchange
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
                                value={condition}
                                type="text"
                                name="condition"
                                placeholder="Neuf avec étiquette"
                                onChange={(event) => {
                                    setCondition(event.target.value);
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

                                {/* {exchange ? (
                                    <label
                                        htmlFor="exchange"
                                        className="checkbox-checked"
                                    ></label>
                                ) : (
                                    <label
                                        htmlFor="exchange"
                                        className="checkbox-no-checked"
                                    ></label>
                                )} */}
                                <input
                                    value={exchange}
                                    type="checkbox"
                                    onChange={() => {
                                        setExchange(!exchange)
                                    }}

                                />
                                je suis intéressé.e par les échanges</h4></div>
                    </div>

                    <p className={errorMsg && "red"}>{errorMsg}</p>

                    <button className="button" type="submit">Ajouter</button>

                    {/* afficher l'image  */}
                    <div >
                        {picture && <img className="preview_img" src={URL.createObjectURL(picture)} alt="preview" />}

                    </div>
                </form>

                <div className="link-home">
                    <Link to={"/"}>retourner sur la page d'accueil</Link>
                </div>
            </div>
        </div>
    </>);


}