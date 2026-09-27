import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { DemoFlowProvider } from './context/DemoFlowContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { SihDemoBar } from './components/SihDemoBar';
import { AgriAIAssistant } from './components/AgriAIAssistant';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { EquipmentListPage } from './pages/EquipmentListPage';
import { EquipmentDetailPage } from './pages/EquipmentDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { FarmerSearch } from './pages/farmer/FarmerSearch';
import { FarmerBookings } from './pages/farmer/FarmerBookings';
import { FarmerRequests } from './pages/farmer/FarmerRequests';
import { FarmerGroupRentals } from './pages/farmer/FarmerGroupRentals';
import { FarmerMessages } from './pages/farmer/FarmerMessages';
import { FarmerProfile } from './pages/farmer/FarmerProfile';

// Owner Pages
import { OwnerDashboard } from './pages/owner/OwnerDashboard';
import { OwnerEquipment } from './pages/owner/OwnerEquipment';
import { OwnerBookings } from './pages/owner/OwnerBookings';
import { OwnerDemand } from './pages/owner/OwnerDemand';
import { OwnerRevenue } from './pages/owner/OwnerRevenue';
import { OwnerDrivers } from './pages/owner/OwnerDrivers';
import { OwnerMaintenance } from './pages/owner/OwnerMaintenance';

// Driver Pages
import { DriverDashboard } from './pages/driver/DriverDashboard';
import { DriverJobs } from './pages/driver/DriverJobs';
import { DriverMap } from './pages/driver/DriverMap';
import { DriverEarnings } from './pages/driver/DriverEarnings';
import { DriverProfile } from './pages/driver/DriverProfile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminEquipment } from './pages/admin/AdminEquipment';
import { AdminRentals } from './pages/admin/AdminRentals';
import { AdminDemand } from './pages/admin/AdminDemand';
import { AdminRevenue } from './pages/admin/AdminRevenue';
import { AdminSchemes } from './pages/admin/AdminSchemes';
import { AdminReports } from './pages/admin/AdminReports';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isDashboardRoute =
    location.pathname.startsWith('/farmer') ||
    location.pathname.startsWith('/owner') ||
    location.pathname.startsWith('/driver') ||
    location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {isDashboardRoute ? (
        <div className="flex-1 flex w-full max-w-7xl mx-auto">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-28 md:pb-12 overflow-x-hidden min-w-0">
            <Routes>
              {/* Farmer Sub-routes */}
              <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
              <Route path="/farmer/search" element={<FarmerSearch />} />
              <Route path="/farmer/bookings" element={<FarmerBookings />} />
              <Route path="/farmer/requests" element={<FarmerRequests />} />
              <Route path="/farmer/group-rentals" element={<FarmerGroupRentals />} />
              <Route path="/farmer/messages" element={<FarmerMessages />} />
              <Route path="/farmer/profile" element={<FarmerProfile />} />

              {/* Owner Sub-routes */}
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/equipment" element={<OwnerEquipment />} />
              <Route path="/owner/bookings" element={<OwnerBookings />} />
              <Route path="/owner/demand" element={<OwnerDemand />} />
              <Route path="/owner/revenue" element={<OwnerRevenue />} />
              <Route path="/owner/drivers" element={<OwnerDrivers />} />
              <Route path="/owner/maintenance" element={<OwnerMaintenance />} />

              {/* Driver Sub-routes */}
              <Route path="/driver/dashboard" element={<DriverDashboard />} />
              <Route path="/driver/jobs" element={<DriverJobs />} />
              <Route path="/driver/map" element={<DriverMap />} />
              <Route path="/driver/earnings" element={<DriverEarnings />} />
              <Route path="/driver/profile" element={<DriverProfile />} />

              {/* Admin Sub-routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/equipment" element={<AdminEquipment />} />
              <Route path="/admin/rentals" element={<AdminRentals />} />
              <Route path="/admin/demand" element={<AdminDemand />} />
              <Route path="/admin/revenue" element={<AdminRevenue />} />
              <Route path="/admin/schemes" element={<AdminSchemes />} />
              <Route path="/admin/reports" element={<AdminReports />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/equipment" element={<EquipmentListPage />} />
            <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      )}

      {/* Global Landing Footer only on Public pages or bottom */}
      {!isDashboardRoute && <Footer />}

      {/* SIH Hackathon Evaluation Demo Controller (Floats bottom) */}
      <SihDemoBar />

      {/* AgriAI Chatbot Assistant (Floats bottom right) */}
      <AgriAIAssistant />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <DemoFlowProvider>
            <AppLayout />
          </DemoFlowProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
