// profile-presenter.js
import { getProfile } from "../../data/api.js";

export default class ProfilePresenter {
  #view;
  #user = null;
  #loading = false;
  #error = null;

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

  async handleRetry() {
    await this.loadProfile();
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
}
