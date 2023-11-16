import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails () {
    const { productId } = useParams();
    const [product, setProduct] = React.useState("");

    async function fetchProductDetails() {
        await axios.post("http://localhost:5000/GetProduct", {
            name: productId
        }).then((response) => {
            setProduct(response.data[0]);
        })
    }
        

    React.useEffect(() => {
        fetchProductDetails();
    }, []);

    return(
        <>
        <h1 className="produtta">ProductDetails</h1>
        <li className="box">
            <img className="bild2" src={product.image} alt={product.name} />
            <li className="box2">
                <p className="namn2">Product Name: {product.name}</p>
                <p className="namn2">Product Price: {product.price}</p>
                <p className="namn2">Product Description: {product.description}</p>
            </li>
        </li>
        </>
    )
}

export default ProductDetails;