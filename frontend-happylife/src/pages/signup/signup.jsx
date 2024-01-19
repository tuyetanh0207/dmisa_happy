import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../redux/authApi';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/LogoHalfScreen.png';
import {Routes, Route, Link} from 'react-router-dom';

const signup = () => {
    
  const [phoneNumber, setPhoneNumber] = useState('');
  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [citizenID, setCitizenID] = useState('');

  const dispatch = useDispatch();
  const router = useNavigate();
  const [noti, setNoti] = useState('');
  const handleSubmit = async (e) => {
    {
        e.preventDefault();
        console.log('signup')
        const newUser = {
            phoneNumber: phoneNumber,
            password: password,
            fullName: fullName,
            gender: gender,
            email: email,
            dob: formatISODateToDDMMYYYY(dob),
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
  } 

  const formatISODateToDDMMYYYY = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  return (
    <div className='w-[1920px] h-[1080px] flex '>
         <div className="flex w-[960px] h-[1080px] bg-blue-950 border border-indigo-500 flex items-center justify-center">
            <img src={Logo}></img>
        </div>
        <div className="righthalf w-[960px] h-[1080px] bg-slate-50 flex items-center justify-center">
            <div className="w-[750px] h-[930px] bg-white rounded-lg border border-gray-200">
                <h2 className="text-center text-header-blue text-[40px] font-serif font-semibold mt-[31px] mb-[33px]">Create an account</h2>
                <form className="font-sans  font-medium text-base"
                    onSubmit={(e) =>{
                        e.preventDefault();
                        if (password !== confirmPassword){
                            alert("pw is not match");
                        }
                        else{
                        handleSubmit(e);
                    }}}
                >
                    <div>
                        <label className="ml-[116px]">
                            Username (Phone number)
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <input className="text-black w-[519px] h-[48px] mb-[15px] border border-input-border-grey border-solid rounded p-[10px]"
                        id='phonenumber'
                        placeholder='User name'
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label className="ml-[116px] ">
                            Full Name
                        </label>
                    </div>
                    <div  className="flex items-center justify-center">
                        <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded p-[10px]"
                        id='fullname'
                        placeholder='Full name'
                        onChange={(e)=>setFullName(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label className="ml-[116px] ">
                            Password
                        </label>
                    </div>
                    <div  className="flex items-center justify-center">
                        <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded"
                        id='password'
                        type="password" 
                        placeholder='Password'
                        onChange={(e)=>setPassword(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label className="ml-[116px] ">
                            Confirm password
                        </label>
                    </div>
                    <div  className="flex items-center justify-center">
                        <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded"
                        id='confirmpassword'
                        type="password" 
                        placeholder='Confirm password'
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        >
                        </input>
                    </div>


                    <div>
                        <label className="ml-[116px]">
                            Gender 
                        </label>
                        <label className="ml-[215px]">
                            Birthday
                        </label>
                        
                    </div>
                    <div>
                        <select id="gender" name="gender" 
                        className='text-black w-[253px] h-[48px] mb-[12px] ml-[116px] border border-input-border-grey rounded'
                        onChange={(e)=>setGender(e.target.value)}
                        >
                            <option value="Male" label="Male"></option>
                            <option value="Female" label="Female"></option>
                        </select>
                        <input className="text-black w-[253px] h-[48px] mb-[12px] ml-[13px] border border-input-border-grey rounded"
                        id='dob'
                        type="date"
                        value={dob}
                        onChange={(e)=>setDob(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label className="ml-[116px] ">
                            Citizen ID
                        </label>
                    </div>
                    <div  className="flex items-center justify-center">
                        <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded p-[10px]"
                        id='citizenid'
                        placeholder='Citizen ID'
                        onChange={(e)=>setCitizenID(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label className="ml-[116px] ">
                            Email
                        </label>
                    </div>
                    <div  className="flex items-center justify-center">
                        <input className="text-black w-[519px] h-[48px] mb-[12px] border border-input-border-grey rounded p-[10px]" 
                        id='email'
                        placeholder='Email'
                        onChange={(e)=>setEmail(e.target.value)}
                        >
                        </input>
                    </div>
                    
                    <div>
                        <label className="ml-[116px]">
                            Address
                        </label>
                    </div>
                    <div  className="flex items-center justify-center">
                        <input className="text-black w-[519px] h-[48px] mb-[27px] border border-input-border-grey rounded p-[10px]" 
                        id='address'
                        placeholder='Address'
                        onChange={(e)=>setAddress(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className="flex items-center justify-center font-bold text-xl">
                    <button className="bg-button-blue w-[520px] h-[56px] mb-[20px] text-white rounded-lg"
                    //onClick={()=>handleSubmit}
                    >
                        Create
                    </button>

                    </div>
                    <div className='flex justify-center'>
                            <label className='text-gray-500 text-base font-normal leading-tight mr-[4px] mt-[3px]'>
                                Already have an account?
                            </label>
                            <Link key='login' to='/login'>
                                <button 
                                className='text-blue-600 text-base font-medium leading-tight'>
                                    Log in
                                </button>
                            </Link>
                    </div>


                </form>
            </div>
        </div>
    </div>

   
  )
}

export default signup;