import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaHome, FaBriefcase, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="nav-brand">
            <Link to="/" className="logo">
              <span className="logo-icon">🚀</span> ServiceHub
            </Link>
            <button 
              className="menu-toggle" 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaHome /> Home
            </Link>
            <Link to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaBriefcase /> Services
            </Link>
            
            {user ? (
              <div className="user-section">
                <div className="profile-dropdown">
                  <button 
                    className="profile-btn"
                    onClick={toggleDropdown}
                    aria-label="User profile"
                  >
                    <div className="profile-icon">
                      {user.avatar ? (
                        <img src={user.avatar} alt="User" />
                      ) : (
                        <FaUserCircle />
                      )}
                    </div>
                  </button>
                  
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <div className="user-info">
                          <div className="user-avatar">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name || 'User'} />
                            ) : (
                              <FaUserCircle />
                            )}
                          </div>
                          <div className="user-details">
                            <span className="user-name">{user.name || 'User'}</span>
                            <span className="user-email">{user.email || 'user@example.com'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="dropdown-items">
                        <Link 
                          to="/profile" 
                          className="dropdown-item"
                          onClick={() => {
                            setDropdownOpen(false);
                            setMenuOpen(false);
                          }}
                        >
                          <FaUser /> My Profile
                        </Link>
                        
                        {user.role === 'admin' && (
                          <Link 
                            to="/admin" 
                            className="dropdown-item"
                            onClick={() => {
                              setDropdownOpen(false);
                              setMenuOpen(false);
                            }}
                          >
                            <FaUserCircle /> Admin Dashboard
                          </Link>
                        )}
                        
                        <button 
                          onClick={handleLogout} 
                          className="dropdown-item logout-item"
                        >
                          <FaSignOutAlt /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="nav-link login-btn" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary signup-btn" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          padding: 15px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo {
          font-size: 28px;
          font-weight: 800;
          color: #3a86ff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          font-size: 24px;
        }

        .menu-toggle {
          background: none;
          border: none;
          font-size: 24px;
          color: #1a1a2e;
          cursor: pointer;
          display: none;
          padding: 5px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .menu-toggle:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-link {
          color: #1a1a2e;
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          position: relative;
        }

        .nav-link:hover {
          color: #3a86ff;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #3a86ff;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* User Profile Section */
        .user-section {
          position: relative;
        }

        .profile-dropdown {
          position: relative;
        }

        .profile-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-btn:hover {
          background: rgba(58, 134, 255, 0.1);
        }

        .profile-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          overflow: hidden;
        }

        .profile-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Dropdown Menu */
        .dropdown-menu {
          position: absolute;
          top: 50px;
          right: 0;
          width: 280px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          z-index: 1001;
          overflow: hidden;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          padding: 20px;
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          color: white;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          font-size: 16px;
        }

        .user-email {
          font-size: 12px;
          opacity: 0.8;
          margin-top: 3px;
        }

        .dropdown-items {
          padding: 10px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          color: #1a1a2e;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.3s ease;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background: rgba(58, 134, 255, 0.1);
          color: #3a86ff;
        }

        .dropdown-item svg {
          width: 18px;
          color: #6c757d;
        }

        .dropdown-item:hover svg {
          color: #3a86ff;
        }

        .logout-item {
          color: #ef476f;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          margin-top: 5px;
        }

        .logout-item:hover {
          color: #ef476f;
          background: rgba(239, 71, 111, 0.1);
        }

        .logout-item svg {
          color: #ef476f;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .login-btn {
          padding: 8px 20px;
          border-radius: 30px;
          border: 2px solid #3a86ff;
          color: #3a86ff;
          font-weight: 600;
        }

        .login-btn:hover {
          background: rgba(58, 134, 255, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          color: white;
          padding: 10px 24px;
          border-radius: 30px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(58, 134, 255, 0.3);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            display: none;
            gap: 15px;
            border-radius: 0 0 20px 20px;
            z-index: 999;
          }

          .nav-menu.active {
            display: flex;
          }

          .nav-link {
            width: 100%;
            padding: 12px 20px;
            border-radius: 10px;
            justify-content: flex-start;
          }

          .nav-link:hover {
            background: rgba(58, 134, 255, 0.1);
          }

          .nav-link::after {
            display: none;
          }

          .profile-dropdown {
            width: 100%;
          }

          .profile-btn {
            width: 100%;
            justify-content: flex-start;
            padding: 12px 20px;
            border-radius: 10px;
          }

          .dropdown-menu {
            position: static;
            width: 100%;
            margin-top: 10px;
            box-shadow: none;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }

          .auth-buttons {
            flex-direction: column;
            width: 100%;
          }

          .login-btn, .signup-btn {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;