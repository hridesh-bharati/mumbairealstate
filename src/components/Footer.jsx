import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  DollarSign,
  Users,
  UserPlus,
  Mail,
  Phone,
  ShieldCheck,
  Building
} from 'lucide-react';
import './Footer.css'; // Dedicated CSS Import

export default function Footer() {
  const adminName = import.meta.env.VITE_ADMIN_NAME || "MR. Jugal Modi";
  const adminContact = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000";
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "info@namoproperties.com";

  return (
    <footer className="custom-footer-root pt-5 pb-4 mt-auto">
      <div className="container pb-4">
        <div className="row text-start g-4">

          {/* Brand Info Section */}
          <div className="col-12 col-md-4 mb-2">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="footer-icon-badge text-danger">
                <Building size={20} />
              </div>
              <h5 className="text-white fw-bold mb-0 text-uppercase tracking-wider">
                CJ Group Developer
              </h5>
            </div>
            <p className="small lh-base mb-0" style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
              CJ Group provides dynamic luxury real estate workspace architecture. Fully licensed operations managing premium residential assets and optimized commercial investment hubs.
            </p>
          </div>

          {/* Explore Stack */}
          <div className="col-6 col-md-2">
            <div className="footer-heading">Explore</div>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/buy" className="footer-link-item">
                  <Home size={16} className="text-success flex-shrink-0" />
                  <span>Buy</span>
                </Link>
              </li>
              <li>
                <Link to="/sell" className="footer-link-item">
                  <DollarSign size={16} className="text-warning flex-shrink-0" />
                  <span>Sell</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Agents Stack */}
          <div className="col-6 col-md-2">
            <div className="footer-heading">Agents</div>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/find-agent" className="footer-link-item">
                  <Users size={16} className="text-info flex-shrink-0" />
                  <span>Find an Agent</span>
                </Link>
              </li>
              <li>
                <Link to="/join-agent" className="footer-link-item">
                  <UserPlus size={16} className="text-danger flex-shrink-0" />
                  <span>Join as Partner</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Node Area */}
          <div className="col-12 col-md-4">
            <div className="footer-heading">Contact Support</div>
            <div className="d-flex flex-column gap-2">

              {/* Email */}
              <a href={`mailto:${adminEmail}`} className="footer-contact-link d-flex align-items-center gap-2.5">
                <Mail size={16} className="text-info flex-shrink-0 me-1" />
                <span className="text-truncate">{adminEmail}</span>
              </a>

              {/* Call */}
              <a href={`tel:${adminContact}`} className="footer-contact-link d-flex align-items-center gap-2.5">
                <Phone size={16} className="text-success flex-shrink-0 me-1" />
                <span>+{adminContact}</span>
              </a>

              <div className="d-flex align-items-center gap-2.5 pt-2 mt-1 border-top border-white border-opacity-10">
                <ShieldCheck size={18} className="text-warning flex-shrink-0 me-1" />
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                  Principal Desk: <strong className="text-white">{adminName}</strong>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Bottom Bar */}
        <div className="row align-items-center text-center g-3" style={{ fontSize: '0.8rem', color: '#64748b' }}>
          {/* Copyright */}
          <div className="col-12 col-md-4 text-md-start">
            &copy; {new Date().getFullYear()} CJ Group System Node. All rights reserved.
          </div>

          {/* Developer Credit */}
          <div className="col-12 col-md-4">
            <span>Develop by : </span>
            <a
              href="https://awebgrow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-credit-link"
            >
              AWebGrow
            </a>
          </div>

          {/* System Note */}
          <div className="col-12 col-md-4 text-md-end opacity-75" style={{ fontSize: '0.75rem' }}>
            Upscale real estate infrastructure & data sync frameworks.
          </div>
        </div>
      </div>
    </footer>
  );
}