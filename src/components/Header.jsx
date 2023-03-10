import logovinted from "../assets/img/logovinted.svg";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import { useState } from "react";
// import Cookies from "js-cookie";

const Header = ({ handleTokenAndId, token, search, setSearch }) => {
	//! STATE

	// const [isConnected, setIsConnected] = useState(false);

	//! COMPORTEMENTS

	//! RENDER
	return (
		<>
			<header>
				<a href="/">
					<img src={logovinted} alt="vinted logo" />
				</a>
				<div className="containerResearch">
					<select name="categories" className="headerSelect">
						<option value="articles">Articles</option>
						<option value="membres">Membres</option>
						<option value="forum">Forum</option>
						<option value="aide">Centre d'aide</option>
					</select>
					<p className="iconSearch">
						<FontAwesomeIcon icon="magnifying-glass" />
						{/* <FontAwesomeIcon icon="fa-regular fa-magnifying-glass" /> */}
					</p>
					<input
						className="inputSearch"
						type="search"
						placeholder="(*＾▽＾)／Rechercher des articles "
						value={search}
						onChange={(event) => {
							console.log(event.target.value); //! event.target.value correspond au contenu de mon input
							setSearch(event.target.value);
						}}
					></input>
				</div>
				<div className="containerButttons">
					{/* Si le token existe, on affiche déconnexion, sinon s'inscrire et se connecter */}
					{token ? (
						<button
							className="headerButton"
							onClick={() => {
								// Cookies.remove("token-vinted");
								handleTokenAndId(null, null);
							}}
						>
							se déconnecter
						</button>
					) : (
						<>
							<Link to="/signup">
								<button
									className="headerButton"
									//onClick={console.log("clic submit")}
								>
									S'inscrire
								</button>
							</Link>

							<Link to="/login">
								<button
									className="headerButton"
									//onClick={console.log("clic submit")}
								>
									Se connecter
								</button>
							</Link>
						</>
					)}

					<FontAwesomeIcon icon={["far", "circle-question"]} />

					{token ? (
						<Link to="/publish">
							<button className="headerButtonSell">vends tes articles</button>
						</Link>
					) : (
						<Link to="/login">
							<button className="headerButtonSell">vends tes articles</button>
						</Link>
					)}
				</div>
			</header>
		</>
	);
};

export default Header;
