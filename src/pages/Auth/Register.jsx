import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, logoutUser } from '../../services/authServices';
import { toast } from 'sonner';

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

    // Direct check before calling Firebase
    if (email.trim().toLowerCase() !== adminEmail?.toLowerCase()) {
      toast.error('You are not an admin. Registration is restricted.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await registerUser(email, password);
      toast.success('Admin account created successfully! Please Sign In.');
      
      // Logout immediately so user has to explicitly log in
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
    <div className="container py-5 my-5" style={{ color: '#000' }}>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-lg rounded-0 p-4">
            <div className="card-body">
              <h2 className="fw-bold mb-4 text-center">Create Admin Account</h2>

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label text-uppercase small fw-bold">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control rounded-0 form-control-lg" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                
                <div className="mb-3">
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
                
                <div className="mb-4">
                  <label className="form-label text-uppercase small fw-bold">Password</label>
                  <div className="input-group">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      className="form-control rounded-0 form-control-lg" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      required 
                    />
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary rounded-0 px-3 d-flex align-items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                          <path d="M3.35 5.47c-.18.158-.351.321-.516.486C1.481 7.218 1 8 1 8s3 5.5 8 5.5c1.037 0 1.996-.26 2.85-.688l.71.71A8.04 8.04 0 0 1 8 14.5c-5 0-8-5.5-8-5.5a13.133 13.133 0 0 1 1.672-2.198l1.678 1.668z"/>
                          <path d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                      )}
                    </button>
                  </div>
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