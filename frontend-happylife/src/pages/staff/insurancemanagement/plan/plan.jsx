import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlanAPI from "../../../../../api/plansApi";
import AppButton from "../../../../components/staff/appButton/button";
import StatusFilter from "../../../../components/staff/filter/status/statusFilter";
import PlanManagerPopup from "../../../../components/staff/popup/planManagerPopup";
import { statusArrayOfPlan } from "../../../../resource/status";
import gStyles from "../../../../style";
const IMPlan = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [Plans, setPlans] = useState(null);
  const [loadingBtns, setLoadingBtns] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const fetchPlans = async () => {
    try {
      const res = await PlanAPI.getAllPlan();
      let data = res.data;

      if (!data || data[0].createdAt === null) {
        setPlans(res.data);
        return;
      } else {
        const sortedArray = data.sort((a, b) => {
          // Assuming createdAt is a string in ISO 8601 format, you can directly compare them

          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setPlans(sortedArray);
      }
    } catch (err) {
      console.log("error in fetchPlans", err);
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
    fetchPlans();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      fetchPlans();
    }, 5000);
  }, [Plans]);

  
  const colTitle = [
    "No.",
    "Name",
    "Types",
    "Duration",
    "Created At",
    "Updated At",
  ];
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
        Plans
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
          options={statusArrayOfPlan}
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
          {Plans?.map(
            (item, index) =>
            //   (item.ApprovalStatus === filterStatus ||
            //     filterStatus === "All") &&
              (startDate === "" || startDate <= item.planCreatedAt) &&
              (endDate === "" || endDate >= item.planCreatedAt.slice(0, 10)) && (
                <tr key={index}>
                  <td className="border-t border-gray-300 pl-8 pr-2 py-2">
                    {index + 1}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.planName}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.planType.map((e, idx)=> idx===item.planType.length-1?e.typeName+ " ":e.typeName+ ", ")}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.planDuration +
                      " " +
                      item.planDurationUnit +
                      "s"}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.planCreatedAt
                      ? item.planCreatedAt.toString().slice(0, 10)
                      : ""}
                  </td>
                  <td className="border-t border-gray-300 px-2 py-2">
                    {item.planUpdatedAt
                      ? item.planUpdatedAt.toString().slice(0, 10)
                      : ""}
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
                  
                </tr>
              )
          )}
        </tbody>
      </table>
      {selectedRow && (
        <PlanManagerPopup
          data={selectedRow}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default IMPlan;
