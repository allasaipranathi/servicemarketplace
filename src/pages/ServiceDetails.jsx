import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaStar, 
  FaClock, 
  FaUser, 
  FaCheck, 
  FaCalendar, 
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShareAlt,
  FaUsers,
  FaHome,
  FaLaptop,
  FaHeartbeat,
  FaGraduationCap,
  FaCut,
  FaDumbbell,
  FaCar,
  FaCamera,
  FaWrench
} from 'react-icons/fa';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

// Updated mock services data with working image URLs
const mockServices = [
  {
    id: 1,
    title: 'Professional Home Cleaning',
    description: 'Deep cleaning for your entire house with eco-friendly products.',
    longDescription: 'Our professional home cleaning service provides thorough cleaning of your entire house. We use eco-friendly cleaning products that are safe for children and pets. Our trained professionals follow a detailed checklist to ensure every corner of your home is spotless.',
    price: 89,
    unit: 'session',
    rating: 4.8,
    reviewCount: 125,
    provider: 'CleanPro Services',
    duration: '2-3 hours',
    category: 'home',
    icon: <FaHome />,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'John Smith',
      experience: '5+ years',
      verified: true,
      phone: '+1 (555) 123-4567',
      email: 'john@cleanpro.com',
      location: 'New York, NY'
    },
    features: [
      'Eco-friendly products',
      'Pet-safe cleaning',
      'Deep cleaning',
      'Equipment provided',
      'Satisfaction guaranteed'
    ],
    reviews: [
      {
        id: 1,
        user: 'Sarah Johnson',
        rating: 5,
        comment: 'Excellent service! My home has never been cleaner.',
        date: '2024-01-15'
      },
      {
        id: 2,
        user: 'Mike Chen',
        rating: 4,
        comment: 'Professional and thorough. Would recommend!',
        date: '2024-01-10'
      }
    ],
    popular: true,
    discount: 20
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'Custom website development with React, Node.js, and modern frameworks.',
    longDescription: 'Our web development service creates custom, responsive websites using the latest technologies. We specialize in React, Node.js, and modern JavaScript frameworks. From simple landing pages to complex web applications, we deliver high-quality solutions.',
    price: 1500,
    unit: 'project',
    rating: 4.9,
    reviewCount: 89,
    provider: 'TechDev Inc',
    duration: '2-4 weeks',
    category: 'tech',
    icon: <FaLaptop />,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Alex Johnson',
      experience: '8+ years',
      verified: true,
      phone: '+1 (555) 234-5678',
      email: 'alex@techdev.com',
      location: 'San Francisco, CA'
    },
    features: [
      'Custom design',
      'Responsive development',
      'SEO optimization',
      'Performance focused',
      'Maintenance support'
    ],
    reviews: [
      {
        id: 1,
        user: 'Emma Wilson',
        rating: 5,
        comment: 'Amazing work! The website exceeded our expectations.',
        date: '2024-01-20'
      },
      {
        id: 2,
        user: 'David Lee',
        rating: 4,
        comment: 'Professional team, delivered on time.',
        date: '2024-01-12'
      }
    ],
    featured: true
  },
  {
    id: 3,
    title: 'Personal Yoga Training',
    description: 'One-on-one yoga sessions for mindfulness and flexibility.',
    longDescription: 'Experience personalized yoga training tailored to your needs. Our certified instructors provide one-on-one sessions focusing on mindfulness, flexibility, and strength. Suitable for all levels from beginners to advanced practitioners.',
    price: 60,
    unit: 'hour',
    rating: 4.7,
    reviewCount: 67,
    provider: 'ZenYoga Studio',
    duration: '1 hour',
    category: 'health',
    icon: <FaHeartbeat />,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Priya Sharma',
      experience: '6+ years',
      verified: true,
      phone: '+1 (555) 345-6789',
      email: 'priya@zenyoga.com',
      location: 'Los Angeles, CA'
    },
    features: [
      'Personalized sessions',
      'All levels welcome',
      'Mindfulness focus',
      'Flexibility training',
      'Stress relief'
    ],
    reviews: [
      {
        id: 1,
        user: 'Lisa Wong',
        rating: 5,
        comment: 'Transformative experience. Highly recommend!',
        date: '2024-01-18'
      },
      {
        id: 2,
        user: 'Robert Kim',
        rating: 4,
        comment: 'Great instructor, very patient and knowledgeable.',
        date: '2024-01-05'
      }
    ],
    popular: true
  },
  {
    id: 4,
    title: 'Math Tutoring',
    description: 'Expert math tutoring for students of all levels.',
    longDescription: 'Get personalized math tutoring from experienced educators. We cover all math levels from basic arithmetic to advanced calculus. Our tutors provide one-on-one attention and customized lesson plans to help students excel in mathematics.',
    price: 40,
    unit: 'hour',
    rating: 4.9,
    reviewCount: 45,
    provider: 'EduTutors',
    duration: '1 hour',
    category: 'education',
    icon: <FaGraduationCap />,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Dr. Michael Chen',
      experience: '10+ years',
      verified: true,
      phone: '+1 (555) 456-7890',
      email: 'michael@edututors.com',
      location: 'Chicago, IL'
    },
    features: [
      'All math levels',
      'Homework help',
      'Test preparation',
      'One-on-one attention',
      'Flexible scheduling'
    ],
    reviews: [
      {
        id: 1,
        user: 'Parent of Student',
        rating: 5,
        comment: 'My child\'s grades improved significantly!',
        date: '2024-01-22'
      },
      {
        id: 2,
        user: 'College Student',
        rating: 5,
        comment: 'Great tutor, very patient and knowledgeable.',
        date: '2024-01-15'
      }
    ]
  },
  {
    id: 5,
    title: 'Hair Styling & Salon',
    description: 'Professional hair styling, coloring, and beauty services.',
    longDescription: 'Experience premium hair styling and salon services. Our expert stylists provide cutting, coloring, styling, and hair treatments using high-quality products. We stay updated with the latest trends and techniques to give you the perfect look.',
    price: 75,
    unit: 'session',
    rating: 4.6,
    reviewCount: 89,
    provider: 'StyleSalon',
    duration: '1-2 hours',
    category: 'beauty',
    icon: <FaCut />,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Maria Garcia',
      experience: '7+ years',
      verified: true,
      phone: '+1 (555) 567-8901',
      email: 'maria@stylesalon.com',
      location: 'Miami, FL'
    },
    features: [
      'Expert styling',
      'Quality products',
      'Color specialist',
      'Hair treatments',
      'Consultation included'
    ],
    reviews: [
      {
        id: 1,
        user: 'Jessica Taylor',
        rating: 5,
        comment: 'Best haircut I ever had!',
        date: '2024-01-25'
      },
      {
        id: 2,
        user: 'Amanda Smith',
        rating: 4,
        comment: 'Great service, friendly staff.',
        date: '2024-01-20'
      }
    ],
    discount: 15
  },
  {
    id: 6,
    title: 'Personal Training',
    description: 'Custom fitness training programs and nutrition guidance.',
    longDescription: 'Achieve your fitness goals with personalized training programs. Our certified personal trainers create customized workout plans and provide nutrition guidance to help you build strength, lose weight, and improve overall health.',
    price: 70,
    unit: 'session',
    rating: 4.8,
    reviewCount: 112,
    provider: 'FitPro',
    duration: '1 hour',
    category: 'fitness',
    icon: <FaDumbbell />,
    // FIXED: Updated image URL for Personal Training
    image: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'James Wilson',
      experience: '8+ years',
      verified: true,
      phone: '+1 (555) 678-9012',
      email: 'james@fitpro.com',
      location: 'Austin, TX'
    },
    features: [
      'Custom workout plans',
      'Nutrition guidance',
      'Progress tracking',
      'All fitness levels',
      'Home/gym sessions'
    ],
    reviews: [
      {
        id: 1,
        user: 'Mark Davis',
        rating: 5,
        comment: 'Best trainer ever! Results in just 2 months.',
        date: '2024-01-28'
      },
      {
        id: 2,
        user: 'Sarah Miller',
        rating: 5,
        comment: 'Motivating and knowledgeable.',
        date: '2024-01-22'
      }
    ],
    popular: true
  },
  {
    id: 7,
    title: 'AC Repair & Service',
    description: 'Professional AC installation, repair and maintenance.',
    longDescription: 'Stay cool with our professional AC repair and maintenance services. We handle all types of air conditioning systems, from installation to repair and regular maintenance. Our technicians are certified and provide same-day service.',
    price: 120,
    unit: 'service',
    rating: 4.5,
    reviewCount: 89,
    provider: 'CoolAir Pros',
    duration: '1-2 hours',
    category: 'home',
    icon: <FaWrench />,
    image: 'https://images.unsplash.com/photo-1566110980915-b03de4e1c0b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Tom Anderson',
      experience: '12+ years',
      verified: true,
      phone: '+1 (555) 789-0123',
      email: 'tom@coolair.com',
      location: 'Phoenix, AZ'
    },
    features: [
      'Same-day service',
      'All AC types',
      'Emergency repair',
      'Maintenance plans',
      'Warranty included'
    ],
    reviews: [
      {
        id: 1,
        user: 'Robert Brown',
        rating: 4,
        comment: 'Quick response, fixed my AC in no time.',
        date: '2024-01-30'
      },
      {
        id: 2,
        user: 'Linda White',
        rating: 5,
        comment: 'Professional and efficient service.',
        date: '2024-01-25'
      }
    ]
  },
  {
    id: 8,
    title: 'Graphic Design',
    description: 'Logo design, branding, and marketing materials.',
    longDescription: 'Elevate your brand with professional graphic design services. We create stunning logos, branding materials, and marketing collateral that captures your brand essence and engages your audience.',
    price: 299,
    unit: 'project',
    rating: 4.6,
    reviewCount: 54,
    provider: 'DesignMasters',
    duration: '3-5 days',
    category: 'creative',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Sophia Lee',
      experience: '6+ years',
      verified: true,
      phone: '+1 (555) 890-1234',
      email: 'sophia@designmasters.com',
      location: 'Portland, OR'
    },
    features: [
      'Logo design',
      'Brand identity',
      'Marketing materials',
      'Social media graphics',
      'Unlimited revisions'
    ],
    reviews: [
      {
        id: 1,
        user: 'Startup Founder',
        rating: 5,
        comment: 'Amazing logo design! Perfect for our brand.',
        date: '2024-02-01'
      },
      {
        id: 2,
        user: 'Small Business Owner',
        rating: 4,
        comment: 'Great designs, good communication.',
        date: '2024-01-28'
      }
    ]
  },
  {
    id: 9,
    title: 'Car Wash & Detailing',
    description: 'Premium car wash and interior detailing service.',
    longDescription: 'Give your car the care it deserves with our premium car wash and detailing service. We offer exterior washing, interior deep cleaning, waxing, and polishing to keep your vehicle looking like new.',
    price: 45,
    unit: 'service',
    rating: 4.7,
    reviewCount: 78,
    provider: 'AutoShine',
    duration: '1 hour',
    category: 'auto',
    icon: <FaCar />,
    // FIXED: Updated image URL for Car Wash
    image: 'https://images.unsplash.com/photo-1565689221354-d87f85d4aee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Carlos Rodriguez',
      experience: '9+ years',
      verified: true,
      phone: '+1 (555) 901-2345',
      email: 'carlos@autoshine.com',
      location: 'Houston, TX'
    },
    features: [
      'Exterior wash',
      'Interior detailing',
      'Waxing & polishing',
      'Leather conditioning',
      'Odor elimination'
    ],
    reviews: [
      {
        id: 1,
        user: 'Car Enthusiast',
        rating: 5,
        comment: 'My car looks brand new!',
        date: '2024-02-02'
      },
      {
        id: 2,
        user: 'Busy Professional',
        rating: 4,
        comment: 'Convenient and thorough service.',
        date: '2024-01-30'
      }
    ],
    discount: 10
  },
  {
    id: 10,
    title: 'Photography',
    description: 'Professional photography for events, portraits, and products.',
    longDescription: 'Capture your special moments with professional photography services. We specialize in event photography, portrait sessions, product photography, and more. High-quality images delivered with quick turnaround.',
    price: 200,
    unit: 'session',
    rating: 4.8,
    reviewCount: 63,
    provider: 'PhotoArt Studio',
    duration: '2-3 hours',
    category: 'creative',
    icon: <FaCamera />,
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Emma Thompson',
      experience: '7+ years',
      verified: true,
      phone: '+1 (555) 012-3456',
      email: 'emma@photoart.com',
      location: 'Seattle, WA'
    },
    features: [
      'Professional equipment',
      'Multiple locations',
      'Photo editing',
      'Digital delivery',
      'Print options'
    ],
    reviews: [
      {
        id: 1,
        user: 'Wedding Couple',
        rating: 5,
        comment: 'Beautiful photos! Captured our special day perfectly.',
        date: '2024-02-03'
      },
      {
        id: 2,
        user: 'Business Owner',
        rating: 5,
        comment: 'Great product photos for our website.',
        date: '2024-01-29'
      }
    ]
  },
  {
    id: 11,
    title: 'Plumbing Services',
    description: 'Emergency plumbing repair and installation services.',
    longDescription: 'Reliable plumbing services for all your needs. From emergency repairs to new installations, our licensed plumbers handle everything with professionalism and expertise. Available 24/7 for emergencies.',
    price: 85,
    unit: 'hour',
    rating: 4.4,
    reviewCount: 92,
    provider: 'QuickPlumb',
    duration: '1-3 hours',
    category: 'home',
    icon: <FaWrench />,
    image: 'https://images.unsplash.com/photo-1621967299229-c6e7085a7e3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'Brian Wilson',
      experience: '15+ years',
      verified: true,
      phone: '+1 (555) 123-4567',
      email: 'brian@quickplumb.com',
      location: 'Denver, CO'
    },
    features: [
      '24/7 emergency service',
      'Licensed plumbers',
      'All plumbing work',
      'Upfront pricing',
      'Warranty on work'
    ],
    reviews: [
      {
        id: 1,
        user: 'Homeowner',
        rating: 4,
        comment: 'Fixed my leak quickly and efficiently.',
        date: '2024-02-04'
      },
      {
        id: 2,
        user: 'Property Manager',
        rating: 5,
        comment: 'Reliable service for our apartments.',
        date: '2024-02-01'
      }
    ]
  },
  {
    id: 12,
    title: 'Business Consulting',
    description: 'Strategic business consulting and planning services.',
    longDescription: 'Take your business to the next level with expert consulting services. We provide strategic planning, market analysis, operational improvement, and growth strategies tailored to your business needs.',
    price: 150,
    unit: 'hour',
    rating: 4.9,
    reviewCount: 41,
    provider: 'BusinessPro',
    duration: 'Flexible',
    category: 'business',
    icon: <FaUsers />,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    providerInfo: {
      name: 'David Chen',
      experience: '20+ years',
      verified: true,
      phone: '+1 (555) 234-5678',
      email: 'david@businesspro.com',
      location: 'Boston, MA'
    },
    features: [
      'Strategic planning',
      'Market analysis',
      'Financial planning',
      'Operational improvement',
      'Growth strategies'
    ],
    reviews: [
      {
        id: 1,
        user: 'Startup CEO',
        rating: 5,
        comment: 'Invaluable advice for scaling our business.',
        date: '2024-02-05'
      },
      {
        id: 2,
        user: 'Small Business Owner',
        rating: 5,
        comment: 'Helped streamline our operations.',
        date: '2024-02-02'
      }
    ]
  }
  
];

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Find the service by ID from mock data
    const foundService = mockServices.find(s => s.id === parseInt(id));
    
    setTimeout(() => {
      setService(foundService);
      setLoading(false);
      setImageError(false); // Reset image error when service changes
    }, 1000);
  }, [id]);

  const handleBookNow = () => {
    if (service) {
      navigate(`/booking/${id}`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service?.title,
        text: service?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return <Loader />;
  }

  if (!service) {
    return (
      <div style={styles.notFound}>
        <h2 style={styles.notFoundTitle}>Service not found</h2>
        <p style={styles.notFoundText}>The service you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/services')} 
          style={styles.backButton}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Browse All Services
        </button>
      </div>
    );
  }

  const fallbackImages = {
    'Personal Training': 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'Car Wash & Detailing': 'https://images.unsplash.com/photo-1565689221354-d87f85d4aee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'default': 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  };

  const imageSrc = imageError 
    ? (fallbackImages[service.title] || fallbackImages.default)
    : service.image;

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <a href="/" style={styles.breadcrumbLink}>Home</a> / 
          <a href="/services" style={styles.breadcrumbLink}> Services</a> / 
          <span style={styles.breadcrumbCurrent}> {service.title}</span>
        </div>

        <div style={styles.serviceLayout}>
          {/* Left Column - Service Info */}
          <div style={styles.serviceInfo}>
            <div style={styles.serviceHeader}>
              <div style={styles.titleSection}>
                <h1 style={styles.title}>{service.title}</h1>
                <div style={styles.serviceRating}>
                  <FaStar style={styles.starIcon} />
                  <span>{service.rating}</span>
                  <span style={styles.reviewCount}>({service.reviewCount} reviews)</span>
                  <span style={styles.categoryBadge}>
                    {service.icon} {service.category}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleShare} 
                style={styles.shareButton}
                onMouseEnter={(e) => e.target.style.background = '#e9ecef'}
                onMouseLeave={(e) => e.target.style.background = '#f8f9fa'}
              >
                <FaShareAlt /> Share
              </button>
            </div>

            <div style={styles.serviceImageContainer}>
              <img 
                src={imageSrc} 
                alt={service.title} 
                style={styles.serviceImage}
                onError={handleImageError}
                loading="lazy"
              />
              {service.popular && (
                <div style={styles.popularBadge}>
                  <FaStar /> Popular Choice
                </div>
              )}
              {service.featured && (
                <div style={styles.featuredBadge}>
                  <FaStar /> Featured
                </div>
              )}
              {service.discount && (
                <div style={styles.discountBadge}>
                  {service.discount}% OFF
                </div>
              )}
            </div>

            {/* Tabs */}
            <div style={styles.serviceTabs}>
              <button 
                onClick={() => setActiveTab('details')}
                style={activeTab === 'details' ? {...styles.tabButton, ...styles.activeTab} : styles.tabButton}
              >
                Details
              </button>
              <button 
                onClick={() => setActiveTab('provider')}
                style={activeTab === 'provider' ? {...styles.tabButton, ...styles.activeTab} : styles.tabButton}
              >
                Provider Info
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                style={activeTab === 'reviews' ? {...styles.tabButton, ...styles.activeTab} : styles.tabButton}
              >
                Reviews ({service.reviews.length})
              </button>
            </div>

            {/* Tab Content */}
            <div style={styles.tabContent}>
              {activeTab === 'details' && (
                <div>
                  <h3 style={styles.subtitle}>Service Description</h3>
                  <p style={styles.description}>{service.longDescription}</p>
                  
                  <h3 style={styles.subtitle}>What's Included</h3>
                  <ul style={styles.featuresList}>
                    {service.features.map((feature, index) => (
                      <li key={index} style={styles.featureItem}>
                        <FaCheck style={styles.checkIcon} /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'provider' && (
                <div>
                  <div style={styles.providerCard}>
                    <h3 style={styles.providerName}>{service.providerInfo.name}</h3>
                    <div style={styles.providerDetails}>
                      <div style={styles.detailItem}>
                        <FaMapMarkerAlt />
                        <span>{service.providerInfo.location}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <FaPhone />
                        <span>{service.providerInfo.phone}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <FaEnvelope />
                        <span>{service.providerInfo.email}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <FaUser />
                        <span>Experience: {service.providerInfo.experience}</span>
                      </div>
                    </div>
                    {service.providerInfo.verified && (
                      <div style={styles.verifiedBadge}>
                        <FaCheck /> Verified Professional
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {service.reviews.map(review => (
                    <div key={review.id} style={styles.reviewCard}>
                      <div style={styles.reviewHeader}>
                        <div>
                          <h4 style={styles.reviewerName}>{review.user}</h4>
                          <div style={styles.reviewRating}>
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                style={i < review.rating ? styles.filledStar : styles.emptyStar}
                              />
                            ))}
                          </div>
                        </div>
                        <span style={styles.reviewDate}>{review.date}</span>
                      </div>
                      <p style={styles.reviewComment}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div style={styles.bookingCard}>
            <div style={styles.bookingHeader}>
              <h3 style={styles.bookingTitle}>Book This Service</h3>
              <div style={styles.priceDisplay}>
                {service.discount ? (
                  <>
                    <span style={styles.discountedPrice}>
                      ${(service.price * (1 - service.discount / 100)).toFixed(2)}
                    </span>
                    <span style={styles.originalPrice}>${service.price}</span>
                  </>
                ) : (
                  <span style={styles.price}>${service.price}</span>
                )}
                <span style={styles.unit}>/{service.unit}</span>
              </div>
            </div>

            <div style={styles.bookingDetails}>
              <div style={styles.detailRow}>
                <FaClock style={styles.icon} />
                <div>
                  <span style={styles.label}>Duration</span>
                  <span style={styles.value}>{service.duration}</span>
                </div>
              </div>
              <div style={styles.detailRow}>
                <FaUser style={styles.icon} />
                <div>
                  <span style={styles.label}>Provider</span>
                  <span style={styles.value}>{service.provider}</span>
                </div>
              </div>
              <div style={styles.detailRow}>
                {service.icon}
                <div>
                  <span style={styles.label}>Category</span>
                  <span style={styles.value}>{service.category}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleBookNow}
              style={styles.bookButton}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <FaCalendar /> Book Now
            </button>

            <div style={styles.bookingFeatures}>
              <div style={styles.feature}>
                <FaCheck /> Instant Confirmation
              </div>
              <div style={styles.feature}>
                <FaCheck /> Cancel Anytime
              </div>
              <div style={styles.feature}>
                <FaCheck /> Secure Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 0',
    background: 'linear-gradient(180deg, #f5f7fa 0%, #ffffff 50%, #f5f7fa 100%)',
    minHeight: '100vh'
  },
  innerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  breadcrumb: {
    marginBottom: '30px',
    color: '#666',
    fontSize: '14px'
  },
  breadcrumbLink: {
    color: '#3a86ff',
    textDecoration: 'none',
    margin: '0 5px'
  },
  breadcrumbCurrent: {
    color: '#1a1a2e',
    fontWeight: '500',
    marginLeft: '5px'
  },
  serviceLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '40px',
    alignItems: 'flex-start'
  },
  serviceInfo: {
    flex: 1
  },
  serviceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  titleSection: {
    flex: 1,
    minWidth: '300px'
  },
  title: {
    fontSize: '36px',
    color: '#1a1a2e',
    marginBottom: '10px',
    fontWeight: '700',
    lineHeight: '1.2'
  },
  serviceRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#666',
    flexWrap: 'wrap'
  },
  starIcon: {
    color: '#ffc107'
  },
  reviewCount: {
    color: '#666',
    marginLeft: '5px'
  },
  categoryBadge: {
    background: 'linear-gradient(135deg, #3a86ff15, #8338ec15)',
    color: '#3a86ff',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    marginLeft: '10px',
    border: '1px solid rgba(58, 134, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  shareButton: {
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    color: '#495057'
  },
  serviceImageContainer: {
    width: '100%',
    marginBottom: '30px',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    position: 'relative'
  },
  serviceImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '450px',
    objectFit: 'cover',
    display: 'block',
    backgroundColor: '#f5f7fa' // Fallback background while loading
  },
  popularBadge: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    background: 'rgba(239, 71, 111, 0.9)',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    backdropFilter: 'blur(10px)',
    zIndex: 2
  },
  featuredBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'rgba(255, 209, 102, 0.9)',
    color: '#1a1a2e',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    backdropFilter: 'blur(10px)',
    zIndex: 2
  },
  discountBadge: {
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    background: 'rgba(6, 214, 160, 0.9)',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    zIndex: 2
  },
  serviceTabs: {
    display: 'flex',
    borderBottom: '2px solid #e9ecef',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  tabButton: {
    padding: '15px 30px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    color: '#666',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  },
  activeTab: {
    color: '#3a86ff',
    borderBottom: '2px solid #3a86ff',
    marginBottom: '-2px'
  },
  tabContent: {
    minHeight: '300px',
    paddingBottom: '40px'
  },
  subtitle: {
    fontSize: '24px',
    color: '#1a1a2e',
    marginBottom: '15px',
    fontWeight: '600',
    marginTop: '30px'
  },
  description: {
    color: '#666',
    lineHeight: '1.8',
    marginBottom: '30px',
    fontSize: '16px'
  },
  featuresList: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
    color: '#1a1a2e',
    fontSize: '16px',
    padding: '8px 0'
  },
  checkIcon: {
    color: '#06d6a0',
    minWidth: '20px'
  },
  providerCard: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
    marginTop: '20px'
  },
  providerName: {
    fontSize: '24px',
    color: '#1a1a2e',
    marginBottom: '20px'
  },
  providerDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    margin: '20px 0'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#1a1a2e'
  },
  verifiedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#06d6a0',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '20px'
  },
  reviewCard: {
    background: '#ffffff',
    border: '1px solid #e9ecef',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    marginTop: '20px'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  reviewerName: {
    marginBottom: '5px',
    color: '#1a1a2e',
    fontSize: '18px'
  },
  reviewRating: {
    display: 'flex',
    gap: '2px'
  },
  filledStar: {
    color: '#ffc107',
    fontSize: '14px'
  },
  emptyStar: {
    color: '#e9ecef',
    fontSize: '14px'
  },
  reviewDate: {
    color: '#666',
    fontSize: '14px'
  },
  reviewComment: {
    color: '#1a1a2e',
    lineHeight: '1.6'
  },
  bookingCard: {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: '100px'
  },
  bookingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  bookingTitle: {
    fontSize: '22px',
    color: '#1a1a2e',
    fontWeight: '600'
  },
  priceDisplay: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  price: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#3a86ff',
    background: 'linear-gradient(135deg, #3a86ff, #8338ec)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  discountedPrice: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#06d6a0'
  },
  originalPrice: {
    fontSize: '18px',
    color: '#666',
    textDecoration: 'line-through',
    fontWeight: '500',
    marginLeft: '10px'
  },
  unit: {
    color: '#666',
    marginTop: '5px',
    fontSize: '16px'
  },
  bookingDetails: {
    marginBottom: '30px'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e9ecef'
  },
  icon: {
    color: '#3a86ff',
    fontSize: '18px',
    minWidth: '20px'
  },
  label: {
    display: 'block',
    color: '#666',
    fontSize: '14px',
    marginBottom: '5px'
  },
  value: {
    display: 'block',
    color: '#1a1a2e',
    fontWeight: '600',
    fontSize: '16px'
  },
  bookButton: {
    width: '100%',
    padding: '16px',
    fontSize: '18px',
    background: 'linear-gradient(135deg, #3a86ff, #8338ec)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(58, 134, 255, 0.3)'
  },
  bookingFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#06d6a0',
    fontSize: '14px'
  },
  notFound: {
    textAlign: 'center',
    padding: '100px 20px',
    background: 'linear-gradient(180deg, #f5f7fa 0%, #ffffff 50%, #f5f7fa 100%)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notFoundTitle: {
    fontSize: '36px',
    color: '#1a1a2e',
    marginBottom: '20px'
  },
  notFoundText: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
    maxWidth: '500px'
  },
  backButton: {
    background: 'linear-gradient(135deg, #3a86ff, #8338ec)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(58, 134, 255, 0.3)'
  }
};

export default ServiceDetails;