import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./common/layout/DashboardLayout";
import LoginPage from "./common/layout/LoginPage.jsx";


// User Dashboard Pages

import UserDashboard from "./user/pages/Dashboard/Dashboard.jsx";
import Customers from "./user/pages/Customers/Customers.jsx";
import RegisterPage from "./user/pages/RegisterPage/RegisterPage.jsx";
import Barber from "./user/pages/Auth/Barbers/Barber.jsx";
import BarberDetails from "./user/pages/Auth/Barbers/BarberDetail.jsx";

// Barber Dashboard Pages
import PartnerList from "./barber/pages/PartnerList.jsx";
import PartnerDetails from "./barber/pages/PartnerDetails.jsx";
import PartnerCreate from "./barber/pages/PartnerCreate.jsx";
import PartnerUpdate from "./barber/pages/PartnerUpdate.jsx";

/**
 * AppRoutes Component
 * Routes are organized by dashboard type:
 * - /user/* routes → User Dashboard
 * - /barber/* routes → Barber Dashboard
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect to user dashboard */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />


        {/* User Dashboard Routes */}
        <Route path="/user" element={<DashboardLayout type="user" />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="register-barber" element={<RegisterPage />} />
          <Route path="barbers" element={<Barber />} />
          <Route path="barbers/:id" element={<BarberDetails />} />
          
          {/* Partner routes for user dashboard */}
          <Route path="partners" element={<PartnerList />} />
          <Route path="partners/create" element={<PartnerCreate />} />
          <Route path="partners/:id/edit" element={<PartnerUpdate />} />
          <Route path="partners/:id" element={<PartnerDetails />} />
          
          {/* Placeholder routes - can be implemented later */}
          <Route path="services" element={<div className="p-6"><h1 className="text-2xl font-bold">Services</h1><p>Coming soon...</p></div>} />
          <Route path="bookings" element={<div className="p-6"><h1 className="text-2xl font-bold">Bookings</h1><p>Coming soon...</p></div>} />
          <Route path="payments" element={<div className="p-6"><h1 className="text-2xl font-bold">Payments</h1><p>Coming soon...</p></div>} />
          <Route path="reviews" element={<div className="p-6"><h1 className="text-2xl font-bold">Reviews & Ratings</h1><p>Coming soon...</p></div>} />
          <Route path="offers" element={<div className="p-6"><h1 className="text-2xl font-bold">Offers & Promotions</h1><p>Coming soon...</p></div>} />
          <Route path="notifications" element={<div className="p-6"><h1 className="text-2xl font-bold">Notifications</h1><p>Coming soon...</p></div>} />
          <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports & Analytics</h1><p>Coming soon...</p></div>} />
          <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings & Roles</h1><p>Coming soon...</p></div>} />
        </Route>

        {/* Barber Dashboard Routes */}
        <Route path="/barber" element={<DashboardLayout type="barber" />}>
          <Route path="dashboard" element={<div className="p-6"><h1 className="text-3xl font-bold mb-4">Barber Dashboard</h1><p className="text-gray-600">Welcome to the Barber Dashboard</p></div>} />
          <Route path="partners" element={<PartnerList />} />
          <Route path="partners/create" element={<PartnerCreate />} />
          <Route path="partners/:id/edit" element={<PartnerUpdate />} />
          <Route path="partners/:id" element={<PartnerDetails />} />
          
          {/* Placeholder routes - can be implemented later */}
          <Route path="bookings" element={<div className="p-6"><h1 className="text-2xl font-bold">Bookings</h1><p>Coming soon...</p></div>} />
          <Route path="Earning&Settlement" element={<div className="p-6"><h1 className="text-2xl font-bold">Earning&Settlement</h1><p>Coming soon...</p></div>} />
          <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Complaints&Support</h1><p>Coming soon...</p></div>} />
          <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Coming soon...</p></div>} />
        </Route>

        {/* Catch all - redirect to user dashboard */}
        {/* <Route path="*" element={<Navigate to="/user/dashboard" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
