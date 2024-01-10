import Header from './header'
import {Routes, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {useSelector} from 'react-redux'
import { useState } from 'react'

 
const navprofile = ({navigationProfile, setCurrent}) => {
  const handleProfileNavClick = (name) => {
    setCurrent(name);
  };
  
  return (
    <div className= "bg-custom-blue-3">
        <nav className="flex items-center justify-center h-[90px] bg-bgr-white mx-auto  border-[0.25px] border-[#182256]">
        <div className='flex space-x-76px place-content-center text-[#182256] font-sans font-medium font text-xl'>
        {navigationProfile.map((item)=>(
            <Link
            key={item.name}
            to={item.href}  
            >
            {item.name === 'Information' ? (
              <button
              onClick={()=>handleProfileNavClick(item.name)}
              className={`${item.current ? 'current focus:outline-none underline underline-offset-8' : ''}`}
              >{item.name}</button>
            ) : item.name === 'Claims' ? (
              <button
              onClick={()=>handleProfileNavClick(item.name)}
              className={`${item.current ? 'current focus:outline-none underline underline-offset-8' : ''}`}
              >{item.name}</button>
            ) : (
              <button
              onClick={()=>handleProfileNavClick(item.name)}
              className={`${item.current ? 'current focus:outline-none underline underline-offset-8' : ''}`}
              >{item.name}</button>
            )}
            </Link>
        ))}
        </div>
        </nav>
        
        
    </div> 
     )
}

const mapStateToProps = (state) => ({
  navigationProfile: state.nav.navigationProfile
});
const mapDispatchToProps = (dispatch) => ({
  setCurrent: (name) => dispatch({ type: 'SET_CURRENT', payload: name }),
});

export default connect(mapStateToProps, mapDispatchToProps)(navprofile);
 