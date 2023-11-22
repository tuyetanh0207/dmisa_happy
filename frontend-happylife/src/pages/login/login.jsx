export default function Login() {
      
    return(
    <div className="h-screen flex items-center justify-center h-[631px] bg-bgr-white">
        <div className="w-[936px] h-[479px] bg-white rounded-lg">
        <h2 className="text-center text-header-blue text-[40px] font-serif font-semibold mb-6 mt-[51px] mb-[53]">User Login</h2>
        <form className="font-sans  font-medium text-base">
            <div>
                <label className="ml-[208px]">
                    Username
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[44px] border border-input-border-grey border-solid rounded">
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
            
            <div className="ml-[208px] font-normal italic text-[#5576F5]">
                Forgot password?
            </div>
            <div className="flex items-center justify-center font-bold text-xl">
            <button className="bg-button-blue w-[208px] h-[56px] mt-[29px] text-white rounded-lg">
                Login
            </button>

            </div>
        </form>
        </div>
    </div>
   
    )
}