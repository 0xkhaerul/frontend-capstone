import {
  predictDiabetesFormAsUser,
  getAllDiabetesUserFormHistory,
  deleteDiabatesUserFormHistory,
} from "../../data/api.js";
// Impor fungsi notifikasi
import { showNotification } from "../../utils/notifications.js";

export default class DiabetesFormPresenterUser {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleFormSubmit(formData) {
    this.#view.showLoading();

    try {
      const data = await predictDiabetesFormAsUser(formData); //
      this.#view.displayResults(data);
      await this.loadHistory();
      // Tampilkan notifikasi sukses
      showNotification('Form check completed and result saved.', 'success');
    } catch (error) {
      this.#view.displayError(error);
      // Tampilkan notifikasi error
      showNotification(`Error: ${error.message || 'Failed to submit form.'}`, 'error');
    }
  }

  async loadHistory() {
    try {
      const history = await getAllDiabetesUserFormHistory();
      // Sort by createdAt in descending order (newest first)
      const sortedHistory = history.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      this.#view.displayHistory(sortedHistory);
    } catch (error) {
      this.#view.displayHistoryError(error);
    }
  }

  async deleteHistoryItem(id) {
    try {
      await deleteDiabatesUserFormHistory(id);
      // Refresh history setelah delete
      await this.loadHistory();
      return true;
    } catch (error) {
      console.error("Failed to delete history item:", error);
      throw error;
    }
  }
}
