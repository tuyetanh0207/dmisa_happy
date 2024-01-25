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
import CreateClaim from './pages/createclaim/createclaim.jsx';
import IMPlan from './pages/staff/insurancemanagement/plan/plan.jsx';
import IMRegistration from './pages/staff/insurancemanagement/registration/registration.jsx';
import IMClaim from './pages/staff/insurancemanagement/claim/claim.jsx';
import NotFound404 from './pages/404/404.jsx';
import Profile from './pages/profile/profile.jsx'
import Information from './pages/profile/information.jsx'
import Registration from './pages/profile/registration.jsx'
import Claims from './pages/profile/claims.jsx'
import PaymentBank from './pages/payment/paymentBank.jsx'
import PaymentConfirm from './pages/payment/paymentConfirm.jsx'
import Contract from './pages/contract/contract.jsx'
import { useState } from 'react'
import { createContext } from 'react';
const DataContext = createContext();
import IMDashboard from './pages/staff/insurancemanagement/dashboard/dashboard.jsx';
import AccountingLayout from './pages/staff/accounting/accountingLayout.jsx';
import AccClaim from './pages/staff/accounting/claim/claim.jsx';
import AccDashboard from './pages/staff/accounting/dashboard/dashboard.jsx';
import AccPlan from './pages/staff/accounting/plan/plan.jsx';
import AccRegistration from './pages/staff/accounting/registration/registration.jsx';
// import '../pdfSetup'
import PopConfirm from './components/popConfirm.jsx';
import ClaimDetail from './pages/profile/claimDetail.jsx'

export default function App() {
  // const [isLogin, setLogin] = useState(false)


  return(

          <div className='relitive font-inter gap-y-px'>
              <Router>            
              <Nav/>
              <Header/>
              <Routes>
                <Route exac path ='/' element ={<Home/>} />
                <Route path ='/' element ={<Home/>} />
                <Route path ='/home' element ={<Home/>} />
                <Route path='/aboutus' element ={<AboutUs/>} />
                <Route path='/contact' element ={<Contact/>} />
                <Route path='/plan' element ={<Plan/>} />
                <Route path='/login' element ={<Login/>} />
                <Route path='/signup' element ={<Signup/>} />            
                <Route path='/plan/:planId' element ={<Plandetail/>} />
                <Route path='/buyplan' element ={<Buyplan/>} />
                <Route path='/payment/:regisId/:planId' element ={<PaymentBank />} />
                <Route path='/paymentconfirm' element ={<PaymentConfirm/>} />
                <Route path='/contract/:regisId' element ={<Contract/>} />
                <Route path='/claimdetail/:claimId' element ={<ClaimDetail/>} />

                <Route path='/createclaim' element={<CreateClaim/>}/>
                <Route
                  path="/staff/insuarancemanagement/*"
                  element={
                    <InsuaranceManagementLayout
                    requiredRoles={['INSUARANCE_MANAGER']}
                    >
                      
                      <Route index element={<IMPlan/>} />
                      <Route path="dashboard" element={<IMDashboard/>} />
                      <Route path="plan" element={<IMPlan />} />
                      <Route path="registration" element={<IMRegistration/>} />
                      <Route path="claim" element={<IMClaim/>} />
                      
                    </InsuaranceManagementLayout>
                  }
                />
                <Route
                  path="/staff/accounting/*"
                  element={
                    <AccountingLayout
                    requiredRoles={['ACCOUNTANT']}
                    >

                      <Route index element={<AccPlan/>} />
                      <Route path="dashboard" element={<AccDashboard/>} />
                      <Route path="plan" element={<AccPlan />} />
                      <Route path="registration" element={<AccRegistration/>} />
                      <Route path="claim" element={<AccClaim/>} />
                      
                    </AccountingLayout>
                  }
                />
                <Route path='/notfound' element ={<NotFound404/>} />
               
                <Route path='/plandetail' element ={<Plandetail/>} />
                <Route path='/profile/*' element ={<Profile/>} />
               
              </Routes>
              <Footer/>
      
            </Router>
          </div>

  )
}