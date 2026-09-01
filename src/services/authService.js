import api from '../utils/api';

/**
 * Authentication Service
 * Handles user login, logout, and role-based access
 */

const authService = {
  /**
   * Login user with credentials
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Login response with token and user data
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout current user
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Get current logged-in user
   * @returns {Object} Current user object
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Check user role
   * @param {string} role - Role to check (Admin, Manager, Viewer)
   * @returns {boolean}
   */
  hasRole: (role) => {
    const user = authService.getCurrentUser();
    return user?.role === role;
  },
};

export default authService;
