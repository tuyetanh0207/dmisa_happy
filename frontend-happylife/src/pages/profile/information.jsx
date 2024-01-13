import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import UserAPI from '../../../api/userApi'
const information = () => {
    const user1 = useSelector((state) =>state.auth.login.currentUser);
    const [realtimeUser, setRealtimeUser] = useState({});

    const fetchUser = async () => {
      try{
        const res = await UserAPI.getUser(user1?.token, user1?.userInfo?.id);
        setRealtimeUser(res.data)
        console.log('res', res.data)
      }
      catch (error){
        console.log("error in fetchUser", error)
      }
    }
    useEffect(() => {
      fetchUser();
      
    },[])


    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
      };
    // Chuyển đổi chuỗi ISO thành đối tượng Date
    const dateObject = new Date(realtimeUser.dob);

    // Lấy ngày, tháng và năm
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = dateObject.getFullYear();

    // Định dạng lại thành chuỗi 'dd/mm/yyyy'
    const formattedDate = `${day}/${month}/${year}`;


  return (
    <div className=" flex justify-center items-center h-[1180px] bg-slate-50 my-auto flex-col">   
        <form className="w-[1415px] h-[983px] bg-white rounded-lg border border-gray-200 font-sans font-medium text-base">
            <div className='flex justify-center mt-[70px] mb-[32px]'>
                <div className="justify-center w-[360px] h-[121px] justify-start items-center gap-5 inline-flex">
                    <div className="w-[121px] h-[121px] relative">
                        <div className="w-[121px] h-[121px] left-0 top-0 absolute bg-white rounded-[200px] border border-neutral-400"></div>
                    </div>
                    <div className="w-[219px] h-[63px] relative">
                            <div className="w-[219px] left-0 top-0 absolute text-center text-gray-400 text-lg font-normal font-['Inter'] leading-tight">Drag image here</div>
                            <div className="w-[187px] left-[16px] top-[43px] absolute text-center text-blue-500 text-lg font-normal font-['Inter'] leading-tight">Browse image</div>
                            <div className="w-[27px] left-[96px] top-[21px] absolute text-center text-gray-400 text-lg font-normal font-['Inter'] leading-tight">or</div>
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
                        <input className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                        value={realtimeUser.fullName}
                        >
                    </input>
                    <input className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                    value={realtimeUser.citizenId}
                    >
                        </input>
                    </div>
                    
                </div>
                <div>
                    <div>
                        <label className='ml-[214px] mr-[416px]'>Phone number</label>
                    
                        <label className='mr-[200px]'>Gender</label>
                        <label>Date of birth</label>
                    </div>
                    <div className='flex justify-center gap-[42px]'>
                        <div className='flex gap-x-[67px]'>
                            <input className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                            value={realtimeUser.phoneNumber}
                            >
                            </input>
                            <input className="w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                            value={realtimeUser.gender}    
                            >
                            </input>
                        </div>
                        <input className="w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                        id="dob"
                        //type="date"
                        value={formattedDate}
                        //onChange={handleDateChange}
                        
                        >
                        </input>
                    </div>
                </div>

                <div>
                    <div>
                        <label className='ml-[214px]'>
                            Email
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <input className='w-[987px] h-12 mb-[42px] bg-white rounded border border-neutral-200 p-[10px]'
                        value={realtimeUser.email}
                        >
                        </input>
                    </div>
                    <div>
                        <label className='ml-[214px]'>
                            Address
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <input className='w-[987px] h-12 mb-[42px] bg-white rounded border border-neutral-200 p-[10px]'
                        value={realtimeUser.address}
                        >
                        </input>
                    </div>
                    <div>
                        <label className='ml-[214px]'>
                            Health status
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <input className='w-[987px] h-12 mb-[61px] bg-white rounded border border-neutral-200 p-[10px]'
                        //value={realtimeUser.healthstatus}
                        >
                        </input>
                    </div>
                    <div className='flex justify-center'>
                        <button className=" w-[377px] h-12 px-6 py-3 bg-indigo-50 rounded border-2 border-indigo-500">
                            <div className="text-center text-indigo-500 text-base font-bold leading-normal">Update Profile</div>
                        </button>
                    </div>
                </div>
            </div>
            
            
            {/* <div>
                <label>
                    Full name
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[760px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded flex items-center placeholder:text-black" placeholder={realtimeUser.fullName}>
                </input>
            </div>
            <div>
                <label>
                    Citizen ID
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[760px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded" placeholder={realtimeUser.citizenId}>
                </input>
            </div>
            <div>
                <label>
                    Phone number
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[760px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded" placeholder={realtimeUser.phoneNumber}>
                </input>
            </div>
            <div>
                <label>
                    Email
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[760px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded" placeholder={realtimeUser.email}>
                </input>
            </div>
            <div>
                <label>
                    Date of birth
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[760px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded" placeholder={realtimeUser.dob}>
                </input>
            </div>
            <div>
                <label>
                    Gender
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[760px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded" placeholder={realtimeUser.gender}>
                </input>
            </div>
            <div>
                <label>
                    Address
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[760px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded" placeholder={realtimeUser.address}>
                </input>
            </div>
            <div>
                <label>
                    Health status
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[760px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded" placeholder={realtimeUser.healthStatus}>
                </input>
            </div> */}

        </form>
        </div>
    )
}

export default information
