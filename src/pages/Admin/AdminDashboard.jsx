import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Home, PlusCircle, Users, DollarSign, Trash2, Eye, TrendingUp, LogOut, Menu, Sparkles } from 'lucide-react';
import { toast } from 'sonner'; 
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
    if (window.confirm("Delete this listing permanently?")) {
      try {
        await deleteDoc(doc(db, "properties", id));
        toast.success("🗑️ Property listing removed from directory!"); 
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
    <div className="d-flex flex-column h-100 px-2 py-3">
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
        <div className="theme-icon-box bg-icon-purple"><Sparkles size={18} /></div>
        <span>CJ Exclusives</span>
      </button>
      <button className="nav-item-btn opacity-75" onClick={() => toast.info("💼 Broker management interface coming soon!")}>
        <div className="theme-icon-box bg-icon-cyan"><Users size={17} /></div>
        <span>Broker Networks</span>
      </button>

      <div className="pt-3 border-top border-light mt-auto">
        <button className="nav-item-btn p-2" onClick={() => navigate('/logout')}>
          <div className="theme-icon-box bg-icon-red"><LogOut size={16} /></div>
          <div className="text-start leading-tight">
            <span className="d-block fw-bold text-dark small">Account Profile</span>
            <span className="text-muted" style={{ fontSize: '0.7rem' }}>Sign-Out or End</span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-0 dashboard-master-root mt-3">

      {/* MOBILE HEADER */}
      <div className="d-flex d-lg-none justify-content-between align-items-center bg-white border-bottom p-3 sticky-top shadow-sm z-3">
         <div className="d-flex align-items-center p-0 m-0">
           <img src="images/logo.png" className='img-fluid w-25' alt="" />
          </div>
        <button className="btn p-1 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#adminMobileMenu">
          <Menu size={24} />
        </button>
      </div>

      {/* BOOTSTRAP OFFCANVAS DRAWERS */}
      <div className="offcanvas offcanvas-start border-0" tabIndex="-1" id="adminMobileMenu" style={{ width: '280px', backgroundColor: '#ffffff' }}>
        <div className="offcanvas-header border-bottom py-3">
           <div className="d-flex align-items-center p-0 m-0 ">
           <img src="images/logo.png" className='img-fluid w-50' alt="" />
          </div>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          {renderSidebarContent()}
        </div>
      </div>

      <div className="row g-0 h-100 overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <aside className="col-lg-2 d-none d-lg-flex flex-column layout-sidebar-node p-0 mt-5">
          <div className="d-flex align-items-center gap-2 pt-4 pb-2 px-4">
           <img src="images/logo.png" className='img-fluid' alt="" />
          </div>
          {renderSidebarContent()}
        </aside>

        {/* WORKSPACE MAIN PANELS */}
        <main className="col-lg-10 p-3 p-md-4 p-xl-5 overflow-auto dashboard-main-content h-100 flex-grow-1">
          
          <header className="main-control-header d-none d-lg-flex justify-content-between align-items-center mb-4">
            <div className="text-start">
              <h2 className="header-main-title">Control Management Hub</h2>
              <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Live system monitors metrics</small>
            </div>
            <button className="btn exit-btn-custom px-4 py-2 fw-bold transition-all" onClick={() => navigate('/')}>
              Exit Dashboard
            </button>
          </header>

          {activeTab === 'overview' && (
            <div className="fade-in-scope text-start">
              
              <div className="row g-3 g-xl-4 mb-4">
                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-blue">
                    <div>
                      <span className="metric-caption">Total Active Listings</span>
                      <h3 className="metric-value">{stats.totalListings}</h3>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><Home size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-green">
                    <div className="w-100 overflow-hidden">
                      <span className="metric-caption">Portfolio Valuation</span>
                      <h3 className="metric-value text-truncate">{formatCurrency(stats.totalValuation)}</h3>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><DollarSign size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-purple">
                    <div>
                      <span className="metric-caption">Active System Agents</span>
                      <h3 className="metric-value">{stats.uniqueAgents}</h3>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><Users size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-orange">
                    <div className="w-100 overflow-hidden">
                      <span className="metric-caption">Average Asset Value</span>
                      <h3 className="metric-value text-truncate">{formatCurrency(stats.avgPrice)}</h3>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><TrendingUp size={20} /></div>
                  </div>
                </div>
              </div>

              <div className="content-panel-card p-4">
                <h4 className="fw-bold mb-4 text-dark fs-5">Recent Activity Feed</h4>
                {loading ? (
                  <p className="text-muted small m-0">Loading records from cloud firestore...</p>
                ) : properties.length === 0 ? (
                  <p className="text-muted small m-0">No active listings recorded yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-borderless align-middle small text-start m-0">
                      <thead>
                        <tr className="text-dark fw-bold border-bottom" style={{ fontSize: '0.85rem' }}>
                          <th className="pb-3">Asset Name</th>
                          <th className="d-none d-md-table-cell pb-3">Address Map</th>
                          <th className="pb-3">Price Index</th>
                          <th className="d-none d-sm-table-cell pb-3">Agent</th>
                          <th className="text-end pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.slice(0, 5).map((prop) => (
                          <tr key={prop.id} className="border-bottom border-light">
                            <td className="py-3">
                              <div className="d-flex align-items-center gap-3">
                                <img src={prop.images?.[0]} alt="mini preview" className="rounded flex-shrink-0 shadow-sm" style={{ width: '48px', height: '36px', objectFit: 'cover' }} />
                                <span className="fw-bold text-dark text-truncate" style={{ maxWidth: '160px' }}>{prop.title}</span>
                              </div>
                            </td>
                            <td className="text-muted text-truncate d-none d-md-table-cell py-3" style={{ maxWidth: '180px' }}>{prop.address}</td>
                            <td className="fw-bold text-success text-nowrap py-3">{prop.price}</td>
                            <td className="text-secondary d-none d-sm-table-cell py-3">{prop.agent?.name || "-"}</td>
                            <td className="text-end text-nowrap py-3">
                              <button className="btn btn-sm text-primary p-1 me-2 border-0 bg-transparent" onClick={() => navigate(`/property/${prop.id}`, { state: { propertyData: prop } })}><Eye size={18} /></button>
                              <button className="btn btn-sm text-danger p-1 border-0 bg-transparent" onClick={() => handleDelete(prop.id)}><Trash2 size={18} /></button>
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
            <div className="fade-in-scope content-panel-card p-4">
              <AddProperty />
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="fade-in-scope content-panel-card p-4 text-start">
              <h4 className="fw-bold mb-4 text-dark fs-5">Entire Assets Inventory Directory</h4>
              {properties.length === 0 ? (
                <p className="text-muted small m-0">No entries recorded in storage buckets.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-borderless align-middle small m-0">
                    <thead>
                      <tr className="text-dark fw-bold border-bottom" style={{ fontSize: '0.85rem' }}>
                        <th className="d-none d-sm-table-cell pb-3">Unique ID</th>
                        <th className="pb-3">Title Info</th>
                        <th className="pb-3">Price Index</th>
                        <th className="text-end pb-3">Action Rules</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((prop) => (
                        <tr key={prop.id} className="border-bottom border-light">
                          <td className="text-muted font-monospace d-none d-sm-table-cell py-3" style={{ fontSize: '0.8rem' }}>{prop.id.slice(0, 6)}...</td>
                          <td className="fw-bold text-dark text-truncate py-3" style={{ maxWidth: '200px' }}>{prop.title}</td>
                          <td className="fw-bold text-success text-nowrap py-3">{prop.price}</td>
                          <td className="text-end text-nowrap py-3">
                            <button className="btn btn-sm text-primary p-1 me-2 border-0 bg-transparent" onClick={() => navigate(`/property/${prop.id}`, { state: { propertyData: prop } })}><Eye size={18} /></button>
                            <button className="btn btn-sm text-danger p-1 border-0 bg-transparent" onClick={() => handleDelete(prop.id)}><Trash2 size={18} /></button>
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