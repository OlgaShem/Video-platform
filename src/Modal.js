import React from "react";
import ReactPlayer from 'react-player'


const Modal = props => {
    return (
        <div className={`modal ${props.isOpened ? 'open' : 'close' }`}>
            <div className="modal-content">
                <div className="modal-close" onClick={props.onModalClose}>х</div>  
                <ReactPlayer url="https://www.youtube.com/watch?v=GV3HUDMQ-F8"></ReactPlayer>
            </div>
        </div>
    );
}

export default Modal;