import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaDollarSign,
  FaChartLine,
  FaCog,
  FaBell,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - Replace with API calls
    const mockStats = {
      totalUsers: 1254,
      totalServices: 89,
      totalBookings: 567,
      totalRevenue: 45678,
      growth: {
        users: 12.5,
        bookings: 8.3,
        revenue: 15.2
      }
    };

    const mockBookings = [
      { id: 'BKG001', user: 'John Doe', service: 'Home Cleaning', date: '2024-01-20', status: 'confirmed', amount: 89 },
      { id: 'BKG002', user: 'Jane Smith', service: 'Web Dev', date: '2024-01-19', status: 'completed', amount: 1500 },
      { id: 'BKG003', user: 'Bob Johnson', service: 'Yoga', date: '2024-01-18', status: 'pending', amount: 60 },
      { id: 'BKG004', user: 'Alice Brown', service: 'Tutoring', date: '2024-01-17', status: 'cancelled', amount: 40 },
      { id: 'BKG005', user: 'Charlie Wilson', service: 'Car Wash', date: '2024-01-16', status: 'confirmed', amount: 25 },
    ];

    setTimeout(() => {
      setStats(mockStats);
      setRecentBookings(mockBookings);
      setLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'var(--primary)',
      pending: 'var(--warning)',
      completed: 'var(--success)',
      cancelled: 'var(--danger)'
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, Administrator</p>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <FaBell />
              <span className="notification-count">3</span>
            </button>
            <button className="settings-btn">
              <FaCog />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>{stats.totalUsers.toLocaleString()}</h3>
              <p>Total Users</p>
              <span className="growth positive">
                <FaChartLine /> +{stats.growth.users}%
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon services">
              <FaBriefcase />
            </div>
            <div className="stat-content">
              <h3>{stats.totalServices}</h3>
              <p>Services</p>
              <span className="growth positive">
                <FaChartLine /> +5.2%
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bookings">
              <FaCalendarAlt />
            </div>
            <div className="stat-content">
              <h3>{stats.totalBookings}</h3>
              <p>Total Bookings</p>
              <span className="growth positive">
                <FaChartLine /> +{stats.growth.bookings}%
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <FaDollarSign />
            </div>
            <div className="stat-content">
              <h3>${stats.totalRevenue.toLocaleString()}</h3>
              <p>Total Revenue</p>
              <span className="growth positive">
                <FaChartLine /> +{stats.growth.revenue}%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Bookings</h2>
            <div className="section-controls">
              <div className="search-box">
                <FaSearch />
                <input type="text" placeholder="Search bookings..." />
              </div>
              <button className="filter-btn">
                <FaFilter /> Filter
              </button>
            </div>
          </div>

          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.user}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ background: getStatusColor(booking.status) }}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>${booking.amount}</td>
                    <td>
                      <button className="action-btn view">View</button>
                      <button className="action-btn edit">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card">
              <FaUsers />
              <span>Manage Users</span>
            </button>
            <button className="action-card">
              <FaBriefcase />
              <span>Manage Services</span>
            </button>
            <button className="action-card">
              <FaCalendarAlt />
              <span>View All Bookings</span>
            </button>
            <button className="action-card">
              <FaDollarSign />
              <span>View Financial Reports</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          padding: 30px 0;
          background: var(--light);
          min-height: 100vh;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .header-left h1 {
          font-size: 32px;
          color: var(--dark);
          margin-bottom: 5px;
        }

        .header-left p {
          color: var(--gray);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .notification-btn, .settings-btn {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: none;
          background: var(--light-gray);
          color: var(--dark);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          position: relative;
          transition: all 0.3s ease;
        }

        .notification-btn:hover, .settings-btn:hover {
          background: #ddd;
          transform: translateY(-2px);
        }

        .notification-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--danger);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }

        .stat-icon.users {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .stat-icon.services {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .stat-icon.bookings {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .stat-icon.revenue {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .stat-content h3 {
          font-size: 28px;
          color: var(--dark);
          margin-bottom: 5px;
        }

        .stat-content p {
          color: var(--gray);
          margin-bottom: 5px;
        }

        .growth {
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .growth.positive {
          color: var(--success);
        }

        .recent-section {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          margin-bottom: 40px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .section-header h2 {
          color: var(--dark);
        }

        .section-controls {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .search-box {
          position: relative;
        }

        .search-box input {
          padding: 10px 15px 10px 40px;
          border: 1px solid var(--light-gray);
          border-radius: 5px;
          font-size: 14px;
          width: 200px;
        }

        .search-box svg {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray);
        }

        .filter-btn {
          padding: 10px 20px;
          background: var(--light-gray);
          border: none;
          border-radius: 5px;
          color: var(--dark);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: #ddd;
        }

        .bookings-table {
          overflow-x: auto;
        }

        .bookings-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .bookings-table th {
          text-align: left;
          padding: 15px;
          background: var(--light);
          color: var(--gray);
          font-weight: 600;
          border-bottom: 2px solid var(--light-gray);
        }

        .bookings-table td {
          padding: 15px;
          border-bottom: 1px solid var(--light-gray);
          color: var(--dark);
        }

        .bookings-table tr:hover {
          background: var(--light);
        }

        .status-badge {
          padding: 5px 10px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .action-btn {
          padding: 5px 10px;
          border: none;
          border-radius: 3px;
          font-size: 12px;
          cursor: pointer;
          margin-right: 5px;
          transition: all 0.3s ease;
        }

        .action-btn.view {
          background: var(--primary);
          color: white;
        }

        .action-btn.edit {
          background: var(--warning);
          color: var(--dark);
        }

        .action-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .quick-actions {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .quick-actions h2 {
          color: var(--dark);
          margin-bottom: 25px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .action-card {
          background: var(--light);
          border: 2px solid transparent;
          padding: 25px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .action-card:hover {
          border-color: var(--primary);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .action-card svg {
          font-size: 32px;
          color: var(--primary);
        }

        .action-card span {
          font-weight: 500;
          color: var(--dark);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box input {
            width: 100%;
          }

          .section-controls {
            flex-direction: column;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;