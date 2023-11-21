import React from 'react';
import axios from 'axios';
import './Products.css';
import './AdminProducts.css';

import no_image from '../Assets/icon-image-not-found.png'

function AdminProducts () {
    const [products, setProducts] = React.useState([]);

    async function authorization() {
        try {
            await axios.post("http://localhost:5000/authorization", null, {
                headers: {
                    "authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
                }
            }).then((response) => {
                if(!response.data.status === "200") {
                    window.location.href = "/login";
                } else {
                    console.log(response.data);
                }
            })
        } catch (error){
            console.log(error);
            window.location.href = "/login";
        }
    }

    async function fetchProducts() {
        await axios.get("http://localhost:5000/GetAllProducts").then((response) => {
            console.log(response);
            setProducts(response.data);
        })
    }

    function imageCheck(image) {
        if (image === null || image === "") {
            return no_image;
        } else {
            return image;
        }
    }

    React.useEffect(() => {
        authorization();
        fetchProducts();
    }, []);

    return(
        <>
        <h1 className='produtta'>Admin Products</h1>
        <div className='addprod'>
            <a href="/admin/addproduct">Add Product</a>
        </div>
        {/* <form className='prodform'>
            <ul className='ull'>
                {products.map((product) => {
                    return(
                        <li className='scansostobaconkorv' key={product.id}>
                            <p></p>
                            <img className='bild' src={product.image} alt={product.name} />
                            <a className='namn' href={`/admin/products/${product.name}`}>{product.name}</a>
                            <p className="price">{product.price}</p>
                        </li>
                    )
                })}
            </ul>
        </form> */}
        <div className='products'>
            {products.map((product) => {
                return(
                    <div className='instance' key={product.id}>
                        <img className='picture' src={imageCheck(product.image)} />
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
        </>
    )
}

export default AdminProducts;