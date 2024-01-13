import NotiIcon from '../assets/UploadSuccess.png'
import NotiBell from '../assets/notifications.png'
import { useState } from 'react'
const notification = () => {
    const MessageNoti = [{
        notificationId: null,
        userInfo: null,
        notiTitle: 'Payment 1 successfull',
        notiContent: 'Your payment was successfull! Let"s check it now!',
        notiStatus: null,
        notiType: null,
        notiPrio: null
    },
    {
        notificationId: null,
        userInfo: null,
        notiTitle: 'Payment 2 successfull',
        notiContent: 'Your payment was successfull! Let"s check it now and uou jạ l ja3 jd! Let"s check it now and uou jạ l ja3 jd! Let"s check it now and uou jạ l ja3 jd!',
        notiStatus: null,
        notiType: null,
        notiPrio: null
    },
    {
        notificationId: null,
        userInfo: null,
        notiTitle: 'Plan updated',
        notiContent: 'Your plan has updated! Let"s check it now!',
        notiStatus: null,
        notiType: null,
        notiPrio: null
    },
    {
        notificationId: null,
        userInfo: null,
        notiTitle: 'Payment fail',
        notiContent: 'Your payment was fail! Let"s check it now!',
        notiStatus: null,
        notiType: null,
        notiPrio: null
    }    
    ]
    const [isToggleOpen, setIsToggleOpen] = useState(false);

    return (
        
        <body className='block relative'>
            <div className='absolute ml-[15px] h-[20px] w-[20px] bg-rose-500 rounded-full  text-xs flex items-center justify-center'>
                9
            </div>
            <button onClick={()=>{setIsToggleOpen(!isToggleOpen)}}
                    className='block'
            >
                <img src={NotiBell} alt="notification bell" />
            </button>
            <section className={`${isToggleOpen ? "":"hidden"} left-[-520px] top-[56px] rounded-[9px] bg-white shadow gap-y-px absolute z-10`}>
            {MessageNoti.map((item)=>(  
                <div className='flex pt-[46px] pb-[46px] pl-[14px] pr-[14px] border-b-2'>
                    <img src={NotiIcon} alt="NotiIcon" className='object-contain w-16 pr-[14px] max-h-[64px] max-w-[64px]' />
                   <div className='text-black'>
                     <strong>{item.notiTitle}</strong>
                     <p className='text-sm'>{item.notiContent}</p>
                    </div>
                </div>
            ))}    
                <button className="w-full h-[61px] text-black text-center bg-indigo-50 font-bold hover:text-blue-600">
                    View all
                </button>
            </section>            
        </body>
    )
}

export default notification