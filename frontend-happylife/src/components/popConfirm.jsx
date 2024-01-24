
import React from 'react';
import ErrorIcon from '../assets/ErrorIcon.png';
import { useState } from 'react';

const popConfirm = ({realtimeNoti, isPopupOpen, setIsPopupOpen}) => {
    //const [isPopupOpen, setIsPopupOpen] = useState(!props.isLoginSuccess);
    const handleTryAgainClick = (e) =>{
        e.preventDefault();
        setIsPopupOpen(!isPopupOpen);
        console.log("RUN IN POPUP")
    }  

  return (
    <div className={`z-10 w-screen h-screen absolute w-auto h-auto flex justify-center h-screen items-center`}>
        <div className="w-[530px] h-[350px] bg-white rounded-md border-2 border-white shadow-3xl p-4 flex flex-col gap-3 items-center justify-center">
            <div className="w-auto h-auto text-red-700 text-[19.04px] font-medium font-['Poppins']">
                <img src={ErrorIcon} alt="ErrorIcon" />
            </div>
            <div className="w-auto h-auto text-red-700 text-[19.04px] font-medium font-['Poppins']">ERROR!</div>
            <div className="w-auto h-auto text-black text-base font-normal font-['Inter']">{realtimeNoti} </div>
            <div className="w-auto h-auto text-black text-xs font-light font-['Inter']">Please try again!</div>
            <div className="w-auto h-auto bg-red-700 rounded">
                <button 
                onClick={handleTryAgainClick}
                className="w-auto h-auto px-[50px] py-[10px] text-white text-[17.14px] font-medium font-['Inter']">Try again</button>
            </div>
        
        </div>

    </div>
  )
}

export default popConfirm
