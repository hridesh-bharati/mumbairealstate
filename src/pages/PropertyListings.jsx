import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Home, Bath, Square, MapPin, Layers } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './PropertyListings.css';

export default function PropertyListings() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Firestore properties collection se dynamic live connection setup
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveProperties = [];
      snapshot.forEach((doc) => {
        liveProperties.push({ id: doc.id, ...doc.data() });
      });
      setProperties(liveProperties);
      setLoading(false);
    }, (error) => {
      console.error("Firestore listening broken: ", error);
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

  const handleCardClick = (item) => {
    // Dynamic navigation ke sath pure item payload ko pass kar rhe hain
    navigate(`/property/${item.id}`, { state: { propertyData: item } });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center my-5" style={{ color: '#000' }}>
        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
        <span>Loading live property catalog from Firestore...</span>
      </div>
    );
  }

  return (
    <div className="app-main-bg py-5">
      <div className="container py-3">
        {/* Section Header */}
        <div className="d-flex justify-content-between align-items-end mb-4" data-aos="fade-down">
          <div>
            <span className="section-subtitle fw-bold tracking-wider">🌿 EXCLUSIVE RESIDENTIALS</span>
            <h2 className="h4 fw-bold text-dark m-0 mt-1">Featured Properties</h2>
          </div>
        </div>
        
        {properties.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <h5>No properties found in the directory.</h5>
            <p className="small">Please add a property from the Admin Dashboard to go live.</p>
          </div>
        ) : (
          /* Properties Grid */
          <div className="row g-4 justify-content-center">
            {properties.map((item, index) => {
              const propertySpecs = parseSpecs(item.specs);
              
              return (
                <div 
                  className="col-xl-4 col-md-6 d-flex align-items-stretch" 
                  key={item.id} 
                  data-aos="fade-up" 
                  data-aos-delay={index * 50}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCardClick(item)}
                >
                  <div className="card native-app-card w-100 border-0 overflow-hidden">
                    <div className="position-relative overflow-hidden">
                      {/* Top Floating Status Badges */}
                      <div className="app-badge-container">
                        {item.badges && item.badges.map((badge, bIdx) => (
                          <span key={bIdx} className="app-top-badge" style={{ backgroundColor: badge.bg }}>
                            {badge.text}
                          </span>
                        ))}
                      </div>
                      
                      {/* Floating Count Badge */}
                      <div className="app-img-counter">{item.imgCounter}</div>

                      {/* Carousel Container */}
                      <div id={`carousel-${item.id}`} className="carousel slide" data-bs-ride="false" onClick={(e) => e.stopPropagation()}>
                        <div className="carousel-inner">
                          {item.images && item.images.map((imgSrc, imgIndex) => (
                            <div className={`carousel-item ${imgIndex === 0 ? "active" : ""}`} key={imgIndex}>
                              <img src={imgSrc} alt={item.title} className="w-100 d-block app-card-img" style={{ height: '230px', objectFit: 'cover' }} />
                            </div>
                          ))}
                        </div>
                        {item.images && item.images.length > 1 && (
                          <>
                            <button className="carousel-control-prev app-arrow" type="button" data-bs-target={`#carousel-${item.id}`} data-bs-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            </button>
                            <button className="carousel-control-next app-arrow" type="button" data-bs-target={`#carousel-${item.id}`} data-bs-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Android App Style Card Body */}
                    <div className="card-body p-3 d-flex flex-column justify-content-between">
                      <div>
                        <h3 className="fw-bold text-dark mb-1 app-price">{item.price}</h3>
                        <h4 className="h6 text-secondary text-truncate mb-2">{item.title}</h4>
                        
                        {/* Colorful Specifications Icon Row */}
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <div className="mini-spec-node bg-green-light text-green">
                            <Home size={14} />
                            <span className="text-capitalize">{propertySpecs.beds}</span>
                          </div>
                          <div className="mini-spec-node bg-blue-light text-blue">
                            <Bath size={14} />
                            <span className="text-capitalize">{propertySpecs.baths}</span>
                          </div>
                          <div className="mini-spec-node bg-orange-light text-orange">
                            <Square size={13} />
                            <span>{propertySpecs.sqft}</span>
                          </div>
                          {propertySpecs.acres && (
                            <div className="mini-spec-node bg-purple-light text-purple">
                              <Layers size={13} />
                              <span>{propertySpecs.acres}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Location Pin Bottom Anchor */}
                      <div className="d-flex align-items-center gap-2 pt-2 border-top border-light">
                        <MapPin size={14} className="text-secondary flex-shrink-0" />
                        <p className="text-muted mb-0 text-truncate small flex-grow-1">{item.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}