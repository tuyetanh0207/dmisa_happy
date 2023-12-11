// AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../../../components/staff/managerSidebar';
import styles from './layout.module.css'
const InsuaranceManagementLayout = () => {
  return (
    <div 
    className={styles.container}
    >
      <ManagerSidebar/>
      <div 
       className={styles.mainContainer}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default InsuaranceManagementLayout;
