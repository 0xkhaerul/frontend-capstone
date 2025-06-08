// profile-presenter.js (Updated with delete functionality)
import {
  getProfile,
  getAllDiabetesUserHistory,
  getAllDiabetesUserFormHistory,
  deleteDiabatesUserHistory,
  deleteDiabatesUserFormHistory,
} from "../../data/api.js";

export default class ProfilePresenter {
  #view;
  #user = null;
  #loading = false;
  #error = null;
  #retinaHistory = [];
  #formHistory = [];

  constructor(view) {
    this.#view = view;
  }

  async init() {
    await this.loadProfile();
  }

  async loadProfile() {
    try {
      this.#loading = true;
      this.#error = null;
      this.#view.showLoading();

      const response = await getProfile();

      if (response && response.user) {
        this.#user = response.user;
        this.#view.showProfile(this.#user);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      this.#error = error.message;
      this.#view.showError(this.#error);
    } finally {
      this.#loading = false;
    }
  }

  async loadRetinaHistory() {
    try {
      if (this.#retinaHistory.length === 0) {
        const history = await getAllDiabetesUserHistory();
        this.#retinaHistory = history.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      return this.#retinaHistory;
    } catch (error) {
      console.error("Error loading retina history:", error);
      throw error;
    }
  }

  async loadFormHistory() {
    try {
      if (this.#formHistory.length === 0) {
        const history = await getAllDiabetesUserFormHistory();
        this.#formHistory = history.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      return this.#formHistory;
    } catch (error) {
      console.error("Error loading form history:", error);
      throw error;
    }
  }

  async handleRetry() {
    await this.loadProfile();
  }

  // New method to handle delete functionality
  async deleteHistoryItem(itemId, type) {
    try {
      if (type === "retina") {
        await deleteDiabatesUserHistory(itemId);
        // Remove from local cache
        this.#retinaHistory = this.#retinaHistory.filter(
          (item) => item.id !== itemId
        );
      } else if (type === "form") {
        await deleteDiabatesUserFormHistory(itemId);
        // Remove from local cache
        this.#formHistory = this.#formHistory.filter(
          (item) => item.id !== itemId
        );
      }
    } catch (error) {
      console.error(`Error deleting ${type} history item:`, error);
      throw error;
    }
  }

  // New method to clear history cache
  clearHistoryCache(type) {
    if (type === "retina") {
      this.#retinaHistory = [];
    } else if (type === "form") {
      this.#formHistory = [];
    } else if (type === "all") {
      this.#retinaHistory = [];
      this.#formHistory = [];
    }
  }

  // Getters for accessing data
  getUser() {
    return this.#user;
  }

  isLoading() {
    return this.#loading;
  }

  getError() {
    return this.#error;
  }

  getRetinaHistory() {
    return this.#retinaHistory;
  }

  getFormHistory() {
    return this.#formHistory;
  }
}
