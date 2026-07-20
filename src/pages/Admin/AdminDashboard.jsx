// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { 
  Home, PlusCircle, Users, DollarSign, Trash2, Eye, TrendingUp, 
  LogOut, Menu, Sparkles, Building2, Bell, RefreshCw, Activity
} from 'lucide-react';
import { toast } from 'sonner';
import {
  LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart
} from 'recharts';
import AddProperty from './AddProperty';
import AddDevelopment from './AddDevelopment';
import ManageDevelopments from './ManageDevelopments';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [developments, setDevelopments] = useState([]);
  const [developmentToEdit, setDevelopmentToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [priceRangeData, setPriceRangeData] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);

  const [stats, setStats] = useState({
    totalListings: 0,
    totalValuation: 0,
    uniqueAgents: 0,
    avgPrice: 0,
    totalDevelopments: 0,
    totalProperties: 0,
    pendingListings: 0,
    soldListings: 0
  });

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444'];

  // Fetch properties
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "properties"), (snapshot) => {
      const propList = [];
      let totalVal = 0;
      const agentsSet = new Set();
      let pending = 0;
      let sold = 0;

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
        
        if (data.listingStatus) {
          if (data.listingStatus === 'Pending') pending++;
          else if (data.listingStatus === 'Sold' || data.listingStatus === 'Sold Asset') sold++;
        }
      });

      setProperties(propList);
      setStats(prev => ({
        ...prev,
        totalListings: propList.length,
        totalValuation: totalVal,
        uniqueAgents: agentsSet.size,
        avgPrice: propList.length ? Math.round(totalVal / propList.length) : 0,
        totalProperties: propList.length,
        pendingListings: pending,
        soldListings: sold
      }));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch developments
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "developments"), (snapshot) => {
      const devList = [];
      const statusCount = {};
      let totalDevs = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        devList.push({ id: doc.id, ...data });
        totalDevs++;
        
        const status = data.status || 'pre-construction';
        statusCount[status] = (statusCount[status] || 0) + 1;
      });

      setDevelopments(devList);
      
      const statusData = Object.keys(statusCount).map(key => ({
        name: key.replace('-', ' ').toUpperCase(),
        value: statusCount[key]
      }));
      setStatusDistribution(statusData);

      setStats(prev => ({
        ...prev,
        totalDevelopments: totalDevs
      }));
    });

    return () => unsubscribe();
  }, []);

  // Generate chart data
  useEffect(() => {
    if (properties.length > 0) {
      const ranges = {
        '0-500k': 0,
        '500k-1M': 0,
        '1M-2M': 0,
        '2M-5M': 0,
        '5M+': 0
      };

      const monthlyData = {};
      
      properties.forEach(prop => {
        const price = parseInt(prop.price?.replace(/[^0-9]/g, '') || '0');
        if (price > 0) {
          if (price <= 500000) ranges['0-500k']++;
          else if (price <= 1000000) ranges['500k-1M']++;
          else if (price <= 2000000) ranges['1M-2M']++;
          else if (price <= 5000000) ranges['2M-5M']++;
          else ranges['5M+']++;
        }

        if (prop.createdAt) {
          const date = new Date(prop.createdAt);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { month: monthKey, count: 0, totalValue: 0 };
          }
          monthlyData[monthKey].count++;
          monthlyData[monthKey].totalValue += price;
        }
      });

      const priceRangeArray = Object.keys(ranges).map(key => ({
        name: key,
        value: ranges[key]
      }));
      setPriceRangeData(priceRangeArray);

      const sortedMonths = Object.keys(monthlyData).sort();
      const last6Months = sortedMonths.slice(-6);
      const trendData = last6Months.map(month => ({
        month: month,
        count: monthlyData[month].count,
        value: monthlyData[month].totalValue
      }));
      setMonthlyTrend(trendData);
    }
  }, [properties]);

  // Generate recent activity
  useEffect(() => {
    const allItems = [...properties, ...developments];
    const sorted = allItems
      .filter(item => item.createdAt || item.updatedAt)
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt || 0);
        const dateB = new Date(b.createdAt || b.updatedAt || 0);
        return dateB - dateA;
      })
      .slice(0, 8)
      .map(item => ({
        id: item.id,
        title: item.title || 'Untitled',
        type: item.price ? 'property' : 'development',
        price: item.price || 'N/A',
        status: item.listingStatus || item.status || 'Active',
        timestamp: item.createdAt || item.updatedAt || new Date().toISOString(),
        image: item.images?.[0] || item.img || null
      }));
    setRecentActivity(sorted);
  }, [properties, developments]);

  const handleDelete = async (id, collectionName = "properties") => {
    if (window.confirm("Delete this item permanently?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        toast.success("🗑️ Item removed successfully!");
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to remove document.");
      }
    }
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(num);
  };

  const formatCompactCurrency = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'Active': 'badge-success',
      'Active Listing': 'badge-success',
      'Pending': 'badge-warning',
      'Sold': 'badge-danger',
      'Sold Asset': 'badge-danger',
      'Off Market': 'badge-secondary',
      'pre-construction': 'badge-warning',
      'under construction': 'badge-primary',
      'completed': 'badge-success'
    };
    return classes[status] || 'badge-secondary';
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

      <div className="sidebar-category-title">New Development</div>
      <button className={`nav-item-btn ${activeTab === 'add-development' ? 'active-tab' : ''}`} data-bs-dismiss="offcanvas" onClick={() => {
        setActiveTab('add-development');
        setDevelopmentToEdit(null);
      }}>
        <div className="theme-icon-box bg-icon-purple"><Building2 size={18} /></div>
        <span>Add Development</span>
      </button>
      <button className={`nav-item-btn ${activeTab === 'manage-developments' ? 'active-tab' : ''}`} data-bs-dismiss="offcanvas" onClick={() => {
        setActiveTab('manage-developments');
        setDevelopmentToEdit(null);
      }}>
        <div className="theme-icon-box bg-icon-cyan"><Sparkles size={18} /></div>
        <span>Manage Developments</span>
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
        <main className="col-lg-10 p-3 p-md-4 mt-4 p-xl-5 overflow-auto dashboard-main-content h-100 flex-grow-1">

          <header className="main-control-header d-none d-lg-flex justify-content-between align-items-center mb-4">
            <div className="text-start">
              <h2 className="header-main-title">Control Management Hub</h2>
              <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Live system monitors metrics</small>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-light btn-sm rounded-circle p-2 position-relative">
                <Bell size={18} />
                <span className="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger p-1" style={{ fontSize: '8px', width: '16px', height: '16px' }}>
                  {properties.length + developments.length}
                </span>
              </button>
              <button className="btn exit-btn-custom px-4 py-2 fw-bold transition-all" onClick={() => navigate('/')}>
                Exit Dashboard
              </button>
            </div>
          </header>

          {activeTab === 'overview' && (
            <div className="fade-in-scope text-start">
              {/* Stats Cards */}
              <div className="row g-3 g-xl-4 mb-4">
                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-blue">
                    <div>
                      <span className="metric-caption">Total Active Listings</span>
                      <h3 className="metric-value">{stats.totalListings}</h3>
                      <small className="text-light opacity-75">
                        {stats.totalListings > 0 ? 'Active listings' : 'No listings'}
                      </small>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><Home size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-green">
                    <div className="w-100 overflow-hidden">
                      <span className="metric-caption">Portfolio Valuation</span>
                      <h3 className="metric-value text-truncate">{formatCurrency(stats.totalValuation)}</h3>
                      <small className="text-light opacity-75">Avg: {formatCurrency(stats.avgPrice)}</small>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><DollarSign size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-purple">
                    <div>
                      <span className="metric-caption">Active System Agents</span>
                      <h3 className="metric-value">{stats.uniqueAgents}</h3>
                      <small className="text-light opacity-75">
                        {stats.uniqueAgents > 0 ? 'Active partners' : 'No agents'}
                      </small>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><Users size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-orange">
                    <div className="w-100 overflow-hidden">
                      <span className="metric-caption">Total Developments</span>
                      <h3 className="metric-value text-truncate">{stats.totalDevelopments}</h3>
                      <small className="text-light opacity-75">
                        {statusDistribution.length > 0 ? 'Ongoing projects' : 'No developments'}
                      </small>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><Sparkles size={20} /></div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="row g-3 g-xl-4 mb-4">
                {/* Monthly Trend Chart */}
                <div className="col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0 text-dark">Monthly Trend</h5>
                      <span className="badge bg-light text-dark">Last 6 months</span>
                    </div>
                    {monthlyTrend.length > 0 ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <ComposedChart data={monthlyTrend}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                          <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => formatCompactCurrency(v)} />
                          <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} />
                          <Tooltip formatter={(value, name) => {
                            if (name === 'value') return formatCurrency(value);
                            return value;
                          }} />
                          <Legend />
                          <Bar yAxisId="left" dataKey="count" fill="#6366f1" name="Properties" radius={[4, 4, 0, 0]} />
                          <Line yAxisId="right" type="monotone" dataKey="value" stroke="#ec4899" name="Total Value" strokeWidth={2} dot={{ r: 4 }} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <TrendingUp size={40} className="mb-2" />
                        <p>No data available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Distribution Pie Chart */}
                <div className="col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0 text-dark">Development Status</h5>
                      <span className="badge bg-light text-dark">Distribution</span>
                    </div>
                    {statusDistribution.length > 0 ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <RePieChart>
                          <Pie
                            data={statusDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {statusDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RePieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <Activity size={40} className="mb-2" />
                        <p>No developments found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Range Chart */}
              <div className="row g-3 g-xl-4 mb-4">
                <div className="col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0 text-dark">Price Range Distribution</h5>
                      <span className="badge bg-light text-dark">Properties</span>
                    </div>
                    {priceRangeData.some(d => d.value > 0) ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={priceRangeData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                          <YAxis stroke="#94a3b8" fontSize={11} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                            {priceRangeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <BarChart size={40} className="mb-2" />
                        <p>No property data available</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0 text-dark">Property Stats</h5>
                      <span className="badge bg-light text-dark">Overview</span>
                    </div>
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="p-3 bg-light rounded-3">
                          <small className="text-muted d-block">Total Properties</small>
                          <h4 className="fw-bold mb-0">{stats.totalProperties}</h4>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-light rounded-3">
                          <small className="text-muted d-block">Unique Agents</small>
                          <h4 className="fw-bold mb-0">{stats.uniqueAgents}</h4>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-light rounded-3">
                          <small className="text-muted d-block">Pending Listings</small>
                          <h4 className="fw-bold mb-0 text-warning">{stats.pendingListings}</h4>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-light rounded-3">
                          <small className="text-muted d-block">Sold Properties</small>
                          <h4 className="fw-bold mb-0 text-success">{stats.soldListings}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="content-panel-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0 text-dark fs-5">Recent Activity Feed</h4>
                  <button className="btn btn-sm btn-outline-secondary">
                    <RefreshCw size={14} className="me-1" />
                    Refresh
                  </button>
                </div>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted small mt-2">Loading records from cloud firestore...</p>
                  </div>
                ) : recentActivity.length === 0 ? (
                  <div className="text-center py-5">
                    <Activity size={40} className="text-muted mb-3" />
                    <p className="text-muted">No recent activity recorded</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-borderless align-middle small text-start m-0">
                      <thead>
                        <tr className="text-dark fw-bold border-bottom" style={{ fontSize: '0.85rem' }}>
                          <th className="pb-3">Item</th>
                          <th className="pb-3">Type</th>
                          <th className="pb-3">Price</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Date</th>
                          <th className="text-end pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivity.map((item) => (
                          <tr key={item.id} className="border-bottom border-light">
                            <td className="py-3">
                              <div className="d-flex align-items-center gap-3">
                                <img 
                                  src={item.image || 'https://via.placeholder.com/48x36'} 
                                  alt={item.title} 
                                  className="rounded flex-shrink-0 shadow-sm" 
                                  style={{ width: '48px', height: '36px', objectFit: 'cover' }} 
                                />
                                <span className="fw-bold text-dark text-truncate" style={{ maxWidth: '160px' }}>
                                  {item.title}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${item.type === 'property' ? 'bg-primary' : 'bg-purple'}`}>
                                {item.type === 'property' ? '🏠 Property' : '✨ Development'}
                              </span>
                            </td>
                            <td className="fw-bold text-success text-nowrap">{item.price}</td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="text-muted">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </td>
                            <td className="text-end text-nowrap">
                              <button 
                                className="btn btn-sm text-primary p-1 me-2 border-0 bg-transparent"
                                onClick={() => {
                                  if (item.type === 'property') {
                                    navigate(`/property/${item.id}`, { state: { propertyData: item } });
                                  }
                                }}
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                className="btn btn-sm text-danger p-1 border-0 bg-transparent"
                                onClick={() => handleDelete(item.id, item.type === 'property' ? 'properties' : 'developments')}
                              >
                                <Trash2 size={18} />
                              </button>
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

          {activeTab === 'add-development' && (
            <div className="fade-in-scope content-panel-card p-4">
              <AddDevelopment 
                onSuccess={() => {
                  toast.success('✨ Development added successfully!');
                  setActiveTab('manage-developments');
                }}
                editData={developmentToEdit}
                onCancel={() => setDevelopmentToEdit(null)}
              />
            </div>
          )}

          {activeTab === 'manage-developments' && (
            <div className="fade-in-scope content-panel-card p-4 text-start">
              <ManageDevelopments 
                developments={developments}
                onEdit={(dev) => {
                  setDevelopmentToEdit(dev);
                  setActiveTab('add-development');
                }}
                onDelete={(id) => {
                  handleDelete(id, "developments");
                }}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}