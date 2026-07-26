// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { 
  Home, PlusCircle, Users, DollarSign, Trash2, Eye, TrendingUp, 
  LogOut, Menu, Sparkles, Building2, Bell, RefreshCw, Activity,
  MapPin, ExternalLink, ChevronLeft, ChevronRight, IndianRupee, User
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart
} from 'recharts';
import AddProperty from './AddProperty';
import AddDevelopment from './AddDevelopment';
import ManageDevelopments from './ManageDevelopments';
import AdminProfile from './AdminProfile'; // Import Naya Profile Component
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

  // Modal State for Properties Viewing
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activePropImgIdx, setActivePropImgIdx] = useState(0);

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

  const getPropImages = (prop) => {
    if (prop?.images && Array.isArray(prop.images) && prop.images.length > 0) return prop.images;
    if (prop?.img) return [prop.img];
    if (prop?.image) return [prop.image];
    return ['https://via.placeholder.com/600x400?text=No+Property+Image'];
  };

  const openPropertyModal = (prop) => {
    setSelectedProperty(prop);
    setActivePropImgIdx(0);
  };

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
        '0-50L': 0,
        '50L-1Cr': 0,
        '1Cr-2Cr': 0,
        '2Cr-5Cr': 0,
        '5Cr+': 0
      };

      const monthlyData = {};
      
      properties.forEach(prop => {
        const price = parseInt(prop.price?.replace(/[^0-9]/g, '') || '0', 10);
        if (price > 0) {
          if (price <= 5000000) ranges['0-50L']++;
          else if (price <= 10000000) ranges['50L-1Cr']++;
          else if (price <= 20000000) ranges['1Cr-2Cr']++;
          else if (price <= 50000000) ranges['2Cr-5Cr']++;
          else ranges['5Cr+']++;
        }

        if (prop.createdAt) {
          const date = prop.createdAt.toDate ? prop.createdAt.toDate() : new Date(prop.createdAt);
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
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || a.updatedAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || b.updatedAt || 0);
        return dateB - dateA;
      })
      .slice(0, 8)
      .map(item => ({
        id: item.id,
        title: item.title || 'Untitled',
        type: item.price ? 'property' : 'development',
        price: item.price || 'N/A',
        status: item.listingStatus || item.status || 'Active',
        timestamp: item.createdAt?.toDate ? item.createdAt.toDate().toISOString() : item.createdAt || item.updatedAt || new Date().toISOString(),
        image: item.images?.[0] || item.img || null,
        rawObj: item
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
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(num);
  };

  const formatCompactCurrency = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)} K`;
    return `₹${num}`;
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'Active': 'bg-success text-white',
      'Active Listing': 'bg-success text-white',
      'Pending': 'bg-warning text-dark',
      'Coming soon': 'bg-info text-white',
      'Sold': 'bg-danger text-white',
      'Sold Asset': 'bg-danger text-white',
      'Off Market': 'bg-secondary text-white',
      'pre-construction': 'bg-warning text-dark',
      'under construction': 'bg-primary text-white',
      'completed': 'bg-success text-white'
    };
    return classes[status] || 'bg-secondary text-white';
  };

  // SIDEBAR NAVIGATION WITH PROFILE TAB ADDED
  const renderSidebarContent = () => (
    <div className="d-flex flex-column h-100 px-2 py-5">
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

      {/* NEW SIDEBAR CATEGORY: ACCOUNT PROFILE */}
      <div className="sidebar-category-title">Account Settings</div>
      <button className={`nav-item-btn ${activeTab === 'profile' ? 'active-tab' : ''}`} data-bs-dismiss="offcanvas" onClick={() => setActiveTab('profile')}>
        <div className="theme-icon-box bg-icon-red"><User size={18} /></div>
        <span>Admin Profile</span>
      </button>

      <div className="pt-3 border-top border-light mt-auto">
        <button className="nav-item-btn p-2 w-100 border-0 bg-transparent text-start" onClick={() => navigate('/logout')}>
          <div className="theme-icon-box bg-icon-red"><LogOut size={16} /></div>
          <div className="text-start leading-tight ms-2">
            <span className="d-block fw-bold text-dark small">Sign Out</span>
            <span className="text-muted" style={{ fontSize: '0.7rem' }}>Exit Session</span>
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
          <img src="/images/logo.png" className="img-fluid" style={{ maxWidth: '100px' }} alt="Logo" />
        </div>
        <button className="btn p-1 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#adminMobileMenu">
          <Menu size={24} />
        </button>
      </div>

      {/* BOOTSTRAP OFFCANVAS DRAWERS */}
      <div className="offcanvas offcanvas-start border-0" tabIndex="-1" id="adminMobileMenu" style={{ width: '280px', backgroundColor: '#ffffff' }}>
        <div className="offcanvas-header border-bottom py-3">
          <div className="d-flex align-items-center p-0 m-0">
            <img src="/images/logo.png" className="img-fluid" style={{ maxWidth: '120px' }} alt="Logo" />
          </div>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          {renderSidebarContent()}
        </div>
      </div>

      <div className="row g-0 h-100 overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <aside className="col-lg-2 d-none d-lg-flex flex-column layout-sidebar-node p-0 pt-4">
          {renderSidebarContent()}
        </aside>

        {/* WORKSPACE MAIN PANELS */}
        <main className="col-lg-10 p-3 p-md-4 mt-5 p-xl-5 overflow-auto dashboard-main-content h-100 flex-grow-1">

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
                      <h3 className="metric-value fs-2 fw-bold mb-1">{stats.totalListings}</h3>
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
                      <h3 className="metric-value fs-4 fw-bold mb-1 text-truncate" title={formatCurrency(stats.totalValuation)}>
                        {formatCompactCurrency(stats.totalValuation)}
                      </h3>
                      <small className="text-light opacity-75 d-block text-truncate">
                        Avg: {formatCompactCurrency(stats.avgPrice)}
                      </small>
                    </div>
                    <div className="metric-icon-wrapper d-none d-sm-flex"><IndianRupee size={20} /></div>
                  </div>
                </div>

                <div className="col-6 col-xl-3">
                  <div className="metric-card metric-purple">
                    <div>
                      <span className="metric-caption">Active System Agents</span>
                      <h3 className="metric-value fs-2 fw-bold mb-1">{stats.uniqueAgents}</h3>
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
                      <h3 className="metric-value fs-2 fw-bold mb-1 text-truncate">{stats.totalDevelopments}</h3>
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
                <div className="col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0 text-dark">Monthly Trend</h5>
                      <span className="badge bg-light text-dark">Last 6 months</span>
                    </div>
                    {monthlyTrend.length > 0 ? (
                      <div style={{ width: '100%', height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
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
                      </div>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <TrendingUp size={40} className="mb-2" />
                        <p>No data available</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0 text-dark">Development Status</h5>
                      <span className="badge bg-light text-dark">Distribution</span>
                    </div>
                    {statusDistribution.length > 0 ? (
                      <div style={{ width: '100%', height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
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
                      </div>
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
                      <div style={{ width: '100%', height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
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
                      </div>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <Activity size={40} className="mb-2" />
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
                                  className="rounded flex-shrink-0 shadow-sm cursor-pointer" 
                                  style={{ width: '48px', height: '36px', objectFit: 'cover' }}
                                  onClick={() => {
                                    if (item.type === 'property') openPropertyModal(item.rawObj);
                                  }}
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
                                    openPropertyModal(item.rawObj);
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
                        <th className="pb-3">Showcase Pic</th>
                        <th className="pb-3">Title Info</th>
                        <th className="pb-3">Price Index</th>
                        <th className="text-end pb-3">Action Rules</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((prop) => {
                        const imgs = getPropImages(prop);
                        return (
                          <tr key={prop.id} className="border-bottom border-light">
                            <td className="py-3">
                              <div className="position-relative d-inline-block">
                                <img 
                                  src={imgs[0]} 
                                  alt={prop.title}
                                  className="rounded shadow-sm cursor-pointer border"
                                  width="60"
                                  height="45"
                                  style={{ objectFit: 'cover' }}
                                  onClick={() => openPropertyModal(prop)}
                                />
                                {imgs.length > 1 && (
                                  <span className="position-absolute bottom-0 end-0 badge bg-dark opacity-75 p-1 me-1 mb-1" style={{ fontSize: '9px' }}>
                                    +{imgs.length - 1}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="fw-bold text-dark text-truncate py-3" style={{ maxWidth: '240px' }}>
                              <div>{prop.title}</div>
                              {prop.address && <small className="text-muted fw-normal d-block text-truncate" style={{ maxWidth: '220px' }}>{prop.address}</small>}
                            </td>
                            <td className="fw-bold text-success text-nowrap py-3">{prop.price}</td>
                            <td className="text-end text-nowrap py-3">
                              <button 
                                className="btn btn-sm text-primary p-1 me-2 border-0 bg-transparent" 
                                title="View Property Details"
                                onClick={() => openPropertyModal(prop)}
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                className="btn btn-sm text-danger p-1 border-0 bg-transparent" 
                                title="Delete Property"
                                onClick={() => handleDelete(prop.id, "properties")}
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
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

          {/* RENDER NEW ADMIN PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="fade-in-scope content-panel-card p-4">
              <AdminProfile />
            </div>
          )}
        </main>
      </div>

      {/* FULL DETAILED PROPERTY MODAL */}
      {selectedProperty && (() => {
        const pImgs = getPropImages(selectedProperty);
        return (
          <div className="modal fade show d-block bg-dark bg-opacity-75" tabIndex="-1" style={{ zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
              <div className="modal-content rounded-4 overflow-hidden border-0">
                <div className="modal-header bg-dark text-white p-3 px-4">
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${getStatusBadgeClass(selectedProperty.listingStatus)}`}>
                      {selectedProperty.listingStatus || 'Active Listing'}
                    </span>
                    {selectedProperty.assetClass && (
                      <span className="badge bg-secondary">{selectedProperty.assetClass}</span>
                    )}
                  </div>
                  <button type="button" className="btn-close btn-close-white shadow-none" onClick={() => setSelectedProperty(null)} />
                </div>
                <div className="modal-body p-4 text-start">
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="position-relative bg-light rounded-3 overflow-hidden mb-2 shadow-sm" style={{ height: '320px' }}>
                        <img 
                          src={pImgs[activePropImgIdx]} 
                          alt={selectedProperty.title} 
                          className="w-100 h-100 object-fit-cover"
                        />
                        {pImgs.length > 1 && (
                          <>
                            <button 
                              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 opacity-75"
                              onClick={() => setActivePropImgIdx(p => p === 0 ? pImgs.length - 1 : p - 1)}
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button 
                              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 opacity-75"
                              onClick={() => setActivePropImgIdx(p => p === pImgs.length - 1 ? 0 : p + 1)}
                            >
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}
                      </div>
                      {pImgs.length > 1 && (
                        <div className="d-flex gap-2 overflow-x-auto pb-2">
                          {pImgs.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt=""
                              width="65"
                              height="48"
                              className={`rounded cursor-pointer border object-fit-cover ${activePropImgIdx === i ? 'border-primary border-2' : 'opacity-50'}`}
                              onClick={() => setActivePropImgIdx(i)}
                            />
                          ))}
                        </div>
                      )}
                      {selectedProperty.agent?.name && (
                        <div className="p-3 bg-light rounded-3 border mt-3 d-flex align-items-center gap-3">
                          <img 
                            src={selectedProperty.agent.img || '/images/avatar.png'} 
                            alt={selectedProperty.agent.name}
                            className="rounded-circle border object-fit-cover"
                            width="48"
                            height="48"
                          />
                          <div>
                            <small className="text-muted d-block uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Representative Agent</small>
                            <div className="fw-bold text-dark">{selectedProperty.agent.name}</div>
                            {selectedProperty.agent.phone && <small className="text-primary">{selectedProperty.agent.phone}</small>}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-lg-6">
                      <h3 className="fw-bold text-dark mb-1">{selectedProperty.title}</h3>
                      {selectedProperty.address && (
                        <p className="text-muted small d-flex align-items-center gap-1 mb-2">
                          <MapPin size={16} className="text-danger flex-shrink-0" /> {selectedProperty.address}
                        </p>
                      )}
                      <h3 className="fw-bold text-success mb-3">{selectedProperty.price}</h3>
                      {selectedProperty.specs && (
                        <div className="p-2 bg-light border rounded mb-3 text-secondary small fw-semibold">
                          {selectedProperty.specs}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer bg-light border-0">
                  <button className="btn btn-secondary rounded-pill px-4" onClick={() => setSelectedProperty(null)}>
                    Close
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