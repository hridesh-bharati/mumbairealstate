import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  DollarSign,
  Key,
  Users,
  UserPlus,
  Mail,
  Phone,
  ShieldCheck,
  Building
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
  // Environment variables injection
  const adminName = import.meta.env.VITE_ADMIN_NAME || "MR. Jugal Modi";
  const adminContact = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000";
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "info@namoproperties.com";

  return (
    <footer className="footer-global-node pt-5 pb-4 mt-auto border-top border-white border-opacity-10 text-white-50">
      <div className="container">
        <div className="row text-start g-4">

          {/* Brand Info Section */}
          <div className="col-md-4 mb-2">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="footer-console-box bg-warning text-dark d-flex align-items-center justify-content-center">
                <Building size={16} />
              </div>
              <h5 className="text-white fw-bold mb-0 tracking-wider text-uppercase" style={{ fontSize: '16px', letterSpacing: '1px' }}>
                CJ Group
              </h5>
            </div>
            <p className="small text-light lh-base opacity-75">
              CJ Group provides dynamic luxury real estate workspace architecture. Fully licensed operations managing premium residential assets and optimized commercial investment hubs.
            </p>
          </div>

          {/* Explore Stack */}
          <div className="col-md-2 col-6">
            <div className="text-white-50 small fw-bold text-uppercase mb-3 tracking-wider" style={{ fontSize: '11px' }}>Explore</div>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link to="/buy" className="footer-android-link d-inline-flex align-items-center gap-2 py-1 px-2 rounded text-decoration-none text-white-50">
                  <span className="text-success d-flex align-items-center"><Home size={14} /></span>
                  <span>Buy</span>
                </Link>
              </li>
              <li>
                <Link to="/sell" className="footer-android-link d-inline-flex align-items-center gap-2 py-1 px-2 rounded text-decoration-none text-white-50">
                  <span className="text-warning d-flex align-items-center"><DollarSign size={14} /></span>
                  <span>Sell</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Agents Stack */}
          <div className="col-md-2 col-6">
            <div className="text-white-50 small fw-bold text-uppercase mb-3 tracking-wider" style={{ fontSize: '11px' }}>Agents</div>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link to="/find-agent" className="footer-android-link d-inline-flex align-items-center gap-2 py-1 px-2 rounded text-decoration-none text-white-50">
                  <span className="text-info d-flex align-items-center"><Users size={14} /></span>
                  <span>Find an Agent</span>
                </Link>
              </li>
              <li>
                <Link to="/join-agent" className="footer-android-link d-inline-flex align-items-center gap-2 py-1 px-2 rounded text-decoration-none text-white-50">
                  <span className="text-danger d-flex align-items-center"><UserPlus size={14} /></span>
                  <span>Join as Partner</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Node Area */}
          <div className="col-md-4">
            <div className="text-white-50 small fw-bold text-uppercase mb-3 tracking-wider" style={{ fontSize: '11px' }}>Contact Support</div>
            <div className="d-flex flex-column gap-2 text-light small opacity-90">

              {/* ⚡ CLICK TO EMAIL ACTION */}
              <a
                href={`mailto:${adminEmail}`}
                className="d-flex align-items-center gap-3 py-1 text-decoration-none text-light footer-contact-interactive-link"
              >
                <span className="text-white-50 d-flex align-items-center"><Mail size={14} /></span>
                <span className="text-truncate">{adminEmail}</span>
              </a>

              {/* ⚡ CLICK TO CALL ACTION */}
              <a
                href={`tel:${adminContact}`}
                className="d-flex align-items-center gap-3 py-1 text-decoration-none text-light footer-contact-interactive-link"
              >
                <span className="text-white-50 d-flex align-items-center"><Phone size={14} /></span>
                <span>+{adminContact}</span>
              </a>

              <div className="d-flex align-items-center gap-3 py-1 mt-1 border-top border-white border-opacity-10 pt-2">
                <span className="text-warning d-flex align-items-center"><ShieldCheck size={14} /></span>
                <span style={{ fontSize: '11px' }} className="text-white-50">Principal Desk: <strong>{adminName}</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* Custom Material UI Horizontal Divider Line */}
        <div className="w-100 my-4 bg-white opacity-10" style={{ height: '1px' }}></div>

      <div className="row align-items-center text-center small text-white-50 opacity-75 g-3">
  {/* लेफ्ट साइड - कॉपीराइट */}
  <div className="col-md-4 text-md-start mb-2 mb-md-0">
    &copy; {new Date().getFullYear()} CJ Group System Node. All rights reserved.
  </div>
  
  {/* बीच में - डेवलपर क्रेडिट */}
  <div className="col-md-4 mb-2 mb-md-0">
    <span>Develop by : </span>
    <a 
      href="https://awebgrow.com/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-decoration-none fw-medium text-warning transition-all"
      style={{ color: '#fbbf24' }}
    >
      AWebGrow 
    </a>
  </div>
  
  {/* राइट साइड - सिस्टम नोट */}
  <div className="col-md-4 text-md-end opacity-50" style={{ fontSize: '11px' }}>
    Designed for upscale real estate infrastructure & data sync frameworks.
  </div>
</div>
      </div>
    </footer>
  );
}