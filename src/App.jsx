import { useState } from 'react'
import AppRoutes from './routes/AppRoutes';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <AppRoutes />;
    </div>
  )
}

export default App;
