import api from './api';

export const paymentService = {
  // Process payment
  async processPayment(paymentData) {
    try {
      const response = await api.post('/payments/process', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get payment by ID
  async getPaymentById(id) {
    try {
      const response = await api.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user payments
  async getUserPayments(userId) {
    try {
      const response = await api.get(`/users/${userId}/payments`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Refund payment
  async refundPayment(paymentId) {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create payment intent (for Stripe)
  async createPaymentIntent(amount) {
    try {
      const response = await api.post('/payments/create-intent', { amount });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Confirm payment
  async confirmPayment(paymentIntentId) {
    try {
      const response = await api.post('/payments/confirm', { paymentIntentId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};