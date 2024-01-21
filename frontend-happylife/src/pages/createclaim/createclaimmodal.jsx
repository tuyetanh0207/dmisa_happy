import './createclaimmodal.css'
export default function createclaimmodal({ closeModal}) {
  return (

    <div  className="modal-container border-black rounded-lg border-2 "  onClick={(e) => { if (e.target.className === "modal-container") closeModal();}}>
        <div className="modal">
            <form>
                <div className="pt-5 px-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Invoice Date</label>
                    <input type="text" id="name" name="name"
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="py-5 px-5">
                    <label  className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                    <input type="text" id="email" name="email"
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="pb-5 flex justify-center">
                    <button type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-7 rounded hover:bg-blue-700">
                        submit
                    </button>
                </div>
            </form>
        </div>
    </div>
    
  )
}
