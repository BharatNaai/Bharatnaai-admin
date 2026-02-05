import { useState } from 'react'
import AppRoutes from './AppRoutes';
import { UserDetails } from './context/UserContext';
import KPIcard from './user/components/KPIcard';
import { BarberDashboard } from './barber/barberDashboard/BarberDashboard';
import DashboardLayout from './common/layout/DashboardLayout';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <AppRoutes />;
      <UserDetails>
        <BarberDashboard/>
        {/* <DashboardLayout/> */}
      </UserDetails>
    </div>
  )
}

export default App;
