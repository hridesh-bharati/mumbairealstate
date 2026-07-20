import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ArrowRight, 
  Eye, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Search,
  Layers,
  HelpCircle
} from 'lucide-react';
import './PrivateExclusives.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PrivateExclusives() {
  const adminName = import.meta.env.VITE_ADMIN_NAME || "MR. Jugal Modi";
  const adminContact = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000";
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "info@namoproperties.com";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div className="private-page-global-wrapper bg-white">
      
      {/* 1. HERO SECTION WITH OFF-MARKET CONTEXT */}
      <section className="private-hero-section position-relative overflow-hidden d-flex align-items-center min-vh-100">
        <div className="absolute-private-hero-bg"></div>
        <div className="container position-relative z-2 pt-5">
          <div className="row align-items-center g-5 pt-4 text-start">
            
            <div className="col-lg-7 text-white" data-aos="fade-right">
              <span className="text-warning small d-inline-flex align-items-center gap-2 mb-2 text-uppercase fw-bold tracking-wider">
                <Lock size={14} /> Off-Market Privilege
              </span>
              <h1 className="display-4 fw-bold mb-4 main-hero-title text-shadow-strong">
                Search properties listing before the public market.
              </h1>
              <p className="fs-5 opacity-90 mb-4 sub-hero-para">
                CJ Group Private Exclusives give you an unmatched competitive edge. Access luxury listings, elite investment hubs, and residential estates curated directly by <strong>{adminName}</strong> before they ever appear on public directories.
              </p>
              <button onClick={openWhatsAppDirect} className="btn btn-warning text-dark rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm">
                Request Private Access Token <ArrowRight size={16} />
              </button>
            </div>

            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="200">
              <div className="d-flex flex-column gap-3">
                <div className="metric-glass-card p-3 rounded-4 bg-white bg-opacity-10 d-flex align-items-center gap-3 text-white">
                  <div className="console-box bg-purple text-white"><Eye size={20} /></div>
                  <div>
                    <h4 className="fw-bold mb-0">100% Confidential</h4>
                    <p className="extra-small mb-0 opacity-75">Completely hidden from traditional public indexing tools</p>
                  </div>
                </div>
                
                <div className="metric-glass-card p-3 rounded-4 bg-white bg-opacity-10 d-flex align-items-center gap-3 text-white">
                  <div className="console-box bg-blue text-white"><ShieldCheck size={20} /></div>
                  <div>
                    <h4 className="fw-bold mb-0">Direct Deal Curation</h4>
                    <p className="extra-small mb-0 opacity-75">Work firsthand with our verified investor workspace</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE THREE-STEP ARCHITECTURAL BLUEPRINT ROADMAP */}
      <section className="py-5 bg-light border-bottom border-top">
        <div className="container py-5 text-center">
          <span className="text-uppercase tracking-widest small fw-bold text-secondary" data-aos="fade-down">The Pipeline Matrix</span>
          <h2 className="fw-bold text-dark my-2" data-aos="fade-down" data-aos-delay="100">How Private Exclusives Work For You</h2>
          <p className="text-muted mx-auto mb-5 max-w-600 small" data-aos="fade-down" data-aos-delay="200">Seamless, secure, and deliberate framework engineered for elite real estate acquisitions.</p>
          
          <div className="row g-4 justify-content-center mt-2 text-start">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
              <div className="roadmap-node p-4 h-100 bg-white rounded-4 shadow-sm border-0">
                <div className="console-box bg-purple text-white mb-3 fw-bold rounded-3">01</div>
                <h5 className="fw-bold text-dark mb-2">Discrete Placement Matrix</h5>
                <p className="text-muted small mb-0">Sellers list their prime properties within our private catalog node, hiding details completely from competitors and commercial scrapers.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="roadmap-node p-4 h-100 bg-white rounded-4 shadow-sm border-0">
                <div className="console-box bg-blue text-white mb-3 fw-bold rounded-3">02</div>
                <h5 className="fw-bold text-dark mb-2">Targeted Network Match</h5>
                <p className="text-muted small mb-0">Our backend system maps the off-market asset data to verified luxury buyers, routing matches via direct encrypted loops.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="roadmap-node p-4 h-100 bg-white rounded-4 shadow-sm border-0">
                <div className="console-box bg-orange text-white mb-3 fw-bold rounded-3">03</div>
                <h5 className="fw-bold text-dark mb-2">Premium Capital Execution</h5>
                <p className="text-muted small mb-0">Transactions finalize cleanly with elite administrative and accounting speed, ensuring maximum timeline security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MID PARALLAX ATTACHMENT BANNER CONTAINER */}
      <section className="mid-parallax-banner py-5 text-center text-white position-relative" style={{
        background: 'linear-gradient(rgba(10, 22, 40, 0.45), rgba(5, 11, 20, 0.5)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80") no-repeat center center/cover'
      }}>
        <div className="container py-5 z-2 position-relative" data-aos="zoom-in">
          <h2 className="fw-bold mb-3 text-warning text-shadow-strong">Elite Curation. Absolute Privacy.</h2>
          <p className="fs-6 opacity-100 mx-auto mb-4 max-w-700 text-white text-shadow-strong fw-medium">
            Gain verified structural insights and explore multi-tier real estate architectures before the standard market data shifts.
          </p>
          <button onClick={openWhatsAppDirect} className="btn btn-warning text-dark rounded-pill fw-bold px-4 py-2.5 shadow">
            Connect With Principal Desk
          </button>
        </div>
      </section>

      {/* ⚡ 4. EXACT COMPASS LAYOUT वाइट मिड-कार्ड सेक्शन (IMAGE PRESET STYLE) */}
      <section className="py-5 bg-light form-layout-wrapper">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-xl-10" data-aos="fade-up">
              <div className="material-sell-card p-4 p-md-5 bg-white rounded-3 shadow-sm border text-start">
                <div className="row g-4 align-items-start">
                  
                  {/* Left Headings */}
                  <div className="col-md-5 pe-md-4 mt-3">
                    <h2 className="fw-bold text-dark mb-3 material-form-title">Gain Access</h2>
                    <p className="text-dark opacity-90 lh-base small">
                      Stay in control of how, when, and where your home is marketed with a strategy tailored to fit your needs. Our off-market concierge framework guarantees absolute transactional privacy.
                    </p>
                  </div>
                  
                  {/* Right Material Edge Inputs Form */}
                  <div className="col-md-7">
                    <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-4">
                      <div className="material-input-group">
                        <input type="text" name="name" required placeholder="Name*" className="material-control" onChange={handleInputChange} />
                      </div>
                      <div className="material-input-group">
                        <input type="email" name="email" required placeholder="Email*" className="material-control" onChange={handleInputChange} />
                      </div>
                      <div className="material-input-group">
                        <input type="tel" name="phone" required placeholder="Phone Number*" className="material-control" onChange={handleInputChange} />
                      </div>
                      <div className="material-input-group">
                        <input type="text" name="zipCode" required placeholder="Target Zip Code*" className="material-control" onChange={handleInputChange} />
                      </div>
                      
                      <div className="pt-2">
                        <button type="submit" className="btn btn-dark w-100 rounded-pill py-3 fw-bold material-submit-btn">
                          Submit
                        </button>
                      </div>

                      <p className="extra-small text-muted lh-sm opacity-75 mt-2 mb-0">
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

      {/* 5. PRIVACY VALUE GRID SYSTEMS (COLORFUL CARD DESIGNS) */}
      <section className="py-5 bg-white text-dark">
        <div className="container py-5">
          <div className="row align-items-center mb-5 text-start" data-aos="fade-up">
            <div className="col-lg-6">
              <span className="text-uppercase text-secondary fw-bold tracking-wider small">Exclusive Operations</span>
              <h2 className="fw-bold mt-1 text-dark">The Off-Market Advantage Framework</h2>
            </div>
            <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
              <p className="text-muted small">Rigorous transactional protection, pre-vetted buyer lists, and elite accounting coordination.</p>
            </div>
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
              <div className="perk-box p-4 border-0 rounded-4 h-100 shadow-sm bg-light">
                <div className="console-box bg-purple text-white mb-3"><Lock size={18} /></div>
                <h5 className="fw-bold text-dark mb-2">Absolute Confidentiality</h5>
                <p className="text-muted small mb-0">Test your property's value matrix without public historical records accruing on open tracking platforms.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="perk-box p-4 border-0 rounded-4 h-100 shadow-sm bg-light">
                <div className="console-box bg-blue text-white mb-3"><Search size={18} /></div>
                <h5 className="fw-bold text-dark mb-2">First-Look Advantage</h5>
                <p className="text-muted small mb-0">Browse unindexed luxury blueprints, ready commercial hubs, and private spaces before standard brokers launch them.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="perk-box p-4 border-0 rounded-4 h-100 shadow-sm bg-light">
                <div className="console-box bg-orange text-white mb-3"><Layers size={18} /></div>
                <h5 className="fw-bold text-dark mb-2">Curated Deal Architecture</h5>
                <p className="text-muted small mb-0">Skip extensive marketplace fatigue loops. Deal channels map natively to high-net-worth real-time metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL INFRASTRUCTURE SUMMARY LEDGER */}
      <section className="py-5 bg-light border-top" data-aos="fade-up">
        <div className="container py-4 text-start">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="console-box bg-purple text-white"><Layers size={16} /></div>
                <h5 className="fw-bold text-dark mb-0">System Architecture Rules</h5>
              </div>
              <p className="text-muted small lh-base">
                *Private Exclusive metrics sync continuously behind firewalled Firestore databases. Content indices remain hidden until a verified user account verification matches the necessary network clearance layer. Registry details are managed by corporate workspace compliance administrators.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="console-box bg-orange text-white"><HelpCircle size={16} /></div>
                <h5 className="fw-bold text-dark mb-0">Frequently Asked Inquiries</h5>
              </div>
              <div className="mb-2">
                <h6 className="fw-bold small text-dark mb-1">Who monitors the off-market listings?</h6>
                <p className="text-muted extra-small mb-0">Every hidden project is audited and verified directly by {adminName}'s desk operations.</p>
              </div>
              <div>
                <h6 className="fw-bold small text-dark mb-1">Is a specific access token necessary?</h6>
                <p className="text-muted extra-small mb-0">Yes, private access requires validation via our direct WhatsApp client registry onboarding route.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 FLOATING STICKY WHATSAPP ENCRYPTED TRIGGER */}
      <button 
        className="floating-whatsapp-trigger shadow-lg d-flex align-items-center justify-content-center border-0 text-white" 
        onClick={openWhatsAppDirect}
        title={`Secure chat loop with ${adminName}`}
      >
        <MessageCircle size={28} fill="currentColor" />
        <span className="badge-pulse"></span>
      </button>

    </div>
  );
}