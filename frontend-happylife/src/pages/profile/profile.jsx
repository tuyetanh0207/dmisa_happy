import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from './header.jsx'
import Navprofile from './navprofile.jsx'
import Information from './information.jsx'
import Claims from './claims.jsx'
import Registration from './registration.jsx'
import Footer from '../../components/footer.jsx'
const profile = () => {
  return (
    <div>
          <Navprofile/>
          <Routes>
            <Route path ='/' element ={<Information/>} />
            <Route path ='information' element ={<Information/>} />
            <Route path='registration' element ={<Registration/>} />
            <Route path='claims' element ={<Claims/>} />
          </Routes>
      
    </div>

    
  )
}

export default profile