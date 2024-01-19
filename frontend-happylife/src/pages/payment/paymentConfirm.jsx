import {Routes, Route, Link} from 'react-router-dom';


const paymentConfirm = () =>{
    return(
        <div className="w-[1920px] h-[1210px] bg-slate-50 flex justify-center items-center">
            <div className="w-[1415px] h-[932px]  bg-white rounded-lg border-2 border-slate-50">
                <div className="flex justify-center">
                    <div className="w-[500px] h-[22px] mt-[228px] text-black text-base font-normal leading-3 text-center">Thank You For Your Purchase</div>
                </div>
                <div className="flex justify-center">
                    <img className="w-[300px] h-[300px] " src="https://via.placeholder.com/300x300"></img>
                </div>
                <div className="flex justify-center">
                     <div className="text-zinc-950 text-3xl font-medium font-['Inter'] leading-7">Order #123RGR231567Y Confirmed</div>
                </div>
                <div className="flex justify-center">
                    <Link key='registration' to='../profile/registration'>
                        <div className="w-[332px] h-[52px] mt-[53px] px-28 py-4 bg-indigo-500 rounded">
                            <button className="text-white text-base font-bold leading-3">Back to Home</button>        
                        </div>
                    </Link>
                </div>
                
                <div className="flex justify-center">
                    <div className="mt-[20px] text-neutral-400 text-base font-bold  leading-3">Generate Receipt</div>
                </div>
            </div>
        </div>
    )
}

export default paymentConfirm