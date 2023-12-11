import Header from './header'
const navprofile = () => {
  return (
    <div className= "bg-custom-blue-3">
        <Header/>
        <nav className="h-screen flex items-center justify-center h-[90px] bg-bgr-white mx-auto  border-[0.25px] border-[#182256]">
        <div className='flex space-x-76px place-content-center text-[#182256] font-sans font-medium font text-xl'>
        {navigation.map((item)=>(
            <a
            key={item.name}
            href={item.href}  
            >
            <button>{item.name}</button>
            </a>
        ))}
        </div>
        </nav>
        
        
    </div> 
     )
}

export default navprofile