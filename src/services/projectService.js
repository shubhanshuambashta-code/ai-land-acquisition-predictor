import api from '../utils/api';

/**
 * Project Service
 * Handles all project-related API calls
 */

const projectService = {
  /**
   * Get all projects with optional filters
   * @param {Object} filters - Filter parameters (district, state, projectType)
   * @returns {Promise} Array of projects
   */
  getProjects: async (filters = {}) => {
    try {
      const response = await api.get('/projects', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get single project details
   * @param {string} projectId - Project ID
   * @returns {Promise} Project details
   */
  getProjectById: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create new project
   * @param {Object} projectData - Project data
   * @returns {Promise} Created project
   */
  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update project
   * @param {string} projectId - Project ID
   * @param {Object} projectData - Updated project data
   * @returns {Promise} Updated project
   */
  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete project
   * @param {string} projectId - Project ID
   * @returns {Promise}
   */
  deleteProject: async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default projectService;
