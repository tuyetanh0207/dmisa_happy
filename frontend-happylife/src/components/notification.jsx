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
        notiContent: 'Your payment was successfull! Let"s check it now!',
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
            <button onClick={()=>{setIsToggleOpen(!isToggleOpen)}}
                    className='block ml-[520px]'
            >
                <img src={NotiBell} alt="notification bell" />
            </button>
            <section className={`${isToggleOpen ? "":"hidden"} rounded-[9px] bg-white shadow max-w-lg w-full gap-y-px absolute z-10`}>
            {MessageNoti.map((item)=>(
                <div className='flex pt-[46px] pb-[46px] pl-[14px] gap-3.5 border-b-2'>
                    <img src={NotiIcon} alt="NotiIcon" className='w-16' />
                   <div>
                     <strong>{item.notiTitle}</strong>
                     <p className='text-sm'>{item.notiContent}</p>
                    </div>
                </div>
            ))}    
                <button className="w-full h-[61px] text-center bg-indigo-50 font-bold hover:text-blue-600">
                    View all
                </button>
            </section>            
        </body>
    )
}

export default notification