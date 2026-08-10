// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, logoutUser } from '../../services/authServices';
import { toast } from 'sonner';
import { UserPlus, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import '../../index.css';
import './auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

    if (email.trim().toLowerCase() !== adminEmail?.toLowerCase()) {
      toast.error('You are not an admin. Registration is restricted.');
      setLoading(false);
      return;
    }

    try {
      await registerUser(email, password);
      toast.success('Admin account created successfully! Please Sign In.');
      await logoutUser();
      navigate('/signin');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create account. Email might already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper py-4 px-2 px-sm-3 ">
      <div className="container px-0 mt-lg-5 " style={{ maxWidth: '460px', width: '100%' }}>
        <div className="auth-gradient-card bg-gradient-green p-4 p-md-5 text-white shadow-lg w-100">

          <div className="text-center mb-4 position-relative z-1">
            <div className="auth-glass-icon mx-auto mb-3" style={{ width: '50px', height: '50px', borderRadius: '14px' }}>
              <UserPlus size={24} className="text-white" />
            </div>
            <h2 className="fw-bold mb-1 text-white fs-3">Create Admin Account</h2>
            <p className="small text-white-50 mb-0">Authorized personnel registration only</p>
          </div>

          <form onSubmit={handleRegister} className="position-relative z-1">
            <div className="mb-3">
              <label className="form-label text-uppercase small fw-bold text-white-50" style={{ fontSize: '0.7rem', letterSpacing: '0.8px' }}>Full Name</label>
              <div className="input-group auth-glass-input-group rounded-0">
                <span className="input-group-text  ps-3">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  className="form-control app-input shadow-none "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-uppercase small fw-bold text-white-50" style={{ fontSize: '0.7rem', letterSpacing: '0.8px' }}>Email address</label>
              <div className="input-group auth-glass-input-group">
                <span className="input-group-text  ps-3">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  className="form-control app-input shadow-none "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-uppercase small fw-bold text-white-50 mb-1" style={{ fontSize: '0.7rem', letterSpacing: '0.8px' }}>Password</label>
              <div className="input-group auth-glass-input-group">
                <span className="input-group-text  ps-3">
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
                  className="btn btn-eye-toggle  pe-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn btn-light text-dark w-100 py-3 app-btn text-uppercase fw-bold mb-3 shadow-sm " type="submit" disabled={loading} style={{ background: '#ffffff', color: '#0f172a' }}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center mt-2 position-relative z-1">
            <span className="text-white-50 small">Already have an account? </span>
            <Link to="/signin" className="text-white fw-bold text-decoration-none small">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}