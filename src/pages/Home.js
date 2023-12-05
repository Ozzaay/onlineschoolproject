import React from "react";

 function Home () {
    const [homeText, setHomeText] = React.useState("");

    async function fetchText() {
        const response = await fetch("http://localhost:5000/site_text/single/home");
        const data = await response.json();
        setHomeText(data);
    }

    React.useEffect(() => {
        fetchText();
    }, []);

    return(
        <>
        <h1>Home</h1>
        {/* <p>This website is a school project and does not have any real functionality other than showing off programing capability.</p>
        <p>There is no real products and no real payment system, it's all just for show.</p>
        <p>Look around if you want, but don't expect to be able to buy anything.</p> */}
        <p>{homeText !== "" ? (homeText[0].text) : null}</p>
        </>
    )
}

export default Home;