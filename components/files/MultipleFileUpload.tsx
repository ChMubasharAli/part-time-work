"use client";

import { useState } from "react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface MultipleFileUploadProps {
  label: string;
  value: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  readOnly: boolean;
  error?: any;
}

export const MultipleFileUpload = ({
  label,
  value,
  onChange,
  readOnly,
  error,
}: MultipleFileUploadProps) => {
  const [dragging, setDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && !readOnly) {
      const newFiles: UploadedFile[] = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));
      onChange([...value, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = value.find((file) => file.id === id);
    if (fileToRemove?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    const newFiles = value.filter((file) => file.id !== id);
    onChange(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "Uploaded";
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

    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      const newFiles: UploadedFile[] = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));
      onChange([...value, ...newFiles]);
    }
  };

  const isImage = (type?: string) => type?.startsWith("image/") || false;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-400">{label}</label>

      {/* Uploaded files list with previews */}
      {value.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {value.map((file, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
              >
                <div className="space-y-3">
                  {/* File Preview */}
                  {isImage(file.type) ? (
                    <div className="relative h-32 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gray-200">
                                <span class="text-2xl text-gray-400">🖼️</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-blue-50 rounded flex flex-col items-center justify-center">
                      <span className="text-3xl mb-2">
                        {file.type?.includes("pdf") ? "📕" : "📄"}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {file.type?.split("/")[1]?.toUpperCase() || "DOCUMENT"}
                      </span>
                    </div>
                  )}

                  {/* File Info */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-400 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="ml-2 text-red-600 hover:text-red-800 flex-shrink-0"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Download link for readonly mode */}
                    {readOnly && file.url && !file.url?.startsWith("blob:") && (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          className="w-3 h-3 mr-1"
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
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload area */}
      {!readOnly && (
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            dragging
              ? "border-blue-500 bg-blue-50 scale-[1.02]"
              : "border-gray-300 hover:border-gray-400"
          } bg-gray-50 hover:bg-gray-100`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            multiple
            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
          />
          <div className="flex flex-col items-center justify-center p-4">
            <svg
              className={`w-8 h-8 mb-2 ${
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-sm text-gray-500 text-center">
              {value.length > 0
                ? "Add more files"
                : "Click to upload multiple files"}
            </p>
            <p className="text-xs text-gray-500 text-center">
              or drag and drop here
            </p>
            {dragging && (
              <p className="mt-1 text-xs text-blue-500 font-medium">
                Drop files here...
              </p>
            )}
          </div>
        </label>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
