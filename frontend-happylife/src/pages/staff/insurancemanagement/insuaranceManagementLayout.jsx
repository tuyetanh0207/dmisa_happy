// AdminLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ManagerSidebar from '../../../components/staff/managerSidebar';
import styles from './layout.module.css'
import IMPlan from './plan/plan';
import IMRegistration from './registration/registration';
import IMClaim from './claim/claim';
const InsuaranceManagementLayout = () => {
  const location  = useLocation()
  return (
    <div 
    className={styles.container}
    >
      <ManagerSidebar/>
      <div 
       className={styles.mainContainer}
      >
        {/* <Outlet /> */}
        {location.pathname.includes('staff/insuarancemanagement/plan')?<IMPlan/>:<></>}
        {location.pathname.includes('staff/insuarancemanagement/registration')?<IMRegistration/>:<></>}
        {location.pathname.includes('staff/insuarancemanagement/claim')?<IMClaim/>:<></>}
        
        
      </div>
    </div>
  );
};

export default InsuaranceManagementLayout;
