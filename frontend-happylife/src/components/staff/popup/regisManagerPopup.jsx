/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {useState} from "react";
import styles from './regisManagerPopup.module.css';

import EntityVerticalDisplay from "../entityVerticalDisplay";
import {XMarkIcon} from '@heroicons/react/24/solid'
import AppButton from "../appButton/button";
import { useSelector } from 'react-redux';
import RegistrationAPI from "../../../../api/registrationApi";
import {LockOpenIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { calculateAge, createMessageForRegistration } from "../../../supportFunctions";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
const RegistrationManagerPopup = (props)=> {
  const {data, onClose} =props
  const [currentTab, setCurrentTab] = useState('Overview')
  const [message, setMessage] = useState('')
  const tabNames= ['Overview', 'Documents', 'Messages']
  const [isLock, setIsLock] = useState(false)
    const [loadingBtns, setLoadingBtns] = useState("0")
    const user = useSelector((state) => state.auth.login.currentUser)
    const [rejectingReason, setRejectingReason] = useState("")
    const handleUpdateStatusOfRegistration = async (regisId, approvalStatus, message)=>{
      setLoadingBtns("1"); 
      try {
        const res = await RegistrationAPI.updateStatusOfRegistration(user.token,regisId, approvalStatus, {content:message});
        console.log('res:', res)
        setLoadingBtns("0")
        data.approvalStatus = res.data.approvalStatus
        if(res.data){
         // setRegistrations()
        }
      } catch (e) {
          console.log('', e)
      }
      
    
    
  }
  const pdfUrl='https://drive.usercontent.google.com/download?id=1Oemo7CNXVKn8IAN41GQ0ilv8p_dbK22g&export=download&authuser=0&confirm=t&uuid=16d71014-7d34-4857-bdf8-c57d55204c30&at=APZUnTXxRYLEnEOm0jOczcyUNgrg:1704303335736'
  // const pdfUrl='https://studenthcmusedu-my.sharepoint.com/:b:/g/personal/20120249_student_hcmus_edu_vn/EYoKTaQO2XZKh66O5WGCZ5IBS-Nw6tO9CbbxMcNGdGvXBQ?e=04zfML'
  //const pdfUrl='https://studenthcmusedu-my.sharepoint.com/personal/20120249_student_hcmus_edu_vn/Documents/BaoHiemYTe.pdf'
    return (
    <div className={styles.popupOverlay} 
    onClick={onClose}
    >
      <div className={styles.popup} 
      onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <XMarkIcon className="w-4 h-4"/>
        </button>
        <div className={`${styles.content} sm:h-[60em]`}>

          {/* Hiển thị thông tin chi tiết tùy thuộc vào dữ liệu (data) */}
          <h2 className={`text-[1.2em] font-semibold ${styles.h2}`}>Registration details</h2>
         {/* nav */}
          <div className={`${styles.nav} border-b border-gray-300 w-[90%] flex mt-6 z-10`}>
           {tabNames.map (e =>
              <div 
              key ={e}
              className={`mr-20 p-2 ${currentTab===e? 'border-b border-blue-600 border-b-[2px] transition border-b ease-in-out duration-500':''} cursor-pointer`}
            onClick={() => setCurrentTab(e)}
            >
              {e}
              </div>
            )
          } 
           
         
         
          </div>
     
           {/* 2 colums */}
           {currentTab==='Overview'&&
          <div className={`${styles.content} lg:flex lg:flex-col-2 md:flex-1 sm:h-[80%] lg:h-[80%] md:h-auto relative z-0 mt-[16px]`} >
           {/* col1 - user */}
           
           <EntityVerticalDisplay 
           entityType="user" 
           attributes ={[
             "img", 
             "ID", 
             "Full Name", 
             "Customer's name",
             "Citizen ID",
             "Address", 
             "Phone Number",
             "Email", 
             "Birthday",
             "Age",
             "Gender", 
             "Insurance Amount",
             "Registration Status",
             "Registration Date",
             "Contract ID",

           ]}
           values = {[
             "",
           data.customerInfo.id, 
           data.customerInfo.fullName, 
           data.customerInfo.fullName, 
           data.customerInfo.citizenId, 
           data.customerInfo.address, 
           data.customerInfo.phoneNumber, 
           data.customerInfo.email, 
           data.customerInfo.dob?data.customerInfo.dob.slice(0, 10):"", 
           data.customerInfo.dob?calculateAge(data.customerInfo.dob):"", 
           data.customerInfo.gender, 
           data.insuranceAmount,
           data.approvalStatus,
           data.createdAt?data.createdAt.slice(0,10):"", 
           data.contractIdInfo, 

           ]}
           />
           <EntityVerticalDisplay 
           entityType="user" 
           attributes ={[
             "img", 
             "ID", 
             "Plan Name", 
             "Plan Type",
             "Plan Optional Benefits",
             "Plan Duration",
             "Plan Service Coverage", 


         
           ]}
           values = {[
             "",
           data.productInfo.planId, 
           data.productInfo.planName, 
           data.productInfo.planType, 
        
           data.productInfo.optionalBenefits, 
           data.productInfo.planDuration + " "+ data.productInfo.planDurationUnit + "s", 
           data.productInfo.planServiceCoverage, 

           
      
           ]}
           />
        </div>}
        {currentTab==='Documents'&&
          <div className={`${styles.content} lg:flex lg:flex-col-2 md:flex-1 sm:h-[80%] lg:h-[80%] md:h-auto relative z-0 mt-[16px]`} >
          {/* min images */}
          <div className="w-1/2 bg-black">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={pdfUrl} />
          </Worker>
          </div>
          {/* large images */}
          <div className="w-1/2"></div>
        </div>}

          
           
          {/* <div className="sm:h-[35em] lg:h-0 md:h-0"></div> */}
          
        </div>
         {/* 2 buttons */}
        {/* <div className="flex"> */}
          <div className={`${styles.buttons} sm:pb-20`}>

          {data.approvalStatus==="Pending"?
          <>

            <AppButton 
            title="Accept" 
            textColor={"#53B271"} 
            borderColor={"#53B271"} 
            bgColor={"#EBFAFA"}
            borderRadius={"5px"} 
            width={"6em"}
            height={"2em"}
            onMouseOver = {()=>setMessage(createMessageForRegistration(message, isLock,'Accept'))}
            loading={loadingBtns}
            handleSelectingRow = {()=>handleUpdateStatusOfRegistration(data.regisId, "Approved", "")}
            />


            <AppButton 
            title="Reject" 
            textColor={"#B93735"} 
            borderColor={"#B93735"} 
            bgColor={"#F8D8D8"}
            borderRadius={"5px"} 
            width={"6em"}
            height={"2em"}
            onMouseOver = {()=>setMessage(createMessageForRegistration(message, isLock,'Reject'))}
            loading={loadingBtns}
            handleSelectingRow = {()=>handleUpdateStatusOfRegistration(data.regisId, "Rejected", rejectingReason)}
            />

          </>:<></>}
          {data.approvalStatus==="Approved"?
          <>

            <AppButton 
            title="Revoke" 
            textColor={"#B93735"} 
            borderColor={"#B93735"} 
            bgColor={"#F8D8D8"}
            borderRadius={"5px"} 
            width={"6em"}
            height={"2em"}
            onMouseOver = {()=>setMessage(createMessageForRegistration(message, isLock,'Revoke'))}
            loading={loadingBtns}
            handleSelectingRow = {()=>handleUpdateStatusOfRegistration(data.regisId, "Revoked", rejectingReason)}
            />

          </>:<></>}
          {data.approvalStatus==="Rejected"?
          <>

          <AppButton 
            title="Accept" 
            textColor={"#53B271"} 
            borderColor={"#53B271"} 
            bgColor={"#EBFAFA"}
            borderRadius={"5px"} 
            width={"6em"}
            height={"2em"}
            onMouseOver = {()=>setMessage(createMessageForRegistration(message, isLock,'Accept'))}
            loading={loadingBtns}
          
            handleSelectingRow = {()=>handleUpdateStatusOfRegistration(data.regisId, "Approved", "")}
            />
          </>:<></>}
         
        <div>
       
        

      </div>
  

      <div className="flex justify-center gap-4 items-center">
        <p >Message:</p>
        <textarea
          value={message}
          placeholder="Edit your message here..."
          className="text-gray-400 italic w-[30em]"
          onChange={e => setMessage(e.target.value)}
        />
        {
          isLock
          ?
          <LockClosedIcon className='w-6 h-6 text-custom-blue-3 cursor-pointer'
          onClick={()=>setIsLock(!isLock)}
          />
          :
          <LockOpenIcon className='w-6 h-6 text-custom-blue-2 cursor-pointer'
          onClick={() =>setIsLock(!isLock)}
          />
        }
      </div>
          </div>  
         
        {/* </div> */}
     
        
       
      </div>
      
    </div>
    )
}

export default RegistrationManagerPopup