import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User, UserRole, Patient, Prescription, Tenant } from './types';
import { MOCK_USERS, MOCK_TENANT, INITIAL_PATIENTS, INITIAL_PRESCRIPTIONS } from './constants';

import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import AIAssistant from './components/AIAssistant';

// Modern Login Component
const Login = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [selectedUser, setSelectedUser] = useState<string>(MOCK_USERS[0].id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.id === selectedUser);
      if (user) onLogin(user);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Brand & Graphics */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90 z-0"></div>
        <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")', backgroundSize: 'cover', backgroundBlendMode: 'overlay', opacity: 0.2 }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl shadow-lg">M</div>
            <h1 className="text-2xl font-bold tracking-tight">MediNexus</h1>
          </div>
          <h2 className="text-5xl font-bold leading-tight mb-6">The Future of Hospital Management</h2>
          <p className="text-blue-100 text-lg max-w-md">Streamline operations, enhance patient care, and manage your entire healthcare ecosystem from one intelligent platform.</p>
        </div>

        <div className="relative z-10 flex gap-4 text-sm text-blue-200">
          <span>© 2024 MediNexus Inc.</span>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 animate-fade-in-up">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 mb-8">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
             <span className="text-xl font-bold text-slate-900">MediNexus</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-slate-500">Please sign in to access your dashboard.</p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                  Select User Role (Demo)
                </label>
                <div className="relative">
                  <select 
                    id="role"
                    className="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    {MOCK_USERS.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.firstName} {u.lastName} — {u.role.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input 
                  type="password"
                  value="password123"
                  readOnly
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-500 focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button 
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign In to Dashboard'}
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account? <span className="text-blue-600 font-medium cursor-pointer hover:underline">Self-Register Hospital</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Layout Component
const Layout = ({ 
  user, 
  onLogout, 
  children 
}: { 
  user: User; 
  onLogout: () => void; 
  children: React.ReactNode 
}) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Role based menu items
  const menuItems = [
    { label: 'Dashboard', path: '/', roles: Object.values(UserRole), icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> },
    { label: 'Patients', path: '/patients', roles: [UserRole.SUPER_ADMIN, UserRole.HOSPITAL_ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST], icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> },
    { label: 'Prescriptions', path: '/prescriptions', roles: [UserRole.DOCTOR, UserRole.PHARMACIST], icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> },
    { label: 'Settings', path: '/settings', roles: [UserRole.HOSPITAL_ADMIN, UserRole.SUPER_ADMIN], icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> },
  ];

  const canAccess = (roles: UserRole[]) => roles.includes(user.role);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-white shadow-2xl z-20 transition-all duration-300">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30">M</div>
          <div>
             <h1 className="text-xl font-bold tracking-tight">MediNexus</h1>
             <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Hospital OS</p>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</div>
          <nav className="space-y-1">
            {menuItems.filter(item => canAccess(item.roles)).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  location.pathname === item.path 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className={`${location.pathname === item.path ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>
                   {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50">
          <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
            <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-lg border-2 border-slate-600 object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-slate-400 truncate capitalize">{user.role.toLowerCase().replace('_', ' ')}</p>
            </div>
            <button onClick={onLogout} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-700 transition-colors" title="Logout">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm h-16 flex items-center justify-between px-4 z-20 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">M</div>
            <span className="font-bold text-slate-800 text-lg">MediNexus</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 bg-slate-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-sm text-white flex flex-col p-6 md:hidden animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">M</div>
                 <h2 className="text-xl font-bold">MediNexus</h2>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-800 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            <nav className="space-y-2">
               {menuItems.filter(item => canAccess(item.roles)).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="text-slate-400">{item.icon}</div>
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-slate-800 my-4"></div>
              <button onClick={onLogout} className="flex items-center gap-4 px-4 py-4 text-lg text-red-400 hover:bg-slate-800 w-full rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Log Out
              </button>
            </nav>
          </div>
        )}

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8 relative bg-slate-50">
          <div className="max-w-7xl mx-auto pb-20">
            {children}
          </div>
          <AIAssistant user={user} />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  
  // Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setTenant(MOCK_TENANT);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTenant(null);
  };

  const handleAddPatient = (patient: Patient) => {
    setPatients([patient, ...patients]);
  };

  // Protected Route Logic
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout user={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard user={currentUser} patients={patients} />} />
          <Route path="/patients" element={
            <PatientManager 
              patients={patients} 
              onAddPatient={handleAddPatient} 
              userRole={currentUser.role}
              tenantId={tenant?.id || ''}
              staff={MOCK_USERS}
            />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

// Helper for Patient Route to manage Form vs List state
const PatientManager = ({ 
  patients, 
  onAddPatient, 
  userRole, 
  tenantId,
  staff
}: { 
  patients: Patient[], 
  onAddPatient: (p: Patient) => void, 
  userRole: UserRole,
  tenantId: string,
  staff: User[]
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const canRegister = [UserRole.SUPER_ADMIN, UserRole.HOSPITAL_ADMIN, UserRole.RECEPTIONIST].includes(userRole);

  if (isAdding) {
    return (
      <PatientForm 
        tenantId={tenantId}
        staff={staff}
        onSubmit={(p) => {
          onAddPatient(p);
          setIsAdding(false);
        }}
        onCancel={() => setIsAdding(false)}
      />
    );
  }

  return (
    <PatientList 
      patients={patients} 
      staff={staff}
      onAddClick={() => setIsAdding(true)} 
      canRegister={canRegister}
    />
  );
};

export default App;