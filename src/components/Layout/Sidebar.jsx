import { Link, useLocation } from "react-router-dom";
import { FiUsers, FiScissors, FiHome, FiBook, FiSettings, FiStar, FiGift, FiBell, FiBarChart2, FiCreditCard } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Customers", path: "/customers", icon: <FiUsers /> },
  { name: "Barbers / Staff", path: "/barbers", icon: <FiScissors /> },
  { name: "Services", path: "/services", icon: <FiBook /> },
  { name: "Bookings", path: "/bookings", icon: <FiBook /> },
  { name: "Payments", path: "/payments", icon: <FiCreditCard /> },
  { name: "Reviews & Ratings", path: "/reviews", icon: <FiStar /> },
  { name: "Offers & Promotions", path: "/offers", icon: <FiGift /> },
  { name: "Notifications", path: "/notifications", icon: <FiBell /> },
  { name: "Reports & Analytics", path: "/reports", icon: <FiBarChart2 /> },
  { name: "Settings & Roles", path: "/settings", icon: <FiSettings /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white h-screen shadow-md fixed">
      <h1 className="text-2xl font-bold p-4 text-blue-600">Salon Admin</h1>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-50 ${
              location.pathname === item.path ? "bg-blue-100 text-blue-600 font-semibold" : ""
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
