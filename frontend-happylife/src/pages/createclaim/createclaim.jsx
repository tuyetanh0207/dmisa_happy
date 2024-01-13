import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import RegistrationAPI from '../../../api/registrationApi.jsx';

export default function CreateClaim() { 
    const user = useSelector((state) => state.auth.login.currentUser);
    const regisID = "65a157175e0d7f1fdb6f512d";
    const [registrations, setRegistrations] = useState(null);
    const [claims, setClaims] = useState(null);
    const [content,setContent] =useState('');
    const [hospitalName,setHospitalName] =useState('');
    //claim
    const [claimCategories,setClaimCategories] =useState(null);
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
    const fetchClaims =async () => {
        const url = 'http://localhost:8090/api/v1/claims';
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                console.log('Claim', response.data);
                setClaims(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
    }
    
    const handleClaimCategoriesChange = (event) => {
        event.preventDefault()
        try{
            const regisID = "65a157175e0d7f1fdb6f512d"; 
            const selectedRegistration = registrations.find(registration => registration.regisId === regisID);
            //const selectedClaimCategories = event.target.value;
            if(selectedRegistration){
                setClaimCategories(selectedRegistration.claimCategories)
            }
        }catch(error){console.error('Error:', error);}

    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("//////////////////////////////////////////////////////////")
        try {
          const regisID = "65a157175e0d7f1fdb6f512d"; 
          const selectedRegistration = registrations.find(registration => registration.regisId === regisID);
      
          if (!selectedRegistration) {
            console.error("Selected registration not found");
            return;
          }
      
          const Regis = {
            regisInfo: selectedRegistration,
            claimCategories: [
                claimCategories
            ],
            content: content,
            documentUrls: [
                {
                    "docCategory": "Category1",
                    "urls": [
                        "http://url1.com",
                        "http://url2.com"
                    ]
                }
            ],
            hospitalName: hospitalName,
          };
      
          const url = 'http://localhost:8090/api/v1/claims/create';
          const response = await axios.post(url, Regis, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          });
      
          console.log('Success:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
        };

        useEffect(() => {
            fetchRegistrations();
            fetchClaims();
           
        }, []); 
    return(
        <div className=" bg-custom-blue-3 ">
        
        <div className="mt-14   pt-6 pb-14 container mx-auto bg-white">
          <form onSubmit={handleSubmit} className="pt-6 pb-4  container mx-auto pl-24 pr-24 max-w-6xl  ">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
                  <div className="sm:col-span-full">   
                        <label className="block text-xl font-medium leading-6 text-gray-900">
                          Reason
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full h-10 px-4 border-0 py-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xl focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder='Your reason'
                            onChange={(e)=>setContent(e.target.value)}
                        />
                        </div>
                  </div>
                  <div className="pt-10 grid grid-cols-4 gap-4">
                            {claims?.map((item, index) => (
                                <div key={index} className=" text-center">
                                    <button value={item.claimCategories}  onClick={handleClaimCategoriesChange} className= {`border-gray-600 border-2 rounded-lg w-full h-full `}  >
                                        {item.claimCategories}
                                    </button>
                                </div>
                            ))}
                    </div>
                    <div className="sm:col-span-full">   
                        <label className="block text-xl font-medium leading-6 text-gray-900">
                            Hospital Name
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full h-10 px-4 border-0 py-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xl focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder='Your reason'
                            onChange={(e)=>setHospitalName(e.target.value)}
                        />
                        </div>
                  </div>
             </div>
             
                 
          </form>

                                                
          {/* test get registion */}
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
                
            </div>
            ))}

            
        </div>
        
      </div>

    );
    
}
