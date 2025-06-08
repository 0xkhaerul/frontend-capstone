// pages/otp-page.js
import VerifyPresenter from "../verify-otp/otp-presenter.js";

export default class OtpPage {
  #presenter;
  #countdownInterval;
  #remainingTime = 60; // Default 1 minute in seconds
  #formElements = {
    form: null,
    otpInput: null,
    submitButton: null,
    resendLink: null,
    countdownText: null,
    errorMessage: null,
    successMessage: null,
    emailDisplay: null,
  };

  constructor() {
    this.#presenter = new VerifyPresenter(this);

    // Initialize remainingTime from localStorage if available
    const savedTime = localStorage.getItem("otpCountdown");
    if (savedTime) {
      const { timestamp, duration } = JSON.parse(savedTime);
      const elapsed = Math.floor((Date.now() - timestamp) / 1000);
      this.#remainingTime = Math.max(0, duration - elapsed);
    }
  }

  async render() {
    const userEmail = this.#presenter.getUserEmail();
    const maskedEmail = this.#maskEmail(userEmail);

    return `
      <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" 
           style="background-image: url('/assets/images/background-image3.jpg'); background-size: cover; background-position: center;">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
            
            <!-- Header -->
            <div class="text-center mb-6">
              <div class="flex items-center justify-center mx-auto mb-4 text-blue-600">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-800 mb-2">Verifikasi OTP</h2>
              <p class="text-sm text-gray-600">
                Masukkan kode verifikasi 6 digit yang kami kirim ke
              </p>
              <p id="emailDisplay" class="text-sm font-medium text-blue-600">${maskedEmail}</p>
            </div>

            <!-- Messages -->
            <div id="errorMessage" class="hidden mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"></div>
            <div id="successMessage" class="hidden mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"></div>
            
            <!-- Form -->
            <form id="otpForm" class="space-y-6">
              <div>
                <label for="otpCode" class="block text-sm font-medium text-gray-700 mb-2">
                  Kode OTP
                </label>
                <input 
                  id="otpCode"
                  name="otpCode"
                  type="text"
                  maxlength="6"
                  placeholder="000000"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-lg tracking-widest"
                >
              </div>
              
              <div>
                <button type="submit" id="submitButton"
                  class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <span class="submit-text">Verifikasi</span>
                  <span class="loading-spinner hidden">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              
              <!-- Resend Section -->
              <div id="resendContainer" class="text-center">
                <p class="text-sm text-gray-500">
                  Tidak menerima kode? 
                  <a href="#" id="resendLink" class="text-blue-600 hover:text-blue-500 font-medium ${
                    this.#remainingTime > 0 ? "hidden" : ""
                  }">Kirim ulang</a>
                  <span id="countdownText" class="text-gray-500 font-medium ${
                    this.#remainingTime <= 0 ? "hidden" : ""
                  }">Kirim ulang dalam ${this.#formatTime(
      this.#remainingTime
    )}</span>
                </p>
              </div>
            </form>
            
            <!-- Back to Register -->
            <div class="mt-6 text-center">
              <a href="#/register" class="text-sm text-gray-500 hover:text-gray-700">
                ← Kembali ke halaman registrasi
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#initializeFormElements();
    this.#bindEventListeners();

    // Start the countdown if there's remaining time
    if (this.#remainingTime > 0) {
      this.#startCountdown();
    }

    // Focus on OTP input
    this.#formElements.otpInput.focus();
  }

  #initializeFormElements() {
    this.#formElements.form = document.getElementById("otpForm");
    this.#formElements.otpInput = document.getElementById("otpCode");
    this.#formElements.submitButton = document.getElementById("submitButton");
    this.#formElements.resendLink = document.getElementById("resendLink");
    this.#formElements.countdownText = document.getElementById("countdownText");
    this.#formElements.errorMessage = document.getElementById("errorMessage");
    this.#formElements.successMessage =
      document.getElementById("successMessage");
    this.#formElements.emailDisplay = document.getElementById("emailDisplay");
  }

  #bindEventListeners() {
    // Form submission
    this.#formElements.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const otpCode = this.#formElements.otpInput.value.trim();
      this.#presenter.handleVerifyOtp(otpCode);
    });

    // Resend OTP
    this.#formElements.resendLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.#presenter.handleResendOtp();
    });

    // Auto-format OTP input (numbers only)
    this.#formElements.otpInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });

    // Auto-submit when 6 digits entered
    this.#formElements.otpInput.addEventListener("input", (e) => {
      if (e.target.value.length === 6) {
        this.#formElements.form.dispatchEvent(new Event("submit"));
      }
    });
  }

  #maskEmail(email) {
    if (!email || !email.includes("@")) return email;

    const [localPart, domain] = email.split("@");
    const maskedLocal =
      localPart.length > 2
        ? localPart[0] +
          "*".repeat(localPart.length - 2) +
          localPart[localPart.length - 1]
        : localPart;

    return `${maskedLocal}@${domain}`;
  }

  #formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  #startCountdown() {
    localStorage.setItem(
      "otpCountdown",
      JSON.stringify({
        timestamp: Date.now(),
        duration: this.#remainingTime,
      })
    );

    this.#countdownInterval = setInterval(() => {
      this.#remainingTime--;

      localStorage.setItem(
        "otpCountdown",
        JSON.stringify({
          timestamp: Date.now() - (60 - this.#remainingTime) * 1000,
          duration: 60,
        })
      );

      this.#formElements.countdownText.textContent = `Kirim ulang dalam ${this.#formatTime(
        this.#remainingTime
      )}`;

      if (this.#remainingTime <= 0) {
        clearInterval(this.#countdownInterval);
        this.#formElements.countdownText.classList.add("hidden");
        this.#formElements.resendLink.classList.remove("hidden");
        localStorage.removeItem("otpCountdown");
      }
    }, 1000);
  }

  // View methods called by presenter
  showError(message) {
    this.#hideMessages();
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.classList.remove("hidden");
  }

  showSuccess(message) {
    this.#hideMessages();
    this.#formElements.successMessage.textContent = message;
    this.#formElements.successMessage.classList.remove("hidden");
  }

  showLoading(isLoading) {
    const submitText =
      this.#formElements.submitButton.querySelector(".submit-text");
    const loadingSpinner =
      this.#formElements.submitButton.querySelector(".loading-spinner");

    if (isLoading) {
      submitText.classList.add("hidden");
      loadingSpinner.classList.remove("hidden");
      this.#formElements.submitButton.disabled = true;
    } else {
      submitText.classList.remove("hidden");
      loadingSpinner.classList.add("hidden");
      this.#formElements.submitButton.disabled = false;
    }
  }

  resetCountdown() {
    this.#remainingTime = 60;
    clearInterval(this.#countdownInterval);

    this.#formElements.resendLink.classList.add("hidden");
    this.#formElements.countdownText.classList.remove("hidden");
    this.#formElements.countdownText.textContent = `Kirim ulang dalam ${this.#formatTime(
      this.#remainingTime
    )}`;

    this.#startCountdown();
  }

  #hideMessages() {
    this.#formElements.errorMessage.classList.add("hidden");
    this.#formElements.successMessage.classList.add("hidden");
  }
}
