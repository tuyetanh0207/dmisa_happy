import Insurance from '../assets/Insurance.jpg'
import DownArrow from '../assets/DownArrow.png'
import DownArrowBlack from '../assets/DownArrowBlack.png'

import React, {useState} from 'react'
const productteaser = () => {
  // this is for claim detail toggle (above) 
  const [toggle, setToggle] = useState(false)
  const [arrrowClickStatus, setArrowClickStatus] = useState(false)
  // this is for message toggle (bottom)
  const [toggleMessage, setToggleMessage] = useState(false)
  const [arrrow2ClickStatus, setArrow2ClickStatus] = useState(false)

  return (
    <div className='relative'>
        <div className='flex justify-center relative h-[317px] w-[1415px] bg-white rounded-lg border-x-5 border-gray-200 '>
          <img src={Insurance} alt='Insurance Logo' className='rounded-lg w-[532px] h-[317px] absolute inset-y-0 left-0'>
          </img> 
          <div className='flex flex-col ml-[450px] mt-[38px]'>
            <h1 className='font-semibold text-2xl mb-[20px]'>Healthcare insurance for college student </h1>
            <div className='w-[716px] h-[100px]'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex minima commodo
            consequat. Duis aute irure dolor in repre henderit.
            </div>
            <div className='leading-[36px] text-custom-blue-3 font-semibold'>
              <label>START DATE</label>
              <label className='ml-[120px]'>END DATE</label>
            </div>
            <div>
              <input className='w-[144px] h-[48px] py-3 bg-white rounded border border-neutral-200 justify-center items-center gap-[33px] inline-flex'></input>
              <input className='w-[144px] h-[48px] ml-[65px] py-3 bg-white rounded border border-neutral-200 justify-center items-center gap-[33px] inline-flex'></input>
            </div>
          </div>
        </div> 
        <div className='mt-[-65.5px] ml-[1300px] relative z-40 '>
          {
            arrrowClickStatus === false ? (
              <img src={DownArrow} alt='Down Arrow' onClick= {()=> {setToggle(!toggle), setArrowClickStatus(!arrrowClickStatus)}} className='ml-[10px]'></img>
            ) : (
              <img src={DownArrow} alt='Down Arrow' onClick= {()=> {setToggle(!toggle), setArrowClickStatus(!arrrowClickStatus)}} className='ml-[10px] rotate-180'></img >
            )
          }
          {toggle && (
            <div className='relative ml-[-1300px] mt-[30px] pt-[30px]  leading-[36px] font-semibold bg-white'>          
              <div className="relative overflow-x-auto bg-bgr-white">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-base text-gray-700 uppercase bg-white">
                    <tr className='text-center'>
                      <th className="px-6 py-4 ">
                              PERCENTAGE
                      </th>
                      <th className="px-6 py-4">
                              DATE CREATE
                      </th>
                      <th className="px-6 py-4">
                              PAYMENT STATUS
                      </th>
                      <th className="px-6 py-4">
                              REASON
                      </th>
                    </tr>
                  </thead>
                  <tbody>
 
                          <tr className="bg-white border-b text-center items-center  mb-[50px]">
                              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                              5%
                              </th>
                              <td className="px-6 py-4">
                              12/05/2023
                              </td>
                              <td className="px-6 py-4  ">
                                {/* <div className={`w-[150px] h-[44px]  inline-flex items-center justify-center rounded
                                       ${props.realtimeRegis.approvalStatus === 'Paid' ? ' bg-teal-50 border-green-300 text-green-400':''}
                                       ${props.realtimeRegis.approvalStatus === 'Pending' ? 'bg-sky-100' : ''}
                                       ${props.realtimeRegis.approvalStatus === 'Denied' ? 'bg-rose-200 border-red-700 text-red-700 ':''}
                                       ${props.realtimeRegis.approvalStatus === 'Payment Issued' ? 'bg-orange-100 border-orange-300 text-orange-400':''}
                                 `}> */}
                               <div className='w-[150px] h-[44px]  inline-flex items-center justify-center rounded  bg-teal-50 border-green-300 text-green-400'>
                                  Paid
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                  <div className='flex justify-center'>
                                  <div className='w-auto h-auto max-w-[400px] max-h-[200px] overflow-y-auto text-justify'>
                                            this is the reason why i confirm this claim         
                                </div>
                                  </div>
                              </td>
                          </tr>
 
                  </tbody>
                </table>
              </div>
            </div>      
          )}
        </div>

 
    </div>
  )
}
export default productteaser


