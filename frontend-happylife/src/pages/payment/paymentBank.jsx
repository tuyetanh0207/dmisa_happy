import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../redux/authApi';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/LogoHalfScreen.png';
import {Routes, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import ShoppingCart from '../../assets/ShoppingCart.png';
import {useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import InvoiceAPI from '../../../api/invocieApi'
import { useParams } from 'react-router-dom';
import RatingIcon from '../../assets/RateIcon.png';
import PlanAPI from '../../../api/plansApi'

const paymentBank = () => {

    const { regisId } = useParams();
    const user1 = useSelector((state) => state.auth.login.currentUser);
    // Get invoice data by regis id
    const [realtimeInvoice, setRealtimeInvoice] = useState({});
    console.log("REGISTRATION ID: ", regisId)
    const fetchInvoice = async () => {
        try{
          const res = await InvoiceAPI.getInvoiceByRegisId(regisId, user1?.token);
          setRealtimeInvoice(res.data);
          console.log('res invoice is: ', res.data);
    
        }
        catch (error){
          console.log("error in fetchUser", error);
        }
      }
      useEffect(() => {
        fetchInvoice();
      },[])  

    console.log("REALTIME INVOICE: ",realtimeInvoice);


    const handlePayNow = async (e) => {
            e.preventDefault();
            console.log('update invoice status');
            console.log("REGISTRATION ID: ", regisId)

            const invoice = {
                regisInfo: {
                    regisId: realtimeInvoice.regisInfo.regisId,
                    customerInfo:{
                        id: realtimeInvoice.regisInfo.customerInfo.id
                    },
                    approvalStatus : "Signed"
                },
                paymentMethod : "Cashing",
                paymentStatus: "Pending"
            }
            try {
                const invoiceUpdateRes = await InvoiceAPI.updateInvoiceStatus(invoice, realtimeInvoice.invoiceId, user1?.token);
                console.log("contractUpdateRes sucess:",invoiceUpdateRes)
    
            } catch (err) {
                console.log("err:", err);
            }
        }

    //Get plan by regis id
    const [realtimePlan, setRealtimePlan] = useState([]);
    const fetchPlan = async () => {
      try{
        console.log('FETCH PLAN SUCCESS!');
        const res = await PlanAPI.getPlanByRegisId( /*need fix*/ realtimeInvoice.regisInfo.productInfo.planId, user1?.token);
        setRealtimePlan(res.data);

        console.log('res', res.data);
      }
      catch (error){
        console.log("error in fetchUser", error);
      }
    }
    useEffect(() => {
        fetchPlan();
    },[])
    console.log('FETCH PLAN: ', realtimePlan);

    return(
        <div className='w-[1920px] h-[1210px] bg-slate-50 flex justify-center items-center'>
            <div className="w-[710px] h-[932px] bg-white rounded-lg border-2 border-slate-50 flex justify-center">
                <div className='w-[572px] h-[459px] p-12 mt-[74px] rounded-lg border flex-col justify-start items-start gap-9 inline-flex'>
                    <div className="w-[476px] h-14 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="w-[207px] h-12 text-zinc-950 text-2xl font-semibold font-['Inter'] leading-7">Payment</div>
                        <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                    </div>
                    <div className="w-[500px] h-[53px] flex-col justify-start items-start gap-4 inline-flex">
                        <div className='text-zinc-950 text-lg font-semibold leading-3'>
                            Pay With: 
                        </div>
                        <div>
                            <input type="radio" id="card" name="options" className="h-4 w-4 mb-[2px] text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-500"/>
                            <label htmlFor="option1" className="ml-2 text-gray-700">Card</label>
                            <input type="radio" id="bank" name="options" className="ml-[19px] mb-[2px]  h-4 w-4 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-500"/>
                            <label htmlFor="option2" className="ml-2 text-gray-700">Bank</label>
                        </div>
                        <div>
                            <select id="bankname" name="bankname" 
                            className='w-[476px] h-[46px] px-4 py-[11px] rounded border border-zinc-400 justify-center items-center gap-[282px] inline-flex'
                            >
                                <option value="" label="Access bank"></option>
                                <option value="Sacombank" label="Sacombank"></option>
                                <option value="BIDV" label="BIDV"></option>
                            </select>
                        </div>
                        <div className="text-zinc-950 text-lg font-medium">
                            Enter Your Bank Account Number
                        </div>
                        <input  className='w-[476px] h-[46px] px-4 py-[11px] rounded border border-zinc-400 justify-center items-center gap-[282px] inline-flex'
                         placeholder='Your bank account number'
                        >
                        </input>
                        
                        <Link key='paymentconfirm' to='/paymentconfirm'>
                            <button 
                            onClick={handlePayNow}
                            className="w-[475px] h-12  mt-[226px] py-3 bg-indigo-500 rounded border border-indigo-500 flex justify-center items-center gap-2.5 inline-flex">
                                <div> <img src={ShoppingCart}></img> </div>
                                <div className="text-right text-white text-base font-bold leading-normal">Pay now</div>
                            </button>
                        </Link>
                        <div className="w-[475px] text-zinc-400 text-sm">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                        </div>

                    </div>
                </div>
    

            </div>
            <div className="w-[710px] h-[932px] bg-zinc-100 bg-opacity-50 border flex justify-center items-center">
                <div className='w-[710px] h-[670px] grid gap-x-8 flex justify-center pl-[104px]'>
                    <div>
                        <div className="w-[179px] h-12 text-zinc-950 text-2xl font-semibold font-['Inter'] leading-7">Your choice</div>
                        <div className='w-[476px] h-[0px] border border-zinc-400'></div>
                    </div>
                    <div className='flex'>
                        <div className="w-[132px] h-24 bg-stone-300" />
                        <div className='pl-[30px]'>
                            <h5 className="w-[391px] h-16 text-slate-900 text-4xl font-medium font-['IBM Plex Sans'] leading-9">HappyLife Gold</h5>
                            <div>
                                <img src={RatingIcon} alt="Rating" />
                            </div>
    
                        </div>
                    </div>
                    
                    <p className="text-2xl">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit.</p>
                    
                    <div>
                    <h5 className="text-2xl font-medium text-custom-blue-3">Benefit </h5>
                        <ul className="pl-7 text-xl list-image-store">
                            <li> Ut enim ad minim veniam</li>
                            <li> Ut enim ad minim veniam</li>
                            <li> Ut enim ad minim veniam</li>
                            <li> Ut enim ad minim veniam</li>
                        </ul>
                    </div>
                    <div className="w-[476px] h-[1px] border border-zinc-400"></div>
                    <div className='flex'>
                        <div className="w-[155.59px] h-[31px] text-slate-900 text-base font-medium font-['IBM Plex Sans'] leading-7">Total</div>
                        <div className="w-[412px] h-16 text-right text-slate-900 text-4xl font-medium font-['IBM Plex Sans'] leading-9">50.000.000 vnđ</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default paymentBank