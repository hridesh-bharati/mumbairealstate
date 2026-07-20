// src/components/Admin/ManageDevelopments.js
import React, { useState } from 'react';
import { Edit, Trash2, Search, Sparkles, Building2, Filter, Eye } from 'lucide-react';

export default function ManageDevelopments({ developments = [], onDelete, onEdit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDevelopments = developments.filter(dev => {
    const matchesSearch = dev.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dev.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || dev.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['all', 'pre-construction', 'under construction', 'completed'];

  const getStatusBadge = (status) => {
    const colors = {
      'pre-construction': 'badge-warning',
      'under construction': 'badge-primary',
      'completed': 'badge-success'
    };
    return colors[status] || 'badge-secondary';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pre-construction': 'Pre-Construction',
      'under construction': 'Under Construction',
      'completed': 'Completed'
    };
    return labels[status] || status;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
            <Sparkles size={20} className="text-primary" />
            Manage Developments
          </h4>
          <small className="text-muted">{developments.length} total developments</small>
        </div>
      </div>

      <div className="d-flex gap-3 mb-4 flex-wrap">
        <div className="flex-grow-1" style={{ maxWidth: '300px' }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <Search size={18} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search developments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select
          className="form-select"
          style={{ maxWidth: '200px' }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt === 'all' ? 'All Status' : getStatusLabel(opt)}
            </option>
          ))}
        </select>
        <button className="btn btn-outline-secondary">
          <Filter size={16} className="me-1" />
          More Filters
        </button>
      </div>

      {filteredDevelopments.length === 0 ? (
        <div className="text-center py-5">
          <Building2 size={48} className="text-muted mb-3" />
          <p className="text-muted">No developments found</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="bg-light">
              <tr className="border-bottom">
                <th className="py-3">Image</th>
                <th className="py-3">Title</th>
                <th className="py-3">Location</th>
                <th className="py-3">Price</th>
                <th className="py-3 text-center">Beds</th>
                <th className="py-3 text-center">Baths</th>
                <th className="py-3 text-center">Sq Ft</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevelopments.map((dev) => (
                <tr key={dev.id} className="border-bottom">
                  <td className="py-3">
                    <img 
                      src={dev.img || 'https://via.placeholder.com/60x45'} 
                      alt={dev.title}
                      className="rounded-3"
                      style={{ width: '60px', height: '45px', objectFit: 'cover' }}
                    />
                  </td>
                  <td className="fw-semibold">{dev.title}</td>
                  <td className="text-muted small">{dev.location}</td>
                  <td className="fw-bold text-primary">{dev.price}</td>
                  <td className="text-center">{dev.beds}</td>
                  <td className="text-center">{dev.baths}</td>
                  <td className="text-center">{dev.sqft}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(dev.status)} text-white px-3 py-2`}>
                      {getStatusLabel(dev.status)}
                    </span>
                  </td>
                  <td className="text-end">
                    <button 
                      className="btn btn-sm btn-outline-primary me-2 rounded-circle"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                      onClick={() => onEdit?.(dev)}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger rounded-circle"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                      onClick={() => onDelete?.(dev.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}