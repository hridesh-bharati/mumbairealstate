import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Sliders, Heart, Compass, MapPin, Phone, Building2, CheckCircle2 } from 'lucide-react';

export default function MapViewSearch() {
  const [searchParams] = useSearchParams();
  const queryLocation = searchParams.get('location') || '';

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState(queryLocation);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fetch Live Real Data from Firestore
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true);
        const propertiesRef = collection(db, "properties");
        const querySnapshot = await getDocs(propertiesRef);
        
        const realList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProperties(realList);

        if (realList.length > 0) {
          const initialProp = realList[0];
          setSelectedProperty(initialProp);
          setActiveLocation(queryLocation || initialProp.address || initialProp.areaNode || "CJ Groups");
        } else if (!queryLocation) {
          setActiveLocation("CJ Groups");
        }
      } catch (err) {
        console.error("Firestore Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, [queryLocation]);

  // Handle Property Selection on Card Click
  const handleSelectProperty = (item) => {
    setSelectedProperty(item);
    if (item.address) {
      setActiveLocation(item.address);
    }
  };

  // Real Dynamic Google Maps Embed Link
  const realMapUrl = activeLocation 
    ? `https://maps.google.com/maps?q=${encodeURIComponent(activeLocation)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
    : null;

  return (
    // Top 70px Gap for Navbar Alignment
    <div 
      className="container-fluid p-0 overflow-hidden bg-light" 
      style={{ marginTop: '75px', height: 'calc(100vh - 70px)' }}
    >
      <div className="row g-0 h-100">
        
        {/* LEFT SIDE (COL-6): LIVE DYNAMIC GOOGLE MAP */}
        <div className="col-lg-6 h-100 position-relative border-end d-flex flex-column bg-secondary bg-opacity-10">
          
          {realMapUrl ? (
            <iframe
              title="Real Property Location Map"
              src={realMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
              <MapPin size={32} className="text-primary mb-2" />
              <span className="fw-semibold">Map Location Loading...</span>
            </div>
          )}

          {/* Floating Address Bar on Top of Map */}
          <div className="position-absolute bottom-0 start-0 p-3 w-100" style={{ zIndex: 10 }}>
            <div className="bg-dark text-white p-3 rounded-3 shadow-lg border border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <MapPin size={18} className="text-warning flex-shrink-0" />
                <span className="small fw-semibold text-truncate" style={{ fontSize: '0.85rem' }}>
                  {activeLocation || "Fetching CJ Groups coordinates..."}
                </span>
              </div>
              <button 
                onClick={() => {
                  if (properties.length > 0) handleSelectProperty(properties[0]);
                }} 
                className="btn btn-sm btn-outline-light rounded-2 py-1 px-3 fw-bold flex-shrink-0" 
                style={{ fontSize: '0.75rem' }}
              >
                Reset Map
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE (COL-6): LIVE FIRESTORE PROPERTIES & BOTTOM DETAILS */}
        <div className="col-lg-6 h-100 overflow-y-auto p-4 bg-white text-start">
          
          {/* Header Title & Badge */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fw-bold fs-4 text-dark m-0">
                {queryLocation ? `${queryLocation} Properties` : "CJ Groups Real Estate"}
              </h2>
              <small className="text-muted">Directly synced with Live Firestore Database</small>
            </div>
            <span className="badge bg-dark px-3 py-2 fs-7 rounded-2 fw-semibold">
              {properties.length} Verified Assets
            </span>
          </div>

          {/* Filter Bar */}
          <div className="d-flex flex-wrap align-items-center gap-2 mb-4 p-3 bg-light border rounded-3 shadow-sm">
            <div className="flex-grow-1" style={{ minWidth: '120px' }}>
              <input
                type="text"
                className="form-control rounded-2 form-control-sm border-secondary border-opacity-25"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <span className="text-muted fw-bold">-</span>
            <div className="flex-grow-1" style={{ minWidth: '120px' }}>
              <input
                type="text"
                className="form-control rounded-2 form-control-sm border-secondary border-opacity-25"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button className="btn btn-dark rounded-2 btn-sm d-flex align-items-center gap-1.5 px-3 fw-bold">
              <Sliders size={14} /> Apply Filter
            </button>
          </div>

          {/* REAL PROPERTY GRID */}
          <div className="row g-3">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted small mt-2 fw-semibold">Connecting to Firestore Database...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-5 border rounded-3 bg-light">
                <Building2 size={36} className="text-muted mb-2" />
                <p className="text-muted m-0 fw-semibold">No active listings found in database.</p>
              </div>
            ) : (
              properties.map((item) => {
                const isSelected = selectedProperty?.id === item.id;
                return (
                  <div className="col-md-6" key={item.id}>
                    <div 
                      onClick={() => handleSelectProperty(item)}
                      className={`card rounded-3 shadow-sm h-100 position-relative transition-all border ${
                        isSelected ? 'border-2 border-primary bg-primary bg-opacity-10' : 'border-light-subtle'
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Asset Class Badge */}
                      <span className="position-absolute top-0 start-0 m-2 badge bg-dark text-white rounded-1 px-2 py-1" style={{ fontSize: '0.65rem', zIndex: 2 }}>
                        {item.assetClass || "CJ Groups Verified"}
                      </span>

                      {/* Image Frame */}
                      <div className="position-relative overflow-hidden rounded-top-3" style={{ height: '170px' }}>
                        <img
                          src={item.images?.[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"}
                          alt={item.title}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <button 
                          className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle p-1.5 d-flex align-items-center justify-content-center shadow-sm"
                          style={{ width: '32px', height: '32px' }}
                          onClick={(e) => { e.stopPropagation(); }}
                        >
                          <Heart size={15} className="text-danger" />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="card-body p-3">
                        <h4 className="fw-bold fs-5 mb-1 text-primary">{item.price}</h4>
                        <h6 className="fw-bold text-dark text-truncate mb-1" style={{ fontSize: '0.95rem' }}>{item.title}</h6>
                        <p className="text-muted small mb-2 text-truncate" style={{ fontSize: '0.8rem' }}>
                          {item.specs || `${item.beds || '-'} beds | ${item.baths || '-'} baths | ${item.sqft || '-'} sqft`}
                        </p>
                        <p className="text-dark small mb-0 text-truncate fw-medium" style={{ fontSize: '0.78rem' }}>
                          📍 {item.address}
                        </p>
                      </div>

                      {/* Real Agent Sync Footer */}
                      {item.agent?.name && (
                        <div className="card-footer bg-light border-top p-2 px-3 d-flex align-items-center justify-content-between rounded-bottom-3">
                          <small className="text-secondary fw-bold" style={{ fontSize: '0.72rem' }}>
                            Agent: {item.agent.name}
                          </small>
                          {item.agent.phone && (
                            <small className="text-primary fw-bold d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
                              <Phone size={11} /> {item.agent.phone}
                            </small>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })
            )}

            {/* BOTTOM FULL-WIDTH SECTION (COL-12) FOR SELECTED PROPERTY DETAILS */}
            {selectedProperty && (
              <div className="col-12 mt-4 border-top pt-4">
                <div className="p-3 border rounded-3 bg-white shadow-sm">
                  
                  {/* Header Bar */}
                  <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <h3 className="fw-bold fs-6 text-dark m-0 d-flex align-items-center gap-2">
                      <Compass size={18} className="text-primary" /> Dynamic Details: {selectedProperty.title}
                    </h3>
                    <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2.5 py-1 rounded-pill" style={{ fontSize: '0.7rem' }}>
                      <CheckCircle2 size={12} className="me-1" /> Active Selected Asset
                    </span>
                  </div>

                  {/* Additional Specs Grid */}
                  {selectedProperty.additionalSpecs && selectedProperty.additionalSpecs.length > 0 ? (
                    <div className="row g-2 mb-3">
                      {selectedProperty.additionalSpecs.map((spec, idx) => (
                        <div className="col-12 col-md-6" key={idx}>
                          <div className="p-2.5 border border-light-subtle bg-light rounded-2 d-flex justify-content-between align-items-center">
                            <span className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                              {spec.key}
                            </span>
                            <strong className="text-dark fw-bold" style={{ fontSize: '0.85rem' }}>
                              {spec.value}
                            </strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2.5 bg-light rounded-2 border text-muted small mb-3">
                      No additional specifications available for this property.
                    </div>
                  )}

                  {/* Proximity & Landmarks */}
                  {selectedProperty.landmarks && selectedProperty.landmarks.length > 0 && (
                    <div className="pt-2 border-top">
                      <span className="d-block text-muted fw-bold mb-2" style={{ fontSize: '0.75rem' }}>
                        Proximity & Landmarks:
                      </span>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedProperty.landmarks.map((landmark, idx) => (
                          <a 
                            key={idx} 
                            href={landmark.url || '#'} 
                            target="_blank" 
                            rel="noreferrer"
                            className="badge bg-white text-dark border p-2 text-decoration-none fw-medium d-flex align-items-center gap-1 shadow-sm rounded-2"
                            style={{ fontSize: '0.75rem' }}
                          >
                            📍 {landmark.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}