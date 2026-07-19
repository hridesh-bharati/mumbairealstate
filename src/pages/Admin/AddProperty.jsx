import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { uploadImagesToCloudinary } from '../../services/cloudinary';
import { toast } from 'sonner';
import { Home, Bath, Square, MapPin, Layers, User, Image, Building2, Landmark, Plus, Trash2, X, Sliders, CheckCircle, ClipboardList } from 'lucide-react';
import './AddProperty.css';

export default function AddProperty() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', price: '', beds: '', baths: '', sqft: '', acres: '', address: '', description: '',
    view: 'Ocean', attachedYn: 'false', seniorCommunity: 'No', areaNode: '',
    stories: '', yearBuilt: '', buildingSize: '',
    listingStatus: 'Active Listing', assetClass: 'Single Family Residence',
    agentName: '', agentPhone: '', agentImg: 'https://randomuser.me/api/portraits/lego/1.jpg'
  });

  const [landmarks, setLandmarks] = useState([{ name: '', url: '' }]);
  // Dynamic features/specifications based on your screenshot
  const [customSpecs, setCustomSpecs] = useState([{ key: '', value: '' }]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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

  // Dynamic Custom Specs Handlers
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

      // Filter out empty custom specifications
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
        additionalSpecs: validCustomSpecs, // Added to Firestore
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

      toast.success('🎉 Asset Framework Configured Successfully!', {
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
    <div className="main-admin-wrapper py-4 text-start">
      <div className="container px-2 px-md-3">
        <div className="card p-4 custom-glass-form-card border-0">

          {/* Main Top Header Block */}
          <div className="d-flex align-items-center gap-3 mb-1 border-bottom border-light pb-3">
            <div className="form-icon-box bg-icon-green d-flex align-items-center justify-content-center text-white rounded-3" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', width: '44px', height: '44px' }}>
              <Home size={20} />
            </div>
            <div>
              <h2 className="fw-bold m-0 fs-5 text-dark d-flex align-items-center gap-2">
                List New Real Estate Asset <span className="badge text-white px-2 py-1 fs-6" style={{ background: '#8b5cf6', fontSize: '0.65rem' }}>CRM Core v2</span>
              </h2>
              <small className="text-muted">Fill out structural fields sequentially to push data live.</small>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* STEP 1: FRAMEWORK */}
            <div className="form-category-title d-flex align-items-center gap-2" style={{ color: '#2563eb' }}>
              <span className="p-1 rounded bg-primary bg-opacity-10 d-inline-flex text-primary align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                <Sliders size={14} />
              </span>
              1. Core Framework Details
            </div>
            <div className="row g-2.5">
              <div className="col-md-6">
                <label className="small fw-bold mb-1 text-secondary">Property Title</label>
                <input type="text" name="title" className="form-control input-control-custom" value={formData.title} onChange={handleChange} required placeholder="e.g. Modern Weehawken Estate" />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold mb-1 text-secondary">Price Index Allocation</label>
                <input type="text" name="price" className="form-control input-control-custom" value={formData.price} onChange={handleChange} required placeholder="e.g. $1,299,000" />
              </div>
              <div className="col-6 col-md-3">
                <label className="small fw-bold mb-1 text-secondary">Beds Count</label>
                <input type="text" name="beds" className="form-control input-control-custom" value={formData.beds} onChange={handleChange} required placeholder="4" />
              </div>
              <div className="col-6 col-md-3">
                <label className="small fw-bold mb-1 text-secondary">Baths Count</label>
                <input type="text" name="baths" className="form-control input-control-custom" value={formData.baths} onChange={handleChange} required placeholder="3.5" />
              </div>
              <div className="col-6 col-md-3">
                <label className="small fw-bold mb-1 text-secondary">Area Size (Sq Ft)</label>
                <input type="text" name="sqft" className="form-control input-control-custom" value={formData.sqft} onChange={handleChange} required placeholder="2,600" />
              </div>
              <div className="col-6 col-md-3">
                <label className="small fw-bold mb-1 text-secondary">Lot Size (Acres)</label>
                <input type="text" name="acres" className="form-control input-control-custom" value={formData.acres} onChange={handleChange} placeholder="0.45" />
              </div>
            </div>

            {/* STEP 2: GEOLOCATION NODE */}
            <div className="form-category-title d-flex align-items-center gap-2" style={{ color: '#06b6d4' }}>
              <span className="p-1 rounded bg-info bg-opacity-10 d-inline-flex text-info align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                <MapPin size={14} />
              </span>
              2. Location Tracking & Maps
            </div>
            <div className="row g-2.5">
              <div className="col-12">
                <label className="small fw-bold mb-1 text-secondary">Full Neighborhood Physical Address</label>
                <input type="text" name="address" className="form-control input-control-custom" value={formData.address} onChange={handleChange} required placeholder="Street, City, State, ZIP Code" />
              </div>
              {livePreviewMapUrl && (
                <div className="col-12">
                  <div className="border border-info border-opacity-25 rounded-4 overflow-hidden shadow-sm bg-light my-1">
                    <iframe title="admin-live-form-map" width="100%" height="190" style={{ border: 0 }} loading="lazy" src={livePreviewMapUrl}></iframe>
                  </div>
                </div>
              )}
              <div className="col-md-12">
                <label className="small fw-bold mb-1 text-secondary">Sub-Area Geolocation Node</label>
                <input type="text" name="areaNode" className="form-control input-control-custom" value={formData.areaNode} placeholder="e.g. North Tustin (NTS)" />
              </div>
            </div>

            {/* STEP 3: STRUCTURAL SPECIFICATIONS */}
            <div className="form-category-title d-flex align-items-center gap-2" style={{ color: '#ec4899' }}>
              <span className="p-1 rounded bg-pink bg-opacity-10 d-inline-flex text-pink align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                <Building2 size={14} />
              </span>
              3. Structural Specifications
            </div>
            <div className="row g-2.5">
              <div className="col-md-4">
                <label className="small fw-bold mb-1 text-secondary">View Type Context</label>
                <input type="text" name="view" className="form-control input-control-custom" value={formData.view} onChange={handleChange} placeholder="Ocean / Mountain / City" />
              </div>
              <div className="col-md-4">
                <label className="small fw-bold mb-1 text-secondary">Attached Structure (YN)</label>
                <select name="attachedYn" className="form-select input-control-custom" value={formData.attachedYn} onChange={handleChange}>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="small fw-bold mb-1 text-secondary">Senior Citizens Community</label>
                <select name="seniorCommunity" className="form-select input-control-custom" value={formData.seniorCommunity} onChange={handleChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="col-6 col-md-4">
                <label className="small fw-bold mb-1 text-secondary">Total Stories</label>
                <input type="text" name="stories" className="form-control input-control-custom" value={formData.stories} onChange={handleChange} placeholder="2" />
              </div>
              <div className="col-6 col-md-4">
                <label className="small fw-bold mb-1 text-secondary">Year Built</label>
                <input type="text" name="yearBuilt" className="form-control input-control-custom" value={formData.yearBuilt} onChange={handleChange} placeholder="1991" />
              </div>
              <div className="col-12 col-md-4">
                <label className="small fw-bold mb-1 text-secondary">Gross Building Size</label>
                <input type="text" name="buildingSize" className="form-control input-control-custom" value={formData.buildingSize} onChange={handleChange} placeholder="6,404 Sq Ft" />
              </div>

              <div className="col-md-6">
                <label className="small fw-bold mb-1 text-success fw-bold">Sync Availability Status</label>
                <select name="listingStatus" className="form-select input-control-custom border-success border-opacity-50" value={formData.listingStatus} onChange={handleChange} style={{ background: '#f0fdf4' }}>
                  <option value="Active Listing">Active Listing</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold Asset">Sold Asset</option>
                  <option value="Off Market">Off Market</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="small fw-bold mb-1 text-primary fw-bold">Asset Class Architectural Scope</label>
                <select name="assetClass" className="form-select input-control-custom border-primary border-opacity-50" value={formData.assetClass} onChange={handleChange} style={{ background: '#eff6ff' }}>
                  <option value="Single Family Residence">Single Family Residence</option>
                  <option value="Apartment Suite / Condo">Apartment Suite / Condo</option>
                  <option value="Commercial Complex">Commercial Complex</option>
                  <option value="Industrial Plot / Land">Industrial Plot / Land</option>
                </select>
              </div>
              <div className="col-12">
                <label className="small fw-bold mb-1 text-secondary">Property Overview Description</label>
                <textarea name="description" rows="3" className="form-control input-control-custom" value={formData.description} onChange={handleChange} required placeholder="Write architectural details..."></textarea>
              </div>
            </div>

            {/* STEP 4: VISUAL ASSETS */}
            <div className="form-category-title d-flex align-items-center gap-2" style={{ color: '#8b5cf6' }}>
              <span className="p-1 rounded bg-purple bg-opacity-10 d-inline-flex text-purple align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                <Image size={14} />
              </span>
              4. Property Visual Framework Assets
            </div>
            <div className="row g-2.5">
              <div className="col-12">
                <label className="small fw-bold mb-1 text-secondary">Upload Showcase Images (Append Mode Active)</label>
                <input type="file" multiple accept="image/*" className="form-control input-control-custom border-purple border-opacity-25" onChange={handleFileChange} />
              </div>
              {imagePreviews.length > 0 && (
                <div className="col-12">
                  <div className="p-2 admin-thumb-grid bg-white bg-opacity-50 border border-light shadow-sm">
                    {imagePreviews.map((url, index) => (
                      <div key={index} className="admin-preview-frame position-relative">
                        <img src={url} alt="upload preview item" className="w-100 h-100 object-cover rounded-2" />
                        <button type="button" onClick={() => removeImageSelector(index)} className="position-absolute top-0 end-0 btn btn-danger p-0 d-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '18px', height: '18px', margin: '3px', border: '1.5px solid white' }}><X size={10} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {/* NEW STEP 5: DYNAMIC DETAILED SPECIFICATIONS BLOCK (FROM SCREENSHOT) */}
            <div className="form-category-title d-flex justify-content-between align-items-center" style={{ color: '#f43f5e' }}>
              <span className="d-flex align-items-center gap-2">
                <span className="p-1 rounded bg-danger bg-opacity-10 d-inline-flex text-danger align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                  <ClipboardList size={14} />
                </span>
                5. Detailed Property Analytics & Features (School, Tax, Interior etc.)
              </span>
              <button type="button" onClick={addNewCustomSpecField} className="btn btn-xs py-1.5 px-3 fw-bold border-0 text-white d-flex align-items-center gap-1.5 rounded-2 shadow-sm transition-all hover-scale" style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', fontSize: '0.7rem' }}>
                <Plus size={12} /> Add Specification
              </button>
            </div>
            <div className="row g-2.5 mt-1">
              {customSpecs.map((spec, index) => (
                <div className="col-12" key={index}>
                  <div className="p-3 border border-dashed border-danger border-opacity-25 rounded-3 bg-white bg-opacity-40 d-flex flex-wrap align-items-end gap-2 shadow-sm">
                    <div className="flex-grow-1" style={{ minWidth: '220px' }}>
                      <label className="xsmall text-muted mb-1 d-block">Feature Name (Key)</label>
                      <input type="text" className="form-control input-control-custom" value={spec.key} onChange={(e) => handleCustomSpecChange(index, 'key', e.target.value)} placeholder="e.g. Elementary School, Tax Annual Amount, Cooling" />
                    </div>
                    <div className="flex-grow-1" style={{ minWidth: '250px' }}>
                      <label className="xsmall text-muted mb-1 d-block">Detail Value</label>
                      <input type="text" className="form-control input-control-custom" value={spec.value} onChange={(e) => handleCustomSpecChange(index, 'value', e.target.value)} placeholder="e.g. WEST UNIVERSITY ELEMENTARY, $29,652, Central Air" />
                    </div>
                    {customSpecs.length > 1 && (
                      <button type="button" onClick={() => removeCustomSpecField(index)} className="btn btn-outline-danger p-2 d-flex align-items-center justify-content-center rounded-3 shadow-sm flex-shrink-0 transition-all" style={{ height: '38px', width: '38px' }}>
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>



            {/* STEP 6: REPRESENTATIVE AGENT */}
            <div className="form-category-title d-flex align-items-center gap-2" style={{ color: '#f59e0b' }}>
              <span className="p-1 rounded bg-warning bg-opacity-10 d-inline-flex text-warning align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                <User size={14} />
              </span>
              6. Listing Representative Agent
            </div>
            <div className="row g-2.5">
              <div className="col-md-6">
                <label className="small fw-bold mb-1 text-secondary">Agent Full Name</label>
                <input type="text" name="agentName" className="form-control input-control-custom" value={formData.agentName} onChange={handleChange} required placeholder="Mariana Donahue" />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold mb-1 text-secondary">Agent Contact Phone</label>
                <input type="text" name="agentPhone" className="form-control input-control-custom" value={formData.agentPhone} onChange={handleChange} required placeholder="(555) 987-6543" />
              </div>
            </div>

            {/* STEP 7: PROXIMITY LANDMARKS */}
            <div className="form-category-title d-flex justify-content-between align-items-center" style={{ color: '#10b981' }}>
              <span className="d-flex align-items-center gap-2">
                <span className="p-1 rounded bg-success bg-opacity-10 d-inline-flex text-success align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                  <Landmark size={14} />
                </span>
                7. Proximity & Local Landmarks Anchor
              </span>
              <button type="button" onClick={addNewLandmarkField} className="btn btn-xs py-1.5 px-3 fw-bold border-0 text-white d-flex align-items-center gap-1.5 rounded-2 shadow-sm transition-all hover-scale" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', fontSize: '0.7rem' }}><Plus size={12} /> Add Nearby Place</button>
            </div>
            <div className="row g-2.5 mt-1">
              {landmarks.map((landmark, index) => (
                <div className="col-12" key={index}>
                  <div className="p-3 border border-dashed border-success border-opacity-25 rounded-3 bg-white bg-opacity-40 d-flex flex-wrap align-items-end gap-2 shadow-sm">
                    <div className="flex-grow-1" style={{ minWidth: '220px' }}>
                      <input type="text" className="form-control input-control-custom" value={landmark.name} onChange={(e) => handleLandmarkChange(index, 'name', e.target.value)} placeholder="Famous Spot / Utility Place" />
                    </div>
                    <div className="flex-grow-1" style={{ minWidth: '250px' }}>
                      <input type="url" className="form-control input-control-custom" value={landmark.url} onChange={(e) => handleLandmarkChange(index, 'url', e.target.value)} placeholder="Google Maps Direction Link" />
                    </div>
                    {landmarks.length > 1 && (<button type="button" onClick={() => removeLandmarkField(index)} className="btn btn-outline-danger p-2 d-flex align-items-center justify-content-center rounded-3 shadow-sm flex-shrink-0 transition-all" style={{ height: '38px', width: '38px' }}><Trash2 size={14} /></button>)}
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading} className="btn w-100 mt-4 py-3 fw-bold text-uppercase tracking-wider border-0 text-white rounded-3 shadow d-flex align-items-center justify-content-center gap-2" style={{ background: loading ? '#6b7280' : 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', fontSize: '0.8rem', letterSpacing: '0.8px', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? (<><div className="spinner-border spinner-border-sm text-light" role="status"></div><span>Deploying Ledger Matrix...</span></>) : (<><CheckCircle size={15} /><span>Launch Configuration Live</span></>)}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}