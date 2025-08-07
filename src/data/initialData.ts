// Initialize local storage for yacht configurations
export function initializeLocalData() {
  const db = localStorage.getItem('feadship_config_db');
  if (!db) {
    // Initialize empty database structure
    localStorage.setItem('feadship_config_db', JSON.stringify({
      yachts: [],
      currentYachtId: null,
      user: null
    }));
  }
}