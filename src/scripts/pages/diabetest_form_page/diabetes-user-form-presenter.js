// diabetes-presenter.js
import {
  predictDiabetesAsUser,
  getAllDiabetesUserHistory,
} from "../../data/api.js";

export default class DiabetesPresenterUser {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleFileUpload(file) {
    this.#view.showLoading();

    try {
      const data = await predictDiabetesAsUser(file);
      this.#view.displayResults(data);
      // Refresh history after new prediction
      await this.loadHistory();
    } catch (error) {
      this.#view.displayError(error);
    }
  }

  // diabetes-presenter.js
  async loadHistory() {
    try {
      const history = await getAllDiabetesUserHistory();
      // Sort by createdAt in descending order (newest first)
      const sortedHistory = history.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      this.#view.displayHistory(sortedHistory);
    } catch (error) {
      this.#view.displayHistoryError(error);
    }
  }
}
