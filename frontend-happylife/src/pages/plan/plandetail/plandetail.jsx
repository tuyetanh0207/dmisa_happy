import Insurance from '../../../assets/Insurance.jpg'
import Review from './review'
import Contact  from './contact'
import Header from '../header.jsx'

export default function Plandetail() {
    
    const plansdetail = [
        {
          planName: "Title",
          image:Insurance,
          title1:"Title",
          title2:"Title",
          description: "Description ",
          description2: "Description ",
          description3: "Description ",
          benefits: ["Temp", "Temp", "Temp", "Temp", "Temp"],
          quote:"Quote temp",
          customerName:"Name"
        },

      ];


    return (
        <div className=" bg-custom-blue-3">
            <Header/>
            {plansdetail.map((plandetail, index) => ( 
            <div key={index} className='pt-20 pb-20 container mx-auto '>
                                
                <h1 className="pb-14  text-center text-4xl font-semibold font-serif text-custom-blue">{plandetail.planName}</h1>
                    <div className="flex items-center justify-center ">
                        <img src={plandetail.image} alt="LOGO" className="item-center" ></img>
                    </div>
                <div className="pt-6 pb-14 container mx-auto  max-w-6xl">
                    <h1 className="pt-14 pb-4 text-3xl font-semibold font-serif text-custom-blue">{plandetail.title1}</h1>
                    <p className="pt-5 pb-10 text-2xl">{plandetail.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className=" p-4">
                        <ul className="pl-7 text-xl list-image-store">
                            {plandetail.benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                            ))}
                </ul>
                        </div>
                        <div className=" p-4">
                            <img src={plandetail.image} alt="LOGO" className="item-center" ></img>
                        </div>
                    </div>
                    <h1 className="pt-14 pb-4 text-3xl font-semibold font-serif text-custom-blue">{plandetail.title2}</h1>
                    <p className="pt-5 pb-10 text-2xl">{plandetail.description2}</p>
                    <div className="pt-6 pb-14 container mx-auto bg-custom-blue-2 max-w-6xl">
                        <div className="pt-5 container mx-auto max-w-[900px]">
                            <h1 className="pt-14 pb-4 text-3xl  font-semibold font-serif text-custom-blue"> {plandetail.quote} </h1>
                            <p className="pt-5  text-2xl text-custom-blue">{plandetail.customerName}</p>
                        </div>
                    </div>
                    <p className="pt-10 pb-10 text-2xl">{plandetail.description3}</p>
                </div>
                
            </div>
            ))}
            
            <Review/>
            <Contact/>
        </div>
        

    )
  }
  