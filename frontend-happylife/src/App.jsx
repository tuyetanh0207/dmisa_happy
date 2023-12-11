import {Nav,  Footer} from './components';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/home/home.jsx'
import AboutUs from './pages/aboutus/aboutus.jsx'
import Contact from './pages/contact/contact.jsx'
import Plan from './pages/plan/plan.jsx'
import Login from './pages/login/login.jsx'
import Signup from './pages/signup/signup.jsx'
// import {useState} from 'react'
import Plandetail from './pages/plan/plandetail/plandetail.jsx'
import InsuaranceManager_Registration from './pages/staff/insurancemanagement/registration/registrations.jsx';
import InsuaranceManagementLayout from './pages/staff/insurancemanagement/insuaranceManagementLayout.jsx';
export default function App() {
  // const [isLogin, setLogin] = useState(false)

  return(

          <div >
              <Router>            
              
              <Routes>
                <Route exac path ='/' element ={<Home/>} />
                <Route path ='/home' element ={<Home/>} />
                <Route path='/aboutus' element ={<AboutUs/>} />
                <Route path='/contact' element ={<Contact/>} />
                <Route path='/plan' element ={<Plan/>} />
                <Route path='/login' element ={<Login/>} />
                <Route path='/signup' element ={<Signup/>} />            
                <Route path='/plandetail' element ={<Plandetail/>} />
                <Route
                  path="/admin/*"
                  element={
                    <InsuaranceManagementLayout>
                      <Route path="plan" element={<AdminDashboard />} />
                      <Route path="registration" element={<InsuaranceManager_Registration />} />
                      
                    </InsuaranceManagementLayout>
                  }
                />
                <Route path='/staff/insuarancemanagement/registration' element ={<InsuaranceManager_Registration/>} />

              </Routes>

              <Footer/>

            </Router>
          </div>

  )
}