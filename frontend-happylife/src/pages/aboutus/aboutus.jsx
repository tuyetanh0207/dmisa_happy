import HealthinsurancePicture1 from '../../assets/insurantFamily.jpg'
import HealthinsurancePicture2 from '../../assets/insurantFamily2.jpg'
import HealthinsurancePicture3 from '../../assets/insurantFamily3.jpg'
import HealthinsurancePicture4 from '../../assets/insurantFamily4.jpg'
import {Link} from 'react-router-dom'
import Contact from '../plan/plandetail/contact.jsx'
export default function About() {

      
      return(
      <div className='relative '>
        <div className="py-10 " >
          <div  className='container mx-auto  w-full'>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-5 ">
                <div className="flex gap-4 ">
                  <p className="text-slate-900 text-5xl font-medium font-['IBM Plex Serif'] ">About </p>
                  <p className="text-5xl text-custom-blue-3 font-medium font-['IBM Plex Serif']">HappyLife</p>
                </div>
                <p className="pr-10 text-slate-900 text-base font-normal font-['IBM Plex Sans'] leading-relaxed">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommo consequat. Duis aute irure dolor in repre henderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur </p>
                <div className="flex flex-row">
                  <div className="basis-1/2 flex flex-row gap-5">
                    <div className="w-9 h-9 bg-indigo-500 rounded-full" />
                    <p className="py-1 text-slate-900 text-xl font-medium font-['IBM Plex Sans']">Medical Experience</p>
                  </div>
                  <div className="basis-1/2 flex flex-row gap-5">
                    <div className="w-9 h-9 bg-indigo-500 rounded-full" />
                    <p className="py-1 text-slate-900 text-xl font-medium font-['IBM Plex Sans']">Saving Your Vision</p>
                  </div>
                </div>
                <img src={HealthinsurancePicture1} style={{ width: '100%', height: '100%' }} alt="LOGO" className="item-center" ></img>
              </div>
              {/* // */}
              <div className="flex flex-col gap-5 ">
                <img src={HealthinsurancePicture4} style={{ width: '100%', height: '100%' }} alt="LOGO" className="item-center" ></img>
                <div className="pt-5 flex flex-row">
                  <div className="basis-1/2 flex flex-col gap-5">
                    <p className="text-indigo-500 text-[64px] font-medium font-['IBM Plex Sans'] leading-[56px]">20+</p>
                    <p className="text-slate-900 text-base font-normal font-['IBM Plex Sans'] leading-relaxed">Ut enim ad minim veniam, quis nostrud exercita tion ullamco laboris nisi ut aliquip.</p>
                  </div>
                  <div className="basis-1/2 flex flex-col gap-5">
                    <p className="text-indigo-500 text-[64px] font-medium font-['IBM Plex Sans'] leading-[56px]">300+</p>
                    <p className="text-slate-900 text-base font-normal font-['IBM Plex Sans'] leading-relaxed">Ut enim ad minim veniam, quis nostrud exercita tion ullamco laboris nisi ut aliquip.</p>
                  </div>
                </div>
                <Link className="mt-10 py-2 w-[50%] bg-button-blue text-white text-xl font-semibold font-serif rounded text-center">About HappyLife</Link>
                
              </div>
            </div>
          </div> 
        </div>

        <div className="py-10 bg-custom-blue-3">
          <div  className='container mx-auto w-full'>
            <div className="flex gap-4 ">
                    <p className="text-slate-900 text-5xl font-medium font-['IBM Plex Serif'] ">Why </p>
                    <p className="text-5xl text-custom-blue-3 font-medium font-['IBM Plex Serif']">HappyLife</p>
                  </div>
            </div> 
            <div className="my-7 mx-24 grid grid-cols-2 gap-4">
              <div className=" flex flex-col gap-5"> 
                <img src={HealthinsurancePicture2} style={{ width: '100%', height: '100%' }} alt="LOGO" className="item-center" ></img>
                <p className="text-blue-950 text-[26px] font-medium font-['IBM Plex Sans'] leading-9" >Highly Qualified Specialists</p>
                <p className="text-slate-900 text-lg font-normal font-['IBM Plex Sans'] leading-[30px]">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit.</p>
              </div>
              <div className=" flex flex-col gap-5"> 
                <img src={HealthinsurancePicture3} style={{ width: '100%', height: '100%' }} alt="LOGO" className="item-center" ></img>
                <p className="text-blue-950 text-[26px] font-medium font-['IBM Plex Sans'] leading-9" >Modern Ophthalmology</p>
                <p className="text-slate-900 text-lg font-normal font-['IBM Plex Sans'] leading-[30px]">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit.</p>
              </div>
            </div> 
            <div className="my-10 mx-24 flex flex-row justify-between">
              <div className="px-16 py-5 bg-white text-center">
                <p className="text-indigo-500 text-[50px] font-medium font-['IBM Plex Sans'] leading-[56px]">25 000+</p>
                <p className=" text-center text-slate-900 text-lg font-normal font-['IBM Plex Sans'] leading-">Eye Examination and <br/>Consultation</p>
              </div>
              <div className="px-16 py-5 bg-white text-center">
                <p className="text-indigo-500 text-[50px] font-medium font-['IBM Plex Sans'] leading-[56px]">10 000+</p>
                <p className=" text-center text-slate-900 text-lg font-normal font-['IBM Plex Sans'] leading-">Performed Laser Surgical <br/>Corrections</p>
              </div>
              <div className="px-16 py-5 bg-white text-center">
                <p className="text-indigo-500 text-[50px] font-medium font-['IBM Plex Sans'] leading-[56px]">5 000+</p>
                <p className=" text-center text-slate-900 text-lg font-normal font-['IBM Plex Sans'] leading-">Online Appointment Processed <br/>by the Opto</p>
              </div>
            </div>
        </div>
        <div className="py-5 bg-custom-blue">
        <div className="my-10 mx-24 flex flex-row justify-between gap-5">
              <div className="py-5 basis-1/3">
                <p className="  text-white text-xl font-normal font-['IBM Plex Sans'] leading-">Medical Excellence <br/>Every Day</p>
              </div>
              <div className=" py-5 basis-1/3 ">
                <p className="  text-white text-lg font-normal font-['IBM Plex Sans'] leading-">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit</p>
              </div>
              <div className=" py-10 basis-1/3 ">
                <div className="flex justify-center">
                  <Link to="/plan" className="px-10 py-4 w-[70%] bg-button-blue text-white text-xl font-semibold font-serif rounded text-center">About Plan</Link>
                </div>
              </div>
            </div>
        </div>

        <div className="py-14 bg-custom-blue-3 ">
          <div className=" ">
            <Contact />
          </div>
          
        </div>
      </div>
     
      )
}