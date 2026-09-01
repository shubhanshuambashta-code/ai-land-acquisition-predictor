import api from '../utils/api';

/**
 * Risk Service
 * Handles risk scores, predictions, and analytics
 */

const riskService = {
  /**
   * Get risk scores for all projects
   * @param {Object} filters - Filter parameters
   * @returns {Promise} Risk scores data
   */
  getRiskScores: async (filters = {}) => {
    try {
      const response = await api.get('/risk-scores', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get delay probability for a project
   * @param {string} projectId - Project ID
   * @returns {Promise} Delay probability data
   */
  getDelayProbability: async (projectId) => {
    try {
      const response = await api.get(`/risk-scores/${projectId}/delay-probability`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get district-wise trends
   * @returns {Promise} District trends data
   */
  getDistrictTrends: async () => {
    try {
      const response = await api.get('/analytics/district-trends');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get state-wise trends
   * @returns {Promise} State trends data
   */
  getStateTrends: async () => {
    try {
      const response = await api.get('/analytics/state-trends');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get key delay drivers
   * @returns {Promise} Delay drivers data
   */
  getDelayDrivers: async () => {
    try {
      const response = await api.get('/analytics/delay-drivers');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get timeline analysis
   * @param {string} projectId - Project ID
   * @returns {Promise} Timeline data
   */
  getTimeline: async (projectId) => {
    try {
      const response = await api.get(`/analytics/timeline/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default riskService;
