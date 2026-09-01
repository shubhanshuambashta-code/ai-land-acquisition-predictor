/**
 * Type Checking Utilities
 * Centralized type checking functions
 */

/**
 * Check if value is a string
 * @param {*} value
 * @returns {boolean}
 */
export const isString = (value) => typeof value === 'string';

/**
 * Check if value is a number
 * @param {*} value
 * @returns {boolean}
 */
export const isNumber = (value) => typeof value === 'number' && !isNaN(value);

/**
 * Check if value is a boolean
 * @param {*} value
 * @returns {boolean}
 */
export const isBoolean = (value) => typeof value === 'boolean';

/**
 * Check if value is an array
 * @param {*} value
 * @returns {boolean}
 */
export const isArray = (value) => Array.isArray(value);

/**
 * Check if value is an object
 * @param {*} value
 * @returns {boolean}
 */
export const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Check if value is null or undefined
 * @param {*} value
 * @returns {boolean}
 */
export const isNullOrUndefined = (value) => value === null || value === undefined;

/**
 * Check if value is a function
 * @param {*} value
 * @returns {boolean}
 */
export const isFunction = (value) => typeof value === 'function';

/**
 * Check if value is a date
 * @param {*} value
 * @returns {boolean}
 */
export const isDate = (value) => value instanceof Date;

/**
 * Check if value is an error
 * @param {*} value
 * @returns {boolean}
 */
export const isError = (value) => value instanceof Error;

/**
 * Get type name of value
 * @param {*} value
 * @returns {string}
 */
export const getType = (value) => {
  if (isNullOrUndefined(value)) return 'null';
  if (isArray(value)) return 'array';
  return typeof value;
};
