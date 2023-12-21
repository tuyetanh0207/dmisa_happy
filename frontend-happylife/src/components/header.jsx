//import {logoTitle} from '../assets/logoTitle.png';
import { useLocation } from "react-router-dom"
import { connect } from 'react-redux';

const Header = ({navigationLeft, navigationRight}) => {
  const location = useLocation()
  const pathname = location.pathname

  if (!pathname.includes('staff')) {
      return (
        <div>
          <div>
              <h1 className={`
              ${navigationLeft.find((navItem) => navItem.name === 'Home' && navItem.current) ? 
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Home</h1>
          </div>
          <div>
            <h1 className={`
              ${navigationLeft.find((navItem) => navItem.name === 'About' && navItem.current) ? 
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>About</h1>

          </div>
          <div>
              <h1 className={`
              ${navigationLeft.find((navItem) => navItem.name === 'Plans' && navItem.current) ? 
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Plans</h1>
              
          </div>
          <div>
            <h1 className={`
              ${navigationLeft.find((navItem) => navItem.name === 'Contact' && navItem.current) ? 
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Contact</h1>
              
          </div>
          <div>
            <h1 className={`
              ${navigationRight.find((navItem) => navItem.name === 'Profile' && navItem.current) ? 
              'bg-custom-blue pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white':'hidden'}
              `}>Profile</h1>
          </div>
        </div>
      )
    }
}
  
  
const mapStateToProps = (state) => ({
  navigationLeft: state.nav.navigationLeft,
  navigationRight: state.nav.navigationRight,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrent: (name) => dispatch({ type: 'SET_CURRENT', payload: name }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
 