import React, { useEffect, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import barberService from "../../../services/barberService";
import { useNavigate } from "react-router-dom";

const BarberGridWithSidebar = () => {
  const [barbers, setBarbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarbers = async () => {
      const response = await barberService.getNearbySalons();
      console.log("Fetched barbers:", response);
      setBarbers(response || []);
    };
    fetchBarbers();
  }, []);

  const BarberCard = ({ barber }) => (


    <div className="border p-4 rounded-lg shadow bg-white">
      <img
        src={barber.imagePath || "/default-image.jpg"}
        alt={barber.salonName}
        className="w-full h-32 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2"> Salon : {barber.salonName}</h3>
      <p className="text-sm text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>{barber.address}</p>
      <button
        onClick={() => navigate(`/barbers/${barber.salonId}`)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        View
      </button>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="font-bold text-xl mb-4">Filters / Sidebar</h2>
        <p>Some links or filters here...</p>
      </div>

      {/* Grid content */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Nearby Salons</h2>

        <VirtuosoGrid
          totalCount={barbers.length}
          components={{
            List: React.forwardRef(({ style, children }, ref) => (
              <div
                ref={ref}
                style={{
                  ...style,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "16px",
                }}
              >
                {children}
              </div>
            )),
            Item: ({ children, ...props }) => <div {...props}>{children}</div>,
          }}
          itemContent={(index) => <BarberCard barber={barbers[index]} />}
          style={{ height: "calc(100vh - 32px)" }} // scrollable area
        />
      </div>
    </div>
  );
};

export default BarberGridWithSidebar;
