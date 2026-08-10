import React from 'react';
import {
  Building2,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Download
} from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-5 bg-light position-relative overflow-hidden">
      {/* Background Decorative Gold Accent Blur */}
      <div
        className="position-absolute rounded-circle opacity-10 pointer-events-none"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)',
          top: '-100px',
          right: '-100px',
          zIndex: 0
        }}
      />

      <div className="container position-relative z-1 py-3">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span
            className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill text-uppercase fw-bold small mb-3 shadow-sm"
            style={{
              backgroundColor: 'rgba(201, 168, 76, 0.12)',
              color: '#a38128',
              border: '1px solid rgba(201, 168, 76, 0.3)'
            }}
          >
            <Sparkles size={16} className="text-warning" />
            Redefining Luxury Living
          </span>
          <h2 className="display-5 fw-bold text-dark mb-3">
            Welcome to <span style={{ color: '#c9a84c' }}>CJ Group Developers</span>
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '780px' }}>
            Engineering iconic architectural landmarks and sustainable premium residential spaces that transform urban landscapes and elevate luxury living standards.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="row align-items-center g-5 mb-5">
          {/* Image Column with Overlays */}
          <div className="col-lg-6">
            <div className="position-relative">
              {/* Main Image */}
              <div className="rounded-4 overflow-hidden shadow-lg border border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=650&fit=crop"
                  alt="CJ Group Luxury Real Estate"
                  className="img-fluid w-100 object-fit-cover"
                  style={{ minHeight: '480px', maxHeight: '540px' }}
                />
              </div>

              {/* Top Right Floating Dark Gold Badge */}
              <div
                className="position-absolute top-0 end-0 m-3 m-md-4 p-3 p-md-4 rounded-4 shadow-lg text-white"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  borderLeft: '4px solid #c9a84c'
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle bg-warning bg-opacity-20 text-warning">
                    <Award size={30} style={{ color: '#c9a84c' }} />
                  </div>
                  <div>
                    <h3 className="h2 fw-bold mb-0" style={{ color: '#c9a84c' }}>10+</h3>
                    <p className="small mb-0 text-light opacity-75 fw-medium">Years of Architectural Excellence</p>
                  </div>
                </div>
              </div>

              {/* Bottom Left Floating Quality Badge */}
              <div
                className="position-absolute bottom-0 start-0 m-3 m-md-4 p-3 rounded-4 shadow-lg bg-white border border-light d-flex align-items-center gap-3"
                style={{ maxWidth: '280px' }}
              >
                <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
                  <TrendingUp size={26} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">100% Quality Assurance</h6>
                  <small className="text-muted">Eco-friendly & Sustainable</small>
                </div>
              </div>
            </div>
          </div>

          {/* Information & Features Column */}
          <div className="col-lg-6">
            <h3 className="h2 fw-bold mb-3" style={{ color: '#1a1a2e' }}>
              We Build Iconic Structures That Express Elegance & Durability
            </h3>
            <p className="text-secondary fs-6 mb-4">
              At CJ Group, we combine cutting-edge design, premium raw materials, and eco-friendly engineering to deliver high-end commercial hubs, prime plot developments, and luxury residential towers.
            </p>

            {/* 2x2 Feature Cards */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <div className="p-3 rounded-3 bg-white shadow-sm border border-1 h-100 d-flex align-items-start gap-3">
                  <div className="p-2 rounded bg-primary bg-opacity-10 text-primary">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">Smart Infrastructure</h6>
                    <p className="small text-muted mb-0">State-of-the-art automated living designs.</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="p-3 rounded-3 bg-white shadow-sm border border-1 h-100 d-flex align-items-start gap-3">
                  <div className="p-2 rounded bg-warning bg-opacity-10 text-warning">
                    <Award size={22} style={{ color: '#c9a84c' }} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">Prime Locations</h6>
                    <p className="small text-muted mb-0">Strategic hubs for high investment growth.</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="p-3 rounded-3 bg-white shadow-sm border border-1 h-100 d-flex align-items-start gap-3">
                  <div className="p-2 rounded bg-success bg-opacity-10 text-success">
                    <Users size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">500+ Happy Clients</h6>
                    <p className="small text-muted mb-0">Trusted worldwide for quality real estate.</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="p-3 rounded-3 bg-white shadow-sm border border-1 h-100 d-flex align-items-start gap-3">
                  <div className="p-2 rounded bg-info bg-opacity-10 text-info">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">100% Legal RERA</h6>
                    <p className="small text-muted mb-0">Transparent verification & clear titles.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Bullet Highlights */}
            <ul className="list-unstyled mb-4">
              <li className="d-flex align-items-center mb-2">
                <CheckCircle2 className="me-2 flex-shrink-0" size={18} style={{ color: '#c9a84c' }} />
                <span className="fw-medium text-dark">Hassle-free documentation & instant registration support</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <CheckCircle2 className="me-2 flex-shrink-0" size={18} style={{ color: '#c9a84c' }} />
                <span className="fw-medium text-dark">Designed by top-tier certified architects & structural engineers</span>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap gap-3 align-items-center pt-2">
              <a
                href="#contact"
                className="btn px-4 py-3 fw-bold rounded-3 shadow-sm d-inline-flex align-items-center gap-2 text-white"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c 0%, #a38128 100%)',
                  border: 'none'
                }}
              >
                Get In Touch <ArrowRight size={18} />
              </a>
              <a
                href="#projects"
                className="btn btn-outline-dark px-4 py-3 fw-bold rounded-3 d-inline-flex align-items-center gap-2"
              >
                <Download size={18} /> Brochure
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metric Counter Bar */}
        <div
          className="p-4 rounded-4 shadow text-white mt-5"
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%)' }}
        >
          <div className="row text-center g-4">
            <div className="col-6 col-md-3 border-end border-secondary border-opacity-25">
              <h3 className="display-6 fw-bold mb-1" style={{ color: '#c9a84c' }}>50+</h3>
              <p className="text-uppercase small mb-0 text-light opacity-75 fw-semibold">Completed Projects</p>
            </div>
            <div className="col-6 col-md-3 border-md-end border-secondary border-opacity-25">
              <h3 className="display-6 fw-bold mb-1" style={{ color: '#c9a84c' }}>12+</h3>
              <p className="text-uppercase small mb-0 text-light opacity-75 fw-semibold">Ongoing Townships</p>
            </div>
            <div className="col-6 col-md-3 border-end border-secondary border-opacity-25">
              <h3 className="display-6 fw-bold mb-1" style={{ color: '#c9a84c' }}>100%</h3>
              <p className="text-uppercase small mb-0 text-light opacity-75 fw-semibold">On-Time Delivery</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="display-6 fw-bold mb-1" style={{ color: '#c9a84c' }}>25+</h3>
              <p className="text-uppercase small mb-0 text-light opacity-75 fw-semibold">National Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;