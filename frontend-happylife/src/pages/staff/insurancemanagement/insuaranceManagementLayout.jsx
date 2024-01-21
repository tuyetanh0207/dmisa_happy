import { Bars3Icon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ManagerSidebar from "../../../components/staff/managerSidebar";
import SearchComponent from "../../../components/staff/searchComp";
import IMClaim from "./claim/claim";
import styles from "./layout.module.css";
import IMPlan from "./plan/plan";
import IMRegistration from "./registration/registration";
import IMDashboard from "./dashboard/dashboard";
const InsuaranceManagementLayout = ({ element, requiredRoles }) => {
  
  const location  = useLocation()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state)=> state.auth.login.currentUser);
  const navigate = useNavigate()
  
  useEffect(()=>{
    if (!requiredRoles.includes(user?.userInfo?.role) ||user===null){
      console.log('hihi')
      navigate('/notfound')
    }
  });
  const getAlphabetOfName = (name) => 
  {
    if(user){
      const arr= name.split(' ')
      return arr[arr.length-1].charAt(0);
    }
    else {
      return '';
    }
  }

  return (
    <div 
    className={`${styles.container}` }
    >
      <ManagerSidebar isSidebarOpen={isSidebarOpen}/>
      {/* top bar */}
      
      <div 
       className={`${styles.mainContainer} bg-bgr-white w-full h-full text-slight-black`}
      >
        <div className=' w-[96%] h-16 mt-0 bg-white ml-6 flex  '>
          <button className=" ml-6" onClick={toggleSidebar} >
            <Bars3Icon className="w-8 h-8 " />
          </button> 
          {/* <SearchComponent title="Search registrations, plans, claims, . . ."/> */}
          <div className='flex justify-center ml-[6em] p-3'>
           <SearchComponent title="Search plans, claims, . . ." className="ml-12" paddingX="10px"/>
          </div>
          <div className='flex justify-center ml-auto p-3 items-center'>
       
            <span className='font-bold mr-4'>{user?.userInfo?.fullName}</span>
            <span className='font-bold text-[1.3em] text-white mr-2 bg-button-blue w-10 h-10 rounded-full items-center flex justify-center'>{getAlphabetOfName(user?.userInfo?.fullName)}</span>
          </div>
        </div>

        {/* <Outlet /> */}
        {location.pathname.includes("staff/insuarancemanagement/dashboard") ? (
          <IMDashboard />
        ) : (
          <></>
        )}
        {location.pathname.includes("staff/insuarancemanagement/plan") ? (
          <IMPlan />
        ) : (
          <></>
        )}
        {location.pathname.includes("staff/insuarancemanagement/registration") ? (
          <IMRegistration />
        ) : (
          <></>
        )}
        {location.pathname.includes("staff/insuarancemanagement/claim") ? (
          <IMClaim />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default InsuaranceManagementLayout;
