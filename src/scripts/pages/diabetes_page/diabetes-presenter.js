// diabetes-presenter.js
import { predictDiabetes } from "../../data/api.js";

export default class DiabetesPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleFileUpload(file) {
    this.#view.showLoading();

    try {
      const data = await predictDiabetes(file);
      this.#view.displayResults(data);
    } catch (error) {
      this.#view.displayError(error);
    }
  }
}
