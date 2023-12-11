// AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../../../components/staff/managerSidebar';

const InsuaranceManagementLayout = () => {
  return (
    <div className="admin-layout">
      <ManagerSidebar/>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default InsuaranceManagementLayout;
