import React, { useState, useEffect } from 'react';
import { 
  Edit, Trash2, Search, Sparkles, Building2, Eye, MapPin, 
  Bed, Bath, Maximize, CheckCircle2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ManageDevelopments({ developments = [], onDelete, onEdit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDev, setSelectedDev] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const statusOptions = ['all', 'pre-construction', 'under construction', 'completed'];

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const getStatusBadgeClass = (status) => {
    const map = {
      'pre-construction': 'bg-warning text-dark',
      'under construction': 'bg-primary text-white',
      'completed': 'bg-success text-white'
    };
    return map[status] || 'bg-secondary text-white';
  };

  const getImages = (dev) => {
    if (dev?.images?.length) return dev.images;
    if (dev?.img) return [dev.img];
    if (dev?.image) return [dev.image];
    return ['https://via.placeholder.com/600x400?text=No+Image'];
  };

  const openModal = (dev) => {
    setSelectedDev(dev);
    setActiveImgIdx(0);
  };

  const filtered = developments.filter(dev => {
    const matchSearch = dev.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        dev.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || dev.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-0 text-start">
      
      {/* Top Banner Header */}
      <div className="app-card bg-gradient-purple mb-3 text-white" data-aos="fade-down">
        <div className="card-inner-padding d-flex align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="glass-icon-box p-2 rounded-4 d-flex align-items-center justify-content-center">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <p className="text-uppercase tracking-wider text-white-50 small fw-bold mb-0" style={{ fontSize: '0.7rem' }}>
                ADMINISTRATION
              </p>
              <h5 className="fw-bold mb-0">Manage Developments</h5>
            </div>
          </div>
          <span className="glass-icon-box text-white px-3 py-1 rounded-pill small fw-semibold d-none d-sm-inline-block">
            {developments.length} Total
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="card border-0 rounded-4 p-2 p-md-4 shadow-sm bg-white" data-aos="fade-up">
        
        {/* Search & Filters */}
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-0 rounded-start-3">
                <Search size={18} className="text-secondary" />
              </span>
              <input
                type="text"
                className="form-control app-input border bg-light"
                placeholder="Search developments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select app-input border bg-light text-capitalize"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt === 'all' ? 'All Statuses' : opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table List / Empty State */}
        {!filtered.length ? (
          <div className="text-center py-5" data-aos="zoom-in">
            <Building2 size={48} className="text-muted mb-3 opacity-50" />
            <p className="text-muted fw-semibold mb-0">No developments found</p>
          </div>
        ) : (
          <div className="table-responsive rounded-3 border">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="small text-uppercase text-secondary">
                  <th className="py-2.5 ps-3">Image</th>
                  <th className="py-2.5">Title</th>
                  <th className="py-2.5">Location</th>
                  <th className="py-2.5">Price</th>
                  <th className="py-2.5 text-center">Beds</th>
                  <th className="py-2.5 text-center">Baths</th>
                  <th className="py-2.5 text-center">Sq Ft</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dev) => {
                  const imgs = getImages(dev);
                  return (
                    <tr key={dev.id}>
                      <td className="ps-3">
                        <div className="position-relative d-inline-block">
                          <img 
                            src={imgs[0]} 
                            alt={dev.title}
                            className="rounded-3 object-fit-cover cursor-pointer border"
                            width="55"
                            height="42"
                            onClick={() => openModal(dev)}
                          />
                          {imgs.length > 1 && (
                            <span className="position-absolute bottom-0 end-0 badge bg-dark opacity-75 p-1 me-1 mb-1" style={{ fontSize: '0.6rem' }}>
                              +{imgs.length - 1}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="fw-bold text-dark">{dev.title}</td>
                      <td className="text-muted small">{dev.location}</td>
                      <td className="fw-bold text-primary">{dev.price}</td>
                      <td className="text-center fw-semibold">{dev.beds}</td>
                      <td className="text-center fw-semibold">{dev.baths}</td>
                      <td className="text-center fw-semibold">{dev.sqft}</td>
                      <td>
                        <span className={`badge text-capitalize px-2.5 py-1.5 rounded-pill ${getStatusBadgeClass(dev.status)}`} style={{ fontSize: '0.72rem' }}>
                          {dev.status}
                        </span>
                      </td>
                      <td className="text-end pe-3">
                        <div className="d-flex justify-content-end gap-1">
                          <button className="btn btn-sm btn-light border rounded-2 p-1.5" title="View" onClick={() => openModal(dev)}>
                            <Eye size={15} className="text-info" />
                          </button>
                          <button className="btn btn-sm btn-light border rounded-2 p-1.5" title="Edit" onClick={() => onEdit?.(dev)}>
                            <Edit size={15} className="text-primary" />
                          </button>
                          <button className="btn btn-sm btn-light border rounded-2 p-1.5" title="Delete" onClick={() => onDelete?.(dev.id)}>
                            <Trash2 size={15} className="text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedDev && (() => {
        const imgs = getImages(selectedDev);
        const metaFields = [
          { label: 'Total Units', value: selectedDev.totalUnits },
          { label: 'Floors', value: selectedDev.floors },
          { label: 'Year Built', value: selectedDev.yearBuilt },
          { label: 'Parking Spots', value: selectedDev.parkingSpots },
          { label: 'Completion', value: selectedDev.completionDate },
          { label: 'Occupancy', value: selectedDev.occupancyDate },
          { label: 'Neighborhood', value: selectedDev.neighborhood },
          { label: 'Pet Policy', value: selectedDev.petPolicy }
        ].filter(item => Boolean(item.value));

        return (
          <div className="modal fade show d-block bg-dark bg-opacity-75" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" data-aos="zoom-in">
              <div className="modal-content rounded-4 border-0 overflow-hidden">
                
                {/* Modal Header */}
                <div className="modal-header bg-dark text-white p-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge text-capitalize px-2.5 py-1 ${getStatusBadgeClass(selectedDev.status)}`}>
                      {selectedDev.status}
                    </span>
                    {selectedDev.type && <span className="badge bg-secondary">{selectedDev.type}</span>}
                  </div>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedDev(null)} />
                </div>

                {/* Modal Body */}
                <div className="modal-body p-3 p-md-4">
                  <div className="row g-3">
                    
                    {/* Gallery Carousel */}
                    <div className="col-lg-6">
                      <div className="position-relative bg-light rounded-3 overflow-hidden mb-2" style={{ height: '240px' }}>
                        <img 
                          src={imgs[activeImgIdx]} 
                          alt={selectedDev.title} 
                          className="w-100 h-100 object-fit-cover"
                        />
                        {imgs.length > 1 && (
                          <>
                            <button 
                              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 opacity-75"
                              onClick={() => setActiveImgIdx(p => p === 0 ? imgs.length - 1 : p - 1)}
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button 
                              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 opacity-75"
                              onClick={() => setActiveImgIdx(p => p === imgs.length - 1 ? 0 : p + 1)}
                            >
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Image Thumbnails */}
                      {imgs.length > 1 && (
                        <div className="d-flex gap-2 overflow-x-auto pb-1">
                          {imgs.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt=""
                              width="50"
                              height="38"
                              className={`rounded-2 cursor-pointer object-fit-cover border ${activeImgIdx === i ? 'border-primary border-2' : 'opacity-50'}`}
                              onClick={() => setActiveImgIdx(i)}
                            />
                          ))}
                        </div>
                      )}

                      {/* GPS Meta */}
                      {selectedDev.latitude && selectedDev.longitude && (
                        <div className="p-2 bg-light border rounded-3 mt-2 small text-muted">
                          📍 {selectedDev.latitude}, {selectedDev.longitude}
                        </div>
                      )}
                    </div>

                    {/* Spec Summary */}
                    <div className="col-lg-6">
                      <h5 className="fw-bold mb-1">{selectedDev.title}</h5>
                      <p className="text-muted small d-flex align-items-center gap-1 mb-2">
                        <MapPin size={14} className="text-danger" /> {selectedDev.location}
                      </p>
                      <h4 className="fw-bold text-primary mb-3">{selectedDev.price}</h4>

                      {/* Beds / Baths / SqFt Specs */}
                      <div className="row text-center g-2 mb-3">
                        <div className="col-4">
                          <div className="p-2 bg-light border rounded-3">
                            <Bed size={16} className="text-muted mb-1" />
                            <div className="fw-bold small">{selectedDev.beds || 0}</div>
                            <small className="text-muted" style={{ fontSize: '0.7rem' }}>Beds</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="p-2 bg-light border rounded-3">
                            <Bath size={16} className="text-muted mb-1" />
                            <div className="fw-bold small">{selectedDev.baths || 0}</div>
                            <small className="text-muted" style={{ fontSize: '0.7rem' }}>Baths</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="p-2 bg-light border rounded-3">
                            <Maximize size={16} className="text-muted mb-1" />
                            <div className="fw-bold small">{selectedDev.sqft || 0}</div>
                            <small className="text-muted" style={{ fontSize: '0.7rem' }}>Sq Ft</small>
                          </div>
                        </div>
                      </div>

                      {/* DRY Meta Grid */}
                      {Boolean(metaFields.length) && (
                        <div className="row g-2 mb-2">
                          {metaFields.map(({ label, value }) => (
                            <div key={label} className="col-6">
                              <div className="p-2 border rounded-3 bg-white small" style={{ fontSize: '0.78rem' }}>
                                <span className="text-muted">{label}:</span> <strong>{value}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedDev.nearby && (
                        <div className="small mb-2" style={{ fontSize: '0.78rem' }}>
                          <span className="text-muted fw-semibold">Nearby: </span>
                          <span>{selectedDev.nearby}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Amenities */}
                  {Boolean(selectedDev.features?.length) && (
                    <div className="mt-3 pt-3 border-top">
                      <h6 className="fw-bold mb-2 small">Amenities</h6>
                      <div className="d-flex flex-wrap gap-1.5">
                        {selectedDev.features.map((feat, i) => (
                          <span key={i} className="badge bg-light text-dark border d-flex align-items-center gap-1 p-2 rounded-2 small">
                            <CheckCircle2 size={12} className="text-success" /> {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedDev.description && (
                    <div className="mt-3 pt-3 border-top">
                      <h6 className="fw-bold mb-2 small">Description</h6>
                      <p className="text-muted small mb-0">{selectedDev.description}</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="modal-footer bg-light border-0 p-2">
                  <button className="btn btn-light app-btn px-4 py-2 border" onClick={() => setSelectedDev(null)}>
                    Close
                  </button>
                  <button 
                    className="btn bg-gradient-blue text-white app-btn px-4 py-2"
                    onClick={() => {
                      const dev = selectedDev;
                      setSelectedDev(null);
                      onEdit?.(dev);
                    }}
                  >
                    Edit Development
                  </button>
                </div>

              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}