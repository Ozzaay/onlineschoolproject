import React from 'react';
import axios from 'axios';
import './Products.css';

function Products () {
    const [products, setProducts] = React.useState([]);

    async function fetchProducts() {
        await axios.get("http://localhost:5000/GetAllProducts").then((response) => {
            setProducts(response.data);
        })
    }

    React.useEffect(() => {
        fetchProducts();
    }, []);

    return(
        <>
        <h1 className='produtta'>Products</h1>
        <ul className='ull'>
            {products.map((product) => {
                return(
                    <li className='scansostobaconkorv' key={product.id}>
                        <a className='namn' href={`/products/${product.name}`}>{product.name}</a>
                        <img className='bild' src={product.image} alt={product.name} />
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default Products;