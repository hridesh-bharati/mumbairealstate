import React from 'react';

const DUMMY_RENTS = [
  { id: 1, price: '$5,200/mo', beds: 2, baths: 2, sqft: '1,100', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=80', addr: '450 Lexington Ave, New York, NY' },
  { id: 2, price: '$4,300/mo', beds: 1, baths: 1, sqft: '850', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80', addr: '12 Hudson Yards, New York, NY' }
];

export default function Rent() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h1 className="fw-bold m-0">Apartments for Rent</h1>
        <span className="text-muted">{DUMMY_RENTS.length} rentals available</span>
      </div>
      <div className="row g-4">
        {DUMMY_RENTS.map(rent => (
          <div className="col-md-6" key={rent.id}>
            <div className="card rounded-0 border-0 shadow-sm h-100">
              <img src={rent.img} alt="rent" className="card-img-top rounded-0" style={{ height: '280px', objectFit: 'cover' }} />
              <div className="card-body">
                <h4 className="fw-bold text-dark">{rent.price}</h4>
                <p className="small text-muted mb-2">{rent.beds} Beds | {rent.baths} Baths | {rent.sqft} Sq Ft</p>
                <p className="card-text text-secondary mb-0">{rent.addr}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}