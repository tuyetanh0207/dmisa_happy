import Help from './help.jsx'
import Insurance from '../../assets/Insurance.jpg'
import Arrow from '../../assets/Arrow.png'
import Header from './header.jsx'

export default function Plan() {
    const plans = [
      {
        planName: "Title 1",
        description: "Description 1",
        benefits: ["Temp", "Temp", "Temp", "Temp", "Temp"],
        image:Insurance,
      },
      {
        planName: "Title 2",
        description: "Description 2",
        benefits: ["Temp", "Temp", "Temp", "Temp", "Temp"],
        image:Insurance,
      },
      {
        planName: "Title 3",
        description: "Description 3",
        benefits: ["Temp", "Temp", "Temp", "Temp", "Temp"],
        image:Insurance,
      },
      {
        planName: "Title 4",
        description: "Description 4",
        benefits: ["Temp", "Temp", "Temp", "Temp", "Temp"],
        image:Insurance,
      },
      {
        planName: "Title 5",
        description: "Description 5",
        benefits: ["Temp", "Temp", "Temp", "Temp", "Temp"],
        image:Insurance,
      },
      {
        planName: "Title 6",
        description: "Description 6",
        benefits: ["Temp", "Temp", "Temp", "Temp", "Temp"],
        image:Insurance,
      },
    ];
  
    return (
      <div className="bg-custom-blue-3">
        <Header />
        <div className="pt-20 pb-20 container mx-auto items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <img src={plan.image} alt="LOGO" className="rounded-lg" />
                <h5 className="pb-3 pt-5 pl-3 text-2xl font-medium">{plan.planName}</h5>
                <p className="pb-3 pl-3 text-2xl">{plan.description}</p>
                <h5 className="pt-3 pl-3 text-2xl font-medium text-custom-blue-3">Benefit</h5>
                <ul className="pl-7 text-xl list-image-store">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
                <div className="pt-4 flex flex-row flex-wrap">
                  <a href="/plandetail" rel="noopener noreferrer" className="ml-auto">
                    <img src={Arrow} alt="socialmedia" className="cursor-pointer order-last" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Help />
      </div>
    );
  }
  