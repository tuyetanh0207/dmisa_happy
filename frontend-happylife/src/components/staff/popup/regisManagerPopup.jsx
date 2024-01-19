/* eslint-disable react/prop-types */
import React, {useState} from "react";
import styles from './regisManagerPopup.module.css';

import EntityVerticalDisplay from "../entityVerticalDisplay";
import {XMarkIcon} from '@heroicons/react/24/solid'
import AppButton from "../appButton/button";
import { useSelector } from 'react-redux';
import RegistrationAPI from "../../../../api/registrationApi";
const RegistrationManagerPopup = (props)=> {
  const {data, onClose} =props
  
    const [loadingBtns, setLoadingBtns] = useState("0")
    const user = useSelector((state) => state.auth.login.currentUser)
    const [rejectingReason, setRejectingReason] = useState("")
    const handleUpdateStatusOfRegistration = async (regisId, approvalStatus, message)=>{
      setLoadingBtns("1"); 
      try {
        const res = await RegistrationAPI.updateStatusOfRegistration(user.token,regisId, approvalStatus, message);
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
    return (
    <div className={styles.popupOverlay} 
    onClick={onClose}
    >
      <div className={styles.popupContent} 
      onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <XMarkIcon className="w-4 h-4"/>
        </button>
        <div className="sm:h-[60em] lg:h-[100%] md:h-full">

          {/* Hiển thị thông tin chi tiết tùy thuộc vào dữ liệu (data) */}
          <h2 className="text-[1.2em] font-semibold">Registration details</h2>
          {/* 2 colums */}
          <div className="lg:flex lg:flex-col-2 md:flex-1 sm:h-[80%] lg:h-auto md:h-auto relative">
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
              "Gender", 
             // "Health status",
              "Registration Status",
              "Registration Date"]}
            values = {["",
            data.customerInfo.id, 
            data.customerInfo.fullName, 
            data.customerInfo.fullName, 
            data.customerInfo.citizenID, 
            data.customerInfo.address, 
            data.customerInfo.phoneNumber, 
            data.customerInfo.email, 
            data.customerInfo.dob.slice(0, 10), 
            data.customerInfo.gender, 
          //  data.customerInfo.healthStatus
            data.approvalStatus,
            data.createdAt.slice(0,10), 
            ]}
            />
            <EntityVerticalDisplay 
            entityType="user" 
            attributes ={[
              "img", 
              "ID", 
              "Plan Name", 
              "Plan Type",
              "Plan Price",
              "Plan Recommendation", 
              "Plan Duration",
              "Plan Service Coverage", 
              "Plan Benefits"]}
            values = {[
              "",
            data.productInfo.planId, 
            data.productInfo.planName, 
            data.productInfo.planType, 
            data.productInfo.planPrice, 
            data.productInfo.planRecommended, 
            data.productInfo.planDuration + " "+ data.productInfo.planDurationUnit + "s", 
            data.productInfo.planServiceCoverage, 
            data.productInfo.planBenefits, 
            ]}
            />
          </div>
            {/* 2 buttons */}
          <div className="sm:h-[35em] lg:h-0 md:h-0"></div>
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
                loading={loadingBtns}
                handleSelectingRow = {()=>handleUpdateStatusOfRegistration(data.regisId, "Approved", "")}
                />
              </>:<></>}
                
          </div>  
        </div>
      
        
       
      </div>
      
    </div>
    )
}

export default RegistrationManagerPopup