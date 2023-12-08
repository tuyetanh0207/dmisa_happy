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

export default function App() {
  // const [isLogin, setLogin] = useState(false)
  return(

          <div >
              <Router>
              <Nav/>
              {/* <Header/> */}
              <Routes>
                <Route exac path ='/' element ={<Home/>} />
                <Route path ='/home' element ={<Home/>} />
                <Route path='/aboutus' element ={<AboutUs/>} />
                <Route path='/contact' element ={<Contact/>} />
                <Route path='/plan' element ={<Plan/>} />
                <Route path='/login' element ={<Login/>} />
                <Route path='/signup' element ={<Signup/>} />            
                <Route path='/plandetail' element ={<Plandetail/>} />

              </Routes>

              <Footer/>

            </Router>
          </div>

  )
}