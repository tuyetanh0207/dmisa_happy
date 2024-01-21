import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import UserAPI from '../../../api/userApi';

const information = () => {
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

    

    // **** UPDATE USER **** //

    const handleUpdate = async (e) => {
        {
            e.preventDefault();
            console.log('update user')
            const newUser = {
                // fullName: "Nguyễn Văn B",
                // gender: "Nam",
                // DOB: "1990-01-01",
                // phoneNumber: "0344193909",
                // citizenId: "123456789",
                // email: "nguyenvana@example.com",
                // address: "123 Đường B, Quận C, Thành phố D"
                fullName: fullName,
                gender: gender,
                DOB: dob,
                phoneNumber: phoneNumber,
                citizenId: citizenId,
                email: email,
                address: address
            }
            console.log('new User', newUser)
            try{
                const updateUser = await UserAPI.updateUser(newUser, user1?.userInfo?.id, user1?.token);
                console.log("Res", updateUser);
            } catch(err){
                console.log("err: ", err);
                //setNoti("FAIL")
                //console.log(noti);
            }
        }
    }

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
                        value={fullName}
                        onChange={(e)=>setFullName(e.target.value)}
                        >
                    </input>
                    <input className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                    value={citizenId}
                    onChange={(e)=>setCitizenId(e.target.value)}
                    >
                    </input>
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
                            <input className="w-[460px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                            value={phoneNumber}
                            readOnly
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            >
                            </input>
                            {/* <input className="w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                            value={gender}    
                            onChange={(e)=>setGender(e.target.value)}
                            >
                            </input> */}
                            <select id="gender" name="gender"  
                                    className='w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]'
                                    defaultvalue={gender} 
                                    onChange={(e)=>setGender(e.target.value)}
                                    >
                                        <option  value="Male" label="Male"></option>
                                        <option value="Female" label="Female"></option>
                            </select>
                        </div>
                        <input className="w-[210px] h-12 bg-white rounded border border-neutral-200 p-[10px]"
                        id="dob"
                        //type="date"
                        value={dob}
                        onChange={(e)=>setDob(e.target.value)}
                        
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
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
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
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
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
                        <button 
                        onClick={handleUpdate}
                        className=" w-[377px] h-12 px-6 py-3 bg-indigo-50 rounded border-2 border-indigo-500">
                            <div className="text-center text-indigo-500 text-base font-bold leading-normal">Update Profile</div>
                        </button>
                    </div>
                </div>
            </div>
            

        </form>
        </div>
    )
}

export default information
