import React from 'react';

export default function Sell() {
  return (
    <div className="container py-5">
      <div className="row align-items-center my-4">
        <div className="col-md-6 pe-md-5">
          <h1 className="display-4 fw-bold mb-4">Sell your home with Compass</h1>
          <p className="lead text-muted mb-4">
            Compass guides you seamlessly through your home-selling journey. Work with the country's best agents to list, market, and sell at maximum value.
          </p>
          <button className="btn btn-dark rounded-0 px-4 py-3 fw-semibold text-uppercase">Get a Free Valuation</button>
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" alt="Consultation" className="img-fluid shadow" />
        </div>
      </div>
    </div>
  );
}