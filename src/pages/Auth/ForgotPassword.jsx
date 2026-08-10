// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendResetEmail } from '../../services/authServices';
import { toast } from 'sonner';
import { KeyRound, Mail } from 'lucide-react';
import '../../index.css';
import './auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendResetEmail(email);
      toast.success('Reset link sent! Please check your email inbox.');
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send reset email. Please check the email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper py-4 px-2 px-sm-3">
      <div className="container px-0" style={{ maxWidth: '460px', width: '100%' }}>
        <div className="auth-gradient-card bg-gradient-purple p-4 p-md-5 text-white shadow-lg w-100">

          <div className="text-center mb-4 position-relative z-1">
            <div className="auth-glass-icon mx-auto mb-3" style={{ width: '50px', height: '50px', borderRadius: '14px' }}>
              <KeyRound size={24} className="text-white" />
            </div>
            <h2 className="fw-bold mb-1 text-white fs-3">Reset Password</h2>
            <p className="small text-white-50 mb-0">
              Enter your registered email address to receive a password reset link.
            </p>
          </div>

          <form onSubmit={handleReset} className="position-relative z-1">
            <div className="mb-4">
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
            <button
              className="btn btn-light text-dark w-100 py-3 app-btn text-uppercase fw-bold mb-3 shadow-sm rounded-pill"
              type="submit"
              disabled={loading}
              style={{ background: '#ffffff', color: '#0f172a' }}
            >
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="text-center mt-2 position-relative z-1">
            <Link to="/signin" className="text-white fw-bold text-decoration-none small">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}