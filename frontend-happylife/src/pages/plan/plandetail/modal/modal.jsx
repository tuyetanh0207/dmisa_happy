import './modal.css'
import { useState } from 'react';

export default function notlogin({ closeModal,onSubmit}) {

    const handleClick = (e) => {
        e.preventDefault();

    }

  return (

    <div  className="modal-container border-black rounded-lg border-2 "  onClick={(e) => { if (e.target.className === "modal-container") closeModal();}}>
        <div className="modal">
            
        </div>
    </div>
    
  )
}
