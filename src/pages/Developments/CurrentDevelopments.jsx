// src/components/CurrentDevelopments.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Sparkles, Building2, Mail, Phone, ShieldCheck } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);

  const adminPhone = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || '99139010000';
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'info@namoproperties.com';

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

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
      return matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const getStatusBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return { background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)', color: '#fff' };
      case 'under construction':
        return { background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', color: '#fff' };
      default:
        return { background: 'linear-gradient(135deg, #fcc419 0%, #f59f00 100%)', color: '#1e293b' };
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-white gap-3">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        <p className="text-muted fw-medium small tracking-wider uppercase">Loading Exclusive Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-vh-100 pb-5">

      {/* Hero Header with Embedded Searchbox Inside */}
      <section
        className="hero-image-bg text-white py-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(rgba(15, 23, 42, 0.78), rgba(30, 41, 59, 0.88)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80") center/cover no-repeat',
          paddingTop: '80px',
          paddingBottom: '90px',
          borderBottomLeftRadius: '36px',
          borderBottomRightRadius: '36px'
        }}
      >
        <div className="container py-4 text-center position-relative z-1" data-aos="zoom-in">
          <span className="badge bg-white bg-opacity-10 border border-white border-opacity-25 text-warning rounded-pill px-4 py-2 mb-3 d-inline-flex align-items-center gap-2 shadow-sm">
            <Sparkles size={14} className="text-warning animate-pulse" /> Exclusive Portfolio
          </span>
          <h1 className="display-4 fw-bold mb-3 tracking-tight">Current Developments</h1>
          <p className="lead text-light text-opacity-75 mx-auto fs-6 mb-4" style={{ maxWidth: '580px' }}>
            Discover the most anticipated architectural destinations and luxury residential spaces.
          </p>

          {/* Clean Glassmorphic Searchbox Embedded Directly in Hero */}
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="input-group rounded-pill bg-white bg-opacity-15 border border-white border-opacity-25 p-1 backdrop-blur shadow-lg">
                <span className="input-group-text bg-transparent border-0 text-white ps-3">
                  <Search size={20} className="text-warning" />
                </span>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 shadow-none text-white placeholder-light px-2 py-2 fs-6"
                  placeholder="Search by building name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ color: '#fff' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Results Header Info */}
      <div className="container mt-5 mb-2 d-flex justify-content-between align-items-center">
        <p className="text-secondary small fw-bold text-uppercase tracking-wider mb-0">
          Showing <span className="text-dark fw-extrabold fs-6">{filteredProjects.length}</span> Developments
        </p>
        <div className="d-flex align-items-center gap-1 text-muted small">
          <ShieldCheck size={16} className="text-success" /> Verified Properties
        </div>
      </div>

      {/* Cards Grid */}
      <section className="container mt-3">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-4 my-4 border border-dashed">
            <Building2 size={36} className="text-muted mb-2" />
            <h5 className="fw-bold text-dark">No developments found</h5>
            <p className="text-muted small">Try searching with a different building name or location.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProjects.map((item, idx) => (
              <div
                className="col-lg-4 col-md-6"
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <div
                  className="card h-100 dev-card bg-white shadow-sm border rounded-4 overflow-hidden"
                  onClick={() => navigate(`/development/${item.id}`)}
                  style={{ cursor: 'pointer' }}
                >

                  {/* Image Container */}
                  <div className="card-image-wrapper position-relative overflow-hidden rounded-top-4">
                    <img
                      src={item.img || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'}
                      alt={item.title || 'Development'}
                      className="w-100 h-100 object-fit-cover"
                      style={{ height: '240px' }}
                    />
                    <div className="image-overlay position-absolute inset-0"></div>

                    {/* Status Badge */}
                    <span
                      className="badge position-absolute top-0 start-0 m-3 text-uppercase fw-bold rounded-pill px-2.5 py-1 shadow-sm border-0"
                      style={{
                        fontSize: '0.62rem',
                        letterSpacing: '0.5px',
                        ...getStatusBadgeStyle(item.status)
                      }}
                    >
                      {item.status || 'Pre-Construction'}
                    </span>

                    {/* Price Badge */}
                    <span className="badge bg-dark bg-opacity-75 backdrop-blur position-absolute bottom-0 start-0 m-3 fw-bold px-3 py-1.5 rounded-3 shadow-sm" style={{ fontSize: '0.85rem' }}>
                      {item.price || 'Price on Request'}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold text-dark mb-1 text-truncate">
                      {item.title || 'Luxury Residence'}
                    </h5>

                    <div className="text-muted small mb-3 d-flex align-items-center gap-1">
                      <MapPin size={14} className="text-danger flex-shrink-0" />
                      <span className="text-truncate">{item.location || 'Prime Location'}</span>
                    </div>

                    {/* Specs Grid Box */}
                    <div className="row text-center py-2 bg-light rounded-3 g-0 my-auto border mb-3">
                      <div className="col border-end">
                        <small className="text-uppercase text-muted d-block fw-bold" style={{ fontSize: '0.6rem' }}>Beds</small>
                        <span className="fw-bold text-dark fs-6">{item.beds || '-'}</span>
                      </div>
                      <div className="col border-end">
                        <small className="text-uppercase text-muted d-block fw-bold" style={{ fontSize: '0.6rem' }}>Baths</small>
                        <span className="fw-bold text-dark fs-6">{item.baths || '-'}</span>
                      </div>
                      <div className="col">
                        <small className="text-uppercase text-muted d-block fw-bold" style={{ fontSize: '0.6rem' }}>Sq Ft</small>
                        <span className="fw-bold text-dark fs-6">{item.sqft || '-'}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="btn btn-dark w-100 mt-auto rounded-pill d-flex align-items-center justify-content-between py-2.5 px-3 fw-semibold shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/development/${item.id}`);
                      }}
                      style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)', border: 'none' }}
                    >
                      <span className="small">View Development Details</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Direct Contact Footer with Original Gradient */}
      <div className="container mt-5 pt-4">
        <section className="footer-cta-bg text-white py-5 px-4 shadow-sm rounded-4 position-relative overflow-hidden" data-aos="fade-up" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)' }}>
          <div className="container text-center py-3 position-relative z-1">
            <div className="mx-auto" style={{ maxWidth: '520px' }}>
              <h3 className="fw-bold mb-2 h4">Interested in These Developments? 📞</h3>
              <p className="text-light text-opacity-75 small mb-4">Connect directly with our elite advisory team for floor plans, availability, and private viewings.</p>

              <div className="row g-2 justify-content-center">
                <div className="col-6">
                  <a
                    href={`tel:${adminPhone}`}
                    className="btn btn-light rounded-pill py-2.5 w-100 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none shadow-sm fw-semibold text-dark"
                  >
                    <Phone size={15} />
                    <span className="text-truncate small">Call Us</span>
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href={`mailto:${adminEmail}`}
                    className="btn btn-outline-light rounded-pill py-2.5 w-100 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
                  >
                    <Mail size={15} />
                    <span className="text-truncate small">Email Us</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

    </div>
  );
}