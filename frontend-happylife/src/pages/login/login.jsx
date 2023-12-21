import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../redux/authApi';
import { useNavigate } from 'react-router-dom';
import Home from '../home/home'
import Logo from '../../assets/LogoHalfScreen.png'
import {Routes, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {useSelector} from 'react-redux'


const Login = ({navigationRight, setCurrent}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [noti, setNoti] = useState('');
    const router = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const name = 'Profile';
        setCurrent(name);
        console.log('glooin')
        const newUser = {
            phoneNumber: username,
            password: password
        } // 0123456789/123456
        console.log('new User', newUser);
        try {
            const loginRes = await loginUser(newUser, dispatch, router);
            console.log("res:",loginRes)
               //router.push("/")
            const name = 'Home';
            setCurrent(name);
       
        } catch (err) {
            console.log("err:", err);
           // setNoti("Tên đăng nhập hoặc mật khẩu không đúng.")
            console.log(noti)
        }

    }

    // const handleLogin = (event) =>{
    //     event.preventDefault();

    // }

    const handleNavigateToSignup = (event) =>{
        //event.preventDefault();
        const name = 'Signup';
        setCurrent(name);
    }

    return(
    <div className='w-[1920px] h-[1080px] flex '>
        <div className="flex w-[960px] h-[1080px] bg-blue-950 border border-indigo-500 flex items-center justify-center">
            <img src={Logo}></img>
        </div>
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
                            <input className="text-black w-[519px] h-[48px] mb-[44px] border border-neutral-200 border-solid rounded"
                            id='username' 
                            onChange={(e)=> setUsername(e.target.value)}
                            >
                            </input>
                        </div>
                        <div>
                            <label className="ml-[100px] ">
                                Password
                            </label>
                        </div>
                        <div  className="flex items-center justify-center">
                            <input className="text-black w-[519px] h-[48px] mb-[12px] border border-neutral-200 rounded"
                            type="password" 
                            id ='password' 
                            onChange={(e)=> setPassword(e.target.value)}
                            >
                            </input>
                        </div>
                        
                        <div className="ml-[100px] font-normal italic text-[#5576F5]">
                            Forgot password?
                        </div>  
                        <div className="flex items-center justify-center font-bold text-xl">
                        <button 
                            //onClick={handleLogin}  
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
                                onClick={handleNavigateToSignup}
                                className='text-blue-600 text-base font-medium leading-tight'>
                                    
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            {/* </div>    */}
        </div>
    </div>

    )
}

const mapStateToProps = (state) => ({
    navigationRight: state.nav.navigationRight,
  });
  const mapDispatchToProps = (dispatch) => ({
    setCurrent: (name) => dispatch({ type: 'SET_CURRENT', payload: name }),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);
