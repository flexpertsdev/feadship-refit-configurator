// ==================================================
// AI EXPLANATION: localStorageService.ts
// ==================================================
// WHAT: Browser localStorage abstraction layer providing mock database functionality for yacht configs, features, colors, and auth when offline
// WHY: Without this, app has no offline support or demo mode - provides data persistence fallback when backend is unavailable
// USED BY: yachtService.ts as fallback storage, AuthContext for offline auth simulation
// CRITICAL: YES - Essential for offline functionality and demo mode, breaking this removes all local data persistence
// ==================================================

interface LocalStorageDB {
  yachts: any[];
  features: any[];
  colors: any[];
  currentYachtId: string | null;
  user: any | null;
}

class LocalStorageService {
  private dbKey = 'feadship_config_db';
  
  private getDB(): LocalStorageDB {
    const stored = localStorage.getItem(this.dbKey);
    if (!stored) {
      const defaultDB: LocalStorageDB = {
        yachts: [],
        features: [],
        colors: [],
        currentYachtId: null,
        user: null
      };
      this.saveDB(defaultDB);
      return defaultDB;
    }
    return JSON.parse(stored);
  }
  
  private saveDB(db: LocalStorageDB) {
    localStorage.setItem(this.dbKey, JSON.stringify(db));
  }
  
  // Yacht operations
  async createYacht(yacht: any) {
    const db = this.getDB();
    const newYacht = {
      ...yacht,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db.yachts.push(newYacht);
    db.currentYachtId = newYacht.id;
    this.saveDB(db);
    return { data: newYacht, error: null };
  }
  
  async updateYacht(id: string, updates: any) {
    const db = this.getDB();
    const index = db.yachts.findIndex(y => y.id === id);
    if (index !== -1) {
      db.yachts[index] = {
        ...db.yachts[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      this.saveDB(db);
      return { data: db.yachts[index], error: null };
    }
    return { data: null, error: 'Yacht not found' };
  }
  
  async getYacht(id: string) {
    const db = this.getDB();
    const yacht = db.yachts.find(y => y.id === id);
    return { data: yacht || null, error: yacht ? null : 'Not found' };
  }
  
  async getCurrentYacht() {
    const db = this.getDB();
    if (db.currentYachtId) {
      return this.getYacht(db.currentYachtId);
    }
    return { data: null, error: 'No current yacht' };
  }
  
  async getUserYachts(userId?: string) {
    const db = this.getDB();
    // If no userId provided, try to get current user's yachts
    const targetUserId = userId || db.user?.id;
    if (!targetUserId) {
      return { data: [], error: 'No user ID provided' };
    }
    const userYachts = db.yachts.filter(y => y.user_id === targetUserId);
    return { data: userYachts, error: null };
  }
  
  async deleteYacht(id: string) {
    const db = this.getDB();
    const index = db.yachts.findIndex(y => y.id === id);
    if (index !== -1) {
      db.yachts.splice(index, 1);
      // If this was the current yacht, clear it
      if (db.currentYachtId === id) {
        db.currentYachtId = null;
      }
      this.saveDB(db);
      return { error: null };
    }
    return { error: 'Yacht not found' };
  }
  
  setCurrentYacht(yachtId: string) {
    const db = this.getDB();
    db.currentYachtId = yachtId;
    this.saveDB(db);
  }
  
  getCurrentUser() {
    const db = this.getDB();
    return db.user;
  }
  
  // Features operations
  async getFeatures() {
    const db = this.getDB();
    return { data: db.features, error: null };
  }
  
  async getFeaturesByType(type: string) {
    const db = this.getDB();
    const filtered = db.features.filter(f => f.type === type);
    return { data: filtered, error: null };
  }
  
  // Colors operations
  async getColors() {
    const db = this.getDB();
    return { data: db.colors, error: null };
  }
  
  async getColorsByGroup(group: string) {
    const db = this.getDB();
    const filtered = db.colors.filter(c => c.color_group === group);
    return { data: filtered, error: null };
  }
  
  async addCustomColor(color: any) {
    const db = this.getDB();
    const newColor = {
      ...color,
      id: crypto.randomUUID(),
      type: 'custom',
      created_at: new Date().toISOString()
    };
    db.colors.push(newColor);
    this.saveDB(db);
    return { data: newColor, error: null };
  }
  
  // Auth operations
  async signIn(email: string, password: string) {
    const db = this.getDB();
    // Mock auth - accept any credentials
    const user = {
      id: crypto.randomUUID(),
      email: email,
      created_at: new Date().toISOString()
    };
    db.user = user;
    this.saveDB(db);
    return { data: { user }, error: null };
  }
  
  async signOut() {
    const db = this.getDB();
    db.user = null;
    db.currentYachtId = null;
    this.saveDB(db);
    return { error: null };
  }
  
  async getUser() {
    const db = this.getDB();
    return { data: { user: db.user }, error: null };
  }
  
  // Additional auth methods for AuthContext
  async getAuth() {
    const db = this.getDB();
    return { 
      data: {
        user: db.user,
        session: db.session || null,
        users: db.users || []
      }, 
      error: null 
    };
  }
  
  async setAuth(authData: any) {
    const db = this.getDB();
    if (authData.user) db.user = authData.user;
    if (authData.session) db.session = authData.session;
    if (authData.users) db.users = authData.users;
    this.saveDB(db);
    return { data: authData, error: null };
  }
  
  async clearAuth() {
    const db = this.getDB();
    db.user = null;
    db.session = null;
    // Keep users list for sign up functionality
    this.saveDB(db);
    return { error: null };
  }
  
  // Initialize data if needed
  initializeData(colors: any[], features: any[]) {
    const db = this.getDB();
    if (db.colors.length === 0) {
      db.colors = colors;
    }
    if (db.features.length === 0) {
      db.features = features;
    }
    this.saveDB(db);
  }
}

export const localStorageService = new LocalStorageService();