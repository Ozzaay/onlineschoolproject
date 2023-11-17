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
        <form className='prodform'>
            <ul className='ull'>
                {products.map((product) => {
                    return(
                        <li className='scansostobaconkorv' key={product.id}>
                            <p></p>
                            <img className='bild' src={product.image} alt={product.name} />
                            <a className='namn' href={`/products/${product.name}`}>{product.name}</a>
                            <p className="price">{product.price}</p>
                        </li>
                    )
                })}
            </ul>
        </form>
        </>
    )
}

export default Products;