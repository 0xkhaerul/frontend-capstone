import RegisterPresenter from "./register-presenter.js";

export default class RegisterPage {
  #presenter;
  #formElements = {
    form: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    errorMessage: null,
    submitButton: null,
  };

  constructor() {
    this.#presenter = new RegisterPresenter(this);
  }

  async render() {
    return `
      <section
        class="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg border border-red-500"
        style="box-shadow: 0 0 15px rgba(255, 0, 0, 0.5)"
      >
        <div class="header">
          <p class="text-xs text-red-500 text-center mb-2">*create account*</p>
        </div>

        <h1
          class="text-2xl font-bold text-center mb-6 text-red-500 tracking-wider"
          style="text-shadow: 0 0 5px rgba(255, 0, 0, 0.7)"
        >
          REGISTER ACCOUNT
        </h1>

        <div class="auth-form-container">
          <form id="registerForm" class="creepy-form">
            <div class="form-control mb-4">
              <label for="username" class="block text-red-400 mb-1 text-sm"
                >Username</label
              >
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                required
                class="w-full px-3 py-2 bg-gray-800 border border-red-900 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div class="form-control mb-4">
              <label for="email" class="block text-red-400 mb-1 text-sm">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                class="w-full px-3 py-2 bg-gray-800 border border-red-900 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div class="form-control mb-4">
              <label for="password" class="block text-red-400 mb-1 text-sm"
                >Password</label
              >
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password (min 8 characters)"
                required
                minlength="8"
                class="w-full px-3 py-2 bg-gray-800 border border-red-900 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div class="form-control mb-4">
              <label for="confirm-password" class="block text-red-400 mb-1 text-sm"
                >Confirm Password</label
              >
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Repeat your password"
                required
                minlength="8"
                class="w-full px-3 py-2 bg-gray-800 border border-red-900 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              class="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded mt-4 transition duration-200"
            >
              Register
            </button>

            <div class="text-center text-gray-400 text-sm mt-4">
              <span>Already have an account? </span>
              <a href="#/login" class="text-red-400 hover:text-red-300">Login here</a>
            </div>
          </form>
          <div
            id="errorMessage"
            class="text-red-500 text-sm mt-4 text-center hidden"
          ></div>
        </div>
      </section>

    `;
  }

  async afterRender() {
    this.#formElements = {
      form: document.getElementById("registerForm"),
      username: document.getElementById("username"),
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      confirmPassword: document.getElementById("confirm-password"),
      errorMessage: document.getElementById("errorMessage"),
      submitButton: document.querySelector(
        "#registerForm button[type='submit']"
      ),
    };

    // Set up event listeners
    this.#formElements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.#presenter.handleRegister();
    });
  }

  getFormData() {
    return {
      username: this.#formElements.username.value,
      email: this.#formElements.email.value,
      password: this.#formElements.password.value,
      confirmPassword: this.#formElements.confirmPassword.value,
    };
  }

  showError(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "error-message";
  }

  showSuccess(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "success-message";
  }

  clearError() {
    this.#formElements.errorMessage.textContent = "";
    this.#formElements.errorMessage.style.display = "none";
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.#formElements.submitButton.disabled = true;
      this.#formElements.submitButton.textContent = "Registering...";
    } else {
      this.#formElements.submitButton.disabled = false;
      this.#formElements.submitButton.textContent = "Register";
    }
  }

  navigateToLogin() {
    window.location.hash = "#/login";
  }
}
