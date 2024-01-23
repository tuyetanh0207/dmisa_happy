/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import styles from "./regisManagerPopup.module.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import gStyles from "../../../style";
import { XMarkIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useSelector } from "react-redux";
import PlanAPI from "../../../../api/plansApi";
import PlanTypeComp from "../planTypeComp";
import AppButton from "../appButton/button";
import NoElementGif from "../../../assets/gifs/noElemnt.gif";
import RegistrationAPI from "../../../../api/registrationApi";
import { statusArrayOfRegistration } from "../../../resource/status";
import { colTitlesInRegistration } from "../../../pages/staff/insurancemanagement/registration/registration";
import RegistrationManagerPopup from "./regisManagerPopup";
import { apiV1, baseUrl } from "../../../../api/generic";
import axios from 'axios'
const PlanManagerPopup = (props) => {
  const { data, onClose, onUpdate } = props;
  const [updatingPlan, setUpdatingPlan] = useState(
    JSON.parse(JSON.stringify(data))
  );
  const [currentTab, setCurrentTab] = useState("Overview");
  const [isLoadingSavingOverview, setIsLoadingSavingOverview] = useState("0");
  const [isLoadingSavingImage, setIsLoadingSavingImage] = useState("0");
  const [message, setMessage] = useState("");
  const tabNames = ["Overview", "Plan Types", "Customers", "Images"];
  const [isLock, setIsLock] = useState(false);
  const pageNumber = 1;
  const [IdOfEnrollmentisLoading, setIdOfEnrollmentisLoading] = useState([]);
  const [loadingBtns, setLoadingBtns] = useState("0");
  const [isEditingOverview, setIsEditingOverview] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [numOfNewImage, setNumOfNewImage] = useState(0);
  const [newImageArray, setNewImageArray] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const user = useSelector((state) => state.auth.login.currentUser);
  const [selectedEnrollmentRow, setSelectedEnrollmentRow] = useState(null);
  const handleSelectingEnrollmentRow = (row) => {
    setSelectedEnrollmentRow(row);
  };
  const handleCloseEnrollmentPopup = () => {
    setSelectedEnrollmentRow(null);
  };
  const handleEditOverviewBtnClick = () => {
    console.log('hihi')
    setIsEditingOverview(!isEditingOverview);
    var updatedClaimScenarios = [...updatingPlan.claimScenarios, ""];
    var updatedDocumentTypes = [...updatingPlan.documentName, ""];
    var updatingPlanBenefits = [...updatingPlan.planBenefits, ""];
    var featureList = [
      ...updatingPlan.planAdvertisement[
        updatingPlan.planAdvertisement.length - 1
      ].featuresList,
      { featureName: "", featureDetails: [""] },
    ];
    var featureDetails = [
      ...updatingPlan.planAdvertisement[
        updatingPlan.planAdvertisement.length - 1
      ].featuresList[featureList.length - 2].featureDetails,
      "",
    ];
    var updatedAdvertisements = [
      ...updatingPlan.planAdvertisement,
      { title: "", featuresList: [] },
    ];
    updatedAdvertisements.forEach((e, idx) => {
      e.featuresList.forEach((ee, innerIdx) => {
        updatedAdvertisements[
          idx
        ].featuresList[innerIdx].featureDetails = [...updatedAdvertisements[
          idx
        ].featuresList[innerIdx].featureDetails  , "" ];
      })

      updatedAdvertisements[
        idx
      ].featuresList = [...updatedAdvertisements[
        idx
      ].featuresList, {featureName: "", featureDetails: [""] }];
    })
    console.log('up', updatedAdvertisements)
    updatedAdvertisements[
      updatingPlan.planAdvertisement.length - 1
    ].featuresList = featureList;
    updatedAdvertisements[
      updatingPlan.planAdvertisement.length - 1
    ].featuresList[featureList.length - 2].featureDetails = featureDetails;
    var updatedDocuments = [
      ...updatingPlan.planDocuments,
      { docTitle: "", docUrl: "" },
    ];

    setUpdatingPlan({
      ...updatingPlan,

      claimScenarios: updatedClaimScenarios,
      documentName: updatedDocumentTypes,
      planBenefits: updatingPlanBenefits,
      planAdvertisement: updatedAdvertisements,
      planDocuments: updatedDocuments,
    });
    console.log("data", data);
  };
  const handleEditImageBtnClick = () => {
    setIsEditingImage(!isEditingImage);
  };
  const handleSaveOverviewBtnClick = async () => {
    try {
      setIsLoadingSavingOverview("1");
      const nonEmptyClaimScenarios =
        updatingPlan.claimScenarios.filter(Boolean);
      const nonEmptyDocumentTypes = updatingPlan.documentName.filter(Boolean);
      const nonEmptyPlanBenefits = updatingPlan.planBenefits.filter(Boolean);
      const nonEmptyAdvertisements = updatingPlan.planAdvertisement
        .map((adv) => ({
          ...adv,
          featuresList: adv.featuresList
            .map((feat) => ({
              ...feat,
              featureDetails: feat.featureDetails.filter(
                (detail) => detail.trim() !== ""
              ),
            }))
            .filter((feat) => feat.featureName.trim() !== ""),
        }))
        .filter((adv) => adv.title.trim() !== "");

      const nonEmptyDocuments = updatingPlan.planDocuments.filter(
        (doc) => doc.docUrl !== "" && doc.docTitle !== ""
      );
      console.log("Non-empty Documents:", nonEmptyDocuments);
      // Create a new plan object without empty elements
      const newPlan = {
        ...updatingPlan,
        claimScenarios: nonEmptyClaimScenarios,
        documentName: nonEmptyDocumentTypes,
        planBenefits: nonEmptyPlanBenefits,
        planAdvertisement: nonEmptyAdvertisements,
        planDocuments: nonEmptyDocuments,
      };
      console.log("new Plan", newPlan);
      const res = await PlanAPI.updateOnePlanByStaff(
        data.planId,
        newPlan,
        user.token
      );

      if (res) {
        setIsLoadingSavingOverview("0");
        setIsEditingOverview(false);
        setUpdatingPlan(res.data);
      //  onUpdate();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancelOverviewBtnClick = () => {
    console.log("cancel");
    setIsEditingOverview(false);
    setUpdatingPlan(data);
  };
  const handleUpdateOverview = (value, field) => {
    setUpdatingPlan({ ...updatingPlan, [field]: value });
  };

  const handleUpdateClaimScenario = (value, index) => {
    var updatedClaimScenarios = [...updatingPlan.claimScenarios];
    if (index === updatedClaimScenarios.length - 1) {
      updatedClaimScenarios = [...updatingPlan.claimScenarios, ""];
    }
    updatedClaimScenarios[index] = value;

    setUpdatingPlan({
      ...updatingPlan,
      claimScenarios: updatedClaimScenarios,
    });
  };

  const handleUpdateDocumentTypes = (value, index) => {
    var updatedDocumentTypes = [...updatingPlan.documentName];
    if (index === updatedDocumentTypes.length - 1) {
      updatedDocumentTypes = [...updatingPlan.documentName, ""];
    }
    updatedDocumentTypes[index] = value;

    setUpdatingPlan({
      ...updatingPlan,
      documentName: updatedDocumentTypes,
    });
  };

  const handleUpdatePlanBenefits = (value, index) => {
    var updatingPlanBenefits = [...updatingPlan.planBenefits];
    if (index === updatingPlan.planBenefits.length - 1) {
      updatingPlanBenefits = [...updatingPlan.planBenefits, ""];
    }

    updatingPlanBenefits[index] = value;
    setUpdatingPlan({
      ...updatingPlan,
      planBenefits: updatingPlanBenefits,
    });
  };

  const handleUpdateAdvertisementTitle = (value, index) => {
    // Update the 'updatingPlan' state for the advertisement title at the specified index
    var updatedAdvertisements = [...updatingPlan.planAdvertisement];
    if (index === updatedAdvertisements.length - 1) {
      updatedAdvertisements = [
        ...updatingPlan.planAdvertisement,
        {
          title: "",
          featuresList: [{ featureName: "", featureDetails: [""] }],
        },
      ];
    }
    updatedAdvertisements[index].title = value;
    setUpdatingPlan({
      ...updatingPlan,
      planAdvertisement: updatedAdvertisements,
    });
    return;
  };

  const handleUpdateAdvertisementFeatureName = (value, idx, idxFea) => {
    // Update the 'updatingPlan' state for the advertisement feature name at the specified indices
    var updatedAdvertisements = [...updatingPlan.planAdvertisement];
    if (idxFea === updatedAdvertisements[idx].featuresList.length - 1) {
      updatedAdvertisements[idx].featuresList = [
        ...updatedAdvertisements[idx].featuresList,
        { featureName: "", featureDetails: [""] },
      ];
    }
    updatedAdvertisements[idx].featuresList[idxFea].featureName = value;
    //
    setUpdatingPlan({
      ...updatingPlan,
      planAdvertisement: updatedAdvertisements,
    });
  };

  const handleUpdateAdvertisementFeatureDetails = (
    value,
    idx,
    idxFea,
    idxDetail
  ) => {
    var updatedAdvertisements = [...updatingPlan.planAdvertisement];
    if (
      idxDetail ===
      updatedAdvertisements[idx].featuresList[idxFea].featureDetails.length - 1
    ) {
      updatedAdvertisements[idx].featuresList[idxFea].featureDetails = [
        ...updatedAdvertisements[idx].featuresList[idxFea].featureDetails,
        "",
      ];
    }
    updatedAdvertisements[idx].featuresList[idxFea].featureDetails[idxDetail] =
      value;
    //

    setUpdatingPlan({
      ...updatingPlan,
      planAdvertisement: updatedAdvertisements,
    });
  };
  const handleUpdateDocument = (value, idx, fieldName) => {
    // Update the 'updatingPlan' state for the advertisement feature details at the specified indices
    var updatedDocuments = [...updatingPlan.planDocuments];
    if (fieldName === "docTitle" && idx === updatedDocuments.length - 1) {
      updatedDocuments = [...updatedDocuments, { docTitle: "", docUrl: "" }];
    }
    updatedDocuments[idx] = { ...updatedDocuments[idx], [fieldName]: value };
    setUpdatingPlan({
      ...updatingPlan,
      planDocuments: updatedDocuments,
    });
  };
  const handleMouseOver = (event) => {
    event.target.title = event.target.innerText;
  };
  const handleDeleteOneRowInClaimScenario = (idx) => {
    var updatedClaimScenarios = [...updatingPlan.claimScenarios];
    console.log("first", updatedClaimScenarios);
    updatedClaimScenarios = updatedClaimScenarios.filter(
      (item, index) => index != idx
    );
    console.log("second", updatedClaimScenarios);
    console.log("delete one row in claim scenario");
    setUpdatingPlan({
      ...updatingPlan,
      claimScenarios: updatedClaimScenarios,
    });
  };
  const handleDeleteOneRowInDocumentTypes = (idx) => {
    var updatedDocumentTypes = [...updatingPlan.documentName];
    updatedDocumentTypes = updatedDocumentTypes.filter(
      (item, index) => index !== idx
    );

    setUpdatingPlan({
      ...updatingPlan,
      documentName: updatedDocumentTypes,
    });
  };

  const handleDeleteOneRowInPlanBenefits = (idx) => {
    var updatingPlanBenefits = [...updatingPlan.planBenefits];
    updatingPlanBenefits = updatingPlanBenefits.filter(
      (item, index) => index !== idx
    );

    setUpdatingPlan({
      ...updatingPlan,
      planBenefits: updatingPlanBenefits,
    });
  };

  const handleDeleteOneRowInAdvertisement = (idx) => {
    var updatedAdvertisements = [...updatingPlan.planAdvertisement];
    updatedAdvertisements = updatedAdvertisements.filter(
      (item, index) => index !== idx
    );

    setUpdatingPlan({
      ...updatingPlan,
      planAdvertisement: updatedAdvertisements,
    });
  };

  const handleDeleteOneRowInDocuments = (idx) => {
    var updatedDocuments = [...updatingPlan.planDocuments];
    updatedDocuments = updatedDocuments.filter((item, index) => index !== idx);

    setUpdatingPlan({
      ...updatingPlan,
      planDocuments: updatedDocuments,
    });
  };
  const handleDeleteOneRowInFeatureListOfAdvertisement = (idx, idxFea) => {
    console.log(idx, idxFea);
    var updatedAdvertisements = [...updatingPlan.planAdvertisement];
    var updatedFeatures = updatedAdvertisements[idx].featuresList.filter(
      (item, index) => index !== idxFea
    );
    updatedAdvertisements[idx].featuresList = updatedFeatures;

    setUpdatingPlan({
      ...updatingPlan,
      planAdvertisement: updatedAdvertisements,
    });
  };
  const handleDeleteOneRowInFeatureOfFeatureListOfAdvertisement = (
    idx,
    idxFea,
    idxDetail
  ) => {
    var updatedAdvertisements = [...updatingPlan.planAdvertisement];
    var updatedFeatureDetail = updatedAdvertisements[idx].featuresList[
      idxFea
    ].featureDetails.filter((item, index) => index !== idxDetail);
    updatedAdvertisements[idx].featuresList[idxFea].featureDetails =
      updatedFeatureDetail;

    setUpdatingPlan({
      ...updatingPlan,
      planAdvertisement: updatedAdvertisements,
    });
  };
  const fetchEnrollments = async () => {
    const res = await RegistrationAPI.getAllEnrollOfPlan(
      user.token,
      data.planId,
      statusArrayOfRegistration
    );

    setEnrollments(res.data);
  };
  useEffect(() => {
    fetchEnrollments();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      fetchEnrollments();
    }, 100000);
  }, []);
  const handleUpdateStatusOfRegistration = async (
    regisId,
    regis,
    approvalStatus
  ) => {
    if (IdOfEnrollmentisLoading.includes(regisId)) {
      return;
    }
    setIdOfEnrollmentisLoading((t) => [...t, regisId]);
    console.log("regis", regis);
    try {
      const res = await RegistrationAPI.updateStatusOfRegistration(
        user.token,
        regisId,
        { ...regis, approvalStatus },
        { content: message }
      );
      // setIsLoadingUpdateStatusOfEnrollement("0");
      setEnrollments((prevenrollments) =>
        prevenrollments.map((enrollment) =>
          enrollment.regisId === regisId
            ? { ...enrollment, approvalStatus: approvalStatus }
            : enrollment
        )
      );
      setIdOfEnrollmentisLoading((t) =>
        t.filter((id) => id !== res.data.regisId)
      );
    } catch (e) {
      console.log("", e);
    }
  };
  const findIndexOfImageInArray = (url) => {
    return newImageArray.indexOf(url);
  };
  const handleClickImageWhenEditing = (idx, url) => {
    if (findIndexOfImageInArray(url) >= 0) {
      setNewImageArray([...newImageArray.filter((img) => img != url)]);
    } else {
      setNewImageArray([...newImageArray, url]);
    }
  };
  const handleSaveImageBtnClick = async () => {
    try {
      setIsLoadingSavingImage("1");
      const newPlan = {
        planURL: newImageArray,
      };

      const res = await PlanAPI.updateOnePlanByStaff(
        data.planId,
        newPlan,
        user.token
      );
      // console.log(res.data);

      if (res) {
        setIsLoadingSavingImage("0");
        setIsEditingImage(false);
        setUpdatingPlan({ ...res.data, planURL: res.data.planURL });
        setNewImageArray([]);
      //  onUpdate();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancelImageBtnClick = () => {
    setNewImageArray([]);
    setIsEditingImage(false);
  };
  const [isOpeningUploadComp, setIsOpeningUploadComp] = useState(0);
  const handleUploadBtnClick = () => {
    setIsOpeningUploadComp(1);
  };
  const [files, setFiles] = useState([]);
  const [isSavingUploadingImage, setIsSavingUploadingImage] = useState(0)
  const handleFileChange = (event) => {
    const inputFile = event.target.files;
    console.log('inputfile:',inputFile);
    console.log('inputfile:',inputFile[0].name);
    
    setFiles(inputFile);
    
  };
  const uploadNewImages = async ()  => {
    if(isSavingUploadingImage===1){
      return
    }
    setIsSavingUploadingImage(1)
    const formData = new FormData();
    const url = apiV1+ "/plans/update/"+data.planId+"/image-planUrl";
    for (let i = 0; i < files.length; i++) {

      formData.append('files', files[i]);
    }
    console.log(url)
    axios.put(url, formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`

        }
      })
        .then(response => {
          setUpdatingPlan({
            ...updatingPlan,
            planURL: response.data.planURL
          })
        
          setIsSavingUploadingImage(0)
          setIsOpeningUploadComp(0)
          // Handle the response as needed
        })
        .catch(error => {
          console.error('Error in uploading image planURL:', error);
          // Handle errors
        });
  }
  return (
    <div className={`${styles.popupOverlay}`} onClick={onClose}>
      <div
        className={`${styles.popup} z-0`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <XMarkIcon className="w-4 h-4" />
        </button>
        <div className={`${styles.content} sm:h-[60em] z-10`}>
          {/* Hiển thị thông tin chi tiết tùy thuộc vào dữ liệu (data) */}
          <h2 className={`text-[1.2em] font-semibold ${styles.h2}`}>
            Plan details
          </h2>
          {/* nav */}
          <div
            className={`${styles.nav} border-b border-gray-300 w-[90%] flex mt-6 z-10`}
          >
            {tabNames.map((e) => (
              <div
                key={e}
                className={`mr-20 p-2 ${
                  currentTab === e
                    ? "border-b border-blue-600 border-b-[2px] transition border-b ease-in-out duration-500"
                    : ""
                } cursor-pointer`}
                onClick={() => setCurrentTab(e)}
              >
                {e}
              </div>
            ))}
          </div>

          {/* 2 colums */}
          {currentTab === "Overview" && (
            <div
              className={`${styles.content}
             
              flex justify-center sm:h-[80%] lg:h-[80%] md:h-auto z-0 mt-[16px]`}
            >
              {/* col1 - user */}

              <div className="">
                <div className="flex flex-cols-2 mb-7">
                  <PencilIcon
                    className=" w-8 h-8 text-custom-blue-2 flex ml-auto"
                    onClick={() => handleEditOverviewBtnClick()}
                  />
                </div>

                <div className="flex flex-cols-2 mb-7">
                  <p className="mr-10 w-60">Plan Name:</p>
                  {isEditingOverview ? (
                    <input
                      placeholder="Add more . . ."
                      type="text"
                      value={updatingPlan.planName}
                      className="input-class w-full mb-4"
                      key={"updatingPlan.planName"}
                      onChange={(e) =>
                        handleUpdateOverview(e.target.value, "planName")
                      }
                    />
                  ) : (
                    <p>{updatingPlan.planName}</p>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">Slogan:</p>
                  {isEditingOverview ? (
                    <input
                      placeholder="Add more . . ."
                      type="text"
                      value={updatingPlan.planSlogan}
                      className="input-class w-full mb-4"
                      key={"updatingPlan.planSlogan"}
                      onChange={(e) =>
                        handleUpdateOverview(e.target.value, "planSlogan")
                      }
                    />
                  ) : (
                    <p>{updatingPlan.planSlogan}</p>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">About:</p>
                  {isEditingOverview ? (
                    <input
                      placeholder="Add more . . ."
                      type="text"
                      value={updatingPlan.planAbout}
                      key={"updatingPlan.planAbout"}
                      className="input-class w-full mb-4 max-w-60"
                      onChange={(e) =>
                        handleUpdateOverview(e.target.value, "planAbout")
                      }
                    />
                  ) : (
                    <p className="max-w-lg">{updatingPlan.planAbout}</p>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">Plan Duration:</p>
                  {isEditingOverview ? (
                    <input
                      placeholder="Add more . . ."
                      type="text"
                      value={updatingPlan.planDuration}
                      key={"updatingPlan.planDuration"}
                      className="input-class w-full mb-4"
                      onChange={(e) =>
                        handleUpdateOverview(e.target.value, "planDuration")
                      }
                    />
                  ) : (
                    <p>{updatingPlan.planDuration}</p>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">Plan Duration Unit:</p>
                  {isEditingOverview ? (
                    <input
                      placeholder="Add more . . ."
                      type="text"
                      value={updatingPlan.planDurationUnit}
                      key={"updatingPlan.planDurationUnit"}
                      className="input-class w-full mb-4"
                      onChange={(e) =>
                        handleUpdateOverview(e.target.value, "planDurationUnit")
                      }
                    />
                  ) : (
                    <p>{updatingPlan.planDurationUnit}</p>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">Claim Scenarios:</p>
                  {isEditingOverview ? (
                    <div className="w-full">
                      {updatingPlan.claimScenarios.map((e, idx) => (
                        <div
                          key={"scenario_div" + idx}
                          className="flex items-center relative mb-4 w-full"
                        >
                          <input
                            placeholder="Add more . . ."
                            className="input-class w-full block "
                            key={"scenario" + idx}
                            type="text"
                            value={e}
                            onChange={(ev) =>
                              handleUpdateClaimScenario(ev.target.value, idx)
                            }
                          />
                          {e !== "" && (
                            <MinusCircleIcon
                              className="w-4 h-4 text-custom-red-2 ml-6 absolute right-[-2.5em]"
                              onClick={() =>
                                handleDeleteOneRowInClaimScenario(idx)
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {updatingPlan.claimScenarios.map((e, idx) => (
                        <p key={e + idx}>{e}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">Document Types:</p>
                  {isEditingOverview ? (
                    <div className="w-full">
                      {updatingPlan.documentName.map((e, idx) => (
                        <div
                          key={"documentname_div" + idx}
                          className="flex items-center relative mb-4 w-full"
                        >
                          <input
                            placeholder="Add more . . ."
                            className="input-class w-full block  mb-4"
                            key={"documentname" + idx}
                            type="text"
                            value={e}
                            onChange={(ev) =>
                              handleUpdateDocumentTypes(ev.target.value, idx)
                            }
                          />
                          {e !== "" && (
                            <MinusCircleIcon
                              className="w-4 h-4 text-custom-red-2 ml-6 absolute right-[-2.5em]"
                              onClick={() =>
                                handleDeleteOneRowInDocumentTypes(idx)
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {updatingPlan.documentName.map((e, idx) => (
                        <p key={e}>{e}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Plan Benefits */}
                <div className="flex mb-7">
                  <p className="mr-10 w-60">Plan Benefits:</p>
                  {isEditingOverview ? (
                    <div className="w-full">
                      {updatingPlan.planBenefits.map((e, idx) => (
                        <div
                          key={"benefits_div" + idx}
                          className="flex items-center relative mb-4 w-full"
                        >
                          <input
                            placeholder="Add more . . ."
                            className="input-class w-full block  mb-4"
                            key={"benefits" + idx}
                            type="text"
                            value={e}
                            onChange={(ev) =>
                              handleUpdatePlanBenefits(ev.target.value, idx)
                            }
                          />
                          {e !== "" && (
                            <MinusCircleIcon
                              className="w-4 h-4 text-custom-red-2 ml-6 absolute right-[-2.5em]"
                              onClick={() =>
                                handleDeleteOneRowInPlanBenefits(idx)
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {updatingPlan.planBenefits.map((e, idx) => (
                        <p key={e}>{e}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">Plan Service Coverage:</p>
                  {isEditingOverview ? (
                    <input
                      placeholder="Add more . . ."
                      type="text"
                      value={updatingPlan.planServiceCoverage}
                      className="input-class w-full mb-4"
                      key={"planServiceCoverage"}
                      onChange={(e) =>
                        handleUpdateOverview(
                          e.target.value,
                          "planServiceCoverage"
                        )
                      }
                    />
                  ) : (
                    <p>{updatingPlan.planServiceCoverage}</p>
                  )}
                </div>
                <div className="flex mb-7">
                  <p className="mr-10 w-60">Advertisement:</p>
                  {isEditingOverview ? (
                    <div className="w-full">
                      {updatingPlan.planAdvertisement.map((e, idx) => (
                        <div key={"advertisement_div" + idx}>
                          <div className="flex items-center relative mb-4 w-full">
                            {idx + 1 + ". "}
                            <input
                              placeholder="Add more . . ."
                              type="text"
                              value={e.title}
                              key={"advertisement" + idx}
                              className="input-class w-full mb-4"
                              onChange={(ev) =>
                                handleUpdateAdvertisementTitle(
                                  ev.target.value,
                                  idx
                                )
                              }
                            />
                            {e.title !== "" && (
                              <MinusCircleIcon
                                className="w-4 h-4 text-custom-red-2 ml-6 absolute right-[-2.5em]"
                                onClick={() =>
                                  handleDeleteOneRowInAdvertisement(idx)
                                }
                              />
                            )}
                          </div>
                          <div className="ml-10">
                            {e.featuresList.map((fea, idxFea) => (
                              <div
                                key={"advertisement_feature_div" + idxFea}
                                className="w-full"
                              >
                                <div className="flex items-center relative mb-4 w-full">
                                  <p className="w-12">
                                    {" "}
                                    {idx + 1 + ". " + (idxFea + 1) + ". "}
                                  </p>

                                  <input
                                    placeholder="Add more . . ."
                                    type="text"
                                    value={fea.featureName}
                                    key={"advertisement_feature" + idx + idxFea}
                                    className="input-class w-full mb-4"
                                    onChange={(ev) =>
                                      handleUpdateAdvertisementFeatureName(
                                        ev.target.value,
                                        idx,
                                        idxFea
                                      )
                                    }
                                  />
                                  {fea.featureName !== "" && (
                                    <MinusCircleIcon
                                      className="w-4 h-4 text-custom-red-2 ml-6 absolute right-[-2.5em]"
                                      onClick={() =>
                                        handleDeleteOneRowInFeatureListOfAdvertisement(
                                          idx,
                                          idxFea
                                        )
                                      }
                                    />
                                  )}
                                </div>
                                <div className="w-full">
                                  {fea.featureDetails.map(
                                    (feaDetails, idxDetail) => (
                                      <div
                                        key={"advertise_div_3" + idxDetail}
                                        className="flex items-center relative mb-4 w-full"
                                      >
                                        <input
                                          placeholder="Add more . . ."
                                          className="input-class ml-20 block mb-4 w-[80%]"
                                          type="text"
                                          key={
                                            "AdvertisementFeatureDetails" +
                                            idx +
                                            idxFea +
                                            idxDetail
                                          }
                                          value={feaDetails}
                                          onChange={(ev) =>
                                            handleUpdateAdvertisementFeatureDetails(
                                              ev.target.value,
                                              idx,
                                              idxFea,
                                              idxDetail
                                            )
                                          }
                                        />
                                        {feaDetails !== "" && (
                                          <MinusCircleIcon
                                            className="w-4 h-4 text-custom-red-2 ml-6 absolute right-[-2.5em]"
                                            onClick={() =>
                                              handleDeleteOneRowInFeatureOfFeatureListOfAdvertisement(
                                                idx,
                                                idxFea,
                                                idxDetail
                                              )
                                            }
                                          />
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {updatingPlan.planAdvertisement.map((e, idx) => (
                        <div key={"advertisement_div" + idx}>
                          <div className="">
                            {idx + 1 + ". "}
                            {e.title}
                          </div>
                          <div className="ml-10">
                            {e.featuresList.map((fea, idxFea) => (
                              <div key={"advertisement_feature_div" + idxFea}>
                                <div>
                                  {idx +
                                    1 +
                                    ". " +
                                    (idxFea + 1) +
                                    ". " +
                                    fea.featureName}
                                </div>
                                <div>
                                  {fea.featureDetails.map(
                                    (feaDetails, idxDetail) => (
                                      <p className="ml-10" key={feaDetails}>
                                        {idx +
                                          1 +
                                          ". " +
                                          (idxFea + 1) +
                                          ". " +
                                          (idxDetail + 1) +
                                          " "}{" "}
                                        {feaDetails}
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">Plan Documents:</p>
                  {isEditingOverview === true ? (
                    <div className="w-full">
                      {updatingPlan.planDocuments.map((e, idx) => (
                        <div key={"documents_div" + idx} className="w-full">
                          <div className="w-full">
                            {idx + 1 + ". "}
                            <div
                              key={"documents_div_2" + idx}
                              className="flex items-center relative mb-4 w-full"
                            >
                              <input
                                placeholder="Add more . . ."
                                type="text"
                                value={e.docTitle}
                                key={"e.docTitle" + idx}
                                className="input-class w-full block mb-4"
                                onChange={(ev) =>
                                  handleUpdateDocument(
                                    ev.target.value,
                                    idx,
                                    "docTitle"
                                  )
                                }
                              />
                              {e.docTitle !== "" && (
                                <MinusCircleIcon
                                  className="w-4 h-4 text-custom-red-2 ml-6 absolute right-[-2.5em]"
                                  onClick={() =>
                                    handleDeleteOneRowInDocuments(idx)
                                  }
                                />
                              )}
                            </div>

                            <input
                              placeholder="Add more . . ."
                              type="text"
                              value={e.docUrl}
                              key={"e.docUrl" + idx}
                              className="input-class w-[91%] mb-4 ml-10"
                              onChange={(ev) =>
                                handleUpdateDocument(
                                  ev.target.value,
                                  idx,
                                  "docUrl"
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {isEditingOverview === false &&
                        updatingPlan.planDocuments.map((e, idx) => (
                          <div key={e}>
                            <div className="">
                              {idx + 1 + ". "}
                              {e.docTitle}
                            </div>
                            <div className="w-80 h-10 overflow-hidden text-custom-blue-2 italic">
                              <a
                                href={e.docUrl}
                                className={styles.ellipsis}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseOver={handleMouseOver}
                              >
                                {e.docUrl}
                              </a>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex mb-7">
                  <p className="mr-10 w-60">Created At:</p>
                  <p className="">
                    {updatingPlan.planCreatedAt
                      ? updatingPlan.planCreatedAt.slice(0, 10)
                      : ""}
                  </p>
                </div>
                <div className="flex mb-7">
                  <p className="mr-10 w-60">Updated At:</p>
                  <p className="">
                    {updatingPlan.planUpdatedAt
                      ? updatingPlan.planUpdatedAt.slice(0, 10)
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentTab === "Plan Types" && (
            <div
              className={`${styles.content}  sm:h-[80%] lg:h-[80%] md:h-auto relative z-0 mt-[16px]`}
            >
              {updatingPlan.planType.map((type) => (
                <PlanTypeComp
                  data={type}
                  key={type.typeName}
                  className="mb-20"
                />
              ))}
            </div>
          )}
          {currentTab === "Customers" && (
            <div
              className={`${styles.content} flex flex-cols-1 relative z-0 mt-[16px]`}
            >
              <table className="w-full">
                <thead>
                  <tr>
                    {colTitlesInRegistration.map((e) =>
                      e === "No." ? (
                        <th className="pl-8 pr-2 py-4 text-left" key={e}>
                          {e}
                        </th>
                      ) : (
                        <th className="px-2 py-4 text-left" key={e}>
                          {e}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {enrollments?.map((item, index) => (
                    // item.ApprovalStatus === filterStatus ||
                    // filterStatus === "All") &&
                    // (startDate === "" || startDate <= item.createdAt) &&
                    // (endDate === "" ||
                    //   endDate >= item.createdAt.slice(0, 10)) &&
                    // (
                    <tr key={index} className="justify-start">
                      <td className="border-t border-gray-300 pl-8 pr-2 py-2">
                        {index + 1}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.customerInfo.fullName}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.customerInfo.phoneNumber}
                      </td>
                      {/* <td className="border border-gray-300 px-2 py-2">{item.customerInfo.citizenID}</td> */}
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.customerInfo.dob
                          ? item.customerInfo.dob.slice(0, 10)
                          : ""}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.customerInfo.address}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.productInfo.planName}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.productInfo.planType[0].typeName}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.insuranceAmount}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.productInfo.planDuration +
                          " " +
                          item.productInfo.planDurationUnit +
                          "s"}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        {item.createdAt
                          ? item.createdAt.toString().slice(0, 10)
                          : ""}
                      </td>
                      <td
                        className={`border-t border-gray-300 px-2 py-2 font-bold ${
                          item.approvalStatus === "Approved"
                            ? "text-custom-blue-2"
                            : item.approvalStatus === "Pending"
                            ? "text-custom-blue-3"
                            : "text-custom-red-2"
                        }`}
                      >
                        {item.approvalStatus}
                      </td>
                      <td className="border-t border-gray-300 px-2 py-2">
                        <AppButton
                          title="View"
                          textColor={gStyles.buttonBlue}
                          borderColor={gStyles.buttonBlue}
                          bgColor={gStyles.customBlue3}
                          borderRadius={"5px"}
                          paddingY={0}
                          paddingX={4}
                          height={"2em"}
                          data={item}
                          handleSelectingRow={() =>
                            handleSelectingEnrollmentRow(item)
                          }
                        />
                      </td>

                      {item.approvalStatus === "Pending" ? (
                        <>
                          <td className="border-t border-gray-300 px-2 py-2">
                            <AppButton
                              title="Accept"
                              textColor={"#53B271"}
                              borderColor={"#53B271"}
                              bgColor={"#EBFAFA"}
                              borderRadius={"5px"}
                              width={"6em"}
                              height={"2em"}
                              loading={
                                IdOfEnrollmentisLoading.includes(item.regisId)
                                  ? "1"
                                  : ""
                              }
                              handleSelectingRow={() =>
                                handleUpdateStatusOfRegistration(
                                  item.regisId,
                                  item,
                                  "Approved"
                                )
                              }
                            />
                          </td>
                          <td className="border-t border-gray-300 px-2 py-2">
                            <AppButton
                              title="Reject"
                              textColor={"#B93735"}
                              borderColor={"#B93735"}
                              bgColor={"#F8D8D8"}
                              borderRadius={"5px"}
                              width={"6em"}
                              height={"2em"}
                              loading={
                                IdOfEnrollmentisLoading.includes(item.regisId)
                                  ? "1"
                                  : ""
                              }
                              handleSelectingRow={() =>
                                handleUpdateStatusOfRegistration(
                                  item.regisId,
                                  item,
                                  "Rejected"
                                )
                              }
                            />
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {item.approvalStatus === "Approved" ? (
                        <>
                          <td className="border-t border-gray-300 px-2 py-2">
                            <AppButton
                              title="Revoke"
                              textColor={"#B93735"}
                              borderColor={"#B93735"}
                              bgColor={"#F8D8D8"}
                              borderRadius={"5px"}
                              width={"6em"}
                              height={"2em"}
                              loading={
                                IdOfEnrollmentisLoading.includes(item.regisId)
                                  ? "1"
                                  : ""
                              }
                              handleSelectingRow={() =>
                                handleUpdateStatusOfRegistration(
                                  item.regisId,
                                  item,
                                  "Revoked"
                                )
                              }
                            />
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {item.approvalStatus === "Rejected" ? (
                        <>
                          <td className="border-t border-gray-300 px-2 py-2">
                            <AppButton
                              title="Accept"
                              textColor={"#53B271"}
                              borderColor={"#53B271"}
                              bgColor={"#EBFAFA"}
                              borderRadius={"5px"}
                              width={"6em"}
                              height={"2em"}
                              loading={
                                IdOfEnrollmentisLoading.includes(item.regisId)
                                  ? "1"
                                  : ""
                              }
                              handleSelectingRow={() =>
                                handleUpdateStatusOfRegistration(
                                  item.regisId,
                                  item,
                                  "Approved",
                                  ""
                                )
                              }
                            />
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedEnrollmentRow && (
                <RegistrationManagerPopup
                  data={selectedEnrollmentRow}
                  onClose={handleCloseEnrollmentPopup}
                />
              )}
            </div>
          )}
          {currentTab === "Images" && (
            <div
              className={`${styles.content} block sm:h-[80%] lg:h-[80%] md:h-auto relative z-0 mt-[16px]`}
            >
              <div className="flex mb-10">
                <div className="flex mb-10 ml-auto">
                  <AppButton
                    title="Upload more..."
                    textColor={gStyles.buttonBlue}
                    // borderColor={gStyles.buttonBlue}
                    // bgColor={gStyles.customBlue3}
                    borderRadius={"5px"}
                    width={"8em"}
                    height={"2em"}
                    loading={loadingBtns}
                    data={null}
                    handleSelectingRow={() => handleUploadBtnClick()}
                  />
                  <PencilIcon
                    className=" w-8 h-8 text-custom-blue-2 flex ml-4"
                    onClick={() => handleEditImageBtnClick()}
                  />
                </div>
              </div>
              {updatingPlan.planURL.length <= 0 ? (
                <div className="flex items-center justify-center w-full">
                  <div className="text-center">
                    <p className="w-full">
                      There is no photo to show here . . .
                    </p>
                    <div className="w-full mx-auto">
                      <img
                        src={NoElementGif}
                        className="w-50 h-50"
                        alt="No Element"
                      />
                    </div>
                  </div>
                </div>
              ):
              <div className="grid gap-2 lg:grid-cols-3 sm:grid-cols-2">
                {updatingPlan.planURL.length > 0 &&
                  updatingPlan.planURL.map((e, idx) =>
                    !isEditingImage ? (
                      <div key={"img" + idx} className=" w-80 h-80">
                        <img src={e} className="gap-2 w-80 h-80 " alt="" />
                      </div>
                    ) : (
                      <div
                        key={"img" + idx}
                        className=" w-80 h-80 flex relative"
                      >
                        <div className="rounded-[100%] overflow-hidden  border border-white border-1 w-7 h-7  flex items-center justify-center absolute right-4 top-4">
                          <div
                            className={` ${
                              findIndexOfImageInArray(e) >= 0
                                ? "bg-blue-600 text-white "
                                : "bg-white opacity-10 "
                            } w-full h-full  flex items-center justify-center `}
                          >
                            <p className="text-sm font-bold ">
                              {findIndexOfImageInArray(e) >= 0
                                ? findIndexOfImageInArray(e) + 1
                                : ""}
                            </p>
                          </div>
                        </div>
                        <img
                          src={e}
                          className="gap-2 w-80 h-80 bg-gray-600"
                          alt=""
                          onClick={() => handleClickImageWhenEditing(idx, e)}
                        />
                      </div>
                    )
                  )}
              </div>}
              {isOpeningUploadComp===1&&
              <>
               <input type="file" onChange={handleFileChange} multiple className='pt-10' />
               <AppButton
                title="Save"
                textColor={gStyles.buttonBlue}
                borderColor={gStyles.buttonBlue}
                bgColor={gStyles.customBlue3}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                loading={isSavingUploadingImage?"1":"0"}
                handleSelectingRow={() =>
                  uploadNewImages()
                }
              />
              </>
             }
              
            </div>
          )}
        </div>
        {/* 2 buttons */}
        <div className={`${styles.buttons} sm:pb-20`}>
          {isEditingOverview === true && (
            <>
              <AppButton
                title="Save"
                textColor={"#53B271"}
                borderColor={"#53B271"}
                bgColor={"#EBFAFA"}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                loading={isLoadingSavingOverview}
                handleSelectingRow={() =>
                  handleSaveOverviewBtnClick(updatingPlan.regisId, "Approved")
                }
              />

              <AppButton
                title="Cancel"
                textColor={gStyles.buttonBlue}
                borderColor={gStyles.buttonBlue}
                bgColor={gStyles.customBlue3}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleCancelOverviewBtnClick(updatingPlan.regisId, "Rejected")
                }
              />
            </>
          )}
          {isEditingImage === true && (
            <>
              <AppButton
                title="Save"
                textColor={"#53B271"}
                borderColor={"#53B271"}
                bgColor={"#EBFAFA"}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                loading={isLoadingSavingImage}
                handleSelectingRow={() => handleSaveImageBtnClick()}
              />

              <AppButton
                title="Cancel"
                textColor={gStyles.buttonBlue}
                borderColor={gStyles.buttonBlue}
                bgColor={gStyles.customBlue3}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                loading={isLoadingSavingImage}
                handleSelectingRow={() => handleCancelImageBtnClick()}
              />
            </>
          )}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default PlanManagerPopup;
