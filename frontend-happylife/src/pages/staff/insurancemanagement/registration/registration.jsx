// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RegistrationAPI from '../../../../../api/registrationApi';
import UserAPI from '../../../../../api/userApi';
import AppButton from '../../../../components/staff/appButton/button';
import gStyles from '../../../../style'
import RegistrationManagerPopup from '../../../../components/staff/popup/regisManagerPopup';
import StatusFilter from '../../../../components/staff/filter/status/statusFilter';
import { statusArrayOfRegistration } from '../../../../resource/status';
const IMRegistration = () => {
  console.log('kk')
  const user = useSelector((state) => state.auth.login.currentUser)
  const [firstTime, setFirstTime] = useState(true)
  const [registrations, setRegistrations] = useState(null);
  const [rejectingReason, setRejectingReason] = useState("");
  const [loadingBtns, setLoadingBtns] = useState([])
  const [filterStatus, setFilterStatus]= useState('All');

  const [startDate, setStartDate]= useState('');
  const [endDate, setEndtartDate]= useState('');
  const fetchRegistrations = async () => {
    try{
      //console.log('token', user.token)
      const res = await RegistrationAPI.getAllRegistration(user.token);
      let data= res.data
      if(filterStatus !== 'All'){
        // data = data.filter(a => a.approvalStatus===filterStatus);
       
      }
      const sortedArray = data.sort((a, b) => {
        // Assuming createdAt is a string in ISO 8601 format, you can directly compare them
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setRegistrations(sortedArray)
      

      //console.log('res data', res.data);
    } catch(err){
      console.log('error in fetchRegistrations', err);
    }
    
  }
  const [selectedRow, setSelectedRow] =useState(null)
  const handleSelectingRow = (row) =>{
    console.log('setting selected row')
    setSelectedRow(row);
  }
  const handleClosePopup = () => {
    console.log('clg: close popup')
    setSelectedRow(null);
  };
  useEffect(()=>{
    
    fetchRegistrations(); 
    setFirstTime(false);
  },[]);
  useEffect(()=>{
   // if(!firstTime) {
    //   fetchRegistrations(); 
    
    setTimeout(()=>{
      console.log('use Effect')
      fetchRegistrations(); 
      setFirstTime(false);
    },1000)
  //}
    
  },[registrations]);

  const handleUpdateStatusOfRegistration = async (
    regisId,
    regis,
    approvalStatus
  ) => {
    setLoadingBtns((t) => [...t, regisId]);
    try {
       await RegistrationAPI.updateStatusOfRegistration(
        user.token,
        regisId,
        {...regis,
          approvalStatus}
        ,
        { content: createMessageForRegistration("", false, approvalStatus) }
      );
      setLoadingBtns((t) => t.filter((id) => id !== regisId));
    } catch (e) {
        console.log('', e)
    }
    
  }
  const colTitle = ['No.', 'Cus. Name', 'Cus. Phone', 'Birthday','Address', 'Plan', 'Plan Coverage', 'Plan Duration', 'Created At', 'Status']
  const handleChangeFilterStatus = (status)=>{
    // if(status ==='All'){
    //   setFilterStatus(status)
    //   return;
    // }
    // setRegistrations((t) => t.filter((regis) => regis.approvalStatus === status));
    setFilterStatus(status)
  }
  return (
    <div className='bg-white w-[96%] mt-12 mb-12 ml-6 mr-2 rounded-xl pt-4'>
      <h1 className='text-[1.5em] font-semibold ml-8 mt-2 mb-4 text-slight-black'>Registrations</h1>
      {/* filter */}
      <section  className='flex justify-end px-10'>
      <StatusFilter 
      options={statusArrayOfRegistration}  
      fieldName={"Status"}
      value={filterStatus} 
      onChange={handleChangeFilterStatus}
      />
      </section>
     <table className="w-full">
     
        <thead>
          <tr>
            {colTitle.map((e)=>(
              e==="No."?
              <th className="pl-8 pr-2 py-4 text-left" key ={e}>{e}</th>:
              <th className="px-2 py-4 text-left" key ={e}>{e}</th>
            ))}
          </tr>
          
        </thead>
        
        <tbody >
          {registrations?.map((item, index) => (
            (item.approvalStatus===filterStatus || filterStatus==='All')
            &&
            <tr key={index} >
              <td className="border-t border-gray-300 pl-8 pr-2 py-2">{index + 1}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.customerInfo.fullName}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.customerInfo.phoneNumber}</td>
              {/* <td className="border border-gray-300 px-2 py-2">{item.customerInfo.citizenID}</td> */}
              <td className="border-t border-gray-300 px-2 py-2">{item.customerInfo.dob.slice(0,10)}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.customerInfo.address}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.productInfo.planName}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.productInfo.planServiceCoverage}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.productInfo.planDuration + " " + item.productInfo.planDurationUnit + "s"}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.createdAt.toString().slice(0, 10)}</td>
              <td className={`border-t border-gray-300 px-2 py-2 font-bold ${item.approvalStatus==="Approved"?'text-custom-blue-2': item.approvalStatus==='Pending'? 'text-custom-blue-3':'text-custom-red-2'}`}>{item.approvalStatus}</td>
              <td className="border-t border-gray-300 px-2 py-2">
                <AppButton 
                title="View" 
                textColor={gStyles.buttonBlue}  
                borderColor={gStyles.buttonBlue} 
                bgColor={gStyles.customBlue3}
                borderRadius={"5px"} 
                width={"6em"}
                height={"2em"}
                data={item}
                handleSelectingRow = {()=>handleSelectingRow(item)}
                
                
                />
              </td>
              <td className="border-t border-gray-300 px-2 py-2">
                <AppButton 
                title="Pending" 
                textColor={gStyles.buttonBlue}  
                borderColor={gStyles.buttonBlue} 
                bgColor={gStyles.customBlue3}
                borderRadius={"5px"} 
                width={"6em"}
                height={"2em"}
                data={item}
               
                loading={loadingBtns.includes(item.regisId)?"1": ""}
                handleSelectingRow = {()=>handleUpdateStatusOfRegistration(item.regisId, "Pending", "")}

        <tbody>
          {registrations?.map(
            (item, index) =>
              (item.ApprovalStatus === filterStatus ||
                filterStatus === "All") &&
              (startDate === "" || startDate <= item.createdAt) &&
              (endDate === "" || endDate >= item.createdAt.slice(0, 10)) && (
                <tr key={index}>
                  <td className="border-t border-gray-300 pl-8 pr-2 py-2">
                    {index + 1}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.customerInfo.fullName}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.customerInfo.phoneNumber}
                  </td>
                  {/* <td className="border border-gray-300 px-2 py-2">{item.customerInfo.citizenID}</td> */}
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.customerInfo.dob
                      ? item.customerInfo.dob.slice(0, 10)
                      : ""}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.customerInfo.address}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.productInfo.planName}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.productInfo.planType[0].typeName}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.insuranceAmount}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.productInfo.planDuration +
                      " " +
                      item.productInfo.planDurationUnit +
                      "s"}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.createdAt
                      ? item.createdAt.toString().slice(0, 10)
                      : ""}
                  </td>
                  <td
                    className={`border-t border-gray-300 px-2 py-2 font-bold ${
                      item.approvalStatus === "Approved"
                        ? "text-custom-blue-2"
                        : item.approvalStatus === "Pending"
                        ? "text-custom-blue-3"
                        : "text-custom-red-2"
                    }`}
                  >
                    {item.approvalStatus}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    <AppButton
                      title="View"
                      textColor={gStyles.buttonBlue}
                      borderColor={gStyles.buttonBlue}
                      bgColor={gStyles.customBlue3}
                      borderRadius={"5px"}
                      width={"6em"}
                      height={"2em"}
                      data={item}
                      handleSelectingRow={() => handleSelectingRow(item)}
                    />
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    <AppButton
                      title="Pending"
                      textColor={gStyles.buttonBlue}
                      borderColor={gStyles.buttonBlue}
                      bgColor={gStyles.customBlue3}
                      borderRadius={"5px"}
                      width={"6em"}
                      height={"2em"}
                      data={item}
                      loading={loadingBtns.includes(item.regisId) ? "1" : ""}
                      handleSelectingRow={() =>
                        handleUpdateStatusOfRegistration(
                          item.regisId,
                          item,
                          "Pending"
                        )
                      }
                    />
                  </td>
                  {item.approvalStatus === "Pending" ? (
                    <>
                      <td className="border-t border-gray-300 px-2 py-2">
                        <AppButton
                          title="Accept"
                          textColor={"#53B271"}
                          borderColor={"#53B271"}
                          bgColor={"#EBFAFA"}
                          borderRadius={"5px"}
                          width={"6em"}
                          height={"2em"}
                          loading={
                            loadingBtns.includes(item.regisId) ? "1" : ""
                          }
                          handleSelectingRow={() =>
                            handleUpdateStatusOfRegistration(
                              item.regisId,
                              item,
                              "Approved"
                            )
                          }
                        />
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        <AppButton
                          title="Reject"
                          textColor={"#B93735"}
                          borderColor={"#B93735"}
                          bgColor={"#F8D8D8"}
                          borderRadius={"5px"}
                          width={"6em"}
                          height={"2em"}
                          loading={
                            loadingBtns.includes(item.regisId) ? "1" : ""
                          }
                          handleSelectingRow={() =>
                            handleUpdateStatusOfRegistration(
                              item.regisId,
                              item,
                              "Rejected"
                            )
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                  {item.approvalStatus === "Approved" ? (
                    <>
                      <td className="border-t border-gray-300 px-2 py-2">
                        <AppButton
                          title="Revoke"
                          textColor={"#B93735"}
                          borderColor={"#B93735"}
                          bgColor={"#F8D8D8"}
                          borderRadius={"5px"}
                          width={"6em"}
                          height={"2em"}
                          loading={
                            loadingBtns.includes(item.regisId) ? "1" : ""
                          }
                          handleSelectingRow={() =>
                            handleUpdateStatusOfRegistration(
                              item.regisId,
                              item,
                              "Revoked"
                            )
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                  {item.approvalStatus === "Rejected" ? (
                    <>
                      <td className="border-t border-gray-300 px-2 py-2">
                        <AppButton
                          title="Accept"
                          textColor={"#53B271"}
                          borderColor={"#53B271"}
                          bgColor={"#EBFAFA"}
                          borderRadius={"5px"}
                          width={"6em"}
                          height={"2em"}
                          loading={
                            loadingBtns.includes(item.regisId) ? "1" : ""
                          }
                          handleSelectingRow={() =>
                            handleUpdateStatusOfRegistration(
                              item.regisId,
                              item,
                              "Approved",
                              ""
                            )
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              )
          )}
        </tbody>
      </table>
      {selectedRow && <RegistrationManagerPopup data={selectedRow} onClose={handleClosePopup}/>}
      {/* <RegistrationManagerPopup data={selectedRow} onClose={handleClosePopup}/> */}
      </div>
    // </div>
  );
};

export default IMRegistration;