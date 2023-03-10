import "./footer.css";

const Footer = () => {
	return (
		<div className="containerFooter">
			<div className="footer">
				Made with{"\u00A0"}
				<a href="https://reactjs.org/">React{"\u00A0"}</a> at{"\u00A0"}
				<a href="https://www.lereacteur.io/" target={"_blank"} rel="noreferrer">
					Le Reacteur
				</a>
				, by{"\u00A0"}
				<a
					href="https://github.com/AudreyAAOO"
					target={"_blank"}
					rel="noreferrer"
				>
					Audrey{"\u00A0"}
				</a>
			</div>
		</div>
	);
};

export default Footer;

// {'\u00A0'} = créer un espace
