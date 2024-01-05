import Help from './help.jsx'
import Insurance from '../../assets/Insurance.jpg'
import Arrow from '../../assets/Arrow.png'
import Header from './header.jsx'
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
        <Header />
        <div className="pt-20 pb-20 container mx-auto items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            { plans.map((plan, index) => (
              <div key={index} className="bg-white p-4 rounded-lg flex flex-col">
                <div>
                  <input type="hidden" value="3" />
                  <img src={Insurance} alt="LOGO" className="rounded-lg" />
                  <h5 className="pb-3 pt-5 pl-3 text-2xl font-medium">{plan.planName}</h5>
                  <p className="pb-3 pl-3 text-2xl">{plan.planAbout}</p>
                  {/* <h5 className="pt-3 pl-3 text-2xl font-medium text-custom-blue-3">{plan.planId} </h5> */}
                  <h5 className="pt-3 pl-3 text-2xl font-medium text-custom-blue-3">Benefit </h5>
                  {plan.planBenefits.map((benefit, index) => (
                    <ul key={index} className="pl-7 text-xl list-image-store">
                      <li>{benefit}</li>
                   </ul>
                  ))}
                </div>
                <div className="flex-grow"></div>
                <div className="pt-4 flex flex-row flex-wrap justify-end">
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
