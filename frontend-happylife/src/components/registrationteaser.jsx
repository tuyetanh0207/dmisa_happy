import Insurance from '../assets/Insurance.jpg'
import Arrow from '../assets/Arrow.png'
import React, {useState} from 'react'
//import { useNavigate } from 'react-router-dom'
import PlanDetail from '../pages/plan/plandetail/plandetail'

const registrationteaser = (props) =>{
//     const navigate = useNavigate();
//     const routeToPlanDetail = () => {
//         const path = {PlanDetail};
//         navigate(path);
//     }
    //console.log(status);
    //const tt = props.status;
    return ( 
    <div className='relative'>
      <div className='flex justify-center relative h-[317px] w-[1415px] bg-white rounded-lg border border-gray-200'>
        <img src={Insurance} alt='Insurance Logo' className='rounded-lg w-[532px] h-[317px] absolute inset-y-0 left-0'>
        </img> 
        <div className="w-[504px] h-[296px] ml-[400px] pr-[106px] pt-[19px] pb-[102px] flex-col justify-start items-start gap-[21px] inline-flex">
            <div className="w-96 h-16 text-slate-900 text-[26px] font-medium font-['IBM Plex Sans'] leading-9">Ut enim ad minim veniam, quis nostrud exercitatio</div>
            <div className="w-[398px] h-[90px] text-slate-900 text-lg font-normal font-['IBM Plex Sans'] leading-[30px]">Ut enim ad minim veniam, quis nostrud exercitation
             ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit.</div>
        </div>
        <div>   
            <div className="mt-[19px] mb-[19px] h-8 text-indigo-500 text-xl font-medium font-['IBM Plex Sans'] leading-9">Registration Date:  </div>
            <div className="w-[161px] h-12 py-3 bg-white rounded border border-neutral-200 justify-center items-center gap-[33px] inline-flex"></div>
            <div className="mt-[19px] mb-[19px] w-[161px] h-8 text-indigo-500 text-xl font-medium font-['IBM Plex Sans'] leading-9">Status:</div>
            {
                props.paymentStatus === 'paid' ? (
                    <div className="w-[161px] h-12 px-6 py-3 bg-teal-50 rounded border border-green-300 justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-green-400 text-base font-bold font-['IBM Plex Sans'] leading-normal">Paid</div>
                    </div>
                ) : props.paymentStatus === 'unpaid' ? (
                    <div className="w-[161px] h-12 px-6 py-3 bg-rose-200 rounded border border-red-700 justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-red-700 text-base font-bold font-['IBM Plex Sans'] leading-normal">Unpaid</div>
                    </div>
                ) : props.paymentStatus === 'pending' ? (
                    <div className="w-[161px] h-12 px-6 py-3 bg-indigo-50 rounded border border-indigo-500 justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-indigo-500 text-base font-bold font-['IBM Plex Sans'] leading-normal">Pending</div>
                    </div>
                ) : (
                    <div className="w-[161px] h-12 px-6 py-3 bg-rose-200 rounded border border-green-300 justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-red-700 text-base font-bold font-['IBM Plex Sans'] leading-normal"> BUG </div>
                  </div>
                )
            }
       </div>
      
              
      </div>
      <div className='mt-[-32px] ml-[560px] relative z-50'>
        <a href='/plandetail'>
            <img src={Arrow} alt='Arrow' className='ml-[10px]'></img>
        </a> 
      </div>
    </div>
  )
}
export default registrationteaser