import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Home, Bath, Square, MapPin, Layers, Calendar, Landmark, Info, ShieldCheck,
  ChevronLeft, ChevronRight, User, Sparkles, Building2, ShieldAlert,
  Compass, Gauge, HardHat, Trees, Eye, Activity, Map, Compass as LandmarkIcon
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
          setLoading(false);
        }
      }
    };

    fetchPropertyDirectly();
    setActiveImageIndex(0);
  }, [id, selectedProperty]);

  const scrollToMap = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
      paddingBottom: '5rem'
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.9)',
      boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.05), 0 8px 24px -10px rgba(15, 23, 42, 0.03)',
      borderRadius: '24px'
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
      <div className="container py-5 text-center my-5">
        <div className="p-5 rounded-4 d-inline-block shadow" style={glassStyles.glassCard}>
          <ShieldAlert className="text-danger mb-3" size={48} />
          <h4 className="fw-bold text-dark m-0">Property File Index Corrupted</h4>
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
      <div className="container-fluid px-4 py-4">

        {/* HEADER HERO AREA */}
        <div className="p-4 mt-5 d-flex flex-wrap justify-content-between align-items-center gap-3" style={glassStyles.glassCard}>
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-1 fw-bold small text-uppercase" style={{ letterSpacing: '0.5px' }}>
                MLS Verification Active
              </span>
            </div>
            <h1 className="h2 fw-black text-dark tracking-tight m-0">{validate(selectedProperty.title)}</h1>
            <div className="d-flex align-items-center gap-2 mt-2 text-muted">
              <span className="bg-primary bg-opacity-10 p-1.5 rounded-circle d-inline-flex text-primary">
                <MapPin size={15} />
              </span>
              <span className="fw-semibold text-secondary small">{validate(selectedProperty.address)}</span>
            </div>
          </div>

          <div className="text-md-end">
            <div className="p-3 border rounded-4 bg-white bg-opacity-70 border-white px-4 shadow-sm">
              <span className="small text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: '0.62rem', letterSpacing: '0.5px' }}>Market Price Value</span>
              <span className="fw-black fs-3 text-dark" style={{ color: '#b91c1c' }}>{validate(selectedProperty.price)}</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS BAR */}
        <div className="d-flex border-bottom border-light-subtle overflow-auto py-2 mb-4 gap-1 no-scrollbar">
          {['Overview', 'Location', 'Property Info', 'Nearby Landmarks'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'Location') scrollToMap();
              }}
              className={`btn border-0 rounded-0 px-3 py-2 fw-semibold text-nowrap transition-all ${activeTab === tab
                ? 'text-dark border-bottom border-2 border-dark fw-bold'
                : 'text-muted text-hover-dark'
                }`}
              style={{ fontSize: '0.85rem' }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="row g-4">

          {/* LEFT SIDE CONTENT */}
          <div className="col-lg-8">

            {/* CAROUSEL MAIN DISPLAY CONTAINER */}
            <div className="p-2 border shadow-sm mb-3" style={glassStyles.glassCard}>
              <div className="position-relative overflow-hidden rounded-4" style={{ height: '490px' }}>

                <div className="position-absolute top-0 start-0 z-3 m-3 d-flex flex-wrap gap-2">
                  <span className="text-white font-monospace small px-3 py-2 text-uppercase fw-bold rounded-3 shadow d-flex align-items-center gap-1.5" style={{ fontSize: '0.72rem', letterSpacing: '0.6px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
                    <Sparkles size={13} /> CJ Exclusives
                  </span>
                  {selectedProperty.view && (
                    <span className="text-white font-monospace small px-3 py-2 text-uppercase fw-bold rounded-3 shadow bg-dark bg-opacity-70 backdrop-blur-sm" style={{ fontSize: '0.72rem', letterSpacing: '0.6px' }}>
                      ✨ {selectedProperty.view} View
                    </span>
                  )}
                  {propertySpecs.acres && (
                    <span className="text-white font-monospace small px-3 py-2 text-uppercase fw-bold rounded-3 shadow bg-success" style={{ fontSize: '0.72rem', letterSpacing: '0.6px' }}>
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
                    <button className="position-absolute btn btn-white p-0 bg-white border rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: '42px', height: '42px', top: '50%', left: '20px', transform: 'translateY(-50%)', zIndex: 10 }} onClick={() => setActiveImageIndex(prev => prev === 0 ? selectedProperty.images.length - 1 : prev - 1)}>
                      <ChevronLeft size={22} />
                    </button>
                    <button className="position-absolute btn btn-white p-0 bg-white border rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: '42px', height: '42px', top: '50%', right: '20px', transform: 'translateY(-50%)', zIndex: 10 }} onClick={() => setActiveImageIndex(prev => prev === selectedProperty.images.length - 1 ? 0 : prev + 1)}>
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* STRIP SELECTION SLIDER WITH MAP BUTTON AT END */}
            {selectedProperty.images && selectedProperty.images.length > 0 && (
              <div className="d-flex align-items-center gap-2 p-2 rounded-4 shadow-sm border mb-4" style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)' }}>
                <div className="d-flex gap-2 overflow-auto flex-grow-1 custom-scrollbar">
                  {selectedProperty.images.map((imgUrl, idx) => (
                    <div key={idx} className="flex-shrink-0 rounded-3 overflow-hidden" style={{ width: '90px', height: '58px', cursor: 'pointer', border: idx === activeImageIndex ? '2.5px solid #8b5cf6' : '2px solid transparent', opacity: idx === activeImageIndex ? 1 : 0.4, transition: 'all 0.2s' }} onClick={() => setActiveImageIndex(idx)}>
                      <img src={imgUrl} alt="strip navigation frame" className="w-100 h-100 object-cover" />
                    </div>
                  ))}
                </div>

                {embeddedMapUrl && (
                  <button onClick={scrollToMap} className="btn flex-shrink-0 d-flex flex-column align-items-center justify-content-center gap-1 rounded-3 text-white border border-secondary border-opacity-50 text-uppercase fw-bold font-monospace shadow" style={{ width: '80px', height: '58px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', fontSize: '0.62rem', letterSpacing: '0.5px' }}>
                    <Map size={16} className="text-info" />
                    <span>Map View</span>
                  </button>
                )}
              </div>
            )}

            {/* STRUCTURAL CORE SPEC PILLARS */}
            <div className="p-4 mb-4 shadow-sm" style={glassStyles.glassCard}>
              <span className="small text-muted d-block text-uppercase fw-bold mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Primary Dimensions Blueprint</span>
              <div className="row text-center g-3">
                <div className="col-4 border-end border-light-subtle">
                  <div className="bg-success bg-opacity-10 p-2 rounded-3 mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <Home size={20} className="text-success" />
                  </div>
                  <span className="small text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.65rem' }}>Bedrooms Count</span>
                  <span className="fw-black fs-4 text-dark">{propertySpecs.beds.replace(/beds/i, '')} Rooms</span>
                </div>
                <div className="col-4 border-end border-light-subtle">
                  <div className="bg-info bg-opacity-10 p-2 rounded-3 mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <Bath size={20} className="text-info" />
                  </div>
                  <span className="small text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.65rem' }}>Bathrooms Count</span>
                  <span className="fw-black fs-4 text-dark">{propertySpecs.baths.replace(/baths/i, '')} Units</span>
                </div>
                <div className="col-4">
                  <div className="bg-danger bg-opacity-10 p-2 rounded-3 mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <Square size={20} className="text-danger" />
                  </div>
                  <span className="small text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.65rem' }}>Gross Covered Area</span>
                  <span className="fw-black fs-4 text-dark">{propertySpecs.sqft.replace(/sqft/i, '')} <small style={{ fontSize: '0.75rem' }}>Sq.Ft</small></span>
                </div>
              </div>
            </div>

            {/* EXTENSIVE DETAILED SPECIFICATIONS MATRIX */}
            <div className="p-4 mb-4 shadow-sm" style={glassStyles.glassCard}>
              <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem' }}>
                <span className="p-1.5 rounded-3 bg-pink bg-opacity-10 text-pink d-inline-flex" style={{ color: '#ec4899' }}><Layers size={18} /></span> Complete Zoning & Asset Parameters Matrix
              </h4>
              <p className="text-muted small mb-4">Comprehensive index record parameters reflecting building status blueprints, structural records, and environmental sectoring codes.</p>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><Eye size={15} className="me-2 text-success" /> Panoramic View Type</span>
                      <span className="badge bg-success bg-opacity-10 text-success rounded-2 px-2.5 py-1 fw-bold">{validate(selectedProperty.view, "Ocean")}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Defines external horizons visible directly via the residential blueprint orientation.</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><Gauge size={15} className="me-2 text-primary" /> Living Gross Area</span>
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-2 px-2.5 py-1 fw-bold">{propertySpecs.sqft}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Total interior square footage mapped directly across validated drywall configurations.</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><Compass size={15} className="me-2 text-warning" /> Property Attached (YN)</span>
                      <span className="badge bg-warning bg-opacity-10 text-warning-emphasis rounded-2 px-2.5 py-1 fw-bold">{validate(selectedProperty.attachedYn, "false")}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Identifies if structural foundations or partition walls are shared with nearby real estate plots.</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><User size={15} className="me-2 text-danger" /> Senior Citizens Community</span>
                      <span className="badge bg-danger bg-opacity-10 text-danger rounded-2 px-2.5 py-1 fw-bold">{validate(selectedProperty.seniorCommunity, "No")}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Indicates age-restricted residential classification parameters for targeted sector mapping.</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><MapPin size={15} className="me-2 text-info" /> Sub-Area Geolocation Node</span>
                      <span className="badge bg-info bg-opacity-10 text-info rounded-2 px-2.5 py-1 fw-bold">{validate(selectedProperty.areaNode, "-")}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Specific micro-grid identifier corresponding to regional city boundary tracking infrastructure.</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><Building2 size={15} className="me-2 text-secondary" /> Total Structure Stories</span>
                      <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-2 px-2.5 py-1 fw-bold">{validate(selectedProperty.stories, "1")}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Vertical level allocations calculating complete ceiling breaks from foundation platforms.</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><Calendar size={15} className="me-2 text-dark" /> Year Built Code</span>
                      <span className="badge bg-dark bg-opacity-10 text-dark rounded-2 px-2.5 py-1 fw-bold">{validate(selectedProperty.yearBuilt, "-")}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Official municipal calendar date tracking when structural deployment achieved completion marks.</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><HardHat size={15} className="me-2 text-primary" /> Building Size Indicator</span>
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-2 px-2.5 py-1 fw-bold">{validate(selectedProperty.buildingSize, "-")}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Macro-scale assessment categorizing architecture volume scales for regulatory audits.</div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="p-3 shadow-sm border h-100 d-flex flex-column justify-content-between" style={glassStyles.glassWidget}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-bold d-flex align-items-center"><Trees size={15} className="me-2 text-warning" /> Zoning Acres Lot Area</span>
                      <span className="badge bg-warning bg-opacity-10 text-warning-emphasis rounded-2 px-2.5 py-1 fw-bold">{validate(propertySpecs.acres, "-")}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Total spatial plot circumference measuring open soil and land perimeter borders.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION BOX */}
            <div className="p-4 mb-4 shadow-sm" style={glassStyles.glassCard}>
              <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem', color: '#1f2937' }}>
                <span className="p-1.5 rounded-3 bg-purple bg-opacity-10 d-inline-flex text-purple" style={{ color: '#8b5cf6' }}><Info size={18} /></span> Architecture Structural Overview
              </h4>
              <p className="text-secondary lh-lg small text-justify m-0" style={{ fontSize: '0.92rem' }}>
                {validate(selectedProperty.description)}
              </p>
            </div>

            {/* NEIGHBORHOOD REGIONAL MAP CARD */}
            {embeddedMapUrl && (
              <div ref={mapSectionRef} className="p-4 mb-4 shadow-sm transition-all" style={glassStyles.glassCard}>
                <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
                  <span className="p-1.5 rounded-3 bg-info bg-opacity-10 d-inline-flex text-info" style={{ color: '#06b6d4' }}><MapPin size={18} /></span> Neighborhood Map Target Coordinates
                </h4>
                <div className="border rounded-4 overflow-hidden shadow-sm bg-light">
                  <iframe title="neighborhood-realestate-map" width="100%" height="360" style={{ border: 0 }} loading="lazy" allowFullScreen src={embeddedMapUrl}></iframe>
                </div>
              </div>
            )}

            {/* EXPANDED PROXIMITY & LOCAL LANDMARKS SECTION - DYNAMIC ARRAY LOOP */}
            {selectedProperty.landmarks && selectedProperty.landmarks.length > 0 && (
              <div className="p-4 mb-4 shadow-sm" style={glassStyles.glassCard}>
                <h4 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
                  <span className="p-1.5 rounded-3 bg-success bg-opacity-10 text-success d-inline-flex">
                    <LandmarkIcon size={18} />
                  </span>
                  Premium Location Proximity & Subidha Hub
                </h4>
                <div className="d-flex flex-column gap-3">
                  {selectedProperty.landmarks.map((landmark, index) => (
                    <div key={index} className="p-3 border border-light-subtle rounded-4 bg-white bg-opacity-60 shadow-sm d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                          <Landmark size={20} />
                        </div>
                        <div>
                          <h5 className="fw-bold text-dark m-0" style={{ fontSize: '0.9rem' }}>{landmark.name}</h5>
                          <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Nearby Spot / Public Utility Area</small>
                        </div>
                      </div>
                      {landmark.url && (
                        <a href={landmark.url} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm px-4 py-2 rounded-3 fw-bold text-white tracking-wide shadow border-0" style={{ fontSize: '0.8rem' }}>
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
              <div className="p-4 mb-4 shadow-sm" style={glassStyles.glassCard}>
                <h5 className="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.82rem', color: '#4b5563', letterSpacing: '0.6px' }}>
                  <span className="p-1 rounded-3 bg-secondary bg-opacity-10 text-secondary d-inline-flex"><User size={14} /></span> REPRESENTATIVE ASSIGNED AGENT
                </h5>
                <div className="p-3 shadow-sm border bg-white bg-opacity-50" style={{ borderRadius: '14px' }}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white overflow-hidden flex-shrink-0 border border-3 border-white shadow" style={{ width: '58px', height: '58px', backgroundColor: '#ec4899' }}>
                      {selectedProperty.agent?.img ? <img src={selectedProperty.agent.img} alt="agent asset avatar" className="w-100 h-100 object-cover" /> : <User size={24} />}
                    </div>
                    <div>
                      <h6 className="fw-bold m-0 text-dark small">{validate(selectedProperty.agent?.name, "Bharati")}</h6>
                      <p className="text-muted m-0 mt-0.5" style={{ fontSize: '0.7rem' }}>Certified Associate Broker | CJ GROUP CRM</p>
                      <small className="d-block text-primary fw-bold mt-1.5" style={{ fontSize: '0.72rem' }}>P: {validate(selectedProperty.agent?.phone, "07267995307")}</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* LISTING SYNC INTERFACE STATUS */}
              <div className="p-4 shadow-sm mb-4" style={glassStyles.glassCard}>
                <div className="d-flex align-items-center gap-2 mb-4 text-muted" style={{ fontSize: '0.72rem' }}>
                  <Activity size={14} className="text-primary" />
                  <span className="fw-bold tracking-wider text-uppercase text-primary-emphasis">Listing Status Realtime Sync</span>
                </div>

                {/* Data Rows Container with dynamic rendering layers */}
                <div className="my-2">
                  <div className="d-flex justify-content-between align-items-center border-bottom border-light-subtle py-3 small">
                    <span className="text-muted fw-medium d-flex align-items-center">
                      <ShieldCheck size={14} className="text-success me-2" />Availability Rules
                    </span>
                    <span className={`badge rounded-2 px-3 py-1 fw-bold ${
                      validate(selectedProperty.listingStatus, "Active Listing") === "Active Listing"
                        ? "bg-success bg-opacity-10 text-success"
                        : "bg-warning bg-opacity-10 text-warning-emphasis"
                    }`}>
                      {validate(selectedProperty.listingStatus, "Active Listing")}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center border-bottom border-light-subtle py-3 small">
                    <span className="text-muted fw-medium d-flex align-items-center">
                      <Building2 size={14} className="text-primary me-2" />Asset Class Category
                    </span>
                    <span className="fw-bold text-dark">
                      {validate(selectedProperty.assetClass, "Single Family Residence")}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center border-bottom border-light-subtle py-3 small">
                    <span className="text-muted fw-medium d-flex align-items-center">
                      <Calendar size={14} className="text-warning me-2" />Zoning Year Matrix
                    </span>
                    <span className="fw-bold text-dark">{validate(selectedProperty.yearBuilt, "1980")}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center py-3 small">
                    <span className="text-muted fw-medium d-flex align-items-center">
                      <Square size={14} className="text-danger me-2" />Lot Acreage Registry
                    </span>
                    <span className="fw-bold text-dark">{validate(propertySpecs.acres, "-")}</span>
                  </div>
                </div>

                {/* Button Block with clean Top Margin spacing */}
                <div className="mt-4 pt-2 gap-2.5 d-flex flex-column">
                  <button className="btn w-100 py-3 my-1 fw-bold rounded-3 shadow text-uppercase text-white tracking-wider border-0" style={{ fontSize: '0.8rem', background: '#d91b1b', letterSpacing: '0.5px' }}>
                    Schedule Private Tour
                  </button>
                  <button className="btn btn-outline-dark w-100 py-3 my-1 fw-bold rounded-3 text-uppercase tracking-wider border-1 bg-primary bg-opacity-60" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
                    Contact Broker Office
                  </button>
                </div>

                {/* Footer link with clean separator separation */}
                <div className="d-flex align-items-center justify-content-center gap-2 text-center mt-4 pt-1 text-muted text-decoration-none small" style={{ fontSize: '0.72rem', cursor: 'pointer' }}>
                  < Landmark size={12} className="text-info flex-shrink-0" />
                  <span className="text-secondary fw-medium">Get preapproved financing coordinates with CJ Group Developers Matrix</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}