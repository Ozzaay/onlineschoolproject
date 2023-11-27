import React, { useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./ShoppingCart.css";

import no_image from '../Assets/icon-image-not-found.png'

function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    async function getCart() {
        try {
            await axios.get("http://localhost:5000/cart/get_cart", {
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


    // async function changeAmount(product) {
    //     const [amount, setAmount] = React.useState(product.amount);

    //     function addAmount() {
    //         // setAmount(amount+1);
    //         console.log(amount);
    //     }

    //     return(
    //         <div className="amount">
    //             <button onClick={addAmount} className="add">+1</button>
    //             <a>{product.amount}</a>
    //             <button className="reduce">-1</button>
    //         </div>
    //     )
    // }

    function imageCheck(image) {
        if (image === null || image === "") {
            return no_image;
        } else {
            return image;
        }
    }

    function calculateTotal(){
        let total = 0;
        cart.forEach((product) => {
            total += Number(product.price)*Number(product.amount);
        })
        setCartTotal(total);
    }

    async function addAmount(id){
        // var theOne = cart.findIndex(x => x.productId === id)
        setCart(
            cart.map((product) => {
                if (product.productId === id) {
                    product.amount += 1
                    calculateTotal()
                }
                return product
            })
        )
    }

    function reduceAmount(id){
        setCart(
            cart.map((product) => {
                if (product.productId === id) {
                    if(product.amount <= 1){
                        confirmAlert({
                            title: 'Confirm to remove from shopping cart',
                            message: 'Are you sure you want to remove this item from your shopping cart?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () => {
                                    setCart(
                                        cart.filter(x => x.productId != id),
                                    )
                                    setCartTotal(
                                        cartTotal - product.price
                                    )
                                }
                              },
                              {
                                label: 'No',
                                onClick: () => {
                                    // alert("item was")
                                    
                                }
                              }
                            ]
                          });
                    } else {
                        product.amount -= 1
                    }
                }
                return product
            })
        )
        calculateTotal()
    }

    async function saveChange(event) {
        event.preventDefault();
        try {
            let toBeSent = [];

            cart.forEach((product) => {
                toBeSent.push({
                    productId: product.productId,
                    amount: product.amount
                })
            })

            let body = {
                newCart: toBeSent
            }
            await axios.post("http://localhost:5000/cart/change_cart", body, {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                }
            }).then((response) => {
                if (response.data === "Cart Updated") {
                    alert("Cart update saved");
                    getCart();
                } else {
                    alert("Cart save failed");
                }
            })
        } catch (error) {
            console.log(error);
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
            <h1 className="produtta">Shopping Cart</h1>
            <h3 className="produtta">Logged in as {sessionStorage.getItem("username")}</h3>
            {/* <button onClick={test}>test</button> */}
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

            {/* {cart[0].amount} */}
            {/* <button onClick={() => {setCartTotal(1)}}>test</button> */}

            {cart.map((product) => {
                return (
                    <div className='instance' key={product.productId}>
                        <img className='picture' src={imageCheck(product.image)} alt='Error'/>
                        <div className='item'>
                            <div className="orderNameAndPrice">
                                <div className='orderName'>
                                    <a  href={`/products/${product.name}`}>{product.name}</a>
                                </div>
                                <div className='orderPrice'>
                                    <a  >Cost {product.price}</a>
                                </div>  
                            </div>
                            <div className='amount'>
                                <button className="add" onClick={() => {addAmount(product.productId)}}>+1</button>
                                    <a>{product.amount}</a>
                                <button className="reduce" onClick={() => {reduceAmount(product.productId)}}>-1</button>
                            </div>

                            {/* {changeAmount(product)} */}
                            {/* <ChangeAmount props={changeAmount} /> */}
                            {/* {product.amount}
                            <button onClick={() => {changeAmount(product.productId)}}>test</button> */}

                            {/* <div className="amount">
                                <form onSubmit={(e) => {e.preventDefault()}}>
                                    <button onClick={} className="add">+1</button>
                                    <a>{product.amount}</a>
                                    <button onClick={product.amount-=1} className="reduce">-1</button>
                                </form>
                            </div> */}
                        </div>
                    </div>
                )
            })}
            </div>

            <div>
                <button onClick={saveChange}>Save changes</button>
            </div>

            <div className="orderDiv">
                <p>Total: ${cartTotal}</p>
                <button onClick={makeOrder}>Order</button>
            </div>
        </>
    )}
}

export default ShoppingCart;