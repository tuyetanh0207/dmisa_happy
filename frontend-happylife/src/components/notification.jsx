
import NotiBell from '../assets/notifications.png'
import { useState } from 'react'
import NotiAPI from '../../api/notificationApi'

import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import UpNotiIcon from '../assets/UploadSuccess.png'
import PwNotiIcon from '../assets/PasswordReset.png'
import { useRef } from 'react'

import RegistrationNotiIcon from '../assets/RegistrationNotiIcon.png' 
import ClaimNotiIcon from '../assets/ClaimNotiIcon.png' 
import PaymentNotiIcon from '../assets/PaymentNotiIcon.png' 
import ContractNotiIcon from '../assets/ContractNotiIcon.png' 
import PlanNotiIcon from '../assets/PlanNotiIcon.png' 
import InformationNotiIcon from '../assets/InformationNotiIcon.png' 
const notification = () => {
    const NotiIcon = [
        {notiType  : 'Registration', Icon : RegistrationNotiIcon},
        {notiType  : 'Claim', Icon : ClaimNotiIcon},
        {notiType  : 'Payment', Icon : PaymentNotiIcon},
        {notiType  : 'Contract', Icon : ContractNotiIcon},
        {notiType  : 'Plan', notiIcon : PlanNotiIcon},
        {notiType  : 'Personal Information', notiIcon : InformationNotiIcon},
        {notiType  : null, notiIcon : UpNotiIcon}
    
    ]
    const [isToggleOpen, setIsToggleOpen] = useState(false);

        const user1 = useSelector((state) => state.auth.login.currentUser);
        // Get list noti & number of false noti
        const [realtimeNoti, setRealtimeNoti] = useState([]);
        const [numberNotReadNoti, setNumberNotReadNoti] = useState('');
        const fetchNoti = async () => {
          try{
            const res = await NotiAPI.getNumberNotiStatusFalse(user1?.token);
            setRealtimeNoti(res.data?.notificationResDTOS);
            setNumberNotReadNoti(res.data?.amountOfFalseStatus)
            console.log('res not read noti', res.data);
      
          }
          catch (error){
            console.log("error in fetchNoti", error);
          }
        }
        useEffect(() => {
            fetchNoti();
        },[]) 
        //Uncomment to auto reload
        // useEffect(() => {
        //     const intervalId = setInterval(()=>{
        //         fetchNoti(); 
        //         console.log('use Effect')

        //     }, 15000);
        //     return () => {
        //         clearInterval(intervalId);
        //     };
        // },[realtimeNoti])  

        

    // Get noti
    // const [realtimeNoti, setRealtimeNoti] = useState([]);
    // //const [realtimeCount, setRealtimeCount] = useState({});

    // const fetchNoti = async () => {
    //   try{
    //     const res = await NotiAPI.getNoti( user1?.userInfo.id, user1?.token);
    //     setRealtimeNoti(res.data);
    //     console.log('res noti', res.data);
  
    //   }
    //   catch (error){
    //     console.log("error in fetchNoti", error);
    //   }
   // }
    // useEffect(()=>{
    //     fetchNoti(); 
    //   },[]);




    const handleNotiBellClick = async (e) => {
        e.preventDefault();
        setIsToggleOpen(!isToggleOpen)
        if(numberNotReadNoti != 0){
            
            console.log('update noti status')        
            try {
                const notiUpdateRes = await NotiAPI.updateNotiStatus(user1, user1?.token);
                setRealtimeNoti(notiUpdateRes.data);
                setNumberNotReadNoti(0);
                console.log("notiUpdateRes:", notiUpdateRes.data)
    
            } catch (err) {
                console.log("err:", err);
                setNoti("Cannot use api.")
                console.log(noti)
            }    
        }
    }

    // Xử lý sự kiện click bất kỳ đầu bên ngoài noti section & noti
     //const popoverRef = useRef(null);
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //     if(popoverRef.current && !popoverRef.current.contais(event.target))
    //     {
    //         setIsToggleOpen(!isToggleOpen)
    //         console.log("TEST SUCCESS")
    //     }
    //     // Thêm sự kiện lắng nghe click vào phần tử root
    //     document.addEventListener('click', handleClickOutside);

    //     // Cleanup: loại bỏ sự kiện lắng nghe khi component unmount
    //     return () => {
    //     document.removeEventListener('click', handleClickOutside);
    //     };
    // }}, []); 
    
    return (
        //${isToggleOpen | numberNotReadNoti === 0 ? 'hidden' : ''} 
        <body 
        //ref={popoverRef}
        className='block relative'>
            {!isToggleOpen ? (
                numberNotReadNoti != 0 ? ( 
            <div className={`absolute ml-[15px] h-[20px] w-[20px] bg-rose-500 rounded-full  text-xs flex items-center justify-center`}>
                {numberNotReadNoti}
            </div>
            ):(
                null
            )
            ) : (
                null
            )
            }
            <button onClick={handleNotiBellClick}
                    className='block'
            >
                <img src={NotiBell} alt="notification bell" />
            </button>
            <section 
            className={`${isToggleOpen ? "":"hidden"} left-[-520px] top-[56px] rounded-t-lg rounded-b-lg bg-white shadow gap-y-px absolute z-50 max-h-[600px] overflow-hidden`}>
                <div className='max-h-[500px] overflow-y-auto '>
                <div className={`${realtimeNoti.length === 0 ? 'h-[500px] w-[520px]':'hidden'}`}> 
                    <div className='text-black text-center pt-[10px]'>
                    No notification to show 
                    </div> 
                    
                </div>
                {realtimeNoti.map((item)=>(  
                    <div className='flex pt-[46px] pb-[46px] pl-[14px] pr-[14px] border-b'>
                        {NotiIcon.map((arr) => (
                            arr.notiType === item.notiType ? (
                                <img src={arr.Icon} alt="NotiIcon" className='object-contain w-16 pr-[14px] max-h-[64px] max-w-[64px]' />
                            ) : (
                                null
                            )
                            )
                        )}
                    <div className='text-black'>
                        <div className='flex'>
                            <strong className='mr-[10px]'>{item.notiTitle}</strong>
                            <div className={`${item.notiStatus===true ? 'hidden':''} rounded-lg w-auto h-auto bg-blue-100 pl-2 pr-2 text-center`}>new</div>
      
                            
                        </div>
                        
                        <p className='text-base'>{item.notiContent}</p>
                        <p className='text-right text-sm italic font-normal pr-[10px]'>20/11/2022</p>
                        </div>
                    </div>
                    
                
                ))}    
                </div>
            </section>            
        </body>
    )
}
export default notification