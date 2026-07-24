import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, getRedirectRoute } from '../../services/authServices';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // SPA page reload ko rokne ke liye
    setError('');
    setLoading(true);

    try {
      const userCredential = await registerUser(email, password);
      // Optional: Agar profile display name set karna chahein toh yahan storage trigger kar sakte hain
      const targetPath = getRedirectRoute(userCredential.user);
      navigate(targetPath);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to create an account. Email might be already in use.');
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
              <h2 className="fw-bold mb-4 text-center">Create your account</h2>
              
              {error && <div className="alert alert-danger small py-2">{error}</div>}

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label text-uppercase small fw-bold">Full Name</label>
                  <input type="text" className="form-control rounded-0 form-control-lg" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
                </div>
                <div className="mb-3">
                  <label className="form-label text-uppercase small fw-bold">Email address</label>
                  <input type="email" className="form-control rounded-0 form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>
                <div className="mb-4">
                  <label className="form-label text-uppercase small fw-bold">Password</label>
                  <input type="password" className="form-control rounded-0 form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                <button className="btn btn-dark w-100 py-3 rounded-0 text-uppercase fw-bold mb-3" type="submit" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-muted">Already have an account? </span>
                <Link to="/signin" className="text-dark fw-bold text-decoration-none">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// src\pages\Auth\Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have successfully logged out.");
    navigate('/');
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


// src\pages\Auth\SignIn.jsx
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