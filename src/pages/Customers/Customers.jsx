import { useEffect, useState } from "react";
import api from "../../services/axiosConfig"

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch customers from backend API (or dummy data)
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Replace this with your backend API call:
        // const response = await api.get("/customers");
        // setCustomers(response.data);

        // Dummy data (for now)
        const dummyData = [
          {
            id: 1,
            name: "Ramesh Kumar",
            email: "ramesh@example.com",
            phone: "+91 98765 43210",
            bookings: 12,
            status: "Active",
          },
          {
            id: 2,
            name: "Aarti Sharma",
            email: "aarti@example.com",
            phone: "+91 91234 56789",
            bookings: 5,
            status: "Inactive",
          },
          {
            id: 3,
            name: "Imran Khan",
            email: "imran@example.com",
            phone: "+91 99876 54321",
            bookings: 8,
            status: "Active",
          },
        ];

        setCustomers(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div className="ml-64 p-6 text-gray-500">Loading customers...</div>;
  }

  return (
    <div className="ml-64 p-6">
      <h2 className="text-2xl font-bold mb-6">Customers</h2>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Phone
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                Bookings
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 text-sm text-gray-700">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{customer.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{customer.phone}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-700">
                  {customer.bookings}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
