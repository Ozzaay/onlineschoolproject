import React from "react";
import axios from "axios";

function AddProduct(){
    const [productToAdd, setProductToAdd] = React.useState(
        {
            name: "",
            price: "",
            description: "",
            image: ""
        }
    );

    function nameChangeHandler(event) {
        setProductToAdd((prevValue) => {
            return {
                ...prevValue,
                name: event.target.value
            }
        })
    }

    function priceChangeHandler(event) {
        setProductToAdd((prevValue) => {
            return {
                ...prevValue,
                price: event.target.value
            }
        })
    }

    function descriptionChangeHandler(event) {
        setProductToAdd((prevValue) => {
            return {
                ...prevValue,
                description: event.target.value
            }
        })
    }

    function imageChangeHandler(image) {
        setProductToAdd((prevValue) => {
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

    async function createProduct(event) {
        event.preventDefault();
        try {
            let body = {
                name: productToAdd.name,
                price: productToAdd.price,
                description: productToAdd.description,
                image: productToAdd.image
            }
            await axios.post("http://localhost:5000/createProduct", body, {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                }
            }).then((response) => {
                console.log(response);
            })
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        authorization();
    }, []);

    return(
        <>
            <h1>Add Product</h1>

            <form onSubmit={createProduct}>
                <input type="text" name="name" placeholder="Name" onChange={nameChangeHandler} />
                <input type="number" name="price" placeholder="Price" onChange={priceChangeHandler} />
                <input type="text" name="description" placeholder="Description" onChange={descriptionChangeHandler} />
                <input type="file" name="image" onChange={handleImage} />
                <input type="submit" value="Create Product" />
            </form>

            

        </>
    )
}

export default AddProduct;