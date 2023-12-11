import logo from '../../assets/logo-staff.svg'
import styles from './managerSidebar.module.css'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {HeartIcon, ArrowLeftOnRectangleIcon,  CreditCardIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
const ManagerSidebar = () => {
    const location = useLocation()
    
    const pathname = location.pathname
    const navigate = useNavigate()
    const navTitles = [
        {name: 'Plan', icon: <HeartIcon key="1" className='w-8 h-8 mr-4'/>, pathname: 'plan'}, 
        {name: 'Registration', icon: <ArrowLeftOnRectangleIcon key="2" className='w-8 h-8 mr-4'/>, pathname: 'registration'},
        {name: 'Claim', icon: <CreditCardIcon key="3" className='w-8 h-8 mr-4'/>, pathname: 'claim'},
    ]
    const handleClickNavigation = (navPath) => {
        const path = '/staff/insuarancemanagement/' + navPath
        navigate(path);
    }
    return (
        <menu className={styles.container}>
            <div className="logo flex flex-2 flex-row p-4">
                <img src={logo} alt="logo" className="w-auto h-auto mr-4" />
                 <div className="logo-left">
                    {/* <FolderMinusIcon/> */}
                    
                    <p className="sm1:text-xs sm:text-sm md:text-lg lg:text:lg font-bold font-sans ">HAPPY LIFE</p>
                    <p className="sm1:text-xs sm:text-xs md:text-xs lg:text:xs">WHERE LAUGHTERS LIVE</p>
                 </div>
            </div>
            <ul className='mt-16'>
                {navTitles.map((e)=>(
                <li className={`flex font-semibold ml-8 mb-8 ${pathname.includes(e.pathname) ? 'text-blue-600' : ''}`} 
                key=''
                onClick={handleClickNavigation(e.pathname)}
                
                >
                {e.icon}
                {e.name}
              </li>
                ))}
                <li className='flex font-semibold ml-8 mb-8 mt-96' key=''>
                    <ArrowRightOnRectangleIcon className='w-8 h-8 mr-4 '/>
                    Sign out
                </li>
              
            </ul>
        </menu>
    )
}

export default ManagerSidebar;