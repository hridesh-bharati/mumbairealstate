import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white-50 pt-5 pb-4 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row text-start">
          <div className="col-md-4 mb-4">
            <h5 className="text-white fw-bold mb-3 tracking-wider">COMPASS</h5>
            <p className="small">Compass is a real estate broker licensed by the State of California and abides by Equal Housing Opportunity laws.</p>
          </div>
          <div className="col-md-2 mb-4 col-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase">Explore</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/buy" className="text-reset text-decoration-none">Buy</Link></li>
              <li className="mb-2"><Link to="/rent" className="text-reset text-decoration-none">Rent</Link></li>
              <li className="mb-2"><Link to="/sell" className="text-reset text-decoration-none">Sell</Link></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4 col-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase">Agents</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/find-agent" className="text-reset text-decoration-none">Find an Agent</Link></li>
              <li className="mb-2"><Link to="/join-agent" className="text-reset text-decoration-none">Join Compass</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="text-white fw-bold mb-3 text-uppercase">Contact Us</h6>
            <p className="small mb-1">📧 support@compass.com</p>
            <p className="small">📞 +1 (800) 555-0199</p>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="text-center small">
          © {new Date().getFullYear()} Compass Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}