import React from 'react';
import axios from 'axios';

function AdminProducts () {
    const [products, setProducts] = React.useState([]);

    async function authorization() {
        try {
            await axios.post("http://localhost:5000/authorization", {
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
        <h1>Products</h1>
        <ul>
            {products.map((product) => {
                return(
                    <li key={product.id}>
                        <a href={`/admin/products/${product.name}`}>{product.name}</a>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default AdminProducts;