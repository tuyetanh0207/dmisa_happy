import {Routes, Route, Link} from 'react-router-dom';
import logoTitle from '../assets/logoTitle.png';
import { useState } from 'react'
const navigationLeft = [
 { name: 'Home', href: '/home', current: true },
 { name: 'About', href: '/aboutus', current: true },
 { name: 'Plans', href: '/plan', current: true },
 { name: 'Contact', href: '/contact', current: true }, 
]

const navigationRight =[
 { name: 'Login', href: '/login', current: true },
 { name: 'Signup', href: '/signup', current: true },
 {name: 'Profile', href: '/profile', current: true},
]



const Nav = ({isProfileVisible}) => {
 const [isChoosen, setIsChoosen] = useState('');
 const handleLeftNavClick = (name) => {
  setIsChoosen(name);
 }
 //const [isButtonVisible, setIsButtonVisible] = useState(false);
 const [isLoginVisible, setIsLoginVisible] = useState(true);
 const [isSignupVisible, setIsSignupVisible] = useState(true);
 const [isSignout, setIsSignout] = useState(false)

 const handleLoginClick = () => {
  setIsLoginVisible(!isLoginVisible); 
 };
 const handleSignupClick = () => {
  setIsSignupVisible(!isSignupVisible); 
 };
//  const handleProfileClick = () =>{
//  setIsProfileVisible((prevValue) => !prevValue);
//  }
 
//This is for sign out
//  const handleSignoutClick = () => {
//   setIsSignout(!setIsSignout);
//   setIsLoginVisible(!setIsLoginVisible); 
//   setIsSignupVisible(!setIsSignupVisible);    
//  };
 console.log("isProfileVisible: ", isProfileVisible);
 return (
   <nav className={`mx-auto  h-20 bg-custom-blue flex justify-between items-center px-8  border-[0.25px] border-blue-500`}>
    <img src={logoTitle} alt="LOGO" className='ml-[226px]'></img>  
    <div className='flex space-x-76px place-content-center text-white font-sans font-medium font text-xl'>
     {navigationLeft.map((item)=>(
       <Link
       key={item.name}
       to={item.href} 
       className='flex justify-center' // underline underline-offset-8 hover:bg-button-blue active:bg-blue-800 focus:outline-none 
       >
       {item.name === 'Home' ? (
        <button 
        onClick={()=>handleLeftNavClick('Home')}
        className={`px-4 py-2 rounded-lg hover:bg-button-blue active:bg-blue-800 focus:outline-none ${isChoosen == 'Home' ? 'underline underline-offset-8' : ''}`}
        >{item.name}</button>
       ) : item.name === 'About' ? (
        <button
        onClick={()=>handleLeftNavClick('About')}
        className={`px-4 py-2 rounded-lg hover:bg-button-blue active:bg-blue-800 focus:outline-none ${isChoosen == 'About' ? 'underline underline-offset-8' : ''}`}
        >{item.name}</button>
       ) : item.name === 'Plans' ? (
        <button
        onClick={()=>handleLeftNavClick('Plans')}
        className={`px-4 py-2 rounded-lg hover:bg-button-blue active:bg-blue-800 focus:outline-none ${isChoosen == 'Plans' ? 'underline underline-offset-8' : ''}`}
        >{item.name}</button>
       ) : (
        <button
        onClick={()=>handleLeftNavClick('Contact')}
        className={`px-4 py-2 rounded-lg hover:bg-button-blue active:bg-blue-800 focus:outline-none ${isChoosen == 'Contact' ? 'underline underline-offset-8' : ''}`}
        >{item.name}</button> 
       )}
       </Link>
     ))}
    </div>
    <div className="flex space-x-6 text-white font-sans font-medium text-xl items-center">
       {navigationRight.map((item) => (
         <Link key={item.name} to={item.href} className='btnSignup'>
           {item.name === 'Login' ? (
             <button 
             onClick={()=>handleLeftNavClick('Login')}
             className={`bg-button-blue text-white px-4 py-2 rounded items-center mr-[1px] hover:bg-blue-700 active:bg-blue-800 focus:outline-none ${isChoosen == 'Login' ? 'underline underline-offset-8' : ''}`}
             //className={`bg-button-blue text-white px-4 py-2 rounded items-center mr-[1px] ${isButtonVisible ? '' : ''}`}
             >
              {item.name}
             </button>
           ) : item.name === 'Signup' ? (
             <button 
             onClick={()=>handleLeftNavClick('Signup')}
             //className={`bg-button-white text-white px-4 py-2 rounded items-center mr-[268px] ${isButtonVisible ? 'hidden' : ''}`}>
             className={`bg-button-white text-white px-4 py-2 rounded items-center mr-[268px] hover:bg-blue-700 active:bg-blue-800 focus:outline-none ${isChoosen == 'Signup' ? 'underline underline-offset-8' : ''}`}>
             {item.name}
           </button>
           ) 
           : (
             <button
             
             className={`bg-button-blue text-white px-4 py-2 rounded items-center mr-[2px] ${isProfileVisible ? '' : 'hidden'}`}
             //onClick={handleProfileClick}
             >
               {item.name}
             </button>
           )
           }
         </Link>
       ))}
     </div>
   </nav>
 )
}

export default Nav;