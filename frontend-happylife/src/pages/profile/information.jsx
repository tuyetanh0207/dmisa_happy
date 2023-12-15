import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import UserAPI from '../../../api/userApi'
const information = () => {
    const user1 = useSelector((state) =>state.auth.login.currentUser);
    const [realtimeUser, setRealtimeUser] = useState({});

    const fetchUser = async () => {
      try{
        const res = await UserAPI.getUser(user1.token, user1.userInfo.id);
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
  return (
    <div className="max-h-full flex justify-center bg-bgr-white my-auto">   
        <form className="font-sans font-medium text-base mt-[40px]">
            <div>
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
            </div>

        </form>
        </div>
    )
}

export default information
