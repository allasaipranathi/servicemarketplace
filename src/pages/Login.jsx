import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock login - Replace with API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        email: formData.email,
        name: 'John Doe',
        role: 'user'
      };
      
      login(mockUser);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.success(`Login with ${provider} clicked`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label">
                <FaLock /> Password
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="social-login">
          <p className="divider">Or continue with</p>
          <div className="social-buttons">
            <button 
              className="social-btn google"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle /> Google
            </button>
            <button 
              className="social-btn facebook"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          padding: 20px;
        }

        .auth-container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 450px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-header h2 {
          font-size: 28px;
          color: var(--dark);
          margin-bottom: 10px;
        }

        .auth-header p {
          color: var(--gray);
        }

        .auth-form {
          margin-bottom: 30px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .form-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .forgot-link {
          color: var(--primary);
          text-decoration: none;
          font-size: 14px;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .auth-btn {
          width: 100%;
          padding: 12px;
          font-size: 16px;
        }

        .social-login {
          margin-bottom: 30px;
        }

        .divider {
          text-align: center;
          position: relative;
          margin: 20px 0;
          color: var(--gray);
        }

        .divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 45%;
          height: 1px;
          background: var(--light-gray);
        }

        .divider::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          width: 45%;
          height: 1px;
          background: var(--light-gray);
        }

        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .social-btn {
          padding: 12px;
          border: 1px solid var(--light-gray);
          background: white;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .social-btn.google:hover {
          background: #f8f8f8;
          border-color: #ddd;
        }

        .social-btn.facebook:hover {
          background: #f0f2f5;
          border-color: #ddd;
        }

        .auth-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid var(--light-gray);
        }

        .auth-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 30px 20px;
          }

          .social-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;