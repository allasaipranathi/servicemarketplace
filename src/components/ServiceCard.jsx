import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUsers, FaClock, FaFire, FaTag, FaHeart } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  const discountPrice = service.discount 
    ? service.price * (1 - service.discount / 100)
    : null;

  return (
    <div className="service-card glass-card animate-fade-in-up">
      <div className="service-image">
        <img 
          src={service.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
          alt={service.title}
        />
        <div className="service-badges">
          {service.isFeatured && (
            <span className="badge featured-badge">
              <FaStar /> Featured
            </span>
          )}
          {service.popular && (
            <span className="badge popular-badge">
              <FaFire /> Popular
            </span>
          )}
          {service.discount && (
            <span className="badge discount-badge">
              <FaTag /> {service.discount}% OFF
            </span>
          )}
        </div>
        <button className="wishlist-btn">
          <FaHeart />
        </button>
      </div>
      
      <div className="service-content">
        <div className="service-header">
          <div>
            <h3 className="service-title">{service.title}</h3>
            <span className="service-category">{service.category}</span>
          </div>
          <div className="service-rating">
            <FaStar className="star-icon" />
            <span>{service.rating}</span>
            <span className="review-count">({service.reviewCount})</span>
          </div>
        </div>
        
        <p className="service-description">{service.description}</p>
        
        <div className="service-meta">
          <div className="meta-item">
            <FaUsers className="meta-icon" />
            <span>{service.provider}</span>
          </div>
          <div className="meta-item">
            <FaClock className="meta-icon" />
            <span>{service.duration}</span>
          </div>
        </div>
        
        <div className="service-footer">
          <div className="service-price">
            {discountPrice ? (
              <>
                <span className="price-discounted">${discountPrice.toFixed(2)}</span>
                <span className="price-original">${service.price}</span>
                <span className="price-unit">/{service.unit}</span>
              </>
            ) : (
              <>
                <span className="price">${service.price}</span>
                <span className="price-unit">/{service.unit}</span>
              </>
            )}
          </div>
          <Link to={`/services/${service.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>

      <style jsx>{`
        .service-card {
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .service-image {
          position: relative;
          height: 220px;
          overflow: hidden;
          border-radius: 15px 15px 0 0;
        }

        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .service-card:hover .service-image img {
          transform: scale(1.1);
        }

        .service-badges {
          position: absolute;
          top: 15px;
          left: 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
        }

        .badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
          backdrop-filter: blur(10px);
          animation: pulse 2s infinite;
        }

        .featured-badge {
          background: rgba(255, 209, 102, 0.9);
          color: var(--dark);
          border: 1px solid rgba(255, 209, 102, 0.5);
        }

        .popular-badge {
          background: rgba(239, 71, 111, 0.9);
          color: white;
          border: 1px solid rgba(239, 71, 111, 0.5);
        }

        .discount-badge {
          background: rgba(6, 214, 160, 0.9);
          color: white;
          border: 1px solid rgba(6, 214, 160, 0.5);
        }

        .wishlist-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          color: var(--danger);
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .wishlist-btn:hover {
          background: var(--danger);
          color: white;
          transform: scale(1.1);
        }

        .service-content {
          padding: 25px;
          background: white;
        }

        .service-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .service-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--dark);
          margin: 0;
          line-height: 1.3;
        }

        .service-category {
          display: inline-block;
          background: linear-gradient(135deg, #3a86ff15, #8338ec15);
          color: var(--primary);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 8px;
          border: 1px solid rgba(58, 134, 255, 0.2);
        }

        .service-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 209, 102, 0.1);
          padding: 8px 12px;
          border-radius: 20px;
          color: var(--dark);
          font-weight: 600;
        }

        .star-icon {
          color: var(--warning);
        }

        .review-count {
          color: var(--gray);
          font-weight: 400;
          font-size: 14px;
        }

        .service-description {
          color: var(--gray);
          margin-bottom: 20px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .service-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          padding: 20px 0;
          border-top: 1px solid var(--light-gray);
          border-bottom: 1px solid var(--light-gray);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray);
          font-size: 14px;
        }

        .meta-icon {
          color: var(--primary);
          font-size: 16px;
        }

        .service-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .service-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .price {
          font-size: 28px;
          font-weight: 800;
          color: var(--primary);
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .price-discounted {
          font-size: 28px;
          font-weight: 800;
          color: var(--success);
        }

        .price-original {
          font-size: 18px;
          color: var(--gray);
          text-decoration: line-through;
          font-weight: 500;
        }

        .price-unit {
          color: var(--gray);
          font-size: 16px;
          font-weight: 500;
        }

        .service-footer .btn {
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
        }

        @media (max-width: 576px) {
          .service-footer {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
          
          .service-footer .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceCard;