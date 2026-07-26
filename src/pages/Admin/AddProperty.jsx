import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { uploadImagesToCloudinary } from '../../services/cloudinary';
import { toast } from 'sonner';
import { 
  Home, MapPin, Building2, User, Image, Landmark, Plus, 
  Trash2, X, Sliders, CheckCircle, ClipboardList, Loader2 
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AddProperty() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', price: '', beds: '', baths: '', sqft: '', acres: '', address: '', description: '',
    view: 'Ocean', attachedYn: 'false', seniorCommunity: 'No', areaNode: '',
    stories: '', yearBuilt: '', buildingSize: '',
    listingStatus: 'Active Listing', assetClass: 'Single Family Residence',
    agentName: '', agentPhone: '', agentImg: 'images/avatar.png'
  });

  const [landmarks, setLandmarks] = useState([{ name: '', url: '' }]);
  const [customSpecs, setCustomSpecs] = useState([{ key: '', value: '' }]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    const generatedUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...generatedUrls]);
  };

  const removeImageSelector = (indexToRemove) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    URL.revokeObjectURL(imagePreviews[indexToRemove]);
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleLandmarkChange = (index, field, value) => {
    setLandmarks((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addNewLandmarkField = () => {
    setLandmarks((prev) => [...prev, { name: '', url: '' }]);
  };

  const removeLandmarkField = (indexToRemove) => {
    if (landmarks.length > 1) {
      setLandmarks((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  const handleCustomSpecChange = (index, field, value) => {
    setCustomSpecs((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addNewCustomSpecField = () => {
    setCustomSpecs((prev) => [...prev, { key: '', value: '' }]);
  };

  const removeCustomSpecField = (indexToRemove) => {
    if (customSpecs.length > 1) {
      setCustomSpecs((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      toast.error("⚠️ Image Required!", {
        description: "Please select at least one property image.",
        className: "bg-danger text-white border-0"
      });
      return;
    }

    setLoading(true);
    const toastId = toast.loading('⏳ Uploading images to Cloudinary...');

    try {
      const uploadedImageUrls = await uploadImagesToCloudinary(imageFiles);

      if (!uploadedImageUrls || uploadedImageUrls.length === 0) {
        throw new Error("Cloudinary engine rejected files.");
      }

      toast.loading('💾 Syncing to Firestore database...', { id: toastId });

      const specsString = `${formData.beds || '-'} beds | ${formData.baths || '-'} baths | ${formData.sqft || '-'} sqft ${formData.acres ? `| ${formData.acres} acres` : ''}`;
      const validLandmarks = landmarks.filter(item => item.name.trim() !== '');
      const validCustomSpecs = customSpecs.filter(item => item.key.trim() !== '' && item.value.trim() !== '');

      const propertyPayload = {
        title: formData.title,
        price: formData.price,
        specs: specsString,
        address: formData.address,
        description: formData.description,
        listingType: 'Buy',
        view: formData.view,
        attachedYn: formData.attachedYn,
        seniorCommunity: formData.seniorCommunity,
        areaNode: formData.areaNode,
        stories: formData.stories,
        yearBuilt: formData.yearBuilt,
        buildingSize: formData.buildingSize,
        listingStatus: formData.listingStatus,
        assetClass: formData.assetClass,
        landmarks: validLandmarks,
        additionalSpecs: validCustomSpecs,
        imgCounter: `1/${uploadedImageUrls.length}`,
        badges: [{ text: "For Sale", bg: "#8b5cf6" }],
        images: uploadedImageUrls,
        agent: {
          name: formData.agentName,
          phone: formData.agentPhone,
          img: formData.agentImg
        },
        createdAt: new Date()
      };

      await addDoc(collection(db, "properties"), propertyPayload);

      toast.success('🎉 Asset Configured Successfully!', {
        id: toastId,
        description: `${formData.title} is now active.`,
        className: "bg-success text-white border-0"
      });

      setFormData({
        title: '', price: '', beds: '', baths: '', sqft: '', acres: '', address: '', description: '',
        view: 'Ocean', attachedYn: 'false', seniorCommunity: 'No', areaNode: '',
        stories: '', yearBuilt: '', buildingSize: '',
        listingStatus: 'Active Listing', assetClass: 'Single Family Residence',
        agentName: '', agentPhone: '', agentImg: 'https://randomuser.me/api/portraits/lego/1.jpg'
      });
      setImageFiles([]);
      setImagePreviews([]);
      setLandmarks([{ name: '', url: '' }]);
      setCustomSpecs([{ key: '', value: '' }]);
    } catch (error) {
      console.error(error);
      toast.error('❌ Upload Failed', {
        id: toastId,
        description: error.message || 'Check database configurations.',
        className: "bg-danger text-white border-0"
      });
    } finally {
      setLoading(false);
    }
  };

  const livePreviewMapUrl = formData.address
    ? `https://maps.google.com/maps?q=${encodeURIComponent(formData.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
    : null;

  return (
    <div className="p-0 text-start">
      
      {/* Top Banner Header */}
      <div className="app-card bg-gradient-blue mb-4 text-white" data-aos="fade-down">
        <div className="card-inner-padding d-flex align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="glass-icon-box p-3 rounded-4 d-flex align-items-center justify-content-center">
              <Home size={22} className="text-white" />
            </div>
            <div>
              <p className="text-uppercase tracking-wider text-white-50 small fw-bold mb-0" style={{ fontSize: '0.7rem' }}>
                PROPERTY MANAGEMENT
              </p>
              <h5 className="fw-bold mb-0">List New Real Estate Asset</h5>
            </div>
          </div>
          <span className="glass-icon-box text-white px-3 py-1 rounded-pill small fw-semibold d-none d-sm-inline-block">
            CRM Core v2
          </span>
        </div>
      </div>

      {/* Form Body */}
      <div className="card border-0 rounded-4 p-3 p-md-4 shadow-sm bg-white" data-aos="fade-up">
        <form onSubmit={handleSubmit}>

          {/* STEP 1 */}
          <div className="section-pill-header text-primary mt-0 mb-3">
            <span className="p-2 rounded-3 bg-primary bg-opacity-10 d-inline-flex text-primary align-items-center justify-content-center">
              <Sliders size={18} />
            </span>
            1. Core Framework Details
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Property Title</label>
              <input type="text" name="title" className="form-control app-input border bg-light" value={formData.title} onChange={handleChange} required placeholder="e.g. Modern Weehawken Estate" />
            </div>
            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Price Index Allocation</label>
              <input type="text" name="price" className="form-control app-input border bg-light" value={formData.price} onChange={handleChange} required placeholder="e.g. $1,299,000" />
            </div>
            <div className="col-6 col-md-3">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Beds Count</label>
              <input type="text" name="beds" className="form-control app-input border bg-light" value={formData.beds} onChange={handleChange} required placeholder="4" />
            </div>
            <div className="col-6 col-md-3">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Baths Count</label>
              <input type="text" name="baths" className="form-control app-input border bg-light" value={formData.baths} onChange={handleChange} required placeholder="3.5" />
            </div>
            <div className="col-6 col-md-3">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Area Size (Sq Ft)</label>
              <input type="text" name="sqft" className="form-control app-input border bg-light" value={formData.sqft} onChange={handleChange} required placeholder="2,600" />
            </div>
            <div className="col-6 col-md-3">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Lot Size (Acres)</label>
              <input type="text" name="acres" className="form-control app-input border bg-light" value={formData.acres} onChange={handleChange} placeholder="0.45" />
            </div>
          </div>

          <hr className="my-4 text-muted opacity-25" />

          {/* STEP 2 */}
          <div className="section-pill-header text-info mb-3">
            <span className="p-2 rounded-3 bg-info bg-opacity-10 d-inline-flex text-info align-items-center justify-content-center">
              <MapPin size={18} />
            </span>
            2. Location Tracking & Maps
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Full Physical Address</label>
              <input type="text" name="address" className="form-control app-input border bg-light" value={formData.address} onChange={handleChange} required placeholder="Street, City, State, ZIP Code" />
            </div>
            {livePreviewMapUrl && (
              <div className="col-12" data-aos="zoom-in">
                <div className="border border-info border-opacity-25 rounded-4 overflow-hidden shadow-sm bg-light">
                  <iframe title="admin-live-form-map" width="100%" height="200" style={{ border: 0 }} loading="lazy" src={livePreviewMapUrl}></iframe>
                </div>
              </div>
            )}
            <div className="col-12">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Sub-Area Geolocation Node</label>
              <input type="text" name="areaNode" className="form-control app-input border bg-light" value={formData.areaNode} onChange={handleChange} placeholder="e.g. North Tustin (NTS)" />
            </div>
          </div>

          <hr className="my-4 text-muted opacity-25" />

          {/* STEP 3 */}
          <div className="section-pill-header mb-3" style={{ color: '#7c3aed' }}>
            <span className="p-2 rounded-3 bg-opacity-10 d-inline-flex align-items-center justify-content-center" style={{ color: '#7c3aed', background: 'rgba(124, 58, 237, 0.1)' }}>
              <Building2 size={18} />
            </span>
            3. Structural Specifications
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>View Type Context</label>
              <input type="text" name="view" className="form-control app-input border bg-light" value={formData.view} onChange={handleChange} placeholder="Ocean / Mountain / City" />
            </div>
            <div className="col-12 col-md-4">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Attached Structure (YN)</label>
              <select name="attachedYn" className="form-select app-input border bg-light" value={formData.attachedYn} onChange={handleChange}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Senior Citizens Community</label>
              <select name="seniorCommunity" className="form-select app-input border bg-light" value={formData.seniorCommunity} onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="col-6 col-md-4">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Total Stories</label>
              <input type="text" name="stories" className="form-control app-input border bg-light" value={formData.stories} onChange={handleChange} placeholder="2" />
            </div>
            <div className="col-6 col-md-4">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Year Built</label>
              <input type="text" name="yearBuilt" className="form-control app-input border bg-light" value={formData.yearBuilt} onChange={handleChange} placeholder="1991" />
            </div>
            <div className="col-12 col-md-4">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Gross Building Size</label>
              <input type="text" name="buildingSize" className="form-control app-input border bg-light" value={formData.buildingSize} onChange={handleChange} placeholder="6,404 Sq Ft" />
            </div>

            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Sync Availability Status</label>
              <select name="listingStatus" className="form-select app-input border bg-light" value={formData.listingStatus} onChange={handleChange}>
                <option value="Active Listing">Active Listing</option>
                <option value="Pending">Pending</option>
                <option value="Coming soon">Coming soon</option>
                <option value="Sold Asset">Sold Asset</option>
                <option value="Off Market">Off Market</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Asset Class Scope</label>
              <select name="assetClass" className="form-select app-input border bg-light" value={formData.assetClass} onChange={handleChange}>
                <option value="Single Family Residence">Single Family Residence</option>
                <option value="Apartment Suite / Condo">Apartment Suite / Condo</option>
                <option value="Commercial Complex">Commercial Complex</option>
                <option value="Industrial Plot / Land">Industrial Plot / Land</option>
              </select>
            </div>
            <div className="col-12">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Property Overview Description</label>
              <textarea name="description" rows="3" className="form-control app-input border bg-light" value={formData.description} onChange={handleChange} required placeholder="Write architectural details..."></textarea>
            </div>
          </div>

          <hr className="my-4 text-muted opacity-25" />

          {/* STEP 4 */}
          <div className="section-pill-header text-success mb-3">
            <span className="p-2 rounded-3 bg-success bg-opacity-10 d-inline-flex text-success align-items-center justify-content-center">
              <Image size={18} />
            </span>
            4. Property Visual Framework Assets
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Upload Showcase Images</label>
              <input type="file" multiple accept="image/*" className="form-control app-input border bg-light" onChange={handleFileChange} />
            </div>
            {imagePreviews.length > 0 && (
              <div className="col-12" data-aos="fade-in">
                <div className="p-2 border rounded-4 bg-light d-flex flex-wrap gap-2">
                  {imagePreviews.map((url, index) => (
                    <div key={index} className="position-relative" style={{ width: '80px', height: '80px' }}>
                      <img src={url} alt="upload preview" className="w-100 h-100 rounded-3 object-fit-cover" />
                      <button type="button" onClick={() => removeImageSelector(index)} className="position-absolute top-0 end-0 btn btn-danger p-0 d-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '22px', height: '22px', margin: '-6px -6px 0 0', border: '1.5px solid white' }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <hr className="my-4 text-muted opacity-25" />

          {/* STEP 5 */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <div className="section-pill-header text-danger my-0">
              <span className="p-2 rounded-3 bg-danger bg-opacity-10 d-inline-flex text-danger align-items-center justify-content-center">
                <ClipboardList size={18} />
              </span>
              5. Detailed Property Analytics
            </div>
            <button type="button" onClick={addNewCustomSpecField} className="btn bg-gradient-pink text-white app-btn px-3 py-2 border-0 d-inline-flex align-items-center gap-2 shadow-sm small">
              <Plus size={15} /> Add Specification
            </button>
          </div>

          <div className="row g-3 mb-4">
            {customSpecs.map((spec, index) => (
              <div className="col-12" key={index} data-aos="fade-up">
                <div className="p-3 border rounded-4 bg-light shadow-sm">
                  <div className="row g-2 align-items-end">
                    <div className="col-12 col-md-5">
                      <label className="text-muted small fw-bold mb-1 d-block" style={{ fontSize: '0.72rem' }}>Feature Name (Key)</label>
                      <input type="text" className="form-control app-input bg-white border" value={spec.key} onChange={(e) => handleCustomSpecChange(index, 'key', e.target.value)} placeholder="e.g. Elementary School" />
                    </div>
                    <div className="col-10 col-md-6">
                      <label className="text-muted small fw-bold mb-1 d-block" style={{ fontSize: '0.72rem' }}>Detail Value</label>
                      <input type="text" className="form-control app-input bg-white border" value={spec.value} onChange={(e) => handleCustomSpecChange(index, 'value', e.target.value)} placeholder="e.g. WEST UNIVERSITY ELEMENTARY" />
                    </div>
                    <div className="col-2 col-md-1 d-flex justify-content-end">
                      {customSpecs.length > 1 && (
                        <button type="button" onClick={() => removeCustomSpecField(index)} className="btn btn-outline-danger app-btn w-100 d-flex align-items-center justify-content-center" style={{ height: '42px' }}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4 text-muted opacity-25" />

          {/* STEP 6 */}
          <div className="section-pill-header mb-3" style={{ color: '#d97706' }}>
            <span className="p-2 rounded-3 bg-opacity-10 d-inline-flex align-items-center justify-content-center" style={{ color: '#d97706', background: 'rgba(217, 119, 6, 0.1)' }}>
              <User size={18} />
            </span>
            6. Listing Representative Agent
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Agent Full Name</label>
              <input type="text" name="agentName" className="form-control app-input border bg-light" value={formData.agentName} onChange={handleChange} required placeholder="Mariana Donahue" />
            </div>
            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>Agent Contact Phone</label>
              <input type="text" name="agentPhone" className="form-control app-input border bg-light" value={formData.agentPhone} onChange={handleChange} required placeholder="(555) 987-6543" />
            </div>
          </div>

          <hr className="my-4 text-muted opacity-25" />

          {/* STEP 7 */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <div className="section-pill-header text-success my-0">
              <span className="p-2 rounded-3 bg-success bg-opacity-10 d-inline-flex text-success align-items-center justify-content-center">
                <Landmark size={18} />
              </span>
              7. Proximity & Local Landmarks
            </div>
            <button type="button" onClick={addNewLandmarkField} className="btn bg-gradient-green text-white app-btn px-3 py-2 border-0 d-inline-flex align-items-center gap-2 shadow-sm small">
              <Plus size={15} /> Add Nearby Place
            </button>
          </div>

          <div className="row g-3 mb-4">
            {landmarks.map((landmark, index) => (
              <div className="col-12" key={index} data-aos="fade-up">
                <div className="p-3 border rounded-4 bg-light shadow-sm">
                  <div className="row g-2 align-items-end">
                    <div className="col-12 col-md-5">
                      <label className="text-muted small fw-bold mb-1 d-block" style={{ fontSize: '0.72rem' }}>Landmark Name</label>
                      <input type="text" className="form-control app-input bg-white border" value={landmark.name} onChange={(e) => handleLandmarkChange(index, 'name', e.target.value)} placeholder="Famous Spot / Utility Place" />
                    </div>
                    <div className="col-10 col-md-6">
                      <label className="text-muted small fw-bold mb-1 d-block" style={{ fontSize: '0.72rem' }}>Maps Link</label>
                      <input type="url" className="form-control app-input bg-white border" value={landmark.url} onChange={(e) => handleLandmarkChange(index, 'url', e.target.value)} placeholder="Google Maps Direction Link" />
                    </div>
                    <div className="col-2 col-md-1 d-flex justify-content-end">
                      {landmarks.length > 1 && (
                        <button type="button" onClick={() => removeLandmarkField(index)} className="btn btn-outline-danger app-btn w-100 d-flex align-items-center justify-content-center" style={{ height: '42px' }}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn bg-gradient-blue text-white w-100 py-3 app-btn border-0 shadow d-flex align-items-center justify-content-center gap-2 mt-4" 
            style={{ fontSize: '0.95rem' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spinner-border spinner-border-sm" />
                <span>Deploying Ledger Matrix...</span>
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                <span>Launch Configuration Live</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}