import React, { useEffect, useState } from 'react'
import Style from 'styled-components'
import Logo from '../images/openai-1.webp'
import Img from '../images/Spinner-1s-200px.gif'
import axios from 'axios'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {saveAs} from 'file-saver'
 const Container=Style.div`
 
 `
const Title=Style.p`
margin: 30px 140px;
`
const Lable=Style.p`
margin: 30px 140px 0 140px;
`
const Input=Style.input`
margin: 5px 0px 20px 140px;
width:350px;
height:31px;
outline:none;
`
const Buttocontainer=Style.div`

 `
const Button=Style.button`
 padding:10px 15px;
 font-size:15px;
 background-color:#412991;
 color:white;
 border:none;
`
const Imagecontainer=Style.div`
margin: 30px 0px 30px 140px;
display: grid;
grid-template-columns:auto auto auto auto auto;
gap:10px;
`
const Image=Style.img`
 width:256px;
 &:hover{
  opacity:0.5;
 }
`
const Icon=Style.div`
position: absolute;
    top: 40%;
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    padding: 8px;
    opacity:0;
    
`
const Logocontainer=Style.div`
position:relative;
&:hover ${Icon}{
  opacity:1;
 }
`

function Home() {
  const [data,setData]=useState(null)
  const [loding,setLoding]=useState(true)
  const [firstid,setFirstid]=useState({})
  useEffect(()=>{
    const getimages = async () => {
      setLoding(true);
      const response = await axios.get("http://localhost:8000/images");
      console.log(response.data);
      setData(response.data)
      setFirstid(response.data[response.data.length-1])
      setLoding(false)
    };
    getimages();
    
  },[])
  const handleClicked=(e)=>{
    //e.preventDefault();
    console.log(e)
    saveAs(e,'image.jpeg');
  } 
  return (
    <>
    <Container >
      {/* <Container style={{gridColumn:'12'}}> */}
      <Title style={{fontSize:'22px'}}>GENERATE IMAGE HELP OF AI</Title>
      <Title>AI can help you for generateing beautiful image as you can wish</Title>
      <Lable>search image from your profile</Lable>
      <div>
      <Input type='text'/>
      <Button>search</Button>
      </div>
       {loding ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image src={Img} style={{ margin: "100px 0" }} />
        </div>
      ) : data === null ? (
        <Title
          style={{ margin: "20px 140px", color: "#412991", fontSize: "20px" }}
        >
          CAN NOT FIND IMAGE YET
        </Title>
      ) : (<>
        <Title style={{color:'darkblue',fontSize:'20px'}}>🤞 PHOTOS WHICH GENERATED BY DELL-E:</Title>
        <Imagecontainer>
        <Image src={`${firstid.image_url}`} style={{width:'100%',gridColumn:'1/4',gridRow:'1/4',opacity:'1'}}/>
          {data.filter((e)=>e._id!==firstid._id).map(e => (
           <Logocontainer>
           <Image  src={`${e.image_url}`} key={e._id} />
           <Icon style={{left:'26%'}} onClick={()=>handleClicked(e.image_url)}><FileDownloadOutlinedIcon/></Icon>
           <Icon style={{left:'48%'}}><FavoriteBorderIcon/></Icon>
           </Logocontainer>
          ))}
        </Imagecontainer></>)}
      </Container>
    {/* </Container> */}
    </>
  )
}

export default Home