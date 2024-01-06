import Insurance from '../../../assets/Insurance.jpg'
import Header from '../header.jsx'
import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import RegistrationAPI from '../../../../api/registrationApi.jsx';
import Shopingcar from '../../../assets/shopingcar.png'
export default function Buyplan() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [isLogin,setIsLogin]=useState(false);
    const [plans,setPlansAPI]=useState([]);
    //const [selectPlan, setSelectPlan] = useState(null);


    
    const [planID, setplanID] = useState();//planID
    //const [planTypeArr,setPlanTypeARR]=useState([]);//planTypeName
    
    //const [registrations, setRegistrations] = useState(null);
    // const [filterStatus, setFilterStatus]= useState('All');
    //user
    const [fullName,setFullName] =useState('');
    const [citizenId,setCitizenId] =useState('');
    const [phoneNumber,setPhoneNumber] =useState('');
    const [gender,setGender] =useState('');
    const [dob,setDob] =useState('');
    const [email,setEmail] =useState('');
    const [address,setAddress] =useState('');
    // const [healthStatus,setHealthStatus] =useState('');
    //const [address,setAddress] =useState('');
    //plan
    const [planName,setPlanName] =useState('');
    //planType
    const [planTypeName,setPlanTypeName]=useState('');
    const [benefitsBenefitsName,setBenefitsBenefitsName]=useState('');
    const [benefitsDependencies,setBenefitsDependencies]=useState('');
    const [benefitsInsuranceAmount,setBenefitsInsuranceAmounts]=useState();
    const [benefitsUnit,setBenefitsUnit]=useState('');
    //planType/FeeType
    const [benefitsFeeType,setBenefitsFeeType]=useState('');
    const [benefitsStartAge,setBenefitsStartAge]=useState();
    const [benefitsEndAge,setBenefitsEndAge]=useState();
    const [benefitsFee,setBenefitsFee]=useState();

    
    const [selectedPlanType, setSelectedPlanType] = useState(null);
    const [selectedBenefits, setSelectedBenefits] = useState();



    const selectedPlanObject = plans.find((plan) => plan.planId === planID);
   

    const handlePlanChange = (event) => {
        setplanID(event.target.value);
        const selectedPlan = plans.find((plan) => plan.planId === event.target.value);
        if (selectedPlan) {
            setPlanName(selectedPlan.planName);
            console.log("Selected plan ID:", event.target.value);
        }
    };
    const handlePlanTypeNameChange = (event) => {
        // setPlanTypeName(event.target.value);
        const selectedType = event.target.value;
        setPlanTypeName(selectedType);
    
        const selectedTypeObject = selectedPlanObject.planType.find((type) => type.typeName === selectedType);
        // console.log('Temp test:',selectedTypeObject)
        if (selectedTypeObject) {
            setSelectedPlanType(selectedTypeObject);
            setSelectedBenefits(selectedTypeObject.benefits);
            if (selectedTypeObject.benefits.length > 0) {
                setBenefitsBenefitsName(selectedTypeObject.benefits[0].benefitName);
                setBenefitsDependencies(selectedTypeObject.benefits[0].dependencies);
                setBenefitsInsuranceAmounts(selectedTypeObject.benefits[0].insuranceAmount);
                setBenefitsUnit(selectedTypeObject.benefits[0].unit);
            }
            console.log('benefit:',selectedTypeObject.benefits);
        }
    };
    const [selectedFeeType, setSelectedFeeType] = useState(null);
    const handleFeeType = (selectedFeeTypeObj) => {
        setSelectedFeeType(selectedFeeTypeObj);
        if (selectedFeeTypeObj) {
            setBenefitsFeeType(selectedFeeTypeObj.type );
            setBenefitsStartAge(selectedFeeTypeObj.startAge );
            setBenefitsEndAge(selectedFeeTypeObj.endAge );
            setBenefitsFee(selectedFeeTypeObj.fee );
        }
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("//////////////////////////////////////////////////////////")
        const buyPlan = 
        {
            customerInfo: {
                id: user.userInfo.id,
                fullName: fullName,
                citizenId: citizenId,
                phoneNumber: phoneNumber,
                gender: gender,
                dob: dob,
                email: email,
                address: address,
            },
            productInfo: {
                planId: planID,
                planName:planName,
                planDuration: 12,
                planDurationUnit: "Month",
                planType: [
                    {
                        typeName: planTypeName,
                        benefits: [
                            {
                                benefitName: benefitsBenefitsName,
                                dependencies: benefitsDependencies,
                                feeType: [
                                    {
                                        type: benefitsFeeType,
                                        startAge: benefitsStartAge,
                                        endAge: benefitsEndAge,
                                        fee: benefitsFee
                                    }
                                ],
                                unit: benefitsUnit,
                                insuranceAmount: benefitsInsuranceAmount
                            }
                        ]
                    }
                ],
            }

        }
        // const buyPlan = 
        // {"customerInfo":{"id":"6565591616433655e5ad110f","fullName":"default321  "},"productInfo":{"planId":"658f2a657bd7a6390b228f24","planDuration":12,"planDurationUnit":"Month"}}
        
        // console.log('buyplan:',buyPlan)
        // try{
        //     const res = await RegistrationAPI.createRegistration(buyPlan,user.token) ;
        //     console.log("Res", res);
        // } catch(err){
        //     console.log("err: ", err);
        // }

        const url = 'http://localhost:8090/api/v1/registrations/create';
        axios.post(url, buyPlan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
        })
        .then(response => {
            console.log('Success:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }
    
    const fetchPlan = async () => {
        fetch("http://localhost:8090/api/v1/plans")
        .then((res)=>res.json())
        .then((data)=>{
            // console.log("data:", data)
            setPlansAPI(data);
            if (data.length > 0) {
                setplanID(data[0].planId);
                }
            });
    }
    // const fetchSelectPlanAPI = async () => {
    //     // try {
    //     //     // const response = await axios.get(`http://localhost:8090/api/v1/plans/${planID}`);
    //     //     // console.log('planID in fetching plan detail:',planID)
    //     //     const response = await axios.get("http://localhost:8090/api/v1/plans/65991199ba435b64fa42bff1");
    //     //     console.log(response.data);
    //     //     setSelectPlan(response.data);
    //     //   } catch (error) {
    //     //     console.error('Error fetching plan detail:', error);
    //     //     console.log('planID in fetching plan detail:',planID);
    //     //   }
    //     setSelectPlan(plans[0].planId);
    // };

    const fetchUserInfo = async()=>{
        setIsLogin(true)

        setFullName(user.userInfo.fullName);
        setCitizenId(user.userInfo.citizenId);
        setPhoneNumber(user.userInfo.phoneNumber);
        setGender(user.userInfo.gender);
        setDob(user.userInfo.dob.slice(0,10));
        setEmail(user.userInfo.email);
        setAddress(user.userInfo.address);
    }
    // const fetchRegistrations = async () => {
    //     try{
    //       //console.log('token', user.token)
    //       const res = await RegistrationAPI.getAllRegistration(user.token);
    //       let data= res.data
          
    //       const sortedArray = data.sort((a, b) => {
    //         // Assuming createdAt is a string in ISO 8601 format, you can directly compare them
    //         return new Date(b.createdAt) - new Date(a.createdAt);
    //       });
    //       setRegistrations(sortedArray)


          
    //       //console.log('res data', res.data);
    //     } catch(err){
    //       console.log('error in fetchRegistrations', err);
    //     }
        
    //   }

    // useEffect(() => {
    //     fetchPlan();
    //     fetchUserInfo();
    //     fetchSelectPlanAPI();
    //     //fetchRegistrations(); 
    // },[])

    useEffect(() => {
        fetchUserInfo();
        fetchPlan(); // Fetch plans
         // Fetch user info
            
        //fetchSelectPlanAPI(); // Fetch the selected plan details based on the current planID
       
    }, []); 
    
    
    
    console.log("PLANS:",plans);
     //console.log("planID:",planID);
    // console.log("registrations:",registrations);
    console.log("User:",user);
    // console.log("UserLogin:",user.userInfo.fullName);
    // console.log("UserID:",user.userInfo.id);
    //console.log("Select plan:",selectPlan);
    //console.log("Select plan.type:",selectPlan.planId);

        

    return (
      <div className=" bg-custom-blue-3 ">
        <Header/>
        <div className="mt-14   pt-6 pb-14 container mx-auto bg-white">
          <form onSubmit={handleSubmit} className="pt-6 pb-4  container mx-auto pl-24 pr-24 max-w-6xl  ">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">   
                        <label className="block text-xl font-medium leading-6 text-gray-900">
                          Full Name
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={isLogin ? user.userInfo.fullName : ''}
                            className="block w-full h-10 px-4 border-0 py-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder='Your Name'
                            onChange={(e)=>setFullName(e.target.value)}
                        />
                        </div>
                  </div>
  
                  <div className="sm:col-span-3">
                      <label className="block text-xl font-medium leading-6 text-gray-900">
                          Citizen ID
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="Citizen-ID"
                          id="Citizen-ID"
                          value={isLogin ? user.userInfo.citizenId: ''}
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Citizen ID'
                          onChange={(e)=>setCitizenId(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="sm:col-span-3">
                      <label className="block text-xl font-medium leading-6 text-gray-900">
                          Phone Number
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="Phone"
                          id="Phone "
                          value={isLogin ? user.userInfo.phoneNumber: ''}
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Phone Number'
                          onChange={(e)=>setPhoneNumber(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="sm:col-span-1">
                      <label className="block text-xl font-medium leading-6 text-gray-900">
                          Gender
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="Gender"
                          id="Gender"
                          value={isLogin ? user.userInfo.gender: ''}
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Gender'
                          onChange={(e)=>setGender(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="sm:col-span-2">
                      <label className="block text-xl font-medium leading-6 text-gray-900">
                          Date of birth
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="BirthDate"
                          id="BirthDate"
                          value={isLogin ? user.userInfo.dob.slice(0,10): ''}
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your BirthDate'
                          onChange={(e)=>setDob(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="sm:col-start-1 col-end-7">
                      <label className="block text-xl font-medium leading-6 text-gray-900">
                          Email
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="email"
                          id="email"
                          value={isLogin ? user.userInfo.email: ''}
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Email'
                          onChange={(e)=>setEmail(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="sm:col-start-1 col-end-7">
                      <label className="block text-xl font-medium leading-6 text-gray-900">
                          Address
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="address"
                          id="address"
                          value={isLogin ? user.userInfo.address: ''}
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Address'
                          onChange={(e)=>setAddress(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="sm:col-start-1 col-end-7">
                      <label className="block text-xl font-medium leading-6 text-gray-900">
                          Health Status
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="address"
                          id="address"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your ealth Status'
                          />
                      </div>
                  </div>
                    <form className="sm:col-start-1 col-end-7">
                        <label className=" pb-5 block text-xl font-medium leading-6 text-gray-900">Choose your Plan</label>
                        <select value={planID} onChange={handlePlanChange} className="sm:col-start-1 col-end-7 block w-full border-0 py-3 text-custom-blue-3 shadow-sm ring-1 ring-inset ring-custom-blue- placeholder:text-custom-blue-3 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm">
                            {plans.map((plan, index) => (
                            <option key={index} value={plan.planId}>
                                
                                {plan.planName}
                            </option>
                            ))}
                        </select>

                    {planID && ( 
                    <div className="pt-12 " >
                    
                            {selectedPlanObject && (
                            <Link to={`/plan/${planID}`} className="flex flex-row items-center bg-white border-2 border-gray-600  rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="basis-1/2">
                                    <img className="pl-4 pt-4 pb-4 object-cover w-full h-96 rounded-t-lg  " src={Insurance} alt="" />
                                </div>
                                <div className="basis-1/2">
                                    <div className=" pl-14 flex flex-col justify-evenly p-4 leading-normal">
                                        <h5 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"  >{selectedPlanObject.planName}</h5>
                                        <p className="mb-3 text-2xl font-normal ">{selectedPlanObject.planAbout}</p>
                                        <p className="mb-3 text-2xl font-normal" >{selectedPlanObject.planType.typeName}</p>
                                        <p className="mb-3 text-2xl font-normal text-custom-blue-3 ">Benefit</p>
                                        {selectedPlanObject.planBenefits.map((benefit, index) => (
                                            <ul key={index} className="pl-7 text-xl list-image-store">
                                            <li className="text-xl font-normal  ">{benefit}</li>
                                            </ul>
                                        ))}
                                        
                                    </div>
                                </div>   
                            </Link>
                            
                            )} 
                            
                            {selectedPlanObject && (
                            <div>
                                <label className="block text-xl font-medium leading-6 text-gray-900">
                                    Choose Plan Type
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {selectedPlanObject.planType.map((item, index) => (
                                        <div key={index} className="border-gray-600 border-2 rounded-lg text-center">
                                        <button value={item.typeName} onClick={handlePlanTypeNameChange} className="w-full h-full">
                                            {item.typeName}
                                        </button>
                                        </div>
                                    ))}
                                </div>


                                {selectedPlanType && (
                                    <div>
                                        <p className="mb-3 text-2xl font-normal">Selected Benefits:</p>
                                        {selectedBenefits.map((benefit, index) => (
                                            <div key={index} className="text-xl font-normal">
                                                <div>{benefit.benefitName}</div>
                                                <div>{benefit.dependencies}</div>
                                                {/* <div className="pt-10  grid grid-cols-4 grid-flow-col gap-4">
                                                    {benefit.feeType.map((item3, index) => (
                                                            <div className="border-gray-600 border-2 rounded-lg">
                                                                <div>{item3.type}</div>
                                                                <div>{item3.startAge}-{item3.endAge}</div>
                                                                <div>{item3.fee}</div>
                                                                
                                                            </div>
                                                        ))}
                                                </div> */}
                                                <div className="pt-10 grid grid-cols-4 grid-flow-col gap-4">
                                                    {benefit.feeType.map((item3, index) => (
                                                        // <button key={index} onClick={handleFeeType} className="border-gray-600 border-2 rounded-lg w-full h-full"  >
                                                        <button key={index} className={`border-gray-600 border-2 rounded-lg w-full h-full ${selectedFeeType === item3 ? 'bg-gray-200' : ''}`}onClick={() => handleFeeType(item3)}>
                                                            <div>{item3.type}</div>
                                                            <div>{item3.startAge}-{item3.endAge}</div>
                                                            <div>{item3.fee}</div>
                                                        </button>
                                                    ))}
                                                    </div>
                                                <div>{benefit.insuranceAmount} {benefit.unit}</div>         
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div >
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div></div>
                            <div className="pt-10 pb-10 px-0 py-4  text-2xl  font-bold font-['IBM Plex Sans'] text-custom-blue-3">Totals: {selectedPlanObject.planPrice} VND</div>   
                        </div>
                            
                        </div>
                        )} 


                        <div className="flex items-center justify-between">
                            <div></div>
                            <button onClick={handleSubmit} className="px-32 py-6 text-2xl flex flex-row bg-indigo-50 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">
                                <img src={Shopingcar} alt="LOGO" className="item-center" ></img>
                                <p className="pl-6">Payment</p>
                            </button>
                        </div>
                    </form>
                    
            </div>
            
            


                                            
          </form>
          <div>{fullName}</div>
          <div>{citizenId}</div>
          <div>{phoneNumber}</div>
          <div>{gender}</div>
          <div>{dob}</div>
          <div>{email}</div>
          <div>{address}</div>
          <div>{planID}</div>
          <div>{planName}</div>
          <div>{planTypeName}</div>
          <div>{benefitsBenefitsName}</div>
          <div>{benefitsDependencies}</div>
          <div>{benefitsInsuranceAmount} {benefitsUnit}</div>
          <div>{benefitsFeeType}</div>
          <div>{benefitsStartAge} {benefitsEndAge}</div>
          <div>{benefitsFee}</div>
          
                                                        


          {/* test get registion */}
          {/* {registrations?.map((item, index) => (
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
            ))} */}

            
        </div>
        
      </div>

    );
  }
