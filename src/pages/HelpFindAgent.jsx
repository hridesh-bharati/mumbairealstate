import React from 'react';

export default function HelpFindAgent() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="bg-light p-5 border shadow-sm text-center">
            <h3 className="fw-bold mb-3">Let us connect you with an Agent</h3>
            <p className="text-muted mb-4">Share some basic specifications about your property needs and our algorithmic matching tool will assign the top performing local specialist.</p>
            <form>
              <div className="mb-3">
                <input type="text" className="form-control rounded-0 form-control-lg" placeholder="Target Neighborhood (e.g. Tribeca)" />
              </div>
              <div className="mb-3">
                <input type="number" className="form-control rounded-0 form-control-lg" placeholder="Your Budget Max ($)" />
              </div>
              <button className="btn btn-dark w-100 rounded-0 py-3 text-uppercase fw-bold" type="button">Find Match</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}