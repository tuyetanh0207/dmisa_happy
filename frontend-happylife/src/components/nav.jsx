 import {Routes, Route, Link} from 'react-router-dom';
 import logoTitle from '../assets/logoTitle.png';

const navigationLeft = [
  { name: 'Home', href: '/home', current: true },
  { name: 'About', href: '/aboutus', current: true },
  { name: 'Plans', href: '/plan', current: true },
  { name: 'Contact', href: '/contact', current: true }, 
]

const navigationRight =[
  { name: 'Login', href: '/login', current: false },
  { name: 'Signup', href: '/signup', current: false },
]

// const handleLogin =()=>{
//   setLogin(true);
//}
const Nav = () => {
    return (
    <nav className="h-20 bg-custom-blue flex justify-between items-center px-8  border-[0.25px] border-blue-500">
     <img src={logoTitle} alt="LOGO" className='ml-[226px]'></img>  
     <div className='flex space-x-76px place-content-center text-white font-sans font-medium font text-xl'>
      {navigationLeft.map((item)=>(
        <a
        key={item.name}
        href={item.href}  
        >
        <button>{item.name}</button>
        </a>
      ))}
     </div>
     <div className="flex space-x-6 text-white font-sans font-medium text-xl items-center">
        {navigationRight.map((item) => (
          <a key={item.name} href={item.href} className='btnSignup'>
            {item.name === 'Signup' ? (
              <button className="bg-button-blue text-white px-4 py-2 rounded items-center mr-[268px]"
              >
              
              {item.name}
            </button>
            ) : (
              item.name
            )}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Nav