// src/pages/Developments/CurrentDevelopments.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ← Add this import
import { Search, MapPin, ArrowRight, Filter, Sparkles, Building2 } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CurrentDevelopments.css';

export default function CurrentDevelopments() {
  const navigate = useNavigate(); // ← Add this hook
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 100 });

    // Real-time listener for developments collection
    const q = query(
      collection(db, "developments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const devProjects = [];
      snapshot.forEach((doc) => {
        devProjects.push({ id: doc.id, ...doc.data() });
      });
      setProjects(devProjects);
      setFilteredProjects(devProjects);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching developments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter Logic
  useEffect(() => {
    const filtered = projects.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeFilter === 'all' || item.status === activeFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredProjects(filtered);
  }, [searchTerm, activeFilter, projects]);

  const statusOptions = ['All', 'Pre-Construction', 'Under Construction', 'Completed'];

  if (loading) {
    return (
      <div className="developments-wrapper">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading luxury developments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="developments-wrapper">

      {/* Hero Header */}
      <div className="developments-hero">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="badge-hero">
                <Sparkles size={14} className="me-1" />
                Luxury Collection
              </span>
              <h1 className="hero-title">Current Developments</h1>
              <p className="hero-subtitle">Discover New York's most anticipated residential destinations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Bar */}
      <div className="filter-bar">
        <div className="container">
          <div className="filter-bar-inner">
            {/* Search */}
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by development or neighborhood..."
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>

            {/* Status Filters */}
            <div className="status-filters">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className={`status-btn ${activeFilter === status.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setActiveFilter(status.toLowerCase())}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <button className="filter-btn">
              <Filter size={16} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mt-4">
        <div className="results-count">
          <span>Found {filteredProjects.length} stunning spaces</span>
        </div>
      </div>

      {/* Enhanced Grid */}
      <section className="developments-grid py-4">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-5">
              <Building2 size={48} className="text-muted mb-3" />
              <h4>No developments found</h4>
              <p className="text-muted">Check back soon for new luxury developments</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProjects.map((item, idx) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/development/${item.id}`)}
                >
                  <div className="development-card">

                    {/* Image Container */}
                    <div className="card-image-wrapper">
                      <img
                        src={item.img || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'}
                        alt={item.title}
                        className="card-image"
                      />

                      {/* Status Tag */}
                      <div className={`status-tag status-${item.status?.replace(' ', '-') || 'pre-construction'}`}>
                        {item.status?.toUpperCase() || 'PRE-CONSTRUCTION'}
                      </div>

                      {/* Price Badge */}
                      <div className="price-badge">{item.price || 'Coming Soon'}</div>

                      {/* Overlay Gradient */}
                      <div className="image-overlay"></div>
                    </div>

                    {/* Card Content */}
                    <div className="card-content">
                      <h3 className="card-title">{item.title || 'Development'}</h3>

                      <div className="card-location">
                        <MapPin size={14} className="location-icon" />
                        <span>{item.location || 'Location coming soon'}</span>
                      </div>

                      {/* Specs */}
                      <div className="card-specs">
                        <div className="spec-item">
                          <span className="spec-label">Beds</span>
                          <span className="spec-value">{item.beds || '-'}</span>
                        </div>
                        <div className="spec-divider"></div>
                        <div className="spec-item">
                          <span className="spec-label">Baths</span>
                          <span className="spec-value">{item.baths || '-'}</span>
                        </div>
                        <div className="spec-divider"></div>
                        <div className="spec-item">
                          <span className="spec-label">Sq Ft</span>
                          <span className="spec-value">{item.sqft || '-'}</span>
                        </div>
                      </div>

                      {/* Features Tags */}
                      {item.features && item.features.length > 0 && (
                        <div className="features-tags mt-2">
                          {item.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="feature-tag">{feature}</span>
                          ))}
                          {item.features.length > 3 && (
                            <span className="feature-tag">+{item.features.length - 3}</span>
                          )}
                        </div>
                      )}

                      <button
                        className="card-cta"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent double navigation
                          navigate(`/development/${item.id}`);
                        }}
                      >
                        <span>View details</span>
                        <ArrowRight size={16} className="cta-arrow" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-wrapper">
            <div className="newsletter-content">
              <h3>Let's Stay in Touch 📬</h3>
              <p>Get exclusive access to premium properties before they even hit the market.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Drop your email here..." />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}