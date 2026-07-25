import React from 'react';
import { Globe } from 'lucide-react';

export default function DevelopmentMarketingGroup() {
  return (
    <div className="bg-dark text-white font-sans overflow-hidden">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section 
        className="position-relative min-vh-100 d-flex align-items-end p-4 p-md-5"
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(10,14,18,0.95), rgba(10,14,18,0.3)), url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container py-5 text-center position-relative z-1">
          <div className="mx-auto" style={{ maxWidth: '850px' }}>
            <p className="fs-5 text-white-50 leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              At <strong className="text-white">CJ Group Development Marketing Group</strong>, we elevate modern real estate through strategic design, bespoke marketing, and unmatched developer services. Leveraging decades of experience and innovation, we transform developments into dynamic communities.
            </p>
            <button className="btn text-white rounded-0 px-4 py-2.5 text-uppercase fw-semibold tracking-wider" style={{ backgroundColor: '#583beb', fontSize: '12px' }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. NATIONAL PRESENCE (BOOTSTRAP CAROUSEL) ================= */}
      <section className="bg-white text-dark py-5 px-3 px-md-5">
        <div className="container py-4">
          <h2 className="display-5 fw-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            An Established National Presence in <span className="fst-italic" style={{ color: '#583beb' }}>New York</span>
          </h2>
          <p className="text-muted mb-4" style={{ maxWidth: '700px' }}>
            CJ Group has a track record in major real estate markets across the nation. Explore our premier residential portfolio and landmark developments today.
          </p>

          {/* Bootstrap Carousel */}
          <div id="luxuryResidencesCarousel" className="carousel slide shadow-lg rounded-0 overflow-hidden mt-4" data-bs-ride="carousel">
            <div className="carousel-indicators mb-3">
              <button type="button" data-bs-target="#luxuryResidencesCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
              <button type="button" data-bs-target="#luxuryResidencesCarousel" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#luxuryResidencesCarousel" data-bs-slide-to="2"></button>
              <button type="button" data-bs-target="#luxuryResidencesCarousel" data-bs-slide-to="3"></button>
            </div>

            <div className="carousel-inner">
              {/* Slide 1 */}
              <div className="carousel-item active" data-bs-interval="4000">
                <div 
                  className="d-flex align-items-end p-4 p-md-5"
                  style={{
                    minHeight: '480px',
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-white z-1">
                    <span className="text-uppercase tracking-widest text-white-50 small">New York • Manhattan</span>
                    <h3 className="fw-normal my-1" style={{ fontFamily: "'Playfair Display', serif" }}>High-Rise Luxury Residences</h3>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item" data-bs-interval="4000">
                <div 
                  className="d-flex align-items-end p-4 p-md-5"
                  style={{
                    minHeight: '480px',
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-white z-1">
                    <span className="text-uppercase tracking-widest text-white-50 small">New York • Brooklyn Waterfront</span>
                    <h3 className="fw-normal my-1" style={{ fontFamily: "'Playfair Display', serif" }}>Skyline Towers & Penthouses</h3>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="carousel-item" data-bs-interval="4000">
                <div 
                  className="d-flex align-items-end p-4 p-md-5"
                  style={{
                    minHeight: '480px',
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-white z-1">
                    <span className="text-uppercase tracking-widest text-white-50 small">New York • Upper East Side</span>
                    <h3 className="fw-normal my-1" style={{ fontFamily: "'Playfair Display', serif" }}>The Grand Arch Condos</h3>
                  </div>
                </div>
              </div>

              {/* Slide 4 */}
              <div className="carousel-item" data-bs-interval="4000">
                <div 
                  className="d-flex align-items-end p-4 p-md-5"
                  style={{
                    minHeight: '480px',
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-white z-1">
                    <span className="text-uppercase tracking-widest text-white-50 small">New York • Hudson Yards</span>
                    <h3 className="fw-normal my-1" style={{ fontFamily: "'Playfair Display', serif" }}>Urban Architectural Marvels</h3>
                  </div>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#luxuryResidencesCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#luxuryResidencesCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="text-center mt-5">
            <button className="btn text-white rounded-0 px-4 py-3 text-uppercase fw-semibold tracking-wider" style={{ backgroundColor: '#583beb', fontSize: '12px' }}>
              View Current Availability
            </button>
          </div>
        </div>
      </section>

      {/* ================= 3. DELIVERING THE NUMBERS (SLANTED INTERACTIVE STRIP) ================= */}
      <section className="bg-light text-dark py-5 border-top border-bottom overflow-hidden">
        <div className="container py-4">
          {/* Heading & Subtitle */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h2 className="display-5 fw-normal mb-0" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="fst-italic">Delivering</span> <strong className="fw-semibold">The Numbers</strong>
              </h2>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <p className="text-muted mb-0 ms-auto" style={{ maxWidth: '480px', fontSize: '0.95rem' }}>
                Sales. Faster and higher. That’s our goal, and it’s what we’ve delivered for top developers from coast to coast.
              </p>
            </div>
          </div>

          {/* Slanted Interactive Bar Wrapper */}
          <div className="numbers-slanted-wrapper shadow-lg my-4">
            
            {/* Box 1: $18B+ */}
            <div className="slanted-box hover-box-orange">
              <div className="slanted-content">
                <h1 className="display-4 fw-medium text-white mb-0">$18B+</h1>
                <span className="text-white-50 small mt-1 text-uppercase tracking-wider">Completed Sales</span>
              </div>
            </div>

            {/* Box 2: $23B+ (Purple Active Accent / Slanted) */}
            <div className="slanted-box hover-box-purple box-purple-default">
              <div className="slanted-content">
                <h1 className="display-4 fw-bold text-white mb-1">$23B+</h1>
                <span className="text-white opacity-90 text-uppercase fw-medium" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                  In New Development Sales & Rentals
                </span>
              </div>
            </div>

            {/* Box 3: 21K+ */}
            <div className="slanted-box hover-box-teal">
              <div className="slanted-content">
                <h1 className="display-4 fw-medium text-white mb-0">21K+</h1>
                <span className="text-white-50 small mt-1 text-uppercase tracking-wider">Units Represented</span>
              </div>
            </div>

            {/* Box 4: 11K+ */}
            <div className="slanted-box hover-box-gold">
              <div className="slanted-content">
                <h1 className="display-4 fw-medium text-white mb-0">11K+</h1>
                <span className="text-white-50 small mt-1 text-uppercase tracking-wider">Happy Clients</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. DEPTH OF EXPERTISE ================= */}
      <section className="bg-black text-white py-5">
        <div className="container py-4 text-center">
          <h2 className="display-5 fw-normal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            A Depth of <span className="fst-italic">Expertise</span>
          </h2>
          <p className="text-white-50 mb-5 mx-auto" style={{ maxWidth: '650px' }}>
            From planning and positioning to sales operations and creative marketing, CJ Group provides full-cycle advisory for visionary developers.
          </p>

          <div 
            className="position-relative border border-secondary border-opacity-25 rounded-0 overflow-hidden my-4"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '550px'
            }}
          >
            <div className="row g-0 h-100 position-relative z-1">
              <div className="col-6 border-end border-bottom border-white border-opacity-25 p-4 p-md-5 d-flex align-items-center justify-content-center" style={{ minHeight: '275px' }}>
                <span className="text-uppercase tracking-widest fw-semibold" style={{ fontSize: '13px' }}>RESEARCH & POSITIONING</span>
              </div>
              <div className="col-6 border-bottom border-white border-opacity-25 p-4 p-md-5 d-flex align-items-center justify-content-center" style={{ minHeight: '275px' }}>
                <span className="text-uppercase tracking-widest fw-semibold" style={{ fontSize: '13px' }}>MARKETING & BRANDING</span>
              </div>
              <div className="col-6 border-end border-white border-opacity-25 p-4 p-md-5 d-flex align-items-center justify-content-center" style={{ minHeight: '275px' }}>
                <span className="text-uppercase tracking-widest fw-semibold" style={{ fontSize: '13px' }}>PLANNING & DESIGN</span>
              </div>
              <div className="col-6 p-4 p-md-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '275px' }}>
                <span className="text-uppercase tracking-widest fw-semibold text-white mb-2" style={{ fontSize: '13px' }}>SALES / LEASING & OPERATIONS</span>
                <p className="small text-white-50 mb-0 d-none d-md-block" style={{ maxWidth: '300px' }}>
                  Offering comprehensive site management, contract execution, and operational strategy.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="tracking-widest text-uppercase mb-1" style={{ letterSpacing: '4px' }}>COMMITTEE</h4>
            <p className="text-uppercase small text-white-50 tracking-widest">FULL-SERVICE CREATIVE AGENCY</p>
          </div>
        </div>
      </section>

      {/* ================= 5. IN GOOD COMPANY ================= */}
      <section className="bg-white text-dark py-5">
        <div className="container py-4">
          <div className="row align-items-center mb-4">
            <div className="col-md-5">
              <h2 className="display-5 fw-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                In <span className="fst-italic">Good</span> Company
              </h2>
              <p className="text-muted">
                We are proud to work alongside leading developers, architectural visionaries, and investment groups nationwide.
              </p>
              <button className="btn text-white rounded-0 px-4 py-2.5 text-uppercase fw-semibold tracking-wider mt-2" style={{ backgroundColor: '#583beb', fontSize: '12px' }}>
                View Portfolio
              </button>
            </div>

            {/* Modern Brand Logos Grid */}
            <div className="col-md-7 mt-5 mt-md-0">
              <div className="row g-4 align-items-center text-center opacity-75">
                <div className="col-6 col-sm-4 p-3">
                  <div className="fw-bold tracking-widest text-uppercase fs-5" style={{ letterSpacing: '3px', fontFamily: 'serif' }}>OPTIMUM</div>
                </div>
                <div className="col-6 col-sm-4 p-3">
                  <div className="fw-bold fs-4" style={{ fontFamily: "'Playfair Display', serif" }}>Rudin</div>
                </div>
                <div className="col-6 col-sm-4 p-3">
                  <div className="fw-light tracking-widest text-uppercase" style={{ fontSize: '13px', letterSpacing: '4px' }}>SILVERSTEIN</div>
                </div>
                <div className="col-6 col-sm-4 p-3">
                  <div className="fw-bold text-uppercase fs-5" style={{ letterSpacing: '2px' }}>BLACKSTONE</div>
                </div>
                <div className="col-6 col-sm-4 p-3">
                  <div className="fw-bold tracking-wider fs-4" style={{ letterSpacing: '3px' }}>EXTELL</div>
                </div>
                <div className="col-6 col-sm-4 p-3">
                  <div className="fw-bold fs-4" style={{ fontFamily: 'monospace' }}>GLUCK+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. CTA SECTION ================= */}
      <section 
        className="text-white py-5 text-center position-relative"
        style={{
          backgroundColor: '#0a0e12',
          backgroundImage: 'radial-gradient(circle, rgba(88,59,235,0.15) 0%, transparent 70%)'
        }}
      >
        <div className="container py-5">
          <h2 className="display-5 fw-normal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="fst-italic">Experience</span> the Difference
          </h2>
          <button className="btn text-white rounded-0 px-5 py-3 text-uppercase fw-semibold tracking-wider" style={{ backgroundColor: '#583beb', fontSize: '12px' }}>
            Work With Us
          </button>
        </div>
      </section>

      {/* ================= 7. FOOTER ================= */}
      <footer className="bg-black text-white-50 py-5 border-top border-secondary border-opacity-25" style={{ fontSize: '12px' }}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-center gap-4 mb-4 text-white">
            
            {/* Instagram */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-75 hover-opacity-100">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>

            {/* Facebook */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-75 hover-opacity-100">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>

            {/* LinkedIn */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-75 hover-opacity-100">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>

            <Globe size={18} className="cursor-pointer opacity-75 hover-opacity-100" />
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <p className="mb-1 text-white">CJ Group Development Marketing Group</p>
              <p className="mb-0">Equal Housing Opportunity. All rights reserved.</p>
            </div>
            <div className="col-md-8 text-md-end">
              <p className="mb-0">
                CJ Group is a licensed real estate broker operating under state law. All material presented herein is intended for informational purposes only. Information is compiled from sources deemed reliable but is subject to errors, omissions, changes in price, condition, sale, or withdrawal without notice.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= COMPONENT SCOPED CSS ================= */}
      <style>{`
        /* Container Wrapper for Numbers */
        .numbers-slanted-wrapper {
          display: flex;
          background-color: #181b1f;
          min-height: 190px;
          overflow: hidden;
          position: relative;
        }

        /* Base Slanted (Tirchha) Parallelogram Box */
        .slanted-box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background-color: #181b1f; /* Default Dark BG */
          cursor: pointer;
          transition: background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          
          /* Angle Cut Slanted Polygon */
          clip-path: polygon(14% 0, 100% 0, 86% 100%, 0% 100%);
          margin-left: -2%; /* Blends slanted borders together */
        }

        .slanted-box:first-child {
          clip-path: polygon(0 0, 100% 0, 86% 100%, 0% 100%);
          margin-left: 0;
        }

        .slanted-box:last-child {
          clip-path: polygon(14% 0, 100% 0, 100% 100%, 0% 100%);
        }

        .box-purple-default {
          background-color: #583beb; /* Default Purple for Box 2 */
        }

        /* Inner Text Content */
        .slanted-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem;
          z-index: 2;
        }

        /* Individual Hover Color Transitions (Tirchha Cut Protected) */
        .hover-box-orange:hover {
          background-color: #ff5722 !important;
        }

        .hover-box-purple:hover {
          background-color: #3b1fb5 !important;
        }

        .hover-box-teal:hover {
          background-color: #00897b !important;
        }

        .hover-box-gold:hover {
          background-color: #d4af37 !important;
        }

        .hover-opacity-100:hover {
          opacity: 1 !important;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        /* Mobile Layout Handling */
        @media (max-width: 768px) {
          .numbers-slanted-wrapper {
            flex-direction: column;
          }
          .slanted-box, 
          .slanted-box:first-child, 
          .slanted-box:last-child {
            clip-path: none !important;
            margin-left: 0 !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>

    </div>
  );
}