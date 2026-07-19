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