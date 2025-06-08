import { verifyOtp, resendOtp } from "../../../data/api";

export default class VerifyPresenter {
  #view;
  #userEmail;

  constructor(view) {
    this.#view = view;
    // Get email from URL params or localStorage
    this.#userEmail = this.#getUserEmail();
  }

  #getUserEmail() {
    // Prioritas: localStorage > URL params > fallback
    const emailFromStorage = localStorage.getItem("userEmail");
    if (emailFromStorage) {
      return emailFromStorage;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get("email");
    if (emailFromUrl) {
      // Simpan ke localStorage jika dapat dari URL
      localStorage.setItem("userEmail", emailFromUrl);
      return emailFromUrl;
    }

    return "";
  }

  async handleVerifyOtp(otpCode) {
    if (!otpCode || otpCode.length !== 6) {
      this.#view.showError("Please enter a valid 6-digit OTP code");
      return;
    }

    // Refresh email dari localStorage sebelum verifikasi
    this.#userEmail = this.#getUserEmail();

    if (!this.#userEmail) {
      this.#view.showError("Email not found. Please register again.");
      return;
    }

    this.#view.showLoading(true);

    try {
      const result = await verifyOtp(this.#userEmail, otpCode);

      if (result.success) {
        this.#view.showSuccess(
          "Email verified successfully! Redirecting to login..."
        );

        // Clear stored email
        localStorage.removeItem("userEmail");
        localStorage.removeItem("otpCountdown");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.hash = "#/login"; // Gunakan hash routing
        }, 2000);
      } else {
        this.#view.showError(result.error || "Invalid OTP code");
      }
    } catch (error) {
      this.#view.showError("Network error. Please try again.");
      console.error("OTP verification error:", error);
    } finally {
      this.#view.showLoading(false);
    }
  }

  async handleResendOtp() {
    // Refresh email dari localStorage sebelum resend
    this.#userEmail = this.#getUserEmail();

    if (!this.#userEmail) {
      this.#view.showError("Email not found. Please register again.");
      return;
    }

    this.#view.showLoading(true);

    try {
      const result = await resendOtp(this.#userEmail);

      if (result.success) {
        this.#view.showSuccess("New OTP sent to your email!");
        this.#view.resetCountdown();
      } else {
        this.#view.showError(result.error || "Failed to resend OTP");
      }
    } catch (error) {
      this.#view.showError("Network error. Please try again.");
      console.error("Resend OTP error:", error);
    } finally {
      this.#view.showLoading(false);
    }
  }

  getUserEmail() {
    // Selalu ambil email terbaru dari localStorage
    this.#userEmail = this.#getUserEmail();
    return this.#userEmail;
  }
}
