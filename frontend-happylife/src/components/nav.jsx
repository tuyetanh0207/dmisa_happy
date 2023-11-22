 import logoTitle from '../assets/logoTitle.png';

const navigationLeft = [
  { name: 'Home', href: '/home', current: false },
  { name: 'About', href: '/aboutus', current: false },
  { name: 'Plans', href: '/plan', current: false },
  { name: 'Contact', href: '/contact', current: false }, 
]

const navigationRight =[
  { name: 'Login', href: '/login', current: true },
  { name: 'Signup', href: '/signup', current: false },
]
const Nav = () => {
  return (
    <nav className="h-20 bg-custom-blue flex justify-between items-center px-8  border-[0.25px] border-blue-500">
     <img src={logoTitle} alt="LOGO" className='ml-[226px]'></img>  
     <div className='flex space-x-76px place-content-center text-white font-sans font-medium font text-xl'>
      {navigationLeft.map((item)=>(
        <a
        key={navigationLeft.name}
        href={navigationLeft.href}  
        >
        {item.name}
        </a>

      ))}
     </div>
     <div className="flex space-x-6 text-white font-sans font-medium text-xl items-center">
        {navigationRight.map((item) => (
          <a key={item.name} href={item.href} className='btnSignup'>
            {item.name === 'Signup' ? (
              <button className="bg-button-blue text-white px-4 py-2 rounded items-center mr-[268px]">
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