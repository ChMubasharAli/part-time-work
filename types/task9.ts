export interface Task9PatientPersonal {
  id: number;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  cnic: string;
  maritalStatus: string;
  bloodGroup: string;
  createdAt: string;
  updatedAt: string;

  // Optional relations
  contact?: Task9PatientContact;
  medical?: Task9PatientMedical;
  visits?: Task9PatientVisit[];
}

export interface Task9PatientContact {
  id: number;
  patientId: number;
  phoneNumber: string;
  emergencyContact: string;
  email: string;
  address: string;
  city: string;
  createdAt: string;
}

export interface Task9PatientMedical {
  id: number;
  patientId: number;
  chronicDiseases: string[];
  pastSurgeries: string[];
  currentConditions: string[];
  createdAt: string;
}

export interface Task9PatientVisit {
  id: number;
  patientId: number;
  visitType: string;
  reason: string;
  assignedDoctor: string;
  createdAt: string;
}

export interface Task9PatientWithDetails extends Task9PatientPersonal {
  contact: Task9PatientContact | null;
  medical: Task9PatientMedical | null;
  visits: Task9PatientVisit[];
}
