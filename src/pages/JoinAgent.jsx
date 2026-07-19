import React from 'react';

export default function JoinAgent() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="display-5 fw-bold mb-4">Grow your real estate career.</h2>
          <p className="lead text-muted mb-4">At Compass, we provide the ultimate technology stack, listing database tools, and workspace designs to make you the most competitive broker in your market.</p>
          <button className="btn btn-dark rounded-0 px-4 py-3 fw-bold text-uppercase">Apply to Join</button>
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80" alt="Join Team" className="img-fluid shadow-lg" />
        </div>
      </div>
    </div>
  );
}