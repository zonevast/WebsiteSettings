
// Extract param encoding to a standalone function
export const encodeQueryParams = (paramsObj) => {
  if (!paramsObj || typeof paramsObj !== 'object') return '';
  
  return Object.keys(paramsObj)
    .filter(key => {
      const value = paramsObj[key];
      return value !== "" && value !== null && value !== undefined &&
        !(typeof value === 'object' && Object.keys(value).length === 0);
    })
    .map(key => {
      const value = paramsObj[key];
      
      // Handle nested objects
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return Object.keys(value)
          .filter(subKey => value[subKey] != null)
          .map(subKey => `${encodeURIComponent(subKey)}=${encodeURIComponent(value[subKey])}`)
          .join('&');
      }
      
      // Handle arrays
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      }
      
      // Handle primitive values
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join('&');
};