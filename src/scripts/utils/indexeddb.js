function createIndexedDBHandler(dbName, version, storeName) {
  return {
    dbName,
    version,
    storeName,

    async initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            const store = db.createObjectStore(this.storeName, {
              keyPath: "id",
              autoIncrement: true,
            });
            store.createIndex("timestamp", "timestamp", { unique: false });
          }
        };
      });
    },

    async saveResult(data) {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const resultData = {
        ...data,
        timestamp: data.timestamp || new Date().toISOString(), // Pastikan timestamp ada
        savedAt: Date.now(), // Timestamp untuk pengurutan lokal
      };

      return new Promise((resolve, reject) => {
        const request = store.add(resultData);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    },

    async getAllResults() {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);

      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    },

    // --- TAMBAHKAN FUNGSI INI ---
    async clearAllResults() {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      return new Promise((resolve, reject) => {
        const request = store.clear(); // Menghapus semua data di object store
        request.onsuccess = () => {
          console.log(`All data cleared from ${this.storeName}`);
          resolve();
        };
        request.onerror = () => {
          console.error(`Error clearing data from ${this.storeName}:`, request.error);
          reject(request.error);
        };
      });
    },
    // --- AKHIR TAMBAHAN ---
  };
}

// Buat instance untuk masing-masing database
export const DiabetesDisplayResult = createIndexedDBHandler(
  "DiabetesResults", // Untuk hasil cek retina
  1,
  "results"
);

export const DiabetesFormDisplayResult = createIndexedDBHandler(
  "DiabetesFormResults", // Untuk hasil cek form
  1,
  "resultsForms"
);