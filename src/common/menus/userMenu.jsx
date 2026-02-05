import {
  FiHome,
  FiUsers,
  FiScissors,
  FiBook,
  FiCreditCard,
  FiStar,
  FiGift,
  FiBell,
  FiBarChart2,
  FiSettings,
  FiBriefcase,
  FiList,
  FiPlus,
} from "react-icons/fi";

/**
 * User Dashboard Menu Configuration
 */
export const userSidebarMenu = [
  { name: "Dashboard", path: "/user/dashboard", icon: <FiHome /> },
  { name: "Customers", path: "/user/customers", icon: <FiUsers /> },
  { name: "Barbers / Staff", path: "/user/barbers", icon: <FiScissors /> },
  { name: "Bookings", path: "/user/bookings", icon: <FiBook /> },
  { name: "Payments", path: "/user/payments", icon: <FiCreditCard /> },
  { name: "Reviews & Ratings", path: "/user/reviews", icon: <FiStar /> },
  { name: "Offers & Promotions", path: "/user/offers", icon: <FiGift /> },
  { name: "Settings & Roles", path: "/user/settings", icon: <FiSettings /> },
];

export default userSidebarMenu;

