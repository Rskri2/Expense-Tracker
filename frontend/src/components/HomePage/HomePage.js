import React from 'react'
import background from '../../img/heroImage.jpg'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
export default function HomePage() {
  return (
    <HomePageStyled>
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
        <main>
        <div className="right">
        <img className="background" src={background}alt="main"/> 
        </div>
        <div className="text-section">
        <div className="text">
            <div >Keep Track of your</div>
            <div >Incomes and</div>
            <div >Expenses</div>
          </div>
          <div className="small-text">
            <div>View all your incomes and expenses flow from your </div>
              <div>team in one dashboard</div>
          </div>
        </div>
        </main>
    </HomePageStyled>
  )
}
const HomePageStyled = styled.div`

.center {
  width: 100vw;
  background-color:black;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  height:7.5vh;
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
.background{
  z-index:-1000;
  width:50vw;
  height:92.2vh;
  flex:1;
}
.text {
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  margin-bottom:4rem;
}
.text-section{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}
main{
  display:flex;
}
.small-text{
  color:gray;
  font-weight:600;
  font-size:1.2rem;
  display:flex;
  margin-left:100px;
  flex-direction:column;
}
`