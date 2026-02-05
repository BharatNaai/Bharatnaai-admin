import {
  FiPlus,
  FiTrendingUp,
  FiUsers,
  FiScissors,
  FiDollarSign,
  FiCalendar,
  FiDroplet,
} from "react-icons/fi";
import KPIcard from "../../components/KPIcard";
import RevenueChart from "../../components/RevenueChart";
import TopServices from "../../components/TopServices";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddBarber = () => {
    navigate("/user/register-barber"); // 👈 this will open RegisterPage.jsx
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening at your salon today.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <FiPlus className="text-lg" />
          Add Service
        </button>
        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <FiPlus className="text-lg" />
          Add Booking
        </button>
        <button
          onClick={handleAddBarber}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <FiPlus className="text-lg" />
          Add Barber
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">
                Total Bookings
              </p>
              <p className="text-3xl font-bold mt-2">1,250</p>
              <p className="text-blue-100 text-sm mt-1 flex items-center gap-1">
                <FiTrendingUp className="text-green-300" />
                +12% from last month
              </p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
              <FiCalendar className="text-2xl" />
            </div>
          </div>
        </div> */}

        <KPIcard title={"Total Booking"} value={1250} className="bg-gradient-to-br from-blue-500 to-blue-600" icon={<FiCalendar/>}/>

        {/* <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Revenue</p>
              <p className="text-3xl font-bold mt-2">$45,000</p>
              <p className="text-green-100 text-sm mt-1 flex items-center gap-1">
                <FiTrendingUp className="text-green-300" />
                +8% from last month
              </p>
            </div>
            <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
              <FiDollarSign className="text-2xl" />
            </div>
          </div>
        </div> */}
        <KPIcard title={"Revenue"} value={1250} className="bg-gradient-to-br from-green-500 to-green-600" icon={<FiDollarSign/>}/>
        {/* <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">
                Active Customers
              </p>
              <p className="text-3xl font-bold mt-2">850</p>
              <p className="text-purple-100 text-sm mt-1 flex items-center gap-1">
                <FiTrendingUp className="text-green-300" />
                +5% from last month
              </p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
              <FiUsers className="text-2xl" />
            </div>
          </div>
        </div> */}
        <KPIcard title={"Active Customer"} value={1250} className="bg-gradient-to-br from-purple-500 to-purple-600" icon={<FiUsers/>}/>

        {/* <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">
                Active Barbers
              </p>
              <p className="text-3xl font-bold mt-2">15</p>
              <p className="text-orange-100 text-sm mt-1 flex items-center gap-1">
                <FiTrendingUp className="text-green-300" />
                +2 new this month
              </p>
            </div>
            <div className="bg-orange-400 bg-opacity-30 p-3 rounded-full">
              <FiScissors className="text-2xl" />
            </div>
          </div>
        </div> */}
        <KPIcard title={"Active Barbers"} value={1250} className="bg-gradient-to-br from-orange-500 to-orange-600" icon={<FiScissors/>}/>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <TopServices />
      </div>
    </div>
  );
};

export default Dashboard;
