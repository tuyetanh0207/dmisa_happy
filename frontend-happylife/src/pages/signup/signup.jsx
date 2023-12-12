const signup = () => {
  return (
    <div className="h-screen flex items-center justify-center h-[631px] bg-bgr-white my-auto">
        <div className="w-[936px] h-[780px] bg-white rounded-lg">
        <h2 className="text-center text-header-blue text-[40px] font-serif font-semibold mt-[51px] mb-[53px]">Registration Form</h2>
        <form className="font-sans  font-medium text-base">
            <div>
                <label className="ml-[208px]">
                    Username
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded">
                </input>
            </div>
            <div>
                <label className="ml-[208px] ">
                    Email
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded">
                </input>
            </div>
            <div>
                <label className="ml-[208px] ">
                    Password
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded">
                </input>
            </div>
            <div>
                <label className="ml-[208px] ">
                    Confirm Password
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded">
                </input>
            </div>
            <div>
                <label className="ml-[208px]">
                    Phone Number
                </label>
                <label className="ml-[155px]">
                    Birthday
                </label>
                
            </div>
            <div>
                <input className="text-black w-[253px] h-[48px] mb-[12px] ml-[208px] border border-input-border-grey rounded">
                </input>
                <input className="text-black w-[253px] h-[48px] mb-[12px] ml-[13px] border border-input-border-grey rounded">
                </input>
            </div>
            <div>
                <label className="ml-[208px] ">
                    Identity Number
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[38px] border border-input-border-grey rounded">
                </input>
            </div>
            

            <div className="flex items-center justify-center font-bold text-xl">
            <button className="bg-button-blue w-[520px] h-[56px] text-white rounded-lg">
                Create
            </button>

            </div>
        </form>
        </div>
    </div>
  )
}

export default signup