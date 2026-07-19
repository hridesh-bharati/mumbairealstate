import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Home, PlusCircle, Users, DollarSign, Trash2, Eye, TrendingUp, LogOut, Menu } from 'lucide-react';
import { toast } from 'sonner'; // 🔥 Sonner triggers
import AddProperty from './AddProperty';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalListings: 0,
    totalValuation: 0,
    uniqueAgents: 0,
    avgPrice: 0
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "properties"), (snapshot) => {
      const propList = [];
      let totalVal = 0;
      const agentsSet = new Set();

      snapshot.forEach((doc) => {
        const data = doc.data();
        propList.push({ id: doc.id, ...data });

        if (data.price) {
          const numPrice = parseInt(data.price.replace(/[^0-9]/g, ''), 10);
          if (!isNaN(numPrice)) totalVal += numPrice;
        }
        if (data.agent?.name) {
          agentsSet.add(data.agent.name);
        }
      });

      setProperties(propList);
      setStats({
        totalListings: propList.length,
        totalValuation: totalVal,
        uniqueAgents: agentsSet.size,
        avgPrice: propList.length ? Math.round(totalVal / propList.length) : 0
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    // Confirmation custom toast handle ya clean prompt structure
    if (window.confirm("Delete this listing permanently?")) {
      try {
        await deleteDoc(doc(db, "properties", id));
        toast.success("🗑️ Property listing removed from directory!"); // 🔥 Alert replaced
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to remove document from Firestore.");
      }
    }
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  const renderSidebarContent = () => (
    <div className="d-flex flex-column h-100">
      <div className="sidebar-category-title">Management</div>
      <button className={`nav-item-btn ${activeTab === 'overview' ? 'active-tab' : ''}`} data-bs-dismiss="offcanvas" onClick={() => setActiveTab('overview')}>
        <div className="theme-icon-box bg-icon-green"><TrendingUp size={18} /></div>
        <span>Overview Control</span>
      </button>
      <button className={`nav-item-btn ${activeTab === 'add' ? 'active-tab' : ''}`} data-bs-dismiss="offcanvas" onClick={() => setActiveTab('add')}>
        <div className="theme-icon-box bg-icon-blue"><PlusCircle size={18} /></div>
        <span>Add Property</span>
      </button>
      <button className={`nav-item-btn ${activeTab === 'manage' ? 'active-tab' : ''}`} data-bs-dismiss="offcanvas" onClick={() => setActiveTab('manage')}>
        <div className="theme-icon-box bg-icon-orange"><Home size={18} /></div>
        <span>Manage Directory</span>
      </button>

      <div className="sidebar-category-title">Marketing</div>
      <button className="nav-item-btn opacity-75" onClick={() => toast.info("✨ CJ Exclusives module panel is coming soon!")}>
        <div className="theme-icon-box bg-icon-purple"><span>✨</span></div>
        <span>CJ Exclusives</span>
      </button>
      <button className="nav-item-btn opacity-75" onClick={() => toast.info("💼 Broker management interface coming soon!")}>
        <div className="theme-icon-box bg-icon-cyan"><Users size={17} /></div>
        <span>Broker Networks</span>
      </button>

      <div className="pt-3 border-top border-light mt-auto">
        <button className="nav-item-btn w-100 p-2" onClick={() => navigate('/logout')}>
          <div className="theme-icon-box bg-icon-red"><LogOut size={16} /></div>
          <div className="text-start leading-tight">
            <span className="d-block fw-bold text-dark small">Account Profile</span>
            <span className="text-muted text-xs" style={{ fontSize: '0.7rem' }}>Sign-Out or End</span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-0 dashboard-master-root">
      
      {/* MOBILE HEADER */}
      <div className="d-flex d-lg-none justify-content-between align-items-center bg-white bg-opacity-75 border-bottom p-3 sticky-top shadow-sm z-3" style={{ backdropFilter: 'blur(10px)', webkitBackdropFilter: 'blur(10px)' }}>
        <div className="d-flex align-items-center gap-2">
          <span className="fs-4">🌿</span>
          <span className="fw-bold text-dark">Compass Admin</span>
        </div>
        <button className="btn p-1 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#adminMobileMenu">
          <Menu size={24} />
        </button>
      </div>

      {/* BOOTSTRAP OFFCANVAS DRAWERS */}
      <div className="offcanvas offcanvas-start border-0" tabIndex="-1" id="adminMobileMenu" style={{ width: '290px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(15px)' }}>
        <div className="offcanvas-header border-bottom py-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-4">🌿</span>
            <span className="fw-bold fs-5 text-dark">Compass Admin</span>
          </div>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-3">
          {renderSidebarContent()}
        </div>
      </div>

      <div className="row g-0 h-100 overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <aside className="col-lg-2 p-3 d-none d-lg-flex flex-column layout-sidebar-node">
          <div className="d-flex align-items-center gap-2 mb-3 px-2">
            <span className="fs-4">🌿</span>
            <span className="fw-bold fs-5 text-dark">Compass Admin</span>
          </div>
          {renderSidebarContent()}
        </aside>

        {/* WORKSPACE MAIN PANELS */}
        <main className="col-lg-10 p-3 p-md-4 p-xl-5 overflow-auto dashboard-main-content h-100 flex-grow-1">
          <header className="d-none d-lg-flex justify-content-between align-items-center border-bottom border-light border-opacity-50 pb-3 mb-4">
            <div>
              <h2 className="header-main-title m-0">Control Management Hub</h2>
              <small className="text-muted">Live system monitors metrics</small>
            </div>
            <button className="btn btn-light btn-sm px-3 rounded-pill fw-bold border shadow-sm" onClick={() => navigate('/')}>
              Exit Dashboard
            </button>
          </header>

          {activeTab === 'overview' && (
            <div className="fade-in-scope">
              <div className="row g-2 g-md-3 g-xl-4 mb-4">
                <div className="col-6 col-xl-3">
                  <div className="metric-box-card bg-gradient-blue text-white h-100 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div>
                      <span className="caption text-uppercase">Total Active Listings</span>
                      <h3 className="fw-bold m-0 fs-3 fs-md-2">{stats.totalListings}</h3>
                    </div>
                    <div className="p-2 bg-white bg-opacity-25 rounded-3 d-none d-sm-block"><Home size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-box-card bg-gradient-emerald text-white h-100 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div>
                      <span className="caption text-uppercase">Portfolio Valuation</span>
                      <h3 className="fw-bold m-0 fs-3 fs-md-2 text-truncate" style={{ maxWidth: '100%' }}>{formatCurrency(stats.totalValuation)}</h3>
                    </div>
                    <div className="p-2 bg-white bg-opacity-25 rounded-3 d-none d-sm-block"><DollarSign size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-box-card bg-gradient-purple text-white h-100 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div>
                      <span className="caption text-uppercase">Active System Agents</span>
                      <h3 className="fw-bold m-0 fs-3 fs-md-2">{stats.uniqueAgents}</h3>
                    </div>
                    <div className="p-2 bg-white bg-opacity-25 rounded-3 d-none d-sm-block"><Users size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-box-card bg-gradient-sunset text-white h-100 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div>
                      <span className="caption text-uppercase">Average Asset Value</span>
                      <h3 className="fw-bold m-0 fs-3 fs-md-2 text-truncate" style={{ maxWidth: '100%' }}>{formatCurrency(stats.avgPrice)}</h3>
                    </div>
                    <div className="p-2 bg-white bg-opacity-25 rounded-3 d-none d-sm-block"><TrendingUp size={20} /></div>
                  </div>
                </div>
              </div>

              <div className="card border-0 p-3 p-md-4 glass-panel-card rounded-4">
                <h4 className="fw-bold mb-3 text-dark fs-5">Recent Activity Feed</h4>
                {loading ? (
                  <p className="text-muted small m-0">Loading records from cloud firestore...</p>
                ) : properties.length === 0 ? (
                  <p className="text-muted small m-0">No active listings recorded yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle small text-start m-0">
                      <thead>
                        <tr className="text-secondary border-bottom border-light">
                          <th>Asset Name</th>
                          <th className="d-none d-md-table-cell">Address Map</th>
                          <th>Price Index</th>
                          <th className="d-none d-sm-table-cell">Agent</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.slice(0, 5).map((prop) => (
                          <tr key={prop.id}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <img src={prop.images?.[0]} alt="mini preview" className="rounded flex-shrink-0" style={{ width: '40px', height: '30px', objectFit: 'cover' }} />
                                <span className="fw-bold text-dark text-truncate" style={{ maxWidth: '140px' }}>{prop.title}</span>
                              </div>
                            </td>
                            <td className="text-muted text-truncate d-none d-md-table-cell" style={{ maxWidth: '180px' }}>{prop.address}</td>
                            <td className="fw-bold text-success text-nowrap">{prop.price}</td>
                            <td className="text-dark d-none d-sm-table-cell">{prop.agent?.name || "-"}</td>
                            <td className="text-end text-nowrap">
                              <button className="btn btn-sm text-primary p-1 me-2" onClick={() => navigate(`/property/${prop.id}`, { state: { propertyData: prop } })}><Eye size={16} /></button>
                              <button className="btn btn-sm text-danger p-1" onClick={() => handleDelete(prop.id)}><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <div className="fade-in-scope card border-0 p-2 p-sm-4 glass-panel-card rounded-4">
              <AddProperty />
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="card border-0 p-3 p-md-4 glass-panel-card rounded-4 fade-in-scope">
              <h4 className="fw-bold mb-3 text-dark fs-5">Entire Assets Inventory Directory</h4>
              {properties.length === 0 ? (
                <p className="text-muted small m-0">No entries recorded in storage buckets.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle small m-0">
                    <thead>
                      <tr className="text-secondary border-bottom border-light">
                        <th className="d-none d-sm-table-cell">Unique ID</th>
                        <th>Title Info</th>
                        <th>Price Index</th>
                        <th className="text-end">Action Rules</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((prop) => (
                        <tr key={prop.id}>
                          <td className="text-muted font-monospace d-none d-sm-table-cell" style={{ fontSize: '0.75rem' }}>{prop.id.slice(0, 6)}...</td>
                          <td className="fw-bold text-dark text-truncate" style={{ maxWidth: '160px' }}>{prop.title}</td>
                          <td className="fw-bold text-success text-nowrap">{prop.price}</td>
                          <td className="text-end text-nowrap">
                            <button className="btn btn-sm text-primary p-1 me-2" onClick={() => navigate(`/property/${prop.id}`, { state: { propertyData: prop } })}><Eye size={16} /></button>
                            <button className="btn btn-sm text-danger p-1" onClick={() => handleDelete(prop.id)}><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}