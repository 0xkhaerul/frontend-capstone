import { login } from "../../../data/api.js";
import { putAccessToken } from "../../../utils/auth.js";
import { showNotification } from "../../../utils/notifications.js";

export default class LoginPresenter {
  #view;
  #authService;

  constructor(view, authService = { login, putAccessToken }) {
    this.#view = view;
    this.#authService = authService;
  }

  async handleLogin() {
    try {
      this.#view.clearError();
      const formData = this.#view.getFormData();

      if (!this.#validateFormData(formData)) {
        return;
      }

      this.#view.setLoading(true);

      const result = await this.#authService.login({
        email: formData.email,
        password: formData.password,
      });

      this.#view.setLoading(false);

      if (result.error) {
        this.#view.showError(
          result.data?.message || "Login failed. Please try again."
        );
        return;
      }

      this.#handleLoginSuccess(result.data);
    } catch (error) {
      this.#handleLoginError(error);
    }
  }

  #validateFormData(formData) {
    if (!formData.email || !formData.password) {
      this.#view.showError("Email and password must be filled");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      this.#view.showError("Please enter a valid email address");
      return false;
    }

    return true;
  }

  #handleLoginSuccess(data) {
    this.#authService.putAccessToken(data.loginResult.token); //
    // Tampilkan notifikasi
    showNotification('Login successful! Welcome.', 'success');
    
    // Beri jeda sedikit agar notifikasi terlihat sebelum pindah halaman
    setTimeout(() => {
        this.#view.navigateTo("/");
    }, 1500);
  }

  #handleLoginError(error) {
    this.#view.setLoading(false);
    console.error("Login error:", error);
    this.#view.showError("An unexpected error occurred. Please try again.");
  }
}