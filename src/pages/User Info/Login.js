import React, { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {

  const navigate = useNavigate();

  const [action, setAction] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const create = await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
    });

    const response = create.json();

    if (response.status === 200)
    alert("User Created")
    navigate("", {state: {name: name}})

  };

  const handleSignin = async (event) => {
    event.preventDefault();
    const login = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    await login.json().then((response) => {
     
      try {
        if (
          response !== "Login Failed"
          // email === loginResponse.rows[0].email &&
          // password === loginResponse.rows[0].password 
        ) {
          sessionStorage.setItem("username", response.username);
          sessionStorage.setItem("isAdmin", response.isAdmin);
          sessionStorage.setItem("accessToken", response.accessToken);
          // navigate("/", { state: { id: loginResponse.rows[0].id, name: loginResponse.rows[0].username } });
          navigate("/")
        } else {
          alert("Login Failed");
        }
      } catch (error) {
        console.log(error);
        alert("Login Failed");
      }
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? <div></div>: 
        <div className="input">
          <img src={user_icon} alt="" />
          <input 
          type="text" 
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          />
        </div>}
        <div className="input">
          <img src={email_icon} alt="" />
          <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          />
        </div>
      </div>
      {action === "Sign Up" ? <div></div>: <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
      <div className="submit-container">
        

        {action === "Sign Up" ?
          <div className="submit" onClick={handleSubmit}>Sign Up</div>
          :
          <div className={action === "Login" ? "submit gray": "submit"} onClick={() => {setAction("Sign Up")}}>Sign Up</div>
        }

        {action === "Login" ? 
          <div className="submit" onClick={handleSignin}>Login</div>
          :
          <div className={action === "Sign Up" ? "submit gray": "submit"} onClick={() => {setAction("Login")}}>Login</div>
        }
      </div>
    </div>
  )
}

export default LoginSignup