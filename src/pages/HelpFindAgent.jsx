import React, { useState } from 'react';

export default function HelpFindAgent() {
  const [neighborhood, setNeighborhood] = useState('');
  const [budget, setBudget] = useState('');

  // Admin WhatsApp Number from Vite Env or Fallback
  const adminWhatsAppNumber = import.meta.env.VITE_ADMIN_CONTACT_NUMBER || '99139010000';

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    if (!neighborhood || !budget) {
      alert('Please fill in both Neighborhood and Budget fields.');
      return;
    }

    // Formatting Message for WhatsApp
    const message =
      `*Agent Matching Request - CJ Group* 🏡
-----------------------------------
📍 *Target Neighborhood:* ${neighborhood}
💰 *Max Budget:* $${Number(budget).toLocaleString()}
-----------------------------------
_Sent via CJ Group Portal_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="bg-light p-4 p-md-5 border shadow-sm text-center">
            <h3 className="fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let us connect you with an Agent
            </h3>
            <p className="text-muted mb-4 small">
              Share some basic specifications about your property needs and our algorithmic matching tool will assign the top performing local specialist.
            </p>

            <form onSubmit={handleWhatsAppSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="form-control rounded-0 form-control-lg fs-6"
                  placeholder="Target Neighborhood (e.g. Tribeca)"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="form-control rounded-0 form-control-lg fs-6"
                  placeholder="Your Budget Max ($)"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn text-white w-100 rounded-0 py-3 text-uppercase fw-bold d-inline-flex align-items-center justify-content-center gap-2 border-0"
                style={{ backgroundColor: '#25D366', fontSize: '13px', letterSpacing: '1px' }}
              >
                {/* WhatsApp SVG Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                Find Match via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}