import React from 'react';

export default function NewDevelopment() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-2">New Luxury Developments</h2>
      <p className="text-muted mb-5">Unveiling new luxury state-of-the-art building developments.</p>
      
      <div className="row g-4">
        <div className="col-md-12">
          <div className="card rounded-0 border-0 shadow-lg overflow-hidden">
            <div className="row g-0">
              <div className="col-md-8">
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80" alt="sky" className="img-fluid h-100" style={{ objectFit: 'cover', minHeight: '350px' }} />
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <div className="card-body p-4">
                  <span className="badge bg-dark rounded-0 mb-2">Pre-Sales Open</span>
                  <h3 className="fw-bold">The Sapphire Condos</h3>
                  <p className="text-muted">High-rise luxury overlooking central park. Designed by world renown architect.</p>
                  <p className="fw-bold">Starting from $3,500,000</p>
                  <button className="btn btn-outline-dark btn-sm rounded-0">Inquire Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}