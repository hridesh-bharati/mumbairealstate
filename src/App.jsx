// src/App.jsx
import React from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Global UI Layout Elements
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Footer from './components/Footer';

// Authentication UI
import Register from './pages/Auth/Register';
import SignIn from './pages/Auth/SignIn';
import Logout from './pages/Auth/Logout';

// Core Services Modules Pages
import FindAgent from './pages/FindAgent';
import HelpFindAgent from './pages/HelpFindAgent';
import JoinAgent from './pages/JoinAgent';

// Main Real Estate Operations Dynamic Panels (Updated Files Linked Here)
import PropertiesForBuy from './pages/PropertiesForBuy';
import SellProperties from './pages/SellProperties';
import FeaturedProperties from './pages/FeaturedProperties';
import PropertyPage from './pages/Properties/PropertyPage';

// Premium Analytics Admin Controller Dashboard
import AdminDashboard from './pages/Admin/AdminDashboard';

// Separated Sub-routing Module Imports
import PrivateExclusives from './pages/Exclusives/PrivateExclusives';
import ComingSoon from './pages/Exclusives/ComingSoon';
import CompassListings from './pages/Exclusives/CompassListings';
import CurrentDevelopments from './pages/Developments/CurrentDevelopments';
import DevelopmentMarketingGroup from './pages/Developments/DevelopmentMarketingGroup';
import DevelopmentDetails from './pages/DevelopmentDetails';
import ForgotPassword from './pages/Auth/ForgotPassword';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <div className="d-flex flex-column min-vh-100 bg-white">

          {/* Main Top Global Layout Navbar */}
          <Navbar />

          <main className="flex-grow-1">
            <Routes>
              {/* Baseline General Public Routes */}
              <Route path="/" element={<Homepage />} />

              {/* Sahi Filtered Files Routes setup yahan hai */}
              <Route path="/buy" element={<PropertiesForBuy />} />
              <Route path="/sell" element={<SellProperties />} />
              <Route path="/featured" element={<FeaturedProperties />} />

              {/* Live Real Estate Listings Data Streams */}
              <Route path="/listings" element={<PropertiesForBuy />} />
              <Route path="/property/:id" element={<PropertyPage />} />

              {/* Compass Exclusives Sub-Routing Links */}
              <Route path="/exclusives/private" element={<PrivateExclusives />} />
              <Route path="/exclusives/coming-soon" element={<ComingSoon />} />
              <Route path="/exclusives/listings" element={<CompassListings />} />

              {/* New Architectural Development Sub-routes */}
              <Route path="/development/current" element={<CurrentDevelopments />} />
              <Route path="/development/marketing-group" element={<DevelopmentMarketingGroup />} />
              <Route path="/development/:id" element={<DevelopmentDetails />} />

              {/* Agents CRM Operations Channels */}
              <Route path="/find-agent" element={<FindAgent />} />
              <Route path="/help-agent" element={<HelpFindAgent />} />
              <Route path="/join-agent" element={<JoinAgent />} />

              {/* User Authentication Gateways */}
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Production Level Admin Dashboards */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all Fallback Redirection */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Bottom Layout Sticky Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}