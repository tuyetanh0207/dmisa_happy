import Insurance from "../../../assets/Insurance.jpg";
import Header from "../header.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import RegistrationAPI from "../../../../api/registrationApi.jsx";
import Shopingcar from "../../../assets/shopingcar.png";
// import SetupProxy from '../../../setupProxy.js'
export default function Buyplan() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isLogin, setIsLogin] = useState(false);
  const [plans, setPlansAPI] = useState([]);

  const [planID, setPlanID] = useState(); //planID

  //const [registrations, setRegistrations] = useState(null);
  const [curentRegistrations, setCurentRegistrations] = useState("");

  //user
  const [fullName, setFullName] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // const [healthStatus,setHealthStatus] =useState('');
  //const [address,setAddress] =useState('');
  //plan
  const [selectedPlan, setSelectedPlan] = useState({});
  const [selectedPlanType, setSelectedPlanType] = useState(null);
  const [selectedAge, setSelectedAge] = useState(0);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(
    selectedPlanType?.benefits[0]?.feeType?.find(
      (t) => t.startAge === selectedAge
    )
  );
  const [feeOfSelectedOptionalBenefit, setFeeOfSelectedOptionalBenefit] =
    useState([
      { fee: 0, isSelected: false, currentIndex: 0 },
      { fee: 0, isSelected: false, currentIndex: 0 },
      { fee: 0, isSelected: false, currentIndex: 0 },
      { fee: 0, isSelected: false, currentIndex: 0 },
      { fee: 0, isSelected: false, currentIndex: 0 },
      { fee: 0, isSelected: false, currentIndex: 0 },
    ]);
  const [planTotalFee, setPlanTotalFee] = useState(0);

  const handlePlanChange = (e) => {
    const planId = e.target.value;
    const _plan = plans?.find((p) => p.planId === planId);
    setSelectedPlan(_plan);
    setPlanID(planId);
  };
  const handlePlanTypeNameChange = (planType) => {
    event.preventDefault();
    setSelectedPlanType(planType);
    setSelectedAgeGroup(
      planType?.benefits[0]?.feeType?.find((t) => t.startAge === selectedAge)
    );
  };
  const handleChangeAgeGroup = (_selectedAgeGroup) => {
    event.preventDefault();
    setSelectedAgeGroup(_selectedAgeGroup);
    setSelectedAge(_selectedAgeGroup.startAge);
    var _feeOfSelectedOptionalBenefits = [...feeOfSelectedOptionalBenefit];
    _feeOfSelectedOptionalBenefits.forEach((benefit, index) => {
      if (benefit.dependency === "ageBased") {
        _feeOfSelectedOptionalBenefits[index] = {
          ..._feeOfSelectedOptionalBenefits[index],
          fee: _selectedAgeGroup?.feeType?.find(
            (type) => type.startAge == selectedAgeGroup?.startAge
          ).fee,
        };
      }
    });
    setFeeOfSelectedOptionalBenefit(_feeOfSelectedOptionalBenefits);
    sumTotalFee(_selectedAgeGroup.fee, _feeOfSelectedOptionalBenefits);
  };

  let optionalSpecialInsuranceAmount;

  const handleSelectSpecialOptionPlan = (event, outerIndex) => {
    event.preventDefault();
    const innerIndex = event.target.value;
    var _feeOfSelectedOptionalBenefits = [...feeOfSelectedOptionalBenefit];

    if (_feeOfSelectedOptionalBenefits.isSelected === false) {
      if (
        selectedPlan.optionalBenefits[outerIndex].dependencies ===
        "insuranceAmount"
      ) {
        _feeOfSelectedOptionalBenefits[outerIndex] = {
          ..._feeOfSelectedOptionalBenefits[outerIndex],
          currentIndex: innerIndex,
          dependency: "insuranceAmount",
        };
      }
    } else {
      _feeOfSelectedOptionalBenefits[outerIndex] = {
        ..._feeOfSelectedOptionalBenefits[outerIndex],
        fee: selectedPlan.optionalBenefits[outerIndex].feeType[innerIndex].fee,
        isSelected: true,
        currentIndex: innerIndex,
      };

      setFeeOfSelectedOptionalBenefit(_feeOfSelectedOptionalBenefits);
      sumTotalFee(selectedAgeGroup?.fee, _feeOfSelectedOptionalBenefits);
    }
  };

  useEffect(() => {
    sumTotalFee(selectedAgeGroup?.fee, feeOfSelectedOptionalBenefit);
  }, [
    selectedAgeGroup,
    feeOfSelectedOptionalBenefit,
    selectedPlanType,
    setSelectedAgeGroup,
    setSelectedPlanType,
  ]);

  const handleOptionalBenefitChange = (selectedBenefit, index) => {
    var _feeOfSelectedOptionalBenefits = [...feeOfSelectedOptionalBenefit];
    if (selectedBenefit.dependencies === "age") {
      if (_feeOfSelectedOptionalBenefits[index].isSelected === false) {
        _feeOfSelectedOptionalBenefits[index] = {
          fee: selectedBenefit?.feeType?.find(
            (type) => type.startAge == selectedAgeGroup?.startAge
          ).fee,
          dependency: selectedBenefit?.feeType?.find(
            (type) => type.startAge == selectedAgeGroup?.startAge
          ).dependencies,
          isSelected: true,
        };
      } else {
        _feeOfSelectedOptionalBenefits[index] = { fee: 0, isSelected: false };
      }
    }
    if (selectedBenefit.dependencies === "insuranceAmount") {
      if (_feeOfSelectedOptionalBenefits[index].isSelected === false) {
        _feeOfSelectedOptionalBenefits[index] = {
          ..._feeOfSelectedOptionalBenefits[index],
          fee: selectedBenefit?.feeType?.[
            _feeOfSelectedOptionalBenefits[index].currentIndex
          ].fee,
          isSelected: true,
        };
      } else {
        _feeOfSelectedOptionalBenefits[index] = {
          ..._feeOfSelectedOptionalBenefits[index],
          fee: 0,
          isSelected: false,
        };
      }
    }

    setFeeOfSelectedOptionalBenefit(_feeOfSelectedOptionalBenefits);
    sumTotalFee(selectedAgeGroup?.fee, _feeOfSelectedOptionalBenefits);
  };

  const [files, setFiles] = useState([]);
  const [isImageFile, setIsImageFile] = useState(false);
  let url1;

  const handleFileChange = (event) => {
    const inputFile = event.target.files;
    console.log("inputfile:", inputFile);
    console.log("inputfile:", inputFile[0].name);
    if (inputFile[0].name.includes(".pdf") == true) {
      console.log("inputfile:", inputFile[0].name.includes(".pdf"));
      setIsImageFile(false);
    } else {
      setIsImageFile(true);
    }
    setFiles(inputFile);
  };

  const sumTotalFee = (mandatoryFee, _feeOfSelectedOptionalBenefits) => {
    var totalFee = mandatoryFee;
    _feeOfSelectedOptionalBenefits.forEach((fee) => {
      if (fee.isSelected === true) totalFee += fee.fee;
    });
    setPlanTotalFee(totalFee);
    return totalFee;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("//////////////////////////////////////////////////////////");
    var selectedOneOptionBenefits = [];
    feeOfSelectedOptionalBenefit.forEach((t, index) => {
     
      if (t.isSelected) {
       
        selectedOneOptionBenefits.push({
          ...selectedPlan.optionalBenefits[index],
          feeType:
          selectedPlan.optionalBenefits[index].dependencies === "age"
              ? selectedPlan.optionalBenefits[index].feeType.filter((type) => type.startAge === selectedAge)
              : [selectedPlan.optionalBenefits[index].feeType[t.currentIndex]],
        });
      }
    });
    const buyPlan = {
      totalFee: planTotalFee,
      customerInfo: {
        id: user.userInfo.id,
        fullName: fullName,
        //citizenId: citizenId,
        citizenId: "0000000000000999",
        phoneNumber: phoneNumber,
        //gender: gender,
        gender: "Male",
        // dob: dob,
        dob: "2002-07-09",
        email: email,
        address: address,
      },
      productInfo: {
        planId: planID,
        planName: selectedPlan.planName,
        planAbout: selectedPlan.planAbout,
        planDuration: 12,
        planDurationUnit: selectedPlan.planDurationUnit,
        planType: [
          {
            typeName: selectedPlanType.planTypeName,

            benefits: [
              {
                benefitName: selectedPlanType.benefits[0].BenefitsName,
                dependencies: selectedPlanType.benefits[0].dependencies,
                feeType: [selectedAgeGroup],
                unit: selectedPlanType.unit,
                insuranceAmount: selectedPlanType.insuranceAmount,
              },
            ],
          },
        ],
        optionalBenefits: selectedOneOptionBenefits,
      },
    };

    const url = "http://localhost:8090/api/v1/registrations/create";
    axios
      .post(url, buyPlan, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        const newRegisId = response.data.regisId;
        setCurentRegistrations(newRegisId);
        //console.log('Current: ',curentRegistrations)
        console.log("123:", newRegisId);

        const fileCounts = [{ section: "Insurant:", fileCount: files.length }];

        console.log("true/false: ", isImageFile);
        if (isImageFile == true) {
          url1 = `http://localhost:8090/api/v1/registrations/update/${newRegisId}/image-docUrl`;
        } else {
          url1 = `http://localhost:8090/api/v1/registrations/update/${newRegisId}/files-docUrl`;
        }
        console.log("URL: ", url1);
        const formData = new FormData();

        formData.append("fileCounts", JSON.stringify(fileCounts));
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }

        //console.log('file url: ',fileURL)
        axios
          .put(url1, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Success:", response.data);
            console.log("file: ", files);
            console.log("FormData: ", formData);
            // Handle the response as needed
          })
          .catch((error) => {
            console.error("Error:", error);
            console.log("file: ", files);
            console.log("FormData: ", formData);
            // Handle errors
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // console.log('Current: ',curentRegistrations)
  };

  const fetchPlan = async () => {
    fetch("http://localhost:8090/api/v1/plans")
      .then((res) => res.json())
      .then((data) => {
        // console.log("data:", data)
        setPlansAPI(data);
        if (data.length > 0) {
          setPlanID(data[data.length - 1].planId);
          setSelectedPlan(data[data.length - 1]);
        }
      });
  };

  const fetchUserInfo = async () => {
    setIsLogin(true);

    setFullName(user.userInfo.fullName);
    setCitizenId(user.userInfo.citizenId);
    setPhoneNumber(user.userInfo.phoneNumber);
    setGender(user.userInfo.gender);
    setDob(user.userInfo.dob.slice(0, 10));
    setEmail(user.userInfo.email);
    setAddress(user.userInfo.address);
  };

  useEffect(() => {
    fetchUserInfo();
    fetchPlan(); // Fetch plans
  }, []);

  //   console.log("PLANS:", plans);
  //console.log("planID:",planID);
  // console.log("registrations:",registrations);
  //   console.log("User:", user);
  // console.log("UserLogin:",user.userInfo.fullName);
  // console.log("UserID:",user.userInfo.id);
  //console.log("Select plan:",selectPlan);
  //console.log("Select plan.type:",selectPlan.planId);

  return (
    <div className=" bg-custom-blue-3 ">
      <Header />
      <div className="mt-14   pt-6 pb-14 container mx-auto bg-white">
        <form
          onSubmit={handleSubmit}
          className="pt-6 pb-4  container mx-auto pl-24 pr-24 max-w-6xl  "
        >
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
                  value={isLogin ? user.userInfo.fullName : ""}
                  className="block w-full h-10 px-4 border-0 py-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your Name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xl font-medium leading-6 text-gray-900">
                Citizen ID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Citizen-ID"
                  id="Citizen-ID"
                  value={isLogin ? user.userInfo.citizenId : ""}
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your Citizen ID"
                  onChange={(e) => setCitizenId(e.target.value)}
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
                  value={isLogin ? user.userInfo.phoneNumber : ""}
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xl font-medium leading-6 text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Gender"
                  id="Gender"
                  value={isLogin ? user.userInfo.gender : ""}
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your Gender"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xl font-medium leading-6 text-gray-900">
                Date of birth
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="BirthDate"
                  id="BirthDate"
                  value={isLogin ? user.userInfo.dob.slice(0, 10) : ""}
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your BirthDate"
                  onChange={(e) => setDob(e.target.value)}
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
                  value={isLogin ? user.userInfo.email : ""}
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-start-1 col-end-7">
              <label className="block text-xl font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={isLogin ? user.userInfo.address : ""}
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <form className="sm:col-start-1 col-end-7">
              <label className=" pb-5 block text-xl font-medium leading-6 text-gray-900">
                Choose your Plan
              </label>
              <select
                value={planID}
                className="sm:col-start-1 col-end-7 block w-full border-0 py-3 text-custom-blue-3 shadow-sm ring-1 ring-inset ring-custom-blue- placeholder:text-custom-blue-3 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm"
                onChange={handlePlanChange}
              >
                {plans?.map((plan, index) => (
                  <option
                    key={index}
                    value={plan.planId}
                    selected={plan.planId === planID}
                  >
                    {plan.planName}
                  </option>
                ))}
              </select>

              {planID && (
                <div className="pt-12 ">
                  {selectedPlan && (
                    <Link
                      to={`/plan/${planID}`}
                      className="flex flex-row items-center bg-white border-2 border-gray-600  rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-y-auto"
                    >
                      <div className="basis-1/2">
                        <img
                          className="pl-4 pt-4 pb-4 object-cover w-full h-96 rounded-t-lg  "
                          src={Insurance}
                          alt=""
                        />
                      </div>
                      <div className="basis-1/2">
                        <div className=" pl-14 flex flex-col justify-evenly p-4 leading-normal overflow-y-10">
                          <h5 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {selectedPlan?.planName}
                          </h5>
                          <p className="mb-3 text-2xl font-normal overflow-y-auto ">
                            {/* {selectedPlan?.planAbout} */}
                          </p>
                          <p className="mb-3 text-2xl font-normal">
                            {selectedPlan?.planType?.typeName}
                          </p>
                          <p className="mb-3 text-2xl font-normal text-custom-blue-3 ">
                            Benefit
                          </p>
                          {selectedPlan?.planBenefits?.map((benefit, index) => (
                            <ul
                              key={index}
                              className="pl-7 text-xl list-image-store"
                            >
                              <li className="text-xl font-normal  ">
                                {benefit}
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </Link>
                  )}

                  {selectedPlan && (
                    <div>
                      <label className="block text-xl font-medium leading-6 text-gray-900">
                        Choose Plan Type
                      </label>
                      <div className="grid grid-cols-4 gap-4">
                        {selectedPlan?.planType?.map((item, index) => (
                          <div key={index} className=" text-center">
                            <button
                              value={item.typeName}
                              onClick={() => handlePlanTypeNameChange(item)}
                              className={`border-gray-600 border-2 rounded-lg w-full h-full ${
                                selectedPlanType === item ? "bg-gray-200" : ""
                              }`}
                            >
                              {item.typeName}
                              <br />

                              {item.benefits &&
                                item?.benefits?.map((item2, index) => (
                                  <div key={index} className=" text-center">
                                    {item2.insuranceAmount} {item2.unit}
                                  </div>
                                ))}
                            </button>
                          </div>
                        ))}
                      </div>

                      {selectedPlanType && (
                        <div>
                          <p className="mb-3 text-2xl font-normal">
                            Selected Benefits:
                          </p>
                          {selectedPlanType?.benefits?.map((benefit, index) => (
                            <div key={index} className="text-xl font-normal">
                              <div>{benefit.benefitName}</div>
                              {/* <div>{benefit.dependencies}</div> */}

                              <div className="pt-10 grid grid-cols-4 gap-4">
                                {benefit?.feeType?.map((item3, index) => (
                                  <button
                                    key={index}
                                    className={`border-gray-600 border-2 rounded-lg w-full h-full ${
                                      selectedAgeGroup?.startAge ===
                                      item3.startAge
                                        ? "bg-gray-200"
                                        : ""
                                    }`}
                                    onClick={() => handleChangeAgeGroup(item3)}
                                  >
                                    <div>
                                      From {item3.startAge}-{item3.endAge} age{" "}
                                    </div>
                                    <div>
                                      {item3.fee} {benefit.unit}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* ----------------------------- */}

                      {selectedPlan && (
                        <div>
                          <label className="pt-10 block text-xl font-medium leading-6 text-gray-900">
                            Choose Optional Benefit
                          </label>
                          <div className="grid grid-cols-4 gap-4">
                            {selectedPlan?.optionalBenefits?.map(
                              (item, index) => (
                                <div key={index} className="text-xl">
                                  <div className="">
                                    <div className="flex flex-row items-center ">
                                      <input
                                        type="checkbox"
                                        value={item.benefitName}
                                        onChange={() =>
                                          handleOptionalBenefitChange(
                                            item,
                                            index
                                          )
                                        }
                                        checked={
                                          feeOfSelectedOptionalBenefit[index]
                                            .isSelected === true
                                        }
                                        className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      ></input>
                                      {/* <input id={index} type="checkbox" value={item.benefitName} onChange={(e)=>handleOptionalBenefitChange(e,index)} className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input> */}
                                      <div className="flex flex-col items-center ">
                                        <label className="ms-2 font-medium text-gray-900 dark:text-gray-300">
                                          {item.benefitName}
                                        </label>
                                        {/* {selectedOptionalBenefits.map((a,i)=><div key={i}>{a}</div>)} */}
                                        <div>
                                          {item.dependencies == "age" &&
                                            item?.feeType?.map(
                                              (item2, index) => (
                                                <div key={index}>
                                                  {selectedAgeGroup?.startAge ===
                                                    item2.startAge && (
                                                    <div>{item2.fee}</div>
                                                  )}
                                                </div>
                                              )
                                            )}
                                          {item.dependencies ==
                                            "insuranceAmount" && (
                                            <div>
                                              <select
                                                onChange={(event) =>
                                                  handleSelectSpecialOptionPlan(
                                                    event,
                                                    index
                                                  )
                                                }
                                              >
                                                {item?.feeType?.map(
                                                  (item2, index2) => (
                                                    <option
                                                      key={index2}
                                                      className="overflow-x-1"
                                                      value={index2}
                                                      selected={
                                                        feeOfSelectedOptionalBenefit[
                                                          index
                                                        ].currentIndex ===
                                                        index2
                                                      }
                                                    >
                                                      Quyền lợi:{" "}
                                                      {item2.insuranceAmount}
                                                      <br />
                                                      <div>
                                                        {" "}
                                                        Mức giá: {
                                                          item2.fee
                                                        }{" "}
                                                      </div>
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <div>
                      <input type="file" onChange={handleFileChange} multiple />
                      {/* <input type="text" placeholder="File Counts" onChange={handleFileCountChange} /> */}
                      {/* <button onClick={handleUpload}>Upload</button> */}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div></div>
                    <div className="pt-10 pb-10 px-0 py-4  text-2xl  font-bold font-['IBM Plex Sans'] text-custom-blue-3">
                      Totals: {planTotalFee} VND
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div></div>
                <button
                  onClick={handleSubmit}
                  className="px-32 py-6 text-2xl flex flex-row bg-indigo-50 rounded border font-bold font-['IBM Plex Sans'] text-custom-blue-3 border-indigo-500"
                >
                  <img
                    src={Shopingcar}
                    alt="LOGO"
                    className="item-center"
                  ></img>
                  <p className="pl-6">Payment</p>
                </button>
              </div>
            </form>
          </div>
        </form>
        <div>current: {curentRegistrations}</div>
        <div>{optionalSpecialInsuranceAmount}</div>
      </div>
    </div>
  );
}