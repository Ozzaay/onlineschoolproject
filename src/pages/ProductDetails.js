import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails () {
    const { productId } = useParams();
    const [product, setProduct] = React.useState("");
    const [amount, setAmount] = React.useState(0);

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
        console.log(product.id, amount)
        var body = {
            productId: Number(product.id),
            amount: Number(amount)
        }
        await axios.post("http://localhost:5000/add_to_cart", body, {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
        })
        .then((response) => {
            if (response.data === "Already in cart") {
                alert("Already in cart");
            }
            if (response.data === "Added to cart") {
                alert("Added to cart");
            }
            // console.log(response);
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
        <h1 className="produtta">ProductDetails</h1>
        {/* <li className="box">
            <img className="bild2" src={product.image} alt={product.name} />
            <li className="box2">
                <p className="namn2">{product.name}</p>
                <p className="namn2">{product.price}</p>
                <p className="namn2">{product.description}</p>
                <form onSubmit={addToCart}>
                    <input type="hidden" name="name" value={product.id} />
                    <input type="submit" value="Add to Cart" />
                </form>
            </li>
        </li> */}
        <div className="backround">
            <div className="title">
                <h2>{product.name}</h2>
            </div> 

            <div className="rows">
                <div className="single_picture">
                    <img src={product.image}></img>
                </div>

                <div className="payment">
                    <p>Cost {product.price}</p>
                    <form onSubmit={addToCart}>
                        <input type="hidden" name="name" value={product.id} />
                        <input type="number" name="amount" value={amount} onChange={(e) => {setAmount(e.target.value)}}></input>
                        <input type="submit" value="Add to Cart" />
                    </form>
                </div>
            </div>

            <div className="description">
                <p>{product.description}</p>
            </div>
        </div>

        </>
    )
}

export default ProductDetails;