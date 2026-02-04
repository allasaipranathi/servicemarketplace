import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import Loader from '../components/Loader';
import { FaFilter, FaSort, FaSearch, FaFire, FaTag, FaClock } from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Services', count: 85 },
    { id: 'home', name: 'Home Services', count: 25 },
    { id: 'tech', name: 'Technology', count: 18 },
    { id: 'health', name: 'Health & Wellness', count: 15 },
    { id: 'education', name: 'Education', count: 12 },
    { id: 'beauty', name: 'Beauty', count: 10 },
    { id: 'fitness', name: 'Fitness', count: 8 },
    { id: 'business', name: 'Business', count: 7 }
  ];

  useEffect(() => {
    // Enhanced mock data with more services
    const mockServices = [
      {
        id: 1,
        title: 'Professional Home Cleaning',
        description: 'Deep cleaning for your entire house with eco-friendly products.',
        price: 89,
        unit: 'session',
        rating: 4.8,
        reviewCount: 125,
        provider: 'CleanPro',
        duration: '2-3 hours',
        category: 'home',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        popular: true,
        discount: 20
      },
      {
        id: 2,
        title: 'Web Development',
        description: 'Custom website development with React, Node.js, and modern frameworks.',
        price: 1500,
        unit: 'project',
        rating: 4.9,
        reviewCount: 89,
        provider: 'TechDev Inc',
        duration: '2-4 weeks',
        category: 'tech',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        featured: true
      },
      {
        id: 3,
        title: 'Personal Yoga Training',
        description: 'One-on-one yoga sessions for mindfulness and flexibility.',
        price: 60,
        unit: 'hour',
        rating: 4.7,
        reviewCount: 67,
        provider: 'ZenYoga Studio',
        duration: '1 hour',
        category: 'health',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        popular: true
      },
      {
        id: 4,
        title: 'Math Tutoring',
        description: 'Expert math tutoring for students of all levels.',
        price: 40,
        unit: 'hour',
        rating: 4.9,
        reviewCount: 45,
        provider: 'EduTutors',
        duration: '1 hour',
        category: 'education',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 5,
        title: 'Hair Styling & Salon',
        description: 'Professional hair styling, coloring, and beauty services.',
        price: 75,
        unit: 'session',
        rating: 4.6,
        reviewCount: 89,
        provider: 'StyleSalon',
        duration: '1-2 hours',
        category: 'beauty',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 15
      },
      {
        id: 6,
        title: 'Personal Training',
        description: 'Custom fitness training programs and nutrition guidance.',
        price: 70,
        unit: 'session',
        rating: 4.8,
        reviewCount: 112,
        provider: 'FitPro',
        duration: '1 hour',
        category: 'fitness',
        image: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        popular: true
      },
      {
        id: 7,
        title: 'AC Repair & Service',
        description: 'Professional AC installation, repair and maintenance.',
        price: 120,
        unit: 'service',
        rating: 4.5,
        reviewCount: 89,
        provider: 'CoolAir Pros',
        duration: '1-2 hours',
        category: 'home',
        image: 'https://images.unsplash.com/photo-1566110980915-b03de4e1c0b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 8,
        title: 'Graphic Design',
        description: 'Logo design, branding, and marketing materials.',
        price: 299,
        unit: 'project',
        rating: 4.6,
        reviewCount: 54,
        provider: 'DesignMasters',
        duration: '3-5 days',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 9,
        title: 'Car Wash & Detailing',
        description: 'Premium car wash and interior detailing service.',
        price: 45,
        unit: 'service',
        rating: 4.7,
        reviewCount: 78,
        provider: 'AutoShine',
        duration: '1 hour',
        category: 'auto',
        image: 'https://images.unsplash.com/photo-1565689221354-d87f85d4aee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 10
      },
      {
        id: 10,
        title: 'Photography',
        description: 'Professional photography for events, portraits, and products.',
        price: 200,
        unit: 'session',
        rating: 4.8,
        reviewCount: 63,
        provider: 'PhotoArt Studio',
        duration: '2-3 hours',
        category: 'creative',
        image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 11,
        title: 'Plumbing Services',
        description: 'Emergency plumbing repair and installation services.',
        price: 85,
        unit: 'hour',
        rating: 4.4,
        reviewCount: 92,
        provider: 'QuickPlumb',
        duration: '1-3 hours',
        category: 'home',
        image: 'https://images.unsplash.com/photo-1621967299229-c6e7085a7e3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 12,
        title: 'Business Consulting',
        description: 'Strategic business consulting and planning services.',
        price: 150,
        unit: 'hour',
        rating: 4.9,
        reviewCount: 41,
        provider: 'BusinessPro',
        duration: 'Flexible',
        category: 'business',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
      
    ];

    setTimeout(() => {
      setServices(mockServices);
      setFilteredServices(mockServices);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let result = [...services];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(service =>
        service.category === categoryFilter
      );
    }

    // Sort services
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => (b.popular || false) - (a.popular || false));
        break;
      default:
        // Default sorting - featured first
        result.sort((a, b) => (b.featured || false) - (a.featured || false));
        break;
    }

    setFilteredServices(result);
  }, [services, searchTerm, categoryFilter, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="services-page" style={{
      background: 'linear-gradient(180deg, #f5f7fa 0%, #ffffff 50%, #f5f7fa 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        {/* Hero Section */}
        <div className="page-hero" style={{
          backgroundImage: `linear-gradient(rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.9)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          marginBottom: '40px'
        }}>
          <div className="hero-content">
            <h1 className="page-title">Discover Amazing Services</h1>
            <p className="page-subtitle">
              Book professional services for every need. Quality guaranteed.
            </p>
            <div className="hero-search">
              <div className="search-box-large">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for services, professionals, or categories..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                <button className="search-btn-large">
                  <FaSearch /> Find Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="stats-banner glass-card">
          <div className="stat-item">
            <h3>85+</h3>
            <p>Services</p>
          </div>
          <div className="stat-item">
            <h3>200+</h3>
            <p>Professionals</p>
          </div>
          <div className="stat-item">
            <h3>4.8/5</h3>
            <p>Avg Rating</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="filters-section glass-card">
          <div className="filter-header">
            <h3>
              <FaFilter /> Filter Services
            </h3>
            <div className="filter-badges">
              {categoryFilter !== 'all' && (
                <span className="active-filter">
                  {categories.find(c => c.id === categoryFilter)?.name}
                  <button onClick={() => setCategoryFilter('all')}>×</button>
                </span>
              )}
              {searchTerm && (
                <span className="active-filter">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}>×</button>
                </span>
              )}
            </div>
          </div>

          <div className="filter-controls">
            <div className="sort-controls">
              <div className="sort-dropdown">
                <FaSort />
                <select value={sortBy} onChange={handleSortChange}>
                  <option value="default">Sort By: Recommended</option>
                  <option value="popular">Popular First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> {showFilters ? 'Hide Categories' : 'Show Categories'}
              </button>
            </div>

            {/* Quick Filters */}
            <div className="quick-filters">
              <button 
                className={`quick-filter ${sortBy === 'popular' ? 'active' : ''}`}
                onClick={() => setSortBy('popular')}
              >
                <FaFire /> Popular
              </button>
              <button 
                className={`quick-filter ${categoryFilter === 'home' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('home')}
              >
                <FaTag /> Home Services
              </button>
              <button 
                className={`quick-filter ${sortBy === 'rating' ? 'active' : ''}`}
                onClick={() => setSortBy('rating')}
              >
                <FaClock /> Top Rated
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className={`category-filters ${showFilters ? 'show' : ''}`}>
            <div className="categories">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${categoryFilter === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="no-results glass-card">
            <div className="no-results-content">
              <h3>No services found</h3>
              <p>Try adjusting your search or filters</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setSortBy('default');
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="services-grid">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Results Info */}
            <div className="results-info glass-card">
              <p>
                Showing <strong>{filteredServices.length}</strong> of <strong>{services.length}</strong> services
                {categoryFilter !== 'all' && ` in ${categories.find(c => c.id === categoryFilter)?.name}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
              <div className="results-actions">
                <button className="btn btn-outline">
                  Load More Services
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .services-page {
          padding: 40px 0 80px;
        }

        .page-hero {
          color: white;
          padding: 60px 40px;
          text-align: center;
          margin-top: 20px;
        }

        .page-title {
          font-size: 48px;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .page-subtitle {
          font-size: 20px;
          opacity: 0.9;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-box-large {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .search-input {
          flex: 1;
          padding: 18px 25px;
          background: transparent;
          border: none;
          color: white;
          font-size: 18px;
          outline: none;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .search-btn-large {
          padding: 18px 40px;
          background: white;
          color: var(--primary);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .search-btn-large:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
        }

        .stats-banner {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          padding: 40px;
          margin-bottom: 40px;
          text-align: center;
        }

        .stat-item h3 {
          font-size: 36px;
          color: var(--primary);
          margin-bottom: 10px;
          font-weight: 700;
        }

        .stat-item p {
          color: var(--gray);
          font-size: 16px;
        }

        .filters-section {
          padding: 30px;
          margin-bottom: 40px;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .filter-header h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--dark);
        }

        .filter-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .active-filter {
          background: var(--primary);
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .active-filter button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 18px;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .active-filter button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .filter-controls {
          margin-bottom: 20px;
        }

        .sort-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .sort-dropdown {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .sort-dropdown select {
          padding: 12px 20px;
          border: 2px solid var(--light-gray);
          border-radius: 10px;
          background: white;
          font-size: 16px;
          font-weight: 500;
          min-width: 250px;
          cursor: pointer;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--light-gray);
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .filter-toggle:hover {
          background: #e9ecef;
          transform: translateY(-2px);
        }

        .quick-filters {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .quick-filter {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--light-gray);
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .quick-filter:hover {
          background: #e9ecef;
          transform: translateY(-2px);
        }

        .quick-filter.active {
          background: var(--primary);
          color: white;
        }

        .category-filters {
          display: none;
          padding-top: 30px;
          border-top: 1px solid var(--light-gray);
        }

        .category-filters.show {
          display: block;
          animation: fadeInUp 0.3s ease-out;
        }

        .categories {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }

        .category-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: var(--light-gray);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .category-btn:hover {
          background: #e9ecef;
          transform: translateY(-2px);
        }

        .category-btn.active {
          background: var(--primary);
          color: white;
        }

        .category-name {
          font-weight: 500;
        }

        .category-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .no-results {
          padding: 80px 40px;
          text-align: center;
        }

        .no-results-content h3 {
          font-size: 32px;
          margin-bottom: 16px;
          color: var(--dark);
        }

        .no-results-content p {
          color: var(--gray);
          margin-bottom: 30px;
          font-size: 18px;
        }

        .results-info {
          padding: 30px;
          text-align: center;
          margin-top: 40px;
        }

        .results-info p {
          font-size: 18px;
          color: var(--gray);
          margin-bottom: 20px;
        }

        .results-info strong {
          color: var(--dark);
        }

        .results-actions {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .page-hero {
            padding: 40px 20px;
          }

          .page-title {
            font-size: 36px;
          }

          .search-box-large {
            flex-direction: column;
            gap: 15px;
            background: transparent;
          }

          .search-input {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }

          .search-btn-large {
            width: 100%;
            justify-content: center;
          }

          .filter-header {
            flex-direction: column;
            align-items: stretch;
          }

          .sort-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .sort-dropdown select {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .stats-banner {
            grid-template-columns: 1fr;
            padding: 30px 20px;
          }

          .categories {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;