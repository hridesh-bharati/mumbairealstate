import React from 'react';
import { Link } from 'react-router-dom';

export default function PopularMarkets() {
  const popularCities = [
    [
      { name: "Manhattan Real Estate", query: "Manhattan, NY" },
      { name: "Brooklyn Real Estate", query: "Brooklyn, NY" },
      { name: "Los Angeles Real Estate", query: "Los Angeles, CA" },
      { name: "San Francisco Real Estate", query: "San Francisco, CA" },
      { name: "Washington DC Real Estate", query: "Washington DC" },
    ],
    [
      { name: "Oakland Real Estate", query: "Oakland, CA" },
      { name: "Queens Real Estate", query: "Queens, NY" },
      { name: "San Jose Real Estate", query: "San Jose, CA" },
      { name: "Chicago Real Estate", query: "Chicago, IL" },
      { name: "Naples Real Estate", query: "Naples, FL" },
    ],
    [
      { name: "Santa Rosa Real Estate", query: "Santa Rosa, CA" },
      { name: "Beverly Hills Real Estate", query: "Beverly Hills, CA" },
      { name: "Miami Real Estate", query: "Miami, FL" },
      { name: "San Diego Real Estate", query: "San Diego, CA" },
      { name: "Philadelphia Real Estate", query: "Philadelphia, PA" },
    ],
    [
      { name: "Pasadena Real Estate", query: "Pasadena, CA" },
      { name: "Seattle Real Estate", query: "Seattle, WA" },
      { name: "San Antonio Real Estate", query: "San Antonio, TX" },
      { name: "Sacramento Real Estate", query: "Sacramento, CA" },
      { name: "Port St. Lucie Real Estate", query: "Port St. Lucie, FL" },
    ],
  ];

  const realEstateMarkets = [
    [
      { name: "Arizona Real Estate", query: "Arizona" },
      { name: "California Real Estate", query: "California" },
      { name: "Colorado Real Estate", query: "Colorado" },
      { name: "Connecticut Real Estate", query: "Connecticut" },
      { name: "DC Real Estate", query: "Washington DC" },
    ],
    [
      { name: "Florida Real Estate", query: "Florida" },
      { name: "Georgia Real Estate", query: "Georgia" },
      { name: "Illinois Real Estate", query: "Illinois" },
      { name: "Louisiana Real Estate", query: "Louisiana" },
      { name: "Maryland Real Estate", query: "Maryland" },
    ],
    [
      { name: "Massachusetts Real Estate", query: "Massachusetts" },
      { name: "Mississippi Real Estate", query: "Mississippi" },
      { name: "New Jersey Real Estate", query: "New Jersey" },
      { name: "New York Real Estate", query: "New York" },
      { name: "Pennsylvania Real Estate", query: "Pennsylvania" },
    ],
    [
      { name: "Tennessee Real Estate", query: "Tennessee" },
      { name: "Texas Real Estate", query: "Texas" },
      { name: "Virginia Real Estate", query: "Virginia" },
      { name: "Washington Real Estate", query: "Washington" },
      { name: "View All Markets", query: "Mumbai" },
    ],
  ];

  return (
    <div className="container py-5 my-3 text-start">
      {/* SECTION 1: POPULAR CITIES */}
      <div className="mb-5">
        <h3 className="fw-bold fs-5 text-dark mb-1">Real Estate in Popular Cities</h3>
        <p className="text-muted small mb-4">
          Browse listings, view photos, and connect with an agent to schedule a viewing in some of our most popular cities.
        </p>

        <div className="row g-3">
          {popularCities.map((column, colIdx) => (
            <div className="col-12 col-sm-6 col-lg-3" key={colIdx}>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                {column.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      to={`/map-search?location=${encodeURIComponent(item.query)}`}
                      className="text-dark text-decoration-underline fw-medium"
                      style={{ fontSize: '0.9rem' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: REAL ESTATE MARKETS */}
      <div>
        <h3 className="fw-bold fs-5 text-dark mb-1">Real Estate Markets</h3>
        <p className="text-muted small mb-4">
          Find your next dream home in one of our markets.
        </p>

        <div className="row g-3">
          {realEstateMarkets.map((column, colIdx) => (
            <div className="col-12 col-sm-6 col-lg-3" key={colIdx}>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                {column.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      to={`/map-search?location=${encodeURIComponent(item.query)}`}
                      className="text-dark text-decoration-underline fw-medium"
                      style={{ fontSize: '0.9rem' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}