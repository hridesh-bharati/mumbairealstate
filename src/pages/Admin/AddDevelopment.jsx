// src/components/Admin/AddDevelopment.js
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { uploadImagesToCloudinary } from '../../services/cloudinary';
import { toast } from 'sonner';
import { 
  Upload, X, Plus, Loader2, Sparkles, Edit2, CheckCircle,
  Building2, MapPin, DollarSign, Home, Bath, Square, 
  Calendar, Users, Clock, Shield, Wifi, Coffee, Dumbbell,
  TreePine, Car, Tv, Lock, Flame, Snowflake, Sun, Waves,
  UtensilsCrossed, Gem, Star, Award, Heart, Maximize, Ruler,
  Image as ImageIcon, Trash2, Move, Search, Globe, Layers, Sliders
} from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'pre-construction', label: 'Pre-Construction' },
  { value: 'under construction', label: 'Under Construction' },
  { value: 'completed', label: 'Completed' }
];

const BED_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
const BATH_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const FEATURES_LIST = [
  'Swimming Pool', 'Gym', 'Fitness Center', 'Parking', 'Car Parking',
  'WiFi', 'High Speed Internet', 'Landscaped Garden', 'Rooftop Garden',
  'Ocean View', 'Sea View', 'Mountain View', 'City View',
  '24/7 Security', 'Gated Community', 'Elevator', 'Lift',
  'Air Conditioning', 'Central Heating', 'Smart Home', 'Home Automation',
  'Balcony', 'Terrace', 'Rooftop Terrace', 'Club House',
  'Community Center', 'Spa', 'Wellness Center', 'Restaurant',
  'Fine Dining', 'Cafe', 'Coffee Shop', 'Kids Play Area',
  'Pet Friendly', 'Pets Allowed', 'Cable TV', 'Car Wash',
  'Valet Parking', 'Sky Lounge', 'Business Center', 'Conference Room',
  'Luxury Finishes', 'Modern Design', 'Waterfront', 'Beach Access',
  'Tennis Court', 'Basketball Court', 'Jogging Track', 'Playground'
];

