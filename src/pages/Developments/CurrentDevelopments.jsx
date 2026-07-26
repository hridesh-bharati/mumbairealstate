import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Sparkles, Building2, Mail, Phone } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CurrentDevelopments.css';

export default function CurrentDevelopments() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Environment variables
  const adminPhone = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || '99139010000';
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'info@namoproperties.com';

  useEffect(() => {
    AOS.init({ duration: 600, once: true });

    const q = query(
      collection(db, "developments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const devProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(devProjects);
      setFilteredProjects(devProjects);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching developments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-success';
      case 'under construction': return 'bg-primary';
      default: return 'bg-warning text-dark';
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Loading luxury developments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* Hero Header with Background Image */}
      <section className="hero-image-bg text-white py-5">
        <div className="container py-4 text-center">
          <span className="badge bg-white bg-opacity-10 border border-white border-opacity-25 text-light rounded-pill px-3 py-2 mb-3 mt-5  d-inline-flex align-items-center backdrop-blur">
            <Sparkles size={14} className="me-1 text-warning" /> Luxury Collection
          </span>
          <h1 className="display-4 fw-bold mb-3">Current Developments</h1>
          <p className="lead text-light text-opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
            Discover New York's most anticipated residential destinations
          </p>
        </div>
      </section>

      {/* Filter Bar (Mobile Friendly Horizontal Scroll) */}
      <div className="bg-white border-bottom sticky-top shadow-sm py-3 z-3">
        <div className="container">
          <div className="row g-2 align-items-center">
            
            {/* Search Input */}
            <div className="col-12 col-md-5 col-lg-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 shadow-none rounded-end-3"
                  placeholder="Search by development or neighborhood..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter Buttons */}
            <div className="col-12 col-md-7 col-lg-6">
              <div className="d-flex flex-row flex-nowrap overflow-auto py-1 gap-2 filter-scroll justify-content-start justify-content-md-end">
                {statusOptions.map((status) => {
                  const isActive = activeFilter === status.toLowerCase();
                  return (
                    <button
                      key={status}
                      onClick={() => setActiveFilter(status.toLowerCase())}
                      className={`btn btn-sm rounded-pill px-3 text-nowrap fw-semibold ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mt-4">
        <p className="text-muted fw-semibold mb-0">
          Found {filteredProjects.length} stunning spaces
        </p>
      </div>

      {/* Cards Grid */}
      <section className="container mt-3">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm my-4">
            <Building2 size={48} className="text-muted mb-3" />
            <h4 className="fw-bold">No developments found</h4>
            <p className="text-muted mb-0">Check back soon for new luxury developments</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProjects.map((item, idx) => (
              <div
                className="col-lg-4 col-md-6"
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div
                  className="card h-100 border-0 shadow-sm dev-card bg-white cursor-pointer"
                  onClick={() => navigate(`/development/${item.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  
                  {/* Image Container */}
                  <div className="card-image-wrapper">
                    <img
                      src={item.img || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'}
                      alt={item.title}
                    />
                    
                    <div className="image-overlay"></div>

                    {/* Status Tag */}
                    <span className={`badge position-absolute top-0 start-0 m-3 text-uppercase fw-bold rounded-pill px-3 py-2 ${getStatusBadge(item.status)}`}>
                      {item.status || 'Pre-Construction'}
                    </span>

                    {/* Price Badge */}
                    <span className="badge bg-dark bg-opacity-75 backdrop-blur position-absolute bottom-0 start-0 m-3 fs-6 px-3 py-2 rounded-3">
                      {item.price || 'Coming Soon'}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold text-dark mb-1">
                      {item.title || 'Development'}
                    </h5>

                    <div className="text-muted small mb-3 d-flex align-items-center gap-1">
                      <MapPin size={15} className="text-secondary" />
                      <span>{item.location || 'Location coming soon'}</span>
                    </div>

                    {/* Specs Grid */}
                    <div className="row text-center py-2 border-top border-bottom g-0 my-auto">
                      <div className="col border-end">
                        <small className="text-uppercase text-muted d-block fw-semibold" style={{ fontSize: '0.65rem' }}>Beds</small>
                        <span className="fw-bold fs-6 text-dark">{item.beds || '-'}</span>
                      </div>
                      <div className="col border-end">
                        <small className="text-uppercase text-muted d-block fw-semibold" style={{ fontSize: '0.65rem' }}>Baths</small>
                        <span className="fw-bold fs-6 text-dark">{item.baths || '-'}</span>
                      </div>
                      <div className="col">
                        <small className="text-uppercase text-muted d-block fw-semibold" style={{ fontSize: '0.65rem' }}>Sq Ft</small>
                        <span className="fw-bold fs-6 text-dark">{item.sqft || '-'}</span>
                      </div>
                    </div>

                    {/* Features Tags */}
                    {item.features?.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 my-3">
                        {item.features.slice(0, 3).map((feature, i) => (
                          <span key={i} className="badge bg-light text-secondary border rounded-pill fw-normal px-2 py-1">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <button
                      className="btn btn-indigo w-100 mt-3 d-flex align-items-center justify-content-between"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/development/${item.id}`);
                      }}
                    >
                      <span>View details</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Direct Contact Section (Side-by-Side Call & Email) */}
      <section className="footer-cta-bg text-white py-5 mt-5">
        <div className="container text-center py-3">
          <div className="mx-auto" style={{ maxWidth: '550px' }}>
            <h3 className="fw-bold mb-2">Let's Connect Directly 📞</h3>
            <p className="text-light text-opacity-75 mb-4">Have questions about luxury developments? Get in touch with us immediately.</p>
            
            {/* Mobile aur Desktop dono me Side-By-Side (col-6) */}
            <div className="row g-2 justify-content-center">
              <div className="col-6">
                <a 
                  href={`tel:${adminPhone}`} 
                  className="btn btn-indigo rounded-pill py-2.5 w-100 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
                >
                  <Phone size={16} />
                  <span className="text-truncate">Call Us</span>
                </a>
              </div>
              <div className="col-6">
                <a 
                  href={`mailto:${adminEmail}`} 
                  className="btn btn-outline-light rounded-pill py-2.5 w-100 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
                >
                  <Mail size={16} />
                  <span className="text-truncate">Email Us</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}