import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronDown } from 'lucide-react';
import FeaturedProperties from '../pages/FeaturedProperties'; 
import './Homepage.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Homepage() {
  const [tab, setTab] = useState('buy');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white min-vh-100">

      {/* Hero Section */}
      <div
        className="d-flex align-items-center justify-content-center text-center text-white position-relative min-vh-100 w-100 hero-wrapper-node"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.2)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80") no-repeat center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="container position-relative z-2 mt-md-5 pt-lg-5 search-container-node">

          <h1
            className="display-3 fw-bold mb-3 tracking-tight text-shadow"
            style={{ letterSpacing: '-1.5px' }}
            data-aos="fade-down"
          >
            Find your perfect home
          </h1>

          <p
            className="fs-5 mb-4 opacity-100 mx-auto fw-medium text-shadow-strong"
            style={{ maxWidth: '640px', letterSpacing: '0.3px', color: '#ffffff' }}
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Discover exclusive residential spaces, premium commercial hubs, and luxury verified properties tailored precisely for your upscale lifestyle architecture.
          </p>

          <div className="mx-auto px-2" style={{ maxWidth: '720px' }}>

            {/* Segmented Tabs */}
            <div
              className="custom-segmented-tabs mb-4 p-1 bg-dark bg-opacity-50 rounded-pill mx-auto position-relative"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <div className={`tab-indicator rounded-pill position-absolute bg-white shadow-sm transition-all ${tab === 'sell' ? 'slide-to-sell' : 'slide-to-buy'}`}></div>
              {['buy', 'sell'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTab(type)}
                  className={`btn tab-node text-capitalize border-0 rounded-pill position-relative z-1 transition-all ${tab === type ? 'text-primary fw-bold' : 'text-white opacity-75'
                    }`}
                  style={{ fontSize: '14px' }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search Input Group */}
            <div
              className="input-group rounded-pill shadow overflow-hidden p-1 bg-white border border-white border-opacity-25 mb-4"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              <input
                type="text"
                className="form-control py-3 px-4 border-0 shadow-none fs-6 text-dark bg-transparent"
                placeholder="Search City, Project, Location or ZIP..."
              />
              <button className="btn btn-primary rounded-pill d-flex align-items-center gap-2 px-4 border-0" type="button">
                <Search size={18} />
                <span className="d-none d-sm-inline fw-semibold" style={{ fontSize: '14px' }}>Search</span>
              </button>
            </div>

            {/* ⬇️ NEW SECTION: Three Arrows with a Line 'Pushing' Them */}
            <div
              className="scroll-down-wrapper mt-5 d-flex flex-column align-items-center"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              {/* The 'Push' Line */}
              <div className="push-line opacity-50 mb-1" style={{ width: '2px', height: '20px', backgroundColor: '#ffffff' }}></div>

              {/* The Three Arrows in a Column */}
              <div className="d-flex flex-column align-items-center gap-0">
                {/* 1st Arrow (Highest) */}
                <ChevronDown
                  size={18}
                  className="text-white opacity-50"
                  style={{ marginBottom: '-6px' }}
                />
                {/* 2nd Arrow */}
                <ChevronDown
                  size={24}
                  className="text-white opacity-75"
                  style={{ marginBottom: '-8px' }}
                />
                {/* 3rd Arrow (Largest/Lowest) */}
                <ChevronDown
                  size={32}
                  className="text-white scroll-bounce-animation"
                  style={{ cursor: 'pointer' }}
                  onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        {/* Featured Homes */}
        <FeaturedProperties />
        <Link
          to="/buy"
          className="btn rounded-pill px-4 py-3 my-2 fw-semibold text-dark border-0 d-inline-flex align-items-center gap-2 shadow-lg text-decoration-none transition-all hover-lift"
          style={{
            background: 'linear-gradient(135deg, #d4af37 0%, #b8923a 100%)',
            fontSize: '13px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          <span>View All CJ Groups</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Premium Banners Section - Dual Card Grid */}
      <div className="container py-4">
        <div className="row g-4 align-items-stretch">

          {/* Card 1: Buying Power */}
          <div className="col-lg-6">
            <div
              className="h-100 p-4 p-xl-5 text-white rounded-4 shadow-lg d-flex flex-column justify-content-between position-relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #0a0e12 0%, #121820 100%)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {/* Subtle Ambient Background Glow */}
              <div
                className="position-absolute top-0 end-0 rounded-circle opacity-10 pointer-events-none"
                style={{ width: '200px', height: '200px', background: '#d4af37', filter: 'blur(90px)' }}
              ></div>

              <div className="position-relative z-1 mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="badge rounded-pill bg-warning bg-opacity-10 text-warning px-3 py-2 text-uppercase tracking-wider fw-semibold" style={{ fontSize: '11px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    CJ Group Financial
                  </span>
                </div>

                <h3 className="fw-normal display-6 text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", lineHeight: '1.25' }}>
                  Know your <span className="fw-semibold text-gradient-gold" style={{ color: '#d4af37' }}>buying power</span>
                </h3>

                <p className="mb-0" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Get preapproved with a custom luxury rate in minutes and unlock exclusive financing options tailored to your portfolio.
                </p>
              </div>

              <div className="pt-3 border-top border-white border-opacity-10 position-relative z-1 mt-auto">
                <Link
                  to="/preapproval"
                  className="btn rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center justify-content-center w-100 w-sm-auto"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #b8923a 100%)',
                    color: '#0a0e12',
                    border: 'none',
                    fontSize: '13px',
                    letterSpacing: '0.5px',
                    boxShadow: '0 8px 20px rgba(212, 175, 55, 0.2)'
                  }}
                >
                  See What I Qualify For <ArrowRight size={15} className="ms-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Concierge */}
          <div className="col-lg-6">
            <div
              className="h-100 rounded-4 shadow-lg overflow-hidden position-relative border"
              style={{ background: '#0d1117', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="row g-0 h-100">
                <div className="col-md-7 p-4 p-xl-5 d-flex flex-column justify-content-between order-2 order-md-1 position-relative z-1">
                  <div>
                    <span className="text-uppercase fw-bold d-block mb-2" style={{ color: '#8899b4', letterSpacing: '2px', fontSize: '11px' }}>
                      CJ Group Concierge
                    </span>

                    <h3 className="fw-normal text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.65rem', lineHeight: '1.25' }}>
                      Sell your home faster, <span className="fw-semibold" style={{ color: '#d4af37' }}>for more money.</span>
                    </h3>

                    <p className="mb-3" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      We cover home improvement costs upfront to maximize value—zero due until closing.*
                    </p>
                  </div>

                  <div>
                    <Link
                      to="/sell"
                      className="btn rounded-pill px-4 py-2 fw-semibold text-uppercase d-inline-block mb-2"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: '11px',
                        letterSpacing: '1.2px'
                      }}
                    >
                      Learn More
                    </Link>
                    <div className="d-block" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>
                      *Fees or interest may apply depending on residence state.
                    </div>
                  </div>
                </div>

                <div className="col-md-5 order-1 order-md-2 position-relative" style={{ minHeight: '220px' }}>
                  <div
                    className="w-100 h-100"
                    style={{
                      backgroundImage: 'url("images/home-page-assets.jpg")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  {/* Smooth dark overlay blend */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-md-block d-none"
                    style={{ background: 'linear-gradient(90deg, #0d1117 0%, transparent 80%)' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Neighborhood Profiles */}
    </div>
  );
}