import { predictDiabetesFormAsUser } from "../../data/api.js";

export default class DiabetesFormPresenterUser {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async handleFormSubmit(formData) {
    this.#view.showLoading();

    try {
      const data = await predictDiabetesFormAsUser(formData);
      this.#view.displayResults(data);
    } catch (error) {
      this.#view.displayError(error);
    }
  }
}
