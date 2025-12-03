"use client";

import { useState, useEffect } from "react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface SingleFileUploadProps {
  label: string;
  value: UploadedFile | null;
  onChange: (file: UploadedFile | null) => void;
  readOnly: boolean;
  error?: any;
}

export const SingleFileUpload = ({
  label,
  value,
  onChange,
  readOnly,
  error,
}: SingleFileUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Set preview URL when value changes
  useEffect(() => {
    if (value?.url) {
      setPreviewUrl(value.url);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !readOnly) {
      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
      onChange(uploadedFile);
    }
  };

  const removeFile = () => {
    if (value?.url && value.url.startsWith("blob:")) {
      URL.revokeObjectURL(value.url);
    }
    setPreviewUrl(null);
    onChange(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "File uploaded";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!readOnly) setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    if (readOnly) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
      onChange(uploadedFile);
    }
  };

  // Check if file is an image - FIXED: Add safe check
  const isImage = value?.type?.startsWith("image/") || false;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-400">{label}</label>

      {value ? (
        <div className="border rounded-lg p-4">
          <div className="space-y-4">
            {/* File Preview */}
            {isImage && previewUrl ? (
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 border rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={previewUrl}
                    alt={value.name}
                    className="w-full h-full object-contain"
                    onError={() => setPreviewUrl(null)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Image Preview</p>
              </div>
            ) : (
              <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-lg">
                  <span className="text-2xl text-blue-600">📄</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Document File</p>
              </div>
            )}

            {/* File Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-400 truncate">
                    {value.name}
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-500">
                      {formatFileSize(value.size)}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">
                      {value.type?.split("/")[1]?.toUpperCase() || "FILE"}
                    </span>
                  </div>
                </div>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={removeFile}
                    className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Download link for readonly mode */}
              {readOnly && value.url && !value.url.startsWith("blob:") && (
                <a
                  href={value.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                  Download File
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            dragging
              ? "border-blue-500 bg-blue-50 scale-[1.02]"
              : "border-gray-300 hover:border-gray-400"
          } ${
            readOnly
              ? "cursor-not-allowed opacity-50"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            disabled={readOnly}
            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            <svg
              className={`w-12 h-12 mb-3 ${
                dragging ? "text-blue-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 text-center">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 text-center">
              PNG, JPG, PDF, DOC (MAX. 5MB)
            </p>
            {dragging && (
              <p className="mt-2 text-xs text-blue-500 font-medium">
                Drop file here...
              </p>
            )}
          </div>
        </label>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
