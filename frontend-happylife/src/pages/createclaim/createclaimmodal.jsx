import './createclaimmodal.css'
import { useState } from 'react';
import { format } from 'date-fns';
export default function createclaimmodal({ closeModal,onSubmit}) {

    const [formState,setFormState] = useState({

        invoiceDate:"",
        amount: "",
        status: "Pending"
    })

    const handleInvoiceDateChange = (e) => {   
        const parsedDate = new Date(e.target.value); 
        const formattedDate = format(parsedDate, 'dd/MM/yyyy');
        setFormState({
            ...formState,
            invoiceDate: formattedDate
      
        })
    }

    const handleAmountChange = (e) => {    
        setFormState({
            ...formState,
            amount: e.target.value
      
        })
    }

    // const handleChange = (e) => {    
    //     setFormState({
    //         ...formState,
    //         [e.target.name]: e.target.value
      
    //     })
    // }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('input:',formState);
        onSubmit(formState);
        closeModal();
    }

  return (

    <div  className="modal-container border-black rounded-lg border-2 "  onClick={(e) => { if (e.target.className === "modal-container") closeModal();}}>
        <div className="modal">
            <form>
                <div className="form-group pt-5 px-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Invoice Date</label>
                    <input type="date" name="invoiceDate" value={formState.invoiceDate} onChange={handleInvoiceDateChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                     <p>Date: {formState.invoiceDate}</p>
                </div>
                <div className="form-group py-5 px-5">
                    <label  className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                    <input type="text" name="amount" value={formState.amount} onChange={handleAmountChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="pb-5 flex justify-center">
                    <button type="submit" onClick={handleSubmit}
                            className="bg-blue-500 text-white font-bold py-2 px-7 rounded hover:bg-blue-700">
                        submit
                    </button>
                </div>
            </form>
        </div>
    </div>
    
  )
}
