import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import UserAPI from '../../../api/userApi';
import Avartar from '../../assets/avatar.png';
import ClaimAPI from '../../../api/claimApi'
import { useParams } from 'react-router-dom';
import {Routes, Route, Link} from 'react-router-dom';


const claimDetail = (props) => {
    const user1 = useSelector((state) =>state.auth.login.currentUser);
    const [realtimeUser, setRealtimeUser] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');
    //const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('Male');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [citizenId, setCitizenId] = useState('');
  


    /* v----------------- FETCH USER -----------------v */
    /* v----------------- FETCH USER -----------------v */
    /* v----------------- FETCH USER -----------------v */
    
    //Chuyển đổi date thành dạng dd/mm/yyyy
    const formatISODateToDDMMYYYY = (isoDate) => {
        const dateObj = new Date(isoDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
      
        return `${day}/${month}/${year}`;
    };


    const fetchUser = async () => {
      try{
        const res = await UserAPI.getUser(user1?.token, user1?.userInfo?.id);
        setRealtimeUser(res.data);
        setPhoneNumber(res.data.phoneNumber)
        setFullName(res.data.fullName);
        setGender(res.data.gender)
        setEmail(res.data.email)
        setDob(formatISODateToDDMMYYYY(res.data.dob))
        setAddress(res.data.address)
        setCitizenId(res.data.citizenId)
        console.log('res', res.data)
      }
      catch (error){
        console.log("error in fetchUser", error)
      }
    }
    useEffect(() => {
      fetchUser();
      
    },[])


    const handleDateChange = async (event) => {
        const selectedDate = event.target.value;
        // Chuyển đổi chuỗi ISO thành đối tượng Date
        const dateObject = new Date(realtimeUser.dob);
        // Lấy ngày, tháng và năm
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
        const year = dateObject.getFullYear();
        // Định dạng lại thành chuỗi 'dd/mm/yyyy'
        const formattedDate = `${day}/${month}/${year}`;
      };

    /* ^----------------- FETCH USER -----------------^ */
    /* ^----------------- FETCH USER -----------------^ */
    /* ^----------------- FETCH USER -----------------^ */



    /* v----------------- FETCH REGIS-CLAIMLIST -----------------v */
    /* v----------------- FETCH REGIS-CLAIMLIST -----------------v */
    /* v----------------- FETCH REGIS-CLAIMLIST -----------------v */

  // Get regisId by url
  const { claimId } = useParams();
  // Get claim by regis of user
  const [realtimeClaimDetail, setRealtimeClaimDetail] = useState({});
  const fetchClaimDetail = async () => {
    try{
      const res = await ClaimAPI.getClaimByClaimId(user1?.token, claimId);
      setRealtimeClaimDetail(res.data);
      console.log('res realtimeClaim by regis in ClaimDetail:', res.data);

    }
    catch (error){
      console.log("error in claim of regis in ClaimDetail page", error);
    }
  }
  useEffect(() => {
    fetchClaimDetail();
  },[])
  
    /* ^----------------- FETCH REGIS-CLAIMLIST -----------------^ */
    /* ^----------------- FETCH REGIS-CLAIMLIST -----------------^ */
    /* ^----------------- FETCH REGIS-CLAIMLIST -----------------^ */

// console.log("TEST PLAN TYPE",realtimeClaimDetail?.regisInfo?.productInfo?.planType?.[0]?.typeName)
    const test = [1,2,3,4,5,6,7,8,9]
  return (
    


    <div className=" flex justify-center items-center h-auto min-h-[1180px] bg-slate-50 my-auto flex-col">   
        <form className="w-[1415px] h-auto min-h-[800px] bg-white rounded-lg border border-gray-200 font-sans font-medium text-base mt-[100px] mb-[100px]">
          <Link to='/profile/claims'>
              <div className='w-[1415px] pl-[100px] pr-[100px] flex justify-end mt-[50px]'>
                
                <button className='w-[50px] h-[50px] rounded-full border-2 bg-red-100 border-red-500 flex items-center justify-center'>
                  <div className='font-serif text-red-600'>X</div>
                </button>
              </div>
            </Link>
            <div className='flex justify-center mt-[30px] mb-[32px]'>
              <div className="w-[987px] rounded-lg text-center text-blue-950 text-5xl font-medium font-serif leading-[56px]">
                  <div className='text-center text-4xl font-bold p-[30px] bg-teal-100 mb-[20px]'>
                        Claim Detail
                    </div>
              </div>
             
            </div>
            <div className='space-y-[42px]'>
                <div>
                    <div>
                        <label className='ml-[214px] mr-[454px]'>Full name</label>
                    
                        <label>Citizen ID</label>
                    </div>
                    <div className='flex justify-center gap-x-[67px]'>
                        <div className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                        {fullName}
                        </div>
                        <div className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                        {citizenId}
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div>
                        <label className='ml-[214px] mr-[416px]'>Phone number</label>
                        <label className='mr-[200px]'>Gender</label>
                        <label>Date of birth (dd/mm/yyyy)</label>
                    </div>
                    <div className='flex justify-center gap-[42px]'>
                        <div className='flex gap-x-[67px]'>
                            <div className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                            {phoneNumber}
                            </div>
                            <div className='w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]'>
                            {gender}
                            </div>
                        </div>
                        <div className="w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                          {dob}
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <label className='ml-[214px]'>
                            Email
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <div className='w-[987px] h-12 mb-[42px] bg-white rounded border border-neutral-200 p-[10px]'>
                          {email}
                        </div>
                    </div>
                    <div>
                        <label className='ml-[214px]'>
                            Address
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <div className='w-[987px] h-12 mb-[42px] bg-white rounded border border-neutral-200 p-[10px]'>
                        {address}
                        </div>
                    </div>
                                        
                    <div className='mb-[42px]'>
                        <div>
                            <label className='ml-[214px] mr-[454px] '>Plan Type</label>
                        
                            <label>Plan Duration</label>
                        </div>
                        <div className='flex justify-center gap-x-[67px]'>
                            <div className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                             {realtimeClaimDetail?.regisInfo?.productInfo?.planType?.[0]?.typeName}
                            </div>
                            <div className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                              {realtimeClaimDetail?.regisInfo?.productInfo?.planDuration} {realtimeClaimDetail?.regisInfo?.productInfo?.planDurationUnit} 
                            </div>
                        </div>
                        
                    </div>

                    <div>
                        <label className='ml-[214px]'>
                            Plan Service Coverage
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <div className='w-[987px] h-12 mb-[42px] bg-white rounded border border-neutral-200 p-[10px]'>
                          {realtimeClaimDetail?.regisInfo?.productInfo?.planServiceCoverage}
                        </div>
                    </div>
                    <div>
                        <label className='ml-[214px]'>
                            Plan Optional Benefit
                        </label>
                    </div>
                    <div className='flex justify-center mb-[42px]'>
                        <div className='w-[987px] h-auto max-h-[500px] sticky bg-white rounded border border-neutral-200 p-[10px] overflow-y-auto'>
                          <div className='mb-[42px]'>
                              <div>
                                <div className='flex justify-center gap-x-4 pt-8'>
                                    <div className="w-[400px] h-12 text-center">
                                      Benefit Name
                                    </div>
                                    <div className="w-[400px] h-12  text-center">
                                      Insurance Amount
                                    </div>
                                </div>
                              </div>
                              <div className='flex flex-col gap-y-8'>
                              {realtimeClaimDetail?.regisInfo?.productInfo?.optionalBenefits?.map((bf)=>(
                                <div className='flex justify-center gap-x-4 text-center'>
                                  <div className="w-[400px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                                  HEALTHI INSURANCH
                                  </div>
                                  <div className="w-[400px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                                    10000000 VND
                                  </div>
                            </div>
                              ))}
                              </div>                              
                          </div>

                        </div>
                    </div>

                    <div className='mb-[42px]'>
                        <div>
                            <label className='ml-[214px] mr-[384px] '>Claim Total Request</label>
                        
                            <label>Claim Amount</label>
                        </div>
                        <div className='flex justify-center gap-x-[67px]'>
                            <div className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                             {realtimeClaimDetail?.claimTotalRequest}
                            </div>
                            <div className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]">
                              {realtimeClaimDetail?.claimAmount} VND 
                            </div>
                        </div>
                        
                    </div>

                    <div className='flex justify-center'>
                      <div className='w-[987px] rounded-lg font-serif font-bold text-center text-4xl p-[30px] bg-teal-100 mt-[20px]'>
                        Invoice
                      </div>
                    </div>
                    <div className='w-full flex flex-col items-center'>
                        <div className='w-[987px] h-auto max-h-[500px] pb-[100px] overflow-y-auto'>
                            <table className="w-full text-sm text-left text-gray-500">
                              <thead className="text-base text-gray-700 uppercase bg-white sticky top-0">
                                <tr className='text-center'>
                                  <th className="px-6 py-4 ">
                                          Date
                                  </th>
                                  <th className="px-6 py-4">
                                          Amount
                                  </th>
                                  <th className="px-6 py-4">
                                          Claim Percentage
                                  </th>
                                  <th className="px-6 py-4">
                                          Claim Amount
                                  </th>
                                  <th className="px-6 py-4 ">
                                          Status
                                  </th>
                                </tr>
                              </thead>
                            
                              <tbody>
                              {realtimeClaimDetail?.claimInvoices?.map((invoice)=>(
                                <tr className="bg-white border-b text-center items-center  mb-6  ">
                               
                                  <td className="px-6 py-4" >{invoice?.invoiceDate}</td>
                                  <td className="px-6 py-4">{invoice?.amount}</td>
                                  <td className="px-6 py-4">{invoice?.claimPercentage}</td>
                                  <td className="px-6 py-4">{invoice?.claimAmount}</td>
                                  <td className="px-6 py-4">{invoice?.status}</td>
                                
                                </tr>
                                ))}
                              </tbody>
                          </table>
                        </div>
                    
                    </div>
                </div>
            </div>
        </form>
        </div>
       
    )
}

export default claimDetail
