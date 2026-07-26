// src/components/Admin/AdminProfile.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { sendResetEmail } from '../../services/authServices';
import { updateProfile } from 'firebase/auth';
import { uploadImagesToCloudinary } from '../../services/cloudinary';
import { toast } from 'sonner';
import { 
  User, Mail, Phone, KeyRound, ShieldCheck, CheckCircle2, 
  Lock, Edit3, Camera, Save, X, Loader2 
} from 'lucide-react';

export default function AdminProfile() {
  const { currentUser } = useAuth();
  
  // Edit State Controls
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Form Fields
  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'System Admin');
  const [phone, setPhone] = useState(currentUser?.phoneNumber || '+91 98765 43210');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '/images/logo.png');
  
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Profile Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Save Updated Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    const toastId = toast.loading('Updating Admin Profile...');

    try {
      let finalPhotoUrl = photoURL;

      // Upload new image to Cloudinary if selected
      if (newImageFile) {
        const uploadedUrls = await uploadImagesToCloudinary([newImageFile]);
        if (uploadedUrls && uploadedUrls.length > 0) {
          finalPhotoUrl = uploadedUrls[0];
        }
      }

      // Update Firebase User Profile
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

  // Cancel Editing
  const handleCancel = () => {
    setDisplayName(currentUser?.displayName || 'System Admin');
    setPhone(currentUser?.phoneNumber || '+91 98765 43210');
    setPreviewImage(null);
    setNewImageFile(null);
    setIsEditing(false);
  };

  // Forgot / Reset Password Handler
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
    <div className="text-start">
      {/* Header with Edit Button */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3">
            <User size={24} />
          </div>
          <div>
            <h4 className="fw-bold mb-0 text-dark">Admin Account Profile</h4>
            <small className="text-muted">Manage your administrator credentials and security settings</small>
          </div>
        </div>

        {!isEditing && (
          <button 
            type="button" 
            className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-bold shadow-sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 size={16} /> Edit Profile
          </button>
        )}
      </div>

      <form onSubmit={handleSaveProfile}>
        <div className="row g-4">
          
          {/* Left Column: Avatar & System Status */}
          <div className="col-md-4">
            <div className="card border-0 bg-light p-4 text-center rounded-4 shadow-sm">
              <div className="position-relative d-inline-block mx-auto mb-3">
                <img 
                  src={previewImage || photoURL} 
                  alt="Admin Profile" 
                  className="rounded-circle border border-3 border-white shadow object-fit-cover"
                  width="110"
                  height="110"
                  onError={(e) => { e.target.src = '/images/logo.png'; }}
                />
                
                {/* Upload Image Overlay Button during Edit mode */}
                {isEditing ? (
                  <label 
                    htmlFor="profileImgInput" 
                    className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle shadow cursor-pointer border border-2 border-white"
                    title="Change Profile Picture"
                  >
                    <Camera size={16} />
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
                    <ShieldCheck size={16} />
                  </span>
                )}
              </div>

              <h5 className="fw-bold text-dark mb-1">
                {displayName}
              </h5>
              <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-1.5 rounded-pill mb-3 mx-auto d-inline-block">
                Super Admin
              </span>

              <div className="d-flex align-items-center justify-content-center gap-2 text-muted small">
                <CheckCircle2 size={14} className="text-success" /> System Verified
              </div>
            </div>
          </div>

          {/* Right Column: Editable Information & Security */}
          <div className="col-md-8">
            <div className="card border-0 bg-white p-4 rounded-4 border shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark mb-0">Personal & Contact Details</h6>
                {isEditing && (
                  <span className="badge bg-warning text-dark px-2.5 py-1">
                    Editing Mode Active
                  </span>
                )}
              </div>
              
              <div className="row g-3 mb-4">
                {/* Full Name */}
                <div className="col-12">
                  <label className="text-muted small fw-semibold d-block mb-1">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <User size={16} className="text-muted" />
                    </span>
                    <input 
                      type="text" 
                      className={`form-control ${isEditing ? 'bg-white border-primary' : 'bg-light border-start-0'}`}
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                      readOnly={!isEditing} 
                      required
                    />
                  </div>
                </div>

                {/* Email Address (Read-Only) */}
                <div className="col-md-6">
                  <label className="text-muted small fw-semibold d-block mb-1">
                    Email Address <small className="text-muted">(System Protected)</small>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Mail size={16} className="text-muted" />
                    </span>
                    <input 
                      type="email" 
                      className="form-control bg-light border-start-0" 
                      value={currentUser?.email || 'info@namoproperties.com'} 
                      readOnly 
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="col-md-6">
                  <label className="text-muted small fw-semibold d-block mb-1">Mobile Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Phone size={16} className="text-muted" />
                    </span>
                    <input 
                      type="text" 
                      className={`form-control ${isEditing ? 'bg-white border-primary' : 'bg-light border-start-0'}`}
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      readOnly={!isEditing} 
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons for Edit Mode */}
              {isEditing && (
                <div className="d-flex gap-2 mb-4">
                  <button 
                    type="submit" 
                    className="btn btn-success px-4 py-2 rounded-3 fw-bold d-inline-flex align-items-center gap-2"
                    disabled={saving}
                  >
                    {saving ? <Loader2 size={16} className="spinner-border spinner-border-sm" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-bold d-inline-flex align-items-center gap-2"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              )}

              <hr className="my-4 text-muted opacity-25" />

              {/* Security & Password Reset Section */}
              <div>
                <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                  <Lock size={16} className="text-danger" /> Security & Account Access
                </h6>
                <p className="text-muted small mb-3">
                  Need to update your password? Click below to send an official password reset link directly to your registered email.
                </p>

                <button 
                  type="button" 
                  className="btn btn-outline-danger px-4 py-2 rounded-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                  onClick={handlePasswordReset}
                  disabled={resetLoading}
                >
                  <KeyRound size={16} />
                  {resetLoading ? 'Sending Reset Link...' : 'Send Password Reset Link'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}