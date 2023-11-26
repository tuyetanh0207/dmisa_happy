import Insurance from '../../assets/Insurance.jpg'


export default function Plandetail() {
    return (
        <div className=" bg-custom-blue-3">
            <div className='pt-20 pb-20 container mx-auto bg-green-500 '>
                <h1 className="pb-14  text-center text-4xl font-semibold font-serif text-custom-blue">PLAN TITLE</h1>
                    <div className="flex items-center justify-center ">
                        <img src={Insurance} alt="LOGO" className="item-center" ></img>
                    </div>
                <div className="pt-6 pb-14 container mx-auto bg-red-300 max-w-6xl">
                    <h1 className="pt-14 pb-4 text-3xl font-semibold font-serif text-custom-blue">PLAN TITLE</h1>
                    <p className="pt-5 pb-10 text-2xl">Decription</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className=" p-4">
                            <ul className="pl-7  text-2xl list-image-store">
                                <li>Temp</li>
                                <li>Temp</li>
                                <li>Temp</li>
                                <li>Temp</li>
                                <li>Temp</li>  
                            </ul>
                        </div>
                        <div className=" p-4">
                            <img src={Insurance} alt="LOGO" className="item-center" ></img>
                        </div>
                    </div>
                    <h1 className="pt-14 pb-4 text-3xl font-semibold font-serif text-custom-blue">PLAN TITLE</h1>
                    <p className="pt-5 pb-10 text-2xl">Decription</p>
                    <div className="pt-6 pb-14 container mx-auto bg-custom-blue-2 max-w-6xl"></div>
                </div>
                
            </div>
        </div>


    )
  }
  
  
  