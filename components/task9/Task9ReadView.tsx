"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Accordion } from "./Accordion";
import { Task9PatientPersonal } from "@/types/task9";
import { RecordNavigation } from "@/components/navigation/RecordNavigation";
import { EmptyState } from "@/components/states/EmptyState";
import { usePatientDetails } from "@/hooks/usePatientDetails";

export const Task9ReadView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allPatients, setAllPatients] = useState<Task9PatientPersonal[]>([]);
  const [currentPatient, setCurrentPatient] =
    useState<Task9PatientPersonal | null>(null);
  const [contactDetails, setContactDetails] = useState<any>(null);
  const [medicalDetails, setMedicalDetails] = useState<any>(null);
  const [visitDetails, setVisitDetails] = useState<any[]>([]);
  const [showMoreContact, setShowMoreContact] = useState(false);
  const [hasFetchedContact, setHasFetchedContact] = useState(false);
  const [hasFetchedMedical, setHasFetchedMedical] = useState(false);
  const [hasFetchedVisits, setHasFetchedVisits] = useState(false);
  const [isPrefetching, setIsPrefetching] = useState(false);

  const queryClient = useQueryClient();
  const {
    loadingDetails,
    fetchContactDetails,
    fetchMedicalDetails,
    fetchVisitDetails,
  } = usePatientDetails();

  // Fetch all patients (only personal info) - NO PAGINATION
  const {
    data: patientsData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["task9-patients"],
    queryFn: async () => {
      const response = await fetch("/api/task9/patients");
      if (!response.ok) throw new Error("Failed to fetch patients");
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Update patients list when data arrives
  useEffect(() => {
    if (patientsData?.patients) {
      setAllPatients(patientsData.patients);
    }
  }, [patientsData]);

  // Prefetch all details for current patient in background
  useEffect(() => {
    const prefetchPatientDetails = async (patientId: number) => {
      if (!patientId || isPrefetching) return;

      setIsPrefetching(true);

      try {
        // Prefetch contact details
        await queryClient.prefetchQuery({
          queryKey: ["patient-contact", patientId],
          queryFn: () => fetchContactDetails(patientId),
          staleTime: 5 * 60 * 1000, // 5 minutes cache
        });

        // Prefetch medical details
        await queryClient.prefetchQuery({
          queryKey: ["patient-medical", patientId],
          queryFn: () => fetchMedicalDetails(patientId),
          staleTime: 5 * 60 * 1000,
        });

        // Prefetch visit details
        await queryClient.prefetchQuery({
          queryKey: ["patient-visits", patientId],
          queryFn: () => fetchVisitDetails(patientId),
          staleTime: 5 * 60 * 1000,
        });

        // Also check if data is already in cache and update state
        const cachedContact = queryClient.getQueryData([
          "patient-contact",
          patientId,
        ]);
        const cachedMedical = queryClient.getQueryData([
          "patient-medical",
          patientId,
        ]);
        const cachedVisits = queryClient.getQueryData([
          "patient-visits",
          patientId,
        ]);

        if (cachedContact) {
          setContactDetails(cachedContact);
          setHasFetchedContact(true);
        }
        if (cachedMedical) {
          setMedicalDetails(cachedMedical);
          setHasFetchedMedical(true);
        }
        if (cachedVisits) {
          setVisitDetails(cachedVisits);
          setHasFetchedVisits(true);
        }
      } catch (error) {
        // Silent fail - prefetch is just optimization
        console.log("Prefetch failed silently:", error);
      } finally {
        setIsPrefetching(false);
      }
    };

    if (currentPatient?.id) {
      prefetchPatientDetails(currentPatient.id);
    }
  }, [
    currentPatient?.id,
    queryClient,
    fetchContactDetails,
    fetchMedicalDetails,
    fetchVisitDetails,
    isPrefetching,
  ]);

  // Reset details when patient changes
  useEffect(() => {
    if (allPatients.length > 0 && currentIndex < allPatients.length) {
      const patientId = allPatients[currentIndex].id;
      loadPatientDetails(patientId);

      // Reset all states for new patient
      setCurrentPatient(allPatients[currentIndex]);
      setContactDetails(null);
      setMedicalDetails(null);
      setVisitDetails([]);
      setShowMoreContact(false);
      setHasFetchedContact(false);
      setHasFetchedMedical(false);
      setHasFetchedVisits(false);
    }
  }, [currentIndex, allPatients]);

  const loadPatientDetails = async (patientId: number) => {
    try {
      const response = await fetch(`/api/task9/patients/${patientId}`);
      if (!response.ok) throw new Error("Failed to fetch patient details");
      const data = await response.json();
      setCurrentPatient(data.patient);
    } catch (error) {
      toast.error("Failed to load patient details");
      console.error("Error fetching patient details:", error);
    }
  };

  const handleLoadContactDetails = async () => {
    if (!currentPatient?.id) return;

    // Check cache first
    const cachedData = queryClient.getQueryData([
      "patient-contact",
      currentPatient.id,
    ]);
    if (cachedData) {
      setContactDetails(cachedData);
      setHasFetchedContact(true);
      return;
    }

    // If not in cache, fetch fresh
    const contact = await fetchContactDetails(currentPatient.id);
    if (contact) {
      setContactDetails(contact);
      setHasFetchedContact(true);
    }
  };

  const handleLoadMedicalDetails = async () => {
    if (!currentPatient?.id) return;

    // Check cache first
    const cachedData = queryClient.getQueryData([
      "patient-medical",
      currentPatient.id,
    ]);
    if (cachedData) {
      setMedicalDetails(cachedData);
      setHasFetchedMedical(true);
      return;
    }

    // If not in cache, fetch fresh
    const medical = await fetchMedicalDetails(currentPatient.id);
    if (medical) {
      setMedicalDetails(medical);
      setHasFetchedMedical(true);
    }
  };

  const handleLoadVisitDetails = async () => {
    if (!currentPatient?.id) return;

    // Check cache first
    const cachedData = queryClient.getQueryData([
      "patient-visits",
      currentPatient.id,
    ]);
    if (cachedData) {
      setVisitDetails(cachedData);
      setHasFetchedVisits(true);
      return;
    }

    // If not in cache, fetch fresh
    const visits = await fetchVisitDetails(currentPatient.id);
    if (visits) {
      setVisitDetails(visits);
      setHasFetchedVisits(true);
    }
  };

  const handleShowMoreContact = () => {
    setShowMoreContact(true);
  };

  const navigationHandlers = {
    goToFirst: () => setCurrentIndex(0),
    goToPrevious: () => setCurrentIndex(Math.max(0, currentIndex - 1)),
    goToNext: () =>
      setCurrentIndex(Math.min(allPatients.length - 1, currentIndex + 1)),
    goToLast: () => setCurrentIndex(allPatients.length - 1),
  };

  // Show query errors
  if (queryError) {
    toast.error("Failed to load patients");
    console.error("Query error:", queryError);
  }

  // Render states
  if (isLoading) return null;
  if (allPatients.length === 0) return <EmptyState />;

  return (
    <div className="max-w-6xl w-full mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Patient Records View
        </h1>
        <p className="text-gray-600 mt-2">
          View and navigate through patient records
        </p>
      </div>

      <div className="grid grid-cols-1  gap-6">
        {/* Patient Details */}
        <div className=" space-y-6">
          {/* Personal Information (Always shown from initial fetch) */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
              Patient Information
            </h2>
            {currentPatient && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <InfoField label="Full Name" value={currentPatient.fullName} />
                <InfoField label="Gender" value={currentPatient.gender} />
                <InfoField
                  label="Date of Birth"
                  value={new Date(
                    currentPatient.dateOfBirth
                  ).toLocaleDateString()}
                />
                <InfoField label="Age" value={`${currentPatient.age} years`} />
                <InfoField label="CNIC" value={currentPatient.cnic} />
                <InfoField
                  label="Marital Status"
                  value={currentPatient.maritalStatus}
                />
                <InfoField
                  label="Blood Group"
                  value={currentPatient.bloodGroup}
                />
                <InfoField
                  label="Record Created"
                  value={new Date(
                    currentPatient.createdAt
                  ).toLocaleDateString()}
                />
              </div>
            )}
          </div>

          {/* Contact & Address Details Accordion */}
          <Accordion
            title="📞 Contact & Address Details"
            defaultOpen={false}
            loading={loadingDetails.contact}
            showMoreButton={!hasFetchedContact}
            onShowMore={handleLoadContactDetails}
            showMoreLabel="Load Contact Details"
          >
            {contactDetails && (
              <div className="space-y-4">
                {/* First 3 fields - Always shown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoField
                    label="Phone Number"
                    value={contactDetails.phoneNumber}
                  />
                  <InfoField
                    label="Emergency Contact"
                    value={contactDetails.emergencyContact}
                  />
                  <InfoField label="City" value={contactDetails.city} />
                </div>

                {/* Remaining 2 fields - Show only when See More is clicked */}
                {showMoreContact ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t pt-4">
                    <InfoField
                      label="Email Address"
                      value={contactDetails.email || "Not provided"}
                    />
                    <div className="md:col-span-2">
                      <InfoField
                        label="Full Address"
                        value={contactDetails.address}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center mt-4 pt-4 border-t">
                    <button
                      onClick={handleShowMoreContact}
                      className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      See More Details
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      Click to view email and full address
                    </p>
                  </div>
                )}
              </div>
            )}
          </Accordion>

          {/* Medical History Accordion */}
          <Accordion
            title="🏥 Medical History"
            defaultOpen={false}
            loading={loadingDetails.medical}
            showMoreButton={!hasFetchedMedical}
            onShowMore={handleLoadMedicalDetails}
            showMoreLabel="Load Medical History"
          >
            {medicalDetails && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Chronic Diseases
                  </h4>
                  {medicalDetails.chronicDiseases.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {medicalDetails.chronicDiseases.map((disease: string) => (
                        <span
                          key={disease}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                        >
                          {disease}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No chronic diseases recorded
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Past Surgeries
                  </h4>
                  {medicalDetails.pastSurgeries.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {medicalDetails.pastSurgeries.map((surgery: string) => (
                        <span
                          key={surgery}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {surgery}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No past surgeries recorded</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Current Conditions
                  </h4>
                  {medicalDetails.currentConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {medicalDetails.currentConditions.map(
                        (condition: string) => (
                          <span
                            key={condition}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {condition}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No current conditions recorded
                    </p>
                  )}
                </div>
              </div>
            )}
          </Accordion>

          {/* Current Visit & Vitals Accordion */}
          <Accordion
            title="📋 Current Visit & Vitals"
            defaultOpen={false}
            loading={loadingDetails.visits}
            showMoreButton={!hasFetchedVisits}
            onShowMore={handleLoadVisitDetails}
            showMoreLabel="Load Visit Details"
          >
            {visitDetails.length > 0 ? (
              <div className="space-y-4">
                {visitDetails.map((visit) => (
                  <div key={visit.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoField label="Visit Type" value={visit.visitType} />
                      <InfoField
                        label="Assigned Doctor"
                        value={visit.assignedDoctor}
                      />
                      <div className="md:col-span-2">
                        <InfoField
                          label="Reason for Visit"
                          value={visit.reason}
                        />
                      </div>
                      <InfoField
                        label="Visit Date"
                        value={new Date(visit.createdAt).toLocaleDateString()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No visit records found</p>
            )}
          </Accordion>
        </div>

        <div className="bg-white rounded-xl flex items-center justify-center shadow p-4">
          <RecordNavigation
            currentIndex={currentIndex}
            totalRecords={allPatients.length}
            onFirst={navigationHandlers.goToFirst}
            onPrevious={navigationHandlers.goToPrevious}
            onNext={navigationHandlers.goToNext}
            onLast={navigationHandlers.goToLast}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying information
const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);
