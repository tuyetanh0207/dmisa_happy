import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../redux/authApi';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [noti, setNoti] = useState('');
    const router = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('glooin')
        const newUser = {
            phoneNumber: username,
            password: password
        }
        console.log('new User', newUser);
        try {
            const loginRes = await loginUser(newUser, dispatch, router);
            console.log("res",loginRes)
               // router.push("/")
        } catch (err) {
            console.log("err:", err);
           // setNoti("Tên đăng nhập hoặc mật khẩu không đúng.")
            console.log(noti)
        }

    }
    return(
    <div className="h-screen flex items-center justify-center h-[631px] bg-bgr-white mx-auto">
        <div className="w-[936px] h-[479px] bg-white rounded-lg">
        <h2 className="text-center text-header-blue text-[40px] font-serif font-semibold mb-6 mt-[51px] mb-[53]">User Login</h2>
        <form className="font-sans  font-medium text-base"
          onSubmit={handleSubmit}
         >
            <div>
                <label className="ml-[208px]">
                    Username    
                </label>
            </div>
            <div className="flex items-center justify-center">
                <input className="text-black w-[519px] h-[48px] mb-[44px] border border-input-border-grey border-solid rounded"
                id='username' 
                onChange={(e)=> setUsername(e.target.value)}
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
                type="password" 
                id ='password' 
                onChange={(e)=> setPassword(e.target.value)}
                >
                </input>
            </div>
            
            <div className="ml-[208px] font-normal italic text-[#5576F5]">
                Forgot password?
            </div>  
            <div className="flex items-center justify-center font-bold text-xl">
            <button 
            //onClick={()=>handleSubmit} 
            className="bg-button-blue w-[208px] h-[56px] mt-[29px] text-white rounded-lg">
                Login
            </button>

            </div>
        </form>
        </div>
    </div>   
    )
}