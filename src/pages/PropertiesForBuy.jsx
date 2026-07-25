// src/pages/PropertiesForBuy.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { Home, Bath, Square, MapPin, Layers } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PopularMarkets from './PopularMarkets';

export default function PropertiesForBuy() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Firestore query adding target filter for "Buy"
    const q = query(
      collection(db, "properties"),
      where("listingType", "==", "Buy"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveProperties = [];
      snapshot.forEach((doc) => {
        liveProperties.push({ id: doc.id, ...doc.data() });
      });
      setProperties(liveProperties);
      setLoading(false);
    }, (error) => {
      console.error("Firestore listening broken for Buy catalog: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const parseSpecs = (specsStr) => {
    if (!specsStr) return { beds: 'N/A', baths: 'N/A', sqft: 'N/A', acres: null };
    const parts = specsStr.split('|').map(s => s.trim());
    return {
      beds: parts[0] || 'N/A',
      baths: parts[1] || 'N/A',
      sqft: parts[2] || 'N/A',
      acres: parts[3] || null
    };
  };

  if (loading) {
    return (
      <div className="container py-5 text-center my-5" style={{ color: '#000' }}>
        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
        <span>Loading properties for Sale from Firestore...</span>
      </div>
    );
  }

  return (
    <div className="app-main-bg py-5">
      <div className="container py-3">
       {/* ===== PREVENT TOUCHING OTHER BLOCKS - ONLY HEADING DESIGN RECOGNITION ===== */}
<div 
  className="d-flex justify-content-between align-items-center my-5 pb-3 border-bottom border-light" 
  data-aos="fade-down"
>
  <div className="position-relative">
    <span 
      className="text-uppercase tracking-widest fw-bold text-primary small d-block mb-1"
      style={{ letterSpacing: '2.5px', fontSize: '12px' }}
    >
      Explore Verified Inventory
    </span>
    <h2 
      className="h3 fw-normal m-0 text-dark position-relative"
      style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.5px' }}
    >
      Premium Properties <span className="fw-semibold text-warning" style={{ color: '#d4af37 !important' }}>For Sale</span>
    </h2>
    {/* Minimal Aesthetic Underline Matrix */}
    <div 
      className="position-absolute bottom-0 start-0 bg-warning mt-2" 
      style={{ width: '40px', height: '3px', borderRadius: '2px', backgroundColor: '#d4af37', bottom: '-10px' }}
    ></div>
  </div>
  
  {/* Right Side Stats Counter Badge */}
  <div className="d-none d-sm-inline-block">
    <span className="badge bg-dark rounded-pill px-3 py-2 fw-medium tracking-wide text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
      {properties.length} Available Listings
    </span>
  </div>
</div>
{/* ========================================================================= */}
        
        {properties.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <h5>No purchase listings found in the directory.</h5>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {properties.map((item, index) => {
              const propertySpecs = parseSpecs(item.specs);
              return (
                <div className="col-xl-4 col-md-6 d-flex align-items-stretch" key={item.id} data-aos="fade-up" data-aos-delay={index * 50} style={{ cursor: 'pointer' }} onClick={() => navigate(`/property/${item.id}`, { state: { propertyData: item } })}>
                  <div className="card native-app-card w-100 border-0 overflow-hidden">
                    <div className="position-relative overflow-hidden">
                      <div className="app-badge-container">
                        {item.badges && item.badges.map((badge, bIdx) => (
                          <span key={bIdx} className="app-top-badge" style={{ backgroundColor: badge.bg }}>{badge.text}</span>
                        ))}
                      </div>
                      <div className="app-img-counter">{item.imgCounter}</div>
                      <div id={`carousel-${item.id}`} className="carousel slide" data-bs-ride="false" onClick={(e) => e.stopPropagation()}>
                        <div className="carousel-inner">
                          {item.images && item.images.map((imgSrc, imgIndex) => (
                            <div className={`carousel-item ${imgIndex === 0 ? "active" : ""}`} key={imgIndex}>
                              <img src={imgSrc} alt={item.title} className="w-100 d-block app-card-img" style={{ height: '230px', objectFit: 'cover' }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-3 d-flex flex-column justify-content-between">
                      <div>
                        <h3 className="fw-bold text-dark mb-1 app-price">{item.price}</h3>
                        <h4 className="h6 text-secondary text-truncate mb-2">{item.title}</h4>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <div className="mini-spec-node bg-green-light text-green"><Home size={14} /><span className="text-capitalize">{propertySpecs.beds}</span></div>
                          <div className="mini-spec-node bg-blue-light text-blue"><Bath size={14} /><span className="text-capitalize">{propertySpecs.baths}</span></div>
                          <div className="mini-spec-node bg-orange-light text-orange"><Square size={13} /><span>{propertySpecs.sqft}</span></div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 pt-2 border-top border-light">
                        <MapPin size={14} className="text-secondary flex-shrink-0" /><p className="text-muted mb-0 text-truncate small flex-grow-1">{item.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <PopularMarkets />
    </div>
  );
}