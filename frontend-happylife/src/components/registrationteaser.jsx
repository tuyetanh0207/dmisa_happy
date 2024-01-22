import Insurance from '../assets/Insurance.jpg'
import Arrow from '../assets/Arrow.png'
import DownArrowBlack from '../assets/DownArrowBlack.png'
import ShoppingCart from '../assets/ShoppingCart.png'
import React, {useState} from 'react'
//import { useNavigate } from 'react-router-dom'
import PlanDetail from '../pages/plan/plandetail/plandetail'
import {Routes, Route, Link} from 'react-router-dom';
const registrationteaser = (props) =>{
//     const navigate = useNavigate();
//     const routeToPlanDetail = () => {
//         const path = {PlanDetail};
//         navigate(path);
//     }
    //console.log(status);
    //const tt = props.status;
      /*
  planURL
  planName
  planAbout
  planSlogan
  createdAt
  approvalStatus
  */
   // console.log("TEST", props.realtimeRegis.approvalStatus)
   //console.log("INDEx: ", props.index)
   //console.log("MESSAGE: ", props.realtimeRegis.message[0])
   const message = [
    'Your contract has been successfully registered 1',
    'Your contract has been successfully registered 2', 
    'Your contract has been successfully registered 3',
    'Your contract has been successfully registered 4',
    'Your contract has been successfully registered 5'
]
    const [dataTest, setDataTest] = useState("Now")
   const [toggle, setToggle] = useState(false)
   const [arrrowClickStatus, setArrowClickStatus] = useState(false) 
   return ( 

    <div className='relative'>

      <div className='flex justify-center items-center relative h-[317px] w-[1415px] bg-white rounded-lg border border-gray-200 flex'>
            <div className='w-[532px] h-[317px]'>
                <img src={Insurance} alt='Insurance Logo' className='rounded-lg w-[532px] h-[317px] absolute inset-y-0 left-0'>
                </img>
                {/* <img src={props.realtimeRegis.productInfo.planURL} alt='Insurance Logo' className='rounded-lg w-[532px] h-[317px] absolute inset-y-0 left-0'>
                </img> */}
            </div> 
            <div className="w-[504px] h-[296px]  pt-[19px] pb-[102px] flex-col justify-center items-start gap-[21px] ">
                <div className="w-96 h-16 text-slate-900 text-[26px] font-medium font-['IBM Plex Sans'] leading-9 text-justify">{props.realtimeRegis.productInfo.planName}</div>
                <div className="w-[398px] h-[90px] text-slate-900 text-lg font-normal font-['IBM Plex Sans'] leading-[30px]">Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit.</div>
                {/*<div className="w-[398px] h-[90px] text-slate-900 text-lg font-normal font-['IBM Plex Sans'] leading-[30px]">{props.realtimeRegis.productInfo.planAbout}</div>
                */}
            </div>
        <div >   
            <div className="mt-[19px] mb-[19px] h-8 text-indigo-500 text-xl font-medium font-['IBM Plex Sans'] leading-9">Registration Date: </div>  
            <div className="w-[161px] h-12 py-3 bg-white rounded border border-neutral-200 justify-center items-center gap-[33px] inline-flex"></div>
            <div className="mt-[19px] mb-[19px] w-[161px] h-8 text-indigo-500 text-xl font-medium font-['IBM Plex Sans'] leading-9">Status:</div>
            {
                props.realtimeRegis.approvalStatus === 'Paid' ? (
                    <div>
                        <div className="w-[106px] mr-[22px] h-12 px-6 py-3 bg-teal-50 rounded border border-green-300 justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-green-400 text-base font-bold font-['IBM Plex Sans'] leading-normal">Paid</div>
                        </div>
                        <Link to={`/createclaim/${props.realtimeRegis.regisId}`}>
                            <button>
                                <div className="w-[162px] h-12 mt-[7px] bg-indigo-500 rounded border border-indigo-500 items-center justify-center inline-flex">
                                    <div className='text-white font-bold leading-normal'>Create Claim</div>
                                </div>
                            </button>
                        </Link>
                    </div>
                ) : props.realtimeRegis.approvalStatus === 'Signed' ? (
                    <div>
                        <div className="w-[106px] mr-[22px] h-12 px-6 py-3 bg-rose-200 rounded border border-red-700 inline-flex">
                            <div className="text-center text-red-700 text-base font-bold font-['IBM Plex Sans'] leading-normal">Unpaid</div>
                        </div>
                        <Link
                        to={`/payment/${props.realtimeRegis.regisId}`}
                        >
                        <button>
                            <div className="w-[162px] h-12 mt-[7px] bg-indigo-500 rounded border border-indigo-500 items-center justify-center inline-flex">
                                    <div className='w-[23px] h-[20px] mr-[15px]'>
                                        <img src={ShoppingCart} alt="ShoppingCart" />
                                    </div>
                        
                                        <div className='text-white font-bold leading-normal'>Pay now</div>
                             </div>
                        </button>
                        </Link>
                    </div>
                ) : props.realtimeRegis.approvalStatus === 'Pending' ? (
                    <div className="w-[161px] h-12 px-6 py-3 bg-indigo-50 rounded border border-indigo-500 justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-indigo-500 text-base font-bold font-['IBM Plex Sans'] leading-normal">Pending</div>
                    </div>
                ) : (
                  <div>
                        <div className="w-[106px] mr-[22px] h-12 px-6 py-3 bg-orange-100 rounded border border-orange-300 justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-orange-400 text-base font-bold font-['IBM Plex Sans'] leading-normal"> Approved </div>
                        </div>
                        <Link
                        to={`/contract/${props.realtimeRegis.regisId}`}
                        >
                            <button>
                                <div className="w-[162px] h-12 mt-[7px] bg-indigo-500 rounded border border-indigo-500 items-center justify-center inline-flex">
                                    <div className='text-white font-bold leading-normal'>Contract Now</div>
                                </div>
                            </button>
                        </Link>

                  </div>
                )
            }
       </div>              
      </div>

      <div>
        {
          props.realtimeRegis.message != null  && (arrrowClickStatus === false ?  (
            <img src={DownArrowBlack} alt='Down Arrow' onClick= {()=> {setToggle(!toggle), setArrowClickStatus(!arrrowClickStatus)}} className='ml-[59px] mt-[40px] absolute z-40'></img>
          ) : (
            <img src={DownArrowBlack} alt='Down Arrow' onClick= {()=> {setToggle(!toggle), setArrowClickStatus(!arrrowClickStatus)}} className='ml-[59px] mt-[40px] absolute z-40 rotate-180'></img >
          )
        )}
      <div className={`w-[1415px] ${toggle===true ? 'h-auto max-h-[200px]':'100px' } 
      ${props.realtimeRegis.approvalStatus === 'Paid' ? 'bg-green-100':''}
      ${props.realtimeRegis.approvalStatus === 'Pending' ? 'bg-sky-100' : ''}
      ${props.realtimeRegis.approvalStatus === 'Unpaid' ? 'bg-rose-200':''}
      ${props.realtimeRegis.approvalStatus === 'Approved' ? 'bg-orange-100':'bg-orange-100'}
      overflow-y-auto`}>
        {props.realtimeRegis.message != null &&
            (
                <div className='w-[1415px] h-[100px] flex items-center'>

                    <div className='ml-[111px] text-slate-900 text-lg font-medium font-["IBM Plex Sans"] leading-[30px]'>
                    {/* Your contract has been successfully registered 0 */}
                    {props.realtimeRegis.message[0].content}
                    {/* {props.realtimeRegis.message.content} */}
                    </div>
                </div>
        )}
        {props.realtimeRegis.message !=null &&
        props.realtimeRegis.message.slice(1).map((msg, index) => (
                <div className={`${toggle === true ? '':'hidden'} w-[1415px] h-[100px] flex items-center`} key={index}>
                    <div className='ml-[111px] text-slate-900 text-lg font-medium font-["IBM Plex Sans"] leading-[30px]'>
                    {msg.content}
                    </div>
                </div>
            ))
    
            }
            
        
        </div>
      </div>
    </div>
  )
}
export default registrationteaser