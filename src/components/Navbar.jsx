import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authServices';
import { useAuth } from '../context/AuthContext';
import {
  Menu, User, LogOut, Home, Info, Building2, Briefcase,
  Image, PhoneCall, Layers, DollarSign, Key, Eye, Calendar, Database, FileText, UserPlus, Users
} from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser: user, isAdmin, loading } = useAuth();

  const navListRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const closeDrawer = () => {
    const offcanvasEl = document.getElementById('cjGroupOffcanvas');
    if (offcanvasEl && window.bootstrap) {
      const offcanvasInstance = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (offcanvasInstance) offcanvasInstance.hide();
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      closeDrawer();
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const updateIndicator = (element) => {
    if (element && navListRef.current) {
      const navRect = navListRef.current.getBoundingClientRect();
      const elRect = element.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
        opacity: 1
      });
    }
  };

  const resetIndicatorToActive = () => {
    if (navListRef.current) {
      const activeEl = navListRef.current.querySelector('.nav-link-clean.active');
      if (activeEl) {
        updateIndicator(activeEl);
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    }
  };

  useEffect(() => {
    resetIndicatorToActive();
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-clean py-2 px-3">
        <div className="container-fluid px-lg-4">

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center m-0 p-0" to="/" onClick={closeDrawer}>
            <img src="/images/logo.png" alt="CJ Group Logo" className="brand-logo-img" />
          </Link>

          {/* Mobile Avatar & Menu Button */}
          <div className="d-flex align-items-center gap-2 d-lg-none ms-auto">
            {!loading && (
              user ? (
                <Link
                  to={isAdmin ? "/admin-dashboard" : "/"}
                  className="p-0 border-0 bg-transparent text-decoration-none d-flex align-items-center"
                >
                  <img
                    src={user.photoURL || '/images/logo.png'}
                    alt="Profile"
                    className="rounded-circle border border-primary object-fit-cover"
                    width="36"
                    height="36"
                    onError={(e) => { e.target.src = '/images/logo.png'; }}
                  />
                </Link>
              ) : (
                <Link to="/signin" className="btn p-1 text-dark shadow-none border-0">
                  <User size={22} />
                </Link>
              )
            )}

            <button
              className="btn p-1 text-dark shadow-none border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#cjGroupOffcanvas"
            >
              <Menu size={26} />
            </button>
          </div>

          {/* PC Navigation Links */}
          <div className="collapse navbar-collapse d-none d-lg-flex w-100">
            <ul
              className="navbar-nav mx-auto align-items-center position-relative nav-swipe-wrapper"
              ref={navListRef}
              onMouseLeave={resetIndicatorToActive}
            >
              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/') ? 'active' : ''}`}
                  to="/"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <Home size={14} strokeWidth={2.4} />
                  <span>HOME</span>
                </Link>
              </li>

              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/about') ? 'active' : ''}`}
                  to="/about"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <Info size={14} strokeWidth={2.4} />
                  <span>ABOUT US</span>
                </Link>
              </li>

              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/buy') ? 'active' : ''}`}
                  to="/buy"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <Building2 size={14} strokeWidth={2.4} />
                  <span>PROJECTS</span>
                </Link>
              </li>

              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/services') ? 'active' : ''}`}
                  to="/services"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <Layers size={14} strokeWidth={2.4} />
                  <span>SERVICES</span>
                </Link>
              </li>

              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/careers') ? 'active' : ''}`}
                  to="/careers"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <Briefcase size={14} strokeWidth={2.4} />
                  <span>CAREERS</span>
                </Link>
              </li>

              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/gallery') ? 'active' : ''}`}
                  to="/gallery"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <Image size={14} strokeWidth={2.4} />
                  <span>GALLERY</span>
                </Link>
              </li>

              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/contact') ? 'active' : ''}`}
                  to="/contact"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <PhoneCall size={14} strokeWidth={2.4} />
                  <span>CONTACT US</span>
                </Link>
              </li>

            </ul>

            {/* Right Action Buttons */}
            <div className="d-flex align-items-center gap-2 ms-auto">
              {!loading && user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin-dashboard" className="btn btn-brand-action">
                      ADMIN
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-2 fw-bold d-flex align-items-center gap-1 px-3 py-2">
                    <LogOut size={14} /> <span>LOGOUT</span>
                  </button>
                </>
              ) : (
                <Link to="/contact" className="btn btn-brand-action">
                  GET IN TOUCH
                </Link>
              )}
            </div>

          </div>

        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className="offcanvas offcanvas-end bg-white android-offcanvas-width border-0 shadow-lg" tabIndex="-1" id="cjGroupOffcanvas">
        <div className="bg-white px-3 pt-3 pb-2 d-flex align-items-center justify-content-between border-bottom">
          <img src="/images/logo.png" alt="CJ Group Menu Logo" className="brand-logo-img drawer-logo" />
          <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div className="offcanvas-body p-0 overflow-y-auto">
          <div className="py-2">
            <div className="section-label px-3 py-1">Core Actions</div>
            <Link to="/buy" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-green text-white"><Home size={18} /></div>
              <span className="title-node">Buy Properties</span>
            </Link>
            <Link to="/sell" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-orange text-white"><DollarSign size={18} /></div>
              <span className="title-node">New Sales Request</span>
            </Link>
            <Link to="/buy" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-blue text-white"><Key size={18} /></div>
              <span className="title-node">Rent Spaces</span>
            </Link>
          </div>

          <div className="android-divider"></div>

          <div className="py-2">
            <div className="section-label px-3 py-1">CJ Exclusives</div>
            <Link to="/exclusives/private" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-purple text-white"><Eye size={18} /></div>
              <span className="title-node">Private Exclusives</span>
            </Link>
            <Link to="/exclusives/coming-soon" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-blue text-white"><Calendar size={18} /></div>
              <span className="title-node">Coming Soon</span>
            </Link>
            <Link to="/exclusives/listings" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-teal text-white"><Database size={18} /></div>
              <span className="title-node">Property Catalog</span>
            </Link>
          </div>

          <div className="android-divider"></div>

          <div className="py-2">
            <div className="section-label px-3 py-1">New Development</div>
            <Link to="/development/current" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-cyan text-white"><Layers size={18} /></div>
              <span className="title-node">Current Developments</span>
            </Link>
            <Link to="/development/marketing-group" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-orange text-white"><Briefcase size={18} /></div>
              <span className="title-node">Marketing Group</span>
            </Link>
          </div>

          <div className="android-divider"></div>

          <div className="py-2">
            <div className="section-label px-3 py-1">Agents</div>
            <Link to="/find-agent" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-green text-white"><Users size={18} /></div>
              <span className="title-node">Find an Agent</span>
            </Link>
            <Link to="/help-agent" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-pink text-white"><FileText size={18} /></div>
              <span className="title-node">Help Match Broker</span>
            </Link>
            <Link to="/join-agent" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-dark-red text-white"><UserPlus size={18} /></div>
              <span className="title-node">Join as Partner</span>
            </Link>
          </div>

          <div className="p-3 border-top mt-2">
            {!loading && user ? (
              <button onClick={handleLogout} className="btn btn-danger w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                <LogOut size={16} /> <span>LOGOUT</span>
              </button>
            ) : (
              <Link to="/contact" className="btn btn-brand-action w-100 py-2.5 text-center" onClick={closeDrawer}>
                GET IN TOUCH
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}