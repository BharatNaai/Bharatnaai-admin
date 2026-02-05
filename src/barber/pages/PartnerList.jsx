import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePartners } from "../hooks/usePartners";
import * as partnerApi from "../../barber/partner.api";
import { FiSearch, FiEdit2, FiEye, FiCheck, FiX } from "react-icons/fi";

const PartnerList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { partners, loading, error, refetch } = usePartners();

  // Filter partners based on search and status
  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || partner.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this partner?")) {
      try {
        await partnerApi.approvePartner(id);
        alert("Partner approved successfully!");
        refetch();
      } catch (error) {
        alert("Failed to approve partner: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this partner?")) {
      try {
        await partnerApi.rejectPartner(id);
        alert("Partner rejected successfully!");
        refetch();
      } catch (error) {
        alert("Failed to reject partner: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase() || "";
    const colors = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      active: "bg-blue-100 text-blue-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          colors[statusLower] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status || "N/A"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading partners...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Get current path to determine if we're in user or barber dashboard
  const currentPath = window.location.pathname;
  const isUserDashboard = currentPath.startsWith("/user");
  const basePath = isUserDashboard ? "/user/partners" : "/barber/partners";

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Partner Management</h1>
        <button
          onClick={() => navigate(`${basePath}/create`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Create Partner
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by business name, owner name, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredPartners.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No partners found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPartners.map((partner) => (
                  <tr key={partner.id || partner.partnerId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {partner.businessName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {partner.ownerName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {partner.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(partner.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {partner.createdAt
                        ? new Date(partner.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`${basePath}/${partner.id || partner.partnerId}`)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`${basePath}/${partner.id || partner.partnerId}/edit`)
                          }
                          className="text-green-600 hover:text-green-900 flex items-center gap-1"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        {partner.status?.toLowerCase() === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(partner.id || partner.partnerId)}
                              className="text-green-600 hover:text-green-900 flex items-center gap-1"
                              title="Approve"
                            >
                              <FiCheck />
                            </button>
                            <button
                              onClick={() => handleReject(partner.id || partner.partnerId)}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1"
                              title="Reject"
                            >
                              <FiX />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredPartners.length} of {partners.length} partners
      </div>
    </div>
  );
};

export default PartnerList;
