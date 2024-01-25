import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select'
import axios from 'axios'
import Modalsuccess from '../../contact/modalsuccess.jsx'
import Modalerror from '../../contact/modalerror.jsx'
export default function Review() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [isLogin, setIsLogin] = useState(false);

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [serviceType,setServiceType] = useState("");
    const [message,setMessage] = useState("");

    const [modalSuccessOpen,setModalSuccessOpen] = useState(false);
    const [modalErrorOpen,setModalErrorOpen] = useState(false);

    const serviceTypeList = [
        {value:"Tư vấn mua bảo hiểm",label:"Tư vấn mua bảo hiểm"},
        {value:"Tham gia bảo hiểm sức khỏe",label:"Tham gia bảo hiểm sức khỏe"},
        {value:"Tham gia lợi ích tùy chọn",label:"Tham gia lợi ích tùy chọn"},
        {value:"Thông tin điều trị ngoại trú",label:"Thông tin điều trị ngoại trú"},
        {value:"Thông tin các bệnh viện hỗ trợ bảo hiểm",label:"Thông tin các bệnh viện hỗ trợ bảo hiểm"},
    ];
    const handleServiceTypeChange = (selectService) => {
        //const selectedValues = selectService.map(option => option.value);
        setServiceType(selectService.value);
        console.log('Select Categories:',selectService.value)
    }
    const fetchUserInfo = async () => {
        setIsLogin(true);
    
        setFullName(user.userInfo.fullName);
        setPhoneNumber(user.userInfo.phoneNumber);
        setEmail(user.userInfo.email);

      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("//////////////////////////////////////////////////////////");
        if(fullName==""||phoneNumber==""||email==""||serviceType==""||message==""){
            setModalErrorOpen(true)
            return;
        }
        const contact = {
            customerName:fullName,
            phoneNumber:phoneNumber,
            email:email,
            serviceType:serviceType,
            message:message,
        };
    
        const url = "http://localhost:8090/api/v1/contacts/create";
        axios
          .post(url, contact, {
            headers: {
              "Content-Type": "application/json",
              //Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => {
            console.log("Success:", response.data);
            setModalSuccessOpen(true);
          })

          .catch((error) => {
            console.error("Error:", error);
          });
        
      };  

    useEffect(() => {
        fetchUserInfo();

    }, []);

  return (
    
      <div className="pt-6 pb-14 container mx-auto bg-white">
        <h1 className="pt-10 text-center text-4xl font-semibold font-serif text-custom-blue-3">Contact with Us</h1>
        
        <form onSubmit={handleSubmit} className="pt-6 pb-4 container mx-auto pl-24 pr-24 max-w-3xl ">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                <label className="block text-xl font-medium leading-6 text-gray-900">
                    Full Name
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="name"
                    id="name"
                    //value={isLogin ? user.userInfo.fullName : ""}
                    value={fullName}
                    className="block w-full h-10 px-4 border-0 py-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Your Name"
                    onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                    <label className="block text-xl font-medium leading-6 text-gray-900">
                        Phone Number
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="Phone"
                        id="Phone "
                        //value={isLogin ? user.userInfo.phoneNumber : ""}
                        value={phoneNumber}
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Your Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="sm:col-start-1 col-end-7">
                    <label className="block text-xl font-medium leading-6 text-gray-900">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="email"
                        id="email"
                        //value={isLogin ? user.userInfo.email : ""}
                        value={email}
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="sm:col-span-full">
                    <label className="block text-xl font-medium leading-6 text-gray-900">
                        Choose Service Type
                    </label>
                    <Select options={serviceTypeList} onChange={handleServiceTypeChange } />
                </div>

                
            </div>
                <div className="pt-8 sm:col-span-3">
                        <label className="block text-xl font-medium leading-6 text-gray-900">
                            Message
                        </label>
                        <div className="mt-2">
                            <textarea
                            type="text"
                            className="block w-full h-32 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>


                    {modalSuccessOpen && <Modalsuccess closeModal={() => {setModalSuccessOpen(false)}}/>}
                    {modalErrorOpen && <Modalerror closeModal={() => {setModalErrorOpen(false)}}/>}
            <button  className="mt-10 bg-button-blue text-white text-xl font-semibold font-serif rounded text-center w-full h-14">Make an Appointment</button>
        </form>
        
      </div>
      
    
  );
}





  