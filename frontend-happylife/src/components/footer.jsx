import logoTitle from '../assets/logoTitle.png';
import In from '../assets/LinkedIn.png';
import Instagram from '../assets/Instagram.png';
import Fb from '../assets/Facebook.png';
import { useLocation } from 'react-router-dom';
//import { connect } from 'react-redux';

const Footer = ({navigationRight, setCurrent}) => {
    const location = useLocation()
  const pathname = location.pathname
  if (!pathname.includes('staff') && !pathname.includes('signup') && !pathname.includes('login') ){
  return (
    <div className='bg-custom-blue'>
        <div className="flex flex-col divide-y divide-slate-600  " >
            <div className="pt-10 container mx-auto ">
            
                <div className="pb-10 flex flex-row " >
                    <div className="basis-1/3">
                        <div className="grid-rows-3 space-y-5">
                            <img src={logoTitle} alt="LOGO" ></img>
                            <h5 className="text-white ">Quis risus sed vulputate odio ut. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Orci ac auctor augue mauris augue neque gravida</h5>
                            <div className="flex flex-row flex-wrap space-x-6" >
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                                    <img src={Fb} alt="socialmedia" className="cursor-pointer"/>
                                </a>
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                                    <img src={Instagram} alt="socialmedia" className="cursor-pointer"/>
                                </a>
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                                    <img src={In} alt="socialmedia" className="cursor-pointer"/>
                                </a>
                            </div>
                     </div>
                    </div>          
                </div>
                
            </div>    
            <p className="pt-5 pb-5 text-center text-white">Merkulove © OptiOne Template All right reserve Copyrights 2022</p>
        </div>
        
    </div>
  )
  }
}


// const mapStateToProps = (state) => ({
//     navigationRight: state.nav.navigationRight,
//   });
//   const mapDispatchToProps = (dispatch) => ({
//     setCurrent: (name) => dispatch({ type: 'SET_CURRENT', payload: name }),
//   });
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Footer);
export default Footer
