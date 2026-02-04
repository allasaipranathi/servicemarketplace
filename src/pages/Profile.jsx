import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaHistory,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaShieldAlt,
  FaCreditCard,
  FaCog,
  FaBell,
  FaLock,
  FaGlobe,
  FaBookmark
} from 'react-icons/fa';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    
    // Mock data - Replace with API calls
    const mockUser = savedUser || {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      bio: 'I love using ServiceHub to find amazing services for my home and business needs.',
      joinDate: '2023-01-15',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      verified: true,
      membership: 'Premium',
      stats: {
        bookings: 12,
        reviews: 8,
        saved: 5,
        spending: 2450
      }
    };

    const mockBookings = [
      {
        id: 'BKG001',
        service: 'Home Cleaning',
        provider: 'CleanPro Services',
        date: '2024-01-20',
        time: '10:00 AM',
        status: 'completed',
        price: 89,
        rating: 5,
        serviceImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'BKG002',
        service: 'Web Development',
        provider: 'TechDev Inc',
        date: '2024-01-25',
        time: '02:00 PM',
        status: 'upcoming',
        price: 1500,
        rating: null,
        serviceImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'BKG003',
        service: 'Yoga Training',
        provider: 'ZenYoga Studio',
        date: '2024-01-18',
        time: '04:00 PM',
        status: 'completed',
        price: 60,
        rating: 4,
        serviceImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'BKG004',
        service: 'AC Repair',
        provider: 'CoolAir Pros',
        date: '2024-02-22',
        time: '11:00 AM',
        status: 'confirmed',
        price: 120,
        rating: null,
        serviceImage: 'https://images.unsplash.com/photo-1566110980915-b03de4e1c0b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'BKG005',
        service: 'Car Wash',
        provider: 'AutoShine',
        date: '2024-02-10',
        time: '03:00 PM',
        status: 'cancelled',
        price: 45,
        rating: null,
        serviceImage: 'https://images.unsplash.com/photo-1565689221354-d87f85d4aee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
      }
    ];

    setTimeout(() => {
      setUser(mockUser);
      setBookings(mockBookings);
      setEditForm({
        name: mockUser.name,
        email: mockUser.email,
        phone: mockUser.phone,
        address: mockUser.address,
        bio: mockUser.bio || ''
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: '#06d6a0', icon: <FaCheckCircle />, label: 'Completed' },
      upcoming: { color: '#3a86ff', icon: <FaClock />, label: 'Upcoming' },
      confirmed: { color: '#8338ec', icon: <FaCheckCircle />, label: 'Confirmed' },
      cancelled: { color: '#ef476f', icon: <FaTimesCircle />, label: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.upcoming;
    
    return (
      <span className="status-badge" style={{ background: config.color }}>
        {config.icon} {config.label}
      </span>
    );
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Update user data
    const updatedUser = {
      ...user,
      ...editForm
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      bio: user.bio || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleViewBooking = (bookingId) => {
    navigate(`/booking-details/${bookingId}`);
  };

  const handleRateService = (bookingId) => {
    toast.success(`Rating submitted for booking ${bookingId}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-cover">
            <div className="cover-overlay">
              <div className="profile-info">
                <div className="avatar-container">
                  <img src={user.avatar} alt={user.name} className="avatar" />
                  {user.verified && (
                    <span className="verified-badge">
                      <FaShieldAlt /> Verified
                    </span>
                  )}
                </div>
                <div className="profile-details">
                  <h1>{user.name}</h1>
                  <p className="user-email">{user.email}</p>
                  <div className="profile-meta">
                    <span className="meta-item">
                      <FaCalendarAlt /> Member since {new Date(user.joinDate).getFullYear()}
                    </span>
                    <span className="meta-item">
                      <FaStar /> {user.stats?.reviews || 0} Reviews
                    </span>
                    {user.membership && (
                      <span className="membership-badge">
                        {user.membership} Member
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className="edit-profile-btn"
                  onClick={isEditing ? handleSaveProfile : handleEditProfile}
                >
                  <FaEdit /> {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#3a86ff' }}>
              <FaHistory />
            </div>
            <div className="stat-content">
              <h3>{user.stats?.bookings || 0}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#06d6a0' }}>
              <FaStar />
            </div>
            <div className="stat-content">
              <h3>{user.stats?.reviews || 0}</h3>
              <p>Reviews Written</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#8338ec' }}>
              <FaBookmark />
            </div>
            <div className="stat-content">
              <h3>{user.stats?.saved || 0}</h3>
              <p>Saved Services</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ffd166' }}>
              <FaCreditCard />
            </div>
            <div className="stat-content">
              <h3>${user.stats?.spending || 0}</h3>
              <p>Total Spent</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="sidebar-menu">
              <button 
                className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser /> Personal Info
              </button>
              <button 
                className={`menu-item ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <FaHistory /> My Bookings
              </button>
              <button 
                className={`menu-item ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                <FaStar /> My Reviews
              </button>
              <button 
                className={`menu-item ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                <FaBookmark /> Saved Services
              </button>
              <button 
                className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <FaCog /> Settings
              </button>
              <button 
                className={`menu-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <FaLock /> Security
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="profile-content">
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="section-header">
                  <h2>Personal Information</h2>
                  <p>Manage your personal details and preferences</p>
                </div>

                {isEditing ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        name="address"
                        value={editForm.address}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>Bio / About Me</label>
                      <textarea
                        name="bio"
                        value={editForm.bio}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div className="form-actions">
                      <button className="btn-primary" onClick={handleSaveProfile}>
                        Save Changes
                      </button>
                      <button className="btn-outline" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-grid">
                    <div className="info-card">
                      <div className="info-icon">
                        <FaUser />
                      </div>
                      <div className="info-content">
                        <h3>Full Name</h3>
                        <p>{user.name}</p>
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-icon">
                        <FaEnvelope />
                      </div>
                      <div className="info-content">
                        <h3>Email Address</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-icon">
                        <FaPhone />
                      </div>
                      <div className="info-content">
                        <h3>Phone Number</h3>
                        <p>{user.phone}</p>
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-icon">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="info-content">
                        <h3>Address</h3>
                        <p>{user.address}</p>
                      </div>
                    </div>
                    <div className="info-card full-width">
                      <div className="info-icon">
                        <FaGlobe />
                      </div>
                      <div className="info-content">
                        <h3>About Me</h3>
                        <p>{user.bio || 'No bio added yet.'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="tab-content">
                <div className="section-header">
                  <h2>My Bookings</h2>
                  <p>View and manage your service bookings</p>
                </div>

                <div className="bookings-list">
                  {bookings.length === 0 ? (
                    <div className="empty-state">
                      <h3>No bookings yet</h3>
                      <p>Book your first service to get started!</p>
                      <button 
                        className="btn-primary"
                        onClick={() => navigate('/services')}
                      >
                        Browse Services
                      </button>
                    </div>
                  ) : (
                    <div className="bookings-table">
                      {bookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                          <div className="booking-image">
                            <img src={booking.serviceImage} alt={booking.service} />
                          </div>
                          <div className="booking-info">
                            <h4>{booking.service}</h4>
                            <p className="booking-provider">{booking.provider}</p>
                            <div className="booking-meta">
                              <span>
                                <FaCalendarAlt /> {booking.date} at {booking.time}
                              </span>
                              <span className="booking-price">${booking.price}</span>
                            </div>
                          </div>

                          <div className="booking-actions">
                            <div className="booking-status">
                              {getStatusBadge(booking.status)}
                            </div>
                            
                            <div className="action-buttons">
                              <button 
                                className="action-btn view-btn"
                                onClick={() => handleViewBooking(booking.id)}
                              >
                                View Details
                              </button>
                              
                              {booking.status === 'completed' && !booking.rating && (
                                <button 
                                  className="action-btn rate-btn"
                                  onClick={() => handleRateService(booking.id)}
                                >
                                  <FaStar /> Rate Service
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-content">
                <div className="section-header">
                  <h2>My Reviews</h2>
                  <p>Manage your service reviews and ratings</p>
                </div>
                
                <div className="empty-state">
                  <h3>No reviews yet</h3>
                  <p>Rate your completed services to help others!</p>
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/bookings')}
                  >
                    View My Bookings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="tab-content">
                <div className="section-header">
                  <h2>Saved Services</h2>
                  <p>Your favorite services for quick access</p>
                </div>
                
                <div className="empty-state">
                  <h3>No saved services yet</h3>
                  <p>Save your favorite services for quick booking!</p>
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/services')}
                  >
                    Browse Services
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="tab-content">
                <div className="section-header">
                  <h2>Account Settings</h2>
                  <p>Manage your account preferences</p>
                </div>
                
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-icon">
                      <FaBell />
                    </div>
                    <div className="setting-content">
                      <h3>Notifications</h3>
                      <p>Manage your email and push notifications</p>
                    </div>
                    <div className="setting-action">
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-icon">
                      <FaGlobe />
                    </div>
                    <div className="setting-content">
                      <h3>Language & Region</h3>
                      <p>Choose your preferred language and region</p>
                    </div>
                    <div className="setting-action">
                      <span className="current-setting">English (US)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="tab-content">
                <div className="section-header">
                  <h2>Security Settings</h2>
                  <p>Manage your account security and privacy</p>
                </div>
                
                <div className="security-list">
                  <div className="security-item">
                    <div className="security-icon">
                      <FaLock />
                    </div>
                    <div className="security-content">
                      <h3>Change Password</h3>
                      <p>Update your account password</p>
                    </div>
                    <button className="btn-outline">
                      Change Password
                    </button>
                  </div>
                  
                  <div className="security-item">
                    <div className="security-icon">
                      <FaShieldAlt />
                    </div>
                    <div className="security-content">
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn-outline">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          padding: 20px 0 80px;
          background: #f5f7fa;
          min-height: 100vh;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Profile Header */
        .profile-header {
          margin-bottom: 30px;
        }

        .profile-cover {
          background: linear-gradient(135deg, #3a86ff 0%, #8338ec 100%);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          height: 200px;
        }

        .cover-overlay {
          background: rgba(0, 0, 0, 0.3);
          padding: 40px;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 30px;
          width: 100%;
        }

        .avatar-container {
          position: relative;
        }

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid white;
          object-fit: cover;
        }

        .verified-badge {
          position: absolute;
          bottom: 10px;
          right: 0;
          background: #06d6a0;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .profile-details {
          flex: 1;
          color: white;
        }

        .profile-details h1 {
          font-size: 36px;
          margin-bottom: 5px;
          font-weight: 700;
        }

        .user-email {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 15px;
        }

        .profile-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          opacity: 0.9;
        }

        .membership-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .edit-profile-btn {
          background: white;
          color: #3a86ff;
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .edit-profile-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Stats Overview */
        .stats-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-content h3 {
          font-size: 32px;
          color: #1a1a2e;
          margin-bottom: 5px;
          font-weight: 700;
        }

        .stat-content p {
          color: #6c757d;
          font-size: 14px;
        }

        /* Main Content */
        .profile-main {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 30px;
        }

        /* Sidebar */
        .profile-sidebar {
          background: white;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: none;
          border: none;
          border-radius: 10px;
          color: #6c757d;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .menu-item:hover {
          background: rgba(58, 134, 255, 0.1);
          color: #3a86ff;
        }

        .menu-item.active {
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          color: white;
        }

        /* Content Area */
        .profile-content {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .section-header {
          margin-bottom: 30px;
        }

        .section-header h2 {
          font-size: 28px;
          color: #1a1a2e;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .section-header p {
          color: #6c757d;
          font-size: 16px;
        }

        /* Info Grid */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .info-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .info-card.full-width {
          grid-column: 1 / -1;
        }

        .info-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .info-content h3 {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .info-content p {
          color: #1a1a2e;
          font-size: 16px;
          font-weight: 500;
        }

        /* Edit Form */
        .edit-form {
          max-width: 600px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #1a1a2e;
          font-weight: 600;
        }

        .form-control {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: #3a86ff;
          box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
        }

        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(58, 134, 255, 0.3);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #3a86ff;
          color: #3a86ff;
          padding: 12px 30px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: rgba(58, 134, 255, 0.1);
        }

        /* Bookings */
        .bookings-table {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .booking-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .booking-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .booking-image {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          overflow: hidden;
        }

        .booking-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .booking-info {
          flex: 1;
        }

        .booking-info h4 {
          font-size: 18px;
          color: #1a1a2e;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .booking-provider {
          color: #6c757d;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .booking-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          color: #6c757d;
          font-size: 14px;
        }

        .booking-price {
          color: #3a86ff;
          font-weight: 600;
        }

        .booking-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          padding: 8px 15px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .view-btn {
          background: #3a86ff;
          color: white;
        }

        .view-btn:hover {
          background: #2a76ff;
        }

        .rate-btn {
          background: #ffd166;
          color: #1a1a2e;
        }

        .rate-btn:hover {
          background: #ffc745;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6c757d;
        }

        .empty-state h3 {
          margin-bottom: 10px;
          color: #1a1a2e;
          font-size: 24px;
        }

        .empty-state p {
          margin-bottom: 30px;
          font-size: 16px;
        }

        /* Settings */
        .settings-list, .security-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .setting-item, .security-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
        }

        .setting-icon, .security-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .setting-content, .security-content {
          flex: 1;
        }

        .setting-content h3, .security-content h3 {
          font-size: 16px;
          color: #1a1a2e;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .setting-content p, .security-content p {
          color: #6c757d;
          font-size: 14px;
        }

        .setting-action {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .current-setting {
          color: #3a86ff;
          font-weight: 600;
        }

        /* Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 30px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 22px;
          width: 22px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #3a86ff;
        }

        input:checked + .slider:before {
          transform: translateX(30px);
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .profile-main {
            grid-template-columns: 1fr;
          }
          
          .profile-sidebar {
            position: static;
          }
          
          .profile-info {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }
          
          .stats-overview {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cover-overlay {
            padding: 30px 20px;
          }
          
          .avatar {
            width: 100px;
            height: 100px;
          }
          
          .profile-details h1 {
            font-size: 28px;
          }
          
          .stats-overview {
            grid-template-columns: 1fr;
          }
          
          .booking-card {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }
          
          .booking-actions {
            align-items: stretch;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .setting-item, .security-item {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }
          
          .setting-action, .security-item button {
            align-self: flex-start;
          }
        }

        @media (max-width: 480px) {
          .profile-cover {
            height: 180px;
          }
          
          .cover-overlay {
            padding: 20px 15px;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;