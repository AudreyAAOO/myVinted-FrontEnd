import logovinted from "../assets/img/logovinted.svg";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Header = ({ yourToken }) => {
	//! STATE
	const navigate = useNavigate();
	const [isConnected, setIsConnected] = useState(false);
	//! COMPORTEMENTS

	const handleClickSignup = () => {
		console.log("click");
		navigate("/signup");
	};

	const handleClickLogin = () => {
		console.log("click click");
		navigate("/login");
	};

	const handleClickSell = () => {
		console.log("click click click");
		navigate("/sell");
	};

	const getCookie = () => {
		if (Cookies.get(yourToken) !== null) {
			// elle s'affiche où ?
			console.log("isConnected :", isConnected);
			console.log("getCookie :", yourToken);
			setIsConnected(isConnected === true);
			console.log("isConnected :", isConnected);
		}
	};

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
						<FontAwesomeIcon icon="fa-magnifying-glass" />
					</p>
					<input
						className="inputSearch"
						type="search"
						placeholder="(*＾▽＾)／Rechercher des articles "
					></input>
				</div>
				<div className="containerButttons">
					{getCookie ? (
						<button className="headerButton" onClick={handleClickSignup}>
							s'incrire
						</button>
					) : (
						<button className="headerButton" type="submit">
							Se déconnecter
						</button>
					)}
					<button className="headerButton" onClick={handleClickLogin}>
						se connecter
					</button>

					<button className="headerButtonSell" onClick={handleClickSell}>
						vends tes articles
					</button>
					<FontAwesomeIcon icon="fa-circle-question" />
				</div>
			</header>
		</>
	);
};

export default Header;
