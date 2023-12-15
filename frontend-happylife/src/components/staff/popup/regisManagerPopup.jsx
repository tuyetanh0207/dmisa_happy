/* eslint-disable react/prop-types */
import React from "react";
import styles from './regisManagerPopup.module.css';
import EntityVerticalDisplay from "../entityVerticalDisplay";
import {XMarkIcon} from '@heroicons/react/24/solid'
import AppButton from "../appButton/button";
const RegistrationManagerPopup = (props)=> {
  const {data, onClose} =props
  
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
        <div>

          {/* Hiển thị thông tin chi tiết tùy thuộc vào dữ liệu (data) */}
          <h2 className="text-[1.2em] font-semibold">Registration details</h2>
          {/* 2 colums */}
          <div className="flex flex-col-2">
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
              "Health status",
              "Registration Date"]}
            values = {["",
            data.customerInfo.id, 
            data.customerInfo.fullName, 
            data.customerInfo.fullName, 
            data.customerInfo.citizenID, 
            data.customerInfo.address, 
            data.customerInfo.phoneNumber, 
            data.customerInfo.email, 
            data.customerInfo.dob, 
            data.customerInfo.gender, 
            // data.customerInfo., 
            data.createdAt, 
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
            data.productInfo.planDuration + " "+ data.productInfo.planDuration, 
            data.productInfo.planServiceCoverage, 
            data.productInfo.planBenefits, 
            ]}
            />
          </div>
          <div className={styles.buttons}>

            <AppButton 
            title="Accept" 
            textColor={"#53B271"} 
            borderColor={"#53B271"} 
            bgColor={"#EBFAFA"}
            borderRadius={"5px"} 
            width={"10em"}
            height={"3em"}
            />
            <AppButton 
            title="Reject" 
            textColor={"#B93735"} 
            borderColor={"#B93735"} 
            bgColor={"#F8D8D8"}
            borderRadius={"5px"} 
            width={"10em"}
            height={"3em"}
            />
                
          </div>  
        </div>
        {/* 2 buttons */}
       
      </div>
    </div>
    )
}

export default RegistrationManagerPopup