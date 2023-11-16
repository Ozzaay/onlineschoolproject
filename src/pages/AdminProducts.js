import React from 'react';
import axios from 'axios';
import './Products.css';

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

    React.useEffect(() => {
        authorization();
        fetchProducts();
    }, []);

    return(
        <>
        <h1 className='produtta'>Admin Products</h1>
        <form className='prodform'>
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
        </form>
        </>
    )
}

export default AdminProducts;