import React from "react";
import { FiTrendingUp, FiScissors, FiDroplet, FiStar, FiHeart, FiZap } from "react-icons/fi";

const services = [
  { id: 1, name: "Haircut", percentage: 70, icon: <FiScissors />, color: "from-blue-500 to-blue-600" },
  { id: 2, name: "Coloring", percentage: 80, icon: <FiDroplet />, color: "from-purple-500 to-purple-600" },
  { id: 3, name: "Styling", percentage: 60, icon: <FiStar />, color: "from-pink-500 to-pink-600" },
  { id: 4, name: "Manicure", percentage: 90, icon: <FiHeart />, color: "from-red-500 to-red-600" },
  { id: 5, name: "Pedicure", percentage: 75, icon: <FiZap />, color: "from-green-500 to-green-600" },
];

const TopServices = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-gray-800 text-xl font-bold">Top Services</h4>
          <p className="text-gray-500 text-sm mt-1">Most popular services this month</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <FiTrendingUp className="text-blue-600 text-lg" />
        </div>
      </div>
      
      <div className="space-y-5">
        {services.map((service, index) => (
          <div key={service.id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`bg-gradient-to-r ${service.color} p-2 rounded-lg text-white shadow-sm group-hover:shadow-md transition-all duration-300`}>
                  {service.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  {service.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800">{service.percentage}%</span>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${service.color} h-3 rounded-full transition-all duration-1000 ease-out shadow-sm`}
                  style={{ width: `${service.percentage}%` }}
                ></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Total Services</span>
          <span className="font-semibold text-gray-700">5 Active</span>
        </div>
      </div>
    </div>
  );
};

export default TopServices;
