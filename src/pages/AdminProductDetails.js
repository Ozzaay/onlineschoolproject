import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AdminProductDetails () {
    const { productId } = useParams();
    const [product, setProduct] = React.useState(
        {
            name: "",
            price: "",
            description: "",
            image: ""
        }
    );

    function priceChangeHandler(event) {
        setProduct((prevValue) => {
            return {
                ...prevValue,
                price: event.target.value
            }
        })
    }

    function descriptionChangeHandler(event) {
        setProduct((prevValue) => {
            return {
                ...prevValue,
                description: event.target.value
            }
        })
    }

    function imageChangeHandler(image) {
        setProduct((prevValue) => {
            return {
                ...prevValue,
                image: image
            }
        })
    }

    const handleImage = (event) => {
        const data = new FileReader()
        data.addEventListener('load', () => {
            imageChangeHandler(data.result)
        })
        data.readAsDataURL(event.target.files[0])

    }

    async function authorization() {
        try {
            // const headers = {
            //     authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            // }
            await axios.post("http://localhost:5000/authorization", null, {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                }
            })
            .then((response) => {
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


    async function fetchProductDetails() {
        await axios.post("http://localhost:5000/GetProduct", {
            name: productId
        }).then((response) => {
            setProduct(response.data[0]);
        })
    }

    async function updateProduct(event) {
        event.preventDefault();
        var body = {
            name: `${product.name}`,
            price: `${product.price}`,
            description: `${product.description}`,
            image: `${product.image}`
        }
        var headers = {
            "authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
        await axios.post("http://localhost:5000/updateProduct", body, {
            headers: {
                "authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
        })
        .then((response) => {
            console.log(response);
        })
    }
        

    React.useEffect(() => {
        authorization();
        fetchProductDetails();
    }, []);

    return(
        <>
        <h1>ProductDetails</h1>
        <p>Product ID: {productId}</p>
        <p>Product Name: {product.name}</p>
        <p>Product Price: {product.price}</p>
        <p>Product Description: {product.description}</p>
        <img src={product.image} alt={product.name} />
        <form>
            <label>Price</label>
            <input type="text" onChange={priceChangeHandler} value={product.price} />
            <label>Description</label>
            <input type="text" onChange={descriptionChangeHandler} value={product.description} />
            <label>Image</label>
            <input type="file" onChange={handleImage}/>
            <button onClick={updateProduct}>Update Product</button>
        </form>


        {/* <h1>ProductDetails</h1>
        <p>Product ID: {productId}</p>
        <p>Product Name: {product.name}</p>
        <p>Product Price: {product.price}</p>
        <p>Product Description: {product.description}</p>
        <img src={product.image} alt={product.name} /> */}
        </>
    )
}

export default AdminProductDetails;