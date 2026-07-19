import React from 'react';

const DUMMY_HOMES = [
  { id: 1, price: '$2,350,000', beds: 4, baths: 3.5, sqft: '3,200', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80', addr: '124 West End Ave, New York, NY' },
  { id: 2, price: '$1,890,000', beds: 3, baths: 2.5, sqft: '2,400', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80', addr: '87 Greenwich St, New York, NY' },
  { id: 3, price: '$4,120,000', beds: 5, baths: 5, sqft: '4,800', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80', addr: '15 Central Park S, New York, NY' }
];

export default function Buy() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h1 className="fw-bold m-0">Properties for Sale</h1>
        <span className="text-muted">{DUMMY_HOMES.length} exclusive listings</span>
      </div>
      
      {/* Search Grid */}
      <div className="row g-4">
        {DUMMY_HOMES.map(home => (
          <div className="col-md-4" key={home.id}>
            <div className="card rounded-0 border-0 shadow-sm h-100">
              <img src={home.img} alt="home" className="card-img-top rounded-0" style={{ height: '240px', objectFit: 'cover' }} />
              <div className="card-body">
                <h4 className="fw-bold text-dark">{home.price}</h4>
                <p className="small text-muted mb-2">{home.beds} Beds | {home.baths} Baths | {home.sqft} Sq Ft</p>
                <p className="card-text text-secondary mb-0">{home.addr}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}