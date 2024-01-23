/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  LockClosedIcon,
  LockOpenIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useSelector } from "react-redux";
import ClaimAPI from "../../../../api/claimApi";
import gStyles from "../../../style";
import { calculateAge, createMessageForClaim } from "../../../supportFunctions";
import AppButton from "../appButton/button";
import ClaimInvoiceTable from "../claimInvoiceTable";
import EntityVerticalDisplay from "../entityVerticalDisplay";
import styles from "./regisManagerPopup.module.css";
const ClaimManagerPopup = (props) => {
  const { data, onClose } = props;
  const [currentTab, setCurrentTab] = useState("Overview");
  const [message, setMessage] = useState("");
  const tabNames = ["Overview", "Documents", "Messages"];
  const [isLock, setIsLock] = useState(false);
  const pageNumber = 1;
  const [loadingBtns, setLoadingBtns] = useState("0");
  const user = useSelector((state) => state.auth.login.currentUser);
  const clonedClaimInvoices = JSON.parse(JSON.stringify(data.claimInvoices));
  const [requestTotal, setRequestTotal] = useState(data.claimTotalRequest);
  const [claimTotal, setClaimTotal] = useState(data.claimAmount);
  const [currentFile, setCurrentFile] = useState(
    data.documentUrls
      ? {
          docName: `${data.documentUrls[0].docCategory} - 0`,
          url: data.documentUrls[0].urls[0],
        }
      : {}
  );
  const handleUpdateStatusOfClaim = async (claimId, status) => {
    setLoadingBtns("1");
    try {
      const res = await ClaimAPI.updateStatusOfClaim(
        user.token,
        claimId,
        { ...data, status },
        { content: message }
      );
      setLoadingBtns("0");
      data.status = res.data.status;
      data.message = res.data.message;
    } catch (e) {
      console.log("", e);
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <XMarkIcon className="w-4 h-4" />
        </button>
        <div className={`${styles.content} sm:h-[60em]`}>
          {/* Hiển thị thông tin chi tiết tùy thuộc vào dữ liệu (data) */}
          <h2 className={`text-[1.2em] font-semibold ${styles.h2}`}>
            Claim details
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
              className={`${styles.content} lg:flex lg:flex-col-2 md:flex-1 sm:h-[80%] lg:h-[80%] md:h-auto relative z-0 mt-[16px]`}
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
                  "Claim ID",
                  "Claim Total Request",
                  "Claim Categories",
                  "Claim Amount",
                  "Note",
                  "Hospital",
                  "Claim Status",
                  "Claim Date",
                  "Claim Last Update",

                  //  "Contract ID",
                ]}
                values={[
                  "",
                  data.regisInfo.customerInfo.id,
                  data.regisInfo.customerInfo.fullName,
                  data.regisInfo.customerInfo.fullName,
                  data.regisInfo.customerInfo.citizenId,
                  data.regisInfo.customerInfo.address,
                  data.regisInfo.customerInfo.phoneNumber,
                  data.regisInfo.customerInfo.email,
                  data.regisInfo.customerInfo.dob
                    ? data.regisInfo.customerInfo.dob.slice(0, 10)
                    : "",
                  data.regisInfo.customerInfo.dob
                    ? calculateAge(data.regisInfo.customerInfo.dob)
                    : "",
                  data.regisInfo.customerInfo.gender,
                  data.claimId,
                  data.claimTotalRequest,
                  data.claimCategories,
                  data.claimAmount,
                  data.claimContent,
                  data.hospitalName,
                  data.status,
                  data.createdAt ? data.createdAt.slice(0, 10) : "",
                  data.updatedAt ? data.updatedAt.slice(0, 10) : "",
                  //data.contractIdInfo,
                ]}
              />
              <div className="block">
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
                    data.regisInfo.productInfo.planId,
                    data.regisInfo.productInfo.planName,
                    data.regisInfo.productInfo.planType,
                    data.regisInfo.productInfo.optionalBenefits,
                    data.regisInfo.productInfo.planDuration +
                      " " +
                      data.regisInfo.productInfo.planDurationUnit +
                      "s",
                    data.regisInfo.productInfo.planServiceCoverage,
                  ]}
                />
              </div>
              <ClaimInvoiceTable
                claimId={data.claimId}
                invoices={clonedClaimInvoices}
                requestTotal={requestTotal}
                setRequestTotal={setRequestTotal}
                claimTotal={claimTotal}
                setClaimTotal={setClaimTotal}
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
                            file={doc ? doc : ""}
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
                  {data.claimInvoices &&
                    data.claimInvoices.map(
                      (invoice, idxInvoice) =>
                        invoice.urls &&
                        invoice.urls.map((doc, idxUrl) => (
                          <div className="mb-2" key={idxInvoice + idxUrl}>
                            <Document
                              file={doc ? doc : ""}
                              className={styles.document_small}
                              onClick={() =>
                                setCurrentFile({
                                  docName: `Invoice  ${idxInvoice} - ${idxUrl}`,
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
                            <p>{`Invoice  ${idxInvoice} - ${idxUrl}`} </p>
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
          
          {(data.status === "Pending Review" ||
            data.status === "Pending Additional Information" ||
            data.status === "In Process") && (
            <>
              <AppButton
                title="Require More Info"
                textColor={gStyles.buttonBlue}
                borderColor={gStyles.buttonBlue}
                bgColor={gStyles.customBlue3}
                borderRadius={"5px"}
                width={"6em"}
                height={"4em"}
                onMouseOver={() =>
                  setMessage(
                    createMessageForClaim(
                      message,
                      isLock,
                      "Pending Additional Information"
                    )
                  )
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfClaim(
                    data.claimId,
                    "Pending Additional Information"
                  )
                }
              />
              <AppButton
                title="Temporally Decide"
                textColor={gStyles.buttonBlue}
                borderColor={gStyles.buttonBlue}
                bgColor={gStyles.customBlue3}
                borderRadius={"5px"}
                width={"6em"}
                height={"4em"}
                onMouseOver={() =>
                  setMessage(
                    createMessageForClaim(message, isLock, "In Process")
                  )
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfClaim(data.claimId, "In Process")
                }
              />
              <AppButton
                title="Accept"
                textColor={"#53B271"}
                borderColor={"#53B271"}
                bgColor={"#EBFAFA"}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                onMouseOver={() =>
                  setMessage(createMessageForClaim(message, isLock, "Approved"))
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfClaim(data.claimId, "Approved")
                }
              />
              <AppButton
                title="Deny"
                textColor={"#B93735"}
                borderColor={"#B93735"}
                bgColor={"#F8D8D8"}
                borderRadius={"5px"}
                width={"6em"}
                height={"2em"}
                onMouseOver={() =>
                  setMessage(createMessageForClaim(message, isLock, "Denied"))
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfClaim(data.claimId, "Denied")
                }
              />
            </>
          )}
          {data.status === "Approved" && (
            <>
              <AppButton
                title="Resolve Payment"
                textColor={"#53B271"}
                borderColor={"#53B271"}
                bgColor={"#EBFAFA"}
                borderRadius={"5px"}
                paddingX={4}
                paddingY={0}
                height={"2em"}
                onMouseOver={() =>
                  setMessage(
                    createMessageForClaim(message, isLock, "Payment Issued")
                  )
                }
                loading={loadingBtns}
                handleSelectingRow={() =>
                  handleUpdateStatusOfClaim(data.claimId, "Payment Issued")
                }
              />
            </>
          )}

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

export default ClaimManagerPopup;
