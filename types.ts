export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  HOSPITAL_ADMIN = 'HOSPITAL_ADMIN',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  PHARMACIST = 'PHARMACIST',
  RECEPTIONIST = 'RECEPTIONIST'
}

export enum PatientType {
  OPD = 'OPD',
  IPD = 'IPD'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  tenantId: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  type: PatientType;
  assignedDoctorId?: string;
  status: 'Active' | 'Discharged';
  admissionDate: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medicines: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  notes: string;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  licenseNumber: string;
  status: 'PENDING' | 'ACTIVE';
}

export interface AppState {
  currentUser: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
}