import React from 'react';

export default function FindAgent() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Our Top Elite Agents</h2>
      <div className="row g-4">
        {['Sarah Jenkins', 'Marcus Sterling', 'David Kim'].map((agent, i) => (
          <div className="col-md-4" key={i}>
            <div className="card rounded-0 text-center border p-4 shadow-sm">
              <div className="mb-3">
                <div className="bg-secondary rounded-circle mx-auto" style={{ width: '90px', height: '90px', backgroundImage: `url('https://randomuser.me/api/portraits/men/${30 + i}.jpg')`, backgroundSize: 'cover' }}></div>
              </div>
              <h5 className="fw-bold m-0">{agent}</h5>
              <p className="text-muted small">Senior Real Estate Advisor</p>
              <button className="btn btn-outline-dark btn-sm rounded-0 w-100">Contact Agent</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}