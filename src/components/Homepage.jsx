import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronDown } from 'lucide-react';
import FeaturedProperties from '../pages/FeaturedProperties';
import Neighborhoods from '../pages/Neighborhoods';
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
                  className={`btn tab-node text-capitalize border-0 rounded-pill position-relative z-1 transition-all ${
                    tab === type ? 'text-primary fw-bold' : 'text-white opacity-75'
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

      {/* Featured Homes */}
      <FeaturedProperties />

      {/* Banners */}
      <div className="container py-2">
        <div className="row align-items-center g-0 p-4 p-md-5 text-white rounded-3 shadow-lg mb-3" style={{ background: '#0a0e12', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="col-md-8">
            <span className="text-uppercase small fw-medium" style={{ color: '#8899b4', letterSpacing: '2px' }}>CJ Group</span>
            <h3 className="mt-2 mb-1 fw-normal" style={{ fontSize: '1.75rem', fontFamily: "'Playfair Display', serif", lineHeight: '1.3' }}>
              Know your <span className="fw-semibold" style={{ color: '#d4af37' }}>buying power</span>
            </h3>
            <p className="mb-0 small" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3px' }}>with a preapproval and custom rate in minutes</p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <Link to="/preapproval" className="btn rounded-pill px-4 py-2 fw-semibold" style={{ background: 'linear-gradient(135deg, #d4af37, #b8923a)', color: '#0a0e12', border: 'none', fontSize: '13px', letterSpacing: '0.5px', boxShadow: '0 8px 25px rgba(212, 175, 55, 0.25)' }}>
              See What I Qualify For <ArrowRight size={14} className="ms-2 d-inline-block" />
            </Link>
          </div>
        </div>

        <div className="row align-items-center g-0 shadow-lg rounded-4 overflow-hidden" style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="col-md-6 p-4 p-lg-5 order-2 order-md-1">
            <span className="text-uppercase fw-bold" style={{ color: '#8899b4', letterSpacing: '2.5px', fontSize: '11px' }}>CJ Group Concierge</span>
            <h2 className="display-6 fw-normal my-3 text-white" style={{ fontFamily: "'Playfair Display', serif", lineHeight: '1.2' }}>
              Sell your home faster, <span className="fw-semibold" style={{ color: '#d4af37' }}>for more money.</span>
            </h2>
            <p className="mb-4" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.7' }}>Concierge helps you sell your home faster and for more money by covering the cost of home improvement services - zero due until closing.*</p>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <Link to="/sell" className="btn rounded-0 px-4 py-2 fw-semibold text-uppercase" style={{ backgroundColor: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '1.5px' }}>Learn More</Link>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>*Depending on your state of residence, fees or interest may apply.</span>
            </div>
          </div>
          <div className="col-md-6 order-1 order-md-2" style={{ minHeight: '350px' }}>
            <div className="w-100 h-100" style={{ backgroundImage: 'url("images/home-page-assets.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '350px' }}></div>
          </div>
        </div>
      </div>

      {/* Neighborhood Profiles */}
      <Neighborhoods />

    </div>
  );
}