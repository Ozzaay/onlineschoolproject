import React from "react";
import axios from "axios";

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

    React.useEffect(() => {
        getCart();
    }, []);

    if (sessionStorage.getItem("accessToken") === null || sessionStorage.getItem("accessToken") === undefined || sessionStorage.getItem("accessToken") === "") {
        return (
            <>
                <h1>Shopping Cart</h1>
                <p>You are not logged in</p>
            </>
        )
    } else {
    return (
        <>
            <h1>Shopping Cart</h1>
            
            <ul>
                {cart.map((product) => {
                    return (
                        <li key={product.id}>
                            <a href={`/products/${product.name}`}>{product.name} ${product.price} amount {product.amount}</a>
                            <form onSubmit={deleteFromCart}>
                                <input type="hidden" name="name" value={product.id} />
                                <img src={product.image} alt={product.name} />
                                <button type="submit">Delete</button>
                            </form>
                            <br />
                        </li>
                    )
                })}
            </ul>
            <p>Total: ${cartTotal}</p>
            <button onClick={makeOrder}>Order</button>
        </>
    )}
}

export default ShoppingCart;