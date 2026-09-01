import api from '../utils/api';

/**
 * Alert Service
 * Handles alerts and notifications
 */

const alertService = {
  /**
   * Get all alerts
   * @param {Object} filters - Filter parameters
   * @returns {Promise} Array of alerts
   */
  getAlerts: async (filters = {}) => {
    try {
      const response = await api.get('/alerts', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get unread alerts count
   * @returns {Promise} Unread count
   */
  getUnreadCount: async () => {
    try {
      const response = await api.get('/alerts/unread-count');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Mark alert as read
   * @param {string} alertId - Alert ID
   * @returns {Promise}
   */
  markAsRead: async (alertId) => {
    try {
      await api.put(`/alerts/${alertId}/read`);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Mark all alerts as read
   * @returns {Promise}
   */
  markAllAsRead: async () => {
    try {
      await api.put('/alerts/mark-all-read');
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete alert
   * @param {string} alertId - Alert ID
   * @returns {Promise}
   */
  deleteAlert: async (alertId) => {
    try {
      await api.delete(`/alerts/${alertId}`);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create custom alert
   * @param {Object} alertData - Alert data
   * @returns {Promise} Created alert
   */
  createAlert: async (alertData) => {
    try {
      const response = await api.post('/alerts', alertData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default alertService;
