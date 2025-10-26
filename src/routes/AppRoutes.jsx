import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import Customers from "../pages/Customers/Customers";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";
import Barber from "../pages/Barbers/Barber.jsx";
import BarberDetails from "../pages/Barbers/BarberDetail.jsx";

// import other pages...

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/register-barber" element={<RegisterPage />} />
        <Route path="/barbers" element={<Barber />} />
        <Route path="/barbers/:id" element={<BarberDetails />} />
        {/* Add all other pages here */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
