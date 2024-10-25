
// Cache Service Utility
export const getCachedData = (key) => {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < (2 * 60 * 1000)) {
        console.log('Loading from cache');
        return data;  // Return cached data if valid
      } else {
        localStorage.removeItem(key);  // Remove expired cache
      }
    }
    return null; // No valid cache found
  };
  
  export const setCachedData = (key, data) => {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  };
  
