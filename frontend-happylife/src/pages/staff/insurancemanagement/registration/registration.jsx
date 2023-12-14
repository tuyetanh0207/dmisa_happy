// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RegistrationAPI from '../../../../../api/registrationApi';
import UserAPI from '../../../../../api/userApi';
import AppButton from '../../../../components/staff/button';
import gStyles from '../../../../style'
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
  const colTitle = ['No.', 'Cus. Name', 'Cus. Phone', 'Birthday','Address', 'Plan', 'Plan Coverage', 'Plan Duration', 'Date', 'Status']

  return (
    <div className='bg-white w-[96%] mt-12 mb-12 ml-6 mr-2 rounded-xl pt-4'>
      <h1 className='text-[1.5em] font-semibold ml-8 mt-2 mb-4 text-slight-black'>Registrations</h1>
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
          {registrations.map((item, index) => (
            <tr key={index}>
              <td className="border-t border-gray-300 pl-8 pr-2 py-2">{index + 1}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.customerInfo.fullName}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.customerInfo.phoneNumber}</td>
              {/* <td className="border border-gray-300 px-2 py-2">{item.customerInfo.citizenID}</td> */}
              <td className="border-t border-gray-300 px-2 py-2">{item.customerInfo.DOB}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.customerInfo.address}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.productInfo.planName}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.productInfo.planServiceCoverage}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.productInfo.planDuration}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.createdAt.toString().slice(0, 10)}</td>
              <td className="border-t border-gray-300 px-2 py-2">{item.approvalStatus}</td>
              <td className="border-t border-gray-300 px-2 py-2">
                <AppButton 
                title="View" 
                textColor={gStyles.buttonBlue}  
                borderColor={gStyles.buttonBlue} 
                bgColor={gStyles.customBlue3}
                borderRadius={"5px"} 
                width={"6em"}
                height={"2em"}
                />
              </td>
              {item.approvalStatus==="Pending"?
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
                />
              </td>
              </>:<></>}
              
              
              {/* <td className="border border-gray-300 px-4 py-2">{item.column8}</td>
              <td className="border border-gray-300 px-4 py-2">{item.column9}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    // </div>
  );
};

export default IMRegistration;