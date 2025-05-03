export function normalizePath(url) {
  // Handle undefined or null `url` by providing a default value
  if (!url) {
    return ""; // Or any default value you'd like
  }

  // First normalize multiple slashes (except after protocol)
  let normalized = url.replace(/([^:]\/)\/+/g, "$1");

  // Remove slash before query parameters
  normalized = normalized.replace(/\/\?/g, "?");

  return normalized;
}
