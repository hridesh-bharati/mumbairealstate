import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { sendResetEmail } from '../../services/authServices';
import { updateProfile } from 'firebase/auth';
import { uploadImagesToCloudinary } from '../../services/cloudinary';
import { toast } from 'sonner';
import { 
  User, Mail, Phone, KeyRound, ShieldCheck, CheckCircle2, 
  Lock, Edit3, Camera, Save, X, Loader2 
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AdminProfile() {
  const { currentUser } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'System Admin');
  const [phone, setPhone] = useState(currentUser?.phoneNumber || '+91 98765 43210');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '/images/logo.png');
  
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    const toastId = toast.loading('Updating Admin Profile...');

    try {
      let finalPhotoUrl = photoURL;

      if (newImageFile) {
        const uploadedUrls = await uploadImagesToCloudinary([newImageFile]);
        if (uploadedUrls && uploadedUrls.length > 0) {
          finalPhotoUrl = uploadedUrls[0];
        }
      }

      await updateProfile(currentUser, {
        displayName: displayName.trim(),
        photoURL: finalPhotoUrl
      });

      setPhotoURL(finalPhotoUrl);
      setIsEditing(false);
      setNewImageFile(null);
      setPreviewImage(null);

      toast.success('🎉 Profile updated successfully!', { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to update profile.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(currentUser?.displayName || 'System Admin');
    setPhone(currentUser?.phoneNumber || '+91 98765 43210');
    setPreviewImage(null);
    setNewImageFile(null);
    setIsEditing(false);
  };

  const handlePasswordReset = async () => {
    if (!currentUser?.email) {
      toast.error('Email address not found!');
      return;
    }

    setResetLoading(true);
    try {
      await sendResetEmail(currentUser.email);
      toast.success(`🔑 Password reset link sent to ${currentUser.email}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to send password reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="p-0 text-start">
      
      {/* Header */}
      <div className="app-card bg-gradient-blue mb-4 text-white" data-aos="fade-down">
        <div className="card-inner-padding d-flex align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="glass-icon-box p-3 rounded-4 d-flex align-items-center justify-content-center">
              <User size={22} className="text-white" />
            </div>
            <div>
              <p className="text-uppercase tracking-wider text-white-50 small fw-bold mb-0" style={{ fontSize: '0.7rem' }}>
                ADMIN PORTAL
              </p>
              <h5 className="fw-bold mb-0">Profile Settings</h5>
            </div>
          </div>

          {!isEditing && (
            <button 
              type="button" 
              className="btn text-white glass-icon-box px-3 py-2 rounded-3 fw-bold border-0 d-flex align-items-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 size={16} /> <span className="d-none d-sm-inline">Edit</span>
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSaveProfile}>
        <div className="row g-3">
          
          {/* Profile Card */}
          <div className="col-lg-4" data-aos="fade-right">
            <div className="app-card bg-gradient-purple text-center">
              <div className="p-4">
                <div className="position-relative d-inline-block mx-auto mb-3">
                  <img 
                    src={previewImage || photoURL} 
                    alt="Admin Profile" 
                    className="rounded-circle border border-3 border-white border-opacity-75 shadow-sm object-fit-cover"
                    width="100"
                    height="100"
                    onError={(e) => { e.target.src = '/images/logo.png'; }}
                  />
                  
                  {isEditing ? (
                    <label 
                      htmlFor="profileImgInput" 
                      className="position-absolute bottom-0 end-0 bg-white text-dark p-2 rounded-circle shadow cursor-pointer border border-2 border-white"
                      title="Change Profile Picture"
                    >
                      <Camera size={15} />
                      <input 
                        type="file" 
                        id="profileImgInput" 
                        accept="image/*" 
                        className="d-none" 
                        onChange={handleImageChange}
                      />
                    </label>
                  ) : (
                    <span className="position-absolute bottom-0 end-0 bg-success text-white p-1 rounded-circle border border-2 border-white" title="Active">
                      <ShieldCheck size={15} />
                    </span>
                  )}
                </div>

                <h5 className="fw-bold mb-1 text-white">{displayName}</h5>
                
                <div className="d-flex justify-content-center my-2">
                  <span className="glass-icon-box text-white px-3 py-1 rounded-pill small fw-semibold">
                    Super Admin
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-2 text-white-50 small mt-3">
                  <CheckCircle2 size={15} className="text-success" /> System Verified
                </div>
              </div>
            </div>
          </div>

          {/* Details Form Section */}
          <div className="col-lg-8" data-aos="fade-left">
            <div className="card border-0 rounded-4 p-3 p-md-4 shadow-sm bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark mb-0">Personal Details</h6>
                {isEditing && (
                  <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold small">
                    Editing Mode
                  </span>
                )}
              </div>
              
              <div className="row g-3 mb-3">
                <div className="col-12">
                  <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 rounded-start-3">
                      <User size={18} className="text-secondary" />
                    </span>
                    <input 
                      type="text" 
                      className={`form-control app-input ${isEditing ? 'bg-white border-primary' : 'bg-light border-0'}`}
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                      readOnly={!isEditing} 
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 rounded-start-3">
                      <Mail size={18} className="text-secondary" />
                    </span>
                    <input 
                      type="email" 
                      className="form-control app-input bg-light border-0" 
                      value={currentUser?.email || 'info@namoproperties.com'} 
                      readOnly 
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Mobile Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 rounded-start-3">
                      <Phone size={18} className="text-secondary" />
                    </span>
                    <input 
                      type="text" 
                      className={`form-control app-input ${isEditing ? 'bg-white border-primary' : 'bg-light border-0'}`}
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      readOnly={!isEditing} 
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="d-flex gap-2 mb-3">
                  <button 
                    type="submit" 
                    className="btn bg-gradient-blue text-white app-btn px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm"
                    disabled={saving}
                  >
                    {saving ? <Loader2 size={16} className="spinner-border spinner-border-sm" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-light app-btn px-4 py-2 d-inline-flex align-items-center gap-2 border"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              )}

              <hr className="my-3 text-muted opacity-25" />

              {/* Security Card */}
              <div className="app-card bg-gradient-orange text-white" data-aos="zoom-in">
                <div className="card-inner-padding d-flex align-items-start gap-3">
                  <div className="glass-icon-box p-3 rounded-3 d-flex align-items-center justify-content-center">
                    <Lock size={20} className="text-white" />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">Security & Password</h6>
                    <p className="small text-white-50 mb-3" style={{ fontSize: '0.8rem' }}>
                      Send an official password reset link to your registered email address.
                    </p>
                    <button 
                      type="button" 
                      className="btn text-white glass-icon-box px-3 py-2 app-btn border-0 d-inline-flex align-items-center gap-2 shadow-sm"
                      onClick={handlePasswordReset}
                      disabled={resetLoading}
                    >
                      <KeyRound size={15} />
                      {resetLoading ? 'Sending...' : 'Reset Password'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}