import { Link } from "react-router-dom";    
import "./links.css";

function links () {
    return(
        <>
        <ul className="links">
            <li className="link"><Link to="">Home</Link></li>
            <li className="link"><Link to="products">Product</Link></li>
            <li className="link"><Link to="login">Login</Link></li>
            <li className="link"><Link to="shoppingcart">Shopping Cart</Link></li>
            <li className="link"><Link to="admin/products">Admin</Link></li>
        </ul>
        </>
    )
}

export default links;
