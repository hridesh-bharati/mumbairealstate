// src/pages/DevelopmentDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  ArrowLeft, MapPin, Bed, Bath, Square, Sparkles, 
  Building2, Calendar, Check, X, ChevronLeft, ChevronRight,
  Home, Users, Award, Clock, Phone, Mail, MessageCircle,
  Share2, Heart, Download, Printer, ExternalLink,
  Ruler, Maximize, Sun, Wind, Shield, Wifi,
  Coffee, Dumbbell, TreePine, Car, 
  UtensilsCrossed, Tv, Lock, Flame, Snowflake,
  ParkingCircle, Waves, Gem, Star, Camera, Eye,
  FileText, Info, Map, Layers, List, Grid, 
  ChevronDown, ChevronUp, Bookmark, Send, 
  CalendarDays, Building, Sofa, Bath as BathIcon
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './DevelopmentDetails.css';

export default function DevelopmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [development, setDevelopment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    window.scrollTo(0, 0);
    fetchDevelopment();
  }, [id]);

  const fetchDevelopment = async () => {
    try {
      const docRef = doc(db, "developments", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDevelopment({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("Development not found");
      }
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate('/development/current');
  };

  const nextImage = () => {
    if (development?.images?.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % development.images.length);
    }
  };

  const prevImage = () => {
    if (development?.images?.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + development.images.length) % development.images.length);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pre-construction': '#f59e0b',
      'under construction': '#6366f1',
      'completed': '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pre-construction': 'Pre-Construction',
      'under construction': 'Under Construction',
      'completed': 'Completed'
    };
    return labels[status] || status;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Coming soon';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Feature icons mapping
  const getFeatureIcon = (feature) => {
    const iconMap = {
      'Pool': <Gem size={20} />,
      'Swimming Pool': <Gem size={20} />,
      'Gym': <Dumbbell size={20} />,
      'Fitness Center': <Dumbbell size={20} />,
      'Parking': <ParkingCircle size={20} />,
      'Car Parking': <ParkingCircle size={20} />,
      'WiFi': <Wifi size={20} />,
      'High Speed Internet': <Wifi size={20} />,
      'Garden': <TreePine size={20} />,
      'Landscaped Garden': <TreePine size={20} />,
      'Ocean View': <Waves size={20} />,
      'Sea View': <Waves size={20} />,
      'Mountain View': <Sun size={20} />,
      'City View': <Building2 size={20} />,
      'Security': <Shield size={20} />,
      '24/7 Security': <Shield size={20} />,
      'Elevator': <Building2 size={20} />,
      'Lift': <Building2 size={20} />,
      'AC': <Snowflake size={20} />,
      'Air Conditioning': <Snowflake size={20} />,
      'Heating': <Flame size={20} />,
      'Central Heating': <Flame size={20} />,
      'Smart Home': <Lock size={20} />,
      'Home Automation': <Lock size={20} />,
      'Balcony': <Maximize size={20} />,
      'Terrace': <Sun size={20} />,
      'Rooftop Terrace': <Sun size={20} />,
      'Club House': <Users size={20} />,
      'Community Center': <Users size={20} />,
      'Spa': <Award size={20} />,
      'Wellness Center': <Award size={20} />,
      'Restaurant': <UtensilsCrossed size={20} />,
      'Fine Dining': <UtensilsCrossed size={20} />,
      'Cafe': <Coffee size={20} />,
      'Coffee Shop': <Coffee size={20} />,
      'Kids Play': <Home size={20} />,
      'Children Play Area': <Home size={20} />,
      'Pet Friendly': <Heart size={20} />,
      'Pets Allowed': <Heart size={20} />,
      'TV': <Tv size={20} />,
      'Cable TV': <Tv size={20} />,
      'Car Wash': <Car size={20} />,
      'Valet Parking': <Car size={20} />,
      'Rooftop Garden': <TreePine size={20} />,
      'Sky Lounge': <Star size={20} />,
      'Business Center': <Building2 size={20} />,
      'Conference Room': <Building2 size={20} />,
      'Luxury Finishes': <Gem size={20} />,
      'Modern Design': <Sparkles size={20} />,
      'Waterfront': <Waves size={20} />,
      'Gated Community': <Shield size={20} />
    };
    return iconMap[feature] || <Sparkles size={20} />;
  };

  if (loading) {
    return (
      <div className="dev-details-wrapper">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading development details...</p>
        </div>
      </div>
    );
  }

  if (!development) {
    return (
      <div className="dev-details-wrapper">
        <div className="container py-5 text-center">
          <Building2 size={64} className="text-muted mb-3" />
          <h3>Development Not Found</h3>
          <p className="text-muted">The development you're looking for doesn't exist.</p>
          <button className="btn btn-primary mt-3" onClick={goBack}>
            <ArrowLeft size={18} className="me-2" />
            Back to Developments
          </button>
        </div>
      </div>
    );
  }

  const images = development.images || [development.img || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'];
  const displayFeatures = showAllFeatures ? development.features : development.features?.slice(0, 12);

  return (
    <div className="dev-details-wrapper">
      
      {/* Top Bar */}
      <div className="dev-details-top-bar">
        <div className="container">
          <button className="btn-back" onClick={goBack}>
            <ArrowLeft size={20} />
            <span>Back to Developments</span>
          </button>
          <div className="dev-actions">
            <button className="btn-icon" title="Save">
              <Heart size={18} />
            </button>
            <button className="btn-icon" title="Share">
              <Share2 size={18} />
            </button>
            <button className="btn-icon" title="Print">
              <Printer size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Gallery */}
      <div className="dev-hero-section">
        <div className="dev-gallery-container">
          <div className="dev-main-image-wrapper">
            <img src={images[activeImageIndex]} alt={development.title} className="dev-main-image" />
            
            <div className="dev-status-badge" style={{ backgroundColor: getStatusColor(development.status) }}>
              {getStatusLabel(development.status)}
            </div>

            <div className="dev-price-badge">
              {development.price || 'Price on Request'}
            </div>

            {images.length > 1 && (
              <>
                <button className="dev-gallery-nav prev" onClick={prevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="dev-gallery-nav next" onClick={nextImage}>
                  <ChevronRight size={24} />
                </button>
                <div className="dev-image-counter">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="dev-thumbnail-strip">
              {images.map((img, index) => (
                <div 
                  key={index}
                  className={`dev-thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="dev-content-section">
        <div className="container">
          <div className="row g-4">
            
            {/* Left Column */}
            <div className="col-lg-8">
              {/* Header */}
              <div className="dev-header" data-aos="fade-up">
                <h1 className="dev-title">{development.title}</h1>
                <div className="dev-location">
                  <MapPin size={18} className="dev-location-icon" />
                  <span>{development.location}</span>
                </div>
                <div className="dev-meta-tags">
                  <span className="dev-meta-tag">
                    <Calendar size={14} />
                    Listed: {formatDate(development.createdAt)}
                  </span>
                  <span className="dev-meta-tag">
                    <Clock size={14} />
                    Updated: {formatDate(development.updatedAt)}
                  </span>
                  {development.type && (
                    <span className="dev-meta-tag">
                      <Building size={14} />
                      {development.type}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Specs */}
              <div className="dev-quick-specs" data-aos="fade-up" data-aos-delay="100">
                <div className="dev-spec-item">
                  <Bed size={20} />
                  <div>
                    <span className="dev-spec-label">Bedrooms</span>
                    <span className="dev-spec-value">{development.beds || '-'}</span>
                  </div>
                </div>
                <div className="dev-spec-divider"></div>
                <div className="dev-spec-item">
                  <Bath size={20} />
                  <div>
                    <span className="dev-spec-label">Bathrooms</span>
                    <span className="dev-spec-value">{development.baths || '-'}</span>
                  </div>
                </div>
                <div className="dev-spec-divider"></div>
                <div className="dev-spec-item">
                  <Square size={20} />
                  <div>
                    <span className="dev-spec-label">Square Feet</span>
                    <span className="dev-spec-value">{development.sqft || '-'}</span>
                  </div>
                </div>
                {development.totalUnits && (
                  <>
                    <div className="dev-spec-divider"></div>
                    <div className="dev-spec-item">
                      <Home size={20} />
                      <div>
                        <span className="dev-spec-label">Total Units</span>
                        <span className="dev-spec-value">{development.totalUnits}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Tabs */}
              <div className="dev-tabs" data-aos="fade-up" data-aos-delay="150">
                <button 
                  className={`dev-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FileText size={16} className="me-1" />
                  Overview
                </button>
                <button 
                  className={`dev-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  <Grid size={16} className="me-1" />
                  Features
                </button>
                <button 
                  className={`dev-tab-btn ${activeTab === 'location' ? 'active' : ''}`}
                  onClick={() => setActiveTab('location')}
                >
                  <Map size={16} className="me-1" />
                  Location
                </button>
                <button 
                  className={`dev-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  <Info size={16} className="me-1" />
                  Details
                </button>
              </div>

              {/* Tab Content */}
              <div className="dev-tab-content" data-aos="fade-up" data-aos-delay="200">
                
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="dev-overview">
                    <h3 className="dev-section-title">About This Development</h3>
                    <p className="dev-description">
                      {development.description || 'No description available for this development.'}
                    </p>
                    
                    {development.neighborhood && (
                      <div className="dev-neighborhood-info">
                        <h4 className="dev-sub-title">Neighborhood</h4>
                        <p className="dev-description">{development.neighborhood}</p>
                      </div>
                    )}

                    {development.nearby && (
                      <div className="dev-nearby-info">
                        <h4 className="dev-sub-title">Nearby Attractions</h4>
                        <p className="dev-description">{development.nearby}</p>
                      </div>
                    )}

                    <div className="dev-additional-details">
                      <h4 className="dev-sub-title">Key Highlights</h4>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="dev-detail-item">
                            <span className="dev-detail-label">Status</span>
                            <span className="dev-detail-value" style={{ color: getStatusColor(development.status) }}>
                              {getStatusLabel(development.status)}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="dev-detail-item">
                            <span className="dev-detail-label">Price Range</span>
                            <span className="dev-detail-value">{development.price || 'Contact for pricing'}</span>
                          </div>
                        </div>
                        {development.totalUnits && (
                          <div className="col-md-6">
                            <div className="dev-detail-item">
                              <span className="dev-detail-label">Total Units</span>
                              <span className="dev-detail-value">{development.totalUnits}</span>
                            </div>
                          </div>
                        )}
                        {development.completionDate && (
                          <div className="col-md-6">
                            <div className="dev-detail-item">
                              <span className="dev-detail-label">Expected Completion</span>
                              <span className="dev-detail-value">{formatDate(development.completionDate)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="dev-features">
                    <h3 className="dev-section-title">Amenities & Features</h3>
                    {development.features && development.features.length > 0 ? (
                      <>
                        <div className="dev-features-grid">
                          {(showAllFeatures ? development.features : development.features.slice(0, 12)).map((feature, index) => (
                            <div key={index} className="dev-feature-item">
                              <div className="dev-feature-icon-wrapper">
                                {getFeatureIcon(feature)}
                              </div>
                              <span className="dev-feature-name">{feature}</span>
                            </div>
                          ))}
                        </div>
                        {development.features.length > 12 && (
                          <button 
                            className="btn btn-outline-primary mt-3"
                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                          >
                            {showAllFeatures ? (
                              <>Show Less <ChevronUp size={16} className="ms-1" /></>
                            ) : (
                              <>Show All {development.features.length} Features <ChevronDown size={16} className="ms-1" /></>
                            )}
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="text-muted">No features listed for this development.</p>
                    )}
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === 'location' && (
                  <div className="dev-location-tab">
                    <h3 className="dev-section-title">Location</h3>
                    <div className="dev-location-map">
                      <iframe
                        title="Development Location"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(development.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="350"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div className="dev-location-details mt-3">
                      <div className="dev-detail-item">
                        <span className="dev-detail-label">Address</span>
                        <span className="dev-detail-value">{development.location}</span>
                      </div>
                      {development.neighborhood && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Neighborhood</span>
                          <span className="dev-detail-value">{development.neighborhood}</span>
                        </div>
                      )}
                      {development.nearby && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Nearby Attractions</span>
                          <span className="dev-detail-value">{development.nearby}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Details Tab */}
                {activeTab === 'details' && (
                  <div className="dev-details-tab">
                    <h3 className="dev-section-title">Detailed Information</h3>
                    <div className="dev-details-grid">
                      <div className="dev-detail-item">
                        <span className="dev-detail-label">Development Name</span>
                        <span className="dev-detail-value">{development.title}</span>
                      </div>
                      <div className="dev-detail-item">
                        <span className="dev-detail-label">Location</span>
                        <span className="dev-detail-value">{development.location}</span>
                      </div>
                      <div className="dev-detail-item">
                        <span className="dev-detail-label">Price Range</span>
                        <span className="dev-detail-value">{development.price}</span>
                      </div>
                      <div className="dev-detail-item">
                        <span className="dev-detail-label">Status</span>
                        <span className="dev-detail-value" style={{ color: getStatusColor(development.status) }}>
                          {getStatusLabel(development.status)}
                        </span>
                      </div>
                      <div className="dev-detail-item">
                        <span className="dev-detail-label">Bedrooms</span>
                        <span className="dev-detail-value">{development.beds}</span>
                      </div>
                      <div className="dev-detail-item">
                        <span className="dev-detail-label">Bathrooms</span>
                        <span className="dev-detail-value">{development.baths}</span>
                      </div>
                      <div className="dev-detail-item">
                        <span className="dev-detail-label">Square Feet</span>
                        <span className="dev-detail-value">{development.sqft}</span>
                      </div>
                      {development.type && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Property Type</span>
                          <span className="dev-detail-value">{development.type}</span>
                        </div>
                      )}
                      {development.totalUnits && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Total Units</span>
                          <span className="dev-detail-value">{development.totalUnits}</span>
                        </div>
                      )}
                      {development.floors && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Number of Floors</span>
                          <span className="dev-detail-value">{development.floors}</span>
                        </div>
                      )}
                      {development.parkingSpots && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Parking Spots</span>
                          <span className="dev-detail-value">{development.parkingSpots}</span>
                        </div>
                      )}
                      {development.yearBuilt && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Year Built</span>
                          <span className="dev-detail-value">{development.yearBuilt}</span>
                        </div>
                      )}
                      {development.petPolicy && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Pet Policy</span>
                          <span className="dev-detail-value">{development.petPolicy}</span>
                        </div>
                      )}
                      {development.occupancyDate && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Occupancy Date</span>
                          <span className="dev-detail-value">{formatDate(development.occupancyDate)}</span>
                        </div>
                      )}
                      {development.completionDate && (
                        <div className="dev-detail-item">
                          <span className="dev-detail-label">Expected Completion</span>
                          <span className="dev-detail-value">{formatDate(development.completionDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-lg-4">
              {/* Contact Card */}
              <div className="dev-sidebar-card" data-aos="fade-up" data-aos-delay="200">
                <h4 className="dev-sidebar-title">Interested in this Development?</h4>
                <p className="dev-sidebar-text">
                  Get more information about this luxury development
                </p>
                
                <button className="dev-contact-btn primary" onClick={() => setShowContactForm(true)}>
                  <Phone size={18} />
                  Call Now
                </button>
                <button className="dev-contact-btn secondary">
                  <Mail size={18} />
                  Email Agent
                </button>
                <button className="dev-contact-btn whatsapp">
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
              </div>

              {/* Quick Info Card */}
              <div className="dev-sidebar-card" data-aos="fade-up" data-aos-delay="250">
                <h4 className="dev-sidebar-title">Quick Info</h4>
                <div className="dev-sidebar-info">
                  <div className="dev-sidebar-info-item">
                    <span className="dev-sidebar-info-label">Status</span>
                    <span className="dev-sidebar-info-value" style={{ color: getStatusColor(development.status) }}>
                      {getStatusLabel(development.status)}
                    </span>
                  </div>
                  <div className="dev-sidebar-info-item">
                    <span className="dev-sidebar-info-label">Price</span>
                    <span className="dev-sidebar-info-value">{development.price || 'Contact for pricing'}</span>
                  </div>
                  <div className="dev-sidebar-info-item">
                    <span className="dev-sidebar-info-label">Type</span>
                    <span className="dev-sidebar-info-value">{development.type || 'Luxury Residence'}</span>
                  </div>
                  {development.totalUnits && (
                    <div className="dev-sidebar-info-item">
                      <span className="dev-sidebar-info-label">Units</span>
                      <span className="dev-sidebar-info-value">{development.totalUnits}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Share Card */}
              <div className="dev-sidebar-card" data-aos="fade-up" data-aos-delay="300">
                <h4 className="dev-sidebar-title">Share This Development</h4>
                <div className="dev-share-buttons">
                  <button className="dev-share-btn facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </button>
                  <button className="dev-share-btn twitter">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Twitter
                  </button>
                  <button className="dev-share-btn linkedin">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="dev-footer-cta">
        <div className="container">
          <div className="dev-footer-cta-content">
            <div>
              <h3>Ready to Make This Your Home?</h3>
              <p>Schedule a viewing or request more information about this development</p>
            </div>
            <div className="dev-footer-cta-buttons">
              <button className="btn btn-primary btn-lg">
                <CalendarDays size={18} className="me-2" />
                Schedule Viewing
              </button>
              <button className="btn btn-outline-light btn-lg">
                <Send size={18} className="me-2" />
                Request Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}