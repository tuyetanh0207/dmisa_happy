import Header from '../header.jsx'
export default function Buyplan() {
    const plans = [
        {
            planName: ["Temp1", "Temp2", "Temp3", "Temp4", "Temp5"],
        },

      ];
    return (
      <div className=" bg-custom-blue-3 ">
        <Header/>
        <div className="pt-6 pb-14 container mx-auto bg-white">
          <form className="pt-6 pb-4 container mx-auto pl-24 pr-24 max-w-6xl bg-green-700 ">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Full Name
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                  </div>
  
                  <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Phone Number
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                  </div>
  
                  <div className="sm:col-start-1 col-end-7">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Email
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="email"
                          id="email"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                  </div>
                  <div className="sm:col-start-1 col-end-7">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                          Address
                      </label>
                      <div className="mt-2">
                          <input
                          type="text"
                          name="address"
                          id="address"
                          className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                  </div>
                  {plans.map((plan, index) => (
                    <form key={index} className="sm:col-start-1 col-end-7">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Select your Plan</label>
                            <select className="sm:col-start-1 col-end-7 block w-full border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ">
                            {plan.planName.map((planName, i) => (
                                <option key={i}>{planName}</option>
                            ))}
                            </select>
                    </form>
                   ))}
              </div>
              <div className=" pt-5 pb-5 text-2xl font-semibold font-serif text-custom-blue-3 ">100,000 VND</div>
                <div className="flex flex-col mb-5">
                    <div className="flex items-center h-5">
                        <input type="checkbox" value="" className="w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 text-blue-500" required></input>
                        <label className="pl-3 block text-md font-medium leading-6 text-gray-900">Remember me</label>
                    </div>
                </div>
                <button className="mt-10 bg-button-blue text-white text-xl hover:bg-blue-800 font-semibold font-serif rounded text-center w-48 h-14">Confirm</button>
          </form>
          
        </div>
        
      </div>

    );
  }
