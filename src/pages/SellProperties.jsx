import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ArrowRight, 
  Home, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Sparkles,
  Building2,
  HelpCircle,
  FileText,
  Users,
  Zap
} from 'lucide-react';
import './SellProperties.css';

// 🚀 AOS Animation Library Modules Import
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SellProperties() {
  const adminName = import.meta.env.VITE_ADMIN_NAME || "MR. Jugal Modi";
  const adminContact = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000";
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "info@namoproperties.com";

  // Initialize AOS Frame Engine on Component Mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Dynamic smooth animation velocity
      once: true,     // Animation executes only once on view index intersection
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
    const message = `Hello ${adminName}, I want to sell my property.%0A%0A*Details:*%0A- Name: ${formData.name}%0A- Email: ${formData.email}%0A- Phone: ${formData.phone}%0A- ZIP Code: ${formData.zipCode}`;
    window.open(`https://wa.me/${adminContact}?text=${message}`, '_blank');
  };

  const openWhatsAppDirect = () => {
    const defaultMessage = `Hello ${adminName}, I am looking forward to selling my property with CJ Group. Please guide me through the concierge process.`;
    window.open(`https://wa.me/${adminContact}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
  };

  return (
    <div className="sell-page-global-wrapper bg-white">
      
      {/* 1. HERO SECTION WITH PREMIUM METRICS CONTENT MATRIX */}
      <section className="sell-hero-section position-relative overflow-hidden d-flex align-items-center min-vh-100">
        <div className="absolute-hero-bg"></div>
        <div className="container position-relative z-2 pt-5">
          <div className="row align-items-center g-5 pt-4 text-start">
            
            {/* Left Content Column */}
            <div className="col-lg-7 text-white" data-aos="fade-right">
              <span className="text-uppercase tracking-wider fw-bold text-warning small d-inline-flex align-items-center gap-2 mb-2">
                <Sparkles size={14} /> CJ Group Concierge
              </span>
              <h1 className="display-4 fw-bold mb-4 main-hero-title text-shadow-strong">
                Elevating your property asset to premium liquidity.
              </h1>
              <p className="fs-5 opacity-90 mb-4 sub-hero-para">
                Traditional property listing platforms rely on luck. We employ structural data staging, audited network match systems, and tailored broker curation models managed directly by <strong>{adminName}</strong>.
              </p>
              <div className="d-flex align-items-center gap-3">
                <button onClick={openWhatsAppDirect} className="btn btn-warning text-dark rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm">
                  Partner With Us <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Right Interactive Metrics Column */}
            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="200">
              <div className="d-flex flex-column gap-3">
                <div className="metric-glass-card p-3 rounded-4 bg-white bg-opacity-10 d-flex align-items-center gap-3 text-white">
                  <div className="console-box bg-green text-white"><Users size={20} /></div>
                  <div>
                    <h4 className="fw-bold mb-0">14,200+</h4>
                    <p className="extra-small mb-0 opacity-75 text-light">Verified Active Premium Buyers Listed</p>
                  </div>
                </div>
                
                <div className="metric-glass-card p-3 rounded-4 bg-white bg-opacity-10 d-flex align-items-center gap-3 text-white">
                  <div className="console-box bg-blue text-white"><Zap size={20} /></div>
                  <div>
                    <h4 className="fw-bold mb-0">94.2%</h4>
                    <p className="extra-small mb-0 opacity-75 text-light">Algorithmic Match Success Strategy Rate</p>
                  </div>
                </div>

                <div className="metric-glass-card p-3 rounded-4 bg-white bg-opacity-10 d-flex align-items-center gap-3 text-white">
                  <div className="console-box bg-orange text-white"><Clock size={20} /></div>
                  <div>
                    <h4 className="fw-bold mb-0">18 Days</h4>
                    <p className="extra-small mb-0 opacity-75 text-light">Average Capital Closing Velocity Index</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

            {/* 4. MATERIAL CARD PRESET FORM SECTION (IMAGE_B01DE7 PRESET) */}
      <section className="py-5 bg-light form-layout-wrapper">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-xl-10" data-aos="fade-up">
              <div className="material-sell-card p-4 p-md-5 bg-white rounded-3 shadow-sm border text-start">
                <div className="row g-4 align-items-start">
                  
                  {/* Left Headings */}
                  <div className="col-md-5 pe-md-4 mt-3">
                    <h2 className="fw-bold text-dark mb-3 material-form-title">Sell With Us</h2>
                    <p className="text-dark opacity-90 lh-base small">
                     Stay in control of how, when, and where your home is marketed with a strategy tailored to fit your needs. From custom modern staging blueprints to targeted omnichannel visibility parameters, we elevate your real estate asset with elite precision architecture to maximize your final capital returns.
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
                        <input type="text" name="zipCode" required placeholder="Zip Code*" className="material-control" onChange={handleInputChange} />
                      </div>
                      
                      <div className="pt-2">
                        <button type="submit" className="btn btn-dark w-100 rounded-pill py-3 fw-bold material-submit-btn">
                          Submit
                        </button>
                      </div>

                      <p className="extra-small text-muted lh-sm opacity-75 text-light mt-2 mb-0">
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

      {/* 2. ROADMAP TIMELINE SYSTEM */}
      <section className="py-5 bg-light border-bottom border-top">
        <div className="container py-5 text-center">
          <span className="text-uppercase tracking-widest small fw-bold text-secondary" data-aos="fade-down">The Selling Blueprint</span>
          <h2 className="fw-bold text-dark my-2" data-aos="fade-down" data-aos-delay="100">The Seamless Strategic Pipeline</h2>
          <p className="text-muted mx-auto mb-5 max-w-600 small" data-aos="fade-down" data-aos-delay="200">A deliberate sequence engineered to fetch record premium metrics transparently.</p>
          
          <div className="row g-4 justify-content-center mt-2 text-start">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
              <div className="roadmap-node p-4 h-100 bg-white rounded-4 shadow-sm border-0">
                <div className="console-box bg-green text-white mb-3 fw-bold rounded-3">01</div>
                <h5 className="fw-bold text-dark mb-2">Smart Staging & Stature</h5>
                <p className="text-muted small mb-0">We suggest minimal high-end structural refinements and dynamic pricing tracking parameters to drive immediate visibility loops.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="roadmap-node p-4 h-100 bg-white rounded-4 shadow-sm border-0">
                <div className="console-box bg-blue text-white mb-3 fw-bold rounded-3">02</div>
                <h5 className="fw-bold text-dark mb-2">Targeted Broker Placement</h5>
                <p className="text-muted small mb-0">Your asset registry profile is distributed across exclusive private channels, active indexing pipelines, and high-intent channels.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="roadmap-node p-4 h-100 bg-white rounded-4 shadow-sm border-0">
                <div className="console-box bg-orange text-white mb-3 fw-bold rounded-3">03</div>
                <h5 className="fw-bold text-dark mb-2">Technical Vetting & Closing</h5>
                <p className="text-muted small mb-0">From legal documentation routing matrices to escrow system clearance, we protect your equity margins seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX FIXED DEPLOYMENT PICTURE BANNER */}
      <section className="mid-parallax-banner py-5 text-center text-white position-relative" style={{
        background: 'linear-gradient(rgba(10, 22, 40, 0.4), rgba(5, 11, 20, 0.45)), url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80") no-repeat center center/cover'
      }}>
        <div className="container py-5 z-2 position-relative" data-aos="zoom-in">
          <h2 className="fw-bold mb-3 text-warning text-shadow-strong">More data. Less guesswork.</h2>
          <p className="fs-6 opacity-100 mx-auto mb-4 max-w-700 text-white text-shadow-strong fw-medium">
            Monitor live buyer behavior impressions, profile match alerts, and verification cycles via our custom integrated analytics backend architecture.
          </p>
          <button onClick={openWhatsAppDirect} className="btn btn-warning text-dark rounded-pill fw-bold px-4 py-2.5 shadow">
            Sync Account with {adminName}
          </button>
        </div>
      </section>



      {/* 5. THE CONCIERGE ADVANTAGE MATRIX */}
      <section className="py-5 bg-white text-dark">
        <div className="container py-5">
          <div className="row align-items-center mb-5 text-start" data-aos="fade-up">
            <div className="col-lg-6">
              <span className="text-uppercase text-secondary fw-bold tracking-wider small">Market Supremacy</span>
              <h2 className="fw-bold mt-1 text-dark">Why Sellers Choose Our Architectural Framework</h2>
            </div>
            <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
              <p className="text-muted small">Maximum reach, zero upfront cost hassles, completely backed by legal frameworks.</p>
            </div>
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
              <div className="perk-box p-4 border-0 rounded-4 h-100 shadow-sm bg-light">
                <div className="console-box bg-green text-white mb-3"><TrendingUp size={18} /></div>
                <h5 className="fw-bold text-dark mb-2">Maximum ROI Staging</h5>
                <p className="text-muted small mb-0">Leverage specialized modifications that dynamically uplift traditional structural initial values by 12-15%.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="perk-box p-4 border-0 rounded-4 h-100 shadow-sm bg-light">
                <div className="console-box bg-blue text-white mb-3"><Clock size={18} /></div>
                <h5 className="fw-bold text-dark mb-2">Accelerated Timelines</h5>
                <p className="text-muted small mb-0">Skip typical open house waiting matrices. We map operations directly onto pre-verified priority investment records.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="perk-box p-4 border-0 rounded-4 h-100 shadow-sm bg-light">
                <div className="console-box bg-orange text-white mb-3"><ShieldCheck size={18} /></div>
                <h5 className="fw-bold text-dark mb-2">Anti-Spam Shielding</h5>
                <p className="text-muted small mb-0">Complete protection against blind calls. Every interaction is filtered via modern automated validation parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SYSTEM DISCLAIMER & FAQ */}
      <section className="py-5 bg-light border-top" data-aos="fade-up">
        <div className="container py-4 text-start">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="console-box bg-blue text-white"><FileText size={16} /></div>
                <h5 className="fw-bold text-dark mb-0">Concierge Framework Terms</h5>
              </div>
              <p className="text-muted small lh-base">
                *Home improvement and concierge services are deployed strictly based on regional operational structures. Upfront values are fully managed with zero interest accruals due until closing procedures complete. Asset parameters remain verified by CJ Group auditing agents.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="console-box bg-orange text-white"><HelpCircle size={16} /></div>
                <h5 className="fw-bold text-dark mb-0">Frequently Asked Questions</h5>
              </div>
              <div className="mb-2">
                <h6 className="fw-bold small text-dark mb-1">Are there hidden fees on valuation matrices?</h6>
                <p className="text-muted extra-small mb-0">No. Initial registry mapping and data reports run completely complimentary.</p>
              </div>
              <div>
                <h6 className="fw-bold small text-dark mb-1">How fast will my property go live?</h6>
                <p className="text-muted extra-small mb-0">Once documentation checks clear, tracking modules sync your asset within 24-48 index hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 FLOATING STICKY WHATSAPP TRIGGER */}
      <button 
        className="floating-whatsapp-trigger shadow-lg d-flex align-items-center justify-content-center border-0 text-white" 
        onClick={openWhatsAppDirect}
        title={`Chat with ${adminName}`}
      >
        <MessageCircle size={28} fill="currentColor" />
        <span className="badge-pulse"></span>
      </button>

    </div>
  );
}