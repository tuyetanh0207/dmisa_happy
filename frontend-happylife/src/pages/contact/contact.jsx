import Contactinplan from '../plan/plandetail/contact'
import Phonebutton from '../../assets/PhoneButton.png'
import AddressIcon from '../../assets/AddressIcon.png'
import Mail from '../../assets/Mail.png'

export default function Contact() {
      
      return(
        <div className="relative bg-custom-blue-3">
          <div className="my-20 py-20 px-20 container mx-auto items-center bg-white">
            <div className="grid grid-cols-2 ">
              <div className="">
                <div className="py-20 px-20 flex flex-col gap-5">
                  <div className="text-5xl font-medium font-['IBM Plex Serif']">Where to Find</div>
                  <div className="text-5xl text-custom-blue-3 font-medium font-['IBM Plex Serif']">HappyLife</div>
                  <div className="text-2xl font-normal font-['IBM Plex Sans']">Quis risus sed vulputate odio ut. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Orci ac auctor augue mauris augue neque gravida</div>
                  <div className="py-4 flex flex-col gap-5">
                    <div className="flex flex-row  gap-7">
                      <div className=" ">
                        <img src={Phonebutton} style={{ width: '60px', height: '60px' }} ></img>
                      </div>
                      <div className="basis-5/6 text-[20px] font-medium font-['IBM Plex Sans'] ">
                        1- 207 296 - 0701
                        <br/>
                        1-928-278-6856
                      </div>
                    </div>
                    <div className="flex flex-row  gap-7">
                      <div className=" ">
                        <img src={AddressIcon} style={{ width: '60px', height: '60px' }} ></img>
                      </div>
                      <div className="basis-5/6 text-[20px] font-medium font-['IBM Plex Sans'] ">
                        23 Lavender Street, Billings,
                        <br/>
                        59106 United States
                      </div>
                    </div>
                    <div className="flex flex-row  gap-7">
                      <div className=" ">
                        <img src={Mail} style={{ width: '60px', height: '60px' }} ></img>
                      </div>
                      <div className="basis-5/6 text-[20px] font-medium font-['IBM Plex Sans'] ">
                        opto-template@mail.com 
                        <br/>
                        opto@test.com
                      </div>
                    </div>
                    
                  </div>
                  <div className="text-lg font-normal font-['IBM Plex Sans']">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</div>
                </div>
              </div>
              <Contactinplan/>
            </div>
          </div>
      </div>
     
      )
}