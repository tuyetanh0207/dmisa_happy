import React from 'react'
import DownloadIcon from '../../assets/DownloadIcon.png'
import InsuranceContract from '../../assets/InsuranceContract.pdf'
//import UpdateContractStatus from '../../../api/contractApi'
import {useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContractAPI from '../../../api/contractApi'
import { useNavigate } from 'react-router-dom';

const contract = () => {
    const route = useNavigate();
    const { regisId } = useParams();
    // console.log("REGIS ID: ", {regisId})
    // console.log("CONTRACT ID: ", {contractId})
    const [noti, setNoti] = useState("")
    const user1 = useSelector((state) =>state.auth.login.currentUser);
    
    const [realtimeContract, setRealtimeContract] = useState({});
    const fetchContract = async () => {
      try{
        const res = await ContractAPI.getContractByRegisId(regisId, user1?.token);
        setRealtimeContract(res.data);
        console.log('res', res.data);
  
      }
      catch (error){
        console.log("error in fetchUser", error);
      }
    }
    useEffect(() => {
      fetchContract();
    },[])  
    

    const handleAccept = async (e) => {
        e.preventDefault();
        console.log('update contract status')
        console.log("REGISTRATION ID: ", regisId)
        const contract = {    
                regisInfo: {
                    //regisId: "65990e87db0fad5b82d48d7e"
                    regisId: regisId
                },
                confirmation: true
        }
        
        console.log('Contract data: ', contract);
        console.log('RealTimeConTract: ', realtimeContract)
        try {
            const contractUpdateRes = await ContractAPI.updateContractStatus(contract, realtimeContract.contractId, user1?.token);
            console.log("contractUpdateRes:",contractUpdateRes)
            route('/profile/registration')

        } catch (err) {
            console.log("err:", err);
            setNoti("Cannot use api.")
            console.log(noti)
        }
    }

    //Chuyển đổi date thành dạng dd/mm/yyyy
    const formatISODateToDDMMYYYY = (isoDate) => {
        const dateObj = new Date(isoDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
      
        return `${day}/${month}/${year}`;
    };
    console.log("TEST", realtimeContract?.createdAt)
  return (

    <div className="w-auto h-[1210px] bg-slate-50 flex justify-center items-center">
        <div className="w-[80%] h-[80%] bg-white rounded-lg border-2 border-gray-200">
            <div className="mt-[71px] mb-[37px] text-blue-950 text-5xl text-center font-medium font-serif leading-[56px]">Terms and Conditions</div>
            <div className='flex justify-center items-center  gap-x-[584px] '>
                <a href={realtimeContract?.content?.[0].content}  download="InsuranceContract">
                    <button className='w-auto' download = {InsuranceContract}>

                        <div className="w-auto h-12 px-6 py-3 bg-indigo-50 rounded border justify-center items-center gap-2.5 inline-flex">
                            <img src={DownloadIcon} alt="Download Icon" />
                            <div className="text-center text-indigo-500 text-base font-bold font-['IBM Plex Sans'] leading-normal">Download PDF</div>
                        </div>
                    </button>
                </a>
                <div className="w-auto h-12 px-6 py-3 bg-indigo-50 rounded border justify-center items-center gap-2.5 inline-flex">
                    <div className="text-center text-indigo-500 text-base font-bold font-['IBM Plex Sans'] leading-normal">
                        {/* \{realtimeContract.updatedAt] */}
                        Last updated: {formatISODateToDDMMYYYY(realtimeContract?.createdAt)}
                        </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-[38px]'>
                
                <embed src={InsuranceContract} width="1053px" height="550px" className='border-b-4' />
                
               
            </div>
           <div className='flex justify-center items-center mt-[40px]'>
                <div className='w-[500px] flex justify-center items-center gap-x-[40px]'>
                    <Link
                    to='/profile/registration'
                    >
                        <button
                        onClick={handleAccept}
                        className='w-[231px] h-12 px-6 py-3 bg-indigo-500 rounded border-2 border-indigo-500'
                        >
                            <div className="text-center text-white text-base font-bold leading-normal">Accept</div>
                        </button>
                    </Link>
                    <Link to ='/profile/registration'>
                    <button>
                        <div className="w-[231px] h-12 px-6 py-3 bg-indigo-500 bg-opacity-0 rounded border-2 border-indigo-500 justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-indigo-500 text-base font-bold font-['IBM Plex Sans'] leading-normal">Cancel</div>
                        </div>
                    </button>
                    </Link>
                </div>
           </div>

        </div>


        {/* <img src={DownloadIcon} alt="Download Icon" /> */}
    </div>
  )
}

export default contract;