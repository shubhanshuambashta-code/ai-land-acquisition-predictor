/**
 * String Utility Functions
 * Common string manipulation operations
 */

/**
 * Capitalize first letter
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to camelCase
 * @param {string} str
 * @returns {string}
 */
export const toCamelCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
};

/**
 * Convert string to snake_case
 * @param {string} str
 * @returns {string}
 */
export const toSnakeCase = (str) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

/**
 * Convert string to kebab-case
 * @param {string} str
 * @returns {string}
 */
export const toKebabCase = (str) => {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

/**
 * Reverse a string
 * @param {string} str
 * @returns {string}
 */
export const reverseString = (str) => {
  return str.split('').reverse().join('');
};

/**
 * Count occurrences of substring
 * @param {string} str
 * @param {string} search
 * @returns {number}
 */
export const countOccurrences = (str, search) => {
  return str.split(search).length - 1;
};

/**
 * Remove duplicate characters
 * @param {string} str
 * @returns {string}
 */
export const removeDuplicates = (str) => {
  return [...new Set(str)].join('');
};

/**
 * Repeat string n times
 * @param {string} str
 * @param {number} times
 * @returns {string}
 */
export const repeatString = (str, times) => {
  return str.repeat(Math.max(0, times));
};

/**
 * Pad string to length
 * @param {string} str
 * @param {number} length
 * @param {string} pad
 * @returns {string}
 */
export const padString = (str, length, pad = ' ') => {
  const padLength = Math.max(0, length - str.length);
  return pad.repeat(Math.ceil(padLength / pad.length)).slice(0, padLength) + str;
};

/**
 * Strip whitespace from string
 * @param {string} str
 * @returns {string}
 */
export const stripWhitespace = (str) => {
  return str.replace(/\s/g, '');
};

/**
 * Slugify string (for URLs)
 * @param {string} str
 * @returns {string}
 */
export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
