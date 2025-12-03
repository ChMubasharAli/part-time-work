"use client";

import { useState } from "react";
import { DOCUMENT_TYPES } from "@/lib/constants";

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

interface NamedFilesUploadProps {
  label: string;
  value: NamedFile[];
  onChange: (files: NamedFile[]) => void;
  readOnly: boolean;
  error?: any;
}

export const NamedFilesUpload = ({
  label,
  value,
  onChange,
  readOnly,
  error,
}: NamedFilesUploadProps) => {
  const [dragging, setDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && !readOnly) {
      const newNamedFiles: NamedFile[] = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file: {
          id: `${Date.now()}-file-${index}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        },
        documentType: "Passport",
        customName: file.name.replace(/\.[^/.]+$/, ""),
      }));
      onChange([...value, ...newNamedFiles]);
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = value.find((item) => item.id === id);
    if (fileToRemove?.file?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(fileToRemove.file.url);
    }
    const newFiles = value.filter((item) => item.id !== id);
    onChange(newFiles);
  };

  const updateFileName = (
    id: string,
    field: "customName" | "documentType",
    newValue: string
  ) => {
    const updatedFiles = value.map((item) =>
      item.id === id ? { ...item, [field]: newValue } : item
    );
    onChange(updatedFiles);
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
      const newNamedFiles: NamedFile[] = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file: {
          id: `${Date.now()}-file-${index}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        },
        documentType: "Passport",
        customName: file.name.replace(/\.[^/.]+$/, ""),
      }));
      onChange([...value, ...newNamedFiles]);
    }
  };

  const isImage = (type?: string) => type?.startsWith("image/") || false;

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-gray-400">{label}</label>

      {/* Uploaded files list with previews */}
      {value.length > 0 && (
        <div className="space-y-4">
          {value.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="space-y-4">
                {/* File Preview Section */}
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* File Preview */}
                  <div className="flex-shrink-0">
                    {isImage(item.file?.type) ? (
                      <div className="relative w-40 h-40 bg-gray-100 rounded-lg overflow-hidden border">
                        <img
                          src={item.file.url}
                          alt={item.file.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                                  <span class="text-2xl mb-1">🖼️</span>
                                  <span class="text-xs text-gray-500">Preview unavailable</span>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 bg-blue-50 rounded-lg border flex flex-col items-center justify-center">
                        <span className="text-4xl mb-2">
                          {item.file?.type?.includes("pdf") ? "📕" : "📄"}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          {item.file?.type?.split("/")[1]?.toUpperCase() ||
                            "DOC"}
                        </span>
                      </div>
                    )}

                    {/* Download link for readonly mode */}
                    {readOnly &&
                      item.file?.url &&
                      !item.file.url?.startsWith("blob:") && (
                        <a
                          href={item.file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center justify-center w-full text-sm text-blue-600 hover:text-blue-800 py-1"
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
                          Download
                        </a>
                      )}
                  </div>

                  {/* File Details */}
                  <div className="flex-1 space-y-4">
                    {/* Original File Info */}
                    <div className="border-b pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mb-1">
                            Original File
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-medium text-gray-400 truncate">
                              {item.file?.name || "Unnamed file"}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {formatFileSize(item.file?.size || 0)}
                            </span>
                          </div>
                        </div>
                        {!readOnly && (
                          <button
                            type="button"
                            onClick={() => removeFile(item.id)}
                            className="ml-4 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Document Type Dropdown */}
                    <div>
                      <label className="text-sm text-gray-500 mb-2 block">
                        Document Type
                      </label>
                      {readOnly ? (
                        <div className="px-3 py-2 border border-gray-300 rounded bg-gray-50">
                          <span className="font-medium text-gray-400">
                            {item.documentType}
                          </span>
                        </div>
                      ) : (
                        <select
                          value={item.documentType}
                          onChange={(e) =>
                            updateFileName(
                              item.id,
                              "documentType",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {DOCUMENT_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Custom Name Input */}
                    <div>
                      <label className="text-sm text-gray-500 mb-2 block">
                        Custom File Name
                      </label>
                      {readOnly ? (
                        <div className="px-3 py-2 border border-gray-300 rounded bg-gray-50">
                          <span className="font-medium text-gray-400">
                            {item.customName}
                          </span>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={item.customName}
                          onChange={(e) =>
                            updateFileName(
                              item.id,
                              "customName",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter a descriptive name"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {!readOnly && (
        <label
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
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
            accept="*"
          />
          <div className="flex flex-col items-center justify-center p-6">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mb-1 text-sm text-gray-500 text-center">
              <span className="font-semibold">Click to upload documents</span>
            </p>
            <p className="text-xs text-gray-500 text-center mb-2">
              Add custom names and select document types
            </p>
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <span>📷 Images</span>
              <span>📕 PDFs</span>
              <span>📄 Documents</span>
            </div>
            {dragging && (
              <p className="mt-2 text-sm text-blue-500 font-medium">
                Drop documents here...
              </p>
            )}
          </div>
        </label>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
