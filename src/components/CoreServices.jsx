import React, { useEffect } from 'react';
import { Home, Building2, Landmark, Briefcase, ArrowUpRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CoreServices.css';

export default function CoreServices() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const services = [
    {
      id: 1,
      title: 'Residential',
      desc: 'Thoughtfully designed homes for modern living.',
      icon: Home,
      badgeBg: 'bg-danger bg-gradient',
      titleColor: 'text-danger',
      cardGradient: 'card-light-red',
      aosAnimation: 'fade-up',
      delay: 100
    },
    {
      id: 2,
      title: 'Commercial',
      desc: 'Smart spaces for business and growth.',
      icon: Building2,
      badgeBg: 'bg-warning bg-gradient',
      titleColor: 'text-warning-emphasis',
      cardGradient: 'card-light-gold',
      aosAnimation: 'fade-up',
      delay: 200
    },
    {
      id: 3,
      title: 'Construction',
      desc: 'Quality construction that lasts a lifetime.',
      icon: Landmark,
      badgeBg: 'bg-primary bg-gradient',
      titleColor: 'text-primary',
      cardGradient: 'card-light-blue',
      aosAnimation: 'fade-up',
      delay: 300
    },
    {
      id: 4,
      title: 'Interior Design',
      desc: 'Beautiful interiors that inspire lives.',
      icon: Briefcase,
      badgeBg: 'bg-success bg-gradient',
      titleColor: 'text-success',
      cardGradient: 'card-light-green',
      aosAnimation: 'fade-up',
      delay: 400
    }
  ];

  return (
    <section className="py-5 bg-white overflow-hidden">
      <div className="container py-3">

        {/* Section Header */}
        <div className="text-center mb-5" data-aos="zoom-in" data-aos-duration="800">
          <div className="d-inline-flex align-items-center gap-2 mb-2">
            <span className="bg-warning rounded-pill" style={{ width: '25px', height: '3px' }}></span>
            <span className="text-warning text-uppercase fw-bold small tracking-wider">WHAT WE DO</span>
            <span className="bg-warning rounded-pill" style={{ width: '25px', height: '3px' }}></span>
          </div>
          <h2 className="fw-bold text-dark display-6 mb-0">
            Our Core <span className="text-danger">Services</span>
          </h2>
        </div>

        {/* Rectangular Bootstrap Cards Grid */}
        <div className="row g-4 justify-content-center">
          {services.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="col-12 col-md-6 col-lg-3"
                data-aos={item.aosAnimation}
                data-aos-delay={item.delay}
              >
                <div className={`card h-100 border-0 rounded-4 p-3 bs-hover-card ${item.cardGradient}`}>
                  <div className="card-body d-flex flex-column justify-content-between p-2">

                    <div>
                      {/* Rectangular Icon Box */}
                      <div className={`d-inline-flex align-items-center justify-content-center rounded-3 p-3 mb-3 text-white shadow-sm ${item.badgeBg}`} style={{ width: '52px', height: '52px' }}>
                        <IconComponent size={24} />
                      </div>

                      {/* Title */}
                      <h5 className={`card-title fw-extrabold mb-2 ${item.titleColor}`}>
                        {item.title}
                      </h5>

                      {/* Description */}
                      <p className="card-text text-secondary small fw-medium mb-3">
                        {item.desc}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="d-flex align-items-center justify-content-between pt-3 border-top border-secondary-subtle">
                      <span className="text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Learn More</span>
                      <div className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center text-dark hover-arrow-circle" style={{ width: '28px', height: '28px' }}>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}