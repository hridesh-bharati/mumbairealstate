import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  Landmark,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import FeaturedProperties from '../pages/FeaturedProperties';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Homepage.css';
import CoreServices from "./CoreServices";
import About from './About';

export default function Homepage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <div className="bg-white min-vh-100 text-dark overflow-x-hidden pwa-app-container">
      {/* 1. HERO BANNER CAROUSEL (Auto-play Enabled) */}
      <section className="hero-banner-section p-0 w-100 bg-white">
        <div
          id="heroBannerCarousel"
          className="carousel slide carousel-fade w-100"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <div className="carousel-inner w-100">
            {/* Slide 1 */}
            <div className="carousel-item active w-100">
              <img
                src="/images/home/home-image1.png"
                alt="CJ Groups - Building Spaces"
                className="w-100 d-block hero-banner-image"
              />
            </div>
            {/* Slide 2 */}
            <div className="carousel-item w-100">
              <img
                src="/images/home/home-image2.png"
                alt="CJ Groups - Real Estate"
                className="w-100 d-block hero-banner-image"
              />
            </div>
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev custom-light-nav"
            type="button"
            data-bs-target="#heroBannerCarousel"
            data-bs-slide="prev"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="carousel-control-next custom-light-nav"
            type="button"
            data-bs-target="#heroBannerCarousel"
            data-bs-slide="next"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 2. CATEGORY HIGHLIGHT STRIP (100vw Mobile Friendly Grid Setup) */}
      <section className="py-3 bg-white border-top border-bottom shadow-sm w-100 overflow-hidden">
        <div className="container-fluid px-2 px-md-4">
          <div className="row g-2 justify-content-between align-items-center text-center">

            <div className="col-3 px-1">
              <Link to="/buy?type=residential" className="category-card-item text-decoration-none d-block">
                <div className="category-circle-bright ring-red mx-auto mb-1">
                  <div className="icon-bright-bg bg-red-gradient">
                    <Home size={22} className="text-white" />
                  </div>
                </div>
                <span className="text-dark fw-bold d-block category-label">Luxury Villas</span>
              </Link>
            </div>

            <div className="col-3 px-1">
              <Link to="/buy?type=commercial" className="category-card-item text-decoration-none d-block">
                <div className="category-circle-bright ring-gold mx-auto mb-1">
                  <div className="icon-bright-bg bg-gold-gradient">
                    <Building2 size={22} className="text-dark" />
                  </div>
                </div>
                <span className="text-dark fw-bold d-block category-label">Commercial Hubs</span>
              </Link>
            </div>

            <div className="col-3 px-1">
              <Link to="/buy?type=apartments" className="category-card-item text-decoration-none d-block">
                <div className="category-circle-bright ring-blue mx-auto mb-1">
                  <div className="icon-bright-bg bg-blue-gradient">
                    <Landmark size={22} className="text-white" />
                  </div>
                </div>
                <span className="text-dark fw-bold d-block category-label">Modern Apartments</span>
              </Link>
            </div>

            <div className="col-3 px-1">
              <Link to="/buy?type=plots" className="category-card-item text-decoration-none d-block">
                <div className="category-circle-bright ring-green mx-auto mb-1">
                  <div className="icon-bright-bg bg-green-gradient">
                    <Briefcase size={22} className="text-white" />
                  </div>
                </div>
                <span className="text-dark fw-bold d-block category-label">Prime Land Plots</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <About />

      {/* 3. FEATURED PROPERTIES */}
      <div className="container-fluid my-5  p-0">
        <FeaturedProperties />
        <div className="mt-4 text-center">
          <Link
            to="/buy"
            className="btn btn-brand-red rounded-pill px-5 py-2 fw-bold text-white border-0 d-inline-flex align-items-center gap-2 text-decoration-none text-uppercase shadow-sm active-scale"
          >
            <span>View All </span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* 4. PREMIUM BANNERS - Combined */}
      <div className="container pt-5 px-1 px-md-4">
        <div
          className="rounded-4 shadow-lg position-relative border-0 p-4 pb-0 mb-0"
          style={{
            background: 'linear-gradient(135deg, #E6C58B 0%, #C89F59 35%, #9E7431 70%, #6E4D1B 100%)',
            borderRadius: '24px',
            minHeight: '420px',
            overflow: 'hidden', // Fixed: 'visible' ko 'hidden' kar diya taaki neeche se image overflow na ho
          }}
        >
          <div className="row h-100 align-items-center">
            {/* Content (Left side zyada space - col-md-8) */}
            <div className="col-md-8 z-2">
              {/* CJ Group Financial */}
              <div className="mb-4">
                <span
                  className="badge rounded-pill px-3 py-2 text-uppercase fw-bold mb-3 text-white shadow-sm"
                  style={{
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  CJ Group Financial
                </span>
                <h3 className="fw-bold mb-2" style={{ color: '#5A0B12' }}>
                  Know your <span style={{ color: '#000000' }}>buying power</span>
                </h3>
                <p className="fw-medium small mb-0" style={{ color: '#2C0608' }}>
                  Get preapproved with custom luxury rates in minutes & unlock exclusive financing options.
                </p>
              </div>

              {/* Divider */}
              <hr className="my-4" style={{ borderColor: 'rgba(90, 11, 18, 0.25)' }} />

              {/* CJ Group Concierge */}
              <div>
                <span className="text-uppercase fw-bold d-block mb-2 small tracking-wide" style={{ color: '#5A0B12' }}>
                  CJ Group Concierge
                </span>
                <h3 className="fw-bold mb-3 h3" style={{ color: '#5A0B12' }}>
                  Sell your home faster,{' '}
                  <span style={{ color: '#000000' }}>for more money.</span>
                </h3>
                <p className="fw-medium small mb-4" style={{ color: '#2C0608' }}>
                  We cover home improvement costs upfront to maximize value—zero due until closing.*
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to="/help-agent"
                    className="btn rounded-pill px-4 py-2 fw-bold text-white text-decoration-none shadow-sm"
                    style={{
                      background: '#5A0B12',
                      border: '1px solid #5A0B12'
                    }}
                  >
                    Help asAgent
                  </Link>
                  <Link
                    to="/sell"
                    className="btn rounded-pill px-4 py-2 fw-bold text-uppercase text-decoration-none shadow-sm"
                    style={{
                      background: 'transparent',
                      color: '#5A0B12',
                      border: '2px solid #5A0B12'
                    }}
                  >
                    Sell Home
                  </Link>
                </div>
              </div>
            </div>

            {/* Girl Image (Right side - PC view) */}
            <div className="col-md-4 position-relative d-none d-md-block" style={{ minHeight: '380px' }}>
              <img
                src="/images/selling-girl.png"
                alt="Sell your home"
                className="selling-girl"
              />
            </div>

            {/* Mobile view ke liye image container */}
            <div className="d-block d-md-none text-center mt-4 mb-0">
              <img
                src="/images/selling-girl.png"
                alt="Sell your home"
                style={{ height: '240px', width: 'auto', display: 'inline-block' }}
              />
            </div>
          </div>

          <style>
            {`
              .selling-girl {
                position: absolute;
                right: -20px;
                bottom: -24px; /* Card ke andar bottom se perfectly align karne ke liye */
                height: 395px; /* Height thodi adjust ki taaki card ke andar fit aaye */
                width: auto;
                z-index: 10;
                pointer-events: none;
                filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
              }
            `}
          </style>
        </div>
      </div>
      <CoreServices />
    </div>
  );
}