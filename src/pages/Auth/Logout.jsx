import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authServices';
import { toast } from 'sonner';

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
    <div className="container py-5 my-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-5 border shadow-sm">
          <h2 className="fw-bold mb-3">Are you sure you want to sign out?</h2>
          <p className="text-muted mb-4">We'd love to keep searching for your dream home together.</p>
          <div className="d-flex justify-content-center gap-3">
            <button onClick={handleLogout} className="btn btn-danger px-4 py-2 rounded-0 text-uppercase fw-bold">
              Sign Out
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-outline-dark px-4 py-2 rounded-0 text-uppercase fw-bold">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}