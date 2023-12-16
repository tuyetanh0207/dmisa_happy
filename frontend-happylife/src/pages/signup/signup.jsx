import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../redux/authApi';
import { useNavigate } from 'react-router-dom';

const signup = () => {
    
  const [phoneNumber, setPhoneNumber] = useState('');
  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [citizenID, setCitizenID] = useState('');

  const dispatch = useDispatch();
  const router = useNavigate();
  const [noti, setNoti] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('signup')
    const newUser = {
        phoneNumber: phoneNumber,
        password: password,
        fullName: fullName,
        gender: gender,
        email: email,
        dob: dob,
        address: address,
        citizenId: citizenID
    }
    console.log('new User', newUser)
    try{
        const registerRes = await registerUser(newUser, dispatch, router);
        console.log("Res", registerRes);
    } catch(err){
        console.log("err: ", err);
        //setNoti("FAIL")
        //console.log(noti);
    }
  } 
    
  return (
    <div className="h-screen flex items-center justify-center h-[631px] bg-bgr-white my-auto">
        <div className="w-[936px] h-[980px] bg-white rounded-lg">
        <h2 className="text-center text-header-blue text-[40px] font-serif font-semibold mt-[51px] mb-[53px]">Registration Form</h2>
        <form className="font-sans  font-medium text-base"
            onSubmit={handleSubmit}
        >
            <div>
                <label className="ml-[208px]">
                    Username
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded"
                id='phonenumber'
                onChange={(e)=>setPhoneNumber(e.target.value)}
                >
                </input>
            </div>
            <div>
                <label className="ml-[208px] ">
                    Full Name
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded"
                 id='fullname'
                 onChange={(e)=>setFullName(e.target.value)}
                >
                </input>
            </div>
            <div>
                <label className="ml-[208px] ">
                    Password
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded"
                 id='password'
                 onChange={(e)=>setPassword(e.target.value)}
                >
                </input>
            </div>
            <div>
                <label className="ml-[208px]">
                    Gender 
                </label>
                <label className="ml-[215px]">
                    Birthday
                </label>
                
            </div>
            <div>
                <input className="text-black w-[253px] h-[48px] mb-[12px] ml-[208px] border border-input-border-grey rounded"
                id='gender'
                onChange={(e)=>setGender(e.target.value)}
                >
                </input>
                <input className="text-black w-[253px] h-[48px] mb-[12px] ml-[13px] border border-input-border-grey rounded"
                id='dob'
                onChange={(e)=>setDob(e.target.value)}
                >
                </input>
            </div>
            <div>
                <label className="ml-[208px] ">
                    Citizen ID
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[38px] border border-input-border-grey rounded"
                 id='citizenid'
                 onChange={(e)=>setCitizenID(e.target.value)}
                >
                </input>
            </div>
            <div>
                <label className="ml-[208px] ">
                    Email
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[38px] border border-input-border-grey rounded"
                 id='email'
                 onChange={(e)=>setEmail(e.target.value)}
                >
                </input>
            </div>
            
            <div>
                <label className="ml-[208px] ">
                    Address
                </label>
            </div>
            <div  className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[38px] border border-input-border-grey rounded"
                 id='address'
                 onChange={(e)=>setAddress(e.target.value)}
                >
                </input>
            </div>

            <div className="flex items-center justify-center font-bold text-xl">
            <button className="bg-button-blue w-[520px] h-[56px] text-white rounded-lg"
            //onClick={()=>handleSubmit}
            >
                Create
            </button>

            </div>
        </form>
        </div>
    </div>
  )
}

export default signup