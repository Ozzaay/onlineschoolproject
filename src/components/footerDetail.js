import axios from "axios";
import React from "react";

function AdminFooterSingleEdit(props) {
    const [foot, setFoot] = React.useState(props.props.foot);

    function textChangeHandler(event) {
        setFoot((prevValue) => {
            return {
                ...prevValue,
                text: event.target.value
            }
        })
    }

    function linkChangeHandler(event) {
        setFoot((prevValue) => {
            return {
                ...prevValue,
                link: event.target.value
            }
        })
    }

    function updateFooter() {
        try {
            axios.post("http://localhost:5000/footer/update_footer", foot, {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                }
            }).then((response) => {
                console.log(response);

            })
        } catch (error) {
            console.log(error);
        }
    }

    function deleteFooter(){
        let body = {
            id: foot.id
        }
        try {
            axios.post("http://localhost:5000/footer/delete_footer", body, {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                }
            }).then((response) => {
                props.props.getFooter();
                console.log(response);
            })
        } catch (error) {
            console.log(error);
        }
    }



    return(
        <>
        
        {/* <div className="footer_list"> */}
            {/* <div key={foot.id}> */}
                <input type="text" value={foot.text} onChange={textChangeHandler} ></input>
                <input type="text" value={foot.link} onChange={linkChangeHandler} ></input>
                <button onClick={updateFooter}>Update Footer</button>
                <button onClick={deleteFooter}>Delete Footer</button>
            {/* </div> */}
        {/* </div> */}
        </>
    )
}

export default AdminFooterSingleEdit;