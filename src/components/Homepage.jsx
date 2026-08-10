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
    <div className="bg-white min-vh-100 text-dark overflow-x-hidden">
      {/* 1. HERO BANNER CAROUSEL */}
      <section className="hero-banner-section p-0 w-100 bg-white">
        <div
          id="heroBannerCarousel"
          className="carousel slide carousel-fade w-100"
          data-bs-ride="carousel"
          data-bs-interval="5000"
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

      {/* 2. CATEGORY HIGHLIGHT STRIP */}
      <section className="py-4 bg-white border-top border-bottom shadow-sm">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between gap-3 overflow-x-auto py-2">
            <Link to="/buy?type=residential" className="category-card-item text-center text-decoration-none">
              <div className="category-circle-bright ring-red mx-auto mb-2">
                <div className="icon-bright-bg bg-red-gradient">
                  <Home size={28} className="text-white" />
                </div>
              </div>
              <span className="text-dark fw-bold d-block small">Luxury Villas</span>
            </Link>

            <Link to="/buy?type=commercial" className="category-card-item text-center text-decoration-none">
              <div className="category-circle-bright ring-gold mx-auto mb-2">
                <div className="icon-bright-bg bg-gold-gradient">
                  <Building2 size={28} className="text-dark" />
                </div>
              </div>
              <span className="text-dark fw-bold d-block small">Commercial Hubs</span>
            </Link>

            <Link to="/buy?type=apartments" className="category-card-item text-center text-decoration-none">
              <div className="category-circle-bright ring-blue mx-auto mb-2">
                <div className="icon-bright-bg bg-blue-gradient">
                  <Landmark size={28} className="text-white" />
                </div>
              </div>
              <span className="text-dark fw-bold d-block small">Modern Apartments</span>
            </Link>

            <Link to="/buy?type=plots" className="category-card-item text-center text-decoration-none">
              <div className="category-circle-bright ring-green mx-auto mb-2">
                <div className="icon-bright-bg bg-green-gradient">
                  <Briefcase size={28} className="text-white" />
                </div>
              </div>
              <span className="text-dark fw-bold d-block small">Prime Land Plots</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <About />

      {/* 3. FEATURED PROPERTIES */}
      <div className="container-fluid my-5">
        <FeaturedProperties />
        <div className="mt-4 text-center text-md-start">
          <Link
            to="/buy"
            className="btn btn-brand-red rounded-pill px-5 py-3 fw-bold text-white border-0 d-inline-flex align-items-center gap-2 text-decoration-none text-uppercase shadow-sm"
          >
            <span>View All CJ Groups</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* 4. PREMIUM BANNERS */}
      <div className="container py-4 mb-5">
        <div className="row g-4 align-items-stretch">
          {/* Card 1 */}
          <div className="col-lg-6">
            <div className="h-100 p-4 p-xl-5 rounded-4 shadow-sm d-flex flex-column justify-content-between card-brand-gold-border bg-white">
              <div className="mb-4">
                <span className="badge rounded-pill bg-brand-gold text-dark px-3 py-2 text-uppercase fw-bold mb-3">
                  CJ Group Financial
                </span>
                <h3 className="fw-bold display-6 text-dark mb-3">
                  Know your <span className="text-brand-red">buying power</span>
                </h3>
                <p className="text-secondary fw-medium">
                  Get preapproved with custom luxury rates in minutes & unlock exclusive financing options.
                </p>
              </div>
              <div className="pt-3 border-top">
                <Link
                  to="/preapproval"
                  className="btn btn-brand-gold rounded-pill px-4 py-2.5 fw-bold text-dark text-decoration-none d-inline-flex align-items-center justify-content-center w-100 w-sm-auto"
                >
                  See What I Qualify For
                  <ArrowRight size={16} className="ms-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-6">
            <div className="h-100 rounded-4 shadow-sm overflow-hidden card-brand-red-border bg-white">
              <div className="row g-0 h-100">
                <div className="col-md-7 p-4 p-xl-5 d-flex flex-column justify-content-between order-2 order-md-1">
                  <div>
                    <span className="text-uppercase fw-bold d-block mb-2 text-brand-red small">
                      CJ Group Concierge
                    </span>
                    <h3 className="fw-bold text-dark mb-3 h4">
                      Sell your home faster, <span className="text-brand-red">for more money.</span>
                    </h3>
                    <p className="text-secondary fw-medium small">
                      We cover home improvement costs upfront to maximize value—zero due until closing.*
                    </p>
                  </div>
                  <div>
                    <Link
                      to="/sell"
                      className="btn btn-brand-outline rounded-pill px-4 py-2 fw-bold text-uppercase d-inline-block text-decoration-none"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="col-md-5 order-1 order-md-2 min-vh-25">
                  <div
                    className="w-100 h-100"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CoreServices />
    </div>
  );
}