import { User, UserRole, Patient, PatientType, Prescription } from './types';

// Mock Tenants
export const MOCK_TENANT = {
  id: 'tenant-123',
  name: 'City General Hospital',
  domain: 'citygeneral',
  licenseNumber: 'LIC-998877',
  status: 'ACTIVE' as const
};

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    firstName: 'Alice',
    lastName: 'Admin',
    email: 'admin@citygeneral.com',
    role: UserRole.HOSPITAL_ADMIN,
    tenantId: 'tenant-123',
    avatar: 'https://picsum.photos/100/100'
  },
  {
    id: 'u2',
    firstName: 'Gregory',
    lastName: 'House',
    email: 'house@citygeneral.com',
    role: UserRole.DOCTOR,
    tenantId: 'tenant-123',
    avatar: 'https://picsum.photos/101/101'
  },
  {
    id: 'u3',
    firstName: 'Florence',
    lastName: 'Nightingale',
    email: 'nurse@citygeneral.com',
    role: UserRole.NURSE,
    tenantId: 'tenant-123',
    avatar: 'https://picsum.photos/102/102'
  },
  {
    id: 'u4',
    firstName: 'Pam',
    lastName: 'Beesly',
    email: 'pam@citygeneral.com',
    role: UserRole.RECEPTIONIST,
    tenantId: 'tenant-123',
    avatar: 'https://picsum.photos/103/103'
  }
];

// Mock Patients
export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 't123-P-001',
    tenantId: 'tenant-123',
    firstName: 'John',
    lastName: 'Doe',
    dob: '1985-05-15',
    gender: 'Male',
    contact: '555-0101',
    type: PatientType.IPD,
    assignedDoctorId: 'u2',
    status: 'Active',
    admissionDate: '2023-10-25'
  },
  {
    id: 't123-P-002',
    tenantId: 'tenant-123',
    firstName: 'Jane',
    lastName: 'Smith',
    dob: '1992-08-22',
    gender: 'Female',
    contact: '555-0102',
    type: PatientType.OPD,
    assignedDoctorId: 'u2',
    status: 'Active',
    admissionDate: '2023-10-26'
  },
  {
    id: 't123-P-003',
    tenantId: 'tenant-123',
    firstName: 'Robert',
    lastName: 'Brown',
    dob: '1978-11-30',
    gender: 'Male',
    contact: '555-0103',
    type: PatientType.OPD,
    assignedDoctorId: 'u2',
    status: 'Discharged',
    admissionDate: '2023-10-20'
  }
];

// Mock Prescriptions
export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 't123-RX-001',
    patientId: 't123-P-001',
    doctorId: 'u2',
    date: '2023-10-26',
    medicines: [
      { name: 'Paracetamol', dosage: '500mg', frequency: 'BID', duration: '5 days' },
      { name: 'Amoxicillin', dosage: '250mg', frequency: 'TID', duration: '7 days' }
    ],
    notes: 'Take with food.'
  }
];