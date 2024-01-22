// import Productteaser from '../../components/productteaser.jsx'
import Productteasure from '../../components/productteaser'
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import RegistrationAPI from '../../../api/registrationApi'

const claims = () => {
  // Get data of user
  const user1 = useSelector((state) =>state.auth.login.currentUser);
  
  // Get regis of user
  const [realtimeRegis, setRealtimeRegis] = useState([]);
  const fetchRegis = async () => {
    try{
      const res = await RegistrationAPI.getUserRegistration(user1?.token, user1?.userInfo.id);
      setRealtimeRegis(res.data);
      console.log('res realtimeRegis in Claim:', res.data);

    }
    catch (error){
      console.log("error in regis in claim", error);
    }
  }
  useEffect(() => {
    fetchRegis();
  },[])

  return (
    <div className='h-auto flex items-center flex-col bg-bgr-white my-auto'>
      {realtimeRegis.map((regis, index) => (
            regis.approvalStatus === "Paid" ? (
              <div key={index} className='mt-[30px] mb-[50px]'>
                <Productteasure realtimeRegis = {regis} index={index}/>
              </div>
              ) : (
                <> </>
              )
      )
      )}
 
   </div>
  )
}
// <div className='max-h-full flex items-center flex-col  h-auto bg-bgr-white my-auto'>
    //   <div className='mt-[30px] mb-[50px]'>
    //     <Productteasure/>
    //   </div>
    //   <div className='mb-[50px]'>
    //     <Productteasure/>
    //   </div>
    //   <div className='mb-[50px]'>
    //     <Productteasure/>
    //   </div>  
    // </div>
  


export default claims