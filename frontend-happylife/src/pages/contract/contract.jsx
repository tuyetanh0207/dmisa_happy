import React from 'react'
import DownloadIcon from '../../assets/DownloadIcon.png'
import InsuranceContract from '../../assets/InsuranceContract.pdf'
import UpdateContractStatus from '../../../api/contractApi'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const contract = () => {

    const { regisId } = useParams();
    const { contractId } = useParams();
    // console.log("REGIS ID: ", {regisId})
    // console.log("CONTRACT ID: ", {contractId})
    const [noti, setNoti] = useState("")
    const user1 = useSelector((state) =>state.auth.login.currentUser);
    // Wait for api complete
    // const [realtimeContract, setRealtimeContract] = useState({});
    // const fetchContract = async () => {
    //   try{
    //     const res = await ContractAPI.getRegisContract(/*need fix*/ user1?.token, user1?.userInfo.id);
    //     setRealtimeContract(res.data);
    //     console.log('res', res.data);
  
    //   }
    //   catch (error){
    //     console.log("error in fetchUser", error);
    //   }
    // }
    // useEffect(() => {
    //   fetchContract();
    // },[]) /* need fix? */

    const handleAccept = async (e) => {
        e.preventDefault();
        console.log('update contract status')
        const contract = {    
                regisInfo: {
                    // regisId: "65990e87db0fad5b82d48d7e"
                    regisId: {regisId}
                },
                confirmation: true
        }
        
        console.log('Contract data: ', contract);
        try {
            const contractUpdateRes = await UpdateContractStatus.updateContractStatus(contract, regisId /*"65a6a72fcea35764df8ab8af"*/, user1?.token);
            console.log("contractUpdateRes:",contractUpdateRes)
        } catch (err) {
            console.log("err:", err);
            setNoti("Cannot use api.")
            console.log(noti)
        }

    }

  return (

    <div className="w-auto h-[1210px] bg-slate-50 flex justify-center items-center">
        <div className="w-[1415px] h-[965px] bg-white rounded-lg border-2 border-gray-200">
            <div className="mt-[71px] mb-[37px] text-blue-950 text-5xl text-center font-medium font-serif leading-[56px]">Terms and Conditions</div>
            <div className='flex justify-center items-center  gap-x-[584px] '>
                <a href={InsuranceContract}  download="InsuranceContract">
                    <button className='w-auto' download = {InsuranceContract}>

                        <div className="w-auto h-12 px-6 py-3 bg-indigo-50 rounded border justify-center items-center gap-2.5 inline-flex">
                            <img src={DownloadIcon} alt="Download Icon" />
                            <div className="text-center text-indigo-500 text-base font-bold font-['IBM Plex Sans'] leading-normal">Download PDF</div>
                        </div>
                    </button>
                </a>
                <div className="w-auto h-12 px-6 py-3 bg-indigo-50 rounded border justify-center items-center gap-2.5 inline-flex">
                    <div className="text-center text-indigo-500 text-base font-bold font-['IBM Plex Sans'] leading-normal">Last updated: Dec 21th 2023</div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-[38px]'>
                
                <embed src={InsuranceContract} width="1053px" height="550px" className='border-b-4' />
                
               
            </div>
           <div className='flex justify-center items-center mt-[40px]'>
                <div className='w-[500px] flex justify-center items-center gap-x-[40px]'>
                    <button
                    onClick={handleAccept}
                    >
                        <div className="w-[231px] h-12 px-6 py-3 bg-indigo-500 rounded border-2 border-indigo-500 justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-white text-base font-bold font-['IBM Plex Sans'] leading-normal">Accept</div>
                        </div>
                    </button>

                    <button>
                        <div className="w-[231px] h-12 px-6 py-3 bg-indigo-500 bg-opacity-0 rounded border-2 border-indigo-500 justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-indigo-500 text-base font-bold font-['IBM Plex Sans'] leading-normal">Decline</div>
                        </div>
                    </button>
                </div>
           </div>

        </div>


        {/* <img src={DownloadIcon} alt="Download Icon" /> */}
    </div>
  )
}

export default contract;