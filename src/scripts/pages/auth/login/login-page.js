import LoginPresenter from "./login-presenter.js";

export default class LoginPage {
  #presenter;
  #formElements = {
    form: null,
    email: null,
    password: null,
    errorMessage: null,
    submitButton: null,
  };

  constructor() {
    this.#presenter = new LoginPresenter(this);
  }

  async render() {
    return `
    <section
      class="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg border border-red-500"
      style="box-shadow: 0 0 15px rgba(255, 0, 0, 0.5)"
    >
      <div class="header">
        <p class="text-xs text-red-500 text-center mb-2">*secure login*</p>
      </div>

      <h1
        class="text-2xl font-bold text-center mb-6 text-red-500 tracking-wider"
        style="text-shadow: 0 0 5px rgba(255, 0, 0, 0.7)"
      >
        ACCOUNT LOGIN
      </h1>

      <div class="auth-form-container">
        <form id="loginForm" class="creepy-form">
          <div class="form-control mb-4">
            <label for="email" class="block text-red-400 mb-1 text-sm">Email</label>
            <input
              id="email"
              name="email"
              type="email"
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
              placeholder="Enter your password"
              required
              class="w-full px-3 py-2 bg-gray-800 border border-red-900 rounded text-white focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            class="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded mt-4 transition duration-200"
          >
            Login
          </button>

          <div class="text-center text-gray-400 text-sm mt-4">
            <span>No account? </span>
            <a href="#/register" class="text-red-400 hover:text-red-300"
              >Register here</a
            >
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
    // Cache form elements
    this.#formElements = {
      form: document.getElementById("loginForm"),
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      errorMessage: document.getElementById("errorMessage"),
      submitButton: document.querySelector("#loginForm button[type='submit']"),
    };

    // Set up event listeners
    this.#formElements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.#presenter.handleLogin();
    });
  }

  getFormData() {
    return {
      email: this.#formElements.email.value,
      password: this.#formElements.password.value,
    };
  }

  showError(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "error-message";
  }

  clearError() {
    this.#formElements.errorMessage.textContent = "";
    this.#formElements.errorMessage.style.display = "none";
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.#formElements.submitButton.disabled = true;
      this.#formElements.submitButton.textContent = "Logging in...";
    } else {
      this.#formElements.submitButton.disabled = false;
      this.#formElements.submitButton.textContent = "Login";
    }
  }

  navigateTo(path) {
    window.location.hash = path;
  }
}
