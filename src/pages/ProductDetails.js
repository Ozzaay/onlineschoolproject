import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails () {
    const { productId } = useParams();
    const [product, setProduct] = React.useState("");

    async function fetchProductDetails() {
        await axios.post("http://localhost:5000/GetProduct", {
            name: productId
        }).then((response) => {
            console.log(response);
            console.log(response.data[0]);
            setProduct(response.data[0]);
        })
    }
        

    React.useEffect(() => {
        fetchProductDetails();
    }, []);

    return(
        <>
        <h1>ProductDetails</h1>
        <p>Product ID: {productId}</p>
        <p>Product Name: {product.name}</p>
        <p>Product Price: {product.price}</p>
        <p>Product Description: {product.description}</p>
        <img src={product.image} alt={product.name} />
        </>
    )
}

export default ProductDetails;