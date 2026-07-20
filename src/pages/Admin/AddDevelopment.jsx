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
  Image as ImageIcon, Trash2, Move, Search, Globe
} from 'lucide-react';
import './AddDevelopment.css';

const STATUS_OPTIONS = [
  { value: 'pre-construction', label: 'Pre-Construction' },
  { value: 'under construction', label: 'Under Construction' },
  { value: 'completed', label: 'Completed' }
];

const BED_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
const BATH_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

// Pre-defined features list
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
    images: [], // Changed from single img to images array
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
  
  // Location Search States
  const [locationSearch, setLocationSearch] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [searchingLocation, setSearchingLocation] = useState(false);
  const locationSearchRef = useRef(null);
  
  // Drag and Drop States
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

  // Location Search - Google Places API
  const searchLocation = async (query) => {
    if (!query || query.length < 2) {
      setLocationSuggestions([]);
      return;
    }

    setSearchingLocation(true);
    try {
      // Using Google Places API via proxy or direct
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
        
        // Find neighborhood/sublocality
        let neighborhood = '';
        const components = data.result.address_components || [];
        for (const comp of components) {
          if (comp.types.includes('sublocality') || comp.types.includes('neighborhood')) {
            neighborhood = comp.long_name;
            break;
          }
        }
        
        // Update form with location details
        setFormData(prev => ({
          ...prev,
          location: address,
          neighborhood: neighborhood || prev.neighborhood,
          latitude: location?.lat || '',
          longitude: location?.lng || ''
        }));
        
        setLocationSearch(address);
        setShowLocationSuggestions(false);
        toast.success('📍 Location found!');
      }
    } catch (error) {
      console.error('Place details error:', error);
      toast.error('Could not fetch location details');
    }
  };

  // Get current location
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

  // Multiple Image Upload Handlers
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

  // Drag and Drop for Images
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
    
    // Validation
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

    // Check if we have images (either new uploads or existing)
    const hasImages = imageFiles.length > 0 || (editData?.images && editData.images.length > 0);
    if (!hasImages) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);
    const toastId = toast.loading(isEditing ? 'Updating development...' : 'Adding new development...');

    try {
      let imageUrls = formData.images || [];

      // Upload new images if any
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImagesToCloudinary(imageFiles);
        if (uploadedUrls && uploadedUrls.length > 0) {
          // If editing, append new images to existing ones
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

      // Reset form
      setFormData({
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
    // Clean up object URLs
    imagePreviews.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setImageFiles([]);
    setImagePreviews([]);
    setFormData({
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
    setIsEditing(false);
    onCancel?.();
  };

  const filteredFeatures = FEATURES_LIST.filter(f => 
    f.toLowerCase().includes(featureInput.toLowerCase()) && 
    !formData.features.includes(f)
  );

  return (
    <div className="add-development-container">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h4 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
            <Sparkles size={20} className="text-primary" />
            {isEditing ? 'Edit Development' : 'Add New Development'}
          </h4>
          <small className="text-muted">
            {isEditing ? 'Update existing development details' : 'Create a new luxury development listing'}
          </small>
        </div>
        {isEditing && (
          <span className="badge bg-warning text-dark px-3 py-2">
            <Edit2 size={14} className="me-1" />
            Editing Mode
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          
          {/* Multiple Image Upload */}
          <div className="col-12">
            <label className="form-label fw-semibold text-dark">
              Development Images <span className="text-danger">*</span>
              <small className="text-muted ms-2">(Upload multiple images)</small>
            </label>
            
            {/* Upload Area */}
            <div className="image-upload-area mb-3">
              <label className="d-flex flex-column align-items-center justify-content-center border-2 border-dashed rounded-3 p-4" 
                style={{ minHeight: '120px', borderColor: '#dee2e6', cursor: 'pointer' }}>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="d-none" />
                <Upload size={32} className="text-muted mb-2" />
                <span className="text-muted">Click to upload multiple images</span>
                <small className="text-muted">Supported: JPG, PNG, WebP</small>
                <small className="text-muted">You can drag and drop to reorder</small>
              </label>
            </div>

            {/* Image Previews Grid */}
            {imagePreviews.length > 0 && (
              <div className="image-preview-grid">
                <div className="row g-2">
                  {imagePreviews.map((url, index) => (
                    <div 
                      key={index} 
                      className="col-4 col-md-3 col-lg-2"
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      style={{ 
                        opacity: draggingIndex === index ? 0.5 : 1,
                        cursor: 'grab'
                      }}
                    >
                      <div className="image-preview-item position-relative">
                        <img 
                          src={url} 
                          alt={`Preview ${index + 1}`} 
                          className="w-100 rounded-3"
                          style={{ height: '120px', objectFit: 'cover' }}
                        />
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle"
                          onClick={() => removeImage(index)}
                          style={{ width: '24px', height: '24px', padding: 0 }}
                        >
                          <X size={14} />
                        </button>
                        <div className="position-absolute bottom-0 start-0 end-0 p-1 bg-dark bg-opacity-50 text-white text-center rounded-bottom">
                          <small>{index + 1}</small>
                        </div>
                        <div className="drag-handle position-absolute top-50 start-0 translate-middle-y">
                          <Move size={16} className="text-white bg-dark bg-opacity-50 rounded p-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <small className="text-muted d-block mt-2">
                  Drag images to reorder • {imagePreviews.length} images uploaded
                </small>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="col-md-6">
            <label className="form-label fw-semibold text-dark">Development Name *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g., The Henry"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location with Real-time Search */}
          <div className="col-md-6">
            <label className="form-label fw-semibold text-dark">
              Location * 
              <button 
                type="button" 
                className="btn btn-sm btn-outline-primary ms-2"
                onClick={getCurrentLocation}
                title="Use current location"
              >
                <Globe size={14} className="me-1" />
                Use My Location
              </button>
            </label>
            <div className="position-relative">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search for a location..."
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
              
              {/* Location Suggestions */}
              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <div className="location-suggestions">
                  {locationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      className="suggestion-item d-flex flex-column align-items-start p-2 w-100 border-0 bg-transparent"
                      onClick={() => getPlaceDetails(suggestion.placeId)}
                    >
                      <span className="fw-semibold">{suggestion.mainText}</span>
                      <span className="text-muted small">{suggestion.secondaryText}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {searchingLocation && (
                <div className="location-loading">
                  <Loader2 size={16} className="spinner-border spinner-border-sm me-2" />
                  Searching...
                </div>
              )}
            </div>
            {formData.location && !locationSearch && (
              <div className="mt-1">
                <small className="text-success">
                  <MapPin size={12} className="me-1" />
                  {formData.location}
                </small>
                {formData.latitude && formData.longitude && (
                  <small className="text-muted ms-2">
                    📍 {formData.latitude}, {formData.longitude}
                  </small>
                )}
              </div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">Price *</label>
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

          <div className="col-md-2">
            <label className="form-label fw-semibold text-dark">Beds *</label>
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

          <div className="col-md-2">
            <label className="form-label fw-semibold text-dark">Baths *</label>
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

          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">Square Feet *</label>
            <input
              type="text"
              name="sqft"
              className="form-control"
              placeholder="e.g., 1,200"
              value={formData.sqft}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold text-dark">Status *</label>
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

          <div className="col-md-6">
            <label className="form-label fw-semibold text-dark">Property Type</label>
            <input
              type="text"
              name="type"
              className="form-control"
              placeholder="e.g., Luxury Residence, Penthouse"
              value={formData.type}
              onChange={handleChange}
            />
          </div>

          {/* Additional Details */}
          <div className="col-12">
            <h6 className="fw-bold text-dark mb-3">Additional Details</h6>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">Total Units</label>
            <input
              type="number"
              name="totalUnits"
              className="form-control"
              placeholder="e.g., 120"
              value={formData.totalUnits}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">Year Built</label>
            <input
              type="text"
              name="yearBuilt"
              className="form-control"
              placeholder="e.g., 2024"
              value={formData.yearBuilt}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">Number of Floors</label>
            <input
              type="number"
              name="floors"
              className="form-control"
              placeholder="e.g., 25"
              value={formData.floors}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">Parking Spots</label>
            <input
              type="number"
              name="parkingSpots"
              className="form-control"
              placeholder="e.g., 200"
              value={formData.parkingSpots}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">Expected Completion</label>
            <input
              type="date"
              name="completionDate"
              className="form-control"
              value={formData.completionDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">Occupancy Date</label>
            <input
              type="date"
              name="occupancyDate"
              className="form-control"
              value={formData.occupancyDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold text-dark">Neighborhood</label>
            <input
              type="text"
              name="neighborhood"
              className="form-control"
              placeholder="e.g., Upper East Side"
              value={formData.neighborhood}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold text-dark">Pet Policy</label>
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

          <div className="col-12">
            <label className="form-label fw-semibold text-dark">Nearby Attractions</label>
            <input
              type="text"
              name="nearby"
              className="form-control"
              placeholder="e.g., Central Park, Museums, Restaurants"
              value={formData.nearby}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label fw-semibold text-dark">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="4"
              placeholder="Detailed description of the development..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Features */}
          <div className="col-12">
            <label className="form-label fw-semibold text-dark">Amenities & Features</label>
            <div className="d-flex gap-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Add a feature (e.g., Swimming Pool)"
                value={featureInput}
                onChange={(e) => {
                  setFeatureInput(e.target.value);
                  setShowFeatureSuggestions(true);
                }}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowFeatureSuggestions(true)}
                onBlur={() => setTimeout(() => setShowFeatureSuggestions(false), 200)}
              />
              <button type="button" className="btn btn-primary" onClick={handleAddFeature}>
                <Plus size={20} />
              </button>
            </div>

            {/* Feature Suggestions */}
            {showFeatureSuggestions && featureInput && filteredFeatures.length > 0 && (
              <div className="feature-suggestions">
                {filteredFeatures.slice(0, 10).map((feature, index) => (
                  <button
                    key={index}
                    type="button"
                    className="suggestion-item"
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

            {/* Selected Features */}
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.features.map((feature, index) => (
                <span key={index} className="badge bg-primary text-white d-flex align-items-center gap-1 px-3 py-2">
                  {feature}
                  <button type="button" className="btn btn-link text-white p-0 ms-1" onClick={() => handleRemoveFeature(index)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            {formData.features.length === 0 && (
              <small className="text-muted">No features added yet. Start typing to add amenities.</small>
            )}
          </div>
        </div>

        <div className="d-flex gap-3 mt-4 pt-3 border-top">
          <button 
            type="submit" 
            className="btn btn-primary px-5 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spinner-border spinner-border-sm me-2" />
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>
                <CheckCircle size={18} className="me-2" />
                {isEditing ? 'Update Development' : 'Add Development'}
              </>
            )}
          </button>
          <button 
            type="button" 
            className="btn btn-outline-secondary px-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}