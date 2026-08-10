import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Download,
  Trophy,
  Clock,
  Globe,
  Layers,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Calendar,
  HardHat,
  PenTool,
  FileText,
  Leaf,
  Sun,
  Droplet,
  Recycle,
  Newspaper,
  Quote,
  DownloadCloud,
  Building,
  Plus,
  Minus
} from 'lucide-react';

const About = () => {
  // ============ STATE FOR COUNTER ANIMATION ============
  const [counters, setCounters] = useState({
    projects: 0,
    townships: 0,
    delivery: 0,
    awards: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  // ============ STATE FOR TESTIMONIAL SLIDER ============
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // ============ STATE FOR FAQ ACCORDION ============
  const [openFaq, setOpenFaq] = useState(null);

  // ============ STATE FOR VIDEO MODAL ============
  const [showVideo, setShowVideo] = useState(false);

  // ============ DYNAMIC AOS INJECTION & INIT ============
  useEffect(() => {
    // Inject AOS CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/aos@next/dist/aos.css';
    document.head.appendChild(link);

    // Inject AOS JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.onload = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-in-out'
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  // ============ COUNTER ANIMATION EFFECT ============
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const targets = {
        projects: 50,
        townships: 12,
        delivery: 100,
        awards: 25
      };

      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setCounters({
          projects: Math.floor(progress * targets.projects),
          townships: Math.floor(progress * targets.townships),
          delivery: Math.floor(progress * targets.delivery),
          awards: Math.floor(progress * targets.awards)
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [isVisible]);

  // ============ TESTIMONIALS DATA ============
  const testimonials = [
    {
      id: 1,
      name: 'Mr. Rajesh Sharma',
      location: 'Mumbai',
      rating: 5,
      quote: 'CJ Group delivered our dream home with exceptional quality and timely completion. Truly a trusted partner in real estate.',
      image: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=2563eb&color=fff&size=60'
    },
    {
      id: 2,
      name: 'Mrs. Priya Patel',
      location: 'Delhi',
      rating: 5,
      quote: 'The attention to detail and premium quality materials used by CJ Group is unmatched. Our commercial space is now the talk of the town.',
      image: 'https://ui-avatars.com/api/?name=Priya+Patel&background=7c3aed&color=fff&size=60'
    },
    {
      id: 3,
      name: 'Mr. Vikram Singh',
      location: 'Pune',
      rating: 5,
      quote: 'From documentation to handover, the entire process was seamless. CJ Group made our investment journey smooth and rewarding.',
      image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=059669&color=fff&size=60'
    },
    {
      id: 4,
      name: 'Dr. Ananya Reddy',
      location: 'Hyderabad',
      rating: 5,
      quote: 'The eco-friendly features and sustainable design of our villa exceeded expectations. CJ Group truly cares about the environment.',
      image: 'https://ui-avatars.com/api/?name=Ananya+Reddy&background=ea580c&color=fff&size=60'
    }
  ];

  // ============ FAQ DATA ============
  const faqs = [
    {
      id: 1,
      question: 'Is CJ Group RERA registered?',
      answer: 'Yes, CJ Group is fully RERA registered with all necessary approvals and certifications. We maintain complete transparency in all our projects.'
    },
    {
      id: 2,
      question: 'What payment options are available?',
      answer: 'We offer flexible payment plans including construction-linked payments, down payment options, and easy EMI facilities through our partner banks.'
    },
    {
      id: 3,
      question: 'How long does project completion take?',
      answer: 'Project timelines vary based on the scope. We maintain a 100% on-time delivery track record with average completion of 18-24 months for residential projects.'
    },
    {
      id: 4,
      question: 'Do you offer interior design services?',
      answer: 'Yes, we have an in-house interior design team that works with you to create personalized living spaces that match your style and preferences.'
    },
    {
      id: 5,
      question: 'What is your warranty policy?',
      answer: 'We offer comprehensive structural warranty for 5-10 years depending on the project, along with post-handover support for any maintenance needs.'
    }
  ];

  // ============ TEAM MEMBERS DATA ============
  const teamMembers = [
    {
      id: 1,
      name: 'Mr. CJ Mohammed',
      role: 'Founder & Chairman',
      experience: '25+ Years',
      image: 'https://ui-avatars.com/api/?name=CJ+Mohammed&background=2563eb&color=fff&size=120',
      bio: 'Visionary leader with 25+ years in real estate development.'
    },
    {
      id: 2,
      name: 'Ms. Fatima Khan',
      role: 'Chief Architect',
      experience: '15+ Years',
      image: 'https://ui-avatars.com/api/?name=Fatima+Khan&background=7c3aed&color=fff&size=120',
      bio: 'Award-winning architect specializing in luxury residential design.'
    },
    {
      id: 3,
      name: 'Mr. Arjun Mehta',
      role: 'Project Director',
      experience: '18+ Years',
      image: 'https://ui-avatars.com/api/?name=Arjun+Mehta&background=059669&color=fff&size=120',
      bio: 'Expert in large-scale commercial and mixed-use developments.'
    },
    {
      id: 4,
      name: 'Ms. Neha Sharma',
      role: 'Interior Design Lead',
      experience: '12+ Years',
      image: 'https://ui-avatars.com/api/?name=Neha+Sharma&background=ea580c&color=fff&size=120',
      bio: 'Creative visionary behind our award-winning interior designs.'
    }
  ];

  // ============ AWARDS DATA ============
  const awards = [
    { id: 1, name: 'Best Luxury Developer 2023', icon: Trophy, year: '2023', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { id: 2, name: 'Green Building Award', icon: Leaf, year: '2022', color: 'linear-gradient(135deg, #10b981, #059669)' },
    { id: 3, name: 'Customer Satisfaction Award', icon: Users, year: '2022', color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
    { id: 4, name: 'Innovation in Design', icon: PenTool, year: '2021', color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
    { id: 5, name: 'Best Commercial Project', icon: Building, year: '2021', color: 'linear-gradient(135deg, #ec4899, #be185d)' },
    { id: 6, name: 'Sustainable Development Award', icon: Recycle, year: '2020', color: 'linear-gradient(135deg, #06b6d4, #0891b2)' }
  ];

  // ============ PROCESS STEPS ============
  const processSteps = [
    { id: 1, icon: FileText, title: 'Consultation', desc: 'Understanding your requirements and budget', color: 'linear-gradient(135deg, #16a34a, #15803d)' },
    { id: 2, icon: PenTool, title: 'Design', desc: 'Architectural planning and 3D visualization', color: 'linear-gradient(135deg, #ea580c, #c2410c)' },
    { id: 3, icon: HardHat, title: 'Construction', desc: 'Quality execution with premium materials', color: 'linear-gradient(135deg, #2563eb, #1d4ed8)' },
    { id: 4, icon: CheckCircle2, title: 'Handover', desc: 'Complete documentation and possession', color: 'linear-gradient(135deg, #9333ea, #7e22ce)' }
  ];

  // ============ PARTNERS DATA ============
  const partners = [
    { id: 1, name: 'HDFC Bank', logo: 'https://via.placeholder.com/150x80/2563eb/fff?text=HDFC' },
    { id: 2, name: 'ICICI Bank', logo: 'https://via.placeholder.com/150x80/ea580c/fff?text=ICICI' },
    { id: 3, name: 'Kotak Mahindra', logo: 'https://via.placeholder.com/150x80/dc2626/fff?text=Kotak' },
    { id: 4, name: 'SBI', logo: 'https://via.placeholder.com/150x80/0284c7/fff?text=SBI' },
    { id: 5, name: 'L&T', logo: 'https://via.placeholder.com/150x80/16a34a/fff?text=L%26T' },
    { id: 6, name: 'PWC', logo: 'https://via.placeholder.com/150x80/7c3aed/fff?text=PWC' }
  ];

  // ============ TESTIMONIAL NAVIGATION ============
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // ============ TOGGLE FAQ ============
  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section
      id="about"
      className="py-5 position-relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(248, 250, 252, 0.92) 0%, rgba(241, 245, 249, 0.96) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >

      {/* TOP-RIGHT LIGHT GLOW */}
      <div
        className="position-absolute rounded-circle pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(147, 51, 234, 0.08) 50%, transparent 70%)',
          top: '-150px',
          right: '-150px',
          filter: 'blur(40px)',
          zIndex: 0
        }}
      />

      {/* BOTTOM-LEFT LIGHT GLOW */}
      <div
        className="position-absolute rounded-circle pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          filter: 'blur(35px)',
          zIndex: 0
        }}
      />

      <div className="container position-relative z-1 py-3">

        {/* SECTION HEADER */}
        <div className="text-center mb-5" data-aos="fade-up">
          <span
            className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill text-uppercase fw-bold small mb-3 shadow-sm text-white glass-badge"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.85) 0%, rgba(168, 85, 247, 0.85) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Sparkles size={16} />
            Redefining Luxury Living
          </span>
          <h2 className="display-5 fw-bold text-dark mb-3">
            Welcome to <span style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CJ Group Developers</span>
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '780px' }}>
            Engineering iconic architectural landmarks and sustainable premium residential spaces that transform urban landscapes and elevate luxury living standards.
          </p>
        </div>

        {/* MAIN CONTENT - IMAGE + INFO */}
        <div className="row align-items-center g-5 mb-5">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="position-relative">
              <div className="rounded-4 overflow-hidden shadow-lg border border-4 border-white position-relative">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=650&fit=crop"
                  alt="CJ Group Luxury Real Estate"
                  className="img-fluid w-100 object-fit-cover"
                  style={{ minHeight: '480px', maxHeight: '540px' }}
                />
                <button
                  onClick={() => setShowVideo(true)}
                  className="position-absolute top-50 start-50 translate-middle btn rounded-circle p-4 shadow-lg border-0"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    transition: 'all 0.3s ease',
                    zIndex: 2
                  }}
                >
                  <Play size={35} className="text-white ms-1" />
                </button>
              </div>

              {/* Floating Badges */}
              <div
                className="position-absolute top-0 end-0 m-3 m-md-4 p-3 p-md-4 rounded-4 shadow-lg text-white glass-card"
                style={{
                  background: 'rgba(15, 23, 42, 0.82)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderLeft: '4px solid #f59e0b'
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle text-white d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                    <Award size={30} />
                  </div>
                  <div>
                    <h3 className="h2 fw-bold mb-0" style={{ color: '#fbbf24' }}>10+</h3>
                    <p className="small mb-0 text-light opacity-75 fw-medium">Years of Excellence</p>
                  </div>
                </div>
              </div>

              <div
                className="position-absolute bottom-0 start-0 m-3 m-md-4 p-3 rounded-4 shadow-lg glass-card d-flex align-items-center gap-3"
                style={{
                  maxWidth: '280px',
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.6)'
                }}
              >
                <div className="p-2 rounded-3 text-white d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', width: '42px', height: '42px' }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">100% Quality Assurance</h6>
                  <small className="text-muted">Eco-friendly & Sustainable</small>
                </div>
              </div>

              <div
                className="position-absolute bottom-0 end-0 m-3 m-md-4 p-3 rounded-4 shadow-lg text-white glass-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.9))',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <ShieldCheck size={20} />
                  <span className="fw-bold small">RERA Registered</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-left">
            <h3 className="h2 fw-bold mb-3" style={{ color: '#0f172a' }}>
              We Build Iconic Structures That Express <span style={{ color: '#2563eb' }}>Elegance</span> & <span style={{ color: '#16a34a' }}>Durability</span>
            </h3>
            <p className="text-secondary fs-6 mb-4">
              At CJ Group, we combine cutting-edge design, premium raw materials, and eco-friendly engineering to deliver high-end commercial hubs, prime plot developments, and luxury residential towers.
            </p>

            {/* GLASSMORPHISM 2x2 Feature Cards */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6" data-aos="zoom-in" data-aos-delay="100">
                <div className="p-3 rounded-4 glass-card shadow-sm border-0 h-100 d-flex align-items-center gap-3 transition-all">
                  <div className="p-3 rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', width: '48px', height: '48px' }}>
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">Smart Infrastructure</h6>
                    <p className="small text-muted mb-0">Automated living designs.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6" data-aos="zoom-in" data-aos-delay="200">
                <div className="p-3 rounded-4 glass-card shadow-sm border-0 h-100 d-flex align-items-center gap-3 transition-all">
                  <div className="p-3 rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', width: '48px', height: '48px' }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">Prime Locations</h6>
                    <p className="small text-muted mb-0">High investment growth.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6" data-aos="zoom-in" data-aos-delay="300">
                <div className="p-3 rounded-4 glass-card shadow-sm border-0 h-100 d-flex align-items-center gap-3 transition-all">
                  <div className="p-3 rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', width: '48px', height: '48px' }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">500+ Happy Clients</h6>
                    <p className="small text-muted mb-0">Trusted worldwide.</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6" data-aos="zoom-in" data-aos-delay="400">
                <div className="p-3 rounded-4 glass-card shadow-sm border-0 h-100 d-flex align-items-center gap-3 transition-all">
                  <div className="p-3 rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'linear-gradient(135deg, #9333ea, #7e22ce)', width: '48px', height: '48px' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">100% Legal RERA</h6>
                    <p className="small text-muted mb-0">Clear titles & verification.</p>
                  </div>
                </div>
              </div>
            </div>

            <ul className="list-unstyled mb-4">
              <li className="d-flex align-items-center mb-2">
                <CheckCircle2 className="me-2 flex-shrink-0 text-success" size={20} />
                <span className="fw-medium text-dark">Hassle-free documentation & instant registration support</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <CheckCircle2 className="me-2 flex-shrink-0 text-primary" size={20} />
                <span className="fw-medium text-dark">Designed by top-tier certified architects & structural engineers</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <CheckCircle2 className="me-2 flex-shrink-0 text-warning" size={20} />
                <span className="fw-medium text-dark">Eco-friendly construction with green building certifications</span>
              </li>
            </ul>

            <div className="d-flex flex-wrap gap-3 align-items-center pt-2">
              <a href="#contact" className="btn px-4 py-3 fw-bold rounded-3 shadow-sm d-inline-flex align-items-center gap-2 text-white" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', border: 'none' }}>
                Get In Touch <ArrowRight size={18} />
              </a>
              <a href="#" className="btn btn-outline-dark px-4 py-3 fw-bold rounded-3 d-inline-flex align-items-center gap-2 glass-btn">
                <Download size={18} /> Brochure
              </a>
            </div>
          </div>
        </div>

        {/* COUNTER BAR */}
        <div
          ref={counterRef}
          data-aos="fade-up"
          className="p-4 rounded-4 shadow text-white mt-5 glass-dark"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <div className="row text-center g-4">
            <div className="col-6 col-md-3 border-end border-secondary border-opacity-25">
              <h3 className="display-6 fw-bold mb-1 text-warning">
                {counters.projects}+
              </h3>
              <p className="text-uppercase small mb-0 text-light opacity-75 fw-semibold">Completed Projects</p>
            </div>
            <div className="col-6 col-md-3 border-md-end border-secondary border-opacity-25">
              <h3 className="display-6 fw-bold mb-1 text-info">
                {counters.townships}+
              </h3>
              <p className="text-uppercase small mb-0 text-light opacity-75 fw-semibold">Ongoing Townships</p>
            </div>
            <div className="col-6 col-md-3 border-end border-secondary border-opacity-25">
              <h3 className="display-6 fw-bold mb-1 text-success">
                {counters.delivery}%
              </h3>
              <p className="text-uppercase small mb-0 text-light opacity-75 fw-semibold">On-Time Delivery</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="display-6 fw-bold mb-1 text-danger">
                {counters.awards}+
              </h3>
              <p className="text-uppercase small mb-0 text-light opacity-75 fw-semibold">National Awards</p>
            </div>
          </div>
        </div>

        {/* PROCESS STEPS */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              Our <span style={{ color: '#2563eb' }}>Process</span>
            </h3>
            <p className="text-muted">How we bring your dream project to life</p>
          </div>
          <div className="row g-4">
            {processSteps.map((step, idx) => (
              <div key={step.id} className="col-md-3 col-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="text-center p-3 glass-card rounded-4 shadow-sm h-100 border-0 position-relative">
                  <div className="position-absolute top-0 start-50 translate-middle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '32px', height: '32px', background: step.color }}>
                    {step.id}
                  </div>
                  <div className="mt-3 pt-2">
                    <div className="p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: step.color, width: '60px', height: '60px' }}>
                      <step.icon size={28} />
                    </div>
                    <h6 className="fw-bold mb-1 text-dark">{step.title}</h6>
                    <small className="text-muted d-none d-md-block">{step.desc}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              Why Choose <span style={{ color: '#7c3aed' }}>CJ Group</span>?
            </h3>
          </div>
          <div className="row g-4">
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="text-center p-3 glass-card rounded-4 shadow-sm h-100 border-0">
                <div className="p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', width: '56px', height: '56px' }}>
                  <Trophy size={26} />
                </div>
                <h6 className="fw-bold mb-1 text-dark">Award Winning</h6>
                <small className="text-muted">25+ National Awards</small>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="text-center p-3 glass-card rounded-4 shadow-sm h-100 border-0">
                <div className="p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', width: '56px', height: '56px' }}>
                  <Clock size={26} />
                </div>
                <h6 className="fw-bold mb-1 text-dark">On-Time Delivery</h6>
                <small className="text-muted">100% Track Record</small>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="300">
              <div className="text-center p-3 glass-card rounded-4 shadow-sm h-100 border-0">
                <div className="p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', width: '56px', height: '56px' }}>
                  <Globe size={26} />
                </div>
                <h6 className="fw-bold mb-1 text-dark">Global Standards</h6>
                <small className="text-muted">International Quality</small>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="400">
              <div className="text-center p-3 glass-card rounded-4 shadow-sm h-100 border-0">
                <div className="p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #9333ea, #7e22ce)', width: '56px', height: '56px' }}>
                  <Layers size={26} />
                </div>
                <h6 className="fw-bold mb-1 text-dark">Integrated Solutions</h6>
                <small className="text-muted">End-to-End Services</small>
              </div>
            </div>
          </div>
        </div>

        {/* OUR TEAM */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              Meet Our <span style={{ color: '#0284c7' }}>Leadership Team</span>
            </h3>
            <p className="text-muted">Visionaries behind CJ Group's success</p>
          </div>
          <div className="row g-4">
            {teamMembers.map((member, idx) => (
              <div key={member.id} className="col-md-3 col-6" data-aos="flip-left" data-aos-delay={idx * 100}>
                <div className="text-center p-3 glass-card rounded-4 shadow-sm h-100 border-0">
                  <img src={member.image} alt={member.name} className="rounded-circle mb-2 shadow-sm" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                  <h6 className="fw-bold mb-0 text-dark">{member.name}</h6>
                  <small className="fw-semibold d-block text-primary">{member.role}</small>
                  <small className="text-muted d-block">{member.experience}</small>
                  <small className="text-muted d-none d-md-block">{member.bio}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AWARDS & CERTIFICATIONS */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              Awards & <span style={{ color: '#ea580c' }}>Certifications</span>
            </h3>
          </div>
          <div className="row g-3">
            {awards.map((award, idx) => (
              <div key={award.id} className="col-md-4 col-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="d-flex align-items-center gap-3 p-3 glass-card rounded-4 shadow-sm border-0 h-100">
                  <div className="p-3 rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm" style={{ background: award.color, width: '48px', height: '48px' }}>
                    <award.icon size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">{award.name}</h6>
                    <small className="text-muted">{award.year}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUSTAINABILITY COMMITMENT */}
        <div className="mt-5 pt-4" data-aos="zoom-in">
          <div className="p-4 glass-card rounded-4 shadow-sm border-0">
            <div className="text-center mb-3">
              <div className="p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', width: '64px', height: '64px' }}>
                <Leaf size={32} />
              </div>
              <h3 className="h2 fw-bold text-dark mt-2">
                Our <span style={{ color: '#059669' }}>Sustainability</span> Commitment
              </h3>
            </div>
            <div className="row g-4">
              <div className="col-md-3 col-6 text-center">
                <div className="p-3 rounded-3 text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', width: '50px', height: '50px' }}>
                  <Sun size={24} />
                </div>
                <h6 className="fw-bold mt-2 text-dark">Solar Energy</h6>
                <small className="text-muted">30% energy from solar</small>
              </div>
              <div className="col-md-3 col-6 text-center">
                <div className="p-3 rounded-3 text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', width: '50px', height: '50px' }}>
                  <Droplet size={24} />
                </div>
                <h6 className="fw-bold mt-2 text-dark">Water Harvesting</h6>
                <small className="text-muted">Rainwater collection</small>
              </div>
              <div className="col-md-3 col-6 text-center">
                <div className="p-3 rounded-3 text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #059669, #047857)', width: '50px', height: '50px' }}>
                  <Recycle size={24} />
                </div>
                <h6 className="fw-bold mt-2 text-dark">Waste Management</h6>
                <small className="text-muted">Zero waste construction</small>
              </div>
              <div className="col-md-3 col-6 text-center">
                <div className="p-3 rounded-3 text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', width: '50px', height: '50px' }}>
                  <Leaf size={24} />
                </div>
                <h6 className="fw-bold mt-2 text-dark">Green Spaces</h6>
                <small className="text-muted">40% green area</small>
              </div>
            </div>
          </div>
        </div>

        {/* PARTNERS / ASSOCIATES */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              Our <span style={{ color: '#2563eb' }}>Partners</span>
            </h3>
          </div>
          <div className="row g-3 justify-content-center">
            {partners.map((partner) => (
              <div key={partner.id} className="col-md-2 col-4">
                <div className="p-3 glass-card rounded-4 shadow-sm text-center border-0 h-100 d-flex align-items-center justify-content-center">
                  <img src={partner.logo} alt={partner.name} className="rounded-3" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS SLIDER */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              What Our <span style={{ color: '#d97706' }}>Clients Say</span>
            </h3>
          </div>
          <div className="position-relative glass-card p-4 rounded-4 shadow-sm border-0">
            <div className="text-center">
              <Quote size={40} className="mb-3 text-warning opacity-75" />
              <p className="fs-5 fst-italic text-dark mb-3">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="rounded-circle shadow-sm" style={{ width: '50px', height: '50px' }} />
                <div className="text-start">
                  <h6 className="fw-bold mb-0 text-dark">{testimonials[currentTestimonial].name}</h6>
                  <small className="text-muted">{testimonials[currentTestimonial].location}</small>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
            </div>
            <button
              onClick={prevTestimonial}
              className="position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle shadow-sm border-0 glass-btn"
              style={{ width: '40px', height: '40px' }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle shadow-sm border-0 glass-btn"
              style={{ width: '40px', height: '40px' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* FAQ / ACCORDION */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              Frequently Asked <span style={{ color: '#2563eb' }}>Questions</span>
            </h3>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((faq) => (
                <div key={faq.id} className="mb-2">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-100 d-flex justify-content-between align-items-center p-3 glass-card border-0 rounded-3 text-start shadow-sm"
                  >
                    <span className="fw-bold text-dark">{faq.question}</span>
                    {openFaq === faq.id ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                  </button>
                  {openFaq === faq.id && (
                    <div className="p-3 glass-card border-top-0 rounded-3 rounded-top-0">
                      <p className="text-muted mb-0">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TIMELINE / JOURNEY */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              Our <span style={{ color: '#9333ea' }}>Journey</span>
            </h3>
          </div>
          <div className="row g-3">
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="text-center p-3 glass-card rounded-4 shadow-sm border-0">
                <div className="fw-bold display-6 text-primary">2015</div>
                <small className="text-muted">Founded with Vision</small>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="text-center p-3 glass-card rounded-4 shadow-sm border-0">
                <div className="fw-bold display-6 text-success">2017</div>
                <small className="text-muted">First Major Project</small>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="300">
              <div className="text-center p-3 glass-card rounded-4 shadow-sm border-0">
                <div className="fw-bold display-6 text-warning">2020</div>
                <small className="text-muted">Pan-India Expansion</small>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="400">
              <div className="text-center p-3 glass-card rounded-4 shadow-sm border-0">
                <div className="fw-bold display-6 text-danger">2024</div>
                <small className="text-muted">Global Recognition</small>
              </div>
            </div>
          </div>
        </div>

        {/* PRESS COVERAGE */}
        <div className="mt-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="h2 fw-bold text-dark">
              In The <span style={{ color: '#2563eb' }}>News</span>
            </h3>
          </div>
          <div className="row g-3">
            <div className="col-md-4 col-6" data-aos="fade-right">
              <div className="p-3 glass-card rounded-4 shadow-sm text-center border-0 h-100">
                <div className="p-2 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', width: '48px', height: '48px' }}>
                  <Newspaper size={24} />
                </div>
                <h6 className="fw-bold text-dark small">Economic Times</h6>
                <p className="small text-muted mb-0">"CJ Group sets new benchmark in luxury real estate"</p>
              </div>
            </div>
            <div className="col-md-4 col-6" data-aos="fade-up">
              <div className="p-3 glass-card rounded-4 shadow-sm text-center border-0 h-100">
                <div className="p-2 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', width: '48px', height: '48px' }}>
                  <Newspaper size={24} />
                </div>
                <h6 className="fw-bold text-dark small">Times of India</h6>
                <p className="small text-muted mb-0">"Sustainable living redefined by CJ Group"</p>
              </div>
            </div>
            <div className="col-md-4 col-6" data-aos="fade-left">
              <div className="p-3 glass-card rounded-4 shadow-sm text-center border-0 h-100">
                <div className="p-2 rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', width: '48px', height: '48px' }}>
                  <Newspaper size={24} />
                </div>
                <h6 className="fw-bold text-dark small">Business Standard</h6>
                <p className="small text-muted mb-0">"Innovation in design: CJ Group leads the way"</p>
              </div>
            </div>
          </div>
        </div>

        {/* VIDEO MODAL */}
        {showVideo && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              backdropFilter: 'blur(8px)'
            }}
            onClick={() => setShowVideo(false)}
          >
            <div
              className="bg-white rounded-4 p-2 position-relative shadow-lg"
              style={{ maxWidth: '800px', width: '95%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="position-absolute top-0 end-0 btn btn-light rounded-circle m-2"
                style={{ width: '40px', height: '40px' }}
              >
                <X size={20} />
              </button>
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="CJ Group Video"
                  allowFullScreen
                  allow="autoplay"
                  className="rounded-3"
                />
              </div>
            </div>
          </div>
        )}

        {/* ADDITIONAL CTA / BROCHURE DOWNLOAD */}
        <div className="mt-5 pt-4" data-aos="zoom-in">
          <div
            className="p-4 rounded-4 text-center text-white glass-dark"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(49, 46, 129, 0.9) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <h3 className="fw-bold mb-3">
              Ready to Build Your <span style={{ color: '#fbbf24' }}>Dream Space</span>?
            </h3>
            <p className="mb-3 opacity-75">
              Download our brochure or schedule a consultation with our experts
            </p>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <a href="#" className="btn px-4 py-2 fw-bold rounded-3 d-inline-flex align-items-center gap-2 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none' }}>
                <DownloadCloud size={18} /> Download Brochure
              </a>
              <a href="#contact" className="btn btn-outline-light px-4 py-2 fw-bold rounded-3 d-inline-flex align-items-center gap-2">
                <Calendar size={18} /> Schedule Visit
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* GLASSMORPHISM & CSS STYLES */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.6) !important;
        }

        .glass-btn {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
        }

        .transition-all {
          transition: all 0.3s ease;
          cursor: default;
        }

        .transition-all:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 12px 28px rgba(31, 38, 135, 0.12) !important;
          background: rgba(255, 255, 255, 0.85) !important;
        }

        @media (max-width: 768px) {
          .border-md-end {
            border-right: none !important;
          }
        }

        .btn-light:hover {
          background: #ffffff !important;
        }
      `}</style>
    </section>
  );
};

export default About;