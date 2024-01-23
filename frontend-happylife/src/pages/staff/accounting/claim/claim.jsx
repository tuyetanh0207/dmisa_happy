import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClaimAPI from "../../../../../api/claimApi";
import AppButton from "../../../../components/staff/appButton/button";
import StatusFilter from "../../../../components/staff/filter/status/statusFilter";
import ClaimManagerPopup from "../../../../components/staff/popup/claimManagerPopup";
import { statusArrayOfClaim } from "../../../../resource/status";
import gStyles from "../../../../style";
import { createMessageForClaim } from "../../../../supportFunctions";
const AccClaim = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [Claims, setClaims] = useState(null);
  const [loadingBtns, setLoadingBtns] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchClaims = async () => {
    try {
      const res = await ClaimAPI.getAllClaim(user.token);
      let data = res.data;

      if (!data || data[0].createdAt === null) {
        setClaims(res.data);
        return;
      } else {
        const sortedArray = data.sort((a, b) => {
          // Assuming createdAt is a string in ISO 8601 format, you can directly compare them

          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setClaims(sortedArray);
      }
    } catch (err) {
      console.log("error in fetchClaims", err);
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
    fetchClaims();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      fetchClaims();
    }, 5000);
  }, [Claims]);

  const handleUpdateStatusOfClaim = async (claimId, status) => {
    setLoadingBtns((t) => [...t, claimId]);
    try {
      await ClaimAPI.updateStatusOfClaim(
        user.token,
        claimId,
        status,
        { content: createMessageForClaim("", false, status) }
      );
      setLoadingBtns((t) => t.filter((id) => id !== claimId));
    } catch (e) {
      console.log("", e);
    }
  };
  const colTitle = [
    "No.",
    "Cus. Name",
    "Cus. Phone",
    "Birthday",
    "Address",
    "Plan",
    "Plan Type",
    "Claim Amount",
    "Total Request",
    "Created At",
    "Status",
  ];
  const handleChangeFilterStatus = (status) => {
    setFilterStatus(status);
  };
  const handleChangeStartDateFilter = (date) => {
    console.log("start date", date);
    setStartDate(date);
  };
  const handleChangeEndDateFilter = (date) => {
    setEndDate(date);
  };
  return (
    <div className="bg-white w-[96%] mt-12 mb-12 ml-6 mr-2 rounded-xl pt-4">
      <h1 className="text-[1.5em] font-semibold ml-8 mt-2 mb-4 text-slight-black">
        Claims
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
          options={statusArrayOfClaim}
          fieldName={"Status"}
          value={filterStatus}
          onChange={handleChangeFilterStatus}
        />
      </section>
      <table className="w-full">
        <thead>
          <tr>
            {colTitle.map((e) =>
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
          {Claims?.map(
            (item, index) =>
              (item.status === filterStatus || filterStatus === "All") &&
              (startDate === "" || startDate <= item.createdAt) &&
              (endDate === "" || endDate >= item.createdAt.slice(0, 10)) && (
                <tr key={index}>
                  <td className="border-t border-gray-300 pl-8 pr-2 py-2">
                    {index + 1}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.regisInfo.customerInfo.fullName}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.regisInfo.customerInfo.phoneNumber}
                  </td>
                  {/* <td className="border border-gray-300 px-2 py-2">{item.customerInfo.citizenID}</td> */}
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.regisInfo.customerInfo.dob !== null
                      ? item.regisInfo.customerInfo.dob.slice(0, 10)
                      : ""}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.regisInfo.customerInfo.address}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.regisInfo.productInfo.planName}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.regisInfo.productInfo.planType[0].typeName}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.claimAmount}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.claimTotalRequest}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.createdAt
                      ? item.createdAt.toString().slice(0, 10)
                      : ""}
                  </td>
                  <td
                    className={`border-t border-gray-300 px-2 py-2 font-bold ${
                      item.status === "Approved"
                        ? "text-custom-blue-2"
                        : item.status === "Pending"
                        ? "text-custom-blue-3"
                        : "text-custom-red-2"
                    }`}
                  >
                    {item.status}
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
                      loading={loadingBtns.includes(item.claimId) ? "1" : ""}
                      handleSelectingRow={() =>
                        handleUpdateStatusOfClaim(
                          item.claimId,
                          "Pending Review"
                        )
                      }
                    />
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    <AppButton
                      title="Accept"
                      textColor={"#53B271"}
                      borderColor={"#53B271"}
                      bgColor={"#EBFAFA"}
                      borderRadius={"5px"}
                      width={"6em"}
                      height={"2em"}
                      loading={loadingBtns.includes(item.claimId) ? "1" : ""}
                      handleSelectingRow={() =>
                        handleUpdateStatusOfClaim(item.claimId, "Approved")
                      }
                    />
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    <AppButton
                      title="Deny"
                      textColor={"#B93735"}
                      borderColor={"#B93735"}
                      bgColor={"#F8D8D8"}
                      borderRadius={"5px"}
                      width={"6em"}
                      height={"2em"}
                      loading={loadingBtns.includes(item.claimId) ? "1" : ""}
                      handleSelectingRow={() =>
                        handleUpdateStatusOfClaim(item.claimId, "Denied")
                      }
                    />
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
      {selectedRow && (
        <ClaimManagerPopup data={selectedRow} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default AccClaim;
