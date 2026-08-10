import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Target,
  Eye,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

const AboutUsHomeSection = () => {
  const [activeTab, setActiveTab] = useState('vision');

  // Dynamic AOS Script Injector
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/aos@next/dist/aos.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.onload = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-in-out'
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="about-us-home-alt"
      className="py-5 position-relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(248, 250, 252, 0.94) 0%, rgba(238, 242, 255, 0.96) 100%), url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* GLOW DECORATIONS */}
      <div
        className="position-absolute rounded-circle pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 70%)',
          top: '-150px',
          left: '-150px',
          filter: 'blur(45px)',
          zIndex: 0
        }}
      />
      <div
        className="position-absolute rounded-circle pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          bottom: '-100px',
          right: '-100px',
          filter: 'blur(40px)',
          zIndex: 0
        }}
      />

      <div className="container position-relative z-1 py-4">
        <div className="row align-items-center g-5">

          {/* LEFT COLUMN - CONTENT & INTERACTIVE TABS */}
          <div className="col-lg-6" data-aos="fade-right">
            <span
              className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill text-uppercase fw-bold small mb-3 text-white shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Sparkles size={16} />
              Who We Are
            </span>

            <h2 className="display-6 fw-bold text-dark mb-3">
              Building Legacy Structures with <span style={{ background: 'linear-gradient(135deg, #2563eb, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Unmatched Precision</span>
            </h2>

            <p className="text-secondary fs-6 mb-4">
              CJ Group is a premier real estate developer committed to redefining urban infrastructure through smart technology, sustainable engineering, and transparent client partnerships.
            </p>

            {/* TAB SELECTOR BUTTONS */}
            <div className="d-flex gap-2 p-1 rounded-4 glass-card mb-4" style={{ background: 'rgba(255, 255, 255, 0.6)' }}>
              <button
                onClick={() => setActiveTab('vision')}
                className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all d-flex align-items-center justify-content-center gap-2 ${activeTab === 'vision' ? 'bg-primary text-white shadow-sm' : 'text-dark border-0'
                  }`}
              >
                <Eye size={16} /> Our Vision
              </button>
              <button
                onClick={() => setActiveTab('mission')}
                className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all d-flex align-items-center justify-content-center gap-2 ${activeTab === 'mission' ? 'bg-primary text-white shadow-sm' : 'text-dark border-0'
                  }`}
              >
                <Target size={16} /> Our Mission
              </button>
              <button
                onClick={() => setActiveTab('quality')}
                className={`btn flex-fill py-2 rounded-3 fw-bold small transition-all d-flex align-items-center justify-content-center gap-2 ${activeTab === 'quality' ? 'bg-primary text-white shadow-sm' : 'text-dark border-0'
                  }`}
              >
                <Award size={16} /> Quality Assurance
              </button>
            </div>

            {/* DYNAMIC TAB CONTENT CARD */}
            <div className="p-4 rounded-4 glass-card shadow-sm mb-4 border-0">
              {activeTab === 'vision' && (
                <div data-aos="fade-in">
                  <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                    <Eye className="text-primary" size={20} /> Sustainable Urban Landmarks
                  </h6>
                  <p className="small text-muted mb-0">
                    To pioneer eco-friendly residential and commercial hubs across India that seamlessly blend modern luxury with long-term environmental sustainability.
                  </p>
                </div>
              )}

              {activeTab === 'mission' && (
                <div data-aos="fade-in">
                  <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                    <Target className="text-success" size={20} /> Timely Delivery & Transparency
                  </h6>
                  <p className="small text-muted mb-0">
                    To provide 100% legal RERA registered properties delivered strictly on-schedule with zero compromises on raw material standards and construction quality.
                  </p>
                </div>
              )}

              {activeTab === 'quality' && (
                <div data-aos="fade-in">
                  <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                    <Award className="text-warning" size={20} /> Certified Structural Standards
                  </h6>
                  <p className="small text-muted mb-0">
                    Every project undergoes multi-layer structural safety audits designed by top-tier certified architects and earthquake-resistant engineering protocols.
                  </p>
                </div>
              )}
            </div>

            {/* KEY STATS BAR */}
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="p-3 rounded-4 text-center glass-card">
                  <h4 className="fw-bold text-primary mb-0">50+</h4>
                  <small className="text-muted fw-medium">Projects Done</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 rounded-4 text-center glass-card">
                  <h4 className="fw-bold text-success mb-0">100%</h4>
                  <small className="text-muted fw-medium">On-Time Delivery</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 rounded-4 text-center glass-card">
                  <h4 className="fw-bold text-purple mb-0" style={{ color: '#7c3aed' }}>25+</h4>
                  <small className="text-muted fw-medium">Awards Won</small>
                </div>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <a
                href="/about"
                className="btn px-4 py-3 fw-bold rounded-3 shadow-sm d-inline-flex align-items-center gap-2 text-white"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)', border: 'none' }}
              >
                Discover Our Story <ArrowRight size={18} />
              </a>
              <a
                href="#projects"
                className="btn btn-outline-dark px-4 py-3 fw-bold rounded-3 glass-btn d-inline-flex align-items-center gap-2"
              >
                View Projects <ChevronRight size={18} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - STACKED GLASS GRID WITH MULTIPLE PHOTOS */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="position-relative">

              {/* MAIN TOP IMAGE */}
              <div className="rounded-4 overflow-hidden shadow-lg border border-4 border-white mb-4">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop"
                  alt="Modern Architectural Tower"
                  className="img-fluid w-100 object-fit-cover"
                  style={{ maxHeight: '320px' }}
                />
              </div>

              {/* TWO SMALLER STACKED IMAGES */}
              <div className="row g-3">
                <div className="col-6">
                  <div className="rounded-4 overflow-hidden shadow-md border border-3 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
                      alt="Luxury Residential Villa"
                      className="img-fluid w-100 object-fit-cover"
                      style={{ height: '180px' }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="rounded-4 overflow-hidden shadow-md border border-3 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
                      alt="Commercial Hub Design"
                      className="img-fluid w-100 object-fit-cover"
                      style={{ height: '180px' }}
                    />
                  </div>
                </div>
              </div>

              {/* OVERLAY GLASS BADGE */}
              <div
                className="position-absolute top-50 start-0 translate-middle-y ms-n2 p-3 rounded-4 shadow-lg glass-card d-flex align-items-center gap-3 text-dark"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  maxWidth: '260px'
                }}
              >
                <div className="p-3 rounded-circle text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Eco-Friendly Living</h6>
                  <small className="text-muted">40% Integrated Green Area</small>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* GLASSMORPHISM & TRANSITION CSS */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          border: 1px solid rgba(255, 255, 255, 0.6) !important;
        }

        .glass-btn {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .transition-all:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
};

export default AboutUsHomeSection;