import { Link } from "react-router-dom";    
import "./links.css";

function links () {
    return(
        <>
        <ul>
            <li><Link to="/">app</Link></li>
            <li><Link to="/page1">page1</Link></li>
            <li><Link to="/page2">page2</Link></li>
            <li><Link to="/Login">Login</Link></li>
        </ul>
        </>
    )
}

export default links;