// utils/indexeddb.js
class DiabetesStorageService {
  constructor() {
    this.dbName = "DiabetesDB";
    this.dbVersion = 1;
    this.storeName = "predictions";
    this.db = null;
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(new Error("Failed to open IndexedDB"));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true,
          });

          // Create indexes
          store.createIndex("timestamp", "timestamp", { unique: false });
          store.createIndex("fileName", "fileName", { unique: false });
        }
      };
    });
  }

  async savePrediction(predictionData, file) {
    if (!this.db) {
      await this.initDB();
    }

    // First convert file to base64
    const fileData = await this.fileToBase64(file);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const predictionRecord = {
        ...predictionData,
        originalFile: {
          name: file.name,
          size: file.size,
          type: file.type,
          data: fileData, // base64 string
        },
        fileName: file.name,
        timestamp: new Date().toISOString(),
        savedAt: Date.now(),
      };

      const request = store.add(predictionRecord);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to save prediction"));
      };

      transaction.onerror = () => {
        reject(new Error("Transaction failed"));
      };
    });
  }

  // Helper method to convert file to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  }

  async getAllPredictions() {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        // Sort by timestamp, most recent first
        const results = request.result.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        resolve(results);
      };

      request.onerror = () => {
        reject(new Error("Failed to retrieve predictions"));
      };
    });
  }

  async getLatestPrediction() {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const index = store.index("timestamp");
      const request = index.openCursor(null, "prev"); // Get latest first

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          resolve(cursor.value);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        reject(new Error("Failed to retrieve latest prediction"));
      };
    });
  }

  async deletePrediction(id) {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        reject(new Error("Failed to delete prediction"));
      };
    });
  }

  async clearAllPredictions() {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        reject(new Error("Failed to clear predictions"));
      };
    });
  }
}

// Export singleton instance
export const diabetesStorage = new DiabetesStorageService();
