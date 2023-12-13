// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RegistrationAPI from '../../../../../api/registrationApi';
import UserAPI from '../../../../../api/userApi';

const IMRegistration = () => {
  console.log('kk')
  const user = useSelector((state) => state.auth.login.currentUser)
  const [registrations, setRegistrations] = useState([]);
  const fetchRegistrations = async () => {
    try{
      console.log('token', user.token)
      const res = await RegistrationAPI.getAllRegistration(user.token);
      setRegistrations(res.data)
      console.log('res data', res.data);
    } catch(err){
      console.log('error in fetchRegistrations', err);
    }
    
  }

 
  useEffect(()=>{
    console.log('use Effect')
    fetchRegistrations(); 
  },[])
  const colTitle = ['No.', 'Cus. Name', 'Cus. Phone', 'CID', 'Birthday','Address', 'Plan', 'Plan Coverage', 'Plan Duration', 'Date', 'Status']

  return (
    <div className='bg-custom-blue-2 w-full h-full'>

     <table className="w-[96%] bg-white border border-gray-300 mt-12 mb-12 ml-6 mr-20 rounded-xl">
        <thead>
          <tr>
            {colTitle.map((e)=>(
              <th className="border border-gray-300 px-2 py-2" key ={e}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registrations.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-2 py-2">{item.customerInfo.fullName}</td>
              <td className="border border-gray-300 px-2 py-2">{item.customerInfo.phoneNumber}</td>
              <td className="border border-gray-300 px-2 py-2">{item.customerInfo.citizenID}</td>
              <td className="border border-gray-300 px-2 py-2">{item.customerInfo.DOB}</td>
              <td className="border border-gray-300 px-2 py-2">{item.customerInfo.address}</td>
              <td className="border border-gray-300 px-2 py-2">{item.productInfo.planName}</td>
              <td className="border border-gray-300 px-2 py-2">{item.productInfo.planServiceCoverage}</td>
              <td className="border border-gray-300 px-2 py-2">{item.productInfo.planDuration}</td>
              <td className="border border-gray-300 px-2 py-2">{item.createdAt.toString().slice(0, 10)}</td>
              <td className="border border-gray-300 px-2 py-2">{item.approvalStatus}</td>
              <td className="border border-gray-300 px-2 py-2">Accept</td>
              <td className="border border-gray-300 px-2 py-2">Reject</td>
              {/* <td className="border border-gray-300 px-4 py-2">{item.column8}</td>
              <td className="border border-gray-300 px-4 py-2">{item.column9}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default IMRegistration;