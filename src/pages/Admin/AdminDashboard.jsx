// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { 
  Home, PlusCircle, Users, Trash2, Eye, TrendingUp, 
  LogOut, Menu, Sparkles, Building2, Bell, RefreshCw, Activity,
  MapPin, ChevronLeft, ChevronRight, IndianRupee, User, PieChart as PieIcon
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
import AdminProfile from './AdminProfile';
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
  const [propertyTypeDistribution, setPropertyTypeDistribution] = useState([]);
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
      const typeCounts = {};
      const ranges = {
        '0-50L': 0,
        '50L-1Cr': 0,
        '1Cr-2Cr': 0,
        '2Cr-5Cr': 0,
        '5Cr+': 0
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        propList.push({ id: doc.id, ...data });

        const price = parseInt(data.price?.replace(/[^0-9]/g, '') || '0', 10);
        if (price > 0) {
          totalVal += price;
          if (price <= 5000000) ranges['0-50L']++;
          else if (price <= 10000000) ranges['50L-1Cr']++;
          else if (price <= 20000000) ranges['1Cr-2Cr']++;
          else if (price <= 50000000) ranges['2Cr-5Cr']++;
          else ranges['5Cr+']++;
        }

        if (data.agent?.name) {
          agentsSet.add(data.agent.name);
        }
        
        if (data.listingStatus) {
          if (data.listingStatus === 'Pending') pending++;
          else if (data.listingStatus === 'Sold' || data.listingStatus === 'Sold Asset') sold++;
        }

        const propType = data.type || data.propertyType || data.category || 'Residential';
        typeCounts[propType] = (typeCounts[propType] || 0) + 1;
      });

      setProperties(propList);

      const typeData = Object.keys(typeCounts).map(type => ({
        name: type.toUpperCase(),
        value: typeCounts[type]
      }));
      setPropertyTypeDistribution(typeData);

      const priceRangeArray = Object.keys(ranges).map(key => ({
        name: key,
        value: ranges[key]
      }));
      setPriceRangeData(priceRangeArray);

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
      snapshot.forEach((doc) => {
        devList.push({ id: doc.id, ...doc.data() });
      });
      setDevelopments(devList);
      setStats(prev => ({ ...prev, totalDevelopments: devList.length }));
    });

    return () => unsubscribe();
  }, []);

  // Sync Status Distribution
  useEffect(() => {
    const statusCount = {};
    
    properties.forEach(prop => {
      const status = prop.listingStatus || prop.status || 'Active Listing';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    developments.forEach(dev => {
      const status = dev.status || 'pre-construction';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    const statusData = Object.keys(statusCount).map(key => ({
      name: key.replace('-', ' ').toUpperCase(),
      value: statusCount[key]
    }));
    setStatusDistribution(statusData);
  }, [properties, developments]);

  // Generate monthly trend data
  useEffect(() => {
    if (properties.length > 0) {
      const monthlyData = {};
      
      properties.forEach(prop => {
        const price = parseInt(prop.price?.replace(/[^0-9]/g, '') || '0', 10);

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

  // Recent activity feed
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

  // SIDEBAR NAVIGATION
  const renderSidebarContent = () => (
    <div className="d-flex flex-column py-5">
      <div className="sidebar-category-title mt-3">MANAGEMENT</div>
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

      <div className="sidebar-category-title mt-3">NEW DEVELOPMENT</div>
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

      <div className="sidebar-category-title mt-3">ACCOUNT SETTINGS</div>
      <button className={`nav-item-btn ${activeTab === 'profile' ? 'active-tab' : ''}`} data-bs-dismiss="offcanvas" onClick={() => setActiveTab('profile')}>
        <div className="theme-icon-box bg-icon-red"><User size={18} /></div>
        <span>Admin Profile</span>
      </button>

      <div className="pt-3 border-top border-light mt-auto">
        <button className="nav-item-btn p-2 w-100 border-0 bg-transparent text-start" onClick={() => navigate('/logout')}>
          <div className="theme-icon-box bg-icon-red"><LogOut size={16} /></div>
          <div className="text-start ms-2">
            <span className="d-block fw-bold text-dark small">Sign Out</span>
            <span className="text-muted" style={{ fontSize: '0.7rem' }}>Exit Session</span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-0 dashboard-master-root">

      {/* MOBILE HEADER */}
      <div className="d-flex d-lg-none justify-content-between align-items-center bg-white border-bottom p-3 sticky-top shadow-sm z-3">
        <div className="d-flex align-items-center p-0 m-0">
          <span className="fw-bold fs-5 text-dark">Admin Hub</span>
        </div>
        <button className="btn p-1 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#adminMobileMenu">
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE OFFCANVAS DRAWER */}
      <div className="offcanvas offcanvas-start border-0" tabIndex="-1" id="adminMobileMenu" style={{ width: '280px', backgroundColor: '#ffffff' }}>
        <div className="offcanvas-header border-bottom py-3">
          <h5 className="offcanvas-title fw-bold">Menu Navigation</h5>
          <button type="button" className="btn-close text-reset shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          {renderSidebarContent()}
        </div>
      </div>

      <div className="row g-0">
        {/* DESKTOP SIDEBAR */}
        <aside className="col-lg-2 d-none d-lg-flex flex-column layout-sidebar-node p-0 pt-4">
          {renderSidebarContent()}
        </aside>

        {/* WORKSPACE MAIN CONTENT (Margin Top Added to prevent Header overlap) */}
        <main className="col-lg-10 p-3 p-md-4 overflow-auto dashboard-main-content">

          {/* TOP HEADER CONTROL MANAGEMENT HUB */}
          <header className="main-control-header d-none d-lg-flex justify-content-between align-items-center my-4">
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
              {/* TOP METRIC CARDS */}
              <div className="row g-3 g-xl-4 mb-4">
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="metric-card metric-blue">
                    <div className="water-drop-ripple"></div>
                    <div>
                      <span className="metric-caption">TOTAL ACTIVE LISTINGS</span>
                      <h2 className="metric-value">{stats.totalListings}</h2>
                      <small className="metric-sub">Active listings</small>
                    </div>
                    <div className="metric-icon-wrapper"><Home size={22} /></div>
                  </div>
                </div>

                {/* FIXED SECOND CARD FOR PORTFOLIO VALUATION */}
                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="metric-card metric-green">
                    <div className="water-drop-ripple"></div>
                    <div className="w-100 pe-2">
                      <span className="metric-caption">PORTFOLIO VALUATION</span>
                      <h2 className="metric-value text-nowrap d-flex align-items-baseline gap-1" title={formatCurrency(stats.totalValuation)}>
                        {formatCompactCurrency(stats.totalValuation)}
                      </h2>
                      <small className="metric-sub">Avg: {formatCompactCurrency(stats.avgPrice)}</small>
                    </div>
                    <div className="metric-icon-wrapper"><IndianRupee size={22} /></div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="metric-card metric-purple">
                    <div className="water-drop-ripple"></div>
                    <div>
                      <span className="metric-caption">ACTIVE SYSTEM AGENTS</span>
                      <h2 className="metric-value">{stats.uniqueAgents}</h2>
                      <small className="metric-sub">Active partners</small>
                    </div>
                    <div className="metric-icon-wrapper"><Users size={22} /></div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-3">
                  <div className="metric-card metric-orange">
                    <div className="water-drop-ripple"></div>
                    <div>
                      <span className="metric-caption">TOTAL DEVELOPMENTS</span>
                      <h2 className="metric-value">{stats.totalDevelopments}</h2>
                      <small className="metric-sub">Ongoing projects</small>
                    </div>
                    <div className="metric-icon-wrapper"><Sparkles size={22} /></div>
                  </div>
                </div>
              </div>

              {/* CHARTS ROW 1 */}
              <div className="row g-3 g-xl-4 mb-4">
                <div className="col-12 col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="chart-card-title m-0">Monthly Trend</h4>
                      <span className="chart-badge">Last 6 months</span>
                    </div>
                    {monthlyTrend.length > 0 ? (
                      <div style={{ width: '100%', height: '260px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={monthlyTrend} barCategoryGap="25%">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.6)" />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => formatCompactCurrency(v)} />
                            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} />
                            <Tooltip formatter={(value, name) => [name === 'value' ? formatCurrency(value) : value, name]} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="count" fill="#6366f1" name="Properties" radius={[6, 6, 0, 0]} maxBarSize={38} />
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

                <div className="col-12 col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="chart-card-title m-0">Status Breakdown</h4>
                      <span className="chart-badge">All Assets & Feed</span>
                    </div>
                    {statusDistribution.length > 0 ? (
                      <div style={{ width: '100%', height: '260px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={statusDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={65}
                              outerRadius={95}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {statusDistribution.map((entry, index) => (
                                <Cell key={`status-cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                        <p>No status data found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CHARTS ROW 2 */}
              <div className="row g-3 g-xl-4 mb-4">
                <div className="col-12 col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="chart-card-title m-0">Price Range Distribution</h4>
                      <span className="chart-badge">Properties</span>
                    </div>
                    {priceRangeData.some(d => d.value > 0) ? (
                      <div style={{ width: '100%', height: '260px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={priceRangeData} barCategoryGap="20%">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.6)" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                            <YAxis stroke="#94a3b8" fontSize={11} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8b5cf6" name="Items Count" radius={[6, 6, 0, 0]} maxBarSize={38}>
                              {priceRangeData.map((entry, index) => (
                                <Cell key={`price-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <Activity size={40} className="mb-2" />
                        <p>No price range data available</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-xl-6">
                  <div className="content-panel-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <PieIcon size={18} className="text-primary" />
                        <h4 className="chart-card-title m-0">Property Types Distribution</h4>
                      </div>
                      <span className="chart-badge">Real-time</span>
                    </div>
                    {propertyTypeDistribution.length > 0 ? (
                      <div style={{ width: '100%', height: '260px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={propertyTypeDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {propertyTypeDistribution.map((entry, index) => (
                                <Cell key={`prop-cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
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
                        <p>No property type data found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY FEED */}
              <div className="content-panel-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0 text-dark fs-5">Recent Activity Feed</h4>
                  <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                    <RefreshCw size={14} className="me-1" />
                    Refresh
                  </button>
                </div>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status"></div>
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
                                  className="rounded flex-shrink-0 shadow-sm cursor-pointer border" 
                                  style={{ width: '48px', height: '36px', objectFit: 'cover' }}
                                  onClick={() => item.type === 'property' && openPropertyModal(item.rawObj)}
                                />
                                <span className="fw-bold text-dark text-truncate" style={{ maxWidth: '220px' }}>
                                  {item.title}
                                </span>
                              </div>
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
                                onClick={() => item.type === 'property' && openPropertyModal(item.rawObj)}
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
                                onClick={() => openPropertyModal(prop)}
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                className="btn btn-sm text-danger p-1 border-0 bg-transparent" 
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
                onDelete={(id) => handleDelete(id, "developments")}
              />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="fade-in-scope content-panel-card p-4">
              <AdminProfile />
            </div>
          )}
        </main>
      </div>

      {/* MOBILE APP BOTTOM NAVIGATION BAR */}
      <div className="d-lg-none position-fixed bottom-0 start-0 end-0 bg-white border-top d-flex justify-content-around py-2 shadow-lg z-3">
        <button 
          className={`btn btn-link p-0 text-center text-decoration-none ${activeTab === 'overview' ? 'text-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('overview')}
        >
          <TrendingUp size={20} className="d-block mx-auto mb-1" />
          <span style={{ fontSize: '10px' }} className="fw-semibold">Overview</span>
        </button>

        <button 
          className={`btn btn-link p-0 text-center text-decoration-none ${activeTab === 'manage' ? 'text-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('manage')}
        >
          <Home size={20} className="d-block mx-auto mb-1" />
          <span style={{ fontSize: '10px' }} className="fw-semibold">Assets</span>
        </button>

        <button 
          className={`btn btn-link p-0 text-center text-decoration-none ${activeTab === 'add' ? 'text-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('add')}
        >
          <PlusCircle size={20} className="d-block mx-auto mb-1" />
          <span style={{ fontSize: '10px' }} className="fw-semibold">Add</span>
        </button>

        <button 
          className={`btn btn-link p-0 text-center text-decoration-none ${activeTab === 'manage-developments' ? 'text-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('manage-developments')}
        >
          <Sparkles size={20} className="d-block mx-auto mb-1" />
          <span style={{ fontSize: '10px' }} className="fw-semibold">Projects</span>
        </button>

        <button 
          className={`btn btn-link p-0 text-center text-decoration-none ${activeTab === 'profile' ? 'text-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={20} className="d-block mx-auto mb-1" />
          <span style={{ fontSize: '10px' }} className="fw-semibold">Profile</span>
        </button>
      </div>

      {/* DETAILED PROPERTY MODAL */}
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
                            <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Representative Agent</small>
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
                        <div className="p-3 bg-light border rounded-3 mb-3 text-secondary small fw-semibold">
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