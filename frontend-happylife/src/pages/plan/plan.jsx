import Help from './help.jsx'
import Insurance from '../../assets/Insurance.jpg'
import Arrow from '../../assets/Arrow.png'
import Header from './header.jsx'
import chevronright from '../../assets/chevronright.svg'
//import Plandetail from './plandetail/plandetail.jsx'
//import PlanAPI from '../../../api/plansApi.jsx'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function Plan() {
    // Gọi API lấy data -> có rhwe63 phải jsonfy nó
    // plans = jsonfy function (result of API Call)
    const user = useSelector((state) => state.auth.login.currentUser);
        const [plans,setPlansAPI]=useState([]);

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
      console.log("user:",user);
  
    return (
      <div className="bg-custom-blue-3">
        <div className="pt-20 pb-20 container-sm mx-auto  items-center ">
          <div className="mx-auto px-32 w-3/4 grid grid-cols-1 gap-10 ">
            { plans.map((plan, index) => (
              <div key={index} className=" px-5 rounded-lg flex flex-col">
                <div>
                  <input type="hidden" value="3" />
                  <div className=''>
                    <img src={Insurance} alt="LOGO" className=" py-5 rounded-lg w-full h-1/2 " />
                  </div>
                  
                  <div className="pt-5 px-10 text-slate-900 text-4xl font-medium font-['IBM Plex Sans'] leading-9">{plan.planName}</div>
                  <p className="pt-5 px-10 text-2xl font-normal font-['IBM Plex Sans']">{plan.planSlogan}</p>
                  {/* <h5 className="pt-3 pl-3 text-2xl font-medium text-custom-blue-3">{plan.planId} </h5> */}
                  <h5 className="py-5 px-10 text-2xl font-medium text-custom-blue-3">Benefit </h5>
                  {plan.planBenefits.map((benefit, index) => (
                    <div key={index} className="pt-1 px-10 text-xl ">
                      <div className="flex">
                        <img src={chevronright} className=" w-[30px] " ></img>
                        {benefit}
                      </div>
                   </div>
                  ))}
                </div>
                <div className="flex-grow"></div>
                <div className=" flex flex-row flex-wrap justify-end">
                  <Link to={`/plan/${plan.planId}`} >
                    <img src={Arrow}  />
                  </Link>
                </div>
            </div>
            ))}

            
          </div>
        </div>
        <Help />
      </div>

    );

  }
