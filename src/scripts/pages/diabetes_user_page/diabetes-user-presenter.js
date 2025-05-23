// diabetes-presenter.js
import { predictDiabetesAsUser } from "../../data/api.js";

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
    } catch (error) {
      this.#view.displayError(error);
    }
  }
}
