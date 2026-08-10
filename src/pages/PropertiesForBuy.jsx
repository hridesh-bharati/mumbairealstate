// src/pages/PropertiesForBuy.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { Home, Bath, Square, MapPin, ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Individual Property Card Component for Dynamic Counter Tracking
const PropertyCard = ({ item, index, navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const carouselId = `carousel-${item.id}`;
  const totalImages = item.images?.length || 1;

  useEffect(() => {
    const carouselEl = carouselRef.current;
    if (!carouselEl) return;

    // Bootstrap carousel slide change event listener
    const handleSlid = (e) => {
      if (typeof e.to === 'number') {
        setCurrentSlide(e.to);
      }
    };

    carouselEl.addEventListener('slid.bs.carousel', handleSlid);
    return () => {
      carouselEl.removeEventListener('slid.bs.carousel', handleSlid);
    };
  }, [carouselId]);

  // Arrow hover auto-slide logic
  const handleArrowHover = (direction) => {
    const el = carouselRef.current;
    if (el && window.bootstrap && window.bootstrap.Carousel) {
      const carousel = window.bootstrap.Carousel.getOrCreateInstance(el);
      if (direction === 'prev') {
        carousel.prev();
      } else {
        carousel.next();
      }
    }
  };

  const parseSpecs = (specsStr) => {
    if (!specsStr) return { beds: 'N/A', baths: 'N/A', sqft: 'N/A' };
    const parts = specsStr.split('|').map(s => s.trim());

    const cleanBeds = (parts[0] || 'N/A').replace(/beds?/gi, '').trim();
    const cleanBaths = (parts[1] || 'N/A').replace(/baths?/gi, '').trim();
    const cleanSqft = (parts[2] || 'N/A').replace(/sqft/gi, '').trim();

    return {
      beds: cleanBeds !== 'N/A' ? `${cleanBeds} Beds` : 'N/A',
      baths: cleanBaths !== 'N/A' ? `${cleanBaths} Baths` : 'N/A',
      sqft: cleanSqft !== 'N/A' ? `${cleanSqft} sqft` : 'N/A'
    };
  };

  const formatPrice = (priceStr) => {
    if (!priceStr) return '₹ Price on Request';
    if (priceStr.includes('₹') || priceStr.toLowerCase().includes('lac') || priceStr.toLowerCase().includes('cr')) {
      return priceStr;
    }
    return `₹ ${priceStr}`;
  };

  const propertySpecs = parseSpecs(item.specs);

  return (
    <div
      className="col-xl-4 col-md-6 d-flex align-items-stretch"
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <div
        className="luxury-card w-100 bg-white rounded-4 overflow-hidden shadow-sm d-flex flex-column"
        onClick={() => navigate(`/property/${item.id}`, { state: { propertyData: item } })}
      >
        {/* Media Box */}
        <div className="position-relative overflow-hidden luxury-card-media">
          <div className="card-image-overlay"></div>

          {/* Top Left Badge */}
          <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 3 }}>
            <span className="badge-for-sale">FOR SALE</span>
          </div>

          {/* Top Right Badges */}
          <div className="position-absolute top-0 end-0 m-3 d-flex gap-1" style={{ zIndex: 3 }}>
            {item.badges && item.badges.map((badge, bIdx) => (
              <span key={bIdx} className="app-top-badge" style={{ backgroundColor: badge.bg }}>
                {badge.text}
              </span>
            ))}
          </div>

          {/* Live Dynamic Image Counter (e.g. 1/2, 2/2) */}
          <div className="app-img-counter">
            {currentSlide + 1}/{totalImages}
          </div>

          {/* Carousel */}
          <div
            id={carouselId}
            ref={carouselRef}
            className="carousel slide h-100"
            data-bs-ride="false"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="carousel-inner h-100">
              {item.images && item.images.length > 0 ? (
                item.images.map((imgSrc, imgIndex) => (
                  <div className={`carousel-item h-100 ${imgIndex === 0 ? "active" : ""}`} key={imgIndex}>
                    <img src={imgSrc} alt={item.title} className="w-100 h-100 object-fit-cover" />
                  </div>
                ))
              ) : (
                <div className="carousel-item active h-100">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=500&fit=crop" alt="Property" className="w-100 h-100 object-fit-cover" />
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            {item.images && item.images.length > 1 && (
              <>
                <button
                  className="carousel-control-prev app-arrow"
                  type="button"
                  data-bs-target={`#${carouselId}`}
                  data-bs-slide="prev"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => handleArrowHover('prev')}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="carousel-control-next app-arrow"
                  type="button"
                  data-bs-target={`#${carouselId}`}
                  data-bs-slide="next"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => handleArrowHover('next')}
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="fw-bold m-0 text-gold fs-4">
                {formatPrice(item.price)}
              </h3>
              <span className="property-type-pill">
                {item.propertyType || 'Luxury Estate'}
              </span>
            </div>

            <h4 className="h6 text-dark text-truncate fw-bold mb-3" title={item.title}>
              {item.title}
            </h4>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <div className="spec-pill spec-pill-beds">
                <Home size={13} /> <span>{propertySpecs.beds}</span>
              </div>
              <div className="spec-pill spec-pill-baths">
                <Bath size={13} /> <span>{propertySpecs.baths}</span>
              </div>
              <div className="spec-pill spec-pill-sqft">
                <Square size={13} /> <span>{propertySpecs.sqft}</span>
              </div>
            </div>
          </div>

          {/* Footer Location & Action */}
          <div className="pt-3 border-top border-light d-flex align-items-center justify-content-between mt-auto">
            <div className="d-flex align-items-center gap-2 text-muted text-truncate me-2">
              <MapPin size={16} className="text-danger flex-shrink-0" style={{ color: '#b30000' }} />
              <span className="small text-truncate fw-medium">{item.address || 'Location on request'}</span>
            </div>
            <div className="view-btn-circle">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function PropertiesForBuy() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

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

  if (loading) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="spinner-border spinner-border-sm me-2 text-warning" role="status"></div>
        <span className="fw-semibold text-muted">Loading properties...</span>
      </div>
    );
  }

  return (
    <div className="app-main-bg py-5" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <div className="container py-3">

        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 pb-4 border-bottom border-secondary border-opacity-10 gap-3" data-aos="fade-down">
          <div>
            <span className="badge-luxury-tag mb-2">
              <Sparkles size={12} /> Verified Inventory
            </span>
            <h2 className="fw-bold m-0 text-dark display-6">
              Premium Properties <span className="text-gold">For Sale</span>
            </h2>
          </div>
          <div>
            <span className="badge rounded-pill bg-dark text-gold px-4 py-2 border border-gold-subtle">
              {properties.length} Available Listings
            </span>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm my-4">
            <h5 className="fw-bold text-dark">No purchase listings found.</h5>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {properties.map((item, index) => (
              <PropertyCard key={item.id} item={item} index={index} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}