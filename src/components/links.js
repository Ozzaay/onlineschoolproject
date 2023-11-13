import { Link } from "react-router-dom";    
import "./Links.css";

function Links () {
    return(
        <>
        <ul className="links">
            <li className="link"><Link to="">Home</Link></li>
            <li className="link"><Link to="products">Product</Link></li>
            <li className="link"><Link to="login">Login</Link></li>
        </ul>
        </>
    )
}

export default Links;