import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import barberService from "../../Auth/Barbers/BarberDetail.jsx";

const BarberDetail = () => {
  const { id } = useParams(); // salonId from URL
  const [salon, setSalon] = useState(null);

  useEffect(() => {
    const fetchBarberDetails = async () => {
      try {
        const data = await barberService.getBarberById(id);
        setSalon(data);
      } catch (error) {
        console.error("Error fetching salon details:", error);
      }
    };
    fetchBarberDetails();
  }, [id]);

  if (!salon) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{salon.salonName}</h2>
      <img
        src={salon.imagePath}
        alt={salon.salonName}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-lg mb-2">📍 Address: {salon.address}</p>
      <p className="text-lg mb-4">
        🧭 Distance: {(Number(salon.distance) || 0).toFixed(2)} km
      </p>

      <h3 className="text-2xl font-semibold mb-2">Barbers List</h3>
      <table className="min-w-full border border-gray-300">
        <tbody>
          {salon.barbers?.length > 0 ? (
            salon.barbers.map((barber) => (
              <tr key={barber.barberId}>
                <td className="border p-2">{barber.barberId}</td>
                <td className="border p-2">{barber.barberName}</td>
                <td className="border p-2">{barber.phone}</td>
                <td className="border p-2">{barber.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="4">
                No barbers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BarberDetail;
