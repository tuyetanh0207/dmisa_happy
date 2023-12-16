import Insurance from '../../../assets/Insurance.jpg'
import Review from './review'
import Contact  from './contact'
import Header from '../header.jsx'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export default function Plandetail() {
    
    const {planId} = useParams();
    console.log(planId);
    const [plansDetail, setPlansDetailAPI] = useState(null);



    // const fetchPlanDetailAPI = () => {
    //     // // fetch("http://localhost:8090/api/v1/plans")
    //     // fetch(`http://localhost:8090/api/v1/plans/${planId}`)
    //     // // fetch(`http://localhost:8090/api/v1/plans/657b4121493c373b91eb3c11`)
    //     // .then((res)=>res.json())
    //     // .then((data)=>{
    //     //     console.log(data)
    //     //     setPlansDetailAPI(data);
    //     // });
    //     axios.get(`http://localhost:8090/api/v1/plans/${planId}`)
    //     // axios.get("http://localhost:8090/api/v1/plans")
    //   .then((response) => {
    //     console.log(response.data);
    //     setPlansDetailAPI(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching plan detail:', error);
    //   });
    // }
    // useEffect(() => {
    //     fetchPlanDetailAPI();
    
    // },[planId])
    
    //console.log(plansDetail)
    

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

    // const fetchPlanDetailAPI = () => {
    //     fetch(`http://localhost:8090/api/v1/plans/${planId}`)
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         console.log("data:", data)
    //         setPlansDetailAPI(data);
    //     });
    // }
    // useEffect(() => {
    //     fetchPlanDetailAPI();
    
    // },[])

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
            <div  className='pt-20 pb-20 container mx-auto '>
                <h1 className="pb-14  text-center text-4xl font-semibold font-serif text-custom-blue">{plansDetail?.planName}</h1>
                    <div className="flex items-center justify-center ">
                        <img src={Insurance} alt="LOGO" className="item-center" ></img>
                    </div>
                <div className="pt-6 pb-14 container mx-auto  max-w-6xl">
                    <h1 className="pt-14 pb-4 text-3xl font-semibold font-serif text-custom-blue">Benefit</h1>
                    <p className="pt-5 pb-10 text-2xl">{plansDetail?.planAbout}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className=" p-4">
                        <ul className="pl-7 text-xl list-image-store">
                            {plansDetail?.planBenefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                            ))}
                </ul>
                        </div>
                        <div className=" p-4">
                            <img src={Insurance} alt="LOGO" className="item-center" ></img>
                        </div>
                    </div>
                    <h1 className="pt-14 pb-4 text-3xl font-semibold font-serif text-custom-blue">{plansDetail?.planName}</h1>
                    <p className="pt-5 pb-10 text-2xl">{plansDetail?.planAbout}</p>
                    <div className="pt-6 pb-14 container mx-auto bg-custom-blue-2 max-w-6xl">
                        <div className="pt-5 container mx-auto max-w-[900px]">
                            <h1 className="pt-14 pb-4 text-3xl  font-semibold font-serif text-custom-blue"> {plansDetail?.planAbout} </h1>
                            <p className="pt-5  text-2xl text-custom-blue">{plansDetail?.planType}</p>
                        </div>
                    </div>
                    <p className="pt-10 pb-10 text-2xl">{plansDetail?.planAbout}</p>
                </div>
                
            </div>
            {/* ))} */}
            
            <Review/>
            <Contact/>
        </div>
        

    )
  }
  