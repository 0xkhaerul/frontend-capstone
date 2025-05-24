// diabetes-page.js
import DiabetesPresenterUser from "./diabetes-user-presenter.js";

export default class DiabetesPageUser {
  #presenter;
  #elements = {
    form: null,
    fileInput: null,
    resultContainer: null,
    historyContainer: null,
  };

  constructor() {
    this.#presenter = new DiabetesPresenterUser(this);
  }

  async render() {
    return `
    <section class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">User Diabetes Retina Check</h1>
        <p class="text-gray-600 mb-6">Upload an image of your retina to check for signs of diabetic retinopathy.</p>
        
        <form id="diabetesForm" class="space-y-4">
          <div class="flex items-center justify-center w-full">
            <label for="retinaImage" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500">JPG or PNG (MAX. 5MB)</p>
              </div>
              <input id="retinaImage" name="file" type="file" class="hidden" accept="image/*" required />
            </label>
          </div>
          
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Analyze Retina Image
          </button>
        </form>

        <!-- Cache Controls -->
        <div class="mt-4 flex gap-2">
          <button id="showHistoryBtn" class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
            Show History
          </button>
          <button id="clearCacheBtn" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
            Clear Cache
          </button>
        </div>
      </div>

      <div id="result" class="mt-6 hidden">
        <!-- Results will be displayed here -->
      </div>

      <div id="history" class="mt-6 hidden">
        <!-- History will be displayed here -->
      </div>
    </section>
    `;
  }

  async afterRender() {
    this.#elements = {
      form: document.getElementById("diabetesForm"),
      fileInput: document.getElementById("retinaImage"),
      resultContainer: document.getElementById("result"),
      historyContainer: document.getElementById("history"),
    };

    // Load cached data on page load
    await this.#presenter.loadCachedData();

    // Show file name when selected
    this.#elements.fileInput.addEventListener("change", (e) => {
      const fileName = e.target.files[0]?.name;
      if (fileName) {
        const uploadLabel = document.querySelector('label[for="retinaImage"]');
        const existingFileName = uploadLabel.querySelector(".file-name");

        if (existingFileName) {
          existingFileName.textContent = fileName;
        } else {
          const fileNameElement = document.createElement("p");
          fileNameElement.className =
            "file-name mt-2 text-sm font-medium text-gray-700";
          fileNameElement.textContent = fileName;
          uploadLabel.querySelector("div").appendChild(fileNameElement);
        }
      }
    });

    // Form submission
    this.#elements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = this.#elements.fileInput.files[0];
      if (file) {
        await this.#presenter.handleFileUpload(file);
      }
    });

    // Show history button
    document
      .getElementById("showHistoryBtn")
      .addEventListener("click", async () => {
        await this.showHistory();
      });

    // Clear cache button
    document
      .getElementById("clearCacheBtn")
      .addEventListener("click", async () => {
        if (confirm("Are you sure you want to clear all cached predictions?")) {
          await this.#presenter.clearCache();
        }
      });
  }

  showLoading() {
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-center space-x-2">
          <div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-700">Analyzing retina image...</p>
        </div>
      </div>
    `;
  }

  displayResults(data, isCached = false) {
    const cacheIndicator = isCached ? `` : "";

    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 class="text-2xl font-bold text-gray-800">Analysis Results</h2>
        ${cacheIndicator}
        
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-700 mb-2">Retina Image</h3>
            <img src="${
              data.image?.url || data.originalFile?.data || ""
            }" alt="Analyzed retina" class="w-full h-auto rounded-lg border border-gray-200">
          </div>
          
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-700 mb-2">Diagnosis</h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500">Condition</p>
                <p class="text-lg font-semibold ${
                  data.prediction.class === "No_Dr"
                    ? "text-green-600"
                    : "text-red-600"
                }">
                  ${
                    data.prediction.class === "No_Dr"
                      ? "No Diabetic Retinopathy Detected"
                      : "Diabetic Retinopathy Detected"
                  }
                </p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Confidence Level</p>
                <p class="text-lg font-semibold text-gray-800">
                  ${(data.prediction.confidence * 100).toFixed(2)}%
                </p>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${
                    data.prediction.confidence * 100
                  }%"></div>
                </div>
              </div>

              ${
                data.timestamp
                  ? `
              <div>
                <p class="text-sm text-gray-500">Analysis Date</p>
                <p class="text-sm text-gray-700">
                  ${new Date(data.timestamp).toLocaleString()}
                </p>
              </div>
              `
                  : ""
              }
            </div>
            
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <p class="text-sm text-blue-800">
                ${
                  data.prediction.class === "No_Dr"
                    ? "No signs of diabetic retinopathy were detected in your retina image. However, regular check-ups are still recommended."
                    : "Potential signs of diabetic retinopathy were detected. Please consult with an ophthalmologist for further evaluation."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  displayCachedResults(data) {
    if (data) {
      this.displayResults(data, true);
    }
  }

  async showHistory() {
    const predictions = await this.#presenter.getAllCachedPredictions();

    if (predictions.length === 0) {
      this.#elements.historyContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Prediction History</h2>
          <p class="text-gray-600">No cached predictions found.</p>
        </div>
      `;
    } else {
      const historyHTML = predictions
        .map(
          (prediction, index) => `
        <div class="bg-white rounded-lg shadow-md p-4 mb-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-medium text-gray-800">
              ${prediction.originalFile?.name || `Prediction ${index + 1}`}
            </h3>
            <span class="text-sm text-gray-500">
              ${new Date(prediction.timestamp).toLocaleString()}
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <img src="${
                prediction.originalFile?.data || prediction.image?.url
              }" 
                   alt="Retina scan" 
                   class="w-full h-32 object-cover rounded-lg">
            </div>
            <div>
              <p class="text-sm text-gray-500">Diagnosis</p>
              <p class="font-semibold ${
                prediction.prediction.class === "No_Dr"
                  ? "text-green-600"
                  : "text-red-600"
              }">
                ${
                  prediction.prediction.class === "No_Dr"
                    ? "No DR Detected"
                    : "DR Detected"
                }
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Confidence</p>
              <p class="font-semibold">${(
                prediction.prediction.confidence * 100
              ).toFixed(2)}%</p>
            </div>
          </div>
        </div>
      `
        )
        .join("");

      this.#elements.historyContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Prediction History (${predictions.length})</h2>
          ${historyHTML}
        </div>
      `;
    }

    this.#elements.historyContainer.classList.remove("hidden");
  }

  showCacheCleared() {
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
        <p class="font-bold">Success</p>
        <p>Cache cleared successfully.</p>
      </div>
    `;
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.historyContainer.classList.add("hidden");
  }

  displayError(error) {
    console.error("Error:", error);
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p class="font-bold">Error</p>
        <p>Failed to analyze the retina image. Please try again later.</p>
      </div>
    `;
  }
}
