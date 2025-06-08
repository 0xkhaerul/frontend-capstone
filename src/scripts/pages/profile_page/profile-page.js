// profile-page.js
import ProfilePresenter from "./profile-presenter.js";

export default class ProfilePage {
  #presenter;
  #elements = {
    loadingSpinner: null,
    errorMessage: null,
    errorText: null,
    retryBtn: null,
    profileInfo: null,
    headerName: null,
    headerEmail: null,
    userName: null,
    userEmail: null,
    userId: null,
    userCreated: null,
    userUpdated: null,
  };

  constructor() {
    this.#presenter = new ProfilePresenter(this);
  }

  async render() {
    return `
      <div class="max-w-2xl mx-auto p-6">   
        <!-- Content Container -->
        <div id="profile-content">
          <!-- Loading State -->
          <div class="loading flex flex-col items-center justify-center py-12" id="loading-spinner">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600">Loading profile...</p>
          </div>
          
          <!-- Error State -->
          <div class="error hidden" id="error-message">
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div class="flex justify-center mb-4">
                <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <p class="text-red-800 font-medium mb-4" id="error-text">Something went wrong</p>
              <button id="retry-btn" class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                Try Again
              </button>
            </div>
          </div>
          
          <!-- Profile Info -->
          <div class="profile-info hidden" id="profile-info">
            <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <!-- Profile Header -->
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
                <div class="flex items-center">
                  <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h2 class="text-2xl font-bold text-white" id="header-name">Loading...</h2>
                    <p class="text-blue-100" id="header-email">Loading...</p>
                  </div>
                </div>
              </div>
              
              <!-- Profile Details -->
              <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Name Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-name">Loading...</span>
                    </div>
                  </div>
                  
                  <!-- Email Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-email">Loading...</span>
                    </div>
                  </div>
                  
                  <!-- Member Since Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-created">Loading...</span>
                    </div>
                  </div>
                </div>
                
                <!-- Last Updated -->
                <div class="pt-4 border-t border-gray-200">
                  <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>Last updated:</span>
                    <span id="user-updated" class="font-medium">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#initializeElements();
    this.#bindEvents();
    await this.#presenter.init();
  }

  #initializeElements() {
    this.#elements.loadingSpinner = document.getElementById("loading-spinner");
    this.#elements.errorMessage = document.getElementById("error-message");
    this.#elements.errorText = document.getElementById("error-text");
    this.#elements.retryBtn = document.getElementById("retry-btn");
    this.#elements.profileInfo = document.getElementById("profile-info");
    this.#elements.headerName = document.getElementById("header-name");
    this.#elements.headerEmail = document.getElementById("header-email");
    this.#elements.userName = document.getElementById("user-name");
    this.#elements.userEmail = document.getElementById("user-email");
    this.#elements.userId = document.getElementById("user-id");
    this.#elements.userCreated = document.getElementById("user-created");
    this.#elements.userUpdated = document.getElementById("user-updated");
  }

  #bindEvents() {
    if (this.#elements.retryBtn) {
      this.#elements.retryBtn.addEventListener("click", () => {
        this.#presenter.handleRetry();
      });
    }
  }

  showLoading() {
    this.#hideAll();
    this.#elements.loadingSpinner?.classList.remove("hidden");
  }

  showError(errorMessage) {
    this.#hideAll();
    if (this.#elements.errorText) {
      this.#elements.errorText.textContent = errorMessage;
    }
    this.#elements.errorMessage?.classList.remove("hidden");
  }

  showProfile(user) {
    this.#hideAll();

    if (user) {
      // Update header
      if (this.#elements.headerName) {
        this.#elements.headerName.textContent = user.name || "Unknown User";
      }
      if (this.#elements.headerEmail) {
        this.#elements.headerEmail.textContent =
          user.email || "No email provided";
      }

      // Update profile fields
      if (this.#elements.userName) {
        this.#elements.userName.textContent = user.name || "N/A";
      }
      if (this.#elements.userEmail) {
        this.#elements.userEmail.textContent = user.email || "N/A";
      }
      if (this.#elements.userId) {
        this.#elements.userId.textContent = user.id || "N/A";
      }

      // Format dates
      if (this.#elements.userCreated) {
        const createdDate = user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "N/A";
        this.#elements.userCreated.textContent = createdDate;
      }

      if (this.#elements.userUpdated) {
        const updatedDate = user.updatedAt
          ? new Date(user.updatedAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A";
        this.#elements.userUpdated.textContent = updatedDate;
      }
    }

    this.#elements.profileInfo?.classList.remove("hidden");
  }

  #hideAll() {
    this.#elements.loadingSpinner?.classList.add("hidden");
    this.#elements.errorMessage?.classList.add("hidden");
    this.#elements.profileInfo?.classList.add("hidden");
  }
}
