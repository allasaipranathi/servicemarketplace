import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">ServiceHub</h3>
            <p>Book professional services with ease and convenience.</p>
            <div className="social-icons">
              <a href="https://facebook.com"
 className="social-icon"><FaFacebook /></a>
              <a href="https://twitter.com" className="social-icon"><FaTwitter /></a>
              <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
              <a href="https://linkedin.com" className="social-icon"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <Link to="/services?category=home">Home Services</Link>
            <Link to="/services?category=tech">Tech Services</Link>
            <Link to="/services?category=health">Health & Wellness</Link>
            <Link to="/services?category=education">Education</Link>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@servicehub.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Service St, City, Country</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--dark);
          color: white;
          padding: 40px 0 20px;
          margin-top: auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 30px;
        }

        .footer-section h4 {
          margin-bottom: 20px;
          font-size: 18px;
        }

        .footer-section a, .footer-section p {
          color: #b0b7c3;
          text-decoration: none;
          margin-bottom: 10px;
          display: block;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-logo {
          font-size: 28px;
          font-weight: bold;
          color: var(--primary);
          margin-bottom: 15px;
        }

        .social-icons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .social-icon {
          background: rgba(255, 255, 255, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: var(--primary);
          transform: translateY(-3px);
        }

        .footer-bottom {
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-links {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;