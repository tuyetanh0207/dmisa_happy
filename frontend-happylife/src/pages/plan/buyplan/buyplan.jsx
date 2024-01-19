import Insurance from '../../../assets/Insurance.jpg'
import Header from '../header.jsx'
import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import RegistrationAPI from '../../../../api/registrationApi.jsx';
import Shopingcar from '../../../assets/shopingcar.png'
// import SetupProxy from '../../../setupProxy.js'
export default function Buyplan() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [isLogin,setIsLogin]=useState(false);
    const [plans,setPlansAPI]=useState([]);

    const [planID, setplanID] = useState();//planID
    
    
    //const [registrations, setRegistrations] = useState(null);
    const [curentRegistrations, setCurentRegistrations] = useState('');
    
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
    const [planAbout,setPlanAbout] =useState('');
    const [planDuration,setPlanDuration] =useState('');
    const [planDurationUnit,setPlanDurationUnit] =useState('');

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
    //planType / optionbenefits
    const [optionalBenefitsName,setOptionalBenefitsName]=useState([]);
    const [optionalBenefitsDependencies,setOptionalBenefitsDependencies]=useState([]);
    const [optionalBenefitsInsuranceAmount,setOptionalBenefitsInsuranceAmount]=useState([]);
    const [optionalBenefitsUnit,setOptionalBenefitsUnit]=useState([]);

    const [optionalBenefitsFeeType,setOptionalBenefitsFeeType]=useState('');
    const [optionalBenefitsStartAge,setOptionalBenefitsStartAge]=useState();
    const [optionalBenefitsEndAge,setOptionalBenefitsEndAge]=useState();
    const [optionalBenefitsFee,setOptionalBenefitsFee]=useState();


    const [selectedPlanType, setSelectedPlanType] = useState(null);
    const [selectedBenefits, setSelectedBenefits] = useState();



   
    const [selectedOptionalBenefits, setSelectedOptionalBenefits] = useState([]);

    const selectedPlanObject = plans.find((plan) => plan.planId === planID);



    const [selectedOneOptionBenefits, setSelectedOneOptionBenefits] = useState([]);

    const handlePlanChange = (event) => {
        event.preventDefault()
        setplanID(event.target.value);

        const selectedPlan = plans.find((plan) => plan.planId === event.target.value);
        if (selectedPlan) {
            setPlanName(selectedPlan.planName);
            setPlanAbout(selectedPlan.planAbout);
            setPlanDuration(selectedPlan.planDuration);
            setPlanDurationUnit(selectedPlan.planDurationUnit);
            console.log("Selected plan ID:", event.target.value);
            
        }
    };
    const handlePlanTypeNameChange = (event) => {
        // setPlanTypeName(event.target.value);
        event.preventDefault()
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
        event.preventDefault()
        setSelectedFeeType(selectedFeeTypeObj);
        if (selectedFeeTypeObj) {
            setBenefitsFeeType(selectedFeeTypeObj.type );
            setBenefitsStartAge(selectedFeeTypeObj.startAge );
            setBenefitsEndAge(selectedFeeTypeObj.endAge );
            setBenefitsFee(selectedFeeTypeObj.fee );
            setOptionalBenefitsStartAge(selectedFeeTypeObj.startAge )
            setOptionalBenefitsEndAge(selectedFeeTypeObj.endAge );
        }
    };

    // //////////////////////////////////
    // const handleOptionalBenefitChange = (event) => {
    //     event.preventDefault();
    //     const selectedBenefitName = event.target.value;
    //     setOptionalBenefitsName(selectedBenefitName);
    
    //     const selectedOptionalBenefit = selectedPlanObject.optionalBenefits.find(
    //         (benefit) => benefit.benefitName === selectedBenefitName
    //     );
    
    //     if (selectedOptionalBenefit) {
    //         // setSelectedOptionBenefits(selectedOptionalBenefit);
    //         setOptionalBenefitsDependencies(selectedOptionalBenefit.dependencies);
    //         setOptionalBenefitsInsuranceAmount(selectedOptionalBenefit.insuranceAmount);
    //         setOptionalBenefitsUnit(selectedOptionalBenefit.unit);
    
    //         if (selectedOptionalBenefit.feeType.length > 0) {
    //             setOptionalBenefitsFeeType(selectedOptionalBenefit.feeType[0].type);
    //             setOptionalBenefitsStartAge(selectedOptionalBenefit.feeType[0].startAge);
    //             setOptionalBenefitsEndAge(selectedOptionalBenefit.feeType[0].endAge);
    //             setOptionalBenefitsFee(selectedOptionalBenefit.feeType[0].fee);
    //         }
    //         console.log('optional benefit:', selectedOptionalBenefit);
    //     }
    //     console.log('optional',selectedOptionalBenefit)
    // };

    const handleOptionalBenefitChange = (selectedBenefitName) => {
        const isSelected = selectedOptionalBenefits.includes(selectedBenefitName);
        const selectedOptionalBenefit = selectedPlanObject.optionalBenefits.find(
            (benefit) => benefit.benefitName === selectedBenefitName
        );
        if (isSelected) {
            // Remove the selected benefit if already selected
            console.log('Name unSelect:',selectedBenefitName)
            setSelectedOptionalBenefits((prev) => prev.filter((item) => item !== selectedBenefitName));
            setOptionalBenefitsName((prev) => prev.filter((item) => item !== selectedBenefitName));
            setSelectedOneOptionBenefits((prev) => 
                prev.filter((item) => item.benefitName !== selectedBenefitName)
                );
            setSelectedOneOptionBenefits((prev) => 
                prev.filter((item) => item.dependencies !== selectedOptionalBenefit.dependencies)
                );
            setSelectedOneOptionBenefits((prev) => 
                prev.filter((item) => item.insuranceAmount !== selectedOptionalBenefit.insuranceAmount)
                );
            setSelectedOneOptionBenefits((prev) => 
                prev.filter((item) => item.unit !== selectedOptionalBenefit.unit)
                );


            // setOptionalBenefitsDependencies((prev) => prev.filter((item) => item !== selectedOptionalBenefit.dependencies));

            // setOptionalBenefitsInsuranceAmount((prev) => prev.filter((item) => item !== selectedOptionalBenefit.insuranceAmount));

            // setOptionalBenefitsUnit((prev) => prev.filter((item) => item !== selectedOptionalBenefit.unit));
            console.log('Name:',optionalBenefitsName)
            console.log('Dependencies:',optionalBenefitsDependencies)
            console.log('InsuranceAmount:',optionalBenefitsInsuranceAmount)
            console.log('Unit:',optionalBenefitsUnit)
            //handleOptionalBenefitArray();
            console.log('?:',selectedOneOptionBenefits)
          } else {
            // Add the selected benefit if not selected
            console.log('Name Select:',selectedBenefitName)
            setSelectedOptionalBenefits((prev) => [...prev, selectedBenefitName]);

            setOptionalBenefitsName((prev) => [...prev, selectedBenefitName]);
            setSelectedOneOptionBenefits((prev)=>[
                ...prev,{
                    benefitName: selectedBenefitName,
                    dependencies: selectedOptionalBenefit.dependencies,
                    insuranceAmount:selectedOptionalBenefit.insuranceAmount,
                    unit:selectedOptionalBenefit.unit,
                    feeType: selectedOptionalBenefit.feeType
                        .filter((item) => item.startAge === benefitsStartAge)
                        .map((item) => ({
                        type: item.type,
                        startAge: item.startAge,
                        endAge: item.endAge,
                        fee: item.fee,
                        })),
                    
                }
            ]);
            
            if (selectedOptionalBenefit) {

            // setOptionalBenefitsDependencies((prev) => [...prev, selectedOptionalBenefit.dependencies]);
            // setOptionalBenefitsInsuranceAmount((prev) => [...prev, selectedOptionalBenefit.insuranceAmount]);
            // setOptionalBenefitsUnit((prev) => [...prev, selectedOptionalBenefit.unit]);

            // console.log('?:',selectedOptionalBenefit)
            // console.log('Name:',optionalBenefitsName)
            // console.log('Dependencies:',optionalBenefitsDependencies)
            // console.log('InsuranceAmount:',optionalBenefitsInsuranceAmount)
            // console.log('Unit:',optionalBenefitsUnit)

            console.log('?:',selectedOneOptionBenefits)
            // if (selectedOptionalBenefit.feeType.length > 0) {
            //     setOptionalBenefitsFeeType(selectedOptionalBenefit.feeType[0].type);

            //     setOptionalBenefitsFee(selectedOptionalBenefit.feeType[0].fee);
            // }
            // console.log('optional benefit:', selectedOptionalBenefit);
            //handleOptionalBenefitArray();
        }
          }
    }


    // const handleOptionalBenefitChange = (e,index) => {
    //     const activeOption =document.getElementById(index).checked
        
    //     console.log('active', activeOption);
    //     if(activeOption==true)
    //     {
    //         setSelectedOptionalBenefits(prev=>[...prev,e.target.value])
            
    //     }else{
    //         setSelectedOptionalBenefits(selectedOptionalBenefits.filter(value=>value!==e.target.value))
    //     }

    //   };

    
    // const [selectedOptionalFeeType, setSelectedOptionalFeeType] = useState(null);
    // const handleOptionalFeeTypeChange = (selectedOptionalFeeTypeObj) => {
    //     event.preventDefault();
    //     setSelectedOptionalFeeType(selectedOptionalFeeTypeObj);
    //     if (selectedOptionalFeeTypeObj) {
    //         setOptionalBenefitsFeeType(selectedOptionalFeeTypeObj.type);
    //         setOptionalBenefitsStartAge(selectedOptionalFeeTypeObj.startAge);
    //         setOptionalBenefitsEndAge(selectedOptionalFeeTypeObj.endAge);
    //         setOptionalBenefitsFee(selectedOptionalFeeTypeObj.fee);
    //     }
    //     console.log('feetype',selectedOptionalFeeTypeObj)
    // };
    
    //sent file 

    // const [selectedFiles, setSelectedFiles] = useState([]);
    

    // const handleFileChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     // setSelectedFiles(files);
    //     const filteredFiles = files.filter(file => {
    //         const fileType = file.type.toLowerCase();
    //         return fileType === 'application/pdf' || fileType.startsWith('image/');
    //       });
      
    //       setSelectedFiles(filteredFiles);
    // };



