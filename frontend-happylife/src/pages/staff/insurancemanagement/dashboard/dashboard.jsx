import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClaimAPI from "../../../../../api/claimApi";
import AppButton from "../../../../components/staff/appButton/button";
import StatusFilter from "../../../../components/staff/filter/status/statusFilter";
import ClaimManagerPopup from "../../../../components/staff/popup/claimManagerPopup";
import { statusArrayOfClaim } from "../../../../resource/status";
import gStyles from "../../../../style";
import { createMessageForClaim } from "../../../../supportFunctions";
const IMDashboard = () => {
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
      <div className="bg-gray-100 font-sans">
        {/* Navigation */}
        <nav className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Accounting Dashboard</h1>
          </div>
        </nav>
  
        {/* Main Content */}
        <div className="container mx-auto mt-8 p-4">
          {/* Section 1: General Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">General Overview</h2>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Insurances</h2>
              <p className="text-3xl font-bold text-green-500">$1,000,000</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Canceled Insurances</h2>
              <p className="text-3xl font-bold text-red-500">$500,000</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Active Insurances</h2>
              <p className="text-3xl font-bold text-blue-500">$500,000</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Compensation Statistics</h2>
              <p className="text-3xl font-bold text-purple-500">$700,000</p>
            </div>
          </div>
          </div>
  
          {/* Section 2: Claims Statistics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Claims Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Total Paid Claims</h3>
                <p className="text-2xl text-green-500">$500,000</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Pending Claims</h3>
                <p className="text-2xl text-red-500">30</p>
              </div>
            </div>
          </div>
  
          {/* Section 3: Financial Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Financial Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Insurance Revenue</h3>
                <p className="text-2xl text-green-500">$1,200,000</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Profit/Loss</h3>
                <p className="text-2xl text-blue-500">$300,000</p>
              </div>
            </div>
          </div>
  
          {/* Section 4: Risk and Claims Ratio */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Risk and Claims Ratio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Loss Ratio</h3>
                <p className="text-2xl text-red-500">15%</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Claims to Revenue Ratio</h3>
                <p className="text-2xl text-purple-500">25%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default IMDashboard;
