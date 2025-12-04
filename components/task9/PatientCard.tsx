"use client";

import { Task9PatientPersonal } from "@/types/task9";

interface PatientCardProps {
  patient: Task9PatientPersonal;
  isActive: boolean;
  onClick: () => void;
}

export const PatientCard = ({ patient, isActive, onClick }: PatientCardProps) => {
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isActive
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{patient.fullName}</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium w-24">Gender:</span>
              <span>{patient.gender}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium w-24">Age:</span>
              <span>{calculateAge(patient.dateOfBirth)} years</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium w-24">CNIC:</span>
              <span>{patient.cnic}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium w-24">Blood Group:</span>
              <span className={`font-bold ${
                patient.bloodGroup.includes('+') ? 'text-red-600' : 'text-blue-600'
              }`}>
                {patient.bloodGroup}
              </span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          patient.maritalStatus === 'Married' 
            ? 'bg-green-100 text-green-800'
            : patient.maritalStatus === 'Single'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {patient.maritalStatus}
        </div>
      </div>
    </div>
  );
};