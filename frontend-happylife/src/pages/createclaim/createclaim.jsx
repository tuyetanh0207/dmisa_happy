import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select'
import axios from 'axios'
import RegistrationAPI from '../../../api/registrationApi.jsx';

export default function CreateClaim() { 
    const user = useSelector((state) => state.auth.login.currentUser);
    const regisID = "65a157175e0d7f1fdb6f512d";
    const [registrations, setRegistrations] = useState(null);
    const [claims, setClaims] = useState(null);
    const [content,setContent] =useState('');
    const [hospitalName,setHospitalName] =useState('');
    const categoriesOption = [
        {value:"Hỗ trợ y tế",label:"Hỗ trợ y tế"},
        {value:"Điều trị ngoại trú",label:"Điều trị ngoại trú"},
        {value:"Điều trị nha khoa",label:"Điều trị nha khoa"},
        {value:"Sinh mạng cá nhân",label:"Sinh mạng cá nhân"},
        {value:"Tai nạn cá nhân",label:"Tai nạn cá nhân"},

    ];
    //claim
    const [claimCategories,setClaimCategories] =useState([]);
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
    
    const handleClaimCategoriesChange = (selectCategories) => {
        // event.preventDefault()
        // try{
        //     const regisID = "65a157175e0d7f1fdb6f512d"; 
        //     const selectedRegistration = registrations.find(registration => registration.regisId === regisID);
        //     //const selectedClaimCategories = event.target.value;
        //     if(selectedRegistration){
        //         setClaimCategories(selectedRegistration.claimCategories)
        //     }
        // }catch(error){console.error('Error:', error);}
        // setClaimCategories(selectOption)


        const selectedValues = selectCategories.map(option => option.value);
        setClaimCategories(selectedValues);
        console.log('Select Categories:',selectCategories)
        console.log('choose :',claimCategories)
                    
        // const isSelect = claimCategories.includes(selectCategories)
        
        // if(isSelect)
        // {
        //     setClaimCategories((prev) => prev.filter((item) => item !== selectCategories));
            
        // }else{
        //     setClaimCategories((prev) => [...prev, selectCategories]);
        // }
        // console.log('active', isSelect);
        // console.log('choose', selectCategories);
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
            claimCategories: claimCategories,
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
                  <div className="pt-10 ">
                            {/* {claims?.map((item, index) => (
                                <div key={index} className=" text-center">
                                    <button value={item.claimCategories}  onClick={handleClaimCategoriesChange} className= {`border-gray-600 border-2 rounded-lg w-full h-full `}  >
                                        {item.claimCategories}
                                    </button>
                                </div>
                            ))} */}
                            <Select options={categoriesOption} onChange={handleClaimCategoriesChange} isMulti/>
                    </div>
                    {/* <div className="flex flex-row items-center ">
                        {categoriesOption?.map((item,index) => (
                            <div key={index}>
                                    <input type="checkbox" value={item.value} onChange={() => handleClaimCategoriesChange(item.value)} checked={claimCategories.includes(item.value)} className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    
                                        <div className="flex flex-col items-center ">
                                            <label  className="ms-2 font-medium text-gray-900 dark:text-gray-300">{item.value}</label>              
                                                                                
                                        </div>
                            </div>
                            
                        ))}
                                
                    </div> */}
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
                    <div className="flex items-center justify-between">
                            <div></div>
                            <button  className="px-32 py-6 text-2xl flex flex-row bg-indigo-50 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">
                                
                                <p className="pl-6">Payment</p>
                            </button>
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
