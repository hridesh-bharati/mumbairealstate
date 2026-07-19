import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import PropertyListings from '../pages/PropertyListings';
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
                  className={`btn text-capitalize border-0 px-4 py-2 rounded-pill transition-all ${
                    tab === type ? 'bg-white text-primary fw-bold shadow-sm' : 'text-white opacity-75'
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
      <PropertyListings />

      {/* 4. Elegant CTA Banner */}
      <div className="container py-5 my-5">
        <div className="row align-items-center bg-dark text-white g-0 shadow">
          <div className="col-md-6 p-5 p-lg-5 order-2 order-md-1">
            <span className="text-white-50 text-uppercase tracking-wider small fw-bold">Compass Concierge</span>
            <h2 className="display-6 fw-normal font-serif my-3 text-white">Sell your home faster, for more money.</h2>
            <p className="text-white-50 mb-4">We cover the upfront cost of home improvement services that increase your property's value—no interest, no hidden fees ever.</p>
            <Link to="/sell" className="btn btn-outline-light rounded-0 px-4 py-2 fw-semibold text-uppercase" style={{ fontSize: '13px' }}>
              Learn More
            </Link>
          </div>
          <div className="col-md-6 order-1 order-md-2" style={{ minHeight: '350px' }}>
            <div className="w-100 h-100" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80")',
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