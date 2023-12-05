import React from "react";
import axios from "axios";
import "./footer.css";

function Footer() {
    const [footerTitle, setFooterTitle] = React.useState();
    const [footer, setFooter] = React.useState([]);

    async function getFooter() {
        axios.get("http://localhost:5000/footer/get_footer").then((response) => {
            console.log(response);
            setFooter(response.data);
        })
    }

    async function getFooterTitle() {
        axios.get("http://localhost:5000/site_text/single/footer").then((response) => {
            console.log(response);
            setFooterTitle(response.data);
        })
    }

    React.useEffect(() => {
        getFooterTitle();
        getFooter();
    }, []);

    return(
        <>
        <div className="footer_container">
            {/* <p>© 2023, No Rights Reserved, We Dont Own Anything Besides The Code</p> */}

            {footerTitle !== undefined ? (
                <p>{footerTitle[0].text}</p>
            ) : null}

            <div className="footer_list">
                {footer.map((foot) => {
                    return(
                        <div className="footer" key={foot.id}>
                            <a href={foot.link} target="_blank" rel="noopener noreferrer">{foot.text}</a>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Footer;