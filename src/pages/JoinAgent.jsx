import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';

// Import AOS Animation
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AgentsCJGroup() {
  // 1. Growth Calculator State
  const [volume, setVolume] = useState('10M');
  const [transactions, setTransactions] = useState('15');
  const [calculatedGoal, setCalculatedGoal] = useState(null);

  // 2. Marketing Phase Accordion State
  const [activePhase, setActivePhase] = useState(1);

  // 3. Confidential Form State & Role Tabs
  const [roleTab, setRoleTab] = useState('agent');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentBrokerage: '',
    salesVolume: '$5M - $15M',
    targetMarket: 'New York'
  });

  // Admin WhatsApp Number from Vite Environment variable
  const adminWhatsAppNumber = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || '99139010000';

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Growth Calculator Handler
  const handleCalculate = (e) => {
    e.preventDefault();
    const numericVol = parseInt(volume.replace(/\D/g, '')) || 10;
    setCalculatedGoal(`$${numericVol * 2}M+ Projected Annual Volume`);
  };

  // Form Field Input Change Handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // WhatsApp Submission Handler
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const message = 
`*New Confidential Request - CJ Group* 🏢
-----------------------------------
👤 *Role:* ${roleTab.toUpperCase()}
📛 *Name:* ${formData.fullName}
📧 *Email:* ${formData.email}
📞 *Phone:* ${formData.phone}
🏛️ *Current Brokerage:* ${formData.currentBrokerage || 'N/A'}
📈 *Annual Volume:* ${formData.salesVolume}
📍 *Target Market:* ${formData.targetMarket}
-----------------------------------
_Sent via CJ Group Portal_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-dark text-white font-sans overflow-hidden">
      
      {/* ================= SECTION 1: HERO HEADER ================= */}
      <section 
        className="position-relative min-vh-100 d-flex flex-column justify-content-between p-4 p-md-5"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%), url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Top Branding Navigation */}
        <div className="container d-flex align-items-center justify-content-between pt-3">
          <div className="fw-bold tracking-widest text-uppercase fs-4 text-white" style={{ letterSpacing: '4px', fontFamily: "'Playfair Display', serif" }}>
            CJ GROUP
          </div>
          <button className="btn btn-outline-light rounded-0 px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '11px', letterSpacing: '1.5px' }}>
            JOIN US
          </button>
        </div>

        {/* Center Hero Heading & Button */}
        <div className="container text-center my-auto py-5">
          <h1 
            className="display-2 fw-normal text-white mb-4" 
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.5px' }}
            data-aos="fade-up"
          >
            Why Do Top Agents <br className="d-none d-md-block" />Choose <span className="fst-italic">CJ Group?</span>
          </h1>
          <button 
            className="btn btn-light rounded-0 px-5 py-3 text-uppercase fw-semibold tracking-wider hover-lift border-0" 
            style={{ fontSize: '12px', letterSpacing: '2px' }}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            JOIN OUR TEAM <ArrowRight size={14} className="ms-2 d-inline" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="container pb-3 text-center opacity-50">
          <span className="small text-uppercase tracking-widest">Scroll To Explore</span>
        </div>
      </section>

      {/* ================= SECTION 2: GROWTH CALCULATOR ================= */}
      <section className="bg-black py-5 border-top border-secondary border-opacity-25 text-center">
        <div className="container py-5" style={{ maxWidth: '800px' }}>
          <span className="text-uppercase tracking-widest fw-semibold small d-block mb-2" style={{ color: '#583beb' }}>
            GROWTH CALCULATOR
          </span>
          <h2 className="display-5 fw-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }} data-aos="fade-up">
            What Would It Actually Take To <span className="fst-italic">2X Your Business?</span>
          </h2>
          <p className="text-white-50 mb-5" data-aos="fade-up" data-aos-delay="100">
            Enter your current annual volume or transaction count below to project your CJ Group trajectory.
          </p>

          <form onSubmit={handleCalculate} className="bg-dark p-4 p-md-5 border border-secondary border-opacity-25 shadow-lg text-start" data-aos="zoom-in">
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label text-uppercase small text-white-50 tracking-wider">Annual Sales Volume</label>
                <select 
                  className="form-select bg-black text-white border-secondary rounded-0 py-3 shadow-none"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                >
                  <option value="5M">$5M - $10M</option>
                  <option value="10M">$10M - $25M</option>
                  <option value="25M">$25M - $50M</option>
                  <option value="50M">$50M+</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label text-uppercase small text-white-50 tracking-wider">Annual Transactions</label>
                <select 
                  className="form-select bg-black text-white border-secondary rounded-0 py-3 shadow-none"
                  value={transactions}
                  onChange={(e) => setTransactions(e.target.value)}
                >
                  <option value="10">5 - 12 Transactions</option>
                  <option value="15">12 - 25 Transactions</option>
                  <option value="30">25 - 50 Transactions</option>
                  <option value="50">50+ Transactions</option>
                </select>
              </div>
            </div>

            <div className="text-center mt-5">
              <button type="submit" className="btn text-white rounded-0 px-5 py-3 text-uppercase fw-semibold tracking-wider border-0" style={{ backgroundColor: '#583beb', fontSize: '12px' }}>
                Calculate Your Potential
              </button>
            </div>

            {calculatedGoal && (
              <div className="mt-4 p-3 text-center bg-primary bg-opacity-10 border border-primary text-primary fw-bold tracking-wide">
                🚀 {calculatedGoal}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ================= SECTION 3: DISCOVER OUR TECH PLATFORM ================= */}
      <section 
        className="py-5 text-white position-relative"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(10,14,18,0.95) 0%, rgba(10,14,18,0.7) 100%), url("https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <span className="text-uppercase tracking-widest small text-white-50 d-block mb-2">PROPRIETARY TECHNOLOGY</span>
              <h2 className="display-5 fw-normal mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Discover Our <span className="fst-italic">Tech Platform</span>
              </h2>
              <p className="text-white-50 leading-relaxed mb-4 fs-6" style={{ maxWidth: '520px' }}>
                Made for Agents by Agents, CJ Group's proprietary technology platform streamlines every aspect of your daily business—from automated AI marketing to seamless client CRM integration.
              </p>
              <button className="btn btn-outline-light rounded-0 px-4 py-3 text-uppercase fw-semibold tracking-wider" style={{ fontSize: '12px' }}>
                EXPLORE TECH <ArrowRight size={14} className="ms-2 d-inline" />
              </button>
            </div>

            {/* Testimonials Side Grid */}
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="bg-black p-4 border border-secondary border-opacity-25 h-100 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" alt="Agent" className="img-fluid rounded-0 mb-3 grayscale-hover" style={{ height: '180px', width: '100%', objectFit: 'cover' }} />
                    <h6 className="fw-bold mb-1">Gabe Pasquale</h6>
                    <span className="small text-white-50 d-block mb-2">Founder, Pasquale Group</span>
                    <p className="small text-white-50 fst-italic mb-0">"CJ Group tech saves me over 15 hours a week in marketing operations."</p>
                  </div>
                </div>

                <div className="col-sm-6 mt-sm-4">
                  <div className="bg-black p-4 border border-secondary border-opacity-25 h-100 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Agent" className="img-fluid rounded-0 mb-3 grayscale-hover" style={{ height: '180px', width: '100%', objectFit: 'cover' }} />
                    <h6 className="fw-bold mb-1">Robbie Gold</h6>
                    <span className="small text-white-50 d-block mb-2">Senior Luxury Advisor</span>
                    <p className="small text-white-50 fst-italic mb-0">"The pipeline CRM gives our team an immediate competitive edge."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: BEHIND THE SUCCESS (CASE STUDY & 3 CARDS) ================= */}
      <section className="bg-white text-dark py-5 px-3 px-md-5">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="text-uppercase tracking-widest small text-muted d-block mb-1">BEHIND THE SUCCESS</span>
            <h2 className="display-5 fw-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              Real Stories From Top <span className="fst-italic text-primary" style={{ color: '#583beb' }}>CJ Group Agents</span>
            </h2>
          </div>

          {/* Main Case Study */}
          <div className="bg-light p-4 p-md-5 border mb-5 shadow-sm" data-aos="fade-up">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <span className="badge bg-dark text-white rounded-0 px-3 py-2 text-uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '1px' }}>
                  CASE STUDY & VIDEO
                </span>
                <h3 className="display-6 fw-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  From $250M to $500M: <span className="fst-italic">The Strategy Powering Their Growth</span>
                </h3>
                <p className="text-muted mb-4 leading-relaxed">
                  Discover how top producers leveraged CJ Group’s capital programs, national referral network, and automated marketing suite to double their sales volume in under 24 months.
                </p>
                <button className="btn text-white rounded-0 px-4 py-3 text-uppercase fw-semibold tracking-wider border-0" style={{ backgroundColor: '#583beb', fontSize: '11px' }}>
                  WATCH FULL STORY <ArrowRight size={14} className="ms-2 d-inline" />
                </button>
              </div>

              <div className="col-lg-5">
                <div className="position-relative">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Top Agent" className="img-fluid rounded-0 shadow-lg" style={{ maxHeight: '380px', width: '100%', objectFit: 'cover' }} />
                  <div className="position-absolute bottom-0 start-0 bg-dark text-white p-3 m-3 border-start border-3" style={{ borderColor: '#583beb', maxWidth: '280px' }}>
                    <span className="small fw-semibold d-block">Ari Harkov</span>
                    <span className="x-small text-white-50">Managing Director, The Harkov Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Grid Stories Cards */}
          <div className="row g-4" data-aos="fade-up" data-aos-delay="200">
            <div className="col-md-4">
              <div className="card border-0 rounded-0 shadow-sm h-100">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-0" alt="Agent" style={{ height: '260px', objectFit: 'cover' }} />
                <div className="card-body p-4">
                  <span className="text-uppercase small text-muted">New York</span>
                  <h5 className="card-title my-2 fw-normal" style={{ fontFamily: "'Playfair Display', serif" }}>How She Built an Empire with CJ Group</h5>
                  <p className="card-text text-muted small">Scaling luxury listings across coastal metropolitan markets.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 rounded-0 shadow-sm h-100">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-0" alt="Agent" style={{ height: '260px', objectFit: 'cover' }} />
                <div className="card-body p-4">
                  <span className="text-uppercase small text-muted">California</span>
                  <h5 className="card-title my-2 fw-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Unlocking The Power of CJ Group Network</h5>
                  <p className="card-text text-muted small">Closing multi-million dollar deals through nationwide referral channels.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 rounded-0 shadow-sm h-100">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-0" alt="Agent" style={{ height: '260px', objectFit: 'cover' }} />
                <div className="card-body p-4">
                  <span className="text-uppercase small text-muted">Florida</span>
                  <h5 className="card-title my-2 fw-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Scaling From Solo Agent to Team Leader</h5>
                  <p className="card-text text-muted small">Building high-performing team structures with operational support.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 5: 3-PHASED MARKETING STRATEGY ================= */}
      <section className="bg-black text-white py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <h2 className="display-5 fw-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Explore The 3-Phased <br /><span className="fst-italic">Marketing Strategy</span>
              </h2>
              <p className="text-white-50 mb-4 leading-relaxed">
                The strategic playbook designed to generate maximum momentum, reach high-net-worth buyers, and win more listings.
              </p>

              {/* Accordion Tabs */}
              <div className="d-flex flex-column gap-3 mb-4">
                {[
                  { id: 1, title: '1. Pre-Marketing Phase', desc: 'Targeted teaser campaigns, Private Exclusive listings, and pre-launch buyer matching.' },
                  { id: 2, title: '2. Digital & Social Launch', desc: 'Omnichannel digital advertising, social media saturation, and high-impact press releases.' },
                  { id: 3, title: '3. Post-Launch Momentum', desc: 'Continuous optimization, open house events, and international buyer network outreach.' }
                ].map((phase) => (
                  <div 
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`p-3 border transition-all cursor-pointer ${
                      activePhase === phase.id ? 'border-primary bg-dark' : 'border-secondary border-opacity-25'
                    }`}
                    style={{ borderColor: activePhase === phase.id ? '#583beb' : '' }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="mb-0 fw-semibold tracking-wider text-uppercase" style={{ fontSize: '13px' }}>{phase.title}</h6>
                      <ChevronDown size={16} className={`transition-all ${activePhase === phase.id ? 'rotate-180 text-primary' : 'text-white-50'}`} />
                    </div>
                    {activePhase === phase.id && (
                      <p className="small text-white-50 mt-2 mb-0 animate-fade-in">
                        {phase.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-7" data-aos="fade-left" data-aos-delay="200">
              <div 
                className="shadow-lg border border-secondary border-opacity-25 p-4 p-md-5 d-flex align-items-end"
                style={{
                  minHeight: '520px',
                  backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="text-white">
                  <span className="badge bg-primary rounded-0 px-3 py-2 text-uppercase mb-2" style={{ backgroundColor: '#583beb' }}>
                    PHASE {activePhase} ACTIVE
                  </span>
                  <h3 className="fw-normal my-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Bespoke Luxury Gallery Marketing
                  </h3>
                  <p className="small text-white-50 mb-0">Driving elevated visibility for premium properties nationwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: CITY SKYLINE BANNER ================= */}
      <section 
        className="w-100" 
        style={{
          minHeight: '340px',
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></section>

      {/* ================= SECTION 7: CONFIDENTIAL CONVERSATION FORM (WHATSAPP) ================= */}
      <section className="bg-white text-dark py-5 px-3 px-md-5">
        <div className="container py-5" style={{ maxWidth: '850px' }}>
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-4 fw-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let’s Have A <span className="fst-italic text-primary" style={{ color: '#583beb' }}>Confidential Conversation</span>
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
              Learn confidentially about how CJ Group can elevate your business. Submitting will open directly on WhatsApp.
            </p>
          </div>

          {/* Role Filter Tabs */}
          <div className="d-flex justify-content-center gap-2 mb-4" data-aos="fade-up">
            {['agent', 'team leader', 'broker'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleTab(role)}
                className={`btn rounded-0 text-uppercase fw-semibold px-4 py-2 ${
                  roleTab === role ? 'btn-dark' : 'btn-outline-secondary'
                }`}
                style={{ fontSize: '11px', letterSpacing: '1px' }}
              >
                I AM A {role}
              </button>
            ))}
          </div>

          {/* WhatsApp Form */}
          <form onSubmit={handleWhatsAppSubmit} className="row g-3 bg-light p-4 p-md-5 shadow-sm border" data-aos="fade-up" data-aos-delay="150">
            <div className="col-md-6">
              <label className="form-label small text-uppercase text-muted fw-semibold">First & Last Name *</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-control rounded-0 py-2.5 border-secondary border-opacity-25" 
                required 
                placeholder="e.g. John Doe" 
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small text-uppercase text-muted fw-semibold">Email Address *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control rounded-0 py-2.5 border-secondary border-opacity-25" 
                required 
                placeholder="john@example.com" 
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small text-uppercase text-muted fw-semibold">Phone Number *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control rounded-0 py-2.5 border-secondary border-opacity-25" 
                required 
                placeholder="e.g. 9876543210" 
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small text-uppercase text-muted fw-semibold">Current Brokerage</label>
              <input 
                type="text" 
                name="currentBrokerage"
                value={formData.currentBrokerage}
                onChange={handleInputChange}
                className="form-control rounded-0 py-2.5 border-secondary border-opacity-25" 
                placeholder="Current Firm Name" 
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small text-uppercase text-muted fw-semibold">Annual Sales Volume</label>
              <select 
                name="salesVolume"
                value={formData.salesVolume}
                onChange={handleInputChange}
                className="form-select rounded-0 py-2.5 border-secondary border-opacity-25"
              >
                <option value="$5M - $15M">$5M - $15M</option>
                <option value="$15M - $30M">$15M - $30M</option>
                <option value="$30M - $50M">$30M - $50M</option>
                <option value="$50M+">$50M+</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label small text-uppercase text-muted fw-semibold">Select Target Market</label>
              <select 
                name="targetMarket"
                value={formData.targetMarket}
                onChange={handleInputChange}
                className="form-select rounded-0 py-2.5 border-secondary border-opacity-25"
              >
                <option value="New York">New York</option>
                <option value="California">California</option>
                <option value="Florida">Florida</option>
                <option value="Chicago">Chicago</option>
                <option value="Other Region">Other Region</option>
              </select>
            </div>

            <div className="col-12 mt-4 text-center">
              <button 
                type="submit" 
                className="btn text-white rounded-0 px-5 py-3 text-uppercase fw-semibold tracking-wider border-0 d-inline-flex align-items-center gap-2" 
                style={{ backgroundColor: '#25D366', fontSize: '12px' }}
              >
                {/* WhatsApp SVG Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                SEND VIA WHATSAPP
              </button>
              <p className="x-small text-muted mt-3 mb-0" style={{ fontSize: '11px' }}>
                *Inquiries will directly open on WhatsApp for target contact: <strong>+{adminWhatsAppNumber}</strong>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ================= SECTION 8: MINIMAL WHITE FOOTER ================= */}
      <footer className="bg-white text-dark py-4 border-top">
        <div className="container d-flex align-items-center justify-content-center gap-3">
          <span className="small text-secondary fw-normal">Follow Us</span>

          <div className="d-flex align-items-center gap-3">
            {/* Instagram */}
            <a href="#instagram" className="text-dark opacity-75 hover-opacity-100 text-decoration-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#facebook" className="text-dark opacity-75 hover-opacity-100 text-decoration-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.77 5.6c1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#linkedin" className="text-dark opacity-75 hover-opacity-100 text-decoration-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ================= SCOPED STYLES ================= */}
      <style>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(88, 59, 235, 0.3) !important;
        }
        .grayscale-hover {
          filter: grayscale(30%);
          transition: filter 0.3s ease;
        }
        .grayscale-hover:hover {
          filter: grayscale(0%);
        }
        .rotate-180 {
          transform: rotate(180deg);
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .hover-opacity-100:hover {
          opacity: 1 !important;
        }
      `}</style>

    </div>
  );
}