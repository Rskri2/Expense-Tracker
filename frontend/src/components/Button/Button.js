import React from 'react'
import styled from "styled-components";
export default function Button({name, icon, onClick, bg, bPad, color, bRad, hColor}) {
  return (
    <ButtonStyled
    style={{
        background:hColor,
        padding:bPad,
        borderRadius: bRad,
        color:color
    }} onClick={onClick}>
      {icon}
      {name}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
    outline:none;
    border:none;
    display:flex;
    align-items: center;
    gap:.5rem;
    font-family:inherit;
    font-size:inherit;
    
`