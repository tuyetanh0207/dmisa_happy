import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Nav from './components/nav.jsx'
import Header from './components/header.jsx'
import Home from './pages/home/home.jsx'
import AboutUs from './pages/aboutus/aboutus.jsx'
import Contact from './pages/contact/contact.jsx'
import Plan from './pages/plan/plan.jsx'
import Footer from './components/footer.jsx'

export default function App() {
      
      return(
      <div >
        <Router>
          <Nav/>
          <Header/>
          <Routes>
            <Route exact path='/' element ={<Home/>} />
            <Route path='/aboutus' element ={<AboutUs/>} />
            <Route path='/contact' element ={<Contact/>} />
            <Route path='/plan' element ={<Plan/>} />

          </Routes>

          <Footer/>

        </Router>
      </div>
     
      )
}