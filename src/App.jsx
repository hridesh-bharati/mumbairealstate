// src/App.jsx
import React, { useState, useEffect } from 'react';
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

// Main Real Estate Operations Dynamic Panels
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
import MapViewSearch from './pages/MapViewSearch';

export default function App() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Scroll listener to toggle button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <div className="d-flex flex-column min-vh-100 bg-white position-relative">

          {/* Main Top Global Layout Navbar */}
          <Navbar />

          <main className="flex-grow-1">
            <Routes>
              {/* Baseline General Public Routes */}
              <Route path="/" element={<Homepage />} />

              {/* Filtered Files Routes */}
              <Route path="/buy" element={<PropertiesForBuy />} />
              <Route path="/sell" element={<SellProperties />} />
              <Route path="/featured" element={<FeaturedProperties />} />

              {/* Live Real Estate Listings Data Streams */}
              <Route path="/listings" element={<PropertiesForBuy />} />
              <Route path="/property/:id" element={<PropertyPage />} />
              <Route path="/map-search" element={<MapViewSearch />} />

              {/* Compass Exclusives Sub-Routing Links */}
              <Route path="/exclusives/private" element={<PrivateExclusives />} />
              <Route path="/exclusives/coming-soon" element={<ComingSoon />} />
              <Route path="/exclusives/listings" element={<CompassListings />} />

              {/* Architectural Development Sub-routes */}
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

              {/* Protected Admin Dashboard */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Redirection */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Minimal Bottom to Top Scroll Button */}
          {showScrollBtn && (
            <button
              onClick={scrollToTop}
              className="btn btn-dark position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg d-flex align-items-center justify-content-center p-0"
              style={{
                width: '45px',
                height: '45px',
                zIndex: 1050,
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: '#181b1f',
                transition: 'all 0.3s ease'
              }}
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </button>
          )}

          {/* Bottom Layout Sticky Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}