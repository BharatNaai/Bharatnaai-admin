import api from "../user/services/axiosConfig";

/**
 * Partner API Service
 * All endpoints for Partner management
 */

// GET: List all partners
export const getPartners = async (params = {}) => {
  try {
    const response = await api.get("/admin/partners", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
};

// GET: Get partner by ID
export const getPartnerById = async (id) => {
  try {
    const response = await api.get(`/admin/partners/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching partner details:", error);
    throw error;
  }
};

// POST: Create new partner
export const createPartner = async (body) => {
  try {
    const response = await api.post("/admin/partners", body);
    return response.data;
  } catch (error) {
    console.error("Error creating partner:", error);
    throw error;
  }
};

// PUT: Update partner
export const updatePartner = async (id, body) => {
  try {
    const response = await api.put(`/admin/partners/${id}`, body);
    return response.data;
  } catch (error) {
    console.error("Error updating partner:", error);
    throw error;
  }
};

// POST: Approve partner
export const approvePartner = async (id) => {
  try {
    const response = await api.post(`/admin/partners/${id}/approve`);
    return response.data;
  } catch (error) {
    console.error("Error approving partner:", error);
    throw error;
  }
};

// POST: Reject partner
export const rejectPartner = async (id) => {
  try {
    const response = await api.post(`/admin/partners/${id}/reject`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting partner:", error);
    throw error;
  }
};

export default {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  approvePartner,
  rejectPartner,
};
