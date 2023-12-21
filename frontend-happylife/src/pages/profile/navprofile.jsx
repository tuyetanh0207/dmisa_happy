import Header from './header'
import {Routes, Route, Link} from 'react-router-dom';

const navigation =[
  { name: 'Information', href: '/profile/information', current: true },
  { name: 'Claims', href: '/profile/claims', current: true },
  {name: 'Registration', href: '/profile/registration', current: true},
]
const navprofile = () => {
  return (
    <div className= "bg-custom-blue-3">
        <nav className="flex items-center justify-center h-[90px] bg-bgr-white mx-auto  border-[0.25px] border-[#182256]">
        <div className='flex space-x-76px place-content-center text-[#182256] font-sans font-medium font text-xl'>
        {navigation.map((item)=>(
            <Link
            key={item.name}
            to={item.href}  
            >
            <button>{item.name}</button>
            </Link>
        ))}
        </div>
        </nav>
        
        
    </div> 
     )
}

export default navprofile