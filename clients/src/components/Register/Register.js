import React, {  useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
 import { useGlobalContext } from "../../contexts/GlobalContext";
export default function Register() {
  const { registered } = useGlobalContext();
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const {email,password,firstname,lastname} = inputState;
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputState({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    })
    
  };
  return (
    <RegisterStyled>
      <header>
        <div className="center">
          <ul className="navbar">
            <li>
              <Link to="/" className="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login">Log in </Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/my-account">My Account</Link>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div className="main-box">
          <div className="text">
            <div className="first-line">Keep Track of your</div>
            <div className="second-line">income and</div>
            <div className="third-line">expenses flow</div>
          </div>

          <div className="con">
            {
              registered ? <div className="alert--sucess">{registered}</div> :' '
            }
            <div className="text2">
              <h3 className="user">New User</h3>
              <h1 className="register">Register</h1>
            </div>
            <form className="container" onSubmit={handleSubmit}>
              <div className="formgroup">
                <input
                  type="text"
                  name={"firstname"}
                  value={firstname}
                  placeholder="First name"
                  onChange={handleInput("firstname")}
                />
              </div>
              <div className="formgroup">
                <input
                  type="text"
                  name={"lastname"}
                  value={lastname}
                  placeholder="Last name"
                  onChange={handleInput("lastname")}
                />
              </div>
              <div className="formgroup">
                <input
                  type="text"
                  name={"email"}
                  value={email}
                  placeholder="Email"
                  onChange={handleInput("email")}
                />
              </div>
              <div className="formgroup">
                <input
                  type="password"
                  name={"password"}
                  value={password}
                  placeholder="Password"
                  onChange={handleInput("password")}
                />
              </div>
              <div className="formgroup">
                <button className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </RegisterStyled>
  );
}

const RegisterStyled = styled.div`
  height: 100vh;
  background-color: black;
  margin-top: 0px;
  .center {
    width: 100vw;
  }

  .password {
    text-align: center;
    height: 4vh;
    width: 100%;
    display: block;
    margin: 3px auto;
    border: 2px solid gray;
    border-left: none;
  }
  .password:focus {
    outline: black;
  }
  .navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .navbar li {
    list-style: none;
  }
  .text2 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
  }
  .navbar li a {
    color: black;
    padding: 40px 17px;
    text-decoration: none;
    color: white;
  }
  .navbar li a:hover,
  .navbar li a:active {
    text-decoration: none;
    color: grey;
  }
  .btn {
    margin: 0px 9px;
    background-color: blue;
    color: white;
    cursor: pointer;
    border: 2px solid white;
    height: 38px;
  }
  .btn:hover {
    background-color: green;
  }
  .con {
    color: black;
    margin: 5vw 0 0 0;
    padding: 51px 19px;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 30vw;
    background-color: white;
  }
  .formgroup input {
    text-align: center;
    height: 4vh;
    width: 100%;
    display: block;
    margin: 3px auto;
    border: 2px solid gray;
  }
  .password:focus {
    outline: none;
  }
  .btn {
    width: 100%;
    margin: 0px;
  }
  .main-box {
    display: flex;
    width: 100%;
    flex-direction: row;
    height: 60vh;
  }
  .text {
    font-size: 2.5rem;
    font-weight: 700;
    width: 60%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: white;
  }
  .formgroup {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user {
    color: gray;
    padding: 0;
    font-size:1.5rem;
    margin: 2px;
  }
  .register {
    font-size:1.2rem;
    margin: 2px;
    color:black;
  }
  .alert{
    color:white;
    background-color:black;
    border-radius:0px;
    display:flex;
    align-items:center;
    justify-content:center;
    visibility:hidden;
  }
  .alert--errorregistered{
    background-color:red;
  }
  .alert--success{
    background-color:green;
  }
`;
