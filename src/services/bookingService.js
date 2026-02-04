import api from './api';

export const bookingService = {
  // Get all bookings
  async getBookings(params = {}) {
    try {
      const response = await api.get('/bookings', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get booking by ID
  async getBookingById(id) {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new booking
  async createBooking(bookingData) {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update booking
  async updateBooking(id, bookingData) {
    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cancel booking
  async cancelBooking(id) {
    try {
      const response = await api.put(`/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user bookings
  async getUserBookings(userId) {
    try {
      const response = await api.get(`/users/${userId}/bookings`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get booking statistics
  async getBookingStats() {
    try {
      const response = await api.get('/bookings/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};