// src/pages/DevelopmentDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  ArrowLeft, MapPin, Bed, Bath, Square, Sparkles,
  Building2, Calendar, ChevronLeft, ChevronRight,
  Home, Phone, Mail, MessageCircle, Share2, Heart, Printer,
  Gem, Dumbbell, ParkingCircle, Wifi, TreePine, Waves,
  Shield, Snowflake, Flame, Lock, Users, Award, UtensilsCrossed,
  Coffee, CalendarDays, CheckCircle2
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

  // Contact variables
  const adminName = import.meta.env.VITE_ADMIN_NAME || "MR. Jugal Modi";
  const adminPhone = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000";
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "info@namoproperties.com";

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

  const goBack = () => navigate('/development/current');

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

  const getStatusBadgeClass = (status) => {
    const classes = {
      'pre-construction': 'bg-warning text-dark fw-bold',
      'under construction': 'bg-primary text-white fw-bold',
      'completed': 'bg-success text-white fw-bold'
    };
    return classes[status] || 'bg-gradient-primary text-white fw-bold';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Coming soon';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getFeatureIcon = (feature) => {
    const iconMap = {
      'Pool': <Gem size={18} className="text-info" />, 
      'Gym': <Dumbbell size={18} className="text-danger" />, 
      'Parking': <ParkingCircle size={18} className="text-warning" />,
      'WiFi': <Wifi size={18} className="text-primary" />, 
      'Garden': <TreePine size={18} className="text-success" />, 
      'Ocean View': <Waves size={18} className="text-info" />,
      'Security': <Shield size={18} className="text-danger" />, 
      'AC': <Snowflake size={18} className="text-info" />, 
      'Heating': <Flame size={18} className="text-warning" />,
      'Smart Home': <Lock size={18} className="text-primary" />, 
      'Club House': <Users size={18} className="text-purple" />, 
      'Spa': <Award size={18} className="text-warning" />,
      'Restaurant': <UtensilsCrossed size={18} className="text-danger" />, 
      'Cafe': <Coffee size={18} className="text-secondary" />, 
      'Kids Play': <Home size={18} className="text-success" />
    };
    return iconMap[feature] || <Sparkles size={18} className="text-warning" />;
  };

  if (loading) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="spinner-border text-primary style-spinner" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        <p className="mt-3 text-muted fw-semibold">Loading details...</p>
      </div>
    );
  }

  if (!development) {
    return (
      <div className="container py-5 text-center my-5">
        <Building2 size={64} className="text-muted mb-3" />
        <h3 className="fw-bold">Development Not Found</h3>
        <button className="btn btn-primary rounded-pill px-4 mt-3" onClick={goBack}>
          <ArrowLeft size={18} className="me-2" /> Back
        </button>
      </div>
    );
  }

  const images = development.images || [development.img || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'];

  return (
    <div className="bg-white min-vh-100 pt-4">
      {/* Top Action Header */}
      <div className="bg-white border-bottom sticky-top py-2 shadow-sm" style={{ zIndex: 1020 }}>
        <div className="container d-flex justify-content-between align-items-center">
          <button className="btn btn-light rounded-pill border btn-sm d-flex align-items-center gap-2 fw-semibold px-3" onClick={goBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="d-flex gap-2">
            <button className="btn btn-light rounded-circle p-2 border shadow-sm"><Heart size={16} className="text-danger" /></button>
            <button className="btn btn-light rounded-circle p-2 border shadow-sm"><Share2 size={16} className="text-primary" /></button>
            <button className="btn btn-light rounded-circle p-2 border shadow-sm"><Printer size={16} className="text-secondary" /></button>
          </div>
        </div>
      </div>

      {/* Hero Gallery Section */}
      <div className="container my-4">
        <div className="hero-image-frame position-relative bg-dark" style={{ maxHeight: '520px' }}>
          <img src={images[activeImageIndex]} alt={development.title} className="w-100 object-fit-cover" style={{ height: '480px' }} />

          <span className={`position-absolute top-0 start-0 m-3 badge rounded-pill px-3 py-2 text-uppercase shadow-sm ${getStatusBadgeClass(development.status)}`}>
            {development.status || 'Listing'}
          </span>

          <div className="position-absolute bottom-0 end-0 m-3 bg-dark bg-opacity-75 text-white px-4 py-2 rounded-4 fs-4 fw-bold backdrop-blur border border-light border-opacity-25 shadow">
            {development.price || 'Price on Request'}
          </div>

          {images.length > 1 && (
            <>
              <button className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-y ms-3 shadow-lg p-2 d-flex align-items-center justify-content-center" onClick={prevImage}>
                <ChevronLeft size={22} />
              </button>
              <button className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-y me-3 shadow-lg p-2 d-flex align-items-center justify-content-center" onClick={nextImage}>
                <ChevronRight size={22} />
              </button>
              <span className="position-absolute bottom-0 start-50 translate-middle-x mb-3 bg-dark bg-opacity-60 text-white px-3 py-1 rounded-pill small backdrop-blur">
                {activeImageIndex + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="d-flex gap-2 mt-3 overflow-x-auto py-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                className={`rounded-3 cursor-pointer object-fit-cover gallery-thumbnail border ${index === activeImageIndex ? 'active-thumb' : ''}`}
                style={{ width: '90px', height: '60px' }}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container pb-5">
        <div className="row g-4">
          {/* Main Details Column */}
          <div className="col-lg-8">
            <div className="mb-4" data-aos="fade-up">
              <h1 className="fw-bold mb-2 text-dark display-6">{development.title}</h1>
              <p className="text-secondary d-flex align-items-center gap-1 mb-3 fs-6">
                <MapPin size={20} className="text-danger" /> {development.location}
              </p>
              <div className="d-flex flex-wrap gap-3 text-muted small border-top border-bottom py-2">
                <span className="d-flex align-items-center gap-1"><Calendar size={15} className="text-primary" /> Listed: {formatDate(development.createdAt)}</span>
                {development.type && <span className="d-flex align-items-center gap-1"><Building2 size={15} className="text-primary" /> {development.type}</span>}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="row g-3 mb-4" data-aos="fade-up">
              <div className="col-4">
                <div className="spec-box p-3 text-center border shadow-sm">
                  <div className="spec-icon-wrapper bg-primary bg-opacity-10 text-primary">
                    <Bed size={24} />
                  </div>
                  <div className="small text-muted fw-semibold">Bedrooms</div>
                  <div className="fs-5 fw-bold text-dark">{development.beds || '-'}</div>
                </div>
              </div>
              <div className="col-4">
                <div className="spec-box p-3 text-center border shadow-sm">
                  <div className="spec-icon-wrapper bg-info bg-opacity-10 text-info">
                    <Bath size={24} />
                  </div>
                  <div className="small text-muted fw-semibold">Bathrooms</div>
                  <div className="fs-5 fw-bold text-dark">{development.baths || '-'}</div>
                </div>
              </div>
              <div className="col-4">
                <div className="spec-box p-3 text-center border shadow-sm">
                  <div className="spec-icon-wrapper bg-warning bg-opacity-10 text-warning">
                    <Square size={24} />
                  </div>
                  <div className="small text-muted fw-semibold">Sq Ft</div>
                  <div className="fs-5 fw-bold text-dark">{development.sqft || '-'}</div>
                </div>
              </div>
            </div>

            {/* Custom Tabbed Navigation */}
            <ul className="nav nav-pills nav-fill custom-nav-pills mb-4">
              {['overview', 'features', 'location', 'details'].map((tab) => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link text-capitalize py-2 ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            {/* Active Tab Panel */}
            <div className="card modern-card p-4" data-aos="fade-up">
              {activeTab === 'overview' && (
                <div>
                  <h5 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                    <Sparkles className="text-warning" size={20} /> About This Development
                  </h5>
                  <p className="text-secondary lh-lg mb-0">{development.description || 'No description provided.'}</p>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h5 className="fw-bold mb-3 text-dark">Features & Amenities</h5>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {(showAllFeatures ? development.features : development.features?.slice(0, 9))?.map((feat, idx) => (
                      <div className="col" key={idx}>
                        <div className="d-flex align-items-center gap-2 p-3 bg-light rounded-3 feature-chip">
                          <span>{getFeatureIcon(feat)}</span>
                          <span className="small fw-semibold text-dark">{feat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {development.features?.length > 9 && (
                    <button className="btn btn-link text-primary fw-bold btn-sm mt-3 p-0 text-decoration-none" onClick={() => setShowAllFeatures(!showAllFeatures)}>
                      {showAllFeatures ? 'Show Less' : `Show All (${development.features.length})`}
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'location' && (
                <div>
                  <h5 className="fw-bold mb-3 text-dark">Location Map</h5>
                  <div className="rounded-4 overflow-hidden border shadow-sm">
                    <iframe
                      title="map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(development.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      width="100%" height="320" style={{ border: 0 }} allowFullScreen loading="lazy"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div>
                  <h5 className="fw-bold mb-3 text-dark">Property Specifications</h5>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                        <span className="text-muted small">Property Type</span>
                        <span className="fw-bold text-dark">{development.type || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                        <span className="text-muted small">Construction Status</span>
                        <span className="fw-bold text-dark">{development.status || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                        <span className="text-muted small">Total Units</span>
                        <span className="fw-bold text-dark">{development.totalUnits || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Contact Card */}
          <div className="col-lg-4">
            <div className="card modern-card p-4 sticky-top" style={{ top: '90px' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="p-2 bg-primary bg-opacity-10 text-primary rounded-circle">
                  <Phone size={20} />
                </span>
                <h5 className="fw-bold mb-0">Interested?</h5>
              </div>
              <p className="text-muted small mb-4">Reach out directly to **{adminName}** for details, pricing, or inquiries.</p>

              <div className="d-grid gap-2">
                {/* Call Button */}
                <a href={`tel:${adminPhone}`} className="btn btn-gradient-call rounded-3 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm">
                  <Phone size={18} /> Call {adminPhone}
                </a>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${adminPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${adminName}, I am interested in: ${development.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp rounded-3 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                >
                  <MessageCircle size={18} /> WhatsApp Message
                </a>

                {/* Email Button */}
                <a
                  href={`mailto:${adminEmail}?subject=${encodeURIComponent(`Inquiry about ${development.title}`)}`}
                  className="btn btn-outline-secondary rounded-3 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  <Mail size={18} /> Send Email
                </a>
              </div>

              <div className="border-top mt-4 pt-3">
                <div className="d-flex justify-content-between align-items-center small text-muted mb-2">
                  <span>Contact Person</span>
                  <span className="fw-bold text-dark">{adminName}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center small text-muted">
                  <span>Email</span>
                  <span className="fw-semibold text-primary text-truncate ms-2">{adminEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner CTA */}
      <div className="bg-gradient-dark text-white py-5 mt-4">
        <div className="container text-center text-md-start d-md-flex align-items-center justify-content-between">
          <div className="mb-3 mb-md-0">
            <h3 className="fw-bold mb-1">Ready to Schedule a Visit?</h3>
            <p className="text-light opacity-75 mb-0">Connect with {adminName} to book a tour today.</p>
          </div>
          <div>
            <a href={`tel:${adminPhone}`} className="btn btn-light rounded-pill px-4 py-2.5 fw-bold text-dark shadow-lg d-inline-flex align-items-center gap-2">
              <CalendarDays size={18} className="text-primary" /> Schedule Tour
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}