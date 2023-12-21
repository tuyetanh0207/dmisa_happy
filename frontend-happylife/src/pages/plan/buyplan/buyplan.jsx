import Insurance from '../../../assets/Insurance.jpg'
import Header from '../header.jsx'
import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
export default function Buyplan() {
    const [plans,setPlansAPI]=useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const selectedPlanObject = plans.find((plan) => plan.planId === selectedPlan);
    const handlePlanChange = (event) => {
      setSelectedPlan(event.target.value);
    };
        const fetchPlan = () => {
            fetch("http://localhost:8090/api/v1/plans")
            .then((res)=>res.json())
            .then((data)=>{
                console.log("data:", data)
                setPlansAPI(data);
            });
        }
        useEffect(() => {
            fetchPlan();
        
        },[])
        console.log("PLANS:",plans);
    return (
      <div className=" bg-custom-blue-3 ">
        {/* <div className=" bg-red-900"> */}
        <Header/>
        <div className="mt-14  pt-6 pb-14 container mx-auto bg-white">
          <form className="pt-6 pb-4 container mx-auto pl-24 pr-24 max-w-6xl  ">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Full Name
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Name'
                          />
                      </div>
                  </div>
  
                  <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Citizen ID
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="Citizen-ID"
                          id="Citizen-ID"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Citizen ID'
                          />
                      </div>
                  </div>
                  <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Phone Number
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="Phone"
                          id="Phone "
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Phone Number'
                          />
                      </div>
                  </div>
                  <div className="sm:col-span-1">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Gender
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="Gender"
                          id="Gender"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Gender'
                          />
                      </div>
                  </div>
                  <div className="sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Date of birth
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="BirthDate"
                          id="BirthDate"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your BirthDate'
                          />
                      </div>
                  </div>
                  <div className="sm:col-start-1 col-end-7">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Email
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="email"
                          id="email"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Email'
                          />
                      </div>
                  </div>
                  <div className="sm:col-start-1 col-end-7">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Address
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="address"
                          id="address"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder='Your Address'
                          />
                      </div>
                  </div>
                  <div className="sm:col-start-1 col-end-7">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
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
                  {/* select plan */}
                    {/* <form className="sm:col-start-1 col-end-7">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Choose your Plan</label>
                    <select className="sm:col-start-1 col-end-7 block w-full border-0 py-3 text-custom-blue-3 shadow-sm ring-1 ring-inset ring-custom-blue- placeholder:text-custom-blue-3 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm">
                        {plans.map((plan, index) => (
                            <option key={index}>{plan.planName}</option>
                        ))}
                    </select>
                    {plans.map((plan, index) => (
                        <div className="pt-12" key={index}>
                            <Link to={`/plan/${plan.planId}`} className=" flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className=" pl-4 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={Insurance} alt="" />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.planName}</h5>
                                    <p className="mb-3 font-normal ">{plan.planAbout}</p>
                                    <p className="mb-3 font-normal text-custom-blue-3 ">Benefit</p>
                                    {plan.planBenefits.map((benefit, index) => (
                                    <ul key={index} className="pl-7 text-xl list-image-store">
                                    <li className="font-normal text-base ">{benefit}</li>
                                </ul>
                                ))}
                                </div>
                            </Link>
                        </div>
                    ))}
                    </form> */}
                    {/* ------------------------- */}
                    <form className="sm:col-start-1 col-end-7">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Choose your Plan</label>
                        <select value={selectedPlan} onChange={handlePlanChange} className="sm:col-start-1 col-end-7 block w-full border-0 py-3 text-custom-blue-3 shadow-sm ring-1 ring-inset ring-custom-blue- placeholder:text-custom-blue-3 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm">
                            {plans.map((plan, index) => (
                            <option key={index} value={plan.planId}>
                                {plan.planName}
                            </option>
                            ))}
                        </select>

                    {selectedPlan && ( 
                    <div className="pt-12">
                    
                            {selectedPlanObject && (
                            <Link to={`/plan/${selectedPlan}`} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="basis-1/2">
                                    <img className="pl-4 pt-4 pb-4 object-cover w-full h-96 rounded-t-lg  " src={Insurance} alt="" />
                                </div>
                                <div className="basis-1/2">
                                    <div className="flex flex-col justify-evenly p-4 leading-normal">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{selectedPlanObject.planName}</h5>
                                        <p className="mb-3 font-normal ">{selectedPlanObject.planAbout}</p>
                                        <p className="mb-3 font-normal text-custom-blue-3 ">Benefit</p>
                                        {selectedPlanObject.planBenefits.map((benefit, index) => (
                                            <ul key={index} className="pl-7 text-xl list-image-store">
                                            <li className="font-normal text-base ">{benefit}</li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>   
                            </Link>
                            
                            )}
                            <div className="flex items-center justify-between">
                                <div></div>
                                <div className="pt-10 pb-10 px-0 py-4  text-2xl  font-bold font-['IBM Plex Sans'] text-custom-blue-3">Totals: {selectedPlanObject.planPrice} VND</div>
                                
                            </div>
                            
                        </div>
                        )}
                    </form>
            </div>
            <div className="flex items-center justify-between">
                <div></div>
                <button className="px-36 py-4 text-2xl bg-indigo-50 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">Payment</button>
            </div>
            



          </form>
          
        </div>
        
      </div>

    );
  }
