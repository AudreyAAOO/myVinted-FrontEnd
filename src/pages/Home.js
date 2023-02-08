import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
    return (<>
    <main className="main">
        <p>je suis une page d'acceuil (*＾▽＾)／</p>

        <section>
            
            <Link to={"/offer"}><p>voir les produits</p></Link>
            
        </section>
    </main>
    </>)

}