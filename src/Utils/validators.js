export const validators = {
  // Email validation
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Password validation
  password: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    return regex.test(password);
  },

  // Phone number validation (basic)
  phone: (phone) => {
    const regex = /^[\+]?[1-9][\d]{0,15}$/;
    return regex.test(phone.replace(/[\s\-\(\)]/g, ''));
  },

  // Credit card number validation (Luhn algorithm)
  creditCard: (number) => {
    const sanitized = number.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(sanitized)) return false;
    
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i));
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    return (sum % 10) === 0;
  },

  // CVV validation
  cvv: (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  },

  // Expiry date validation
  expiryDate: (date) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;
    
    const [month, year] = date.split('/').map(num => parseInt(num, 10));
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) return false;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
  },

  // Required field validation
  required: (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },

  // Min length validation
  minLength: (value, min) => {
    return value.length >= min;
  },

  // Max length validation
  maxLength: (value, max) => {
    return value.length <= max;
  },

  // Number range validation
  numberRange: (value, min, max) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  },

  // URL validation
  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Date validation
  date: (date) => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  },

  // Future date validation
  futureDate: (date) => {
    const inputDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
  },

  // Time validation
  time: (time) => {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  },

  // Validate form fields
  validateForm: (fields, validations) => {
    const errors = {};
    
    Object.keys(validations).forEach(fieldName => {
      const value = fields[fieldName];
      const fieldValidations = validations[fieldName];
      
      for (const validation of fieldValidations) {
        const { type, params = [], message } = validation;
        
        if (!this[type]) continue;
        
        const isValid = this[type](value, ...params);
        if (!isValid) {
          errors[fieldName] = message;
          break;
        }
      }
    });
    
    return errors;
  }
};

// Example usage:
/*
const validations = {
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Invalid email format' }
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'password', message: 'Password must contain at least 8 characters, one uppercase, one lowercase, and one number' }
  ]
};

const errors = validators.validateForm(formData, validations);
*/