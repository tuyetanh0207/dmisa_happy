import {Nav, Header, Footer} from './components';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/home/home.jsx'
import AboutUs from './pages/aboutus/aboutus.jsx'
import Contact from './pages/contact/contact.jsx'
import Plan from './pages/plan/plan.jsx'
import Login from './pages/login/login.jsx'

export default function App() {
      
  return(
  <div >
    <Router>
      <Nav/>
      <Header/>
      <Routes>
        
        <Route path ='/home' element ={<Home/>} />
        <Route path='/aboutus' element ={<AboutUs/>} />
        <Route path='/contact' element ={<Contact/>} />
        <Route path='/plan' element ={<Plan/>} />
        <Route exact path='/' element ={<Login/>} />
      </Routes>

      <Footer/>

    </Router>
  </div>
 
  )
}