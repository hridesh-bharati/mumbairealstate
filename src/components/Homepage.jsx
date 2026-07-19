import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import FeaturedProperties from '../pages/FeaturedProperties';
import Neighborhoods from '../pages/Neighborhoods';

export default function Homepage() {
  const [tab, setTab] = useState('buy');

  return (
    <div className="bg-white min-vh-100">

      {/* 1. Hero / Premium Search Banner */}
      <div
        className="d-flex align-items-center justify-content-center text-center text-white position-relative min-vh-100 w-100"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.2)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80") no-repeat center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="container position-relative z-2 mt-5">
          <h1 className="display-3 fw-bold mb-4 tracking-tight text-shadow" style={{ letterSpacing: '-1.5px' }}>
            Find your perfect home
          </h1>

          {/* Android Style Search Container */}
          <div className="mx-auto px-2" style={{ maxWidth: '720px' }}>

            {/* Bootstrap Pill Segmented Tabs */}
            <div className="d-flex mb-3 p-1 bg-dark bg-opacity-50 rounded-pill mx-auto w-fit" style={{ width: 'fit-content', backdropFilter: 'blur(10px)' }}>
              {['buy', 'rent', 'sell'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTab(type)}
                  className={`btn text-capitalize border-0 px-4 py-2 rounded-pill transition-all ${tab === type ? 'bg-white text-primary fw-bold shadow-sm' : 'text-white opacity-75'
                    }`}
                  style={{ fontSize: '14px' }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Android Input Search bar Node layout */}
            <div className="input-group rounded-pill shadow overflow-hidden p-1 bg-white border border-white border-opacity-25">
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
          </div>
        </div>
      </div>

      {/* 3. Luxury Featured Homes (Grid Section) */}
      <FeaturedProperties />

      {/* ===== BOTH BANNERS - CJ GROUP ===== */}
      <div className="container py-2">

        {/* 1. TOP DARK BANNER - Rocket Mortgage style */}
        <div className="row align-items-center g-0 p-4 p-md-5 text-white rounded-3 shadow-lg mb-3" style={{
          background: '#0a0e12',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div className="col-md-8">
            <span className="text-uppercase small fw-medium" style={{ color: '#8899b4', letterSpacing: '2px' }}>
              CJ Group
            </span>
            <h3 className="mt-2 mb-1 fw-normal" style={{
              fontSize: '1.75rem',
              fontFamily: "'Playfair Display', serif",
              lineHeight: '1.3'
            }}>
              Know your <span className="fw-semibold" style={{ color: '#d4af37' }}>buying power</span>
            </h3>
            <p className="mb-0 small" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3px' }}>
              with a preapproval and custom rate in minutes
            </p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <Link to="/preapproval" className="btn rounded-pill px-4 py-2 fw-semibold" style={{
              background: 'linear-gradient(135deg, #d4af37, #b8923a)',
              color: '#0a0e12',
              border: 'none',
              fontSize: '13px',
              letterSpacing: '0.5px',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.25)'
            }}>
              See What I Qualify For <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>

        {/* 2. BOTTOM ELEGANT BANNER - Concierge style */}
        <div className="row align-items-center g-0 shadow-lg rounded-4 overflow-hidden" style={{
          background: '#0d1117',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div className="col-md-6 p-4 p-lg-5 order-2 order-md-1">
            <span className="text-uppercase fw-bold" style={{ color: '#8899b4', letterSpacing: '2.5px', fontSize: '11px' }}>
              CJ Group Concierge
            </span>
            <h2 className="display-6 fw-normal my-3 text-white" style={{ fontFamily: "'Playfair Display', serif", lineHeight: '1.2' }}>
              Sell your home faster, <span className="fw-semibold" style={{ color: '#d4af37' }}>for more money.</span>
            </h2>
            <p className="mb-4" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.7' }}>
              Concierge helps you sell your home faster and for more money by covering the cost of home improvement services - zero due until closing.*
            </p>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <Link to="/sell" className="btn rounded-0 px-4 py-2 fw-semibold text-uppercase" style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.3)',
                fontSize: '12px',
                letterSpacing: '1.5px'
              }}>
                Learn More
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
                *Depending on your state of residence, fees or interest may apply.
              </span>
            </div>
          </div>
          <div className="col-md-6 order-1 order-md-2" style={{ minHeight: '350px' }}>
            <div className="w-100 h-100 " style={{
              backgroundImage: 'url("images/home-page-assets.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '350px'
            }}></div>
          </div>
        </div>

      </div>

      {/* 5. Neighborhood Profiles Mapping */}
      <Neighborhoods />

    </div>
  );
}