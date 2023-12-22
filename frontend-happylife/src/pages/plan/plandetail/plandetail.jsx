import Insurance from '../../../assets/Insurance.jpg'
import Shopingcar from '../../../assets/shopingcar.png'
import Arrowcircleleft from '../../../assets/ArrowCircleLeft.png'
import Review from './review'
import Contact  from './contact'
import Header from '../header.jsx'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Plandetail() {
    
    const {planId} = useParams();
    console.log(planId);
    const [plansDetail, setPlansDetailAPI] = useState(null);

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
      }, [planId]);


      console.log("plandetail:",plansDetail)
      console.log("planName:",plansDetail?.planName)
      console.log("planAbout:",plansDetail?.planAbout)
      console.log("planName:",plansDetail?.planType)

    return (
        <div className=" bg-custom-blue-3">
            <Header/>
            {/* {plansDetail.length > 0 && plansDetail.map((plan, index) => ( */}
            {/* {Array.isArray(plansDetail) && plansDetail?.map((plan, index) => ( */}

            {/* <div key={index} className='pt-20 pb-20 container mx-auto '> */}
            <div  className='pt-20 pb-20 container mx-auto'>
                <h1 className="pb-14  text-center text-5xl font-semibold font-serif text-custom-blue">{plansDetail?.planName}</h1>
                <div className="pt-6 pb-14 container mx-auto  max-w-6xl">
                    <div className="pb-14 flex items-center justify-between">
                        <div  className="px-20 py-2.5 text-2xl flex flex-row bg-custom-blue-2 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">
                            {plansDetail?.planType}
                        </div>
                        <div className="px-20 py-2.5 text-2xl flex flex-row bg-custom-blue-2 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500">   
                            {plansDetail?.planDuration} {plansDetail?.planDurationUnit}
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-center ">
                    <img src={Insurance} alt="LOGO" className="item-center" ></img>
                </div>

                <div className="pt-6 pb-14 container mx-auto  max-w-6xl">
                    <p className="pt-5 pb-14 text-2xl">{plansDetail?.planAbout}</p>
                    
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className=" p-4">
                            <h1 className="pb-4 text-3xl font-semibold font-serif text-custom-blue">Benefit</h1>
                            <ul className="pl-7 text-2xl list-image-store">
                                {plansDetail?.planBenefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                        <div className=" p-4">
                            <img src={Insurance} alt="LOGO" className="item-center" ></img>
                        </div>
                    </div>

                    <div className="pt-10 grid grid-cols-2 gap-4">
                        <div className=" p-4">
                            <img src={Insurance} alt="LOGO" className="item-center" ></img>
                        </div>
                        <div className=" p-4">
                            <img src={Insurance} alt="LOGO" className="item-center" ></img>
                        </div>
                    </div>
                    
                    <div className="pt-12 container mx-auto  max-w-6xl">
                        <div className="pb-7 flex items-center justify-between">
                        <div></div>
                                <div className="pt-2 pb-1 px-5 py-4  text-3xl  font-bold font-['IBM Plex Sans'] text-custom-blue-3">Totals: {plansDetail?.planPrice} VND</div>
                        </div>
                        <div className="pb-7 flex items-center justify-between">
                            <Link to="/plan"  className="px-20 py-4 text-2xl flex flex-row bg-custom-blue-4 rounded border font-bold font-['IBM Plex Sans'] text-white border-indigo-500">
                                <img src={Arrowcircleleft} alt="LOGO" className="pr-7 item-center filter brightness-0 invert " ></img>
                                <p>Back to Plan </p>
                            </Link>
                            <Link to="/buyplan" className="px-20 py-4 text-2xl flex flex-row bg-custom-blue-4 rounded border font-bold font-['IBM Plex Sans'] text-white border-indigo-500">   
                                <img src={Shopingcar} alt="LOGO" className="pr-7 item-center filter brightness-0 invert " ></img>
                                <p>Register Now</p>
                            </Link>
                        </div>
                    </div>
                    
                    {/* <div className="pt-10 container mx-auto ">
                        <div className="pb-10 flex flex-row justify-end">
                            <div className="basis-1/3">
                                <Link to="/plan">
                                    <div className="px-7 py-4 absolute bg-indigo-50 rounded border border-indigo-500 items-center inline-flex">
                                        <div className="justify-start items-center flex">
                                            <div className="text-right text-indigo-500 text-2xl font-bold font-['IBM Plex Sans'] leading-normal">
                                                <p>Back to Plan page</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                
                            </div>
                            <div className="basis-1/3"></div>
                            <div className="basis-1/3 flex justify-end">
                                <Link to="/buyplan" className="px-24 py-4 absolute bg-indigo-50 rounded border border-indigo-500 items-center inline-flex">
                                    <div className="justify-end items-center flex">
                                        <div className="text-right text-indigo-500 text-2xl font-bold font-['IBM Plex Sans'] leading-normal">
                                            <p>Register</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div> */}


 
                </div>
                
            </div>
            {/* ))} */}
            
            <Review/>
            <Contact/>
        </div>
        

    )
  }
  