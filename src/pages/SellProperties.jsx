import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  ArrowRight,
  Clock,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  FileText,
  HelpCircle,
  Users,
  Zap
} from 'lucide-react';
import './SellProperties.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SellProperties() {
  const adminName = import.meta.env.VITE_ADMIN_NAME || "MR. Jugal Modi";
  const adminContact = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000";

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', zipCode: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = `Hello ${adminName}, I want to sell my property.%0A%0A*Details:*%0A- Name: ${formData.name}%0A- Email: ${formData.email}%0A- Phone: ${formData.phone}%0A- ZIP Code: ${formData.zipCode}`;
    window.open(`https://wa.me/${adminContact}?text=${message}`, '_blank');
  };

  const openWhatsAppDirect = () => {
    const defaultMessage = `Hello ${adminName}, I am looking forward to selling my property with CJ Group. Please guide me through the concierge process.`;
    window.open(`https://wa.me/${adminContact}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
  };

  return (
    <div className="bg-white overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="sell-hero-bg position-relative min-vh-100 d-flex align-items-center py-5">
        <div className="container position-relative z-2 pt-4">
          <div className="row align-items-center g-5 text-start">

            {/* Left Content */}
            <div className="col-lg-7 text-white" data-aos="fade-right">
              <span className="badge bg-warning text-dark text-uppercase fw-bold px-3 py-2 rounded-pill small mb-3 d-inline-flex align-items-center gap-2">
                <Sparkles size={14} /> CJ Group Concierge
              </span>
              <h1 className="display-4 fw-bold mb-3 text-white">
                Elevating your property asset to premium liquidity.
              </h1>
              <p className="fs-6 text-white-50 mb-4 lh-lg">
                Traditional property listing platforms rely on luck. We employ structural data staging, audited network match systems, and tailored broker curation models managed directly by <strong>{adminName}</strong>.
              </p>
              <button onClick={openWhatsAppDirect} className="btn btn-warning text-dark rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm">
                Partner With Us <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Metrics Cards */}
            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="150">
              <div className="d-flex flex-column gap-3">
                <div className="glass-card p-3 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-10 d-flex align-items-center gap-3 text-white shadow-sm">
                  <div className="bg-success rounded-3 p-2.5 d-flex align-items-center justify-content-center text-white" style={{ width: 42, height: 42 }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">14,200+</h4>
                    <p className="small text-white-50 mb-0">Verified Active Premium Buyers Listed</p>
                  </div>
                </div>

                <div className="glass-card p-3 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-10 d-flex align-items-center gap-3 text-white shadow-sm">
                  <div className="bg-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center text-white" style={{ width: 42, height: 42 }}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">94.2%</h4>
                    <p className="small text-white-50 mb-0">Algorithmic Match Success Strategy Rate</p>
                  </div>
                </div>

                <div className="glass-card p-3 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-10 d-flex align-items-center gap-3 text-white shadow-sm">
                  <div className="bg-warning rounded-3 p-2.5 d-flex align-items-center justify-content-center text-dark" style={{ width: 42, height: 42 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">18 Days</h4>
                    <p className="small text-white-50 mb-0">Average Capital Closing Velocity Index</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FORM SECTION */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-xl-10" data-aos="fade-up">
              <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm border text-start">
                <div className="row g-4 align-items-start">

                  <div className="col-md-5 pe-md-4">
                    <h2 className="fw-bold text-dark mb-3" style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem' }}>Sell With Us</h2>
                    <p className="text-secondary small lh-base mb-0">
                      Stay in control of how, when, and where your home is marketed with a strategy tailored to fit your needs. From custom modern staging blueprints to targeted omnichannel visibility parameters, we elevate your real estate asset with elite precision architecture to maximize your final capital returns.
                    </p>
                  </div>

                  <div className="col-md-7">
                    <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-4">
                      <input type="text" name="name" required placeholder="Name*" className="form-control form-material-input" onChange={handleInputChange} />
                      <input type="email" name="email" required placeholder="Email*" className="form-control form-material-input" onChange={handleInputChange} />
                      <input type="tel" name="phone" required placeholder="Phone Number*" className="form-control form-material-input" onChange={handleInputChange} />
                      <input type="text" name="zipCode" required placeholder="Zip Code*" className="form-control form-material-input" onChange={handleInputChange} />

                      <button type="submit" className="btn btn-dark w-100 rounded-pill py-3 fw-bold shadow-sm">
                        Submit
                      </button>

                      <p className="text-muted lh-sm opacity-75 mt-1 mb-0" style={{ fontSize: '11px' }}>
                        By submitting this form you agree that CJ Group, its affiliates including affiliated real estate agents, or associated third parties may contact you, including with calls or texts by automated means. Message frequency varies. Text 'Help' for Help. Consent is not a condition to access real estate services.
                      </p>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROADMAP SECTION */}
      <section className="py-5 border-top border-bottom bg-white">
        <div className="container py-4 text-center">
          <span className="text-uppercase tracking-wider small fw-bold text-secondary" data-aos="fade-down">The Selling Blueprint</span>
          <h2 className="fw-bold text-dark my-2" data-aos="fade-down" data-aos-delay="100">The Seamless Strategic Pipeline</h2>
          <p className="text-muted mx-auto mb-5 small" style={{ maxWidth: 600 }} data-aos="fade-down" data-aos-delay="150">
            A deliberate sequence engineered to fetch record premium metrics transparently.
          </p>

          <div className="row g-4 text-start">
            <div className="col-md-4" data-aos="fade-up">
              <div className="p-4 h-100 bg-light rounded-4 border-0">
                <span className="badge bg-success px-3 py-2 rounded-3 fw-bold mb-3 d-inline-block">01</span>
                <h5 className="fw-bold text-dark mb-2">Smart Staging & Stature</h5>
                <p className="text-muted small mb-0">We suggest minimal high-end structural refinements and dynamic pricing tracking parameters to drive immediate visibility loops.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="p-4 h-100 bg-light rounded-4 border-0">
                <span className="badge bg-primary px-3 py-2 rounded-3 fw-bold mb-3 d-inline-block">02</span>
                <h5 className="fw-bold text-dark mb-2">Targeted Broker Placement</h5>
                <p className="text-muted small mb-0">Your asset registry profile is distributed across exclusive private channels, active indexing pipelines, and high-intent channels.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="p-4 h-100 bg-light rounded-4 border-0">
                <span className="badge bg-warning text-dark px-3 py-2 rounded-3 fw-bold mb-3 d-inline-block">03</span>
                <h5 className="fw-bold text-dark mb-2">Technical Vetting & Closing</h5>
                <p className="text-muted small mb-0">From legal documentation routing matrices to escrow system clearance, we protect your equity margins seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MID PARALLAX BANNER */}
      <section className="sell-mid-parallax py-5 text-center text-white">
        <div className="container py-5" data-aos="zoom-in">
          <h2 className="fw-bold mb-3 text-warning">More data. Less guesswork.</h2>
          <p className="fs-6 mx-auto mb-4 text-white-50 fw-medium" style={{ maxWidth: 700 }}>
            Monitor live buyer behavior impressions, profile match alerts, and verification cycles via our custom integrated analytics backend architecture.
          </p>
          <button onClick={openWhatsAppDirect} className="btn btn-warning text-dark rounded-pill fw-bold px-4 py-2.5 shadow-sm">
            Sync Account with {adminName}
          </button>
        </div>
      </section>

      {/* 5. ADVANTAGE MATRIX */}
      <section className="py-5 bg-white text-dark">
        <div className="container py-4">
          <div className="row align-items-center mb-4 text-start" data-aos="fade-up">
            <div className="col-lg-6">
              <span className="text-uppercase text-secondary fw-bold small">Market Supremacy</span>
              <h2 className="fw-bold mt-1 text-dark">Why Sellers Choose Our Architectural Framework</h2>
            </div>
            <div className="col-lg-6 text-lg-end mt-2 mt-lg-0">
              <p className="text-muted small mb-0">Maximum reach, zero upfront cost hassles, completely backed by legal frameworks.</p>
            </div>
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-4" data-aos="fade-up">
              <div className="p-4 rounded-4 h-100 bg-light">
                <div className="bg-success text-white rounded-3 p-2 mb-3 d-inline-flex"><TrendingUp size={20} /></div>
                <h5 className="fw-bold text-dark mb-2">Maximum ROI Staging</h5>
                <p className="text-muted small mb-0">Leverage specialized modifications that dynamically uplift traditional structural initial values by 12-15%.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="p-4 rounded-4 h-100 bg-light">
                <div className="bg-primary text-white rounded-3 p-2 mb-3 d-inline-flex"><Clock size={20} /></div>
                <h5 className="fw-bold text-dark mb-2">Accelerated Timelines</h5>
                <p className="text-muted small mb-0">Skip typical open house waiting matrices. We map operations directly onto pre-verified priority investment records.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="p-4 rounded-4 h-100 bg-light">
                <div className="bg-warning text-dark rounded-3 p-2 mb-3 d-inline-flex"><ShieldCheck size={20} /></div>
                <h5 className="fw-bold text-dark mb-2">Anti-Spam Shielding</h5>
                <p className="text-muted small mb-0">Complete protection against blind calls. Every interaction is filtered via modern automated validation parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SYSTEM DISCLAIMER & FAQ */}
      <section className="py-5 bg-light border-top" data-aos="fade-up">
        <div className="container py-3 text-start">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="bg-primary text-white rounded-2 p-1.5 d-inline-flex"><FileText size={16} /></div>
                <h6 className="fw-bold text-dark mb-0">Concierge Framework Terms</h6>
              </div>
              <p className="text-muted small lh-base">
                *Home improvement and concierge services are deployed strictly based on regional operational structures. Upfront values are fully managed with zero interest accruals due until closing procedures complete. Asset parameters remain verified by CJ Group auditing agents.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="bg-warning text-dark rounded-2 p-1.5 d-inline-flex"><HelpCircle size={16} /></div>
                <h6 className="fw-bold text-dark mb-0">Frequently Asked Questions</h6>
              </div>
              <div className="mb-2">
                <h6 className="fw-bold text-dark mb-1 small">Are there hidden fees on valuation matrices?</h6>
                <p className="text-muted mb-0" style={{ fontSize: '12px' }}>No. Initial registry mapping and data reports run completely complimentary.</p>
              </div>
              <div>
                <h6 className="fw-bold text-dark mb-1 small">How fast will my property go live?</h6>
                <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Once documentation checks clear, tracking modules sync your asset within 24-48 index hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <button
        className="floating-wa-btn btn btn-success rounded-circle shadow-lg d-flex align-items-center justify-content-center p-0"
        onClick={openWhatsAppDirect}
        title={`Chat with ${adminName}`}
      >
        <MessageCircle size={28} fill="currentColor" />
        <span className="badge-pulse"></span>
      </button>

    </div>
  );
}