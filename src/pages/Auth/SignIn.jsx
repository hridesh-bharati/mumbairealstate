// src/pages/Auth/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../services/authServices';
import { toast } from 'sonner';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import '../../index.css';
import './auth.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const rawAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || '';
    const formattedAdminEmail = rawAdminEmail.trim().toLowerCase();
    const inputEmail = email.trim().toLowerCase();

    try {
      const userCredential = await loginUser(inputEmail, password);
      const user = userCredential.user;
      const authenticatedEmail = user.email ? user.email.trim().toLowerCase() : '';

      if (authenticatedEmail !== formattedAdminEmail) {
        await logoutUser();
        toast.error('Access Denied: You do not have administrator permissions.');
        setLoading(false);
        return;
      }

      toast.success('Welcome back, Admin!');
      setTimeout(() => {
        navigate('/admin-dashboard', { replace: true });
      }, 100);

    } catch (err) {
      console.error("Authentication Error:", err);
      toast.error('Invalid credentials or unauthorized login request.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper py-4 px-2 px-sm-3">
      <div className="container px-0" style={{ maxWidth: '460px', width: '100%' }}>
        <div className="auth-gradient-card bg-gradient-blue p-4 p-md-5 text-white shadow-lg w-100">

          <div className="text-center mb-4 position-relative z-1">
            <div className="auth-glass-icon mx-auto mb-3" style={{ width: '50px', height: '50px', borderRadius: '14px' }}>
              <LogIn size={24} className="text-white" />
            </div>
            <h2 className="fw-bold mb-1 text-white fs-3">Welcome back</h2>
            <p className="small text-white-50 mb-0">Sign in to access your admin console</p>
          </div>

          <form onSubmit={handleSignIn} className="position-relative z-1">
            <div className="mb-3">
              <label className="form-label text-uppercase small fw-bold text-white-50" style={{ fontSize: '0.7rem', letterSpacing: '0.8px' }}>Email address</label>
              <div className="input-group auth-glass-input-group">
                <span className="input-group-text rounded-start-pill ps-3">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  className="form-control app-input shadow-none rounded-end-pill"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label text-uppercase small fw-bold text-white-50 mb-0" style={{ fontSize: '0.7rem', letterSpacing: '0.8px' }}>Password</label>
                <Link to="/forgot-password" className="text-white small text-decoration-none fw-semibold opacity-75">
                  Forgot Password?
                </Link>
              </div>

              <div className="input-group auth-glass-input-group">
                <span className="input-group-text rounded-start-pill ps-3">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control app-input shadow-none border-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="btn btn-eye-toggle rounded-end-pill pe-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn btn-light text-dark w-100 py-3 app-btn text-uppercase fw-bold mb-3 shadow-sm rounded-pill" type="submit" disabled={loading} style={{ background: '#ffffff', color: '#0f172a' }}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-2 position-relative z-1">
            <span className="text-white-50 small">Don't have an account? </span>
            <Link to="/register" className="text-white fw-bold text-decoration-none small">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}