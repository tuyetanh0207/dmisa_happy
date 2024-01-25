
import React from 'react';
import ErrorIcon from '../assets/ErrorIcon.png';
import SuccessIcon from '../assets/SuccessIcon.png';

import { useState } from 'react';

const popConfirm = ({realtimeNoti, isPopupOpen, setIsPopupOpen, popupState}) => {

    //const [isPopupOpen, setIsPopupOpen] = useState(!props.isLoginSuccess);
    const handleTryAgainClick = (e) =>{
        e.preventDefault();
        setIsPopupOpen(!isPopupOpen);
        console.log("RUN IN POPUP")
    }  
if(popupState == false)
    return (
        <div className={`z-10 w-screen h-screen absolute w-auto h-auto flex justify-center h-screen items-center`}>
            <div className="w-[530px] h-[350px] bg-white rounded-md border-2 border-red-500 shadow-3xl p-4 flex flex-col gap-3 items-center justify-center">
                <div className="w-auto h-auto text-red-700 text-[19.04px] font-medium font-['Poppins']">
                    <img src={ErrorIcon} alt="ErrorIcon" />
                </div>
                <div className="w-auto h-auto text-red-700 text-[19.04px] font-medium font-['Poppins']">ERROR!</div>
                <div className="w-auto h-auto text-black text-base font-normal font-['Inter'] text-center">{realtimeNoti} </div>
                <div className="w-auto h-auto text-black text-xs font-light font-['Inter']">Please try again!</div>
                <div className="w-auto h-auto bg-red-700 rounded">
                    <button 
                    onClick={handleTryAgainClick}
                    className="w-auto h-auto px-[50px] py-[10px] text-white text-[17.14px] font-medium font-['Inter']">Try again</button>
                </div>
            
            </div>

        </div>
    )

if(popupState == true)
return (
    <div className={`z-10 w-screen h-screen absolute w-auto h-auto flex justify-center h-screen items-center`}>
        <div className="w-[530px] h-[350px] bg-white rounded-md border-2 border-green-500 shadow-3xl p-4 flex flex-col gap-3 items-center justify-center">
            <div className="w-auto h-auto text--700 text-[19.04px] font-medium font-['Poppins']">
                <img src={SuccessIcon} alt="SuccessIcon" />
            </div>
            <div className="w-auto h-auto text-green-700 text-[19.04px] font-medium font-['Poppins']">SUCCESS!</div>
            {/* <div className="w-auto h-auto text-black text-base font-normal font-['Inter'] text-center">{realtimeNoti} </div> */}
            <div className="w-auto h-auto text-black text-xs font-light font-['Inter']">You can continue now!</div>
            <div className="w-auto h-auto bg-green-700 rounded">
                <button 
                onClick={handleTryAgainClick}
                className="w-auto h-auto px-[50px] py-[10px] text-white text-[17.14px] font-medium font-['Inter']">Continue</button>
            </div>
        
        </div>

    </div>
)
}

// if(popupState === true) {
//     return (
//         <></>
//     )
// }

export default popConfirm
