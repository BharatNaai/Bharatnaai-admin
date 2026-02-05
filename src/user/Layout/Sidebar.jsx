import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiUsers, FiScissors, FiHome, FiBook, FiSettings, FiStar, FiGift, FiBell, FiBarChart2, FiCreditCard, FiBriefcase, FiChevronDown, FiChevronRight, FiList, FiPlus } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Customers", path: "/customers", icon: <FiUsers /> },
  { name: "Barbers / Staff", path: "/barbers", icon: <FiScissors /> },
  { 
    name: "Partners", 
    icon: <FiBriefcase />, 
    submenu: [
      { name: "List", path: "/admin/partners", icon: <FiList /> },
      { name: "Create Partner", path: "/admin/partners/create", icon: <FiPlus /> },
    ]
  },
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
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (itemName) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const isSubmenuActive = (submenu) => {
    return submenu?.some((item) => isActive(item.path));
  };

  return (
    <aside className="w-64 bg-white h-screen shadow-md fixed">
      <h1 className="text-2xl font-bold p-4 text-blue-600">Salon Admin</h1>
      <nav className="mt-4">
        {menuItems.map((item) => {
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const submenuOpen = openSubmenus[item.name] !== undefined 
            ? openSubmenus[item.name] 
            : isSubmenuActive(item.submenu);

          if (hasSubmenu) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 ${
                    isSubmenuActive(item.submenu) ? "bg-blue-100 text-blue-600 font-semibold" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.name}
                  </div>
                  {submenuOpen ? <FiChevronDown /> : <FiChevronRight />}
                </button>
                {submenuOpen && (
                  <div className="bg-gray-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`flex items-center gap-3 px-8 py-2 hover:bg-blue-50 ${
                          isActive(subItem.path) ? "bg-blue-100 text-blue-600 font-semibold" : ""
                        }`}
                      >
                        {subItem.icon}
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-50 ${
                isActive(item.path) ? "bg-blue-100 text-blue-600 font-semibold" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
