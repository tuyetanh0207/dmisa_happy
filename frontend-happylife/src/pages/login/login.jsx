import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../redux/authApi';
import { useNavigate } from 'react-router-dom';
import Home from '../home/home'
import Logo from '../../assets/LogoHalfScreen.png'
import {Routes, Route, Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import PopupConfirm from '../../components/popConfirm'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [noti, setNoti] = useState('');
    const router = useNavigate();
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('glooin')
        const newUser = {
            phoneNumber: username,
            password: password
        } // 0123456789/123456
        console.log('new User', newUser);
        try {
            const loginRes = await loginUser(newUser, dispatch, router);
            console.log("res:",loginRes);
            if(loginRes?.data?.token){
                setIsPopupOpen(false);
                console.log("SET POPUP = true");
            }
            else {
                setIsPopupOpen(true);
                console.log("SET POPUP = false");

            }
            setNoti(loginRes);
        } catch (err) {
            console.log("err in login page:", err);
           return err
        }
    }
    
    console.log("res in login: ", isLoginSuccess)

    return(
    <div className='w-[1920px] h-[1080px] flex '>
        {isPopupOpen === true && <PopupConfirm realtimeNoti={noti} isPopupOpen={isPopupOpen} setIsPopupOpen = {setIsPopupOpen} />} 
        <Link to='/home'>
            <div className="flex w-[960px] h-[1080px] bg-blue-950 border border-indigo-500 flex items-center justify-center">
                <img src={Logo}></img>
            </div>
        </Link>
        <div className="righthalf w-[960px] h-[1080px] bg-slate-50 flex items-center justify-center">
            {/* <div className="h-screen flex items-center justify-center h-[631px] bg-bgr-white mx-auto">  */}
                <div className="w-[720px] h-[663px] bg-white rounded-lg border border-gray-200">
                    <h2 className="text-center text-blue-950 text-4xl leading-[56px] font-serif font-semibold mb-6 mt-[105px] mb-[47]">Log in into your account</h2>
                    <form className="font-sans  font-medium text-base"
                    onSubmit={handleSubmit}
                    >
                        <div>
                            <label className="ml-[100px]">
                                Username    
                            </label>
                        </div>
                        <div className="flex items-center justify-center">
                            <input className="text-black w-[519px] h-[48px] mb-[44px] border border-neutral-200 border-solid rounded p-[10px]"
                            id='username' 
                            onChange={(e)=> setUsername(e.target.value)}
                            required
                            >
                            </input>
                        </div>
                        <div>
                            <label className="ml-[100px] ">
                                Password
                            </label>
                        </div>
                        <div  className="flex items-center justify-center">
                            <input className="text-black w-[519px] h-[48px] mb-[12px] border border-neutral-200 rounded p-[10px]"
                            type="password" 
                            id ='password' 
                            onChange={(e)=> setPassword(e.target.value)}
                            required
                            >
                            </input>
                        </div>
                        
                        <div className="ml-[100px] font-normal italic text-[#5576F5]">
                            Forgot password?
                        </div>  
                        <div className="flex items-center justify-center font-bold text-xl">
                        <button 
                           className="bg-button-blue w-[519px] h-[56px] mt-[29px] mb-[22px] text-white rounded-lg">
                           Sign in
                           
                        </button>
                        </div>
                        <div className='flex justify-center'>
                            <label className='text-gray-500 text-base font-normal leading-tight mr-[4px] mt-[2px]'>
                                Don't have an account?
                            </label>
                            <Link key='signup' to='/signup'>
                                <button 
                                className='text-blue-600 text-base font-medium leading-tight'>
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
        </div>
    </div>

    )
}

export default Login; 
