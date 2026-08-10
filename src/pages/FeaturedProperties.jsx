import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { Home, Bath, Square, MapPin, ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Properties.css";

const PropertyCardApp = ({ item, index, navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const carouselId = `carousel-featured-${item.id}`;
  const totalImages = item.images?.length || 1;

  useEffect(() => {
    const carouselEl = carouselRef.current;
    if (!carouselEl) return;

    const handleSlid = (e) => {
      if (typeof e.to === 'number') {
        setCurrentSlide(e.to);
      }
    };

    carouselEl.addEventListener('slid.bs.carousel', handleSlid);
    return () => {
      carouselEl.removeEventListener('slid.bs.carousel', handleSlid);
    };
  }, []);

  const parseSpecs = (specsStr) => {
    if (!specsStr) return { beds: 'N/A', baths: 'N/A', sqft: 'N/A' };
    const parts = specsStr.split('|').map(s => s.trim());
    return {
      beds: parts[0] ? parts[0].replace(/beds?/gi, '').trim() + ' Beds' : 'N/A',
      baths: parts[1] ? parts[1].replace(/baths?/gi, '').trim() + ' Baths' : 'N/A',
      sqft: parts[2] ? parts[2].replace(/sqft/gi, '').trim() + ' sqft' : 'N/A'
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
      className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
      data-aos="fade-up"
      data-aos-delay={index * 60}
    >
      <div
        className="app-property-card w-100 bg-white rounded-4 overflow-hidden border-0 shadow-sm d-flex flex-column user-select-none"
        onClick={() => navigate(`/property/${item.id}`, { state: { propertyData: item } })}
      >
        {/* Media Frame */}
        <div className="position-relative media-frame overflow-hidden">
          {/* Top Left Subtle Badge */}
          <div className="position-absolute top-0 start-0 m-2 z-3">
            <span className="badge badge-subtle-tag px-2-5 py-1-5 rounded-pill shadow-sm d-flex align-items-center gap-1">
              <Sparkles size={11} className="text-warning" /> FEATURED
            </span>
          </div>

          {/* Top Right Badges */}
          <div className="position-absolute top-0 end-0 m-2 d-flex gap-1 z-3">
            {item.badges && item.badges.map((badge, bIdx) => (
              <span
                key={bIdx}
                className="badge badge-subtle-tag px-2 py-1 rounded-pill shadow-sm"
                style={{ backgroundColor: badge.bg ? badge.bg : undefined }}
              >
                {badge.text}
              </span>
            ))}
          </div>

          {/* Image Counter */}
          <div className="position-absolute bottom-0 end-0 m-2 z-3">
            <span className="badge badge-subtle-tag px-2-5 py-1 rounded-pill shadow-sm">
              {currentSlide + 1}/{totalImages}
            </span>
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
                    <img src={imgSrc} alt={item.title} className="w-100 h-100 object-fit-cover property-img" />
                  </div>
                ))
              ) : (
                <div className="carousel-item active h-100">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=500&fit=crop" alt="Property" className="w-100 h-100 object-fit-cover property-img" />
                </div>
              )}
            </div>

            {item.images && item.images.length > 1 && (
              <>
                <button
                  className="carousel-control-prev app-touch-arrow"
                  type="button"
                  data-bs-target={`#${carouselId}`}
                  data-bs-slide="prev"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="carousel-control-next app-touch-arrow"
                  type="button"
                  data-bs-target={`#${carouselId}`}
                  data-bs-slide="next"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-3 d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3
                className="fw-extrabold m-0 fs-5"
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #f59f00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {formatPrice(item.price)}
              </h3>
              <span
                className="badge rounded-pill text-dark fw-bold px-2.5 py-1"
                style={{
                  fontSize: '0.68rem',
                  background: 'linear-gradient(135deg, #fff9db 0%, #fff3bf 100%)',
                  border: '1px solid #ffe066'
                }}
              >
                {item.propertyType || 'Luxury Estate'}
              </span>
            </div>

            <h4 className="fw-bold text-dark text-truncate mb-3" style={{ fontSize: '0.9rem' }} title={item.title}>
              {item.title}
            </h4>

            {/* Specs Gradient Icon Rings */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              <div className="app-spec-pill" style={{ background: '#fff5f5', border: '1px solid #ffc9c9' }}>
                <div className="app-icon-ring" style={{ borderColor: '#ff8787' }}>
                  <div className="app-icon-inner" style={{ background: 'linear-gradient(135deg, #ff4d4d, #dc2626)' }}>
                    <Home size={11} className="text-white" />
                  </div>
                </div>
                <span style={{ color: '#c92a2a', fontSize: '0.72rem', fontWeight: 700 }}>{propertySpecs.beds}</span>
              </div>

              <div className="app-spec-pill" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div className="app-icon-ring" style={{ borderColor: '#86efac' }}>
                  <div className="app-icon-inner" style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }}>
                    <Bath size={11} className="text-white" />
                  </div>
                </div>
                <span style={{ color: '#166534', fontSize: '0.72rem', fontWeight: 700 }}>{propertySpecs.baths}</span>
              </div>

              <div className="app-spec-pill" style={{ background: '#e7f5ff', border: '1px solid #a5d8ff' }}>
                <div className="app-icon-ring" style={{ borderColor: '#74c0fc' }}>
                  <div className="app-icon-inner" style={{ background: 'linear-gradient(135deg, #38bdf8, #0284c7)' }}>
                    <Square size={10} className="text-white" />
                  </div>
                </div>
                <span style={{ color: '#1864ab', fontSize: '0.72rem', fontWeight: 700 }}>{propertySpecs.sqft}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-top border-light d-flex align-items-center justify-content-between mt-auto">
            <div className="d-flex align-items-center gap-1.5 text-muted text-truncate me-2">
              <MapPin size={14} className="text-danger flex-shrink-0" />
              <span className="small text-truncate fw-semibold text-secondary" style={{ fontSize: '0.75rem' }}>
                {item.address || 'Location on request'}
              </span>
            </div>
            <div
              className="app-action-btn rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-sm"
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #ff4d4d 0%, #dc2626 100%)'
              }}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });

    const q = query(
      collection(db, "properties"),
      orderBy("createdAt", "desc"),
      limit(6)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveProperties = [];
      snapshot.forEach((doc) => {
        liveProperties.push({ id: doc.id, ...doc.data() });
      });
      setProperties(liveProperties);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="spinner-border spinner-border-sm me-2 text-danger" role="status"></div>
        <span className="fw-semibold text-muted">Loading properties...</span>
      </div>
    );
  }

  return (
    <section className="py-4 py-md-5" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4 pb-2 border-bottom" data-aos="fade-down">
          <div>
            <span
              className="badge text-white px-3 py-1-5 rounded-pill shadow-sm mb-2 d-inline-block"
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ef4444 0%, #f59f00 100%)'
              }}
            >
              <Sparkles size={12} className="me-1" /> RECENT LAUNCHES
            </span>
            <h2 className="h3 fw-extrabold text-dark m-0">
              Featured <span style={{ background: 'linear-gradient(135deg, #ef4444, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Properties</span>
            </h2>
          </div>

          <div className="d-none d-sm-block">
            <span className="badge rounded-pill bg-white text-dark border px-3 py-2 shadow-sm fw-bold">
              {properties.length} Active Assets
            </span>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm my-4">
            <h5 className="text-dark fw-bold m-0">No properties listed yet.</h5>
          </div>
        ) : (
          <div className="row g-3 g-md-4">
            {properties.map((item, index) => (
              <PropertyCardApp key={item.id} item={item} index={index} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}