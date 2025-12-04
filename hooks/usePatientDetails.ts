"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface UsePatientDetailsReturn {
  loadingDetails: {
    contact: boolean;
    medical: boolean;
    visits: boolean;
  };
  fetchContactDetails: (patientId: number) => Promise<any>;
  fetchMedicalDetails: (patientId: number) => Promise<any>;
  fetchVisitDetails: (patientId: number) => Promise<any>;
}

export const usePatientDetails = (): UsePatientDetailsReturn => {
  const [loadingDetails, setLoadingDetails] = useState({
    contact: false,
    medical: false,
    visits: false,
  });

  const fetchContactDetails = useCallback(async (patientId: number) => {
    setLoadingDetails((prev) => ({ ...prev, contact: true }));
    try {
      const response = await fetch(`/api/task9/patients/${patientId}/contact`);
      const data = await response.json();

      if (response.ok) {
        return data.contact;
      } else {
        toast.error(data.error || "Failed to load contact details");
        return null;
      }
    } catch (error: any) {
      toast.error("Error fetching contact details");
      console.error("Error fetching contact details:", error);
      return null;
    } finally {
      setLoadingDetails((prev) => ({ ...prev, contact: false }));
    }
  }, []);

  const fetchMedicalDetails = useCallback(async (patientId: number) => {
    setLoadingDetails((prev) => ({ ...prev, medical: true }));
    try {
      const response = await fetch(`/api/task9/patients/${patientId}/medical`);
      const data = await response.json();

      if (response.ok) {
        return data.medical;
      } else {
        toast.error(data.error || "Failed to load medical history");
        return null;
      }
    } catch (error: any) {
      toast.error("Error fetching medical details");
      console.error("Error fetching medical details:", error);
      return null;
    } finally {
      setLoadingDetails((prev) => ({ ...prev, medical: false }));
    }
  }, []);

  const fetchVisitDetails = useCallback(async (patientId: number) => {
    setLoadingDetails((prev) => ({ ...prev, visits: true }));
    try {
      const response = await fetch(`/api/task9/patients/${patientId}/visits`);
      const data = await response.json();

      if (response.ok) {
        return data.visits || [];
      } else {
        toast.error(data.error || "Failed to load visit details");
        return [];
      }
    } catch (error: any) {
      toast.error("Error fetching visit details");
      console.error("Error fetching visit details:", error);
      return [];
    } finally {
      setLoadingDetails((prev) => ({ ...prev, visits: false }));
    }
  }, []);

  return {
    loadingDetails,
    fetchContactDetails,
    fetchMedicalDetails,
    fetchVisitDetails,
  };
};
