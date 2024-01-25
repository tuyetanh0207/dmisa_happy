import {Routes, Route, Link} from 'react-router-dom';
import BigSuccessIcon from "../../assets/BigSuccessIcon.png"

const paymentConfirm = () =>{
    return(
        <div className="w-auto h-auto min-h-[670px] p-10 bg-slate-50 flex justify-center items-center">
            <div className="w-auto h-auto  bg-white rounded-lg border-2 border-slate-50 p-10 px-[100px]">
                <div className="flex justify-center">
                    <div className="w-[500px] h-[22px] text-green-500 text-base font-bold leading-3 text-center">Thank You For Your Purchase</div>
                </div>
                <div className="flex justify-center">
                    <img className="w-[100px] h-[100px] " src={BigSuccessIcon}></img>
                </div>
                {/* <div className="flex justify-center">
                     <div className="text-zinc-950 text-3xl font-medium font-['Inter'] leading-7">Order #123RGR231567Y Confirmed</div>
                </div> */}
                <div className="flex justify-center">
                    <Link key='registration' to='../profile/registration'>
                        <div className="w-[332px] h-[52px] mt-[10px] px-28 py-4 bg-indigo-500 rounded">
                            <button className="text-white text-base font-bold leading-3">Back to Home</button>        
                        </div>
                    </Link>
                </div>
                
                {/* <div className="flex justify-center">
                    <div className="mt-[20px] text-neutral-400 text-base font-bold  leading-3">Generate Receipt</div>
                </div> */}
            </div>
        </div>
    )
}

export default paymentConfirm