const [files, setFiles] = useState([]);
const [isImageFile, setIsImageFile] = useState(false);
let url1;



  const handleFileChange = (event) => {
    const inputFile = event.target.files;
    console.log('inputfile:',inputFile);
    console.log('inputfile:',inputFile[0].name);
    if (inputFile[0].name.includes('.pdf') == true){
        console.log('inputfile:',inputFile[0].name.includes('.pdf'));
        setIsImageFile(false);
    } else {
        setIsImageFile(true);
    }
    setFiles(inputFile);
    
  };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("//////////////////////////////////////////////////////////")
        const buyPlan = 
        {
            customerInfo: {
                id: user.userInfo.id,
                fullName: fullName,
                //citizenId: citizenId,
                citizenId: '0000000000000999',
                phoneNumber: phoneNumber,
                //gender: gender,
                gender: 'Male',
               // dob: dob,
                dob: '2002-07-09',
                email: email,
                address: address,
            },
            productInfo: {
                planId: planID,
                planName:planName,
                planAbout: planAbout,
                planDuration: 12,
                //planDurationUnit: planDurationUnit,
                planDurationUnit: 'Month',
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
                                // unit: benefitsUnit,
                                // insuranceAmount: benefitsInsuranceAmount
                            }
                        ]
                    }
                ],
                optionalBenefits: selectedOneOptionBenefits,
            }
            

        }
        console.log('optionName in submit:',optionalBenefitsName);
        console.log('Dependencies in submit:',optionalBenefitsDependencies)
        console.log('InsuranceAmount in submit:',optionalBenefitsInsuranceAmount)
        console.log('Unit in submit:',optionalBenefitsUnit)

        const url = 'http://localhost:8090/api/v1/registrations/create';
        axios.post(url, buyPlan, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
        })
        .then(response => {
            console.log('Success:', response.data);
            const newRegisId = response.data.regisId;
            setCurentRegistrations(newRegisId)
            //console.log('Current: ',curentRegistrations)
            console.log('123:', newRegisId);

                    const fileCounts = [{section:"Insurant:",fileCount:files.length}];

                    //const url=`http://localhost:8090/api/v1/registrations/update/${newRegisId}/image-docUrl`;
                    
                    console.log('true/false: ',isImageFile)
                    if(isImageFile==true){
                        url1 =`http://localhost:8090/api/v1/registrations/update/${newRegisId}/image-docUrl`;
                    }
                    else {
                        url1 =`http://localhost:8090/api/v1/registrations/update/${newRegisId}/files-docUrl`;
                    }
                    console.log('URL: ',url1)
                    const formData = new FormData();

                    formData.append('fileCounts', JSON.stringify(fileCounts))
                    for (let i = 0; i < files.length; i++) {

                      formData.append('files', files[i]);
                    }

                    //console.log('file url: ',fileURL)
                    axios.put(url1, formData, 
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',

                      }
                    })
                      .then(response => {
                        console.log('Success:', response.data);
                        console.log('file: ',files);
                        console.log('FormData: ',formData)
                        // Handle the response as needed
                      })
                      .catch(error => {
                        console.error('Error:', error);
                        console.log('file: ',files);
                        console.log('FormData: ',formData)
                        // Handle errors
                      });
                   
  
        })
        .catch(error => {
            console.error('Error:', error);
        });
        // console.log('Current: ',curentRegistrations)
                    
       
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
                            <Link to={`/plan/${planID}`} className="flex flex-row items-center bg-white border-2 border-gray-600  rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-y-auto">
                                <div className="basis-1/2">
                                    <img className="pl-4 pt-4 pb-4 object-cover w-full h-96 rounded-t-lg  " src={Insurance} alt="" />
                                </div>
                                <div className="basis-1/2">
                                    <div className=" pl-14 flex flex-col justify-evenly p-4 leading-normal overflow-y-10">
                                        <h5 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"  >{selectedPlanObject.planName}</h5>
                                        <p className="mb-3 text-2xl font-normal overflow-y-auto ">{selectedPlanObject.planAbout}</p>
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
                                <div className="grid grid-cols-4 gap-4">
                                    {selectedPlanObject.planType.map((item, index) => (
                                        <div key={index} className=" text-center">
                                        <button value={item.typeName}  onClick={handlePlanTypeNameChange} className= {`border-gray-600 border-2 rounded-lg w-full h-full ${handlePlanTypeNameChange === item ? 'bg-gray-200' : ''}`}  >
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
                                                {/* <div>{benefit.dependencies}</div> */}
                                            
                                                <div className="pt-10 grid grid-cols-4 gap-4">
                                                    {benefit.feeType.map((item3, index) => (
                                                        
                                                        <button key={index} className={`border-gray-600 border-2 rounded-lg w-full h-full ${selectedFeeType === item3 ? 'bg-gray-200' : ''}`} onClick={() => handleFeeType(item3)}>

                                                            <div>Từ {item3.startAge}-{item3.endAge} tuổi </div>
                                                            <div>{item3.fee} {benefit.unit}</div>
                                                        </button>
                                                    ))}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* ----------------------------- */}
                                
                                {selectedPlanObject && (
                                    <div>
                                        <label className="pt-10 block text-xl font-medium leading-6 text-gray-900">
                                            Choose Optional Benefit
                                        </label>
                                        <div className="grid grid-cols-4 gap-4">
                                            {selectedPlanObject.optionalBenefits.map((item, index) => (
                                                <div key={index} className="text-xl">
                                                    {/* <button value={item.benefitName} onClick={handleOptionalBenefitChange} className="border-gray-600 border-2 rounded-lg w-full h-full">
                                                        <div>{item.benefitName}</div>
                                                        <div>{item.dependencies}</div>
                                                    </button> */}

                                                <div className="">
                                                    <div className="flex flex-row items-center ">
                                                        <input type="checkbox" value={item.benefitName} onChange={() => handleOptionalBenefitChange(item.benefitName)} checked={selectedOptionalBenefits.includes(item.benefitName)} className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                        {/* <input id={index} type="checkbox" value={item.benefitName} onChange={(e)=>handleOptionalBenefitChange(e,index)} className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input> */}
                                                        <div className="flex flex-col items-center ">
                                                            <label  className="ms-2 font-medium text-gray-900 dark:text-gray-300">{item.benefitName}</label>
                                                            {/* {selectedOptionalBenefits.map((a,i)=><div key={i}>{a}</div>)} */}
                                                            <div>
                                                                {item.feeType.map((item2,index)=>(
                                                                    <div key={index} >
                                                                        {benefitsStartAge === item2.startAge && (
                                                                            <div>
                                                                                {item2.fee}
                                                                            </div>
                                                                            )}    
                                                                    </div>
                                                                ))}
                                                                    
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    {/* {optionalBenefitsName === item.benefitName && (
                                                        <div className="pt-5 grid grid-cols-4 grid-flow-col gap-4">
                                                            {item.feeType.map((item2, index) => (
                                                                <label key={index}>
                                                                    <input type="checkbox"  className={`border-gray-600 border-2 rounded-lg w-full h-full ${selectedOptionalFeeType === item2.type ? 'bg-gray-200' : ''}`} onClick={() => handleOptionalFeeTypeChange(item2)}>
                                                                        <div>{item2.type}</div>
                                                                        <div>{item2.startAge}-{item2.endAge}</div>
                                                                        <div>{item2.fee}</div>
                                                                    </input>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    )} */}
                                                    {/* <div>{item.insuranceAmount} {item.unit}</div> */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                        )}
                        <div >
                        <div>
      <input type="file" onChange={handleFileChange} multiple />
      {/* <input type="text" placeholder="File Counts" onChange={handleFileCountChange} /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
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


            {/* <div>
      <input
        type="file"
        multiple
        accept=".pdf, image/*"
        onChange={handleFileChange}
      />
      <div>
        <h3>Selected Files:</h3>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name} - {file.type}</li>
          ))}
        </ul>
      </div>
    </div> */}



                                               
          </form>
        <div>current: {curentRegistrations}</div>
              {/* {fileContent && (
        <div>
          <h2>File Content:</h2>
          
          <img src={fileContent} alt="File Preview" style={{ maxWidth: '100%' }} />
        </div>
      )} */}
          {/* <div>{fullName}</div>
          <div>{citizenId}</div>
          <div>{phoneNumber}</div>
          <div>{gender}</div>
          <div>{dob}</div>
          <div>{email}</div>
          <div>{address}</div>
          <div>{planID}</div>
          <div>{planName}</div>
          <div>{planAbout}</div>
          <div>{planDuration}-{planDurationUnit}</div>
          <div>{planTypeName}</div>
          <div>{benefitsBenefitsName}</div>
          <div>{benefitsDependencies}</div>
          <div>{benefitsInsuranceAmount} {benefitsUnit}</div>
          <div>{benefitsFeeType}</div>
          <div>{benefitsStartAge} {benefitsEndAge}</div>
          <div>{benefitsFee}</div>
          <h1>TEMP</h1>
          <div>{optionalBenefitsName}</div>
          <div>{optionalBenefitsDependencies}</div>
          <div>{optionalBenefitsInsuranceAmount} {optionalBenefitsUnit}</div>
          <div>{optionalBenefitsFeeType}</div>
          <div>{optionalBenefitsStartAge}-{optionalBenefitsEndAge}</div>
          <div>{optionalBenefitsFee}</div>
          <div>temp2</div>
          
          <div>
  {selectedOneOptionBenefits.map((item, index) => (
    <div key={index}>
      <p>Benefit Name: {item.benefitName}</p>
        <p>dependencies:{item.dependencies}</p>
        <p>InsuranceAmount:{item.insuranceAmount} {item.unit}</p>
    </div>
  ))}
</div>      */}
        </div>
      </div>
    );
  }
   