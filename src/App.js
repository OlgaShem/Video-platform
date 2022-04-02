import React, {Component, useEffect, useState} from "react";
import ReactLoading from './Preloader';
import ReactPlayer from "react-player";
import './App.css';
import postData from "./utils";
import Modal from "./Modal";


function App() {
  const [token, setToken] = useState()
  const [videos, setVideos] = useState()
  const [play, setPlay] = useState()
  const [modal, setModal] = useState(false)

  useEffect(( )=> {  
    postData('https://thebetter.bsgroup.eu/Authorization/SignIn', {
  Device: {
    PlatformCode: "WEB",
    Name: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  }).then((data) => {
    console.log(data); 
    setToken(data.AuthorizationToken.Token)
    })
  }, [] )

  useEffect(() => {
    if(token) {
    postData('https://thebetter.bsgroup.eu/Media/GetMediaList',{MediaListId: 2, IncludeCategories: false, IncludeImages: true, IncludeMedia: false, PageNumber: 1, PageSize: 15, ImageTypeCode: "FRAME"}, token)
  .then(data => {
    console.log(data)
    setVideos(data.Entities)
  })}
  }, [token])

  useEffect(() => {
    if(token) {
    postData('https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo',{MediaId: 15, StreamType: "TRIAL"}, token)
  .then(data => {
    console.log(data)
    setPlay(data)
  })}
  }, [token])

  return (
    <div className="App">
      <ReactLoading/>
      
      <h1 className="main-title">Best videos</h1>
      {videos?.map((item) => (
      <div className="item" onClick={() => setModal ({
                ...modal, modal: true
              }) }>
      
        {item.Images?.map((img) => {
            if (img.ImageTypeCode === 'FRAME') {
              return (<p key={img.Id}>
                <img src={img.Url} alt="" width="400" height="260" ></img>
              </p>
              );
            }
          })}
        <div className="item__content">
          <p className="item__title">{item?.Title}</p> 
          <p className="item__description">{item?.Description}</p>
        </div>
      </div>))}
    
      <Modal
        isOpened ={modal.modal}
        onModalClose ={() => setModal({...modal, modal: false})}>
      </Modal>
    
    <ReactPlayer url={play && play.ContentUrl}></ReactPlayer>
    </div>
  );   //Video ContentUrl response 404, I added another link in Modal.js to show player works
}


export default App;
