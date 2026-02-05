import { useState, useEffect } from "react";
import * as partnerApi from "../partner.api";

/**
 * Custom hook for managing partners
 */
export const usePartners = (filters = {}) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await partnerApi.getPartners(filters);
      setPartners(Array.isArray(data) ? data : data?.partners || data?.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch partners");
      console.error("Error in usePartners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return {
    partners,
    loading,
    error,
    refetch: fetchPartners,
  };
};

/**
 * Custom hook for managing a single partner
 */
export const usePartner = (id) => {
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartner = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await partnerApi.getPartnerById(id);
        setPartner(data);
      } catch (err) {
        setError(err.message || "Failed to fetch partner");
        console.error("Error in usePartner:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [id]);

  return {
    partner,
    loading,
    error,
  };
};
