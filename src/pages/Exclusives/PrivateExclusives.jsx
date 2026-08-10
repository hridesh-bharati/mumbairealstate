import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  ArrowRight,
  Eye,
  ShieldCheck,
  Lock,
  Sparkles,
  Search,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react';
import './PrivateExclusives.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PrivateExclusives() {
  const adminName = import.meta.env.VITE_ADMIN_NAME || "MR. Jugal Modi";
  const adminContact = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000";

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', zipCode: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = `Hello ${adminName}, I am interested in CJ Group Private Exclusives.%0A%0A*Details:*%0A- Name: ${formData.name}%0A- Email: ${formData.email}%0A- Phone: ${formData.phone}%0A- Target ZIP Code: ${formData.zipCode}`;
    window.open(`https://wa.me/${adminContact}?text=${message}`, '_blank');
  };

  const openWhatsAppDirect = () => {
    const defaultMessage = `Hello ${adminName}, I would like to gain early access to CJ Group Private Exclusives network. Please share the verified off-market ledger.`;
    window.open(`https://wa.me/${adminContact}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
  };

  return (
    <div className="private-page-wrapper bg-white overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="private-hero-bg position-relative min-vh-100 d-flex align-items-center py-5">
        <div className="container position-relative z-2 pt-4">
          <div className="row align-items-center g-5 text-start">

            <div className="col-lg-7 text-white" data-aos="fade-right">
              <span className="badge bg-warning text-dark text-uppercase fw-bold px-3 py-2 rounded-pill small mb-3 d-inline-flex align-items-center gap-2">
                <Lock size={14} /> Off-Market Privilege
              </span>
              <h1 className="display-4 fw-bold mb-3 text-white" style={{ letterSpacing: '-1px' }}>
                Search properties listing before the public market.
              </h1>
              <p className="fs-6 text-white-50 mb-4 lh-lg">
                CJ Group Private Exclusives give you an unmatched competitive edge. Access luxury listings, elite investment hubs, and residential estates curated directly by <strong>{adminName}</strong> before they ever appear on public directories.
              </p>
              <button onClick={openWhatsAppDirect} className="btn btn-warning text-dark rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm">
                Request Private Access Token <ArrowRight size={18} />
              </button>
            </div>

            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="150">
              <div className="d-flex flex-column gap-3">
                <div className="metric-glass-card p-3 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-10 d-flex align-items-center gap-3 text-white shadow-sm">
                  <div className="bg-purple rounded-3 p-2.5 d-flex align-items-center justify-content-center text-white" style={{ width: 42, height: 42, backgroundColor: '#6f42c1' }}>
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">100% Confidential</h4>
                    <p className="small text-white-50 mb-0">Completely hidden from traditional public indexing tools</p>
                  </div>
                </div>

                <div className="metric-glass-card p-3 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-10 d-flex align-items-center gap-3 text-white shadow-sm">
                  <div className="bg-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center text-white" style={{ width: 42, height: 42 }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">Direct Deal Curation</h4>
                    <p className="small text-white-50 mb-0">Work firsthand with our verified investor workspace</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ROADMAP SECTION */}
      <section className="py-5 bg-white border-bottom border-top">
        <div className="container py-4 text-center">
          <span className="text-uppercase tracking-wider small fw-bold text-secondary" data-aos="fade-down">The Pipeline Matrix</span>
          <h2 className="fw-bold text-dark my-2" data-aos="fade-down" data-aos-delay="100">How Private Exclusives Work For You</h2>
          <p className="text-muted mx-auto mb-5 small" style={{ maxWidth: 600 }} data-aos="fade-down" data-aos-delay="150">
            Seamless, secure, and deliberate framework engineered for elite real estate acquisitions.
          </p>

          <div className="row g-4 text-start">
            <div className="col-md-4" data-aos="fade-up">
              <div className="p-4 h-100 bg-light rounded-4 border-0">
                <span className="badge text-white px-3 py-2 rounded-3 fw-bold mb-3 d-inline-block" style={{ backgroundColor: '#6f42c1' }}>01</span>
                <h5 className="fw-bold text-dark mb-2">Discrete Placement Matrix</h5>
                <p className="text-muted small mb-0">Sellers list their prime properties within our private catalog node, hiding details completely from competitors and commercial scrapers.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="p-4 h-100 bg-light rounded-4 border-0">
                <span className="badge bg-primary px-3 py-2 rounded-3 fw-bold mb-3 d-inline-block">02</span>
                <h5 className="fw-bold text-dark mb-2">Targeted Network Match</h5>
                <p className="text-muted small mb-0">Our backend system maps the off-market asset data to verified luxury buyers, routing matches via direct encrypted loops.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="p-4 h-100 bg-light rounded-4 border-0">
                <span className="badge bg-warning text-dark px-3 py-2 rounded-3 fw-bold mb-3 d-inline-block">03</span>
                <h5 className="fw-bold text-dark mb-2">Premium Capital Execution</h5>
                <p className="text-muted small mb-0">Transactions finalize cleanly with elite administrative and accounting speed, ensuring maximum timeline security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MID PARALLAX BANNER */}
      <section className="private-mid-parallax py-5 text-center text-white">
        <div className="container py-5" data-aos="zoom-in">
          <h2 className="fw-bold mb-3 text-warning">Elite Curation. Absolute Privacy.</h2>
          <p className="fs-6 mx-auto mb-4 text-white-50 fw-medium" style={{ maxWidth: 700 }}>
            Gain verified structural insights and explore multi-tier real estate architectures before the standard market data shifts.
          </p>
          <button onClick={openWhatsAppDirect} className="btn btn-warning text-dark rounded-pill fw-bold px-4 py-2.5 shadow-sm">
            Connect With Principal Desk
          </button>
        </div>
      </section>

      {/* 4. FORM SECTION */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-xl-10" data-aos="fade-up">
              <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm border text-start">
                <div className="row g-4 align-items-start">

                  <div className="col-md-5 pe-md-4">
                    <h2 className="fw-bold text-dark mb-3" style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem' }}>Gain Access</h2>
                    <p className="text-secondary small lh-base mb-0">
                      Stay in control of how, when, and where your home is marketed with a strategy tailored to fit your needs. Our off-market concierge framework guarantees absolute transactional privacy.
                    </p>
                  </div>

                  <div className="col-md-7">
                    <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-4">
                      <input type="text" name="name" required placeholder="Name*" className="form-control form-material-input" onChange={handleInputChange} />
                      <input type="email" name="email" required placeholder="Email*" className="form-control form-material-input" onChange={handleInputChange} />
                      <input type="tel" name="phone" required placeholder="Phone Number*" className="form-control form-material-input" onChange={handleInputChange} />
                      <input type="text" name="zipCode" required placeholder="Target Zip Code*" className="form-control form-material-input" onChange={handleInputChange} />

                      <button type="submit" className="btn btn-dark w-100 rounded-pill py-3 fw-bold shadow-sm">
                        Submit
                      </button>

                      <p className="text-muted lh-sm opacity-75 mt-1 mb-0" style={{ fontSize: '11px' }}>
                        By submitting this form you agree that CJ Group, its affiliates, or designated technical administrators may contact you via phone or verified workspace networks. Message frequency varies. Consent is not a condition to acquire off-market parameters.
                      </p>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ADVANTAGE MATRIX */}
      <section className="py-5 bg-white text-dark">
        <div className="container py-4">
          <div className="row align-items-center mb-4 text-start" data-aos="fade-up">
            <div className="col-lg-6">
              <span className="text-uppercase text-secondary fw-bold small">Exclusive Operations</span>
              <h2 className="fw-bold mt-1 text-dark">The Off-Market Advantage Framework</h2>
            </div>
            <div className="col-lg-6 text-lg-end mt-2 mt-lg-0">
              <p className="text-muted small mb-0">Rigorous transactional protection, pre-vetted buyer lists, and elite accounting coordination.</p>
            </div>
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-4" data-aos="fade-up">
              <div className="p-4 rounded-4 h-100 bg-light">
                <div className="text-white rounded-3 p-2 mb-3 d-inline-flex" style={{ backgroundColor: '#6f42c1' }}><Lock size={20} /></div>
                <h5 className="fw-bold text-dark mb-2">Absolute Confidentiality</h5>
                <p className="text-muted small mb-0">Test your property's value matrix without public historical records accruing on open tracking platforms.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="p-4 rounded-4 h-100 bg-light">
                <div className="bg-primary text-white rounded-3 p-2 mb-3 d-inline-flex"><Search size={20} /></div>
                <h5 className="fw-bold text-dark mb-2">First-Look Advantage</h5>
                <p className="text-muted small mb-0">Browse unindexed luxury blueprints, ready commercial hubs, and private spaces before standard brokers launch them.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="p-4 rounded-4 h-100 bg-light">
                <div className="bg-warning text-dark rounded-3 p-2 mb-3 d-inline-flex"><Layers size={20} /></div>
                <h5 className="fw-bold text-dark mb-2">Curated Deal Architecture</h5>
                <p className="text-muted small mb-0">Skip extensive marketplace fatigue loops. Deal channels map natively to high-net-worth real-time metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL INFRASTRUCTURE SUMMARY LEDGER */}
      <section className="py-5 bg-light border-top" data-aos="fade-up">
        <div className="container py-3 text-start">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="text-white rounded-2 p-1.5 d-inline-flex" style={{ backgroundColor: '#6f42c1' }}><Layers size={16} /></div>
                <h6 className="fw-bold text-dark mb-0">System Architecture Rules</h6>
              </div>
              <p className="text-muted small lh-base">
                *Private Exclusive metrics sync continuously behind firewalled Firestore databases. Content indices remain hidden until a verified user account verification matches the necessary network clearance layer. Registry details are managed by corporate workspace compliance administrators.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="bg-warning text-dark rounded-2 p-1.5 d-inline-flex"><HelpCircle size={16} /></div>
                <h6 className="fw-bold text-dark mb-0">Frequently Asked Inquiries</h6>
              </div>
              <div className="mb-2">
                <h6 className="fw-bold text-dark mb-1 small">Who monitors the off-market listings?</h6>
                <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Every hidden project is audited and verified directly by {adminName}'s desk operations.</p>
              </div>
              <div>
                <h6 className="fw-bold text-dark mb-1 small">Is a specific access token necessary?</h6>
                <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Yes, private access requires validation via our direct WhatsApp client registry onboarding route.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <button
        className="floating-wa-btn btn btn-success rounded-circle shadow-lg d-flex align-items-center justify-content-center p-0 border-0"
        onClick={openWhatsAppDirect}
        title={`Secure chat loop with ${adminName}`}
        style={{ backgroundColor: '#25d366' }}
      >
        <MessageCircle size={28} fill="currentColor" />
        <span className="badge-pulse"></span>
      </button>

    </div>
  );
}