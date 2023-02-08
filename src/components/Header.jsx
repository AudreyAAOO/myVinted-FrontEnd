import logovinted from "../assets/img/logovinted.svg";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
	return (
		<>
        <header>
			<img src={logovinted} alt="vinted logo" />
			<div className="container-research">
				<select name="categories" id="">
					<option value="articles">Articles</option>
					<option value="membres">Membres</option>
					<option value="forum">Forum</option>
					<option value="aide">Centre d'aide</option>
				</select>
				<FontAwesomeIcon icon="fa-magnifying-glass" />
				<input type="search" placeholder="(*＾▽＾)／Rechercher des articles " />
			</div>
			<button>s'incrire</button>
			<FontAwesomeIcon icon="fa-heart" />
			<button>se connecter</button>
			<FontAwesomeIcon icon="fa-circle-question" />
			<button>vends tes articles</button>
			
		</header></>
	);
};

export default Header;

/*	<select name="pays" id="footerCountry">
						<!-- <optgroup label=""></optgroup> -->

					</select>*/
