import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaCreditCard, 
  FaLock, 
  FaCheckCircle, 
  FaArrowLeft,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const [bookingDetails, setBookingDetails] = useState({
    service: 'Professional Home Cleaning',
    provider: 'CleanPro Services',
    date: '2024-01-20',
    time: '10:00 AM',
    total: '89.00'
  });

  useEffect(() => {
    // Fetch booking details - Replace with API call
    setTimeout(() => {
      setBookingDetails({
        service: 'Professional Home Cleaning',
        provider: 'CleanPro Services',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        total: '89.00'
      });
    }, 500);
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      cardNumber: formatted
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid 16-digit card number');
      return;
    }

    setLoading(true);

    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentSuccess(true);
      toast.success('Payment successful!');
      
      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <div className="success-container">
          <FaCheckCircle className="success-icon" />
          <h2>Payment Successful!</h2>
          <p>Your booking has been confirmed.</p>
          <div className="success-details">
            <p>Booking ID: <strong>{bookingId}</strong></p>
            <p>Amount Paid: <strong>${bookingDetails.total}</strong></p>
            <p>You will receive a confirmation email shortly.</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/profile')}
          >
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back to Booking
          </button>
          <h1>Complete Payment</h1>
        </div>

        <div className="payment-layout">
          {/* Left Column - Payment Form */}
          <div className="payment-form-section">
            <div className="payment-methods">
              <h3>Payment Method</h3>
              <div className="method-icons">
                <FaCcVisa className="method-icon active" />
                <FaCcMastercard className="method-icon active" />
                <FaCcPaypal className="method-icon" />
                <FaCcApplePay className="method-icon" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
              <div className="form-group">
                <label className="form-label">Card Number *</label>
                <div className="input-with-icon">
                  <FaCreditCard />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className="form-control"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Card Holder Name *</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Expiry Date *</label>
                  <input
                    type="month"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  name="saveCard"
                  id="saveCard"
                  checked={formData.saveCard}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="saveCard" className="form-check-label">
                  Save card for future payments
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay $${bookingDetails.total}`}
              </button>

              <div className="security-note">
                <FaLock /> Your payment is secured with 256-bit SSL encryption
              </div>
            </form>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="payment-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-item">
                  <span>Service</span>
                  <span>{bookingDetails.service}</span>
                </div>
                
                <div className="summary-item">
                  <span>Provider</span>
                  <span>{bookingDetails.provider}</span>
                </div>
                
                <div className="summary-item">
                  <span>Date & Time</span>
                  <span>{bookingDetails.date} at {bookingDetails.time}</span>
                </div>
              </div>

              <div className="summary-total">
                <span>Total Amount</span>
                <span className="total-amount">${bookingDetails.total}</span>
              </div>
            </div>

            <div className="payment-security">
              <h4>Payment Security</h4>
              <ul>
                <li>Secure SSL/TLS encryption</li>
                <li>PCI DSS compliant</li>
                <li>No card details stored on our servers</li>
                <li>3D Secure authentication</li>
              </ul>
            </div>

            <div className="payment-guarantee">
              <h4>Service Guarantee</h4>
              <p>
                Your payment is protected. Full refund if service is not 
                provided as described.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .payment-page {
          padding: 40px 0;
        }

        .payment-success {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          text-align: center;
        }

        .success-container {
          max-width: 500px;
          padding: 40px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .success-icon {
          font-size: 80px;
          color: var(--success);
          margin-bottom: 20px;
        }

        .success-details {
          background: var(--light);
          padding: 20px;
          border-radius: 5px;
          margin: 30px 0;
          text-align: left;
        }

        .payment-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .back-btn {
          background: none;
          border: none;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 16px;
        }

        .payment-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
        }

        .payment-methods {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .method-icons {
          display: flex;
          gap: 20px;
          margin-top: 15px;
        }

        .method-icon {
          font-size: 40px;
          color: #ccc;
          transition: color 0.3s ease;
        }

        .method-icon.active {
          color: var(--dark);
        }

        .payment-form {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon svg {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray);
        }

        .input-with-icon input {
          padding-left: 45px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          font-size: 18px;
          margin: 20px 0;
        }

        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--success);
          font-size: 14px;
          padding: 15px;
          background: var(--light);
          border-radius: 5px;
        }

        .payment-summary {
          position: sticky;
          top: 100px;
          align-self: start;
        }

        .summary-card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        .summary-card h3 {
          margin-bottom: 25px;
          color: var(--dark);
        }

        .summary-details {
          margin-bottom: 20px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--light-gray);
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          border-top: 2px solid var(--light-gray);
          margin-top: 20px;
          font-weight: bold;
          font-size: 18px;
        }

        .total-amount {
          color: var(--primary);
          font-size: 24px;
        }

        .payment-security {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          margin-bottom: 30px;
        }

        .payment-security h4 {
          margin-bottom: 20px;
          color: var(--dark);
        }

        .payment-security ul {
          list-style: none;
          padding: 0;
        }

        .payment-security li {
          padding: 8px 0;
          padding-left: 25px;
          position: relative;
          color: var(--gray);
        }

        .payment-security li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        .payment-guarantee {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          padding: 30px;
          border-radius: 10px;
          text-align: center;
        }

        .payment-guarantee h4 {
          margin-bottom: 15px;
        }

        @media (max-width: 992px) {
          .payment-layout {
            grid-template-columns: 1fr;
          }

          .payment-summary {
            position: static;
          }
        }

        @media (max-width: 576px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .payment-form {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Payment;