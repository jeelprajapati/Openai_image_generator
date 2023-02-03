import React from 'react'
import { Link } from 'react-router-dom'
import Style from 'styled-components'
import Logo from '../images/openai-1.webp'
const Container=Style.div`
 display:flex;
 align-items:center;
 justify-content: space-between;
`
const LogoContainer=Style.div`
margin-left:50px;
`
const Image=Style.img`
width:130px;
`
const Buttoncontainer=Style.div`
margin-right:50px;
`
const Button=Style.button`
 padding:10px 15px;
 font-size:15px;
 background-color:#412991;
 color:white;
 border:none;
`
function Navbar() {
  
  return (
    <>
       <Container>
        <LogoContainer><Link to='/'><Image src={Logo}/></Link></LogoContainer>
        <Buttoncontainer><Link to='/create'><Button>Create</Button></Link></Buttoncontainer>
       </Container>
    </>
)}

export default Navbar
