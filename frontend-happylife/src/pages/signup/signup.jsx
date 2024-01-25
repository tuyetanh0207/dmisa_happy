import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/authApi";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoHalfScreen.png";
import { Routes, Route, Link } from "react-router-dom";
import PopupConfirm from '../../components/popConfirm'

const signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [citizenID, setCitizenID] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useNavigate();
  const [noti, setNoti] = useState("");
  const handleSubmit = async (e) => {
    {
      e.preventDefault();
      console.log("signup");
      const newUser = {
        phoneNumber: phoneNumber,
        password: password,
        fullName: fullName,
        gender: gender,
        email: email,
        dob: formatISODateToDDMMYYYY(dob),
        address: address,
        citizenId: citizenID,
      };
      console.log("new User", newUser);
      try {
        const registerRes = await registerUser(newUser, dispatch, router);
        console.log("Res");
        if (registerRes?.data) {
          setIsPopupOpen(true);

          //console.log("SET POPUP = true");
        } else {
          setIsPopupOpen(true);
          setNoti(registerRes);
          console.log("SET POPUP = false");
        }
      } catch (err) {
        console.log("err in regis page: ", err);
      }
    }
  };

  const formatISODateToDDMMYYYY = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-screen h-screen flex">
      {isPopupOpen === true && (
        <PopupConfirm
          realtimeNoti={noti}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          popupState={false}
        />
      )}
      <Link to="/home" className="w-[50%] h-[100%]">
        <div className="flex w-[100%] h-[100%] bg-blue-950 border border-indigo-500 flex items-center justify-center">
          <img src={Logo} className="w-[50%] h-[45%]"></img>
        </div>
      </Link>
      <div className="righthalf  w-[50%] h-[100%]  bg-slate-50 flex items-center justify-center">
        <div className="w-auto h-auto bg-white rounded-lg border border-gray-200 ">
          <h2 className="text-center text-[30px] font-serif font-semibold mx-[150px] pt-[20px] pb-2">
            Create an account
          </h2>
          <form
            className="font-sans font-medium text-xs"
            onSubmit={(e) => {
              e.preventDefault();
              if (password !== confirmPassword) {
                setNoti("Passwords are not match.")
                setIsPopupOpen(true)
              } else {
                handleSubmit(e);
              }
            }}
          >
            <div>
              <label className="ml-[86px]">Username (Phone number)</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                className="text-black w-[400px] h-auto border border-input-border-grey border-solid rounded p-[10px] mb-2"
                id="phonenumber"
                placeholder="User name"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label className="ml-[86px] ">Full Name</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                className="text-black w-[400px] h-auto border border-input-border-grey rounded p-[10px] mb-2"
                id="fullname"
                placeholder="Full name"
                onChange={(e) => setFullName(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label className="ml-[86px] ">Password</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                className="text-black text-xs w-[400px]  h-auto border border-input-border-grey rounded p-[10px] mb-2"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label className="ml-[86px] ">Confirm password</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                className="text-black text-xs  w-[400px] h-auto border border-input-border-grey rounded mb-2"
                id="confirmpassword"
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></input>
            </div>

            <div>
              <label className="ml-[86px]">Gender</label>
              <label className="ml-[170px]">Birthday</label>
            </div>
            <div>
              <select
                id="gender"
                name="gender"
                className="text-black text-xs  w-[190px] h-auto ml-[86px] border border-input-border-grey rounded mb-2"
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="Male" label="Male"></option>
                <option value="Female" label="Female"></option>
              </select>
              <input
                className="text-black text-xs  w-[190px] h-auto ml-[20px] border border-input-border-grey rounded mb-2"
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label className="ml-[86px] ">Citizen ID</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                className="text-black w-[400px] h-auto  border border-input-border-grey rounded p-[10px] mb-2"
                id="citizenid"
                placeholder="Citizen ID"
                onChange={(e) => setCitizenID(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label className="ml-[86px] ">Email</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                className="text-black w-[400px] h-auto  border border-input-border-grey rounded p-[10px] mb-2"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>

            <div>
              <label className="ml-[86px]">Address</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                className="text-black w-[400px] h-auto  border border-input-border-grey rounded p-[10px] mb-4"
                id="address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              ></input>
            </div>

            <div className="flex items-center justify-center font-bold text-xl mb-2">
              <button
                className="bg-button-blue w-[400px] h-auto py-[10px]  text-white rounded-lg"
                //onClick={()=>handleSubmit}
              >
                Create
              </button>
            </div>
            <div className="flex justify-center mb-[20px]">
              <label className="text-gray-500 text-base font-normal leading-tight mr-[4px] mt-[3px]">
                Already have an account?
              </label>
              <Link key="login" to="/login">
                <button className="text-blue-600 text-base font-medium leading-tight mt-1">
                  Log in
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signup;
