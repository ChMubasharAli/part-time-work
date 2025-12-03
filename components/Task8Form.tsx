"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BasicTab } from "./tabs/BasicTab";
import { EndDateTab } from "./tabs/EndDateTab";
import { AdditionalTab } from "./tabs/AdditionalTab";
import { RecordNavigation } from "@/components/navigation/RecordNavigation";
import { FormActions } from "@/components/forms/FormActions";
import { TabsNavigation } from "./navigation/TabNavigation";
import { TASK8_FORM_MODES, Task8FormMode } from "@/lib/constants";
import { LoadingState } from "@/components/states/LoadingState";
import { EmptyState } from "@/components/states/EmptyState";
import { Task8FormData, task8FormSchema } from "@/lib/validations";

interface Task8FormProps {
  mode: Task8FormMode;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface NamedFile {
  id: string;
  file: UploadedFile;
  documentType: string;
  customName: string;
}

interface Task8User {
  id?: number;

  // Basic Tab Fields
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  maritalStatus: string;
  gender: string;
  estimatedStartDate: string;

  // End Date Tab Fields
  country: string;
  address: string;
  city: string;
  estimatedEndDate: string;

  // Additional Tab Fields
  subscriptionType: string;
  communicationPref: string;
  salaryRange: string;
  profilePicture: UploadedFile | null;
  supportingDocuments: UploadedFile[];
  namedFiles: NamedFile[];
}

export const Task8Form = ({ mode }: Task8FormProps) => {
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "BASIC" | "END_DATE" | "ADDITIONAL"
  >("BASIC");
  const [allRecords, setAllRecords] = useState<Task8User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  // TanStack Query
  const {
    data,
    isLoading,
    isFetching,
    error: queryError,
  } = useQuery({
    queryKey: ["task8-records", currentPage],
    queryFn: async () => {
      const response = await fetch(
        `/api/task8/records?page=${currentPage}&limit=10`
      );
      if (!response.ok) throw new Error("Failed to fetch records");
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const records = data?.records || [];
  const hasMore = data?.hasMore || false;

  // Derived values
  const currentUser = allRecords[currentIndex];
  const isReadOnly = mode === TASK8_FORM_MODES.READONLY;
  const isCreateMode = mode === TASK8_FORM_MODES.CREATE;
  const isEditMode = mode === TASK8_FORM_MODES.EDIT;

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Task8FormData>({
    resolver: isReadOnly ? undefined : zodResolver(task8FormSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  // Helper functions
  const formatDate = (dateString: string) =>
    dateString ? dateString.split("T")[0] : "";

  // Helper: Get MIME type from filename
  const getMimeType = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.endsWith(".png")) return "image/png";
    if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
    if (lower.endsWith(".gif")) return "image/gif";
    if (lower.endsWith(".pdf")) return "application/pdf";
    if (lower.endsWith(".doc")) return "application/msword";
    if (lower.endsWith(".docx"))
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (lower.endsWith(".txt")) return "text/plain";
    return "application/octet-stream";
  };

  // Helper: Convert URL string to file object for components
  const urlToFileObject = (
    url: string,
    name?: string,
    size?: number
  ): UploadedFile | null => {
    if (!url || typeof url !== "string") return null;

    // Extract filename from URL
    let filename = name || "uploaded-file";
    if (url.includes("/")) {
      const parts = url.split("/");
      const lastPart = parts[parts.length - 1];
      if (lastPart && lastPart.includes(".")) {
        filename = lastPart;
      }
    }

    return {
      id: Date.now().toString(),
      name: filename,
      size: size || 0, // Size unknown from URL
      type: getMimeType(filename),
      url: url,
    };
  };

  // Helper: Convert URL string to NamedFile object
  const urlToNamedFile = (
    url: string,
    documentType: string,
    customName: string,
    size?: number
  ): NamedFile | null => {
    const file = urlToFileObject(url, customName, size);
    if (!file) return null;

    return {
      id: Date.now().toString(),
      file,
      documentType,
      customName,
    };
  };

  // Populate form with user data
  const populateForm = useCallback(
    (user: Task8User) => {
      // Convert URLs to file objects for components
      const profilePicObj = user.profilePicture ? user.profilePicture : null;

      const supportingDocsObjs = user.supportingDocuments || [];

      const namedFilesObjs = user.namedFiles || [];

      const formData: Task8FormData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        status: user.status || "",
        maritalStatus: user.maritalStatus || "",
        gender: user.gender || "",
        estimatedStartDate: formatDate(user.estimatedStartDate) || "",
        country: user.country || "",
        address: user.address || "",
        city: user.city || "",
        estimatedEndDate: formatDate(user.estimatedEndDate) || "",
        subscriptionType: user.subscriptionType || "basic",
        communicationPref: user.communicationPref || "email",
        salaryRange: user.salaryRange || "50000",
        profilePicture: profilePicObj,
        supportingDocuments: supportingDocsObjs,
        namedFiles: namedFilesObjs,
      };
      reset(formData);
    },
    [reset]
  );

  // File upload function - FIXED VERSION
  const uploadFile = async (
    fileObject: UploadedFile | any
  ): Promise<string | null> => {
    try {
      // If already a URL string (from database), return it
      if (typeof fileObject === "string") {
        return fileObject;
      }

      // If it's an UploadedFile object with blob URL
      if (fileObject?.url && fileObject.url.startsWith("blob:")) {
        // Fetch the blob
        const response = await fetch(fileObject.url);
        const blob = await response.blob();

        // Create FormData
        const formData = new FormData();
        formData.append("file", blob, fileObject.name);

        // Upload to server
        const uploadResponse = await fetch("/api/task8/upload", {
          method: "POST",
          body: formData,
        });

        const result = await uploadResponse.json();

        if (uploadResponse.ok) {
          return result.url;
        } else {
          console.error("Upload failed:", result.error);
          return null;
        }
      }

      // If it's already a server URL, return it
      if (fileObject?.url && fileObject.url.startsWith("/uploads/")) {
        return fileObject.url;
      }

      return null;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // Effects
  useEffect(() => {
    if (isCreateMode) {
      reset(getDefaultValues());
      return;
    }

    if (records.length > 0) {
      setAllRecords((prev) => {
        const existingIds = new Set(prev.map((record) => record.id));
        const newRecords = records.filter(
          (record: Task8User) => record.id && !existingIds.has(record.id)
        );
        return newRecords.length > 0 ? [...prev, ...newRecords] : prev;
      });
    }

    if (currentUser) {
      populateForm(currentUser);
    }

    // Prefetch next page
    if (
      !isCreateMode &&
      allRecords.length > 0 &&
      currentIndex >= Math.floor(allRecords.length * 0.6) &&
      hasMore &&
      !isFetching
    ) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["task8-records", nextPage],
        queryFn: async () => {
          const response = await fetch(
            `/api/task8/records?page=${nextPage}&limit=10`
          );
          if (!response.ok) throw new Error("Failed to fetch records");
          return response.json();
        },
      });
    }
  }, [
    isCreateMode,
    records,
    currentUser,
    currentIndex,
    allRecords.length,
    hasMore,
    isFetching,
    currentPage,
    queryClient,
    populateForm,
    reset,
  ]);

  useEffect(() => {
    if (!isCreateMode && currentIndex >= allRecords.length && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentIndex, allRecords.length, hasMore, isCreateMode]);

  // Form submission
  const onSubmit = async (formData: Task8FormData) => {
    setSubmitting(true);
    try {
      console.log("Starting form submission...");

      // Upload files and get URLs
      let profilePictureUrl = null;
      let supportingDocsUrls: string[] = [];
      let namedFilesData: any[] = [];

      // 1. Upload Profile Picture
      if (formData.profilePicture) {
        console.log("Uploading profile picture...");
        const uploadedUrl = await uploadFile(formData.profilePicture);
        if (uploadedUrl) {
          profilePictureUrl = uploadedUrl;
          console.log("Profile picture uploaded:", profilePictureUrl);
        }
      }

      // 2. Upload Supporting Documents - FIXED: Handle undefined
      const supportingDocs = formData.supportingDocuments || [];
      console.log(`Supporting docs count: ${supportingDocs.length}`);

      if (supportingDocs.length > 0) {
        console.log(
          `Uploading ${supportingDocs.length} supporting documents...`
        );
        const uploadPromises = supportingDocs.map((file) => uploadFile(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        supportingDocsUrls = uploadedUrls.filter(
          (url): url is string => url !== null
        );
        console.log(
          "Supporting documents uploaded:",
          supportingDocsUrls.length
        );
      }

      // 3. Upload Named Files - FIXED: Handle undefined
      const namedFiles = formData.namedFiles || [];
      console.log(`Named files count: ${namedFiles.length}`);

      if (namedFiles.length > 0) {
        console.log(`Uploading ${namedFiles.length} named files...`);
        const namedFilesUploadPromises = namedFiles.map(async (item) => {
          const fileUrl = await uploadFile(item.file);
          return {
            ...item,
            file: fileUrl || "",
          };
        });
        namedFilesData = await Promise.all(namedFilesUploadPromises);
        console.log("Named files uploaded:", namedFilesData.length);
      }

      // Prepare API data with URLs
      const apiData = {
        mode,
        userId: currentUser?.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        status: formData.status,
        maritalStatus: formData.maritalStatus,
        gender: formData.gender,
        estimatedStartDate: formData.estimatedStartDate,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        estimatedEndDate: formData.estimatedEndDate,
        subscriptionType: formData.subscriptionType,
        communicationPref: formData.communicationPref,
        salaryRange: parseInt(formData.salaryRange) || 50000,
        profilePicture: profilePictureUrl,
        supportingDocuments: supportingDocsUrls,
        namedFiles: namedFilesData,
      };

      console.log("Sending data to save API...");

      // Save to database
      const response = await fetch("/api/task8/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Record saved successfully!");
        if (isCreateMode) {
          queryClient.invalidateQueries({
            queryKey: ["task8-records"],
          });
          reset(getDefaultValues());
          setActiveTab("BASIC");
        }
      } else {
        toast.error(result.error || "Error saving record");
      }
    } catch (error: any) {
      toast.error("Error saving data");
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Save with validation
  const handleSave = () => {
    handleSubmit(onSubmit)().catch((error) => {
      console.error("Form submission error:", error);
    });
  };

  // Cancel handler
  const handleCancel = () => {
    if (isCreateMode) {
      reset(getDefaultValues());
    } else if (currentUser) {
      populateForm(currentUser);
    }
    setActiveTab("BASIC");
  };

  // Navigation
  const navigationHandlers = {
    goToFirst: () => setCurrentIndex(0),
    goToPrevious: () => setCurrentIndex(Math.max(0, currentIndex - 1)),
    goToNext: () => setCurrentIndex(currentIndex + 1),
    goToLast: () => setCurrentIndex(allRecords.length - 1),
  };

  // Show query errors
  if (queryError) {
    toast.error("Failed to load records");
    console.error("Query error:", queryError);
  }

  // Render states
  if (isLoading && allRecords.length === 0) return <LoadingState />;
  if (mode !== TASK8_FORM_MODES.CREATE && allRecords.length === 0)
    return <EmptyState />;

  return (
    <div className="max-w-6xl w-full mx-auto p-6">
      <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {activeTab === "BASIC" && (
            <BasicTab
              register={register}
              errors={errors}
              readOnly={isReadOnly}
            />
          )}

          {activeTab === "END_DATE" && (
            <EndDateTab
              register={register}
              errors={errors}
              readOnly={isReadOnly}
            />
          )}

          {activeTab === "ADDITIONAL" && (
            <AdditionalTab
              register={register}
              errors={errors}
              readOnly={isReadOnly}
              watch={watch}
              setValue={setValue}
            />
          )}

          <div className="flex gap-10 pt-20 justify-center items-center">
            {mode !== TASK8_FORM_MODES.CREATE && (
              <RecordNavigation
                currentIndex={currentIndex}
                totalRecords={allRecords.length}
                onFirst={navigationHandlers.goToFirst}
                onPrevious={navigationHandlers.goToPrevious}
                onNext={navigationHandlers.goToNext}
                onLast={navigationHandlers.goToLast}
                disabled={submitting || isFetching}
              />
            )}

            <FormActions
              onSubmit={handleSave}
              onCancel={handleCancel}
              submitting={submitting}
              navigating={isFetching}
              readOnly={isReadOnly}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

// Default values
function getDefaultValues(): Task8FormData {
  return {
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    maritalStatus: "",
    gender: "",
    estimatedStartDate: "",
    country: "",
    address: "",
    city: "",
    estimatedEndDate: "",
    subscriptionType: "basic",
    communicationPref: "email",
    salaryRange: "50000",
    profilePicture: null,
    supportingDocuments: [],
    namedFiles: [],
  };
}
