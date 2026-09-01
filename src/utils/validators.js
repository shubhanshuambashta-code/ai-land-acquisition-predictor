/**
 * Custom Validation Functions
 * Reusable validation logic for forms
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Password strength info
 */
export const validatePassword = (password) => {
  const strength = {
    score: 0,
    feedback: [],
    level: 'weak',
  };

  if (password.length >= 8) strength.score += 1;
  else strength.feedback.push('At least 8 characters');

  if (/[a-z]/.test(password)) strength.score += 1;
  else strength.feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) strength.score += 1;
  else strength.feedback.push('Include uppercase letters');

  if (/[0-9]/.test(password)) strength.score += 1;
  else strength.feedback.push('Include numbers');

  if (/[^a-zA-Z0-9]/.test(password)) strength.score += 1;
  else strength.feedback.push('Include special characters');

  if (strength.score >= 4) strength.level = 'strong';
  else if (strength.score >= 2) strength.level = 'medium';

  return strength;
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validate required field
 * @param {*} value - Value to validate
 * @returns {boolean}
 */
export const isRequired = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length required
 * @returns {boolean}
 */
export const minLength = (value, minLength) => {
  return value.length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length allowed
 * @returns {boolean}
 */
export const maxLength = (value, maxLength) => {
  return value.length <= maxLength;
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean}
 */
export const inRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Validate that two values match
 * @param {*} value1 - First value
 * @param {*} value2 - Second value
 * @returns {boolean}
 */
export const matches = (value1, value2) => {
  return value1 === value2;
};
