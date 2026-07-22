/**
 * Formats millisecond ping latency into a human readable string.
 * @param {number} ms 
 * @returns {string}
 */
export function formatPing(ms) {
  if (ms <= 0) return 'Timeout';
  return `${ms} ms`;
}

/**
 * Formats uptime percentage to 1 decimal place.
 * @param {number} percentage 
 * @returns {string}
 */
export function formatUptime(percentage) {
  return `${Number(percentage).toFixed(1)}%`;
}

/**
 * Validates whether a string is a properly formatted HTTP/HTTPS URL.
 * @param {string} urlString 
 * @returns {boolean}
 */
export function isValidUrl(urlString) {
  try {
    const formatted = urlString.startsWith('http') ? urlString : `https://${urlString}`;
    new URL(formatted);
    return true;
  } catch {
    return false;
  }
}
