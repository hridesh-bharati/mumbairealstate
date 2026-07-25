import React, { useState, useEffect } from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function DevelopmentMarketingGroup() {
  const [activeTab, setActiveTab] = useState('Chicago');

  useEffect(() => {
    // Initialize AOS Animations
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Dynamic Carousel Data Mapped to Selected City
  const cityData = {
    'Chicago': [
      {
        title: 'Chicago Skyline Towers & Penthouses',
        sub: 'Chicago • Willis District',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'The Loop Waterfront Condos',
        sub: 'Chicago • Michigan Ave',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'Lincoln Park Luxury Residences',
        sub: 'Chicago • North Side',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'River North High-Rise Marvels',
        sub: 'Chicago • Downtown',
        img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
      }
    ],
    'New York': [
      {
        title: 'Manhattan High-Rise Luxury Residences',
        sub: 'New York • Manhattan',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'Brooklyn Waterfront Towers',
        sub: 'New York • Brooklyn Waterfront',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'Upper East Side Grand Condos',
        sub: 'New York • Upper East Side',
        img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'Hudson Yards Architectural Penthouses',
        sub: 'New York • Hudson Yards',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
      }
    ],
    'California': [
      {
        title: 'Beverly Hills Luxury Estates',
        sub: 'California • Los Angeles',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'San Francisco Bay Skyline High-Rise',
        sub: 'California • Bay Area',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'Malibu Oceanfront Villas',
        sub: 'California • Malibu Coast',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'
      },
      {
        title: 'Hollywood Hills Architectural Heights',
        sub: 'California • Hollywood',
        img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
      }
    ]
  };

  const currentSlides = cityData[activeTab] || cityData['Chicago'];

  const cityColumns = [
    ['New York', 'California', 'Florida'],
    ['Tennessee', 'Chicago', 'Georgia'],
    ['Montana', 'Hawaii', 'Texas'],
    ['Southern California', 'Washington']
  ];

  const expertiseItems = [
    {
      id: 1,
      title: 'RESEARCH & ANALYSIS',
      desc: 'Delving into comprehensive market studies, buyer profiling, and strategic pricing, our team conducts in-depth research and analysis to provide insightful pipeline intelligence for our clients.'
    },
    {
      id: 2,
      title: 'MARKETING & BRANDING',
      desc: 'We guide the development of a cohesive brand identity, ensuring a unified message is conveyed across all sales, marketing, and social media channels for maximum visibility and impact.'
    },
    {
      id: 3,
      title: 'PLANNING & DESIGN',
      desc: 'Our in-house architects consult on the highest and best use programming, unit blocking, floor plan design, and refinement, while also focusing on amenity programming, interior design review, unit offerings, and sales gallery concepting.'
    },
    {
      id: 4,
      title: 'SALES/LEASING & OPERATIONS',
      desc: 'Efficiently executing sales and leasing strategies, we manage inventory control, create price elasticity, and supervise all staff to ensure maximum performance and smooth operations.'
    }
  ];

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
            <p 
              className="fs-5 text-white-50 leading-relaxed mb-4" 
              style={{ fontFamily: "'Playfair Display', serif" }}
              data-aos="fade-down"
            >
              At <strong className="text-white">CJ Group Development Marketing Group</strong>, we elevate modern real estate through strategic design, bespoke marketing, and unmatched developer services. Leveraging decades of experience and innovation, we transform developments into dynamic communities.
            </p>
            <button 
              className="btn text-white rounded-0 px-4 py-2.5 text-uppercase fw-semibold tracking-wider border-0" 
              style={{ backgroundColor: '#583beb', fontSize: '12px' }}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. NATIONAL PRESENCE ================= */}
      <section className="bg-white text-dark py-5 px-3 px-md-5">
        <div className="container py-4">
          <h2 
            className="display-5 fw-normal mb-3" 
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-aos="fade-right"
          >
            An Established National Presence in <span className="fst-italic text-primary">{activeTab}</span>
          </h2>
          <p 
            className="text-muted mb-4" 
            style={{ maxWidth: '780px' }}
            data-aos="fade-right"
            data-aos-delay="100"
          >
            CJ Group has the largest digital and agent reach of any brokerage firm in the United States. We activate that advantage to deliver value to our clients every day.
          </p>

          {/* Cities Selector */}
          <div className="row g-3 my-4 fs-6" data-aos="fade-up" data-aos-delay="200">
            {cityColumns.map((col, idx) => (
              <div key={idx} className="col-6 col-sm-3 d-flex flex-column gap-2">
                {col.map((cityName) => (
                  <span 
                    key={cityName}
                    onClick={() => setActiveTab(cityName)}
                    className={`user-select-none ${
                      activeTab === cityName ? 'fw-bold text-primary' : 'text-muted'
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    {cityName}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Dynamic Carousel */}
          <div 
            id="luxuryResidencesCarousel" 
            className="carousel slide shadow-lg rounded-0 overflow-hidden mt-5" 
            data-bs-ride="carousel"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="carousel-indicators mb-3">
              {currentSlides.map((_, index) => (
                <button 
                  key={index}
                  type="button" 
                  data-bs-target="#luxuryResidencesCarousel" 
                  data-bs-slide-to={index} 
                  className={index === 0 ? 'active' : ''} 
                  aria-current={index === 0 ? 'true' : 'false'}
                ></button>
              ))}
            </div>

            <div className="carousel-inner">
              {currentSlides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`carousel-item ${index === 0 ? 'active' : ''}`} 
                  data-bs-interval="4000"
                >
                  <div 
                    className="d-flex align-items-end p-4 p-md-5"
                    style={{
                      minHeight: '480px',
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1)), url("${slide.img}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="text-white z-1">
                      <span className="text-uppercase tracking-widest text-white-50 small">{slide.sub}</span>
                      <h3 className="fw-normal my-1" style={{ fontFamily: "'Playfair Display', serif" }}>{slide.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
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

          <div className="text-center mt-5" data-aos="fade-up">
            <button className="btn text-white rounded-0 px-4 py-3 text-uppercase fw-semibold tracking-wider border-0" style={{ backgroundColor: '#583beb', fontSize: '12px' }}>
              View Current Availability
            </button>
          </div>
        </div>
      </section>

      {/* ================= 3. DELIVERING THE NUMBERS ================= */}
      <section className="bg-light text-dark py-5 border-top border-bottom overflow-hidden">
        <div className="container py-4">
          <div className="row align-items-center mb-5" data-aos="fade-up">
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

          {/* Slanted Interactive Bar */}
          <div className="numbers-slanted-wrapper shadow-lg my-4" data-aos="flip-up" data-aos-duration="1200">
            <div className="slanted-box hover-box-orange">
              <div className="slanted-content">
                <h1 className="display-4 fw-medium text-white mb-0">$18B+</h1>
                <span className="text-white-50 small mt-1 text-uppercase tracking-wider">Completed Sales</span>
              </div>
            </div>

            <div className="slanted-box hover-box-purple">
              <div className="slanted-content">
                <h1 className="display-4 fw-bold text-white mb-1">$23B+</h1>
                <span className="text-white opacity-90 text-uppercase fw-medium" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                  In New Development Sales & Rentals
                </span>
              </div>
            </div>

            <div className="slanted-box hover-box-teal">
              <div className="slanted-content">
                <h1 className="display-4 fw-medium text-white mb-0">21K+</h1>
                <span className="text-white-50 small mt-1 text-uppercase tracking-wider">Units Represented</span>
              </div>
            </div>

            <div className="slanted-box hover-box-gold">
              <div className="slanted-content">
                <h1 className="display-4 fw-medium text-white mb-0">11K+</h1>
                <span className="text-white-50 small mt-1 text-uppercase tracking-wider">Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. A DEPTH OF EXPERTISE ================= */}
      <section className="bg-black text-white py-5">
        <div className="container py-5 text-center">
          <h2 
            className="display-4 fw-normal mb-3" 
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-aos="fade-up"
          >
            A Depth of <span className="fst-italic">Expertise</span>
          </h2>
          <p 
            className="text-white-50 mb-4 mx-auto" 
            style={{ maxWidth: '680px', fontSize: '1.05rem' }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Led by industry experts with decades of collective experience, CJ Group combines an entrepreneurial mindset with the wisdom gained from years in the field.
          </p>

          <button 
            className="btn text-white rounded-0 px-4 py-2.5 text-uppercase fw-semibold tracking-wider mb-5 border-0" 
            style={{ backgroundColor: '#583beb', fontSize: '12px' }}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            VIEW SERVICES
          </button>

          <div 
            className="position-relative border border-white border-opacity-25 rounded-0 overflow-hidden my-4"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '600px'
            }}
            data-aos="zoom-in-up"
            data-aos-delay="300"
          >
            <div className="row g-0 h-100 position-relative z-1" style={{ minHeight: '600px' }}>
              {expertiseItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`col-12 col-md-6 p-0 expertise-grid-item ${
                    index % 2 === 0 ? 'border-end-md' : ''
                  } ${index < 2 ? 'border-bottom-md' : ''}`}
                  style={{ minHeight: '300px' }}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <div className="expertise-card-inner w-100 h-100 p-4 p-lg-5 d-flex flex-column align-items-center justify-content-center text-center position-relative overflow-hidden">
                    
                    <h4 className="fw-semibold tracking-widest text-uppercase mb-0 default-title">
                      {item.title}
                    </h4>

                    {/* Smooth Glass Overlay */}
                    <div className="hover-card-overlay p-4 p-lg-5 d-flex flex-column align-items-center justify-content-center">
                      <h4 className="fw-bold tracking-widest text-uppercase text-white mb-3" style={{ fontSize: '1.2rem' }}>
                        {item.title}
                      </h4>
                      <p className="text-white-50 fs-6 mb-4 leading-relaxed" style={{ maxWidth: '420px', fontWeight: '300' }}>
                        {item.desc}
                      </p>
                      <ArrowUpRight size={26} className="text-white hover-arrow-icon" />
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. IN GOOD COMPANY ================= */}
      <section className="bg-white text-dark py-5">
        <div className="container py-4">
          <div className="row align-items-center mb-4">
            <div className="col-md-5" data-aos="fade-right">
              <h2 className="display-5 fw-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                In <span className="fst-italic">Good</span> Company
              </h2>
              <p className="text-muted">
                We are proud to work alongside leading developers, architectural visionaries, and investment groups nationwide.
              </p>
              <button className="btn text-white rounded-0 px-4 py-2.5 text-uppercase fw-semibold tracking-wider mt-2 border-0" style={{ backgroundColor: '#583beb', fontSize: '12px' }}>
                View Portfolio
              </button>
            </div>

            <div className="col-md-7 mt-5 mt-md-0" data-aos="fade-left" data-aos-delay="200">
              <div className="row g-4 align-items-center text-center opacity-75">
                <div className="col-6 col-sm-4 p-3"><div className="fw-bold tracking-widest text-uppercase fs-5" style={{ letterSpacing: '3px', fontFamily: 'serif' }}>OPTIMUM</div></div>
                <div className="col-6 col-sm-4 p-3"><div className="fw-bold fs-4" style={{ fontFamily: "'Playfair Display', serif" }}>Rudin</div></div>
                <div className="col-6 col-sm-4 p-3"><div className="fw-light tracking-widest text-uppercase" style={{ fontSize: '13px', letterSpacing: '4px' }}>SILVERSTEIN</div></div>
                <div className="col-6 col-sm-4 p-3"><div className="fw-bold text-uppercase fs-5" style={{ letterSpacing: '2px' }}>BLACKSTONE</div></div>
                <div className="col-6 col-sm-4 p-3"><div className="fw-bold tracking-wider fs-4" style={{ letterSpacing: '3px' }}>EXTELL</div></div>
                <div className="col-6 col-sm-4 p-3"><div className="fw-bold fs-4" style={{ fontFamily: 'monospace' }}>GLUCK+</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. EXPERIENCE THE DIFFERENCE ================= */}
      <section 
        className="text-white py-5 text-center position-relative dotted-cta-bg"
        style={{ minHeight: '320px' }}
      >
        <div className="container py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '260px' }}>
          <h2 
            className="display-4 fw-normal mb-4" 
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.5px' }}
            data-aos="fade-up"
          >
            <span className="fst-italic">Experience</span> the Difference
          </h2>
          <button 
            className="btn text-white rounded-0 px-4 py-3 text-uppercase fw-semibold tracking-widest border-0" 
            style={{ backgroundColor: '#583beb', fontSize: '12px' }}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            CONTACT US
          </button>
        </div>
      </section>

      {/* ================= 7. MINIMAL WHITE BOOTSTRAP FOOTER ================= */}
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

      {/* ================= MINIMAL ESSENTIAL STYLES ================= */}
      <style>{`
        /* Slanted Numbers Section (Gap-Free) */
        .numbers-slanted-wrapper {
          display: flex;
          background-color: #181b1f;
          min-height: 190px;
          overflow: hidden;
          position: relative;
        }

        .slanted-box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background-color: #181b1f;
          cursor: pointer;
          transition: background-color 0.35s ease;
          clip-path: polygon(12% 0, 100% 0, 88% 100%, 0% 100%);
          margin-left: -2.5%;
        }

        .slanted-box:first-child {
          clip-path: polygon(0 0, 100% 0, 88% 100%, 0% 100%);
          margin-left: 0;
        }

        .slanted-box:last-child {
          clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
        }

        .slanted-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem;
          z-index: 2;
        }

        .hover-box-orange:hover { background-color: #ff5722 !important; }
        .hover-box-purple:hover { background-color: #583beb !important; }
        .hover-box-teal:hover { background-color: #00897b !important; }
        .hover-box-gold:hover { background-color: #d4af37 !important; }

        /* Depth of Expertise Grid */
        .border-end-md {
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        .border-bottom-md {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .expertise-card-inner {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .default-title {
          transition: opacity 0.4s ease, transform 0.4s ease;
          letter-spacing: 2.5px;
          font-size: 1rem;
        }

        .hover-card-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(10, 14, 18, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 5;
        }

        .expertise-card-inner:hover .hover-card-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .expertise-card-inner:hover .default-title {
          opacity: 0;
          transform: translateY(-12px);
        }

        .hover-arrow-icon {
          transition: transform 0.35s ease;
        }

        .expertise-card-inner:hover .hover-arrow-icon {
          transform: translate(4px, -4px);
        }

        /* Dotted Pattern */
        .dotted-cta-bg {
          background-color: #080a0d;
          background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
          background-size: 16px 16px;
        }

        .hover-opacity-100:hover {
          opacity: 1 !important;
        }

        /* Mobile Viewport Handling */
        @media (max-width: 768px) {
          .numbers-slanted-wrapper {
            flex-direction: column;
          }
          .slanted-box, .slanted-box:first-child, .slanted-box:last-child {
            clip-path: none !important;
            margin-left: 0 !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .border-end-md {
            border-right: none !important;
          }
          .border-bottom-md {
            border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
          }
        }
      `}</style>

    </div>
  );
}