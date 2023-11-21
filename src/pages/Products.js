import React from 'react';
import axios from 'axios';
import './Products.css';

import no_image from '../Assets/icon-image-not-found.png'

function Products () {
    const [products, setProducts] = React.useState([]);

    async function fetchProducts() {
        await axios.get("http://localhost:5000/GetAllProducts").then((response) => {
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
        fetchProducts();
    }, []);

    return(
        <>
        <h1 className='produtta'>Products</h1>

        <div className='products'>
            {products.map((product) => {
                return(
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

        {/* <form className='prodform'>
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
        </form> */}
        </>
    )
}

export default Products;