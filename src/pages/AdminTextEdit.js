import React from "react";
import axios from "axios";

function AdminTextEdit() {
    const [savedText, setSavedText] = React.useState();
    const [text, setText] = React.useState({
        text: "",
        name: ""
    });

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

    function changeName(event) {
        setText((prevValue) => {
            return {
                ...prevValue,
                name: event.target.value
            }
        })
    }

    function changeText(event) {
        setText((prevValue) => {
            return {
                ...prevValue,
                text: event.target.value
            }
        })
    }

    async function updateText(event) {
        event.preventDefault();
        await axios.post("http://localhost:5000/site_text/update", text, {
            headers: {
                "authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
        })
        .then((response) => {
            console.log(response);
            fetchText();
        })
    }

    async function fetchText() {
        await axios.get("http://localhost:5000/site_text/get_text")
        .then((response) => {
            console.log(response)
            setSavedText(response.data);
        })
    }

    React.useEffect(() => {
        fetchText();
        authorization();
    }, []);

    return (
        <>
        <div>
            <h1>Admin Site Text</h1>
        </div>
        <input onChange={changeName}></input>
        <input type="text" onChange={changeText} />
        <button onClick={updateText}>Update Text</button>
        {text.name !== "" ? (
            <div>
                <h1>{text.text}</h1>
            </div>
        ) : null}


        <div>
            <h1>existing site text</h1>
            {savedText !== undefined ? (
                <div>
                    {savedText.map((text) => {
                        return (
                            <div key={text.name}>
                                <h4>{text.name}</h4>
                                <a>{text.text}</a>
                            </div>
                        )
                    })}
                </div>
            ) : null}
        </div>

        </>
    )
}

export default AdminTextEdit;