import React from "react";
import axios from "axios";
import "./ShoppingCart.css";

import no_image from '../Assets/icon-image-not-found.png'

function ShoppingCart() {
    const [cart, setCart] = React.useState([]);
    const [cartTotal, setCartTotal] = React.useState(0);

    async function getCart() {
        try {
            await axios.get("http://localhost:5000/getCart", {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                }
            }).then((response) => {
                setCart(response.data);
                let total = 0;
                response.data.forEach((product) => {
                    total += Number(product.price)*Number(product.amount);
                })
                setCartTotal(total);
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    async function deleteFromCart(event) {
        event.preventDefault();
        var body = {
            productId: event.target.name.value
        }
        await axios.post("http://localhost:5000/removeFromCart", body, {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
        })
        .then((response) => {
            console.log(response);
            getCart();
        })
    }

    async function makeOrder(event) {
        // alert("nah, you don't get to")
        event.preventDefault();
        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        } else {
            try {
                let body = {
                    products: cart
                }
                await axios.post("http://localhost:5000/makeOrder", body, {
                    headers: {
                        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    }
                }).then((response) => {
                    if (response.data === "Order Successful") {
                        alert("Order Successful");
                        getCart();
                    } else {
                        alert("Order Failed");
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    function imageCheck(image) {
        if (image === null || image === "") {
            return no_image;
        } else {
            return image;
        }
    }

    React.useEffect(() => {
        getCart();
    }, []);

    if (sessionStorage.getItem("accessToken") === null || sessionStorage.getItem("accessToken") === undefined || sessionStorage.getItem("accessToken") === "") {
        return (
            <>
                <h1 className='hometitle'>Shopping Cart</h1>
                <p className='expl'>You are not logged in</p>
            </>
        )
    } else {
    return (
        <>
            <h1 className="produtta">Shopping Cart</h1>
            <h3 className="produtta">Logged in as {sessionStorage.getItem("username")}</h3>
            <div className="products">
            
            {/* <ul> */}
                {/* {cart.map((product) => {
                    return (
                        <div key={product.id}>
                            <a href={`/products/${product.name}`}>{product.name} ${product.price} amount {product.amount}</a>
                            <form onSubmit={deleteFromCart}>
                                <input type="hidden" name="name" value={product.id} />
                                <img src={product.image} alt={product.name} />
                                <button type="submit">Delete</button>
                            </form>
                            <br />
                        </div>
                    )
                })} */}
            {/* </ul> */}

            {cart.map((product) => {
                return (
                    <div className='instance' key={product.id}>
                        <img className='picture' src={imageCheck(product.image)} alt='Error'/>
                        <div className='nameAndPrice'>
                            <div className='name'>
                                <a  href={`/products/${product.name}`}>{product.name}</a>
                            </div>
                            <div className='price'>
                                <a  >Cost {product.price}</a>
                            </div>             
                        </div>
                    </div>
                )
            })}
            </div>

            <div className="orderDiv">
                <p>Total: ${cartTotal}</p>
                <button onClick={makeOrder}>Order</button>
            </div>
        </>
    )}
}

export default ShoppingCart;