export default function AddDevelopment({ onSuccess, editData = null, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    status: 'pre-construction',
    description: '',
    features: [],
    images: [],
    totalUnits: '',
    completionDate: '',
    neighborhood: '',
    nearby: '',
    type: 'Luxury Residence',
    yearBuilt: '',
    floors: '',
    parkingSpots: '',
    petPolicy: 'Pets Allowed',
    occupancyDate: '',
    latitude: '',
    longitude: ''
  });

  const [featureInput, setFeatureInput] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showFeatureSuggestions, setShowFeatureSuggestions] = useState(false);
  
  const [locationSearch, setLocationSearch] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [searchingLocation, setSearchingLocation] = useState(false);
  
  const [draggingIndex, setDraggingIndex] = useState(null);

  useEffect(() => {
    if (editData) {
      setIsEditing(true);
      setFormData({
        title: editData.title || '',
        location: editData.location || '',
        price: editData.price || '',
        beds: editData.beds || '',
        baths: editData.baths || '',
        sqft: editData.sqft || '',
        status: editData.status || 'pre-construction',
        description: editData.description || '',
        features: editData.features || [],
        images: editData.images || [],
        totalUnits: editData.totalUnits || '',
        completionDate: editData.completionDate || '',
        neighborhood: editData.neighborhood || '',
        nearby: editData.nearby || '',
        type: editData.type || 'Luxury Residence',
        yearBuilt: editData.yearBuilt || '',
        floors: editData.floors || '',
        parkingSpots: editData.parkingSpots || '',
        petPolicy: editData.petPolicy || 'Pets Allowed',
        occupancyDate: editData.occupancyDate || '',
        latitude: editData.latitude || '',
        longitude: editData.longitude || ''
      });
      if (editData.images && editData.images.length > 0) {
        setImagePreviews(editData.images);
      }
    }
  }, [editData]);

  const searchLocation = async (query) => {
    if (!query || query.length < 2) {
      setLocationSuggestions([]);
      return;
    }

    setSearchingLocation(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=geocode&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.predictions) {
        setLocationSuggestions(data.predictions.map(p => ({
          description: p.description,
          placeId: p.place_id,
          mainText: p.structured_formatting?.main_text || p.description,
          secondaryText: p.structured_formatting?.secondary_text || ''
        })));
        setShowLocationSuggestions(true);
      }
    } catch (error) {
      console.error('Location search error:', error);
    } finally {
      setSearchingLocation(false);
    }
  };

  const getPlaceDetails = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.result) {
        const location = data.result.geometry?.location;
        const address = data.result.formatted_address || data.result.name;
        
        let neighborhood = '';
        const components = data.result.address_components || [];
        for (const comp of components) {
          if (comp.types.includes('sublocality') || comp.types.includes('neighborhood')) {
            neighborhood = comp.long_name;
            break;
          }
        }
        
        setFormData(prev => ({
          ...prev,
          location: address,
          neighborhood: neighborhood || prev.neighborhood,
          latitude: location?.lat || '',
          longitude: location?.lng || ''
        }));
        
        setLocationSearch(address);
        setShowLocationSuggestions(false);
        toast.success('📍 Location selected!');
      }
    } catch (error) {
      console.error('Place details error:', error);
      toast.error('Could not fetch location details');
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    toast.loading('Getting your location...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            let neighborhood = '';
            
            for (const comp of data.results[0].address_components || []) {
              if (comp.types.includes('sublocality') || comp.types.includes('neighborhood')) {
                neighborhood = comp.long_name;
                break;
              }
            }
            
            setFormData(prev => ({
              ...prev,
              location: address,
              neighborhood: neighborhood || prev.neighborhood,
              latitude: latitude.toString(),
              longitude: longitude.toString()
            }));
            
            setLocationSearch(address);
            toast.dismiss();
            toast.success('📍 Current location found!');
          }
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          toast.dismiss();
          toast.error('Could not get address from location');
        }
      },
      (error) => {
        toast.dismiss();
        toast.error('Unable to get location: ' + error.message);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
      setShowFeatureSuggestions(false);
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (featureInput.trim()) {
        handleAddFeature();
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setImageFiles(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === dropIndex) return;
    
    const newPreviews = [...imagePreviews];
    const [draggedItem] = newPreviews.splice(draggingIndex, 1);
    newPreviews.splice(dropIndex, 0, draggedItem);
    setImagePreviews(newPreviews);
    
    const newFiles = [...imageFiles];
    const [draggedFile] = newFiles.splice(draggingIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);
    setImageFiles(newFiles);
    
    setDraggingIndex(null);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter development name');
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Please enter location');
      return;
    }
    if (!formData.price.trim()) {
      toast.error('Please enter price');
      return;
    }
    if (!formData.beds) {
      toast.error('Please select number of beds');
      return;
    }
    if (!formData.baths) {
      toast.error('Please select number of baths');
      return;
    }
    if (!formData.sqft.trim()) {
      toast.error('Please enter square feet');
      return;
    }

    const hasImages = imageFiles.length > 0 || (editData?.images && editData.images.length > 0);
    if (!hasImages) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);
    const toastId = toast.loading(isEditing ? 'Updating development...' : 'Adding new development...');

    try {
      let imageUrls = formData.images || [];

      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImagesToCloudinary(imageFiles);
        if (uploadedUrls && uploadedUrls.length > 0) {
          if (isEditing) {
            imageUrls = [...imageUrls, ...uploadedUrls];
          } else {
            imageUrls = uploadedUrls;
          }
        } else {
          throw new Error('Failed to upload images');
        }
      }

      const developmentData = {
        title: formData.title.trim(),
        location: formData.location.trim(),
        price: formData.price.trim(),
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        sqft: formData.sqft.trim(),
        status: formData.status,
        description: formData.description.trim(),
        features: formData.features,
        images: imageUrls,
        totalUnits: formData.totalUnits || '',
        completionDate: formData.completionDate || '',
        neighborhood: formData.neighborhood || '',
        nearby: formData.nearby || '',
        type: formData.type || 'Luxury Residence',
        yearBuilt: formData.yearBuilt || '',
        floors: formData.floors || '',
        parkingSpots: formData.parkingSpots || '',
        petPolicy: formData.petPolicy || 'Pets Allowed',
        occupancyDate: formData.occupancyDate || '',
        latitude: formData.latitude || '',
        longitude: formData.longitude || '',
        updatedAt: new Date().toISOString()
      };

      if (isEditing && editData?.id) {
        await updateDoc(doc(db, "developments", editData.id), developmentData);
        toast.success('✨ Development updated successfully!', { id: toastId });
      } else {
        developmentData.createdAt = new Date().toISOString();
        await addDoc(collection(db, "developments"), developmentData);
        toast.success('🎉 New development added successfully!', { id: toastId });
      }

      setFormData({
        title: '', location: '', price: '', beds: '', baths: '', sqft: '',
        status: 'pre-construction', description: '', features: [], images: [],
        totalUnits: '', completionDate: '', neighborhood: '', nearby: '',
        type: 'Luxury Residence', yearBuilt: '', floors: '', parkingSpots: '',
        petPolicy: 'Pets Allowed', occupancyDate: '', latitude: '', longitude: ''
      });
      setImageFiles([]);
      setImagePreviews([]);
      setFeatureInput('');
      setLocationSearch('');
      setIsEditing(false);
      
      onSuccess?.();
    } catch (error) {
      console.error("Error saving development:", error);
      toast.error('❌ Failed to save development. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    imagePreviews.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setImageFiles([]);
    setImagePreviews([]);
    setFormData({
      title: '', location: '', price: '', beds: '', baths: '', sqft: '',
      status: 'pre-construction', description: '', features: [], images: [],
      totalUnits: '', completionDate: '', neighborhood: '', nearby: '',
      type: 'Luxury Residence', yearBuilt: '', floors: '', parkingSpots: '',
      petPolicy: 'Pets Allowed', occupancyDate: '', latitude: '', longitude: ''
    });
    setIsEditing(false);
    onCancel?.();
  };

  const filteredFeatures = FEATURES_LIST.filter(f => 
    f.toLowerCase().includes(featureInput.toLowerCase()) && 
    !formData.features.includes(f)
  );

  return (
    <div className="add-development-container p-2 p-md-4 text-start">
      <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
        
        {/* Header Section */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom gap-2">
          <div>
            <h4 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2 fs-5">
              <Sparkles size={20} className="text-primary" />
              {isEditing ? 'Edit Development' : 'Add New Development'}
            </h4>
            <small className="text-muted d-block mt-1">
              {isEditing ? 'Update existing development details' : 'Create a new luxury development listing'}
            </small>
          </div>
          {isEditing && (
            <span className="badge bg-warning text-dark px-3 py-2 flex-shrink-0">
              <Edit2 size={13} className="me-1" />
              Editing Mode
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: IMAGE UPLOADS */}
          <div className="mb-4">
            <label className="form-label fw-bold text-dark small mb-2 d-block">
              Development Showcase Images <span className="text-danger">*</span>
            </label>
            
            <div className="image-upload-area mb-3">
              <label className="d-flex flex-column align-items-center justify-content-center border-2 border-dashed rounded-3 p-3 p-md-4 text-center" 
                style={{ minHeight: '110px', borderColor: '#cbd5e1', cursor: 'pointer', background: '#f8fafc' }}>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="d-none" />
                <Upload size={28} className="text-primary mb-1" />
                <span className="fw-semibold small text-dark">Click to upload showcase photos</span>
                <small className="text-muted fs-7">JPG, PNG, WebP allowed (Drag and drop to reorder)</small>
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="image-preview-grid p-2 border rounded-3 bg-light">
                <div className="row g-2">
                  {imagePreviews.map((url, index) => (
                    <div 
                      key={index} 
                      className="col-6 col-sm-4 col-md-3 col-lg-2"
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      style={{ 
                        opacity: draggingIndex === index ? 0.4 : 1,
                        cursor: 'grab'
                      }}
                    >
                      <div className="position-relative overflow-hidden rounded-2 shadow-sm bg-white border">
                        <img 
                          src={url} 
                          alt={`Preview ${index + 1}`} 
                          className="w-100"
                          style={{ height: '100px', objectFit: 'cover' }}
                        />
                        <button 
                          type="button" 
                          className="btn btn-danger p-0 position-absolute top-0 end-0 m-1 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                          onClick={() => removeImage(index)}
                          style={{ width: '22px', height: '22px' }}
                        >
                          <X size={12} />
                        </button>
                        <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-60 text-white text-center py-0.5">
                          <small style={{ fontSize: '0.65rem' }}>#{index + 1}</small>
                        </div>
                        <div className="position-absolute top-50 start-0 translate-middle-y ms-1">
                          <Move size={14} className="text-white bg-dark bg-opacity-50 rounded p-0.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <small className="text-muted d-block mt-2 text-center fs-7">
                  {imagePreviews.length} images uploaded. Reorder by dragging thumbs.
                </small>
              </div>
            )}
          </div>

          {/* STEP 2: CORE INFO */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold text-secondary small mb-1">Development Name *</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g., The Grand Waterfront"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location Autocomplete */}
            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label fw-bold text-secondary small mb-0">Location *</label>
                <button 
                  type="button" 
                  className="btn btn-xs text-primary p-0 bg-transparent border-0 fw-semibold d-flex align-items-center gap-1"
                  onClick={getCurrentLocation}
                  style={{ fontSize: '0.75rem' }}
                >
                  <Globe size={12} /> Use GPS Location
                </button>
              </div>
              <div className="position-relative">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Search size={16} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search building address..."
                    value={locationSearch || formData.location}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLocationSearch(value);
                      searchLocation(value);
                    }}
                    onFocus={() => {
                      if (locationSearch && locationSearch.length > 1) {
                        setShowLocationSuggestions(true);
                      }
                    }}
                  />
                </div>
                
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div className="position-absolute w-100 bg-white border rounded-3 shadow-lg mt-1 overflow-hidden z-3" style={{ top: '100%', left: 0 }}>
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className="suggestion-item d-flex flex-column align-items-start p-2.5 w-100 border-bottom border-light bg-hover-light text-start border-0"
                        onClick={() => getPlaceDetails(suggestion.placeId)}
                      >
                        <span className="fw-semibold small text-dark">{suggestion.mainText}</span>
                        <span className="text-muted fs-7">{suggestion.secondaryText}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {searchingLocation && (
                  <div className="p-2 small text-muted position-absolute bg-white border rounded mt-1 shadow-sm">
                    <Loader2 size={14} className="spinner-border spinner-border-sm me-1 text-primary" />
                    Searching...
                  </div>
                )}
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <label className="form-label fw-bold text-secondary small mb-1">Price *</label>
              <input
                type="text"
                name="price"
                className="form-control"
                placeholder="e.g., $1.2M+"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6 col-sm-3 col-md-2">
              <label className="form-label fw-bold text-secondary small mb-1">Beds *</label>
              <select
                name="beds"
                className="form-select"
                value={formData.beds}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {BED_OPTIONS.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="col-6 col-sm-3 col-md-2">
              <label className="form-label fw-bold text-secondary small mb-1">Baths *</label>
              <select
                name="baths"
                className="form-select"
                value={formData.baths}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {BATH_OPTIONS.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="col-6 col-sm-6 col-md-2">
              <label className="form-label fw-bold text-secondary small mb-1">Sq Ft *</label>
              <input
                type="text"
                name="sqft"
                className="form-control"
                placeholder="1,200"
                value={formData.sqft}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6 col-sm-6 col-md-2">
              <label className="form-label fw-bold text-secondary small mb-1">Status *</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
                required
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* STEP 3: STRUCTURAL METRICS */}
          <h6 className="fw-bold text-dark mt-4 mb-3 fs-6 border-bottom pb-2 d-flex align-items-center gap-2">
            <Building2 size={16} className="text-primary" /> Structural Specifications
          </h6>

          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-md-4">
              <label className="form-label fw-bold text-secondary small mb-1">Property Type</label>
              <input
                type="text"
                name="type"
                className="form-control"
                placeholder="e.g., Luxury Residence"
                value={formData.type}
                onChange={handleChange}
              />
            </div>

            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label fw-bold text-secondary small mb-1">Total Units</label>
              <input
                type="number"
                name="totalUnits"
                className="form-control"
                placeholder="120"
                value={formData.totalUnits}
                onChange={handleChange}
              />
            </div>

            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label fw-bold text-secondary small mb-1">Year Built</label>
              <input
                type="text"
                name="yearBuilt"
                className="form-control"
                placeholder="2024"
                value={formData.yearBuilt}
                onChange={handleChange}
              />
            </div>

            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label fw-bold text-secondary small mb-1">Number of Floors</label>
              <input
                type="number"
                name="floors"
                className="form-control"
                placeholder="25"
                value={formData.floors}
                onChange={handleChange}
              />
            </div>

            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label fw-bold text-secondary small mb-1">Parking Spots</label>
              <input
                type="number"
                name="parkingSpots"
                className="form-control"
                placeholder="200"
                value={formData.parkingSpots}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <label className="form-label fw-bold text-secondary small mb-1">Pet Policy</label>
              <select
                name="petPolicy"
                className="form-select"
                value={formData.petPolicy}
                onChange={handleChange}
              >
                <option value="Pets Allowed">Pets Allowed</option>
                <option value="Pets Not Allowed">Pets Not Allowed</option>
                <option value="Pets on Request">Pets on Request</option>
              </select>
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label fw-bold text-secondary small mb-1">Expected Completion</label>
              <input
                type="date"
                name="completionDate"
                className="form-control"
                value={formData.completionDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label fw-bold text-secondary small mb-1">Occupancy Date</label>
              <input
                type="date"
                name="occupancyDate"
                className="form-control"
                value={formData.occupancyDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold text-secondary small mb-1">Neighborhood</label>
              <input
                type="text"
                name="neighborhood"
                className="form-control"
                placeholder="e.g., Upper East Side"
                value={formData.neighborhood}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold text-secondary small mb-1">Nearby Attractions</label>
              <input
                type="text"
                name="nearby"
                className="form-control"
                placeholder="Central Park, Museums..."
                value={formData.nearby}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-bold text-secondary small mb-1">Detailed Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                placeholder="Write architectural highlights and building specifics..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* STEP 4: AMENITIES & FEATURES */}
          <h6 className="fw-bold text-dark mt-4 mb-3 fs-6 border-bottom pb-2 d-flex align-items-center gap-2">
            <Sparkles size={16} className="text-primary" /> Amenities & Features
          </h6>

          <div className="row g-3 mb-4">
            <div className="col-12">
              <div className="position-relative">
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search feature or type new..."
                    value={featureInput}
                    onChange={(e) => {
                      setFeatureInput(e.target.value);
                      setShowFeatureSuggestions(true);
                    }}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setShowFeatureSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowFeatureSuggestions(false), 200)}
                  />
                  <button type="button" className="btn btn-primary px-3 flex-shrink-0" onClick={handleAddFeature}>
                    <Plus size={18} />
                  </button>
                </div>

                {showFeatureSuggestions && featureInput && filteredFeatures.length > 0 && (
                  <div className="position-absolute w-100 bg-white border rounded-3 shadow-lg mt-1 overflow-hidden z-3" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    {filteredFeatures.slice(0, 10).map((feature, index) => (
                      <button
                        key={index}
                        type="button"
                        className="suggestion-item p-2 w-100 text-start border-0 bg-hover-light small text-dark border-bottom border-light"
                        onClick={() => {
                          setFeatureInput(feature);
                          setTimeout(handleAddFeature, 100);
                        }}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="d-flex flex-wrap gap-1.5 mt-2.5">
                {formData.features.map((feature, index) => (
                  <span key={index} className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 d-inline-flex align-items-center gap-1 px-2.5 py-1.5 rounded-2 small">
                    {feature}
                    <button type="button" className="btn btn-link text-danger p-0 ms-1 d-flex align-items-center" onClick={() => handleRemoveFeature(index)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              {formData.features.length === 0 && (
                <small className="text-muted fs-7 d-block mt-1">No amenities selected. Search above to append list.</small>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="d-flex flex-column flex-sm-row gap-2 mt-4 pt-3 border-top">
            <button 
              type="submit" 
              className="btn btn-primary px-4 py-2.5 fw-bold text-uppercase tracking-wider flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow-sm"
              disabled={loading}
              style={{ fontSize: '0.8rem' }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="spinner-border spinner-border-sm" />
                  <span>{isEditing ? 'Updating...' : 'Adding...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  <span>{isEditing ? 'Update Development' : 'Add Development'}</span>
                </>
              )}
            </button>
            <button 
              type="button" 
              className="btn btn-outline-secondary px-4 py-2.5 fw-semibold"
              onClick={handleCancel}
              style={{ fontSize: '0.8rem' }}
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}