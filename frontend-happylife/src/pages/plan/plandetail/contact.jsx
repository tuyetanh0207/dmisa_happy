export default function Review() {
  return (
    <div className="pt-14 pb-14 bg-custom-blue-3 mx-auto max-w-4xl">
      <div className="pt-6 pb-14 container mx-auto bg-white">
        <h1 className="pt-10 text-center text-4xl font-semibold font-serif text-custom-blue-3">Contact with Us</h1>
        
        <form className="pt-6 pb-4container mx-auto pl-24 pr-24 max-w-3xl ">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Name
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

                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Service
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="service"
                        id="service"
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Time
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="time"
                        id="time"
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="pt-8 sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Message
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="time"
                        id="time"
                        className="block w-full h-32 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            <button className="mt-10 bg-button-blue text-white text-xl font-semibold font-serif rounded text-center w-full h-14">Make an Appointment</button>
        </form>
        
      </div>
      
    </div>
  );
}





  