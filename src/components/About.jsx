import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Target,
  Eye,
  Award,
  ChevronRight,
  Building2,
  CheckCircle2,
  Trophy
} from 'lucide-react';

const AboutUsHomeSection = () => {
  const [activeTab, setActiveTab] = useState('vision');

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
          duration: 600,
          once: true,
          easing: 'ease-out'
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  // Image waale exact Gradient colors aur Outer Ring Borders
  const getTabTheme = () => {
    switch (activeTab) {
      case 'vision':
        return {
          cardBg: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
          borderColor: '#e03131',
          iconBg: 'linear-gradient(135deg, #ff4d4d 0%, #dc2626 100%)',
          textColor: '#c92a2a',
          ringColor: '#ff8787'
        };
      case 'mission':
        return {
          cardBg: 'linear-gradient(135deg, #fff9db 0%, #fff3bf 100%)',
          borderColor: '#f59f00',
          iconBg: 'linear-gradient(135deg, #fcc419 0%, #f59f00 100%)',
          textColor: '#e67700',
          ringColor: '#ffe066'
        };
      case 'quality':
        return {
          cardBg: 'linear-gradient(135deg, #e7f5ff 0%, #d0ebff 100%)',
          borderColor: '#1c7ed6',
          iconBg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          textColor: '#1864ab',
          ringColor: '#74c0fc'
        };
      default:
        return {};
    }
  };

  const currentTheme = getTabTheme();

  return (
    <section
      id="about-us-home-alt"
      className="py-4 py-md-5 position-relative overflow-hidden user-select-none"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: `radial-gradient(circle at 10% 20%, rgba(224, 49, 49, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(2, 132, 199, 0.05) 0%, transparent 40%)`
      }}
    >
      <div className="container position-relative z-1 py-2">
        <div className="row align-items-center g-4">

          {/* LEFT COLUMN - MOBILE APP UI WITH GRADIENT ICONS */}
          <div className="col-lg-6" data-aos="fade-up">

            {/* Top Tag Pill */}
            <div className="mb-3 text-center w-100">
              <span
                className="d-inline-flex align-items-center text-center gap-2 px-4 py-1-5 rounded-pill text-white shadow-sm"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #f59f00 100%)'
                }}
              >
                <Sparkles size={12} /> WHO WE ARE
              </span>
            </div>

            {/* Mobile App Title */}
            <h2 className="fw-extrabold text-dark mb-2 fs-3 fs-md-2 tracking-tight">
              Building Legacy Structures with{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #0284c7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Precision
              </span>
            </h2>

            <p className="text-secondary small mb-3 lh-sm">
              CJ Group redefines urban living with smart technology, sustainable engineering, and 100% legal RERA transparency.
            </p>

            {/* APP-LIKE TAB BAR WITH IMAGE GRADIENTS */}
            <div
              className="p-1 rounded-4 shadow-sm mb-3 d-flex gap-1"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0'
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                className={`btn flex-fill py-2 rounded-3 fw-bold transition-all d-flex align-items-center justify-content-center gap-1-5 ${activeTab === 'vision' ? 'text-white shadow-sm' : 'text-muted border-0'
                  }`}
                style={{
                  fontSize: '0.78rem',
                  background: activeTab === 'vision' ? 'linear-gradient(135deg, #ff4d4d 0%, #dc2626 100%)' : 'transparent'
                }}
              >
                <Eye size={15} /> <span>Vision</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mission')}
                className={`btn flex-fill py-2 rounded-3 fw-bold transition-all d-flex align-items-center justify-content-center gap-1-5 ${activeTab === 'mission' ? 'text-dark shadow-sm' : 'text-muted border-0'
                  }`}
                style={{
                  fontSize: '0.78rem',
                  background: activeTab === 'mission' ? 'linear-gradient(135deg, #fcc419 0%, #f59f00 100%)' : 'transparent'
                }}
              >
                <Target size={15} /> <span>Mission</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('quality')}
                className={`btn flex-fill py-2 rounded-3 fw-bold transition-all d-flex align-items-center justify-content-center gap-1-5 ${activeTab === 'quality' ? 'text-white shadow-sm' : 'text-muted border-0'
                  }`}
                style={{
                  fontSize: '0.78rem',
                  background: activeTab === 'quality' ? 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)' : 'transparent'
                }}
              >
                <Award size={15} /> <span>Quality</span>
              </button>
            </div>

            {/* DYNAMIC TAB CARD WITH RING GRADIENT ICON */}
            <div
              className="p-3 rounded-4 shadow-sm mb-3 border-start border-4 transition-all"
              style={{
                background: currentTheme.cardBg,
                borderColor: currentTheme.borderColor
              }}
            >
              {activeTab === 'vision' && (
                <div className="d-flex align-items-center gap-3" data-aos="zoom-in-up">
                  {/* Outer Ring Circle Like Image */}
                  <div
                    className="rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ border: `2px solid ${currentTheme.ringColor}` }}
                  >
                    <div
                      className="rounded-circle text-white shadow-sm d-flex align-items-center justify-content-center"
                      style={{ background: currentTheme.iconBg, width: '42px', height: '42px' }}
                    >
                      <Eye size={20} />
                    </div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 small text-dark">Sustainable Urban Landmarks</h6>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                      Pioneering eco-friendly residential & commercial hubs with modern luxury standards.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'mission' && (
                <div className="d-flex align-items-center gap-3" data-aos="zoom-in-up">
                  <div
                    className="rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ border: `2px solid ${currentTheme.ringColor}` }}
                  >
                    <div
                      className="rounded-circle text-dark shadow-sm d-flex align-items-center justify-content-center"
                      style={{ background: currentTheme.iconBg, width: '42px', height: '42px' }}
                    >
                      <Target size={20} />
                    </div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 small text-dark">100% On-Time & Legal</h6>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                      RERA registered properties with strict schedule delivery and raw material checks.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'quality' && (
                <div className="d-flex align-items-center gap-3" data-aos="zoom-in-up">
                  <div
                    className="rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ border: `2px solid ${currentTheme.ringColor}` }}
                  >
                    <div
                      className="rounded-circle text-white shadow-sm d-flex align-items-center justify-content-center"
                      style={{ background: currentTheme.iconBg, width: '42px', height: '42px' }}
                    >
                      <Award size={20} />
                    </div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 small text-dark">Structural Safety Audits</h6>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                      Multi-layer certified architect checks with earthquake-resistant engineering.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* APP WIDGET STATS ROW WITH CIRCULAR GRADIENTS */}
            <div className="row g-2 mb-3">
              {/* Red Gradient Widget */}
              <div className="col-4">
                <div
                  className="p-2 rounded-4 text-center border-0 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center"
                  style={{ background: '#ffffff' }}
                >
                  <div
                    className="rounded-circle p-0-5 d-flex align-items-center justify-content-center mb-1"
                    style={{ border: '2px solid #ff8787' }}
                  >
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center"
                      style={{ background: 'linear-gradient(135deg, #ff4d4d, #dc2626)', width: '32px', height: '32px' }}
                    >
                      <Building2 size={16} />
                    </div>
                  </div>
                  <h5 className="fw-bold mb-0 text-dark fs-6">50+</h5>
                  <small className="text-muted fw-semibold" style={{ fontSize: '0.65rem' }}>Projects</small>
                </div>
              </div>

              {/* Green Gradient Widget */}
              <div className="col-4">
                <div
                  className="p-2 rounded-4 text-center border-0 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center"
                  style={{ background: '#ffffff' }}
                >
                  <div
                    className="rounded-circle p-0-5 d-flex align-items-center justify-content-center mb-1"
                    style={{ border: '2px solid #86efac' }}
                  >
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center"
                      style={{ background: 'linear-gradient(135deg, #34d399, #059669)', width: '32px', height: '32px' }}
                    >
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <h5 className="fw-bold mb-0 text-dark fs-6">100%</h5>
                  <small className="text-muted fw-semibold" style={{ fontSize: '0.65rem' }}>On-Time</small>
                </div>
              </div>

              {/* Blue Gradient Widget */}
              <div className="col-4">
                <div
                  className="p-2 rounded-4 text-center border-0 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center"
                  style={{ background: '#ffffff' }}
                >
                  <div
                    className="rounded-circle p-0-5 d-flex align-items-center justify-content-center mb-1"
                    style={{ border: '2px solid #74c0fc' }}
                  >
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center"
                      style={{ background: 'linear-gradient(135deg, #38bdf8, #0284c7)', width: '32px', height: '32px' }}
                    >
                      <Trophy size={16} />
                    </div>
                  </div>
                  <h5 className="fw-bold mb-0 text-dark fs-6">25+</h5>
                  <small className="text-muted fw-semibold" style={{ fontSize: '0.65rem' }}>Awards</small>
                </div>
              </div>
            </div>

            {/* APP ACTION BUTTONS */}
            <div className="row g-2">
              <div className="col-7">
                <a
                  href="/about"
                  className="btn w-100 py-2-5 px-2 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-1-5 text-white active-scale"
                  style={{
                    background: 'linear-gradient(135deg, #ff4d4d 0%, #dc2626 100%)',
                    fontSize: '0.8rem',
                    border: 'none'
                  }}
                >
                  <span>Our Story</span> <ArrowRight size={15} />
                </a>
              </div>
              <div className="col-5">
                <a
                  href="#projects"
                  className="btn btn-light w-100 py-2-5 px-2 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-1 text-dark active-scale"
                  style={{ fontSize: '0.8rem', border: '1px solid #e2e8f0' }}
                >
                  <span>Projects</span> <ChevronRight size={15} />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - MOBILE IMAGE CARDS WITH GREEN GRADIENT BADGE */}
          <div className="col-lg-6" data-aos="fade-up">
            <div className="position-relative">

              {/* MAIN TOP IMAGE */}
              <div className="rounded-4 overflow-hidden shadow-sm border border-2 border-white mb-2">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop"
                  alt="Modern Architectural Tower"
                  className="img-fluid w-100 object-fit-cover"
                  style={{ height: '180px' }}
                />
              </div>

              {/* TWO SMALLER IMAGES */}
              <div className="row g-2">
                <div className="col-6">
                  <div className="rounded-4 overflow-hidden shadow-sm border border-2 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
                      alt="Luxury Residential Villa"
                      className="img-fluid w-100 object-fit-cover"
                      style={{ height: '100px' }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="rounded-4 overflow-hidden shadow-sm border border-2 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
                      alt="Commercial Hub Design"
                      className="img-fluid w-100 object-fit-cover"
                      style={{ height: '100px' }}
                    />
                  </div>
                </div>
              </div>

              {/* OVERLAY BADGE WITH IMAGE GREEN GRADIENT */}
              <div
                className="position-absolute bottom-0 start-50 translate-middle-x p-2 rounded-3 shadow-lg d-flex align-items-center gap-2 text-dark mb-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid #e2e8f0',
                  width: '85%'
                }}
              >
                <div
                  className="rounded-circle p-0-5 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ border: '2px solid #86efac' }}
                >
                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center"
                    style={{ background: 'linear-gradient(135deg, #34d399, #059669)', width: '28px', height: '28px' }}
                  >
                    <CheckCircle2 size={15} />
                  </div>
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.72rem' }}>Prime Green Living</h6>
                  <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>40% Green Area Land Plot</small>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .transition-all {
          transition: all 0.25s ease-in-out;
        }

        .active-scale:active {
          transform: scale(0.96);
        }

        .fw-extrabold {
          font-weight: 800;
        }

        .py-1-5 {
          padding-top: 0.35rem !important;
          padding-bottom: 0.35rem !important;
        }

        .py-2-5 {
          padding-top: 0.65rem !important;
          padding-bottom: 0.65rem !important;
        }

        .gap-1-5 {
          gap: 0.38rem !important;
        }

        .p-0-5 {
          padding: 2px !important;
        }
      `}</style>
    </section>
  );
};

export default AboutUsHomeSection;