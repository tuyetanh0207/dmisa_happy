import Registrationteaser from '../../components/registrationteaser'
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import RegistrationAPI from '../../../api/registrationApi'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import PaymentBank from '../payment/paymentBank.jsx'
import PaymentConfirm from '../payment/paymentConfirm.jsx'
import Contract from '../contract/contract.jsx'
const registration = () => {
  const user1 = useSelector((state) =>state.auth.login.currentUser);
  const [realtimeRegis, setRealtimeRegis] = useState([]);
  const fetchRegis = async () => {
    try{
      const res = await RegistrationAPI.getUserRegistration(user1?.token, user1?.userInfo.id);
      setRealtimeRegis(res.data);
      console.log('res', res.data);

    }
    catch (error){
      console.log("error in fetchUser", error);
    }
  }
  useEffect(() => {
    fetchRegis();
  },[])
  /*
  planURL
  planName
  planAbout
  planSlogan
  createdAt
  approvalStatus
  */ 
  //console.log('realtimeRegis', realtimeRegis);
  //console.log('MESSAGE:', realtimeRegis[8].message[1]);
  //console.log('TEST: ', realtimeRegis.approvalStatus)
  return (
    <div className='screen flex items-center flex-col bg-bgr-white my-auto '>
      {realtimeRegis.slice().reverse().map((regis, index) => (
             <div key={index} className='mt-[30px] mb-[50px]'>
             <Registrationteaser realtimeRegis = {regis} index={index}/>
           </div>
      )
      )}
 
   </div>
  )
}

export default registration