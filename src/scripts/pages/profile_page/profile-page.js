// profile-page.js (Merged version)
import ProfilePresenter from "./profile-presenter.js";

export default class ProfilePage {
  #presenter;
  #elements = {
    // Profile elements
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
    // History elements
    tabRetinaBtn: null,
    tabFormBtn: null,
    historyContainer: null,
    paginationControls: null,
    prevBtn: null,
    nextBtn: null,
    pageIndicator: null,
  };

  // Private fields for history functionality
  #activeTab = "retina";
  #retinaHistory = [];
  #formHistory = [];
  #retinaCurrentPage = 1;
  #formCurrentPage = 1;
  #itemsPerPage = 3;

  constructor() {
    this.#presenter = new ProfilePresenter(this);
  }

  async render() {
    return `
      <div class="max-w-4xl mx-auto p-6">   
        <!-- Profile Content Container -->
        <div id="profile-content" class="mb-8">
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

        <!-- History Section -->
        <div class="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-6 md:p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">My Check History</h2>
            
            <div class="flex border-b border-gray-200 mb-4">
              <button id="tab-retina" class="tab-button flex-1 py-2 text-center font-medium border-b-2">
                Retina Checks
              </button>
              <button id="tab-form" class="tab-button flex-1 py-2 text-center font-medium border-b-2">
                Form Checks
              </button>
            </div>

            <div id="history-content-container" class="space-y-4 min-h-[300px]">
            </div>

            <div id="pagination-controls" class="flex justify-between items-center mt-6 hidden">
              <button id="prev-page-btn" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <span id="page-indicator" class="text-sm text-gray-600"></span>
              <button id="next-page-btn" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for check details -->
      <div id="profile-check-details-modal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50 hidden">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 z-10">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-800" id="modal-title">Check Details</h3>
              <button id="modal-close-button" class="text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
            </div>
          </div>
          <div id="modal-content-area" class="p-6"></div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#initializeElements();
    this.#bindEvents();
    await this.#presenter.init();
    await this.#setActiveTab("retina");
  }

  #initializeElements() {
    // Profile elements
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

    // History elements
    this.#elements.tabRetinaBtn = document.getElementById("tab-retina");
    this.#elements.tabFormBtn = document.getElementById("tab-form");
    this.#elements.historyContainer = document.getElementById(
      "history-content-container"
    );
    this.#elements.paginationControls = document.getElementById(
      "pagination-controls"
    );
    this.#elements.prevBtn = document.getElementById("prev-page-btn");
    this.#elements.nextBtn = document.getElementById("next-page-btn");
    this.#elements.pageIndicator = document.getElementById("page-indicator");
  }

  #bindEvents() {
    // Profile events
    if (this.#elements.retryBtn) {
      this.#elements.retryBtn.addEventListener("click", () => {
        this.#presenter.handleRetry();
      });
    }

    // History events
    this.#elements.tabRetinaBtn?.addEventListener("click", () =>
      this.#setActiveTab("retina")
    );
    this.#elements.tabFormBtn?.addEventListener("click", () =>
      this.#setActiveTab("form")
    );
    this.#elements.prevBtn?.addEventListener("click", () =>
      this.#changePage(-1)
    );
    this.#elements.nextBtn?.addEventListener("click", () =>
      this.#changePage(1)
    );

    // Modal events
    const modal = document.getElementById("profile-check-details-modal");
    const modalCloseButton = document.getElementById("modal-close-button");
    if (modal && modalCloseButton) {
      modalCloseButton.addEventListener("click", () =>
        modal.classList.add("hidden")
      );
      modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.classList.add("hidden");
      });
    }
  }

  // Profile methods (from Ilman's code)
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

  async #setActiveTab(tabName) {
    this.#activeTab = tabName;

    if (tabName === "retina") {
      this.#elements.tabRetinaBtn?.classList.add(
        "text-blue-600",
        "border-blue-600"
      );
      this.#elements.tabRetinaBtn?.classList.remove(
        "text-gray-500",
        "hover:text-gray-700",
        "border-transparent"
      );
      this.#elements.tabFormBtn?.classList.add(
        "text-gray-500",
        "hover:text-gray-700",
        "border-transparent"
      );
      this.#elements.tabFormBtn?.classList.remove(
        "text-blue-600",
        "border-blue-600"
      );

      if (this.#retinaHistory.length === 0) {
        this.#elements.historyContainer.innerHTML =
          '<p class="text-center text-gray-500 animate-pulse pt-10">Loading retina history...</p>';
        try {
          // PERBAIKAN: Menggunakan presenter untuk load data
          const history = await this.#presenter.loadRetinaHistory();
          this.#retinaHistory = history;
        } catch (error) {
          this.#elements.historyContainer.innerHTML = `<p class="text-center text-red-500 pt-10">Error loading retina history: ${error.message}</p>`;
          return;
        }
      }
      this.#retinaCurrentPage = 1;
      this.#renderCurrentPageItems();
    } else {
      // PERBAIKAN: Menggunakan this.#elements untuk akses DOM
      this.#elements.tabFormBtn?.classList.add(
        "text-blue-600",
        "border-blue-600"
      );
      this.#elements.tabFormBtn?.classList.remove(
        "text-gray-500",
        "hover:text-gray-700",
        "border-transparent"
      );
      this.#elements.tabRetinaBtn?.classList.add(
        "text-gray-500",
        "hover:text-gray-700",
        "border-transparent"
      );
      this.#elements.tabRetinaBtn?.classList.remove(
        "text-blue-600",
        "border-blue-600"
      );

      if (this.#formHistory.length === 0) {
        this.#elements.historyContainer.innerHTML =
          '<p class="text-center text-gray-500 animate-pulse pt-10">Loading form history...</p>';
        try {
          // PERBAIKAN: Menggunakan presenter untuk load data
          const history = await this.#presenter.loadFormHistory();
          this.#formHistory = history;
        } catch (error) {
          this.#elements.historyContainer.innerHTML = `<p class="text-center text-red-500 pt-10">Error loading form history: ${error.message}</p>`;
          return;
        }
      }
      this.#formCurrentPage = 1;
      this.#renderCurrentPageItems();
    }
  }

  #renderCurrentPageItems() {
    let historyData, currentPage;

    if (this.#activeTab === "retina") {
      historyData = this.#retinaHistory;
      currentPage = this.#retinaCurrentPage;
    } else {
      historyData = this.#formHistory;
      currentPage = this.#formCurrentPage;
    }

    this.#elements.historyContainer.innerHTML = "";

    if (!historyData || historyData.length === 0) {
      this.#elements.historyContainer.innerHTML = `<p class="text-gray-500 p-4 text-center pt-10">No ${
        this.#activeTab
      } check history found.</p>`;
      this.#elements.paginationControls?.classList.add("hidden");
      return;
    }

    const totalPages = Math.ceil(historyData.length / this.#itemsPerPage);
    const startIndex = (currentPage - 1) * this.#itemsPerPage;
    const endIndex = startIndex + this.#itemsPerPage;
    const pageItems = historyData.slice(startIndex, endIndex);

    pageItems.forEach((item) => {
      let itemDiv;
      if (this.#activeTab === "retina") {
        itemDiv = this.#createRetinaItemElement(item);
      } else {
        itemDiv = this.#createFormItemElement(item);
      }
      this.#elements.historyContainer.appendChild(itemDiv);
    });

    this.#updatePagination(currentPage, totalPages);
  }

  // Perbaikan untuk function updatePagination (baris 460-470)
  #updatePagination(currentPage, totalPages) {
    if (totalPages <= 1) {
      this.#elements.paginationControls?.classList.add("hidden");
      return;
    }

    this.#elements.paginationControls?.classList.remove("hidden");
    if (this.#elements.pageIndicator) {
      this.#elements.pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    if (this.#elements.prevBtn) {
      this.#elements.prevBtn.disabled = currentPage === 1;
    }
    if (this.#elements.nextBtn) {
      this.#elements.nextBtn.disabled = currentPage === totalPages;
    }
  }

  #changePage(direction) {
    if (this.activeTab === "retina") {
      const totalPages = Math.ceil(
        this.retinaHistory.length / this.itemsPerPage
      );
      const newPage = this.retinaCurrentPage + direction;
      if (newPage >= 1 && newPage <= totalPages) {
        this.retinaCurrentPage = newPage;
      }
    } else {
      const totalPages = Math.ceil(this.formHistory.length / this.itemsPerPage);
      const newPage = this.formCurrentPage + direction;
      if (newPage >= 1 && newPage <= totalPages) {
        this.formCurrentPage = newPage;
      }
    }

    this.renderCurrentPageItems();
  }

  #createRetinaItemElement(checkDataFromApi) {
    const displayData = {
      image: { url: checkDataFromApi.image },
      prediction: {
        class: checkDataFromApi.predictedClass,
        confidence: checkDataFromApi.confidenceClass,
      },
      savedAt: new Date(checkDataFromApi.createdAt),
      id: checkDataFromApi.id, // Add ID for delete functionality
    };
    const confidencePercentage = (
      displayData.prediction.confidence * 100
    ).toFixed(2);
    const isNoDr = displayData.prediction.class === "No_Dr";
    const conditionText = isNoDr
      ? "No Diabetic Retinopathy Detected"
      : "Diabetic Retinopathy Detected";
    const conditionTagClass = isNoDr
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
    const conditionTextClass = isNoDr ? "text-green-700" : "text-red-700";

    const itemDiv = document.createElement("div");
    itemDiv.className =
      "bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4";
    itemDiv.innerHTML = `
      <div class="flex-1 cursor-pointer hover:bg-gray-100 transition-colors rounded p-2 -m-2" data-view-details="true">
        <div class="flex justify-between items-start mb-2">
          <p class="text-xs text-gray-500 font-medium">${new Date(
            displayData.savedAt
          ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
          <span class="px-2 py-1 text-xs rounded-full font-semibold ${conditionTagClass}">${
      isNoDr ? "Normal" : "Retinopathy"
    }</span>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 items-center">
          <img src="${
            displayData.image.url
          }" alt="Retina Scan" class="w-20 h-20 object-cover rounded border border-gray-300">
          <div class="flex-1 text-sm">
            <p class="font-semibold ${conditionTextClass}">${conditionText}</p>
            <p class="text-gray-600">Confidence: ${confidencePercentage}%</p>
          </div>
        </div>
      </div>
      <!-- Action Buttons Container -->
      <div class="flex flex-col items-center justify-center gap-3 px-4 border-l border-gray-200">
        <button 
          class="delete-btn p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" 
          title="Delete"
          data-id="${displayData.id}"
          data-type="retina"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>`;

    // Add click event for view details (only for the main content area)
    const viewDetailsArea = itemDiv.querySelector('[data-view-details="true"]');
    viewDetailsArea.addEventListener("click", () =>
      this.#showRetinaDetailsModal(displayData)
    );

    // Add click event for delete button
    const deleteBtn = itemDiv.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering view details
      this.#handleDeleteItem(displayData.id, "retina", deleteBtn);
    });

    return itemDiv;
  }

  #createFormItemElement(checkDataFromApi) {
    const displayData = {
      inputData: {
        gender: checkDataFromApi.gender,
        age: checkDataFromApi.age,
        hypertension: checkDataFromApi.hypertension ? "1" : "0",
        bmi: checkDataFromApi.bmi,
        blood_glucose_level: checkDataFromApi.bloodGlucoseLevel,
        HbA1c_level: checkDataFromApi.hba1cLevel,
        smoking_history: checkDataFromApi.smokingHistory,
      },
      prediction: {
        result: checkDataFromApi.predictionResult === "positive" ? 1 : 0,
        resultText: checkDataFromApi.predictionResult,
      },
      message: checkDataFromApi.predictionMessage,
      recordId: checkDataFromApi.id,
      timestamp: new Date(checkDataFromApi.createdAt),
      id: checkDataFromApi.id, // Add ID for delete functionality
    };
    const isHighRisk = displayData.prediction.result === 1;
    const riskText = isHighRisk ? "High Risk" : "Low Risk";
    const riskUiClass = isHighRisk ? "text-red-700" : "text-green-700";
    const riskBgClass = isHighRisk
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";

    const itemDiv = document.createElement("div");
    itemDiv.className =
      "bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4";
    itemDiv.innerHTML = `
      <div class="flex-1 cursor-pointer hover:bg-gray-100 transition-colors rounded p-2 -m-2" data-view-details="true">
        <div class="flex justify-between items-center mb-1">
          <p class="text-xs text-gray-500 font-medium">${new Date(
            displayData.timestamp
          ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
          <span class="px-2 py-1 text-xs rounded-full font-semibold ${riskBgClass}">${
      displayData.prediction.resultText === "positive" ? "Positive" : "Negative"
    }</span>
        </div>
        <p class="text-md font-semibold ${riskUiClass}">${riskText}</p>
        <p class="text-sm text-gray-600 truncate mt-1">${
          displayData.message
        }</p>
      </div>
      <!-- Action Buttons Container -->
      <div class="flex flex-col items-center justify-center gap-3 px-4 border-l border-gray-200">
        <button 
          class="delete-btn p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" 
          title="Delete"
          data-id="${displayData.id}"
          data-type="form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>`;

    // Add click event for view details (only for the main content area)
    const viewDetailsArea = itemDiv.querySelector('[data-view-details="true"]');
    viewDetailsArea.addEventListener("click", () =>
      this.#showFormDetailsModal(displayData)
    );

    // Add click event for delete button
    const deleteBtn = itemDiv.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering view details
      this.#handleDeleteItem(displayData.id, "form", deleteBtn);
    });

    return itemDiv;
  }

  // Add this new method to handle delete functionality
  async #handleDeleteItem(itemId, type, buttonElement) {
    try {
      // Show loading state on the button
      const originalContent = buttonElement.innerHTML;
      buttonElement.innerHTML = `
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;
      buttonElement.disabled = true;
      buttonElement.classList.add("opacity-50", "cursor-not-allowed");

      // Call the delete API through presenter
      await this.#presenter.deleteHistoryItem(itemId, type);

      // Update local arrays immediately after successful delete
      if (type === "retina") {
        this.#retinaHistory = this.#retinaHistory.filter(
          (item) => item.id !== itemId
        );
      } else if (type === "form") {
        this.#formHistory = this.#formHistory.filter(
          (item) => item.id !== itemId
        );
      }

      // Remove the item from the DOM with animation
      const itemElement = buttonElement.closest(".bg-gray-50");
      itemElement.style.transition = "all 0.3s ease-out";
      itemElement.style.transform = "translateX(100%)";
      itemElement.style.opacity = "0";

      setTimeout(() => {
        itemElement.remove();
        // Re-render current page to update pagination and layout
        this.#renderCurrentPageItems();
      }, 300);
    } catch (error) {
      console.error("Error deleting item:", error);

      // Restore button state
      buttonElement.innerHTML = originalContent;
      buttonElement.disabled = false;
      buttonElement.classList.remove("opacity-50", "cursor-not-allowed");

      // Show error message
      alert("Failed to delete item. Please try again.");
    }
  }

  // --- KODE MODAL YANG DIPERBAIKI ---
  #showRetinaDetailsModal(data) {
    const modal = document.getElementById("profile-check-details-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalContentArea = document.getElementById("modal-content-area");
    if (!modal || !modalTitle || !modalContentArea) return;

    modalTitle.textContent = "Retina Check Details";
    const confidencePercentage = (data.prediction.confidence * 100).toFixed(2);
    const isNoDr = data.prediction.class === "No_Dr";
    const conditionText = isNoDr
      ? "No Diabetic Retinopathy Detected"
      : "Diabetic Retinopathy Detected";
    const conditionClass = isNoDr ? "text-green-600" : "text-red-600";
    const recommendation = isNoDr
      ? "No signs of diabetic retinopathy were detected in your retina image. However, regular check-ups are still recommended."
      : "Potential signs of diabetic retinopathy were detected. Please consult with an ophthalmologist for further evaluation.";

    modalContentArea.innerHTML = `
        <div class="space-y-4">
            <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="flex-1 w-full md:w-auto text-center md:text-left">
                    <h4 class="text-lg font-medium text-gray-700 mb-2">Retina Image</h4>
                    <img src="${
                      data.image.url
                    }" alt="Analyzed retina" class="w-full max-w-xs mx-auto md:mx-0 h-auto rounded-lg border border-gray-200 shadow-md">
                </div>
                <div class="flex-1">
                    <h4 class="text-lg font-medium text-gray-700 mb-2">Diagnosis</h4>
                    <div class="space-y-3 bg-gray-50 p-4 rounded-lg">
                        <div>
                            <p class="text-sm text-gray-600">Condition</p>
                            <p class="text-lg font-semibold ${conditionClass}">${conditionText}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Confidence Level</p>
                            <p class="text-lg font-semibold text-gray-800">${confidencePercentage}%</p>
                            <div class="w-full bg-gray-300 rounded-full h-2.5 mt-1">
                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${confidencePercentage}%"></div>
                            </div>
                        </div>
                         <p class="text-xs text-gray-500 mt-3">Checked on: ${new Date(
                           data.savedAt
                         ).toLocaleString("en-GB", {
                           year: "numeric",
                           month: "long",
                           day: "numeric",
                           hour: "2-digit",
                           minute: "2-digit",
                         })}</p>
                    </div>
                </div>
            </div>
            <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                 <h4 class="text-md font-semibold text-blue-800 mb-1">Recommendation</h4>
                <p class="text-sm text-blue-700">${recommendation}</p>
            </div>
        </div>
    `;
    modal.classList.remove("hidden");
    modalContentArea.scrollTop = 0;
  }

  #showFormDetailsModal(data) {
    const modal = document.getElementById("profile-check-details-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalContentArea = document.getElementById("modal-content-area");
    if (!modal || !modalTitle || !modalContentArea) return;

    modalTitle.textContent = "Diabetes Form Check Details";
    const isHighRisk = data.prediction.result === 1;
    const riskText = isHighRisk ? "High Risk" : "Low Risk";
    const riskUiClass = isHighRisk ? "text-red-800" : "text-green-800";
    const riskBgClass = isHighRisk
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";
    const riskBorderPillClass = isHighRisk
      ? "bg-red-50 border border-red-200"
      : "bg-green-50 border border-green-200";

    const formatInputItem = (label, value) => `
        <li class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span class="text-gray-600 text-sm">${label}:</span>
            <span class="font-medium capitalize text-gray-800 text-sm text-right">${
              value !== undefined && value !== null ? value : "N/A"
            }</span>
        </li>`;

    const inputDataHtml = `
        <ul class="space-y-0">
            ${formatInputItem("Gender", data.inputData.gender)}
            ${formatInputItem("Age", `${data.inputData.age} years`)}
            ${formatInputItem(
              "Hypertension",
              data.inputData.hypertension === "1" ? "Yes" : "No"
            )}
            ${formatInputItem(
              "Heart Disease",
              data.inputData.heart_disease === "1" ? "Yes" : "No"
            )}
            ${formatInputItem("BMI", data.inputData.bmi)}
            ${formatInputItem(
              "Blood Glucose",
              `${data.inputData.blood_glucose_level} mg/dL`
            )}
            ${formatInputItem("HbA1c Level", `${data.inputData.HbA1c_level}%`)}
            ${formatInputItem(
              "Smoking History",
              data.inputData.smoking_history
            )}
        </ul>
    `;

    modalContentArea.innerHTML = `
        <div class="space-y-6">
            <div>
                <h4 class="text-lg font-semibold text-gray-700 mb-2">Input Data</h4>
                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    ${inputDataHtml}
                </div>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-gray-700 mb-2">Diagnosis & Recommendation</h4>
                <div class="p-4 rounded-lg ${riskBorderPillClass}">
                    <div class="flex items-center justify-between">
                        <h5 class="text-md font-semibold ${riskUiClass}">${riskText}</h5>
                        <span class="px-3 py-1 rounded-full text-xs font-medium ${riskBgClass}">
                            ${
                              data.prediction.resultText === "positive"
                                ? "Positive"
                                : "Negative"
                            }
                        </span>
                    </div>
                    <p class="mt-2 text-sm ${
                      isHighRisk ? "text-red-700" : "text-green-700"
                    }">
                        ${data.message}
                    </p>
                </div>
                <div class="text-xs text-gray-500 mt-3">
                    <p>Assessment ID: ${data.recordId}</p>
                    <p>Checked on: ${new Date(data.timestamp).toLocaleString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}</p>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove("hidden");
    modalContentArea.scrollTop = 0;
  }
}
