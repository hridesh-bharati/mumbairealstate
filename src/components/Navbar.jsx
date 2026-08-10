import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authServices';
import { useAuth } from '../context/AuthContext';
import {
  Menu, LogOut, Home, Building2, Briefcase,
  Layers, DollarSign, Key, Eye, Calendar, CircleUser,
  Database, FileText, UserPlus, Users, ChevronDown, TextAlignEnd
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
        <div className="container-fluid px-lg-4 d-flex align-items-center justify-content-between">

          {/* BRAND LOGO */}
          <Link className="navbar-brand d-flex align-items-center m-0 p-0 flex-shrink-0" to="/" onClick={closeDrawer}>
            <img src="/images/logo.png" alt="CJ Group Logo" className="brand-logo-img" />
          </Link>

          {/* MOBILE AVATAR & MENU BUTTON WITH TEXT ALIGN END ICON */}
          <div className="d-flex align-items-center gap-2 d-lg-none ms-auto">
            {!loading && (
              user ? (
                <Link
                  to={isAdmin ? "/admin-dashboard" : "/"}
                  className="text-vibrant-blue text-decoration-none p-0 overflow-hidden rounded-circle border border-secondary-subtle"
                  aria-label="Dashboard"
                  style={{ width: '36px', height: '36px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <img
                    src={user.photoURL || '/images/logo.png'}
                    alt="Profile"
                    className="w-100 h-100 object-fit-cover"
                    onError={(e) => { e.target.src = '/images/logo.png'; }}
                  />
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="border-0 bg-transparent text-vibrant-blue p-0 text-decoration-none d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                >
                  <CircleUser size={40} className="text-vibrant-blue me-2" />
                </Link>
              )
            )}

            <button
              className="console-box bg-vibrant-orange text-white p-0 border-0 shadow-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#cjGroupOffcanvas"
              style={{ width: '36px', height: '36px' }}
            >
              <TextAlignEnd size={20} />
            </button>
          </div>

          {/* PC DESKTOP NAVIGATION LINKS */}
          <div className="collapse navbar-collapse d-none d-lg-flex justify-content-between align-items-center flex-grow-1 mx-4">
            <ul
              className="navbar-nav mx-auto align-items-center position-relative nav-swipe-wrapper mb-0"
              ref={navListRef}
              onMouseLeave={resetIndicatorToActive}
            >
              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/') ? 'active' : ''}`}
                  to="/"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <div className="console-box bg-vibrant-green text-white" style={{ width: '22px', height: '22px', borderRadius: '4px', boxShadow: 'none' }}>
                    <Home size={12} strokeWidth={2.4} />
                  </div>
                  <span>HOME</span>
                </Link>
              </li>

              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/buy') ? 'active' : ''}`}
                  to="/buy"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <div className="console-box bg-vibrant-green text-white" style={{ width: '22px', height: '22px', borderRadius: '4px', boxShadow: 'none' }}>
                    <Building2 size={12} strokeWidth={2.4} />
                  </div>
                  <span>BUY</span>
                </Link>
              </li>

              <li className="nav-item position-relative z-1">
                <Link
                  className={`nav-link nav-link-clean ${isActive('/sell') ? 'active' : ''}`}
                  to="/sell"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <div className="console-box bg-vibrant-orange text-white" style={{ width: '22px', height: '22px', borderRadius: '4px', boxShadow: 'none' }}>
                    <DollarSign size={12} strokeWidth={2.4} />
                  </div>
                  <span>SELL</span>
                </Link>
              </li>

              {/* PC Dropdown: CJ Exclusives */}
              <li className="nav-item dropdown position-static z-1">
                <span
                  className={`nav-link nav-link-clean cursor-pointer ${location.pathname.startsWith('/exclusives') ? 'active' : ''}`}
                  role="button"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <div className="console-box bg-vibrant-purple text-white" style={{ width: '22px', height: '22px', borderRadius: '4px', boxShadow: 'none' }}>
                    <Eye size={12} strokeWidth={2.4} />
                  </div>
                  <span>CJ EXCLUSIVES</span>
                  <ChevronDown size={12} className="arrow-icon ms-1" />
                </span>
                <div className="dropdown-menu mega-menu border-0 m-0 p-4 shadow-lg bg-white row w-100">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 border-end pe-4">
                        <span className="badge bg-purple-light text-purple mb-2 px-2 py-1 rounded">Market Secret</span>
                        <h5 className="fw-bold text-dark mb-2">CJ Exclusives</h5>
                        <p className="text-muted small">Access premium residential properties managed exclusively by our experts.</p>
                      </div>
                      <div className="col-md-8 ps-4 d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/exclusives/private" onClick={closeDrawer}>
                          <div className="console-box bg-vibrant-purple text-white"><Eye size={18} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Private Exclusives</div>
                            <div className="text-muted extra-small">Browse secret premium listings.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/exclusives/coming-soon" onClick={closeDrawer}>
                          <div className="console-box bg-vibrant-blue text-white"><Calendar size={18} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Coming Soon</div>
                            <div className="text-muted extra-small">Properties arriving on the marketplace within 30 days.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/exclusives/listings" onClick={closeDrawer}>
                          <div className="console-box bg-vibrant-teal text-white"><Database size={18} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Property Catalog</div>
                            <div className="text-muted extra-small">Explore complete verified nationwide property lists.</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* PC Dropdown: New Development */}
              <li className="nav-item dropdown position-static z-1">
                <span
                  className={`nav-link nav-link-clean cursor-pointer ${location.pathname.startsWith('/development') ? 'active' : ''}`}
                  role="button"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <div className="console-box bg-vibrant-cyan text-white" style={{ width: '22px', height: '22px', borderRadius: '4px', boxShadow: 'none' }}>
                    <Layers size={12} strokeWidth={2.4} />
                  </div>
                  <span>NEW DEVELOPMENT</span>
                  <ChevronDown size={12} className="arrow-icon ms-1" />
                </span>
                <div className="dropdown-menu mega-menu border-0 m-0 p-4 shadow-lg bg-white row w-100">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 border-end pe-4">
                        <span className="badge bg-cyan-light text-cyan mb-2 px-2 py-1 rounded">Modern Living</span>
                        <h5 className="fw-bold text-dark mb-2">New Projects</h5>
                        <p className="text-muted small">Discover luxury architectural spaces and early pre-sale properties.</p>
                      </div>
                      <div className="col-md-8 ps-4 d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/development/current" onClick={closeDrawer}>
                          <div className="console-box bg-vibrant-cyan text-white"><Layers size={18} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Current Developments</div>
                            <div className="text-muted extra-small">Active construction sites open for early booking.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/development/marketing-group" onClick={closeDrawer}>
                          <div className="console-box bg-vibrant-orange text-white"><Briefcase size={18} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Marketing Group</div>
                            <div className="text-muted extra-small">Developer panels and asset branding management.</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* PC Dropdown: Agents */}
              <li className="nav-item dropdown position-static z-1">
                <span
                  className={`nav-link nav-link-clean cursor-pointer ${['/find-agent', '/help-agent', '/join-agent'].includes(location.pathname) ? 'active' : ''}`}
                  role="button"
                  onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                >
                  <div className="console-box bg-vibrant-green text-white" style={{ width: '22px', height: '22px', borderRadius: '4px', boxShadow: 'none' }}>
                    <Users size={12} strokeWidth={2.4} />
                  </div>
                  <span>AGENTS</span>
                  <ChevronDown size={12} className="arrow-icon ms-1" />
                </span>
                <div className="dropdown-menu mega-menu border-0 m-0 p-4 shadow-lg bg-white row w-100">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 border-end pe-4">
                        <span className="badge bg-pink-light text-pink mb-2 px-2 py-1 rounded">Expert Advisors</span>
                        <h5 className="fw-bold text-dark mb-2">Broker Networks</h5>
                        <p className="text-muted small">Partner with premium neighborhood advisors for seamless guidance.</p>
                      </div>
                      <div className="col-md-8 ps-4 d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/find-agent" onClick={closeDrawer}>
                          <div className="console-box bg-vibrant-green text-white"><Users size={18} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Find an Agent</div>
                            <div className="text-muted extra-small">Search from thousands of vetted area experts.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/help-agent" onClick={closeDrawer}>
                          <div className="console-box bg-vibrant-pink text-white"><FileText size={18} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Help Match Broker</div>
                            <div className="text-muted extra-small">Let our smart metrics route you to the absolute perfect agent.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/join-agent" onClick={closeDrawer}>
                          <div className="console-box bg-vibrant-red text-white"><UserPlus size={18} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Join as Partner</div>
                            <div className="text-muted extra-small">Take your real estate workspace architecture to the next level.</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* SLIDING ANIMATED INDICATOR LINE */}
              <div
                className="hover-swipe-indicator"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity
                }}
              />
            </ul>

            {/* RIGHT ACTION BUTTONS */}
            <div className="d-flex align-items-center gap-2 flex-shrink-0">
              {!loading && user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin-dashboard" className="btn btn-brand-action d-flex align-items-center gap-2">
                      <img
                        src={user.photoURL || '/images/logo.png'}
                        alt="Admin Avatar"
                        className="rounded-circle border border-white object-fit-cover"
                        width="20"
                        height="20"
                        onError={(e) => { e.target.src = '/images/logo.png'; }}
                      />
                      <span>ADMIN</span>
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-2 fw-bold d-flex align-items-center gap-1 px-3 py-2">
                    <LogOut size={14} /> <span>LOGOUT</span>
                  </button>
                </>
              ) : (
                <Link to="/signin" className="btn btn-brand-action">
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
            <Link to="/" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-green text-white"><Home size={18} /></div>
              <span className="title-node">Home</span>
            </Link>
            <Link to="/buy" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-green text-white"><Building2 size={18} /></div>
              <span className="title-node">Buy Properties</span>
            </Link>
            <Link to="/sell" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-orange text-white"><DollarSign size={18} /></div>
              <span className="title-node">New Sales Request</span>
            </Link>
          </div>

          <div className="android-divider"></div>

          <div className="py-2">
            <div className="section-label px-3 py-1">CJ Exclusives</div>
            <Link to="/exclusives/private" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-purple text-white"><Eye size={18} /></div>
              <span className="title-node">Private Exclusives</span>
            </Link>
            <Link to="/exclusives/coming-soon" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-blue text-white"><Calendar size={18} /></div>
              <span className="title-node">Coming Soon</span>
            </Link>
            <Link to="/exclusives/listings" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-teal text-white"><Database size={18} /></div>
              <span className="title-node">Property Catalog</span>
            </Link>
          </div>

          <div className="android-divider"></div>

          <div className="py-2">
            <div className="section-label px-3 py-1">New Development</div>
            <Link to="/development/current" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-cyan text-white"><Layers size={18} /></div>
              <span className="title-node">Current Developments</span>
            </Link>
            <Link to="/development/marketing-group" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-orange text-white"><Briefcase size={18} /></div>
              <span className="title-node">Marketing Group</span>
            </Link>
          </div>

          <div className="android-divider"></div>

          <div className="py-2">
            <div className="section-label px-3 py-1">Agents</div>
            <Link to="/find-agent" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-green text-white"><Users size={18} /></div>
              <span className="title-node">Find an Agent</span>
            </Link>
            <Link to="/help-agent" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-pink text-white"><FileText size={18} /></div>
              <span className="title-node">Help Match Broker</span>
            </Link>
            <Link to="/join-agent" className="android-item" onClick={closeDrawer}>
              <div className="console-box bg-vibrant-red text-white"><UserPlus size={18} /></div>
              <span className="title-node">Join as Partner</span>
            </Link>
          </div>

          <div className="p-3 border-top mt-2">
            {!loading && user ? (
              <button onClick={handleLogout} className="btn btn-danger w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                <LogOut size={16} /> <span>LOGOUT</span>
              </button>
            ) : (
              <Link to="/signin" className="btn btn-brand-action w-100 py-2.5 text-center" onClick={closeDrawer}>
                GET IN TOUCH
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}