// {
//   /* props.realtimeRegis.message != null  && ( */ arrrowClickStatus === false ?  (
//     <img src={DownArrowBlack} alt='Down Arrow' onClick= {()=> {setToggleMessage(!toggleMessage), setArrow2ClickStatus(!arrrow2ClickStatus)}}
//      className='ml-[10px] mt-[40px] absolute z-40'></img>
//   ) : (
//     <img src={DownArrowBlack} alt='Down Arrow' onClick= {()=> {setToggleMessage(!toggle), setArrow2ClickStatus(!arrrow2ClickStatus)}} 
//     className='ml-[10px] mt-[40px] absolute z-40 rotate-180'></img >
//   )
  
// // )
//   }
//   {/* <div className='w-[1415px] h-[100px] flex items-center'>

//     <div className='ml-[111px] text-slate-900 text-lg font-medium font-["IBM Plex Sans"] leading-[30px]'>
//     Your contract has been successfully registered 0
//     //{props.realtimeRegis.message[0].content}
//     // {props.realtimeRegis.message.content} 
//     </div>
//     <div className='ml-[111px] text-slate-900 text-lg font-medium font-["IBM Plex Sans"] leading-[30px]'>
//     Your contract has been successfully registered 0
//     </div>
//   </div> */}

                    {/* <div className='grid auto-rows-auto gap-3'>
                      <div className='grid grid-cols-9 col-span-1 text-center flex items-center '>
                          <div className='col-start-2'>PERCENTAGE</div>
                          <div className='col-start-3 col-span-2'>DATE CREATE</div>
                          <div className='col-start-5'>PAYMENT STATUS</div>
                          <div className='col-start-7 col-span-2'>REASON</div>           
                      </div> 
                      <div className='grid grid-cols-9 col-span-1 text-center  '>
                          <div className='col-start-2 col-span-1'>5%</div>
                          <div className='col-start-3 col-span-2'>12/05/2023</div>
                          <div className='col-start-5 col-span-1 bg-[#EBFAFA] text-center text-[#53B271]'>Paid</div>
                          <div className='col-start-7 col-span-2'>this is the reason why i confirm this claim</div>           
                      </div>
                     
                    </div> */}
                                        

                  {/* <div className='flex justify-center leading-[36px] font-semibold gap-x-[110px]'>
                    <div className='flex justify-center mt-[32px] font-semibold gap-x-[110px] '>
                      <label>PERCENTAGE</label>
                      <label className='ml-[120px]'>DATE CREATE</label>
                      <label className='ml-[120px]'>PAYMENT STATUS</label>
                      <label className='ml-[170px]'>REASON</label>
                    </div>
                  </div>
                  <div className='leading-[46px] font-semibold gap-x-[110px] bg-white'>
                    <label>5%</label>
                    <label className='ml-[290px]'>12/05/2023</label>
                    <label className='ml-[220px] inline-block	w-[159px] h-[48px] bg-[#EBFAFA] text-center text-[#53B271]'>Paid</label>
                    <label className='ml-[150px]'>this is the reason why i confirm this claim</label>                
                  </div>
                  <div className='ml-[170px] mt-[24px] leading-[46px] font-semibold gap-x-[110px]'>
                    <label>5%</label>
                    <label className='ml-[290px]'>12/05/2023</label>
                    <label className='ml-[220px] inline-block w-[159px] h-[48px] bg-[#EBFAFA] text-center text-[#53B271]'>Paid</label>
                    <label className='ml-[150px]'>this is the reason why i confirm this claim</label>                
                  </div>
                  <div className='ml-[170px] mt-[24px] leading-[46px] font-semibold gap-x-[110px]'>
                    <label>5%</label>
                    <label className='ml-[290px]'>12/05/2023</label>
                    <label className='ml-[220px] inline-block	w-[159px] h-[48px] bg-[#F8D8D8] text-center text-[#C04B49]'>Unpaid</label>
                    <label className='ml-[150px]'>this is the reason why i confirm this claim</label>                
                  </div> */}