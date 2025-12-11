"use client";

import { Member } from "@/lib/data";

interface MemberDetailsPanelProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberDetailsPanel({
  member,
  isOpen,
  onClose,
}: MemberDetailsPanelProps) {
  if (!member) return null;

  return (
    <>
      {/* Backdrop/Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-30" onClick={onClose} />
      )}

      {/* Side Panel */}
      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "280px" }}
      >
        <div className="h-full flex flex-col">
          {/* Header with diagonal stripes */}
          <div className="relative h-24 bg-gray-700 overflow-hidden">
            {/* Diagonal stripes - exactly matching the image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  135deg,
                  #4a5568 0px,
                  #4a5568 8px,
                  #5a6578 8px,
                  #5a6578 16px
                )`,
              }}
            />

            {/* Close button - white circle with X */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-5 h-5 bg-white rounded-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Close panel"
            >
              <svg
                className="w-3 h-3 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content - scrollable */}
          <div className="flex-1  overflow-y-auto">
            {/* Profile Image - overlapping header */}
            <div className="px-4 z-50 ">
              <div className="absolute top-10 inline-block ">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-20 h-20 rounded-full bg-white border-3 border-white shadow-md object-cover"
                />
                {/* Chat bubble icon */}
              </div>

              {/* Action buttons row */}
              <div className="flex gap-1.5 mt-16">
                <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors">
                  Spotlight
                </button>
                <button className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-3.5 h-3.5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
                <button className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-3.5 h-3.5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Name and Title Section */}
            <div className="px-4 mt-3 pb-3 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Tessa Walker
              </h2>
              <p className="text-xs text-gray-600 mt-0.5 leading-tight">
                HR Business Partner Global
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Human Resources US (D5150061)
              </p>
            </div>

            {/* Contact Details List */}
            <div className="px-4 py-3 space-y-2.5">
              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-gray-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${member.phone}`}
                  className="text-xs text-blue-600 hover:underline"
                >
                  (3) 235 555-0622
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-gray-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${member.email}`}
                  className="text-xs text-blue-600 hover:underline truncate"
                >
                  Tessa.Walker@baukonusap.com
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-gray-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-xs text-gray-700">
                  Corporate - US-Philadelphia (1710-2001)
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-gray-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs text-gray-700">
                  2:57 AM (Local Time)
                </span>
              </div>

              {/* Bio/Description */}
              <div className="flex items-start gap-2.5 pt-1">
                <svg
                  className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    I graduated from UCONN with a degree in liberal arts. I
                    speak fluent Spanish and am always happy to help with
                    translations. In my spare time,{" "}
                    <button className="text-blue-600 hover:underline font-medium">
                      Show More
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Manager Section */}
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex items-center gap-2.5">
                <img
                  src={member.photo}
                  alt="Manager"
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                    Direct Manager
                  </p>
                  <p className="text-xs font-semibold text-gray-900 leading-tight">
                    Charles Braun
                  </p>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    VP Global People Operations
                  </p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* +2 Managers link */}
              <button className="flex items-center gap-1.5 mt-2 ml-0.5 text-blue-600 hover:underline">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-xs font-medium">+2 Managers</span>
              </button>
            </div>

            {/* Actions Section */}
            <div className="px-4 py-3 border-t border-gray-200">
              {/* Actions Dropdown Header */}
              <button className="flex items-center gap-2 w-full text-left group">
                <svg
                  className="w-3 h-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-900">
                  Actions
                </span>
              </button>

              {/* All Actions Link */}
              <button className="flex items-center gap-2 mt-2 ml-5 text-blue-600 hover:underline">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span className="text-xs font-medium">All Actions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
