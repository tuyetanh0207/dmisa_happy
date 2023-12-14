import Insurance from '../assets/Insurance.jpg'
import DownArrow from '../assets/DownArrow.png'
import React, {useState} from 'react'
const productteaser = () => {
  const [toggle, setToggle] = useState(false)
  const [arrrowClickStatus, setArrowClickStatus] = useState(false)
  return (
    <div className='relative'>
      <div className='flex justify-center relative h-[317px] w-[1415px] bg-white rounded-lg borde-x-5 border-gray-200'>
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
      <div className='mt-[-65.5px] ml-[1300px] relative z-50 '>
        {
          arrrowClickStatus === false ? (
            <img src={DownArrow} alt='Down Arrow' onClick= {()=> {setToggle(!toggle), setArrowClickStatus(!arrrowClickStatus)}} className='ml-[10px]'></img >
          ) : (
            <img src={DownArrow} alt='Down Arrow' onClick= {()=> {setToggle(!toggle), setArrowClickStatus(!arrrowClickStatus)}} className='ml-[10px] rotate-180'></img >
          )
        }
              {toggle && (
                <div className='relative ml-[-1300px] mt-[30px] h-[317px] w-[1415px] bg-white'>
                  <div className='flex justify-center leading-[36px] font-semibold gap-x-[110px]'>
                    <div className='flex justify-center mt-[32px] font-semibold gap-x-[110px]'>
                      <label>PERCENTAGE</label>
                      <label className='ml-[120px]'>DATE CREATE</label>
                      <label className='ml-[120px]'>PAYMENT STATUS</label>
                      <label className='ml-[170px]'>REASON</label>
                    </div>
                  </div>
                  <div className='ml-[170px] mt-[24px] leading-[46px] font-semibold gap-x-[110px]'>
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
                  </div>
                </div>
                
              )}
      </div>
 
    </div>
  )
}
export default productteaser