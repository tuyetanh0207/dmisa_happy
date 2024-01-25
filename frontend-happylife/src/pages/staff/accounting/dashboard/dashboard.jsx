import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatistaAPI from "../../../../../api/statistaApi";

const AccDashboard = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const [statista, setStatista] = useState({});

  const fetchStatista = async () => {
    try {
      const res = await StatistaAPI.getStatista(user.token);
      console.log(res);

      setStatista(res?.data)

    } catch (err) {
      console.log("error in fetchStatista", err);
    }
  };

  useEffect(() => {
    fetchStatista();
  },[]);

  return (
      <div className="bg-gray-100 font-sans">
        {/* Navigation */}
        <nav className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Accounting Dashboard</h1>
          </div>
        </nav>
  
        {/* Main Content */}
        <div className="container mx-auto mt-4 mb-8 p-4">
          {/* Section 1: General Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">General Overview</h2>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Claims</h2>
              <p className="text-3xl font-bold text-green-500">{statista?.claimStatista?.numOfClaim}</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Resolved Claims</h2>
              <p className="text-3xl font-bold text-red-500">{statista?.claimStatista?.numOfResolvedClaim}</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Pending Claims</h2>
              <p className="text-3xl font-bold text-blue-500">{statista?.claimStatista?.numOfPendingClaim}</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Claims Amount</h2>
              <p className="text-3xl font-bold text-purple-500">{statista?.claimStatista?.totalClaimAmount} VNĐ</p>
            </div>
          </div>
          </div>
  
          {/* Section 2: Statistas Statistics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Registration Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Total Insurance Registrations</h3>
                <p className="text-3xl font-bold text-blue-500">{statista?.insuranceStatista?.numOfInsuranceRegistration}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Total Expired Registrations</h3>
                <p className="text-3xl font-bold text-red-500">{statista?.insuranceStatista?.numOfExpiredRegistration}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Total Active Registrations</h3>
                <p className="text-3xl font-bold text-green-500">{statista?.insuranceStatista?.numOfActiveRegistration}</p>
              </div>
            </div>
          </div>
  
          {/* Section 3: Financial Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Financial Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Total Avenue From Insurance Fee</h3>
                <p className="text-3xl font-bold text-blue-500">{statista?.avenueStatista?.totalAvenueFromInsuranceFee} VNĐ</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Total Profit</h3>
                <p className="text-3xl font-bold text-green-500">{statista?.avenueStatista?.totalProfit} VNĐ</p>
              </div>
            </div>
          </div>
  
          {/* Section 4: Risk and Statistas Ratio */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Risk and Statistas Ratio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Loss Ratio</h3>
                <p className="text-3xl font-bold text-red-500">{statista?.rateStatista?.lossRatio}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Compensation Payout Ratio</h3>
                <p className="text-3xl font-bold text-purple-500">{statista?.rateStatista?.compensationPayoutRatio}% </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AccDashboard;
