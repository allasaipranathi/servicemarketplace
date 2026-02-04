import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { 
  FaSearch, 
  FaArrowRight, 
  FaClock, 
  FaStar,
  FaHeart,
  FaUsers,
  FaAward,
  FaCheckCircle,
  FaPlayCircle,
  FaHandshake,
  FaLock,
  FaSmile,
  FaThumbsUp
} from 'react-icons/fa';
import {  GiHouse,  GiSparkles } from 'react-icons/gi';
import { MdComputer, MdHealthAndSafety, MdDesignServices, MdVerifiedUser } from 'react-icons/md';
import { TbDeviceAnalytics, TbCar,  TbCamera, TbSparkles } from 'react-icons/tb';
import { RiCustomerService2Line, RiLeafLine } from 'react-icons/ri';

const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Categorized services data (same as before)
    const categorizedServices = {
      home: [
        {
          id: 1,
          title: 'Home Cleaning',
          description: 'Professional home cleaning with eco-friendly products. Deep cleaning for your entire house.',
          price: 89,
          unit: 'session',
          rating: 4.8,
          reviewCount: 125,
          provider: 'CleanPro',
          duration: '2-3 hours',
          category: 'home',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          popular: true
        },
        {
          id: 7,
          title: 'AC Repair & Service',
          description: 'Professional AC installation, repair and maintenance services.',
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
        }
      ],
      tech: [
        {
          id: 2,
          title: 'Web Development',
          description: 'Custom website development with modern frameworks and responsive design.',
          price: 1500,
          unit: 'project',
          rating: 4.9,
          reviewCount: 89,
          provider: 'TechDev Inc',
          duration: '2-4 weeks',
          category: 'tech',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          popular: true
        },
        {
          id: 21,
          title: 'Mobile App Development',
          description: 'iOS and Android app development with native or cross-platform solutions.',
          price: 2000,
          unit: 'project',
          rating: 4.8,
          reviewCount: 67,
          provider: 'AppCrafters',
          duration: '4-6 weeks',
          category: 'tech',
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 22,
          title: 'IT Support',
          description: '24/7 IT support and troubleshooting for businesses and individuals.',
          price: 75,
          unit: 'hour',
          rating: 4.7,
          reviewCount: 45,
          provider: 'TechSupport Pro',
          duration: '1 hour',
          category: 'tech',
          image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      health: [
        {
          id: 3,
          title: 'Personal Yoga Training',
          description: 'Personalized yoga sessions for mindfulness and fitness goals.',
          price: 60,
          unit: 'hour',
          rating: 4.7,
          reviewCount: 67,
          provider: 'ZenYoga Studio',
          duration: '1 hour',
          category: 'health',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 23,
          title: 'Nutrition Counseling',
          description: 'Personalized diet plans and nutrition advice from certified experts.',
          price: 80,
          unit: 'session',
          rating: 4.6,
          reviewCount: 38,
          provider: 'NutriWell',
          duration: '1 hour',
          category: 'health',
          image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 24,
          title: 'Physical Therapy',
          description: 'Professional physical therapy sessions for recovery and mobility.',
          price: 95,
          unit: 'session',
          rating: 4.8,
          reviewCount: 56,
          provider: 'PhysioCare',
          duration: '1 hour',
          category: 'health',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      education: [
        {
          id: 25,
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
          id: 26,
          title: 'Language Classes',
          description: 'Learn new languages with certified native speakers.',
          price: 35,
          unit: 'hour',
          rating: 4.7,
          reviewCount: 89,
          provider: 'LinguaLearn',
          duration: '1 hour',
          category: 'education',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 27,
          title: 'Music Lessons',
          description: 'Learn piano, guitar, or vocals with experienced instructors.',
          price: 50,
          unit: 'hour',
          rating: 4.8,
          reviewCount: 67,
          provider: 'Melody Masters',
          duration: '1 hour',
          category: 'education',
          image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      design: [
        {
          id: 4,
          title: 'Graphic Design',
          description: 'Creative logo design, branding, and marketing materials.',
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
          id: 28,
          title: 'UI/UX Design',
          description: 'User interface and experience design for websites and apps.',
          price: 450,
          unit: 'project',
          rating: 4.9,
          reviewCount: 42,
          provider: 'UXperts',
          duration: '1-2 weeks',
          category: 'design',
          image: 'https://images.unsplash.com/photo-1561070791-4c9b95a9e2a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 29,
          title: '3D Modeling',
          description: '3D modeling and rendering for products and architecture.',
          price: 600,
          unit: 'project',
          rating: 4.7,
          reviewCount: 31,
          provider: '3D Vision',
          duration: '2-3 weeks',
          category: 'design',
          image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      fitness: [
        {
          id: 6,
          title: 'Personal Training',
          description: 'Custom fitness programs and one-on-one training sessions.',
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
          id: 30,
          title: 'Group Fitness Classes',
          description: 'High-energy group fitness sessions for all levels.',
          price: 25,
          unit: 'class',
          rating: 4.6,
          reviewCount: 89,
          provider: 'FitGroup',
          duration: '1 hour',
          category: 'fitness',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 31,
          title: 'Sports Coaching',
          description: 'Professional coaching for tennis, basketball, and more.',
          price: 65,
          unit: 'hour',
          rating: 4.8,
          reviewCount: 54,
          provider: 'SportPros',
          duration: '1 hour',
          category: 'fitness',
          image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      business: [
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
        },
        {
          id: 32,
          title: 'Digital Marketing',
          description: 'SEO, social media, and online marketing strategies.',
          price: 1200,
          unit: 'month',
          rating: 4.7,
          reviewCount: 67,
          provider: 'MarketGrow',
          duration: 'Ongoing',
          category: 'business',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 33,
          title: 'Accounting Services',
          description: 'Professional bookkeeping and tax preparation.',
          price: 100,
          unit: 'hour',
          rating: 4.8,
          reviewCount: 89,
          provider: 'AccountPro',
          duration: 'Flexible',
          category: 'business',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      beauty: [
        {
          id: 34,
          title: 'Hair Styling & Salon',
          description: 'Professional hair styling, coloring, and beauty services.',
          price: 75,
          unit: 'session',
          rating: 4.6,
          reviewCount: 89,
          provider: 'StyleSalon',
          duration: '1-2 hours',
          category: 'beauty',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 35,
          title: 'Makeup Artist',
          description: 'Professional makeup services for events and photoshoots.',
          price: 120,
          unit: 'session',
          rating: 4.8,
          reviewCount: 56,
          provider: 'Glamour Studio',
          duration: '1-2 hours',
          category: 'beauty',
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 36,
          title: 'Skincare Treatments',
          description: 'Professional facials and skincare treatments.',
          price: 90,
          unit: 'session',
          rating: 4.7,
          reviewCount: 78,
          provider: 'SkinCare Pro',
          duration: '1 hour',
          category: 'beauty',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      auto: [
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
          image: 'https://images.unsplash.com/photo-1565689221354-d87f85d4aee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 37,
          title: 'Car Repair',
          description: 'Professional auto repair and maintenance services.',
          price: 150,
          unit: 'service',
          rating: 4.5,
          reviewCount: 112,
          provider: 'AutoCare',
          duration: '2-4 hours',
          category: 'auto',
          image: 'https://images.unsplash.com/photo-1551524165-6b6e5a6166f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 38,
          title: 'Driving Lessons',
          description: 'Professional driving instruction for all levels.',
          price: 60,
          unit: 'hour',
          rating: 4.8,
          reviewCount: 45,
          provider: 'SafeDrive Academy',
          duration: '1 hour',
          category: 'auto',
          image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ],
      creative: [
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
          id: 39,
          title: 'Video Editing',
          description: 'Professional video editing and production services.',
          price: 75,
          unit: 'hour',
          rating: 4.7,
          reviewCount: 34,
          provider: 'EditPro',
          duration: 'Flexible',
          category: 'creative',
          image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 40,
          title: 'Content Writing',
          description: 'Professional content writing for blogs, websites, and marketing.',
          price: 50,
          unit: 'article',
          rating: 4.6,
          reviewCount: 89,
          provider: 'WriteWell',
          duration: '1-3 days',
          category: 'creative',
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ]
    };

    const mockCategories = [
      { 
        id: 1, 
        name: 'Home Services', 
        icon: <GiHouse />, 
        count: 25, 
        color: '#3a86ff',
        gradient: 'linear-gradient(135deg, #3a86ff, #4cc9f0)',
        services: categorizedServices.home
      },
      { 
        id: 2, 
        name: 'Technology', 
        icon: <MdComputer />, 
        count: 32, 
        color: '#8338ec',
        gradient: 'linear-gradient(135deg, #8338ec, #7209b7)',
        services: categorizedServices.tech
      },
      { 
        id: 3, 
        name: 'Health & Wellness', 
        icon: <MdHealthAndSafety />, 
        count: 28, 
        color: '#06d6a0',
        gradient: 'linear-gradient(135deg, #06d6a0, #38f9d7)',
        services: categorizedServices.health
      },
      { 
        id: 4, 
        name: 'Education', 
        icon: <FaPlayCircle />, 
        count: 24, 
        color: '#ffd166',
        gradient: 'linear-gradient(135deg, #ffd166, #ffb347)',
        services: categorizedServices.education
      },
      { 
        id: 5, 
        name: 'Business', 
        icon: <TbDeviceAnalytics />, 
        count: 36, 
        color: '#ef476f',
        gradient: 'linear-gradient(135deg, #ef476f, #ff8fa3)',
        services: categorizedServices.business
      },
      { 
        id: 6, 
        name: 'Design', 
        icon: <FaHeart />, 
        count: 19, 
        color: '#118ab2',
        gradient: 'linear-gradient(135deg, #118ab2, #06d6a0)',
        services: categorizedServices.design
      },
      { 
        id: 7, 
        name: 'Fitness', 
        icon: <RiCustomerService2Line />, 
        count: 15, 
        color: '#7209b7',
        gradient: 'linear-gradient(135deg, #7209b7, #8338ec)',
        services: categorizedServices.fitness
      },
      { 
        id: 8, 
        name: 'Beauty', 
        icon: <MdDesignServices />, 
        count: 22, 
        color: '#f72585',
        gradient: 'linear-gradient(135deg, #f72585, #ff8fa3)',
        services: categorizedServices.beauty
      },
      { 
        id: 9, 
        name: 'Automotive', 
        icon: <TbCar />, 
        count: 18, 
        color: '#4cc9f0',
        gradient: 'linear-gradient(135deg, #4cc9f0, #3a86ff)',
        services: categorizedServices.auto
      },
      { 
        id: 10, 
        name: 'Creative', 
        icon: <TbCamera />, 
        count: 27, 
        color: '#4361ee',
        gradient: 'linear-gradient(135deg, #4361ee, #3a86ff)',
        services: categorizedServices.creative
      }
    ];

    // Featured services
    const featured = [
      categorizedServices.home[0],
      categorizedServices.tech[0],
      categorizedServices.health[0],
      categorizedServices.design[0],
      categorizedServices.fitness[0],
      categorizedServices.auto[0]
    ];

    setTimeout(() => {
      setFeaturedServices(featured);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <GiSparkles /> Trusted by 10,000+ Customers
            </div>
            <h1 className="hero-title">
              Find & Book <span className="gradient-text">Professional Services</span> Near You
            </h1>
            <p className="hero-subtitle">
              From home cleaning to web development, find the perfect professional 
              for any task. Quality guaranteed, satisfaction assured.
            </p>
            <div className="hero-search">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="What service are you looking for today?" 
                  className="search-input"
                />
                <button className="search-btn">
                  <FaSearch /> Find Services
                </button>
              </div>
              <div className="search-tags">
                <span>Trending:</span>
                <button className="tag">
                  <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" alt="Cleaning" />
                  Cleaning
                </button>
                <button className="tag">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" alt="Web Dev" />
                  Web Development
                </button>
                <button className="tag">
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" alt="Yoga" />
                  Yoga Training
                </button>
                <button className="tag">
                  <img src="https://images.unsplash.com/photo-1621967299229-c6e7085a7e3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" alt="Plumbing" />
                  Plumbing
                </button>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <div>
                  <h3>200+</h3>
                  <p>Services</p>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <FaSmile />
                </div>
                <div>
                  <h3>10K+</h3>
                  <p>Happy Customers</p>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <FaAward />
                </div>
                <div>
                  <h3>500+</h3>
                  <p>Professionals</p>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <FaStar />
                </div>
                <div>
                  <h3>4.8/5</h3>
                  <p>Avg Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find services in your area of interest</p>
          </div>
          
          <div className="categories-grid">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="category-card"
                style={{ 
                  background: `linear-gradient(135deg, ${category.color}15, ${category.color}05)`,
                  borderTop: `4px solid ${category.color}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="category-bg" style={{ background: category.gradient }}></div>
                <div className="category-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
                <p>{category.count} Services Available</p>
                
                <div className="category-services-preview">
                  {category.services && category.services.slice(0, 2).map(service => (
                    <div key={service.id} className="service-preview-item">
                      <div className="service-preview-icon" style={{ background: category.gradient }}>
                        {category.icon}
                      </div>
                      <div className="service-preview-info">
                        <span className="service-preview-title">{service.title}</span>
                        <span className="service-preview-price">${service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to={`/services?category=${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} 
                  className="category-link"
                  style={{ background: category.gradient }}
                >
                  Browse All <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured-services">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Services</h2>
              <p className="section-subtitle">Most booked services this month</p>
            </div>
            <Link to="/services" className="btn-outline">
              View All Services <FaArrowRight />
            </Link>
          </div>
          
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading amazing services...</p>
            </div>
          ) : (
            <div className="services-grid">
              {featuredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose ServiceHub */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose <span className="highlight">ServiceHub</span>?
            </h2>
            <p className="section-subtitle">
              We make booking services simple, secure, and reliable
            </p>
          </div>
          
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="icon-container" style={{ background: 'linear-gradient(135deg, #3a86ff, #8338ec)' }}>
                <MdVerifiedUser />
              </div>
              <h3>Verified Professionals</h3>
              <p>Every service provider is background checked, certified, and reviewed.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="icon-container" style={{ background: 'linear-gradient(135deg, #06d6a0, #38f9d7)' }}>
                <FaClock />
              </div>
              <h3>Quick Booking</h3>
              <p>Book services in minutes with our intuitive platform. Instant confirmation.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="icon-container" style={{ background: 'linear-gradient(135deg, #ffd166, #ffb347)' }}>
                <FaThumbsUp />
              </div>
              <h3>Quality Guaranteed</h3>
              <p>100% satisfaction guarantee or your money back. We stand by our services.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="icon-container" style={{ background: 'linear-gradient(135deg, #ef476f, #ff8fa3)' }}>
                <FaLock />
              </div>
              <h3>Secure Payments</h3>
              <p>Your payments are protected. Pay only when service is completed.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="icon-container" style={{ background: 'linear-gradient(135deg, #118ab2, #06d6a0)' }}>
                <RiLeafLine />
              </div>
              <h3>Eco-Friendly Options</h3>
              <p>Choose eco-friendly services that care for your health and environment.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="icon-container" style={{ background: 'linear-gradient(135deg, #8338ec, #3a86ff)' }}>
                <FaHandshake />
              </div>
              <h3>Customer First</h3>
              <p>Our 24/7 support team is always ready to help with any questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our <span className="highlight">Customers Say</span></h2>
            <p className="section-subtitle">Join thousands of satisfied customers</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <div className="stars">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "ServiceHub made finding a reliable web developer so easy! The platform is intuitive and the professionals are top-notch."
              </p>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" />
                <div>
                  <h4>Michael Chen</h4>
                  <div className="stars">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "Excellent service! The home cleaning team was professional, thorough, and used eco-friendly products."
              </p>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" />
                <div>
                  <h4>Jessica Williams</h4>
                  <div className="stars">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaCheckCircle />
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "I found the perfect yoga instructor through ServiceHub. The booking process was seamless and the service was exceptional."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Life?</h2>
            <p>Join thousands of satisfied customers who trust ServiceHub for all their service needs.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">
                <TbSparkles /> Sign Up Free
              </Link>
              <Link to="/services" className="btn-white">
                Browse Services
              </Link>
            </div>
            <div className="cta-features">
              <span><FaCheckCircle /> No credit card required</span>
              <span><FaCheckCircle /> Cancel anytime</span>
              <span><FaCheckCircle /> 30-day money back</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home {
          overflow: hidden;
        }

        /* Hero Section */
        .hero {
          color: white;
          padding: 120px 0 80px;
          text-align: center;
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95)),
                    url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-blend-mode: overlay;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 30px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(58, 134, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(58, 134, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(58, 134, 255, 0); }
        }

        .hero-title {
          font-size: 64px;
          margin-bottom: 24px;
          font-weight: 800;
          line-height: 1.2;
          background: linear-gradient(135deg, #ffffff 0%, #3a86ff 50%, #8338ec 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-text {
          background: linear-gradient(135deg, #3a86ff 0%, #8338ec 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 22px;
          margin-bottom: 48px;
          opacity: 0.9;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .search-wrapper {
          max-width: 700px;
          margin: 0 auto 40px;
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 60px;
          padding: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .search-icon {
          color: white;
          margin-left: 20px;
          font-size: 20px;
          opacity: 0.8;
        }

        .search-input {
          flex: 1;
          padding: 20px;
          background: transparent;
          border: none;
          color: white;
          font-size: 18px;
          outline: none;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .search-btn {
          padding: 18px 40px;
          background: linear-gradient(135deg, #3a86ff, #8338ec);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(58, 134, 255, 0.3);
        }

        .search-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(58, 134, 255, 0.4);
        }

        .search-tags {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .search-tags span {
          opacity: 0.8;
          font-size: 14px;
        }

        .tag {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tag img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          object-fit: cover;
        }

        .tag:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-top: 80px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 15px;
          justify-content: center;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #3a86ff;
        }

        .stat h3 {
          font-size: 42px;
          margin-bottom: 5px;
          font-weight: 700;
          background: linear-gradient(to right, #fff, #3a86ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat p {
          opacity: 0.8;
          font-size: 16px;
        }

        .hero-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .hero-wave svg {
          width: 100%;
          height: 80px;
          fill: #f8fafc;
        }

        /* Categories Section */
        .categories-section {
          padding: 100px 0;
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 48px;
          color: #1a1a2e;
          margin-bottom: 16px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a1a2e 0%, #3a86ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          color: #64748b;
          font-size: 20px;
          max-width: 600px;
          margin: 0 auto;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .category-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .category-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
        }

        .category-card:hover .category-bg {
          opacity: 1;
        }

        .category-icon {
          font-size: 48px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .category-card h3 {
          margin-bottom: 10px;
          color: #1a1a2e;
          font-size: 24px;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .category-card p {
          color: #64748b;
          margin-bottom: 20px;
          font-size: 14px;
          position: relative;
          z-index: 1;
        }

        .category-services-preview {
          margin: 20px 0;
          flex-grow: 1;
          position: relative;
          z-index: 1;
        }

        .service-preview-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 12px;
          margin-bottom: 8px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .service-preview-item:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: translateX(5px);
        }

        .service-preview-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
        }

        .service-preview-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .service-preview-title {
          font-size: 14px;
          font-weight: 500;
          color: #1a1a2e;
        }

        .service-preview-price {
          font-size: 14px;
          font-weight: 600;
          color: #3a86ff;
        }

        .category-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          margin-top: auto;
          padding: 12px;
          border-radius: 10px;
          position: relative;
          z-index: 1;
        }

        .category-link:hover {
          gap: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        /* Featured Services */
        .featured-services {
          padding: 120px 0;
          position: relative;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98)),
                    url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-blend-mode: overlay;
        }

        .featured-services .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          margin-bottom: 60px;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #3a86ff;
          color: #3a86ff;
          padding: 12px 28px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: #3a86ff;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(58, 134, 255, 0.2);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 1;
        }

        /* Why Choose Section */
        .why-choose-section {
          padding: 100px 0;
          position: relative;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        }

        .highlight {
          color: #3a86ff;
          font-weight: 800;
        }

        .why-choose-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .why-choose-card {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
        }

        .why-choose-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(135deg, #3a86ff 0%, #8338ec 100%);
        }

        .why-choose-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .icon-container {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 40px;
          margin: 0 auto 25px;
          position: relative;
        }

        .icon-container::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          opacity: 0.1;
          background: inherit;
        }

        .icon-container::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
          border-radius: 50%;
          opacity: 0.05;
          background: inherit;
        }

        .why-choose-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 15px;
        }

        .why-choose-card p {
          color: #64748b;
          line-height: 1.6;
          font-size: 16px;
        }

        /* Testimonials */
        .testimonials {
          color: white;
          padding: 120px 0;
          position: relative;
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95)),
                    url('https://images.unsplash.com/photo-1551836026-d5c2c7674e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-blend-mode: overlay;
        }

        .testimonials .section-title {
          color: white;
          background: linear-gradient(135deg, #ffffff 0%, #3a86ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .testimonials .section-subtitle {
          color: rgba(255, 255, 255, 0.8);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .testimonial-header img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .testimonial-header h4 {
          color: white;
          margin-bottom: 5px;
          font-size: 18px;
        }

        .stars {
          color: #ffd166;
          display: flex;
          gap: 5px;
        }

        .testimonial-text {
          color: rgba(255, 255, 255, 0.9);
          font-style: italic;
          line-height: 1.6;
          font-size: 16px;
        }

        /* CTA Section */
        .cta-section {
          color: white;
          padding: 120px 0;
          text-align: center;
          position: relative;
          background: linear-gradient(135deg, #3a86ff 0%, #8338ec 50%, #7209b7 100%);
        }

        .cta-section h2 {
          font-size: 56px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .cta-section p {
          font-size: 22px;
          margin-bottom: 40px;
          opacity: 0.9;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 40px;
        }

        .btn-primary {
          background: white;
          color: #3a86ff;
          padding: 15px 40px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 18px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.3);
        }

        .btn-white {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 15px 40px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 18px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .btn-white:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        .cta-features {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .cta-features span {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.9;
          font-size: 16px;
        }

        .loading {
          text-align: center;
          padding: 60px;
          color: #64748b;
        }

        .loading p {
          margin-top: 20px;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #3a86ff;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 42px;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .search-wrapper {
            flex-direction: column;
            background: transparent;
            gap: 15px;
            box-shadow: none;
          }

          .search-input {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px;
            backdrop-filter: blur(10px);
          }

          .search-btn {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .stat h3 {
            font-size: 36px;
          }

          .section-title {
            font-size: 36px;
          }

          .featured-services .section-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .why-choose-grid {
            grid-template-columns: 1fr;
          }

          .cta-section h2 {
            font-size: 42px;
          }

          .cta-section p {
            font-size: 18px;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 32px;
          }

          .section-title {
            font-size: 28px;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }

          .cta-features {
            flex-direction: column;
            gap: 15px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;