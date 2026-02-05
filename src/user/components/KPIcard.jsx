import {FiTrendingUp,FiCalendar} from "react-icons/fi"
const KPIcard = ({ title, value,className,icon }) => {

  return (
    // <div className={`${className} shadow rounded-lg p-4`}>
    //   <h4 className="text-bold text-white">{title}</h4>
    //   <p className="text-2xl font-bold">{value}</p>
    // </div>
    <div className={`${className} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    {title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{value}</p>
                  <p className="text-blue-100 text-sm mt-1 flex items-center gap-1">
                    <FiTrendingUp className="text-green-300" />
                    +12% from last month
                  </p>
                </div>
                <div className={`${className} bg-opacity-20 p-3 rounded-full border-gray-200`}>
                  {/* <FiCalendar className="text-2xl" /> */}
                  {icon}
                </div>
              </div>
            </div>
  );
};

export default KPIcard;
