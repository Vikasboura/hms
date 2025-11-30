import React, { useState } from 'react';
import { Patient, PatientType, User, UserRole } from '../types';

interface PatientFormProps {
  tenantId: string;
  staff: User[];
  onSubmit: (patient: Patient) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ tenantId, staff, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Patient>>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    contact: '',
    type: PatientType.OPD,
    status: 'Active',
    assignedDoctorId: ''
  });

  const doctors = staff.filter(user => user.role === UserRole.DOCTOR);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.dob) {
      const newPatient: Patient = {
        ...formData as Patient,
        id: `${tenantId}-P-${Date.now()}`,
        tenantId,
        admissionDate: new Date().toISOString().split('T')[0]
      };
      onSubmit(newPatient);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Register New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
            <input
              type="date"
              required
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.dob}
              onChange={e => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
            <select
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.gender}
              onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
            <input
              type="tel"
              required
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Patient Type</label>
            <select
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value as PatientType })}
            >
              <option value={PatientType.OPD}>OPD (Outpatient)</option>
              <option value={PatientType.IPD}>IPD (Inpatient)</option>
            </select>
          </div>
        </div>
        
        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Assign Doctor</label>
           <select
             className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
             value={formData.assignedDoctorId}
             onChange={e => setFormData({ ...formData, assignedDoctorId: e.target.value })}
           >
             <option value="">-- Select Doctor --</option>
             {doctors.map(doc => (
               <option key={doc.id} value={doc.id}>Dr. {doc.firstName} {doc.lastName}</option>
             ))}
           </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;