import {Routes, Route, Link} from 'react-router-dom';
import logoTitle from '../assets/logoTitle.png';
import notification from '../assets/notifications.png';
import logout from '../assets/logout.png';
import Noti from '../components/notification.jsx'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {useSelector} from 'react-redux'
import { loginSuccess } from '../../redux/authSlice';

// const navigationLeft = [
//  { name: 'Home', href: '/home', current: true },
//  { name: 'About', href: '/aboutus', current: true },
//  { name: 'Plans', href: '/plan', current: true },
//  { name: 'Contact', href: '/contact', current: true }, 
// ]

// const navigationRight =[
//  { name: 'Login', href: '/login', current: true },
//  { name: 'Signup', href: '/signup', current: true },
//  {name: 'Profile', href: '/profile', current: true},
// ]



const Nav = ({ navigationLeft, navigationRight, setCurrent}) => {
  
  const isLoginSuccess = useSelector((state) =>state.auth.login.success);

  const handleLeftNavClick = (name) => {
    setCurrent(name);
  };
  const handleRightNavClick = (name) => {
    setCurrent(name);
  };
  console.log('loginSuccess: ', isLoginSuccess)
  
 return (
   <nav className={`${navigationRight.find((navItem) => navItem.name === 'Login' && navItem.current) ? 'hidden':''} 
   ${navigationRight.find((navItem) => navItem.name === 'Signup' && navItem.current) ? 'hidden':''} 
   mx-auto  h-20 bg-custom-blue flex justify-between items-center px-8  border-[0.25px] border-blue-500`}
   >
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
        onClick={() => handleLeftNavClick(item.name)}
        className={`${item.current ? 'current  focus:outline-none underline underline-offset-8' : ''} px-4 py-2 rounded-lg hover:bg-button-blue active:bg-blue-800`}>
        {item.name}
        </button>
       ) : item.name === 'About' ? (
        <button
        onClick={() => handleLeftNavClick(item.name)}
        className={`${item.current ? 'current focus:outline-none underline underline-offset-8' : ''} px-4 py-2 rounded-lg hover:bg-button-blue active:bg-blue-800 `}> 
        {item.name}</button>
       ) : item.name === 'Plans' ? (
        <button
        onClick={() => handleLeftNavClick(item.name)}
        className={`${item.current ? 'current focus:outline-none underline underline-offset-8' : ''} px-4 py-2 rounded-lg hover:bg-button-blue active:bg-blue-800`}>
        {item.name}</button>
       ) : (
        <button
        onClick={() => handleLeftNavClick(item.name)}
        className={`${item.current ? 'current focus:outline-none underline underline-offset-8' : ''} px-4 py-2 rounded-lg hover:bg-button-blue active:bg-blue-800`}>
        {item.name}</button> 
       )}
       </Link>
     ))}
    </div>
    <div className="flex space-x-6 text-white font-sans font-medium text-xl items-center">
       {navigationRight.map((item) => (
         <Link key={item.name} to={item.href} className='btnSignup'>
           {item.name === 'Login' ? (
             <button 
             onClick={() => handleRightNavClick(item.name)}
             className={`${isLoginSuccess  ? 'hidden' : ''} bg-button-blue text-white px-4 py-2 rounded items-center mr-[1px] hover:bg-blue-700 active:bg-blue-800 focus:outline-none`}
             >
             {item.name}
             </button>
           ) : item.name === 'Signup' ? (
             <button 
             key={item.name}
             onClick={() => handleRightNavClick(item.name)}
             className={`${isLoginSuccess ? 'hidden' : ''} bg-button-white text-white px-4 py-2 rounded items-center mr-[268px] hover:bg-blue-700 active:bg-blue-800 focus:outline-none`}
             >
             {item.name}
           </button>
           ) 
           : (
            <div className='flex gap-[27px]'>
              <button
              onClick={() => handleRightNavClick(item.name)}
              className={`${isLoginSuccess ? '' : 'hidden'} bg-button-blue text-white px-4 py-2 rounded items-center rounded-full ml-[100px] z-30`}
              >
                T 
              </button>
             </div>
           )
           }
         </Link>
       ))}
          <Noti/>
          <button>
            <img src={logout}></img>
          </button>
     </div>
   </nav>
 )
 
}

const mapStateToProps = (state) => ({
  navigationLeft: state.nav.navigationLeft,
  navigationRight: state.nav.navigationRight,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrent: (name) => dispatch({ type: 'SET_CURRENT', payload: name }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
 