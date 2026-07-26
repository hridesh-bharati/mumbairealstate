import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendResetEmail } from '../../services/authServices';
import { toast } from 'sonner';

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
    <div className="container py-5 my-5" style={{ color: '#000' }}>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-lg rounded-0 p-4">
            <div className="card-body">
              <h2 className="fw-bold mb-2 text-center">Reset Password</h2>
              <p className="text-muted text-center small mb-4">
                Enter your registered email address to receive a password reset link.
              </p>

              <form onSubmit={handleReset}>
                <div className="mb-4">
                  <label className="form-label text-uppercase small fw-bold">Email address</label>
                  <input
                    type="email"
                    className="form-control rounded-0 form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <button
                  className="btn btn-dark w-100 py-3 rounded-0 text-uppercase fw-bold mb-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link to="/signin" className="text-dark fw-bold text-decoration-none small">
                  ← Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}