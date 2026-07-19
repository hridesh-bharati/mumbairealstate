import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Neighborhoods.css';

const NEIGHBORHOODS_DATA = [
  { id: 1, title: 'New York City', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'The Hamptons', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'South Florida', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'Greater Boston', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80' },
  { id: 5, title: 'Southern California', image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=600&q=80' },
  { id: 6, title: 'DC, Maryland, & Virginia', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80' }
];

export default function Neighborhoods() {
  return (
    <section className="neighborhood-section bg-white py-5">
      <div className="container px-4 px-lg-5">
        
        {/* Header Content */}
        <div className="text-start mb-5">
          <h2 className="display-5 fw-bold text-dark font-serif mb-2 tracking-tight">
            Find the Neighborhood For You
          </h2>
          <p className="text-secondary fs-5 fw-normal">
            The neighborhoods best suited to your lifestyle, and the agents who know them best.
          </p>
        </div>

        {/* Dynamic Image Grid */}
        <div className="row g-4 mb-5">
          {NEIGHBORHOODS_DATA.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
              <div className="neighborhood-card position-relative overflow-hidden cursor-pointer">
                
                {/* Background Image Layer */}
                <div 
                  className="card-bg-image" 
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>

                {/* Dark Overlay */}
                <div className="card-dark-overlay"></div>

                {/* Text Title inside the image */}
                <div className="card-content-box position-absolute start-0 bottom-0 p-4 w-100 z-2">
                  <h3 className="text-white fw-bold fs-4 m-0 d-inline-block position-relative animated-underline">
                    {item.title}
                  </h3>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-start">
          <button className="btn btn-dark view-more-pill d-inline-flex align-items-center gap-3 px-4 py-3 rounded-pill border-0 transition-all">
            <span className="fw-semibold text-uppercase tracking-wider" style={{ fontSize: '13px' }}>
              View More Neighborhoods
            </span>
            <ArrowRight size={18} className="arrow-icon-shift" />
          </button>
        </div>

      </div>
    </section>
  );
}