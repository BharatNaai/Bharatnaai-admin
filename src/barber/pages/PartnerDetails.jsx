import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { usePartner } from "../hooks/usePartners";
import { FiArrowLeft, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import * as partnerApi from "../../barber/partner.api";

const PartnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { partner, loading, error } = usePartner(id);

  // Determine base path based on current route
  const currentPath = location.pathname;
  const isUserDashboard = currentPath.startsWith("/user");
  const basePath = isUserDashboard ? "/user/partners" : "/barber/partners";

  const handleApprove = async () => {
    if (window.confirm("Are you sure you want to approve this partner?")) {
      try {
        await partnerApi.approvePartner(id);
        alert("Partner approved successfully!");
        window.location.reload();
      } catch (error) {
        alert("Failed to approve partner: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleReject = async () => {
    if (window.confirm("Are you sure you want to reject this partner?")) {
      try {
        await partnerApi.rejectPartner(id);
        alert("Partner rejected successfully!");
        window.location.reload();
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
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
        <p className="text-lg">Loading partner details...</p>
      </div>
    );
  }

  if (error || !partner) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error || "Partner not found"}</p>
          <button
            onClick={() => navigate(basePath)}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Partners
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate(basePath)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <FiArrowLeft /> Back to Partners
        </button>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Partner Details</h1>
          <div className="flex gap-2">
            {partner.status?.toLowerCase() === "pending" && (
              <>
                <button
                  onClick={handleApprove}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <FiCheck /> Approve
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <FiX /> Reject
                </button>
              </>
            )}
            <button
              onClick={() => navigate(`${basePath}/${id}/edit`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FiEdit2 /> Edit
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Status Badge */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Status</h2>
          {getStatusBadge(partner.status)}
        </div>

        {/* Basic Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Business Name</label>
              <p className="text-lg mt-1">{partner.businessName || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Owner Name</label>
              <p className="text-lg mt-1">{partner.ownerName || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-lg mt-1">{partner.phone || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg mt-1">{partner.email || "N/A"}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-lg mt-1">{partner.address || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {(partner.createdAt || partner.updatedAt) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Timestamps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partner.createdAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="text-lg mt-1">
                    {new Date(partner.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
              {partner.updatedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Updated At</label>
                  <p className="text-lg mt-1">
                    {new Date(partner.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Documents Section (if available) */}
        {partner.documents && partner.documents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Documents</h2>
            <div className="space-y-2">
              {partner.documents.map((doc, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <span>{doc.name || doc.type || `Document ${index + 1}`}</span>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display any additional fields */}
        {Object.keys(partner).some(
          (key) =>
            !["id", "partnerId", "businessName", "ownerName", "phone", "email", "address", "status", "createdAt", "updatedAt", "documents"].includes(key)
        ) && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(partner)
                .filter(
                  ([key]) =>
                    !["id", "partnerId", "businessName", "ownerName", "phone", "email", "address", "status", "createdAt", "updatedAt", "documents"].includes(key)
                )
                .map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-gray-500">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <p className="text-lg mt-1">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDetails;
