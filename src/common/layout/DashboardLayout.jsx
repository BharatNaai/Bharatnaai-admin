import { useState, useEffect, } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";


// ❌ Wrong earlier:
// import { userSidebarMenu } from "../menus/barberMenu";

// ✅ Correct:
import userSidebarMenu from "../menus/userMenu.jsx";
import barberSidebarMenu from "/src/common/menus/barberMenu.jsx";
import { UserContext } from "../../context/UserContext.jsx";

const DashboardLayout = ({ type = "user" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentType, setCurrentType] = useState(type);

  useEffect(() => {
    if (location.pathname.startsWith("/barber")) {
      setCurrentType("barber");
    } else if (location.pathname.startsWith("/user")) {
      setCurrentType("user");
    }
  }, [location.pathname]);

  const currentMenu =
    currentType === "barber" ? barberSidebarMenu : userSidebarMenu;

  const handleSwitch = (newType) => {
    setCurrentType(newType);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar type={currentType} onSwitch={handleSwitch} />

      <div className="flex flex-1 pt-20 pb-20">
        <Sidebar menu={currentMenu} />

        <main className="flex-1 ml-64 mr-0 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;


