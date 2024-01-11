import { PencilIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ClaimAPI from "../../../api/claimApi";
import { copayRates } from "../../resource/insuranceParameters";
import gStyles from "../../style";
import AppButton from "./appButton/button";
export default function ClaimInvoiceTable(props) {
  const {
    claimId,
    invoices,
    requestTotal,
    setRequestTotal,
    claimTotal,
    setClaimTotal,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [tableInvoices, setTableInvoices] = useState(
    JSON.parse(JSON.stringify(invoices))
  );
  const user = useSelector((state) => state.auth.login.currentUser);

  const [loadingBtns, setLoadingBtns] = useState("0");
  const calculateInvoiceTable = (tableInvoices) => {
    var tempRequest = 0;
    var tempClaim = 0;
    for (var i = 0; i < tableInvoices.length; i++) {
      tempRequest += tableInvoices[i].amount;
      tempClaim += tableInvoices[i].claimAmount;
    }
    setRequestTotal(tempRequest);
    setClaimTotal(tempClaim);
  };
  const updateInvoicesInClaim = async () => {
    const res = await ClaimAPI.updateClaimByStaff(user.token, claimId, {
      claimInvoices: tableInvoices,
      claimTotalRequest: requestTotal,
      claimAmount: claimTotal,
    });
    setLoadingBtns("0"); 
    setTableInvoices(res.data.claimInvoices);
    
  };
  const handleUpdateAttributeInRow = (event, colName, idx) => {
    const value = event.target.value;

    let updatedInvoices = JSON.parse(JSON.stringify(tableInvoices));
    switch (colName) {
      case "claimPercentage":
        if (value === "") {
          updatedInvoices[idx].claimPercentage = 0;
          updatedInvoices[idx].claimAmount = 0;
          updatedInvoices[idx].status = "Resolved";
          break;
        }
        updatedInvoices[idx].claimPercentage = value;
        updatedInvoices[idx].claimAmount =
          (value * updatedInvoices[idx].amount) / 100;
        updatedInvoices[idx].status = "Resolved";

        break;
      case "claimAmount":
        updatedInvoices[idx].claimAmount = value;
        updatedInvoices[idx].status = "Resolved";
        break;
      case "status":
        updatedInvoices[idx].status = value;
        break;
      default:
        break;
    }

    setTableInvoices(updatedInvoices);
    calculateInvoiceTable(updatedInvoices);
  };
  const handleCancelBtnClick = () => {
    console.log("invoices in cancel btn", invoices);
    setIsEditing(false);
    setTableInvoices(invoices);
  };
  const handleSaveBtnClick = () => {
    setLoadingBtns("1");
    updateInvoicesInClaim();
  };
  const handleEditBtnClick = () => {
    if (isEditing === true) {
      setIsEditing(false);
      setTableInvoices(invoices);
    } else setIsEditing(true);
  };
  const handleUpdateClaimPercentageAllRownBtnClick = (rate) => {
    let updatedInvoices = JSON.parse(JSON.stringify(tableInvoices));
    updatedInvoices.forEach((element) => {
      element.claimPercentage = rate;
      element.claimAmount = (rate * element.amount) / 100;
      element.status = "Resolved";
    });

    setTableInvoices(updatedInvoices);
    calculateInvoiceTable(updatedInvoices);
  };

  return (
    <div className="w-full rounded-md max-h-20 p-2">
      <div className="flex max-h-4 mb-6 gap-2">
        {isEditing === true &&
          copayRates.map((e) => (
            <AppButton
              key={e}
              title={`All ${e}%`}
              textColor={gStyles.buttonBlue}
              borderColor={gStyles.buttonBlue}
              bgColor={gStyles.customBlue3}
              borderRadius={"5px"}
              width={"6em"}
              height={"2em"}
              loading={loadingBtns}
              data={null}
              handleSelectingRow={() =>
                handleUpdateClaimPercentageAllRownBtnClick(e)
              }
            />
          ))}
        <PencilIcon
          className="text-custom-blue-2 w-8 h-8 ml-auto flex mr-2 mb-4"
          onClick={() => handleEditBtnClick()}
        />
      </div>
      <table
        className={`w-full bg-custom-blue-3 rounded-md max-h-20 ${
          isEditing ? "editing" : ""
        }`}
      >
        <thead>
          <tr>
            <th className="text-left px-2 py-2">No.</th>
            <th className="text-left px-2 py-2">Date</th>
            <th className="text-left px-2 py-2">Amount</th>
            <th className="text-left px-2 py-2">Claim percentage</th>
            <th className="text-left px-2 py-2">Claim Amount</th>
            <th className="text-left px-2 py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {tableInvoices.map((invoice, idx) => (
            <React.Fragment key={idx}>
              {isEditing === false && (
                <tr className={isEditing ? "editing" : ""}>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {idx + 1}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {invoice.invoiceDate
                      ? invoice.invoiceDate.slice(0, 10)
                      : ""}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {invoice.amount}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {invoice.claimPercentage}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {invoice.claimAmount}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {invoice.status}
                  </td>
                </tr>
              )}
              {isEditing === true && (
                <tr className="editing">
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {idx + 1}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {invoice.invoiceDate
                      ? invoice.invoiceDate.slice(0, 10)
                      : ""}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    {invoice.amount}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    <input
                      onChange={(event) =>
                        handleUpdateAttributeInRow(
                          event,
                          "claimPercentage",
                          idx
                        )
                      }
                      className="w-20 rounded-lg pl-2 italic"
                      value={invoice.claimPercentage}
                    />
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    <input
                      onChange={(event) =>
                        handleUpdateAttributeInRow(event, "claimAmount", idx)
                      }
                      className="w-20 rounded-lg pl-2 italic"
                      value={invoice.claimAmount}
                    />
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2 text-center">
                    <input
                      onChange={(event) =>
                        handleUpdateAttributeInRow(event, "status", idx)
                      }
                      className="w-20 rounded-lg pl-2 italic"
                      value={invoice.status}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className={`flex`}>
        <p className="border-t border-gray-300 px-2 py-2 text-left w-1/5">
          Request Total:{" "}
        </p>
        <p className="border-t border-gray-300 px-2 py-2 text-left w-1/4 text-custom-red-2 font-bold">
          {requestTotal}
        </p>

        <p className="border-t border-gray-300 px-2 py-2 text-left w-1/4">
          Claim Total:
        </p>
        <p className="border-t border-gray-300 px-2 py-2 text-left w-1/4 text-custom-red-2 font-bold">
          {claimTotal}
        </p>
      </div>
      {isEditing === true && (
        <div className="flex justify-end gap-4 mt-6">
          <AppButton
            title="Save"
            textColor={"#53B271"}
            borderColor={"#53B271"}
            bgColor={"#EBFAFA"}
            borderRadius={"5px"}
            width={"6em"}
            height={"2em"}
            loading={loadingBtns}
            data={null}
            handleSelectingRow={() => handleSaveBtnClick("kk")}
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
            data={null}
            handleSelectingRow={() => handleCancelBtnClick("kk")}
          />
        </div>
      )}
    </div>
  );
}
