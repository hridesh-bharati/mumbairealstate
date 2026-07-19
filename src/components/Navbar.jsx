import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  Menu, X, ChevronDown, ChevronRight, Home, Key, 
  DollarSign, Sparkles, Building, Users, UserPlus, User,
  Eye, Calendar, Database, Layers, Briefcase, FileText, LogOut, LayoutDashboard
} from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Firebase Auth Session State Persistence Monitoring
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Scroll framework logic toggles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeDrawer = () => {
    const offcanvasEl = document.getElementById('cjGroupOffcanvas');
    if (offcanvasEl && window.bootstrap) {
      const offcanvasInstance = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (offcanvasInstance) offcanvasInstance.hide();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeDrawer();
      navigate('/login');
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const isActive = (path) => location.pathname === path;
  const isAdmin = user && user.email === "hridesh027@gmail.com";

  return (
    <>
      {/* Top Navbar Layer */}
      <nav className={`navbar navbar-expand-lg position-fixed w-100 px-lg-5 px-3 py-3 z-3 transition-all ${isScrolled ? 'scrolled-nav shadow-sm' : 'bg-transparent'}`}>
        <div className="container-fluid px-0">
          
          {/* Brand Logo Image */}
          <Link className="navbar-brand d-flex align-items-center gap-2 m-0 p-0" to="/" onClick={closeDrawer}>
            <img src="images/logo.png" alt="CJ Group Logo" className="brand-logo-img" />
          </Link>

          {/* Action Row for Mobile */}
          <div className="d-flex align-items-center gap-2 d-lg-none ms-auto">
            {user ? (
              <Link 
                to={isAdmin ? "/admin-dashboard" : "/"} 
                className={`btn mobile-login-btn p-2 d-flex align-items-center justify-content-center shadow-none border-0 ${isScrolled ? 'text-dark mob-btn-scrolled' : 'text-white'}`}
                aria-label="Dashboard"
              >
                {isAdmin ? <LayoutDashboard size={22} /> : <User size={22} />}
              </Link>
            ) : (
              <Link 
                to="/login" 
                className={`btn mobile-login-btn p-2 d-flex align-items-center justify-content-center shadow-none border-0 ${isScrolled ? 'text-dark mob-btn-scrolled' : 'text-white'}`}
                aria-label="User Login"
              >
                <User size={22} />
              </Link>
            )}

            <button 
              className={`btn p-2 shadow-none border-0 ${isScrolled ? 'text-dark' : 'text-white'}`} 
              type="button" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#cjGroupOffcanvas" 
            >
              <Menu size={26} />
            </button>
          </div>

          {/* DESKTOP PREMIUM MEGA MENU */}
          <div className="collapse navbar-collapse justify-content-end d-none d-lg-flex">
            <ul className="navbar-nav align-items-center gap-1">
              <li className="nav-item">
                <Link className={`nav-link pc-nav-link fw-medium px-3 rounded-2 transition-all ${isScrolled ? 'text-dark' : 'text-white'}`} to="/buy">Buy</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link pc-nav-link fw-medium px-3 rounded-2 transition-all ${isScrolled ? 'text-dark' : 'text-white'}`} to="/rent">Rent</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link pc-nav-link fw-medium px-3 rounded-2 transition-all ${isScrolled ? 'text-dark' : 'text-white'}`} to="/sell">Sell</Link>
              </li>

              {/* PC Dropdown: CJ Exclusives */}
              <li className="nav-item dropdown position-static">
                <span className={`nav-link pc-nav-link fw-medium px-3 rounded-2 cursor-pointer d-flex align-items-center gap-1 transition-all ${isScrolled ? 'text-dark' : 'text-white'}`} role="button">
                  CJ Exclusives <ChevronDown size={14} className="arrow-icon" />
                </span>
                <div className="dropdown-menu mega-menu border-0 m-0 p-4 shadow-lg position-absolute bg-white row w-100">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 border-end pe-4">
                        <span className="badge bg-purple-light text-purple mb-2 px-2 py-1 rounded">Market Secret</span>
                        <h5 className="fw-bold text-dark mb-2">CJ Exclusives</h5>
                        <p className="text-muted small">Access premium residential properties managed exclusively by our experts.</p>
                      </div>
                      <div className="col-md-8 ps-4 d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/exclusives/private" onClick={closeDrawer}>
                          <div className="pc-badge bg-purple"><Eye size={16} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Private Exclusives</div>
                            <div className="text-muted extra-small">Browse secret premium listings.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/exclusives/coming-soon" onClick={closeDrawer}>
                          <div className="pc-badge bg-blue"><Calendar size={16} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Coming Soon</div>
                            <div className="text-muted extra-small">Properties arriving on the marketplace within 30 days.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/exclusives/listings" onClick={closeDrawer}>
                          <div className="pc-badge bg-teal"><Database size={16} /></div>
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
              <li className="nav-item dropdown position-static">
                <span className={`nav-link pc-nav-link fw-medium px-3 rounded-2 cursor-pointer d-flex align-items-center gap-1 transition-all ${isScrolled ? 'text-dark' : 'text-white'}`} role="button">
                  New Development <ChevronDown size={14} className="arrow-icon" />
                </span>
                <div className="dropdown-menu mega-menu border-0 m-0 p-4 shadow-lg position-absolute bg-white row w-100">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 border-end pe-4">
                        <span className="badge bg-cyan-light text-cyan mb-2 px-2 py-1 rounded">Modern Living</span>
                        <h5 className="fw-bold text-dark mb-2">New Projects</h5>
                        <p className="text-muted small">Discover luxury architectural spaces and early pre-sale properties.</p>
                      </div>
                      <div className="col-md-8 ps-4 d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/development/current" onClick={closeDrawer}>
                          <div className="pc-badge bg-cyan"><Layers size={16} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Current Developments</div>
                            <div className="text-muted extra-small">Active construction sites open for early booking.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/development/marketing-group" onClick={closeDrawer}>
                          <div className="pc-badge bg-orange"><Briefcase size={16} /></div>
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
              <li className="nav-item dropdown position-static">
                <span className={`nav-link pc-nav-link fw-medium px-3 rounded-2 cursor-pointer d-flex align-items-center gap-1 transition-all ${isScrolled ? 'text-dark' : 'text-white'}`} role="button">
                  Agents <ChevronDown size={14} className="arrow-icon" />
                </span>
                <div className="dropdown-menu mega-menu border-0 m-0 p-4 shadow-lg position-absolute bg-white row w-100">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 border-end pe-4">
                        <span className="badge bg-pink-light text-pink mb-2 px-2 py-1 rounded">Expert Advisors</span>
                        <h5 className="fw-bold text-dark mb-2">Broker Networks</h5>
                        <p className="text-muted small">Partner with premium neighborhood advisors for seamless guidance.</p>
                      </div>
                      <div className="col-md-8 ps-4 d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/find-agent" onClick={closeDrawer}>
                          <div className="pc-badge bg-green"><Users size={16} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Find an Agent</div>
                            <div className="text-muted extra-small">Search from thousands of vetted area experts.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/help-agent" onClick={closeDrawer}>
                          <div className="pc-badge bg-pink"><FileText size={16} /></div>
                          <div>
                            <div className="fw-bold text-dark small mb-1">Help Match Broker</div>
                            <div className="text-muted extra-small">Let our smart metrics route you to the absolute perfect agent.</div>
                          </div>
                        </Link>
                        <Link className="mega-item d-flex align-items-start gap-3 p-3 rounded-3" to="/join-agent" onClick={closeDrawer}>
                          <div className="pc-badge bg-red"><UserPlus size={16} /></div>
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

              {/* Dynamic Authentication Button for Desktop */}
              {!loading && (
                <li className="nav-item ms-2">
                  {user ? (
                    <div className="d-flex align-items-center gap-2">
                      {isAdmin && (
                        <Link className={`nav-link border rounded-0 px-3 py-2 text-uppercase small tracking-wider fw-bold transition-all ${isScrolled ? 'border-primary text-primary' : 'border-info text-info'}`} to="/admin-dashboard">
                          Admin Panel
                        </Link>
                      )}
                      <button 
                        className={`nav-link border rounded-0 px-4 py-2 text-uppercase small tracking-wider fw-bold transition-all ${isScrolled ? 'border-danger text-danger hover-bg-danger text-white-hover' : 'border-white text-white hover-bg-white'}`} 
                        onClick={handleLogout}
                      >
                        <div className="d-flex align-items-center gap-1"><LogOut size={14} /> Sign Out</div>
                      </button>
                    </div>
                  ) : (
                    <Link className={`nav-link border rounded-0 px-4 py-2 text-uppercase small tracking-wider fw-bold transition-all ${isScrolled ? 'border-dark text-dark hover-bg-dark text-white-hover' : 'border-white text-white hover-bg-white'}`} to="/login">
                      Register / Sign In
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className="offcanvas offcanvas-start bg-white w-100 border-0" tabIndex="-1" id="cjGroupOffcanvas">
        <div className="bg-white px-4 pt-4 pb-3 d-flex flex-column gap-2">
          <div className="d-flex align-items-center justify-content-between">
            <img src="images/logo.png" alt="CJ Group Menu Logo" className="brand-logo-img drawer-logo" />
            <button type="button" className="btn-close shadow-none p-2 m-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
        </div>

        <div className="offcanvas-body p-0 overflow-y-auto">
          <div className="android-divider"></div>
          
          {/* Group 1: Management */}
          <div className="py-2">
            <div className="section-label px-4 py-1 mb-1">Management</div>
            <Link to="/buy" className={`android-item ${isActive('/buy') ? 'active' : ''}`} onClick={closeDrawer}>
              <div className="console-box bg-green text-white"><Home size={18} /></div>
              <span className="title-node">Buy Properties</span>
            </Link>
            <Link to="/rent" className={`android-item ${isActive('/rent') ? 'active' : ''}`} onClick={closeDrawer}>
              <div className="console-box bg-blue text-white"><Key size={18} /></div>
              <span className="title-node">Rent Spaces</span>
            </Link>
            <Link to="/sell" className={`android-item ${isActive('/sell') ? 'active' : ''}`} onClick={closeDrawer}>
              <div className="console-box bg-orange text-white"><DollarSign size={18} /></div>
              <span className="title-node">New Sales Request</span>
            </Link>
          </div>

          <div className="android-divider"></div>

          {/* Group 2: Marketing Dropdowns */}
          <div className="py-2">
            <div className="section-label px-4 py-1 mb-1">Marketing</div>
            
            <div>
              <div className="android-item justify-content-between" data-bs-toggle="collapse" data-bs-target="#mobExclusives" aria-expanded="false" role="button">
                <div className="d-flex align-items-center gap-3">
                  <div className="console-box bg-purple text-white"><Sparkles size={18} /></div>
                  <span className="title-node">CJ Exclusives</span>
                </div>
                <ChevronDown size={16} className="android-arrow text-muted" />
              </div>
              <div className="collapse" id="mobExclusives">
                <div className="android-sub-container">
                  <Link to="/exclusives/private" className={`android-item sub-item ${isActive('/exclusives/private') ? 'active' : ''}`} onClick={closeDrawer}>
                    <div className="console-box sub-box bg-purple-light text-purple"><Eye size={16} /></div>
                    <span className="title-node">Private Exclusives</span>
                  </Link>
                  <Link to="/exclusives/coming-soon" className={`android-item sub-item ${isActive('/exclusives/coming-soon') ? 'active' : ''}`} onClick={closeDrawer}>
                    <div className="console-box sub-box bg-purple-light text-purple"><Calendar size={16} /></div>
                    <span className="title-node">Coming Soon</span>
                  </Link>
                  <Link to="/exclusives/listings" className={`android-item sub-item ${isActive('/exclusives/listings') ? 'active' : ''}`} onClick={closeDrawer}>
                    <div className="console-box sub-box bg-purple-light text-purple"><Database size={16} /></div>
                    <span className="title-node">Property Catalog</span>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="android-item justify-content-between" data-bs-toggle="collapse" data-bs-target="#mobDev" aria-expanded="false" role="button">
                <div className="d-flex align-items-center gap-3">
                  <div className="console-box bg-cyan text-white"><Building size={18} /></div>
                  <span className="title-node">New Development</span>
                </div>
                <ChevronDown size={16} className="android-arrow text-muted" />
              </div>
              <div className="collapse" id="mobDev">
                <div className="android-sub-container">
                  <Link to="/development/current" className={`android-item sub-item ${isActive('/development/current') ? 'active' : ''}`} onClick={closeDrawer}>
                    <div className="console-box sub-box bg-cyan-light text-cyan"><Layers size={16} /></div>
                    <span className="title-node">Current Projects</span>
                  </Link>
                  <Link to="/development/marketing-group" className={`android-item sub-item ${isActive('/development/marketing-group') ? 'active' : ''}`} onClick={closeDrawer}>
                    <div className="console-box sub-box bg-cyan-light text-cyan"><Briefcase size={16} /></div>
                    <span className="title-node">Marketing Panels</span>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="android-item justify-content-between" data-bs-toggle="collapse" data-bs-target="#mobAgents" aria-expanded="false" role="button">
                <div className="d-flex align-items-center gap-3">
                  <div className="console-box bg-pink text-white"><Users size={18} /></div>
                  <span className="title-node">Broker Networks</span>
                </div>
                <ChevronDown size={16} className="android-arrow text-muted" />
              </div>
              <div className="collapse" id="mobAgents">
                <div className="android-sub-container">
                  <Link to="/find-agent" className={`android-item sub-item ${isActive('/find-agent') ? 'active' : ''}`} onClick={closeDrawer}>
                    <div className="console-box sub-box bg-pink-light text-pink"><Users size={16} /></div>
                    <span className="title-node">Find an Agent</span>
                  </Link>
                  <Link to="/help-agent" className={`android-item sub-item ${isActive('/help-agent') ? 'active' : ''}`} onClick={closeDrawer}>
                    <div className="console-box sub-box bg-pink-light text-pink"><FileText size={16} /></div>
                    <span className="title-node">Help Match Broker</span>
                  </Link>
                  <Link to="/join-agent" className={`android-item sub-item ${isActive('/join-agent') ? 'active' : ''}`} onClick={closeDrawer}>
                    <div className="console-box sub-box bg-pink-light text-pink"><UserPlus size={16} /></div>
                    <span className="title-node">Join as Partner</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Footer Profile Session Section */}
        <div className="p-3 border-top bg-white">
          {!loading && (
            user ? (
              <div className="d-flex flex-column gap-2">
                <Link to={isAdmin ? "/admin-dashboard" : "/"} className="android-item m-0 border-0" onClick={closeDrawer}>
                  <div className="console-box bg-primary text-white">
                    {isAdmin ? <LayoutDashboard size={18} /> : <User size={18} />}
                  </div>
                  <div className="d-flex flex-column flex-grow-1 ms-1">
                    <span className="fw-semibold text-dark small style-truncate" style={{ maxWidth: '170px' }}>
                      {user.email}
                    </span>
                    <span className="text-muted extra-small" style={{ fontSize: '10px' }}>
                      {isAdmin ? 'Admin Authorized' : 'Client Profile'}
                    </span>
                  </div>
                </Link>
                <button className="btn btn-outline-danger btn-sm w-100 mt-1 py-2 fw-semibold" onClick={handleLogout}>
                  Sign Out Session
                </button>
              </div>
            ) : (
              <Link to="/login" className="android-item m-0" onClick={closeDrawer}>
                <div className="console-box bg-red text-white"><User size={18} /></div>
                <div className="d-flex flex-column flex-grow-1 ms-1">
                  <span className="fw-semibold text-dark small">Account Profile</span>
                  <span className="text-muted extra-small" style={{ fontSize: '10px' }}>Sign-In or Configure</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}