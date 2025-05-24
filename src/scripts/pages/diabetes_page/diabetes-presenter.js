// diabetes-presenter.js
import { predictDiabetes } from "../../data/api.js";
import { diabetesStorage } from "../../utils/indexeddb.js";

export default class DiabetesPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleFileUpload(file) {
    this.#view.showLoading();

    try {
      // Try to get prediction from API
      const data = await predictDiabetes(file);

      // Save to IndexedDB
      await diabetesStorage.savePrediction(data, file);

      // Display results
      this.#view.displayResults(data);
    } catch (error) {
      console.error("API Error:", error);

      // Check if we have cached data for similar image
      try {
        const cachedPredictions = await diabetesStorage.getAllPredictions();
        const similarPrediction = this.findSimilarPrediction(
          cachedPredictions,
          file
        );

        if (similarPrediction) {
          console.log("Using cached prediction due to API failure");
          this.#view.displayResults(similarPrediction, true); // true indicates cached data
        } else {
          this.#view.displayError(error);
        }
      } catch (storageError) {
        console.error("Storage Error:", storageError);
        this.#view.displayError(error);
      }
    }
  }

  // Load cached predictions on page load
  async loadCachedData() {
    try {
      const latestPrediction = await diabetesStorage.getLatestPrediction();
      if (latestPrediction) {
        this.#view.displayCachedResults(latestPrediction);
      }
    } catch (error) {
      console.error("Failed to load cached data:", error);
    }
  }

  // Helper method to find similar prediction (basic implementation)
  findSimilarPrediction(predictions, file) {
    // Simple matching by file name and size
    return predictions.find(
      (pred) =>
        pred.originalFile &&
        pred.originalFile.name === file.name &&
        pred.originalFile.size === file.size
    );
  }

  // Get all cached predictions
  async getAllCachedPredictions() {
    try {
      return await diabetesStorage.getAllPredictions();
    } catch (error) {
      console.error("Failed to get cached predictions:", error);
      return [];
    }
  }

  // Clear cache
  async clearCache() {
    try {
      await diabetesStorage.clearAllPredictions();
      this.#view.showCacheCleared();
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  }
}
