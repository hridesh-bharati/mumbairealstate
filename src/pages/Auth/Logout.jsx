// src/pages/Auth/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authServices';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';
import '../../index.css';
import './auth.css';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Successfully logged out.');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  return (
    <div className="auth-page-wrapper py-4 px-2 px-sm-3">
      <div className="container px-0" style={{ maxWidth: '480px', width: '100%' }}>
        <div className="auth-gradient-card bg-gradient-purple p-4 p-md-5 text-center shadow-lg w-100 position-relative">

          <div className="auth-glass-icon mx-auto mb-4 shadow-sm" style={{ width: '56px', height: '56px', borderRadius: '16px' }}>
            <LogOut size={26} className="text-white" />
          </div>
          <h2 className="fw-bold mb-2 text-white fs-3">Are you sure you want to sign out?</h2>
          <p className="small text-white-50 mb-4">We'd love to keep managing properties and exploring together.</p>
          <div className="d-flex justify-content-center gap-3 position-relative z-1">
            <button onClick={handleLogout} className="btn btn-light px-4 py-2 app-btn text-uppercase fw-bold shadow-sm rounded-pill" style={{ color: '#6a1b9a' }}>
              Sign Out
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-outline-light px-4 py-2 app-btn text-uppercase fw-bold rounded-pill">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}