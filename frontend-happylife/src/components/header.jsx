//import {logoTitle} from '../assets/logoTitle.png';
import { useLocation } from "react-router-dom"
//import { connect } from 'react-redux';

const Header = () => {
  const location = useLocation()
  const pathname = location.pathname

  if (!pathname.includes('staff')) {

      return (
        <div>
          <div>
              <h1 className={`
               ${pathname.includes('home') ?  
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Home</h1>
          </div>
          <div>
            <h1 className={`
               ${pathname.includes('aboutus') ?  
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>About</h1>

          </div>
          <div>
              <h1 className={`
               ${pathname.includes('plan') ?  
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Plans</h1>
              
          </div>
          <div>
            <h1 className={`
               ${pathname.includes('contact') ?  
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Contact</h1>
              
          </div>

          <div>
            <h1 className={`
              ${pathname.includes('profile') ?   
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Profile</h1>
          </div>
          <div>
            <h1 className={`
              ${pathname.includes('contract') ?   
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Registration/Contract</h1>
          </div>
        </div>
      )
    }
}
  
  
export default Header; 