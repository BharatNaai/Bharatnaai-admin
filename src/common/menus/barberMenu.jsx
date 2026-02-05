import {
  FiHome,
  FiBriefcase,
  FiList,
  FiPlus,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiSettings,
  FiBarChart2,
  FiHelpCircle ,
} from "react-icons/fi";

/**
 * Barber Dashboard Menu Configuration
 */
export const barberSidebarMenu = [
  { name: "Barber-Dashboard", path: "/barber/dashboard", icon: <FiHome /> },
  {
    name: "Partners",
    icon: <FiBriefcase />,
    submenu: [
      { name: "List", path: "/barber/partners", icon: <FiList /> },
      { name: "Create Partner", path: "/barber/partners/create", icon: <FiPlus /> },
    ],
  },
  { name: "Bookings", path: "/barber/bookings", icon: <FiCalendar /> },
  { name: "Earning&Settlements", path: "/barber/payments", icon: <FiDollarSign /> },
  { name: "Complaints&Support", path: "/barber/Complaints&Supports", icon: <FiHelpCircle  /> },
  { name: "Settings", path: "/barber/settings", icon: <FiSettings /> },
];

export default barberSidebarMenu;

