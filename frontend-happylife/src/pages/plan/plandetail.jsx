import Phone from '../../assets/phone.png'

const navigation =[
    { name: 'Contact', href: '/contact', current: false }, 

  ]


export default function Help() {
    return (
        <div className="pb-20 bg-white">

                <div className="pt-10 container mx-auto  ">
              
                    <div className="pb-10 basis-1/2 flex flex-row " >
                        <div className="basis-1/3">

                            <div className="grid-rows-2">
                                <h1 className="pb-5 text-4xl font-semibold font-serif text-custom-blue">Our Clinic is Open & Ready to Help!</h1>
                                {navigation.map((item) => (
                                    <a key={item.name} href={item.href} className='btnSignup'>
                                            <button className="bg-button-blue text-white rounded text-center py-4 px-28">Make an Appointment
                                            </button>
                                    </a>
                                ))}
                            </div>

                        </div>   
                        <div className="basis-1/6 ">{/*temp to sizing*/}
                            <div className="grid-rows-2"></div>
                        </div>  

                        <div className="basis-1/2">

                            <div className="grid-rows-3">
                                <h3 className="pb-5 pt-3 text-2xl font-semibold  text-custom-blue">Get Medical Excellence Every Day Let's Book an Appointment by Phone!</h3>
                                <div className='flex flex-row space-x-4' >
                                    <img src={Phone} alt="LOGO" ></img>
                                    <h3 className="pb-5 text-4xl font-sans font-bold text-custom-blue-3">123 45 67 890</h3>
                                </div>
                            </div>
                        </div>          
                    </div>
                  
                </div>    
              

          
        </div>
    )
  }
  
  
  