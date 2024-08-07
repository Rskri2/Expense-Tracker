import { React, useEffect,useState } from "react";
import styled from "styled-components";
import avatar from "../img/avatar.png";
import { menuItems } from "../utils/menuItems";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import {  message } from "antd";
export default function Navigation({ active, setActive }) {
  const {   myAccount } = useGlobalContext();
  const [username, setUsername] = useState();
  message.config({
    duration:2
  });
  const handleLogout = async (e) => {
    window.localStorage.removeItem("token");
  };
  useEffect(() => {
    let firstname = window.localStorage.getItem("firstname");
    let lastname = window.localStorage.getItem("lastname");
    setUsername(firstname+" "+lastname)
    myAccount();
  }, []);

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="" />
        <div className="text">
          <h2>{username}</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
        <div className="bottom-nav">
          <Link to="/" onClick={handleLogout}>
            Sign Out
          </Link>
        </div>
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  height:100%;
  width: 23vw;
  background-color: white;
  border: 3px solid #FFFFFF;
  //backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  gap:2rem;
  .user-con{
    height:100px;
    display:flex;
    align-items:center;
    position:relative;
    top:40px;
    left:20px;
    img{
      width:100px;
      height:100px;
      border-radius:50%;
      object-fit:cover;background:#fcf6f9;
      border: 2px solid #FFFFFF;
      padding: 1rem;
      //box-shadow:0px 1px 17px rgba(0,0,0,0.6);
    }
    h2{
      color:rgba(34,34,96,1);
    }
    p{
      color:rgba(34,34,96,0.6);
    }
  }
  .menu-items{
    flex:1;
    display:flex;
    flex-direction:column;
    position:relative;
    top:30px;
    font-size:0.8rem;
    li{
      display:grid;
      grid-template-columns:40px auto;
      align-items:center;
      margin:.6rem 0l
      font-weight:500;
      cursor:pointer;
      transition: all .4s ease-in-out;
      color:rgba(34,34,96,.6);
      padding-left:1rem;
      position:relative;
    }
    i{
      color:rgba(34,34,96,.6);
      font-size:1rem;
      transition:all .4s ease-in-out;
    }
  }
  .text{
    margin:10px;
  }
  .active{
    color:rgba(34,34,96,1)!important;
    i{
      color:rgba(34,34,96,1)!important;
    }
    span{
      color:rgba(34,34,96,1);
    }
    &::before{
      content:"";
      position:absolute;
      left:0;
      top:0;
      width:4px;
      height:100%;
      background:#222260;
      border-radius: 0 10px 10px 0;
    }
  }
  .bottom-nav{
    position:absolute;
    bottom:20px;
    left:0px;
  }
`;
