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
            setProduct(response.data[0]);
        })
    }

    async function addToCart(event) {
        try {
        event.preventDefault();
        var body = {
            productId: event.target.name.value
        }
        await axios.post("http://localhost:5000/addToCart", body, {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
        })
        .then((response) => {
            console.log(response);
        })
        } catch (error) {
            console.log(error);
        }
    }
        

    React.useEffect(() => {
        fetchProductDetails();
    }, []);

    return(
        <>
        <h1>ProductDetails</h1>
        <p>Product Name: {product.name}</p>
        <p>Product Price: {product.price}</p>
        <p>Product Description: {product.description}</p>
        <img src={product.image} alt={product.name} />
        <form onSubmit={addToCart}>
            <input type="hidden" name="name" value={product.id} />
            <input type="submit" value="Add to Cart" />
        </form>
        </>
    )
}

export default ProductDetails;