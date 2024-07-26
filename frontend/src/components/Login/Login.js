import React,{ useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext"; 
export default function Login() {

  const {login,loggedIn} = useGlobalContext();
  const [inputState, setInputState] = useState({
    email: "",
    password: ""
  });

  const {email, password} = inputState;
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputState);
    setInputState({
      email: "",
      password: ""
    });

  };
  
  return (
    <LoginStyled>
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
              <Link to="/register">Register </Link>
            </li>
            <li>
              <Link to="/my-account">My Account </Link>
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
            loggedIn ? <div className="alert">{loggedIn}
            </div> : ' '
          }

            <div className="text2">
            <h3 className="user">Existing User</h3>
            <h1 className="register">Log in</h1>
            </div>
            <form  className="container" onSubmit={handleSubmit}>
              <div className="formgroup">
                <input type="text" name={"email"} value={email} placeholder="Email" onChange={handleInput("email")}/>
              </div>
              <div className="formgroup">
                <input type="password" name={"password"} value={password} placeholder="Password" onChange={handleInput("password")}/>
              </div>
              <button className="btn ">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </LoginStyled>
  );
}


const LoginStyled = styled.div`
  background-color:black;
  height:100vh;
  margin-top:0px;
  .center {
    width: 100vw;
  }
  .navbar {
    display: flex;
    flex-direction:row;
      align-items:center;
    justify-content:center;
  }
  .navbar li {
    list-style:none;
  }
  .text2{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color:white;
  }
  .navbar li a {
    color: black;
    padding: 40px 17px;
    text-decoration: none;
    color:white;
  }
  .navbar li a:hover,
  .navbar li a:active {
    text-decoration: none;
    color: grey;
  }
  .btn {
    margin: 0px 0px;
    background-color: blue;
    color: white;
    cursor: pointer;
    height:5vh;
    border: 2px solid white;
  }
  .btn:hover {
    background-color: green;
  }
  .con {
    color: black;
    margin: 5vw 0 0 0;
    padding: 51px 19px;
    height: 50vh;
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
  .btn {
    width: 100%;   
    margin:0px;
  }
  .main-box {
    display: flex;
    width: 100%;
    flex-direction: row;
    height:60vh;
  }
  .text {
    font-size: 2.5rem;
    font-weight: 700;
    width: 60%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color:white;
  }
  .formgroup {
    display:flex;
    align-items:center;
    justify-content:center;
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

`;

