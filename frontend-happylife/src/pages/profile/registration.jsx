import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'

// import Productteaser from '../../components/productteaser.jsx'
import Registrationteaser from '../../components/registrationteaser'
import RegistrationAPI from '../../../api/registrationApi.jsx';

const registration = () => {

  const user = useSelector((state) => state.auth.login.currentUser);
  const [registrations, setRegistrations] = useState(null);
    const fetchRegistrations = async () => {
        try{
          //console.log('token', user.token)
          const res = await RegistrationAPI.getAllRegistration(user.token);
          let data= res.data
          
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

      useEffect(() => {
        fetchRegistrations();
    }, []); 

  return (
    <div >
      <div className="mt-14   pt-6 pb-14 container mx-auto ">
      {registrations?.map((item, index) => (
        <div key={index} className='container screen flex flex items-center flex-col   bg-red-500 my-auto'>
          <div className='mt-[30px] mb-[50px]'>
            <Registrationteaser 
              paymentStatus={item.approvalStatus} 
              planName={item.productInfo.planName} 
              planAbout={item.productInfo.planAbout} 
              regisDate={item.startDate.slice(0,10)}
              />
          </div>
          <div>{item.productInfo.planName}</div>

        </div>
        ))}
      </div>
      
      {registrations?.map((item, index) => (
            <div key={index}>
                <div className="border-t border-gray-300 pl-8 pr-2 py-2">{index + 1}</div>
                <div >{item.customerInfo.fullName}</div>
                <div >{item.customerInfo.phoneNumber}</div>
                
                <div >{item.customerInfo.dob}</div>
                <div >{item.customerInfo.address}</div>
                <div >{item.productInfo.planName}</div>
                <div >{item.productInfo.planServiceCoverage}</div>
                <div >{item.productInfo.planDuration + " " + item.productInfo.planDurationUnit + "s"}</div>
                <div>{item.startDate.slice(0,10)}</div>
                
            </div>
            ))} 
    </div>       
  )
}

export default registration