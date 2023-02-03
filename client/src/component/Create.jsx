import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "styled-components";
import Img from "../images/default-image.png";
import Img2 from "../images/Spinner-1s-200px.gif";
import axios from "axios";
import { Buffer } from 'buffer';
//import firebase from "./firebase";
import { ref, getDownloadURL, uploadString, uploadBytesResumable } from "firebase/storage";
import { storage} from "./firebase";
import {v4} from "uuid"
import Loder from "../images/Dual Ring-1s-200px.gif"
const Container = Style.div`
 
 `;
const Title = Style.p`
margin: 30px 140px;
`;
const Lable = Style.p`
margin: 30px 140px 0 140px;
`;
const Input = Style.input`
margin: 5px 0px 20px 140px;
width:350px;
height:31px;
outline:none;
`;
const Button = Style.button`
 padding:10px 15px;
 font-size:15px;
 background-color:#412991;
 color:white;
 border:none;
`;
const Imagecontainer = Style.div`

//display:inline;
`;
const Image = Style.img`
border:1px solid #412991;
margin: 5px 0px 20px 140px;
 height:300px;
 width:300px;
 object-fit:cover;
`;
function Create() {
  const [loding, setLoding] = useState(false);
  const [url, setUrl] = useState({ image: "" });
  const[firebaseurl,setFirebaseUrl]=useState(null)
  const [btnLoding, setBtnLoding] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [data, setData] = useState({});
  const Onchange = (e) => {
    setData({ text: e.target.value });
  };
  const getimage = async () => {
    const response = await axios.post("http://localhost:8000/", {
      prompt: data.text,
    });
    console.log(response)
    setUrl({ image:`data:image/jpeg;base64,${response.data.img}`});
    setLoding(false);
  };

  const handleClicked = (e) => {
    e.preventDefault();
    setLoding(true);
    getimage();
  };
  const handleSubmit=(e)=>{
    
     e.preventDefault();
     setBtnLoding(true)
    const storageRef = ref(storage, `images/${v4()}.jpeg` );
    //const uploadTask = uploadString(storageRef, url.image, 'data_url');
    //const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
    uploadString(storageRef, url.image, 'data_url').then(async(snapshot) => {
      console.log('Uploaded a data_url string!')
        // Upload completed successfully, now we can get the download URL
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setFirebaseUrl(downloadURL);
        });
    });
  }
  useEffect(()=>{
    const postimage = async () => {
      const response = await axios.post("http://localhost:8000/photo", {
        title:data.text,
        image:firebaseurl,
      });
      console.log(response);
      if(response.data){
        console.log(response.data.sucess)
        setBtnLoding(false)
        setSucess(true)
      } 
    };
    postimage();
    setFirebaseUrl(null)
  
  },[firebaseurl])
  return (
    <Container>
      <Title style={{ fontSize: "22px" }}>GENERATE IMAGE HELP OF AI</Title>
      <Title>
        AI can help you for generateing beautiful image as you can wish
      </Title>
      <Lable>Enter text which will generate image</Lable>
      <Input type="text" onChange={Onchange} />
      <Button onClick={handleClicked}>Generate</Button>
      {url.image === "" ? (
        loding ? (
          <Imagecontainer style={{ display: "flex", alignContent: "center" }}>
            <Image src={Img2} />
          </Imagecontainer>
        ) : (
          <Imagecontainer>
            <Image src={Img} />
          </Imagecontainer>
        )
      ) : (
        <Imagecontainer>
          <Image src={`${url.image}`} alt="image" />
          {/* <ImageComponent url={`${url.image}`}/> */}
        </Imagecontainer>
      )}
      {!sucess?(btnLoding?<Button onClick={handleSubmit} style={{ width: "20vw", margin: "5px 0px 20px 140px",display: 'flex',alignItems: 'center',justifyContent: 'center' }}>
        Share to Home <Image src={Loder} style={{height: '25px',width: '25px',margin: '0 0 0 16px'}}/>
      </Button>:<Button onClick={handleSubmit} style={{ width: "20vw", margin: "5px 0px 20px 140px" }}>
        Share to Home
      </Button>):<Button onClick={handleSubmit} style={{ width: "20vw", margin: "5px 0px 20px 140px" }}>
        Share to Home
      </Button>}
    </Container>
  );
}

export default Create;
