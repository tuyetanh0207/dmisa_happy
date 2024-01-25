import Insurance from '../../../assets/Insurance.jpg'
import Shopingcar from '../../../assets/shopingcar.png'
import Arrowcircleleft from '../../../assets/ArrowCircleLeft.png'
import Healthinsurance1 from '../../../assets/healthinsurance1.png'
import Healthinsurance2 from '../../../assets/healthinsurance2.png'
import Healthinsurance3 from '../../../assets/healthinsurance3.png'
import Healthinsurance4 from '../../../assets/healthinsurance4.png'
import HealthinsurancePicture1 from '../../../assets/insurantFamily.jpg'
import HealthinsurancePicture2 from '../../../assets/insurantFamily2.jpg'
import HealthinsurancePicture3 from '../../../assets/insurantFamily3.jpg'
import HealthinsurancePicture4 from '../../../assets/insurantFamily4.jpg'
import HealthinsurancePicture5 from '../../../assets/insurantFamily5.webp'

import chevronright from '../../../assets/chevronright.svg'
import Download from '../../../assets/download.png'
import Review from './review'
import Contact  from './contact'
import Header from '../header.jsx'
import Modal from './modal/modal.jsx'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
export default function Plandetail() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const {planId} = useParams();
    console.log(planId);
    const [plansDetail, setPlansDetailAPI] = useState(null);
    const [modalOpen,setModalOpen] = useState(false);

    const handleNotLogin = (event) =>{
        
        if(!user){
            event.preventDefault();
            setModalOpen(true);
            console.log('Not Login');
        }
    }
    useEffect(() => {
        const fetchPlanDetailAPI = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/api/v1/plans/${planId}`);
                console.log(response.data);
                //const plansArray = response.data.plans || [];
                // setPlansDetailAPI(response.data);
                setPlansDetailAPI(response.data);
              } catch (error) {
                console.error('Error fetching plan detail:', error);
              }
        };
    
        fetchPlanDetailAPI();
        //handleNotLogin();
      }, [planId]);


    return (
        <div className="py-20 bg-custom-blue-3 w-full">
            
            <div  className='py-20 mb-20 container mx-auto bg-white w-full'>
                <h1 className="pb-14  text-center text-5xl font-semibold font-serif text-custom-blue">{plansDetail?.planName}</h1>
                <div className="pt-6 pb-14 container mx-auto  max-w-6xl">
                    <div className="pb-5 flex items-center justify-between">
                        <div  className="px-20 py-2.5 text-2xl flex flex-row bg-custom-blue-2 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">
                            
                            {plansDetail?.planType && plansDetail.planType.length > 0 && ( 
                            <div>
                                {plansDetail.planType[0].typeName}
                            </div>
                            )}

                        </div>
                        <div className="px-20 py-2.5 text-2xl flex flex-row bg-custom-blue-2 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">   
                            {plansDetail?.planDuration} {plansDetail?.planDurationUnit}
                        </div>
                    </div>
                </div>
                
                <div className="pb-6 flex justify-center">
                    <div className="w-[678px] h-16 text-center text-custom-blue text-[26px] font-medium font-['IBM Plex Sans'] leading-9">{plansDetail?.planSlogan}</div>
                </div>
                
                <div className="flex items-center justify-center ">
                    <img src={HealthinsurancePicture2} style={{ width: '70%', height: '30%' }} alt="LOGO" className="item-center" ></img>
                </div>

                <div className="pt-6 pb-14 container mx-auto  max-w-6xl">
                    {/* <p className="pt-5 pb-14 text-2xl text-custom-blue font-normal font-['IBM Plex Sans'] leading-[30px]">{plansDetail?.planAbout}</p> */}
                    {plansDetail?.planAbout && plansDetail.planAbout.length > 1 &&
                        <p className="pt-5 pb-14 text-2xl text-custom-blue font-normal font-['IBM Plex Sans'] leading-[30px]">
                        - {plansDetail.planAbout.slice(0, 666)}
                        <br /><br/>
                        - {plansDetail.planAbout.slice(667)}
                        </p>
                    }
                    <div className="px-10 mb-10 py-2.5 text-2xl flex flex-row bg-custom-blue-2 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">   
                            {plansDetail?.planRecommended}
                    </div>

                    <h1 className="pt-14 pb-4 text-3xl font-semibold font-serif text-custom-blue-3">Benefit</h1>

                    <div className="grid grid-cols-2 gap-4">
                        <div className=" p-4">
                            
                        {plansDetail?.planBenefits.map((benefit, index) => (
                            <div key={index} className="pt-1 text-2xl ">
                                <div className="flex">
                                    <img src={chevronright} className=" w-[30px] " ></img>
                                    {benefit}
                                </div>
                            </div>
                        ))}
                        </div>
                        <div className=" p-4">
                            <img src={HealthinsurancePicture5} style={{ width: '100%', height: '100%' }} alt="LOGO" className="item-center" ></img>
                        </div>
                        
                    </div>
                    
                    {/* option benefits */}
                    <h1 className="py-16 pb-5 text-3xl font-semibold font-serif text-custom-blue-3">Option Benefit</h1>
                    {plansDetail?.planType && plansDetail.planType.length > 0 && (
                    <div className="pt-10 grid grid-cols-2 gap-10">
                        {/* {plansDetail?.optionalBenefits.map((item,index)=>(
                            <div key={index} className=" p-4">
                                
                                {item.benefitName}
                            </div>
                        ))} */}
                        <div className="flex flex-row  gap-7">
                            <img src={Healthinsurance1}  style={{ width: '70px', height: '70px' }} ></img>
                            <div className="basis-5/6 text-custom-blue text-[20px] font-medium font-['IBM Plex Sans']">
                                {plansDetail.optionalBenefits[0].benefitName}
                            </div>
                        </div>
                        <div className="flex flex-row  gap-7">
                            <img src={Healthinsurance2} style={{ width: '70px', height: '70px' }} ></img>
                            <div className="basis-5/6 text-custom-blue text-[20px] font-medium font-['IBM Plex Sans']">
                                {plansDetail.optionalBenefits[1].benefitName}
                            </div>
                        </div>
                        <div className="flex flex-row  gap-7">
                        <img src={Healthinsurance3} style={{ width: '70px', height: '70px' }} ></img>
                            <div className="basis-5/6 text-custom-blue text-[20px] font-medium font-['IBM Plex Sans']">
                                {plansDetail.optionalBenefits[2].benefitName}
                            </div>
                        </div>
                        <div className="flex flex-row  gap-7">
                        <img src={Healthinsurance4} style={{ width: '70px', height: '70px' }} ></img>
                            <div className="basis-5/6 text-custom-blue text-[20px] font-medium font-['IBM Plex Sans']">
                                {plansDetail.optionalBenefits[3].benefitName}
                            </div>
                        </div>
                            
                            
                        
                    </div>
                    )}

                    {/* Document */}
                    
                    <div className=" pb-10 pt-20 grid grid-cols-2 gap-4">
                        <div className="">
                            <h1 className="pb-8 text-3xl font-semibold font-serif text-custom-blue-3">Download Documents</h1>
                            {plansDetail?.planDocuments && plansDetail.planDocuments.length > 0 && (
                                plansDetail.planDocuments.map((item, index) => (
                                    <div key={index} className="pt-1 text-2xl">
                                    <div className="py-3 flex gap-5">
                                        <img src={Download} className="w-[28px]" alt="Download icon" />
                                        <a href={item.docUrl} download="Product Terms and Conditions.pdf">{item.docTitle}</a>
                                    </div>
                                    </div>
                                ))
                                )}

                            
                        </div>
                        <div className=" p-4">
                            <img src={HealthinsurancePicture3} alt="LOGO" className="item-center" ></img>
                        </div>
                        
                    </div>
                    
                    <div className="pt-12 container mx-auto  max-w-6xl">
                        <div className="pb-7 flex items-center justify-between">
                            <Link to="/plan"  className="px-20 py-4 text-2xl flex flex-row bg-custom-blue-4 rounded border font-bold font-['IBM Plex Sans'] text-white border-indigo-500">
                                <img src={Arrowcircleleft} alt="LOGO" className="pr-7 item-center filter brightness-0 invert " ></img>
                                <p>Back to Plan </p>
                            </Link>
                            <Link to="/buyplan" onClick={(event) => handleNotLogin(event)}  className="px-20 py-4 text-2xl flex flex-row bg-custom-blue-4 rounded border font-bold font-['IBM Plex Sans'] text-white border-indigo-500">   
                                <img src={Shopingcar} alt="LOGO" className="pr-7 item-center filter brightness-0 invert " ></img>
                                <p>Register Now</p>
                            </Link>
                        </div>
                    </div>
                    {modalOpen && <Modal closeModal={() => {setModalOpen(false)}}/>}



 
                </div>
                
            </div>
            {/* ))} */}

            <Review/>
            <div className="pt-14 pb-14 bg-custom-blue-3 mx-auto max-w-4xl">
                <Contact/>
            </div>
        </div>
        

    )
  }
  