import React from "react";
import axios from "axios";
import FooterEdit from "../components/footerDetail"

function AdminFooterEdit() {
    const [footer, setFooter] = React.useState([]);
    const [footerToAdd, setFooterToAdd] = React.useState(
        {
            text: "",
            link: ""
        }
    );

    function textChangeHandler(event) {
        setFooterToAdd((prevValue) => {
            return {
                ...prevValue,
                text: event.target.value
            }
        })
    }

    function linkChangeHandler(event) {
        setFooterToAdd((prevValue) => {
            return {
                ...prevValue,
                link: event.target.value
            }
        })
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

    function getFooter() {
        axios.get("http://localhost:5000/footer/get_footer").then((response) => {
            setFooter(response.data);
        })        
    }

    function createFooter() {
        axios.post("http://localhost:5000/footer/create_footer", footerToAdd, {
            headers: {
                "authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
        }).then((response) => {
            console.log(response);
        })
    }

    React.useEffect(() => {
        authorization();
        getFooter();
    }, []);

    return(
        <>
        <h1>AdminFooterEdit</h1>

        <div>
            <input type="text" onChange={textChangeHandler} placeholder="Name"></input>
            <input type="text" onChange={linkChangeHandler} placeholder="link"></input>
            <button onClick={createFooter}>Add Footer</button>
        </div>



        <div className="footer_container">
            <div className="footer_list">
                {footer.map((foot) => {
                    const footProps = {getFooter, foot}
                    return(
                        <div key={foot.id}>
                            <FooterEdit props={footProps} />
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default AdminFooterEdit;