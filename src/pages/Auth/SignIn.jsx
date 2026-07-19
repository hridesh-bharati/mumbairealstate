import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, getRedirectRoute } from '../../services/authServices';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await loginUser(email, password);
      const targetPath = getRedirectRoute(userCredential.user);
      navigate(targetPath); // Agar "hridesh027@gmail.com" hai toh automatic admin dashboard pe redirect hoga
    } catch (err) {
      console.error(err);
      setError('❌ Invalid email or password configuration credentials.');
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
              <h2 className="fw-bold mb-4 text-center">Welcome back</h2>

              {error && <div className="alert alert-danger small py-2">{error}</div>}

              <form onSubmit={handleSignIn}>
                <div className="mb-3">
                  <label className="form-label text-uppercase small fw-bold">Email address</label>
                  <input type="email" className="form-control rounded-0 form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>
                <div className="mb-4">
                  <label className="form-label text-uppercase small fw-bold">Password</label>
                  <input type="password" className="form-control rounded-0 form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                <button className="btn btn-dark w-100 py-3 rounded-0 text-uppercase fw-bold mb-3" type="submit" disabled={loading}>
                  {loading ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register" className="text-dark fw-bold text-decoration-none">Register here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}