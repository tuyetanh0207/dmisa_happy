import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RegistrationAPI from "../../../../../api/registrationApi";
import AppButton from "../../../../components/staff/appButton/button";
import StatusFilter from "../../../../components/staff/filter/status/statusFilter";
import RegistrationManagerPopup from "../../../../components/staff/popup/regisManagerPopup";
import { statusArrayOfRegistration } from "../../../../resource/status";
import gStyles from "../../../../style";
import { createMessageForRegistration } from "../../../../supportFunctions";

export const colTitlesInRegistration = [
  "No.",
  "Cus. Name",
  "Cus. Phone",
  "Birthday",
  "Address",
  "Plan",
  "Plan Type",
  "Insurance Amount",
  "Plan Duration",
  "Created At",
  "Status",
];
const AccRegistration = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [registrations, setRegistrations] = useState(null);
  const [loadingBtns, setLoadingBtns] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const fetchRegistrations = async () => {
    try {
      const res = await RegistrationAPI.getAllRegistration(user.token);
      let data = res.data;

      if (!data || data[0].createdAt === null) {
        setRegistrations(res.data);
        return;
      } else {
        const sortedArray = data.sort((a, b) => {
          // Assuming createdAt is a string in ISO 8601 format, you can directly compare them

          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setRegistrations(sortedArray);
      }
    } catch (err) {
      console.log("error in fetchRegistrations", err);
    }
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const handleSelectingRow = (row) => {
    setSelectedRow(row);
  };
  const handleClosePopup = () => {
    setSelectedRow(null);
  };
  useEffect(() => {
    fetchRegistrations();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      fetchRegistrations();
    }, 5000);
  }, [registrations]);

  const handleUpdateStatusOfRegistration = async (
    regisId,
    approvalStatus
  ) => {
    setLoadingBtns((t) => [...t, regisId]);
    try {
       await RegistrationAPI.updateStatusOfRegistration(
        user.token,
        regisId,
        approvalStatus,
        { content: createMessageForRegistration("", false, approvalStatus) }
      );
      setLoadingBtns((t) => t.filter((id) => id !== regisId));
    } catch (e) {
      console.log("", e);
    }
  };
  
  const handleChangeFilterStatus = (status) => {
    setFilterStatus(status);
  };
  const handleChangeStartDateFilter = (date) => {
    setStartDate(date);
  };
  const handleChangeEndDateFilter = (date) => {
    setEndDate(date);
  };
  return (
    <div className="bg-white w-[96%] mt-12 mb-12 ml-6 mr-2 rounded-xl pt-4">
      <h1 className="text-[1.5em] font-semibold ml-8 mt-2 mb-4 text-slight-black">
        Registrations
      </h1>
      {/* filter */}
      <section className="flex justify-end px-10 gap-10 mb-6">
        <div>
          <label className="mr-10">
            Start Date:
            <input
              className="ml-2"
              type="date"
              value={startDate}
              onChange={(e) => handleChangeStartDateFilter(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              className="ml-2"
              type="date"
              value={endDate}
              onChange={(e) => handleChangeEndDateFilter(e.target.value)}
            />
          </label>
          {/* Render your filtered data here */}
        </div>
        <StatusFilter
          options={statusArrayOfRegistration}
          fieldName={"Status"}
          value={filterStatus}
          onChange={handleChangeFilterStatus}
        />
      </section>
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
          {registrations?.map(
            (item, index) =>
              (item.ApprovalStatus === filterStatus ||
                filterStatus === "All") &&
              (startDate === "" || startDate <= item.createdAt) &&
              (endDate === "" || endDate >= item.createdAt.slice(0, 10)) && (
                <tr key={index}>
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
                      width={"6em"}
                      height={"2em"}
                      data={item}
                      handleSelectingRow={() => handleSelectingRow(item)}
                    />
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    <AppButton
                      title="Pending"
                      textColor={gStyles.buttonBlue}
                      borderColor={gStyles.buttonBlue}
                      bgColor={gStyles.customBlue3}
                      borderRadius={"5px"}
                      width={"6em"}
                      height={"2em"}
                      data={item}
                      loading={loadingBtns.includes(item.regisId) ? "1" : ""}
                      handleSelectingRow={() =>
                        handleUpdateStatusOfRegistration(
                          item.regisId,
                          "Pending"
                        )
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
                            loadingBtns.includes(item.regisId) ? "1" : ""
                          }
                          handleSelectingRow={() =>
                            handleUpdateStatusOfRegistration(
                              item.regisId,
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
                            loadingBtns.includes(item.regisId) ? "1" : ""
                          }
                          handleSelectingRow={() =>
                            handleUpdateStatusOfRegistration(
                              item.regisId,
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
                            loadingBtns.includes(item.regisId) ? "1" : ""
                          }
                          handleSelectingRow={() =>
                            handleUpdateStatusOfRegistration(
                              item.regisId,
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
                            loadingBtns.includes(item.regisId) ? "1" : ""
                          }
                          handleSelectingRow={() =>
                            handleUpdateStatusOfRegistration(
                              item.regisId,
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
              )
          )}
        </tbody>
      </table>
      {selectedRow && (
        <RegistrationManagerPopup
          data={selectedRow}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default AccRegistration;
