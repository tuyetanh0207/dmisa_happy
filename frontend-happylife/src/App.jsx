import {Nav,  Footer} from './components';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/home/home.jsx'
import AboutUs from './pages/aboutus/aboutus.jsx'
import Contact from './pages/contact/contact.jsx'
import Plan from './pages/plan/plan.jsx'
import Login from './pages/login/login.jsx'
import Signup from './pages/signup/signup.jsx'
import Header from './components/header.jsx'
// import {useState} from 'react'
import Plandetail from './pages/plan/plandetail/plandetail.jsx'
import Buyplan from './pages/plan/buyplan/buyplan.jsx'
import InsuaranceManagementLayout from './pages/staff/insurancemanagement/insuaranceManagementLayout.jsx';
import IMPlan from './pages/staff/insurancemanagement/plan/plan.jsx';
import IMRegistration from './pages/staff/insurancemanagement/registration/registration.jsx';
import IMClaim from './pages/staff/insurancemanagement/claim/claim.jsx';
import NotFound404 from './pages/404/404.jsx';
import TestUser from './pages/testuser/testuser.jsx'
import Profile from './pages/profile/profile.jsx'
import Information from './pages/profile/information.jsx'
import Registration from './pages/profile/registration.jsx'
import Claims from './pages/profile/claims.jsx'
import PaymentBank from './pages/payment/paymentBank.jsx'
import PaymentConfirm from './pages/payment/paymentConfirm.jsx'

import { useState } from 'react'
import { createContext } from 'react';
const DataContext = createContext();

export default function App() {
 
  // const [isProfilePage, setIsProfilePage] = useState(false);
  // const [isSignupPage, setIsSignupPage] = useState(false);
  // const [isLoginPage, setIsLoginPage] = useState(false);
  // //console.log('isProfilePage: ', isProfilePage);
  // const handleSetIsProfilePage = (value) => {
  //   setIsProfilePage(value);
  // }
  // const handleSetIsSignupPage = (value) =>{
  //   setIsSignupPage(value);
  // }
  // const handleSetIsLoginPage = (value) =>{
  //   setIsLoginPage(value);
  // }
  // const callbackObject = {
  //   isProfilePage: handleSetIsProfilePage,
  //   isSignupPage: handleSetIsSignupPage,
  //   isLoginPage: handleSetIsLoginPage
  // }
  
  // console.log('isLoginPage in App:', isLoginPage);
  return(
          <div className='font-inter gap-y-px'>
              <Router>            
              <Nav/>
              <Header/>
              <Routes>
                <Route exac path ='/' element ={<Home/>} />
              {/* <Header/> */}
                <Route path ='/' element ={<Home/>} />
                <Route path ='/home' element ={<Home/>} />
                <Route path='/aboutus' element ={<AboutUs/>} />
                <Route path='/contact' element ={<Contact/>} />
                <Route path='/plan' element ={<Plan/>} />
                <Route path='/login' element ={<Login/>} />
                <Route path='/signup' element ={<Signup/>} />            
                <Route path='/plan/:planId' element ={<Plandetail/>} />
                <Route path='/buyplan' element ={<Buyplan/>} />
                <Route path='/paymentbank' element ={<PaymentBank/>} />
                <Route path='/paymentconfirm' element ={<PaymentConfirm/>} />
                <Route
                  path="/staff/insuarancemanagement/*"
                  element={
                    <InsuaranceManagementLayout
                    requiredRoles={['INSUARANCE_MANAGER']}
                    >
                      <Route index element={<IMPlan/>} />
                      <Route path="plan" element={<IMPlan />} />
                      <Route path="registration" element={<IMRegistration/>} />
                      <Route path="claim" element={<IMClaim/>} />
                      
                    </InsuaranceManagementLayout>
                  }
                />
                <Route path='/notfound' element ={<NotFound404/>} />
               
                <Route path='/plandetail' element ={<Plandetail/>} />
                <Route path='/profile/*' element ={<Profile/>} />
              
                {/* <Route path='/testuser' element ={<TestUser/>} /> */}
 
              </Routes>
              <Footer/>
      
            </Router>
          </div>

  )
}