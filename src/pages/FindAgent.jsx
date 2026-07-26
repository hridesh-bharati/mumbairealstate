import React from 'react';

export default function FindAgent() {
  // Admin WhatsApp Number from Vite Env or Fallback
  const adminWhatsAppNumber = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || '99139010000';

  // Agent Data with Custom Avatars & Phone
  const agents = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      title: 'Senior Real Estate Advisor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      market: 'New York • Manhattan'
    },
    {
      id: 2,
      name: 'Marcus Sterling',
      title: 'Luxury Property Specialist',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      market: 'California • Beverly Hills'
    },
    {
      id: 3,
      name: 'David Kim',
      title: 'Commercial & Residential Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      market: 'Florida • Miami'
    }
  ];

  // WhatsApp Redirect Handler for Individual Agent
  const handleContactAgent = (agentName, market) => {
    const message = 
`*Agent Contact Inquiry - CJ Group* 🏢
-----------------------------------
👤 *Agent Requested:* ${agentName}
📍 *Market:* ${market}
-----------------------------------
_Hi, I would like to connect with ${agentName} regarding a property inquiry._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container py-5">
      <div className="text-center my-5">
        <h2 className="display-6 fw-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Our Top Elite Agents
        </h2>
        <p className="text-muted small">
          Connect directly with our industry-leading local advisors for tailored real estate guidance.
        </p>
      </div>

      <div className="row g-4">
        {agents.map((agent) => (
          <div className="col-md-4" key={agent.id}>
            <div className="card rounded-0 text-center border p-4 shadow-sm h-100 hover-shadow transition-all">
              
              {/* HD Profile Avatar */}
              <div className="mb-3 position-relative d-inline-block mx-auto">
                <img 
                  src={agent.avatar} 
                  alt={agent.name}
                  className="rounded-circle object-fit-cover shadow-sm"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>

              <h5 className="fw-bold m-0" style={{ fontFamily: "'Playfair Display', serif" }}>
                {agent.name}
              </h5>
              <p className="text-primary small fw-semibold my-1" style={{ color: '#583beb' }}>
                {agent.title}
              </p>
              <p className="text-muted x-small mb-3" style={{ fontSize: '12px' }}>
                {agent.market}
              </p>

              {/* WhatsApp Contact Button */}
              <button 
                onClick={() => handleContactAgent(agent.name, agent.market)}
                className="btn btn-dark btn-sm rounded-0 w-100 py-2.5 text-uppercase fw-semibold d-inline-flex align-items-center justify-content-center gap-2 mt-auto border-0"
                style={{ backgroundColor: '#25D366', fontSize: '11px', letterSpacing: '1px' }}
              >
                {/* WhatsApp SVG Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                Contact Agent
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}