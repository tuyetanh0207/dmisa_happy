/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./regisManagerPopup.module.css";

import { LockClosedIcon, LockOpenIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useSelector } from "react-redux";
import RegistrationAPI from "../../../../api/registrationApi";
import {
  calculateAge,
  createMessageForRegistration,
} from "../../../supportFunctions";
import AppButton from "../appButton/button";
import EntityVerticalDisplay from "../entityVerticalDisplay";
const RegistrationManagerPopup = (props) => {
  console.log("pdfjs", pdfjs.version);

  const { data, onClose } = props;
  const [currentTab, setCurrentTab] = useState("Overview");
  const [message, setMessage] = useState("");
  const tabNames = ["Overview", "Documents", "Messages"];
  const [isLock, setIsLock] = useState(false);
  const pageNumber = 1;
  const [loadingBtns, setLoadingBtns] = useState("0");
  const user = useSelector((state) => state.auth.login.currentUser);

  const [currentFile, setCurrentFile] = useState(
    data.documentUrls
      ? {
          docName: `${data.documentUrls[0].docCategory} - 0`,
          url: data.documentUrls[0].urls[0],
        }
      : {}
  );
  const handleUpdateStatusOfRegistration = async (regisId, approvalStatus) => {
    setLoadingBtns("1");
    try {
      const res = await RegistrationAPI.updateStatusOfRegistration(
        user.token,
        regisId,
        { ...data,
          approvalStatus,
        },
        { content: message }
      );
      setLoadingBtns("0");
      data.approvalStatus = res.data.approvalStatus;
      data.message = res.data.message;
    } catch (e) {
      console.log("", e);
    }
  };

  return (
    <div className={`${styles.popupOverlay}`} onClick={onClose}>
      <div className={`${styles.popup}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <XMarkIcon className="w-4 h-4" />
        </button>
        <div className={`${styles.content} sm:h-[60em]`}>
          {/* Hiển thị thông tin chi tiết tùy thuộc vào dữ liệu (data) */}
          <h2 className={`text-[1.2em] font-semibold ${styles.h2}`}>
            Registration details
          </h2>
          {/* nav */}
          <div
            className={`${styles.nav_above} border-b border-gray-300 w-[90%] flex mt-6`}
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
              className={`${styles.content} lg:flex lg:flex-col-2 md:flex-1 sm:h-[80%] lg:h-[80%] md:h-auto relative mt-[16px]`}
            >
              {/* col1 - user */}

              <EntityVerticalDisplay
                entityType="user"
                attributes={[
                  "img",
                  "ID",
                  "Full Name",
                  "Customer's name",
                  "Citizen ID",
                  "Address",
                  "Phone Number",
                  "Email",
                  "Birthday",
                  "Age",
                  "Gender",
                  "Insurance Amount",
                  "Registration Status",
                  "Registration Date",
                  "Contract ID",
                ]}
                values={[
                  "",
                  data.customerInfo.id,
                  data.customerInfo.fullName,
                  data.customerInfo.fullName,
                  data.customerInfo.citizenId,
                  data.customerInfo.address,
                  data.customerInfo.phoneNumber,
                  data.customerInfo.email,
                  data.customerInfo.dob
                    ? data.customerInfo.dob.slice(0, 10)
                    : "",
                  data.customerInfo.dob
                    ? calculateAge(data.customerInfo.dob)
                    : "",
                  data.customerInfo.gender,
                  data.insuranceAmount,
                  data.approvalStatus,
                  data.createdAt ? data.createdAt.slice(0, 10) : "",
                  data.contractIdInfo,
                ]}
              />
              <EntityVerticalDisplay
                entityType="user"
                attributes={[
                  "img",
                  "ID",
                  "Plan Name",
                  "Plan Type",
                  "Plan Optional Benefits",
                  "Plan Duration",
                  "Plan Service Coverage",
                ]}
                values={[
                  "",
                  data.productInfo.planId,
                  data.productInfo.planName,
                  data.productInfo.planType,

                  data.productInfo.optionalBenefits,
                  data.productInfo.planDuration +
                    " " +
                    data.productInfo.planDurationUnit +
                    "s",
                  data.productInfo.planServiceCoverage,
                ]}
              />
            </div>
          )}
          {currentTab === "Documents" && (
            <div
              className={`${styles.content} lg:flex lg:flex-col-2 md:flex-1 sm:h-[80%] lg:h-[80%] md:h-auto relative z-0 mt-[16px]`}
            >
              {/* min images */}
              <div className={`${styles.pdf_container_left} w-1/5 mt-10`}>
                <div>
                  {data.documentUrls &&
                    data.documentUrls.map((doctype) =>
                      doctype.urls.map((doc, idx) => (
                        <div className="mb-2" key={idx}>
                          <Document
                            file={doc}
                            className={styles.document_small}
                            onClick={() =>
                              setCurrentFile({
                                docName: `${doctype.docCategory} - ${idx}`,
                                url: doc,
                              })
                            }
                          >
                            <Page
                              pageNumber={pageNumber}
                              renderTextLayer={false}
                              className={styles.page_small}
                            />
                          </Document>
                          <p>
                            {doctype.docCategory} {" - "} {idx}{" "}
                          </p>
                        </div>
                      ))
                    )}
                </div>

                <div></div>
              </div>
              {/* large images */}
              <div className={`${styles.pdf_container_right} w-4/5`}>
                <p className="ml-4 mb-4 items-center">{currentFile.docName}</p>
                <Document
                  file={currentFile.url}
                  className={styles.document_large}
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    className={styles.page_large}
                  />
                </Document>
              </div>
            </div>
          )}
          {currentTab === "Messages" && (
            <div
              className={`${styles.content} lg:flex lg:flex-col-2 md:flex-1 sm:h-[80%] lg:h-[80%] md:h-auto relative z-0 mt-[16px]`}
            >
              {data.message && (
                <div>
                  {data.message.map((msg) => (
                    <div key={msg} className="mb-4">
                      <p className="italic text-sm">
                        {msg.dateMessage ? msg.dateMessage.slice(0, 19) : ""}:
                      </p>
                      <p className="">{msg.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* large images */}
            </div>
          )}
        </div>
        {/* 2 buttons */}
        {/* <div className="flex"> */}
        <div className={`${styles.buttons} sm:pb-20`}>
          {data.approvalStatus === "Pending" ? (
            <>
              <AppButton
                title="Accept"
                textColor={"#53B271"}
                borderColor={"#53B271"}
                bgColor={"#EBFAFA"}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                onMouseOver={() =>
                  setMessage(
                    createMessageForRegistration(message, isLock, "Approved")
                  )
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfRegistration(data.regisId, "Approved")
                }
              />

              <AppButton
                title="Reject"
                textColor={"#B93735"}
                borderColor={"#B93735"}
                bgColor={"#F8D8D8"}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                onMouseOver={() =>
                  setMessage(
                    createMessageForRegistration(message, isLock, "Rejected")
                  )
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfRegistration(data.regisId, "Rejected")
                }
              />
            </>
          ) : (
            <></>
          )}
          {data.approvalStatus === "Approved" ? (
            <>
              <AppButton
                title="Revoke"
                textColor={"#B93735"}
                borderColor={"#B93735"}
                bgColor={"#F8D8D8"}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                onMouseOver={() =>
                  setMessage(
                    createMessageForRegistration(message, isLock, "Revoked")
                  )
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfRegistration(data.regisId, "Revoked")
                }
              />
            </>
          ) : (
            <></>
          )}
          {data.approvalStatus === "Rejected" ? (
            <>
              <AppButton
                title="Accept"
                textColor={"#53B271"}
                borderColor={"#53B271"}
                bgColor={"#EBFAFA"}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                onMouseOver={() =>
                  setMessage(
                    createMessageForRegistration(message, isLock, "Approved")
                  )
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfRegistration(data.regisId, "Approved")
                }
              />
            </>
          ) : (
            <></>
          )}

          <div></div>

          <div className="flex justify-center gap-4 items-center">
            <p>Message:</p>
            <textarea
              value={message}
              placeholder="Edit your message here..."
              className="text-gray-400 italic w-[30em]"
              onChange={(e) => setMessage(e.target.value)}
            />
            {isLock ? (
              <LockClosedIcon
                className="w-6 h-6 text-custom-blue-3 cursor-pointer"
                onClick={() => setIsLock(!isLock)}
              />
            ) : (
              <LockOpenIcon
                className="w-6 h-6 text-custom-blue-2 cursor-pointer"
                onClick={() => setIsLock(!isLock)}
              />
            )}
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default RegistrationManagerPopup;
