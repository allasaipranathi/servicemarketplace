import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaMapMarkerAlt,
  FaCreditCard,
  FaArrowLeft
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Booking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '2',
    address: '',
    notes: '',
    contactNumber: ''
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  useEffect(() => {
    // Mock service data - Replace with API call
    const mockService = {
      id: serviceId,
      title: 'Professional Home Cleaning',
      price: 89,
      unit: 'session',
      provider: 'CleanPro Services',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952'
    };

    setTimeout(() => {
      setService(mockService);
      setLoading(false);
      
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({
        ...prev,
        date: tomorrow.toISOString().split('T')[0]
      }));
    }, 1000);
  }, [serviceId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    const basePrice = service?.price || 0;
    const duration = parseInt(formData.duration);
    const hourlyRate = basePrice / 2; // Assuming 2 hours base
    return basePrice + (hourlyRate * (duration - 2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.date || !formData.time || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Mock booking submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const bookingId = Math.random().toString(36).substr(2, 9);
      toast.success('Booking created successfully!');
      navigate(`/payment/${bookingId}`);
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h1>Book Service</h1>
        </div>

        <div className="booking-layout">
          {/* Left Column - Booking Form */}
          <div className="booking-form-section">
            <div className="service-summary">
              <h3>{service.title}</h3>
              <div className="service-meta">
                <span className="provider">
                  <FaUser /> {service.provider}
                </span>
                <span className="price">
                  ${service.price}/{service.unit}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              {/* Date Selection */}
              <div className="form-section">
                <h3>
                  <FaCalendarAlt /> Select Date & Time
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Booking Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-control"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time Slot *</label>
                  <div className="time-slots">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        className={`time-slot ${formData.time === slot ? 'selected' : ''}`}
                        onClick={() => setFormData({...formData, time: slot})}
                      >
                        <FaClock /> {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Duration (hours)</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                    <option value="5">5+ hours</option>
                  </select>
                </div>
              </div>

              {/* Address Details */}
              <div className="form-section">
                <h3>
                  <FaMapMarkerAlt /> Service Location
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Full Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Number *</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="form-section">
                <h3>Additional Information</h3>
                <div className="form-group">
                  <label className="form-label">Special Instructions</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Any special requirements or notes for the service provider..."
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Proceed to Payment
              </button>
            </form>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="booking-summary">
            <div className="summary-card">
              <h3>Booking Summary</h3>
              
              <div className="summary-item">
                <span>Service</span>
                <span>{service.title}</span>
              </div>
              
              <div className="summary-item">
                <span>Provider</span>
                <span>{service.provider}</span>
              </div>
              
              <div className="summary-item">
                <span>Base Price</span>
                <span>${service.price}</span>
              </div>
              
              {parseInt(formData.duration) > 2 && (
                <div className="summary-item">
                  <span>Additional Hours ({formData.duration - 2} x ${(service.price / 2).toFixed(2)})</span>
                  <span>${((service.price / 2) * (formData.duration - 2)).toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-item total">
                <span>Total Amount</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>

              <div className="payment-info">
                <FaCreditCard />
                <p>Secure payment processed through Stripe</p>
              </div>
            </div>

            <div className="booking-policies">
              <h4>Booking Policies</h4>
              <ul>
                <li>Free cancellation up to 24 hours before service</li>
                <li>Reschedule anytime at no extra cost</li>
                <li>100% satisfaction guarantee</li>
                <li>Professional and verified service providers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .booking-page {
          padding: 40px 0;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .booking-header {
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

        .booking-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
        }

        .service-summary {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .service-summary h3 {
          margin-bottom: 10px;
          color: var(--dark);
        }

        .service-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--gray);
        }

        .provider {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price {
          font-weight: 600;
          color: var(--primary);
        }

        .booking-form {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .form-section {
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--light-gray);
        }

        .form-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .form-section h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
          color: var(--dark);
        }

        .time-slots {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .time-slot {
          padding: 10px;
          background: var(--light-gray);
          border: 2px solid transparent;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .time-slot:hover {
          background: #e9ecef;
        }

        .time-slot.selected {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          font-size: 18px;
          margin-top: 30px;
        }

        .booking-summary {
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

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--light-gray);
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-item.total {
          font-weight: bold;
          font-size: 18px;
          color: var(--dark);
          margin-top: 10px;
          padding-top: 20px;
          border-top: 2px solid var(--light-gray);
        }

        .payment-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          padding: 15px;
          background: var(--light);
          border-radius: 5px;
          color: var(--success);
        }

        .booking-policies {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .booking-policies h4 {
          margin-bottom: 20px;
          color: var(--dark);
        }

        .booking-policies ul {
          list-style: none;
          padding: 0;
        }

        .booking-policies li {
          padding: 8px 0;
          padding-left: 25px;
          position: relative;
          color: var(--gray);
        }

        .booking-policies li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        @media (max-width: 992px) {
          .booking-layout {
            grid-template-columns: 1fr;
          }

          .booking-summary {
            position: static;
          }
        }

        @media (max-width: 576px) {
          .time-slots {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }

          .booking-form {
            padding: 20px;
          }

          .summary-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Booking;