import React from 'react';
import axios from 'axios';

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
        <h1>Products</h1>
        <ul>
            {products.map((product) => {
                return(
                    <li key={product.id}>
                        <a href={`/products/${product.name}`}>{product.name}</a>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default Products;