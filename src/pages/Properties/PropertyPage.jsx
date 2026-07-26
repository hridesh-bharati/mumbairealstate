// src\pages\Properties\PropertyPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Home, Bath, Square, MapPin, Layers, Calendar, Landmark, Info, ShieldCheck,
  ChevronLeft, ChevronRight, User, Sparkles, Building2, ShieldAlert,
  Compass, Gauge, HardHat, Trees, Eye, Activity, Map, X, Compass as LandmarkIcon,
  ClipboardList
} from 'lucide-react';

export default function PropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const mapSectionRef = useRef(null);

  const [selectedProperty, setSelectedProperty] = useState(location.state?.propertyData || null);
  const [loading, setLoading] = useState(!selectedProperty);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Overview');

  // Modal and Form States
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    wantFinancing: true
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);

    const fetchPropertyDirectly = async () => {
      if (!selectedProperty) {
        try {
          const docRef = doc(db, "properties", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setSelectedProperty({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.error("Document target missing from Firestore index logs.");
          }
        } catch (err) {
          console.error("Context parsing aborted:", err);
        } finally {
          loading && setLoading(false);
        }
      }
    };

    fetchPropertyDirectly();
    setActiveImageIndex(0);
  }, [id, selectedProperty]);

  // Set default message when property loads
  useEffect(() => {
    if (selectedProperty) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in ${selectedProperty.title || 'this property'} located at ${selectedProperty.address || ''}.`
      }));
    }
  }, [selectedProperty]);

  const scrollToMap = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const brokerPhone = validate(selectedProperty?.agent?.phone, "07267995307").replace(/\s+/g, '');

    const whatsappMessage = `*🔥 NEW PROPERTY INQUIRY *
----------------------------------
*🏠 Property:* ${validate(selectedProperty?.title)}
*💰 Price:* ${validate(selectedProperty?.price)}
*📍 Location:* ${validate(selectedProperty?.address)}

*👤 Client Details:*
* Name:* ${formData.name}
* Email:* ${formData.email}
* Phone:* ${formData.phone}

*💬 Message:* 
${formData.message}

*🏦 Financing Needed:* ${formData.wantFinancing ? '✅ Yes, please provide details' : '❌ No'}
----------------------------------
_Sent via CJ Group Real Estate CRM_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${brokerPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setShowModal(false);
  };

  const glassStyles = {
    mainWrapper: {
      backgroundColor: '#f8fafc',
      backgroundImage: `
        radial-gradient(at 5% 5%, rgba(99, 102, 241, 0.18) 0px, transparent 40%), 
        radial-gradient(at 95% 5%, rgba(236, 72, 153, 0.12) 0px, transparent 40%),
        radial-gradient(at 50% 50%, rgba(6, 182, 212, 0.08) 0px, transparent 60%),
        radial-gradient(at 80% 90%, rgba(34, 197, 94, 0.1) 0px, transparent 50%)
      `,
      minHeight: '100vh',
      paddingBottom: '4rem'
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.9)',
      boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.05), 0 8px 24px -10px rgba(15, 23, 42, 0.03)',
      borderRadius: '20px'
    },
    glassWidget: {
      background: 'rgba(248, 250, 252, 0.6)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(241, 245, 249, 0.9)',
      borderRadius: '16px'
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center my-5 text-dark">
        <div className="spinner-border spinner-border-sm me-2 text-danger" role="status"></div>
        <span className="small fw-bold text-secondary">Parsing asset ledger profiles...</span>
      </div>
    );
  }

  if (!selectedProperty) {
    return (
      <div className="container py-5 text-center my-5 px-3">
        <div className="p-4 p-md-5 rounded-4 d-inline-block shadow w-100" style={{ ...glassStyles.glassCard, maxWidth: '500px' }}>
          <ShieldAlert className="text-danger mb-3" size={48} />
          <h4 className="fw-bold text-dark m-0 fs-5">Property File Index Corrupted</h4>
          <p className="text-muted small mt-2 mb-4">The direct URL entry contains bad parameters or keys are missing from directory.</p>
          <button className="btn btn-danger btn-sm rounded-pill px-4 shadow-sm" onClick={() => navigate('/listings')}>Return to Directory</button>
        </div>
      </div>
    );
  }

  const validate = (val, fallback = "-") => (val !== undefined && val !== null && val !== "" ? val : fallback);

  const parseSpecs = (specsStr) => {
    if (!specsStr) return { beds: "-", baths: "-", sqft: "-", acres: "-" };
    const parts = specsStr.split('|').map(s => s.trim());
    return {
      beds: parts[0] || "-",
      baths: parts[1] || "-",
      sqft: parts[2] || "-",
      acres: parts[3] || null
    };
  };

  const propertySpecs = parseSpecs(selectedProperty.specs);

  const embeddedMapUrl = selectedProperty.address
    ? `https://maps.google.com/maps?q=${encodeURIComponent(selectedProperty.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : null;

  return (
    <div style={glassStyles.mainWrapper}>
      <div className="container-fluid px-2 px-sm-3 p-5">

        {/* HEADER HERO AREA */}
        <div className="p-3 mt-5 mt-md-5 d-flex justify-content-between align-items-center gap-3" style={glassStyles.glassCard}>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-danger text-white rounded-pill px-2.5 py-1 fw-bold small text-uppercase" style={{ letterSpacing: '0.5px', fontSize: '0.62rem' }}>
                CJ Property Details
              </span>
            </div>
            <h1 className="h4 h3-md fw-black text-dark tracking-tight m-0">{validate(selectedProperty.title)}</h1>
            <div className="d-flex align-items-center gap-1.5 mt-1 text-muted">
              <span className="text-primary d-inline-flex">
                <MapPin size={14} />
              </span>
              <span className="fw-semibold text-secondary small text-break">{validate(selectedProperty.address)}</span>
            </div>
          </div>

          <div className="text-end flex-shrink-0">
            <span className="small text-muted d-block text-uppercase fw-bold mb-0" style={{ fontSize: '0.58rem', letterSpacing: '0.5px' }}>Market Price Value</span>
            <span className="fw-black fs-4 fs-2-md d-block lh-sm" style={{ color: '#b91c1c' }}>{validate(selectedProperty.price)}</span>
          </div>
        </div>

        {/* NAVIGATION TABS BAR */}
        <div className="d-flex border-bottom border-light-subtle overflow-auto py-2 mb-3 mb-md-4 gap-1 no-scrollbar">
          {['Overview', 'Location', 'Property Info', 'Detailed Features', 'Nearby Landmarks'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'Location') scrollToMap();
              }}
              className={`btn border-0 rounded-0 px-2.5 py-1.5 fw-semibold text-nowrap transition-all ${activeTab === tab
                ? 'text-dark border-bottom border-2 border-dark fw-bold'
                : 'text-muted text-hover-dark'
                }`}
              style={{ fontSize: '0.82rem' }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="row g-3 g-md-4">

          {/* LEFT SIDE CONTENT */}
          <div className="col-lg-8">

            {/* CAROUSEL MAIN DISPLAY CONTAINER */}
            <div className="p-1.5 p-md-3 border shadow-sm mb-3" style={glassStyles.glassCard}>
              <div className="position-relative overflow-hidden rounded-4 style-responsive-hero-ratio" style={{ height: '300px', '--desktop-height': '490px' }}>
                <style>{`
                  @media (min-width: 768px) {
                    .style-responsive-hero-ratio { height: var(--desktop-height) !important; }
                  }
                `}</style>
                <div className="position-absolute top-0 start-0 z-3 m-2 m-md-3 d-flex flex-wrap gap-1.5">
                  <span className="text-white font-monospace small m-1 p-2 text-uppercase fw-bold rounded-3 shadow d-flex align-items-center gap-1.5" style={{ fontSize: '0.68rem', letterSpacing: '0.6px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
                    <Sparkles size={11} /> For Sale
                  </span>
                  {selectedProperty.view && (
                    <span className="text-white font-monospace small m-1 p-2 text-uppercase fw-bold rounded-3 shadow bg-dark bg-opacity-70 backdrop-blur-sm" style={{ fontSize: '0.68rem', letterSpacing: '0.6px' }}>
                      ✨ {selectedProperty.view} View
                    </span>
                  )}
                  {propertySpecs.acres && (
                    <span className="text-white font-monospace small m-1 p-2 text-uppercase fw-bold rounded-3 shadow bg-success" style={{ fontSize: '0.68rem', letterSpacing: '0.6px' }}>
                      🏡 {propertySpecs.acres.replace(/acres/i, '')} AC
                    </span>
                  )}
                </div>

                {selectedProperty.images && selectedProperty.images.length > 0 ? (
                  <img src={selectedProperty.images[activeImageIndex]} alt="property file showcase" className="w-100 h-100 object-cover d-block img-fluid" />
                ) : (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted bg-light">No Media Assets Assigned</div>
                )}

                {selectedProperty.images && selectedProperty.images.length > 1 && (
                  <>
                    <button className="position-absolute btn btn-white p-0 bg-white border rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: '38px', height: '38px', top: '50%', left: '12px', transform: 'translateY(-50%)', zIndex: 10 }} onClick={() => setActiveImageIndex(prev => prev === 0 ? selectedProperty.images.length - 1 : prev - 1)}>
                      <ChevronLeft size={18} />
                    </button>
                    <button className="position-absolute btn btn-white p-0 bg-white border rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: '38px', height: '38px', top: '50%', right: '12px', transform: 'translateY(-50%)', zIndex: 10 }} onClick={() => setActiveImageIndex(prev => prev === selectedProperty.images.length - 1 ? 0 : prev + 1)}>
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* STRIP SELECTION SLIDER WITH MAP BUTTON */}
            {selectedProperty.images && selectedProperty.images.length > 0 && (
              <div className="d-flex align-items-center gap-2 p-2 rounded-4 shadow-sm border mb-3 mb-md-4" style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)' }}>
                <div className="d-flex gap-2 overflow-auto flex-grow-1 custom-scrollbar">
                  {selectedProperty.images.map((imgUrl, idx) => (
                    <div key={idx} className="flex-shrink-0 rounded-3 overflow-hidden" style={{ width: '70px', height: '48px', cursor: 'pointer', border: idx === activeImageIndex ? '2.5px solid #8b5cf6' : '2px solid transparent', opacity: idx === activeImageIndex ? 1 : 0.4, transition: 'all 0.2s' }} onClick={() => setActiveImageIndex(idx)}>
                      <img src={imgUrl} alt="strip navigation frame" className="w-100 h-100 object-cover" />
                    </div>
                  ))}
                </div>

                {embeddedMapUrl && (
                  <button onClick={scrollToMap} className="btn flex-shrink-0 d-flex flex-column align-items-center justify-content-center gap-0.5 rounded-3 text-white border border-secondary border-opacity-50 text-uppercase fw-bold font-monospace shadow" style={{ width: '70px', height: '48px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', fontSize: '0.58rem', letterSpacing: '0.5px' }}>
                    <Map size={14} className="text-info" />
                    <span>Map View</span>
                  </button>
                )}
              </div>
            )}

            {/* STRUCTURAL CORE SPEC PILLARS */}
            <div className="p-3 p-md-5 mb-3 mb-md-4 shadow-sm" style={glassStyles.glassCard}>
              <span className="small text-muted d-block text-uppercase fw-bold mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Primary Dimensions Blueprint</span>
              <div className="row text-center g-2 g-md-4">
                <div className="col-4 border-end border-light-subtle">
                  <div className="bg-success bg-opacity-10 p-1.5 p-md-2 rounded-3 mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                    <Home size={18} className="text-success" />
                  </div>
                  <span className="small text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.58rem' }}>Bedrooms</span>
                  <span className="fw-black fs-6 fs-4-md text-dark d-block">{propertySpecs.beds.replace(/beds/i, '')} Rooms</span>
                </div>
                <div className="col-4 border-end border-light-subtle">
                  <div className="bg-info bg-opacity-10 p-1.5 p-md-2 rounded-3 mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                    <Bath size={18} className="text-info" />
                  </div>
                  <span className="small text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.58rem' }}>Bathrooms</span>
                  <span className="fw-black fs-6 fs-4-md text-dark d-block">{propertySpecs.baths.replace(/baths/i, '')} Units</span>
                </div>
                <div className="col-4">
                  <div className="bg-danger bg-opacity-10 p-1.5 p-md-2 rounded-3 mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                    <Square size={18} className="text-danger" />
                  </div>
                  <span className="small text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.58rem' }}>Gross Area</span>
                  <span className="fw-black fs-6 fs-4-md text-dark d-block text-truncate">{propertySpecs.sqft.replace(/sqft/i, '')} <small style={{ fontSize: '0.65rem' }}>Sq.Ft</small></span>
                </div>
              </div>
            </div>

            {/* NEIGHBORHOOD REGIONAL MAP CARD */}
            {embeddedMapUrl && (
              <div ref={mapSectionRef} className="p-3 p-md-5 mb-3 mb-md-4 shadow-sm transition-all" style={glassStyles.glassCard}>
                <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
                  <span className="p-1.5 rounded-3 bg-info bg-opacity-10 d-inline-flex text-info" style={{ color: '#06b6d4' }}><MapPin size={16} /></span> Neighborhood Map Target Coordinates
                </h4>
                <div className="border rounded-4 overflow-hidden shadow-sm bg-light">
                  <iframe title="neighborhood-realestate-map" width="100%" height="320" style={{ border: 0 }} loading="lazy" allowFullScreen src={embeddedMapUrl}></iframe>
                </div>
              </div>
            )}

            {/* DESCRIPTION BOX */}
            <div className="p-3 p-md-5 mb-3 mb-md-4 shadow-sm" style={glassStyles.glassCard}>
              <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem', color: '#1f2937' }}>
                <span className="p-1.5 rounded-3 bg-purple bg-opacity-10 d-inline-flex text-purple" style={{ color: '#8b5cf6' }}><Info size={16} /></span> Architecture Structural Overview
              </h4>
              <p className="text-secondary lh-lg small text-justify m-0" style={{ fontSize: '0.9rem' }}>
                {validate(selectedProperty.description)}
              </p>
            </div>

            {/* NEW DYNAMIC DETAILED SPECIFICATIONS GRID BLOCK */}
            {selectedProperty.additionalSpecs && selectedProperty.additionalSpecs.length > 0 && (
              <div className="p-3 p-md-5 mb-3 mb-md-4" style={glassStyles.glassCard}>
                <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
                  <span className="p-1.5 rounded-3 bg-danger bg-opacity-10 text-danger d-inline-flex" style={{ color: '#f43f5e' }}><ClipboardList size={16} /></span>
                  Detailed Property Attributes & Metrics Matrix
                </h4>
                
                <ul className="list-unstyled ps-0 mb-0">
                  {selectedProperty.additionalSpecs.map((spec, index) => (
                    <li key={index} className="d-flex align-items-start mb-2" style={{ fontSize: '0.9rem', color: '#1a1a1a' }}>
                      {/* Bullet dot */}
                      <span className="me-2 text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>•</span>
                      
                      <div>
                        {/* Key Name */}
                        <span className="text-muted text-capitalize">{spec.key}: </span>
                        {/* Value */}
                        <span className="fw-semibold text-dark">{spec.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* EXTENSIVE ZONING & ASSET PARAMETERS MATRIX */}
            <div className="p-3 p-md-5 mb-3 mb-md-4 shadow-sm" style={glassStyles.glassCard}>
              <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
                <span className="p-1.5 rounded-3 bg-pink bg-opacity-10 text-pink d-inline-flex" style={{ color: '#ec4899' }}><Layers size={16} /></span> Structure Base Specifications
              </h4>

              <div className="row g-2 g-md-3">
                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><Eye size={14} className="me-2 text-success" /> Panoramic View Type</span>
                    <span className="badge bg-success bg-opacity-10 text-success rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{validate(selectedProperty.view, "Ocean")}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><Gauge size={14} className="me-2 text-primary" /> Living Gross Area</span>
                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{propertySpecs.sqft}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><Compass size={14} className="me-2 text-warning" /> Property Attached (YN)</span>
                    <span className="badge bg-warning bg-opacity-10 text-warning-emphasis rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{validate(selectedProperty.attachedYn, "false")}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><User size={14} className="me-2 text-danger" /> Senior Citizens Community</span>
                    <span className="badge bg-danger bg-opacity-10 text-danger rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{validate(selectedProperty.seniorCommunity, "No")}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><MapPin size={14} className="me-2 text-info" /> Sub-Area Geolocation Node</span>
                    <span className="badge bg-info bg-opacity-10 text-info rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{validate(selectedProperty.areaNode, "-")}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><Building2 size={14} className="me-2 text-secondary" /> Total Structure Stories</span>
                    <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{validate(selectedProperty.stories, "1")}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><Calendar size={14} className="me-2 text-dark" /> Year Built Code</span>
                    <span className="badge bg-dark bg-opacity-10 text-dark rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{validate(selectedProperty.yearBuilt, "-")}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><HardHat size={14} className="me-2 text-primary" /> Building Size Indicator</span>
                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{validate(selectedProperty.buildingSize, "-")}</span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="p-3 shadow-sm border h-100 d-flex align-items-center justify-content-between" style={glassStyles.glassWidget}>
                    <span className="text-muted small fw-bold d-flex align-items-center" style={{ fontSize: '0.82rem' }}><Trees size={14} className="me-2 text-warning" /> Zoning Acres Lot Area</span>
                    <span className="badge bg-warning bg-opacity-10 text-warning-emphasis rounded-2 px-3 py-2 fw-bold" style={{ fontSize: '0.72rem' }}>{validate(propertySpecs.acres, "-")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EXPANDED PROXIMITY & LOCAL LANDMARKS SECTION */}
            {selectedProperty.landmarks && selectedProperty.landmarks.length > 0 && (
              <div className="p-3 p-md-5 mb-3 mb-md-4 shadow-sm" style={glassStyles.glassCard}>
                <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
                  <span className="p-1.5 rounded-3 bg-success bg-opacity-10 text-success d-inline-flex">
                    <LandmarkIcon size={16} />
                  </span>
                  Premium Location Proximity & Subidha Hub
                </h4>
                <div className="d-flex flex-column gap-2.5">
                  {selectedProperty.landmarks.map((landmark, index) => (
                    <div key={index} className="p-3 border border-light-subtle rounded-4 bg-white bg-opacity-60 shadow-sm d-flex flex-wrap align-items-center justify-content-between gap-2">
                      <div className="d-flex align-items-center gap-2.5">
                        <div className="bg-success bg-opacity-10 text-success p-2.5 rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          <Landmark size={18} />
                        </div>
                        <div>
                          <h5 className="fw-bold text-dark m-0" style={{ fontSize: '0.85rem' }}>{landmark.name}</h5>
                          <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Nearby Spot / Public Utility Area</small>
                        </div>
                      </div>
                      {landmark.url && (
                        <a href={landmark.url} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm px-3 py-1.5 rounded-3 fw-bold text-white tracking-wide shadow border-0 w-100 w-sm-auto text-center" style={{ fontSize: '0.75rem' }}>
                          View Directions →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT CONTAINER: STICKY METRIC INTERFACES */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: '24px' }}>

              {/* ASSIGNED BROKER REPRESENTATIVE INTERFACE CARD */}
              <div className="p-3 p-md-4 mb-3 mb-md-4 shadow-sm" style={glassStyles.glassCard}>
                <h5 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: '#4b5563', letterSpacing: '0.6px' }}>
                  <span className="p-1 rounded-3 bg-secondary bg-opacity-10 text-secondary d-inline-flex"><User size={12} /></span> REPRESENTATIVE ASSIGNED AGENT
                </h5>
                <div className="p-2.5 shadow-sm border bg-white bg-opacity-50" style={{ borderRadius: '14px' }}>
                  <div className="d-flex align-items-center gap-2 p-2">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white overflow-hidden flex-shrink-0 border border-2 border-white shadow" style={{ width: '48px', height: '48px', backgroundColor: '#ec4899' }}>
                      {selectedProperty.agent?.img ? <img src={selectedProperty.agent.img} alt="agent asset avatar" className="w-100 h-100 object-cover" /> : <User size={20} />}
                    </div>
                    <div className="overflow-hidden">
                      <h6 className="fw-bold m-0 text-dark small text-truncate">{validate(selectedProperty.agent?.name, " ")}</h6>
                      <p className="text-muted m-0 text-truncate" style={{ fontSize: '0.68rem' }}>Certified Associate Broker | CJ GROUP CRM</p>
                      <small className="d-block text-primary text-opacity-75 fw-bold mt-0.5" style={{ fontSize: '0.7rem' }}>Contact Number: {validate(selectedProperty.agent?.phone, "07267995307")}</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* LISTING SYNC INTERFACE STATUS */}
              <div className="p-3 p-md-4 shadow-sm mb-3" style={glassStyles.glassCard}>
                <div className="d-flex align-items-center gap-2 mb-3 text-muted" style={{ fontSize: '0.7rem' }}>
                  <Activity size={12} className="text-primary" />
                  <span className="fw-bold tracking-wider text-uppercase text-primary-emphasis">Listing Status Realtime Sync</span>
                </div>

                <div className="my-1">
                  <div className="d-flex justify-content-between align-items-center border-bottom border-light-subtle py-3 small">
                    <span className="text-muted fw-semibold d-flex align-items-center" style={{ fontSize: '0.82rem' }}>
                      <ShieldCheck size={14} className="text-success me-2" />Availability Rules
                    </span>
                    <span className={`badge rounded-2 px-3 py-2 fw-bold shadow-sm ${validate(selectedProperty.listingStatus, "Active Listing") === "Active Listing"
                      ? "bg-success bg-opacity-10 text-success"
                      : "bg-warning bg-opacity-10 text-warning-emphasis"
                      }`} style={{ fontSize: '0.72rem', letterSpacing: '0.3px' }}>
                      {validate(selectedProperty.listingStatus, "Active Listing")}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center border-bottom border-light-subtle py-3 small">
                    <span className="text-muted fw-semibold d-flex align-items-center" style={{ fontSize: '0.82rem' }}>
                      <Building2 size={14} className="text-primary me-2" />Asset Class Category
                    </span>
                    <span className="badge bg-light text-dark border rounded-2 px-3 py-2 fw-bold text-end ps-2 shadow-sm" style={{ fontSize: '0.72rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {validate(selectedProperty.assetClass, "Single Family Residence")}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center border-bottom border-light-subtle py-3 small">
                    <span className="text-muted fw-semibold d-flex align-items-center" style={{ fontSize: '0.82rem' }}>
                      <Calendar size={14} className="text-warning me-2" />Zoning Year Matrix
                    </span>
                    <span className="badge bg-light text-dark border rounded-2 px-3 py-2 fw-bold shadow-sm" style={{ fontSize: '0.72rem' }}>
                      {validate(selectedProperty.yearBuilt, "1980")}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center py-3 small">
                    <span className="text-muted fw-semibold d-flex align-items-center" style={{ fontSize: '0.82rem' }}>
                      <Square size={14} className="text-danger me-2" />Lot Acreage Registry
                    </span>
                    <span className="badge bg-light text-dark border rounded-2 px-3 py-2 fw-bold shadow-sm" style={{ fontSize: '0.72rem' }}>
                      {validate(propertySpecs.acres, "-")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-1 gap-2 d-flex flex-column">
                  <button className="btn w-100 py-3 fw-bold rounded-3 shadow text-uppercase text-white tracking-wider border-0" style={{ fontSize: '0.78rem', background: '#d91b1b', letterSpacing: '0.5px' }}>
                    Schedule Private Tour
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-outline-dark w-100 py-3 fw-bold rounded-3 text-uppercase tracking-wider border-1 bg-primary bg-opacity-60"
                    style={{ fontSize: '0.78rem', letterSpacing: '0.5px' }}
                  >
                    Contact Broker Office
                  </button>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-1.5 text-center mt-3 pt-1 text-muted text-decoration-none small" style={{ fontSize: '0.68rem', cursor: 'pointer' }}>
                  <Landmark size={12} className="text-info flex-shrink-0" />
                  <span className="text-secondary fw-medium">Get preapproved financing coordinates with CJ Group Developers Matrix</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* DYNAMIC PREMIUM CONTACT BROKER MODAL */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '440px' }}>
            <div className="modal-content border-0 shadow-lg px-2" style={{ borderRadius: '24px', background: '#ffffff' }}>

              {/* Modal Header */}
              <div className="modal-header border-0 pt-4 pb-2 d-flex align-items-center justify-content-between position-relative">
                <h5 className="modal-title fw-bold text-dark fs-5 ps-2">How can we get back to you?</h5>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn p-1 border-0 rounded-circle d-flex align-items-center justify-content-center position-absolute"
                  style={{ right: '16px', top: '24px', backgroundColor: '#f1f5f9', width: '28px', height: '28px', color: '#64748b' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body Form */}
              <div className="modal-body pt-1 pb-4">
                <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3">

                  {/* Name Input */}
                  <div className="px-1">
                    <label className="form-label small fw-semibold text-dark mb-1.5">Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="name"
                      className="form-control py-2.5 px-3 rounded-3"
                      placeholder="Name"
                      style={{ border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="px-1">
                    <label className="form-label small fw-semibold text-dark mb-1.5">Email <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      name="email"
                      className="form-control py-2.5 px-3 rounded-3"
                      placeholder="Email"
                      style={{ border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="px-1">
                    <label className="form-label small fw-semibold text-dark mb-1.5">Phone <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control py-2.5 px-3 rounded-3"
                      placeholder="Phone"
                      style={{ border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Message Input */}
                  <div className="px-1">
                    <label className="form-label small fw-semibold text-dark mb-1.5">Message</label>
                    <textarea
                      name="message"
                      rows="3"
                      className="form-control py-2.5 px-3 rounded-3 text-secondary"
                      style={{ border: '1.5px solid #cbd5e1', fontSize: '0.9rem', resize: 'none' }}
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="px-1 mt-2">
                    <button
                      type="submit"
                      className="btn w-100 py-2.5 fw-bold text-white rounded-pill tracking-wide border-0 shadow"
                      style={{ backgroundColor: '#000000', fontSize: '0.95rem' }}
                    >
                      Submit
                    </button>
                  </div>

                  {/* Financing Checkbox */}
                  <div className="px-1 d-flex align-items-start gap-2.5 mt-1">
                    <input
                      type="checkbox"
                      name="wantFinancing"
                      id="wantFinancing"
                      className="form-check-input flex-shrink-0 border-2 border-dark"
                      style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#000' }}
                      checked={formData.wantFinancing}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="wantFinancing" className="form-check-label fw-bold text-dark small" style={{ cursor: 'pointer', fontSize: '0.82rem', marginTop: '1px' }}>
                      I want financing information
                    </label>
                  </div>

                  {/* Disclaimer Text */}
                  <div className="px-1 text-muted mt-2" style={{ fontSize: '0.65rem', lineHeight: '1.4' }}>
                    By submitting this form you agree that Compass, Inc., its subsidiaries and affiliates, including affiliated real estate agents, or associated third parties may contact you, including with calls or texts by automated means. You also agree to our <span className="text-decoration-underline text-dark fw-medium" style={{ cursor: 'pointer' }}>Terms of Service</span> and <span className="text-decoration-underline text-dark fw-medium" style={{ cursor: 'pointer' }}>Privacy Policy</span>. Message/data rates may apply. Message frequency varies. Text 'Help' for Help. Consent is not a condition to access real estate services.
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}