// src/components/Admin/ManageDevelopments.js
import React, { useState } from 'react';
import { 
  Edit, Trash2, Search, Sparkles, Building2, Eye, MapPin, 
  Bed, Bath, Maximize, CheckCircle2, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function ManageDevelopments({ developments = [], onDelete, onEdit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDev, setSelectedDev] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const statusOptions = ['all', 'pre-construction', 'under construction', 'completed'];

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
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <Sparkles className="text-primary" size={20} />
            Manage Developments
          </h4>
          <small className="text-muted">{developments.length} total developments</small>
        </div>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <Search size={18} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search developments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select text-capitalize"
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

      {/* Main Table */}
      {!filtered.length ? (
        <div className="text-center py-5">
          <Building2 size={48} className="text-muted mb-3" />
          <p className="text-muted">No developments found</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th className="text-center">Beds</th>
                <th className="text-center">Baths</th>
                <th className="text-center">Sq Ft</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dev) => {
                const imgs = getImages(dev);
                return (
                  <tr key={dev.id}>
                    <td>
                      <div className="position-relative d-inline-block">
                        <img 
                          src={imgs[0]} 
                          alt={dev.title}
                          className="rounded object-fit-cover cursor-pointer"
                          width="60"
                          height="45"
                          onClick={() => openModal(dev)}
                        />
                        {imgs.length > 1 && (
                          <span className="position-absolute bottom-0 end-0 badge bg-dark opacity-75 p-1 me-1 mb-1">
                            +{imgs.length - 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="fw-semibold">{dev.title}</td>
                    <td className="text-muted small">{dev.location}</td>
                    <td className="fw-bold text-primary">{dev.price}</td>
                    <td className="text-center">{dev.beds}</td>
                    <td className="text-center">{dev.baths}</td>
                    <td className="text-center">{dev.sqft}</td>
                    <td>
                      <span className={`badge text-capitalize ${getStatusBadgeClass(dev.status)}`}>
                        {dev.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-info rounded-circle me-1" title="View" onClick={() => openModal(dev)}>
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-outline-primary rounded-circle me-1" title="Edit" onClick={() => onEdit?.(dev)}>
                          <Edit size={14} />
                        </button>
                        <button className="btn btn-outline-danger rounded-circle" title="Delete" onClick={() => onDelete?.(dev.id)}>
                          <Trash2 size={14} />
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
            <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
              <div className="modal-content rounded-3 overflow-hidden">
                
                {/* Modal Header */}
                <div className="modal-header bg-dark text-white">
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge text-capitalize ${getStatusBadgeClass(selectedDev.status)}`}>
                      {selectedDev.status}
                    </span>
                    {selectedDev.type && <span className="badge bg-secondary">{selectedDev.type}</span>}
                  </div>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedDev(null)} />
                </div>

                {/* Modal Body */}
                <div className="modal-body p-4">
                  <div className="row g-4">
                    
                    {/* Gallery Carousel */}
                    <div className="col-lg-6">
                      <div className="position-relative bg-light rounded overflow-hidden mb-2" style={{ height: '300px' }}>
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
                        <div className="d-flex gap-2 overflow-x-auto pb-2">
                          {imgs.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt=""
                              width="60"
                              height="45"
                              className={`rounded cursor-pointer object-fit-cover border ${activeImgIdx === i ? 'border-primary border-2' : 'opacity-50'}`}
                              onClick={() => setActiveImgIdx(i)}
                            />
                          ))}
                        </div>
                      )}

                      {/* GPS Meta */}
                      {selectedDev.latitude && selectedDev.longitude && (
                        <div className="p-2 bg-light border rounded mt-2 small text-muted">
                          📍 {selectedDev.latitude}, {selectedDev.longitude}
                        </div>
                      )}
                    </div>

                    {/* Spec Summary */}
                    <div className="col-lg-6">
                      <h4 className="fw-bold mb-1">{selectedDev.title}</h4>
                      <p className="text-muted small d-flex align-items-center gap-1 mb-2">
                        <MapPin size={14} className="text-danger" /> {selectedDev.location}
                      </p>
                      <h3 className="fw-bold text-primary mb-3">{selectedDev.price}</h3>

                      {/* Beds / Baths / SqFt Specs */}
                      <div className="row text-center g-2 mb-3">
                        <div className="col-4">
                          <div className="p-2 bg-light border rounded">
                            <Bed size={16} className="text-muted mb-1" />
                            <div className="fw-bold">{selectedDev.beds || 0}</div>
                            <small className="text-muted">Beds</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="p-2 bg-light border rounded">
                            <Bath size={16} className="text-muted mb-1" />
                            <div className="fw-bold">{selectedDev.baths || 0}</div>
                            <small className="text-muted">Baths</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="p-2 bg-light border rounded">
                            <Maximize size={16} className="text-muted mb-1" />
                            <div className="fw-bold">{selectedDev.sqft || 0}</div>
                            <small className="text-muted">Sq Ft</small>
                          </div>
                        </div>
                      </div>

                      {/* DRY Meta Grid */}
                      {Boolean(metaFields.length) && (
                        <div className="row g-2 mb-3">
                          {metaFields.map(({ label, value }) => (
                            <div key={label} className="col-6">
                              <div className="p-2 border rounded bg-white small">
                                <span className="text-muted">{label}:</span> <strong>{value}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedDev.nearby && (
                        <div className="small mb-2">
                          <span className="text-muted fw-semibold">Nearby: </span>
                          <span>{selectedDev.nearby}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Amenities */}
                  {Boolean(selectedDev.features?.length) && (
                    <div className="mt-3 pt-3 border-top">
                      <h6 className="fw-bold mb-2">Amenities</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedDev.features.map((feat, i) => (
                          <span key={i} className="badge bg-light text-dark border d-flex align-items-center gap-1 p-2">
                            <CheckCircle2 size={12} className="text-success" /> {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedDev.description && (
                    <div className="mt-3 pt-3 border-top">
                      <h6 className="fw-bold mb-2">Description</h6>
                      <p className="text-muted small mb-0">{selectedDev.description}</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="modal-footer bg-light border-0">
                  <button className="btn btn-secondary rounded-pill px-4" onClick={() => setSelectedDev(null)}>
                    Close
                  </button>
                  <button 
                    className="btn btn-primary rounded-pill px-4"
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