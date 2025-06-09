// diabetes-page.js
import DiabetesPresenterUser from "./diabetes-user-presenter.js";
import { DiabetesDisplayResult } from "../../utils/indexeddb.js";

export default class DiabetesPageUser {
  #presenter;
  #elements = {
    form: null,
    fileInput: null,
    resultContainer: null,
  };

  constructor() {
    this.#presenter = new DiabetesPresenterUser(this);
  }

  async render() {
    return `
    <section class="min-h-screen min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50s pt-8">
      <div class="container mx-auto max-w-3xl">
        <!-- Header Navigation -->
        <div class="flex flex-col sm:flex-row gap-8 mb-8">
          <div id="form-check-page" class="group bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl p-1 flex-1 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div class="bg-white rounded-xl p-4 h-full flex justify-center items-center group-hover:bg-opacity-90 transition-all duration-300">
              <div class="text-center">
                <span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Form Check</span>
              </div>
            </div>
          </div>
          
          <div id="retina-check-page" class="group bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-1 flex-1 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div class="bg-white rounded-xl p-4 h-full flex justify-center items-center group-hover:bg-opacity-90 transition-all duration-300">
              <div class="text-center">
                <span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Check Retina</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Upload Container -->
        <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl p-1 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
          <div class="bg-white rounded-xl p-8">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 mb-4">
                Diabetes Retina Check
              </h1>
              <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                Upload a high-quality retina image to detect signs of diabetic retinopathy using advanced AI analysis.
              </p>
            </div>
            
            <form id="diabetesForm" class="space-y-8">
              <!-- Enhanced File Upload Area -->
              <div class="flex items-center justify-center w-full">
                <label for="retinaImage" class="group relative flex flex-col items-center justify-center w-full h-80 border-4 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 hover:border-purple-400 transition-all duration-500 overflow-hidden">
                  <!-- Background Pattern -->
                  <div class="absolute inset-0 opacity-5">
                    <div class="absolute top-4 left-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                    <div class="absolute top-12 right-8 w-6 h-6 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                    <div class="absolute bottom-8 left-12 w-4 h-4 bg-green-500 rounded-full animate-pulse delay-200"></div>
                    <div class="absolute bottom-4 right-4 w-10 h-10 bg-pink-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                  
                  <!-- Upload Content -->
                  <div class="relative z-10 flex flex-col items-center justify-center pt-8 pb-8 px-6 text-center">
                    <!-- Upload Icon with Animation -->
                    <div class="mb-6 relative">
                      <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                      </div>
                      <!-- Floating particles -->
                      <div class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                    
                    <!-- Upload Text -->
                    <div class="space-y-2">
                      <p class="text-xl font-bold text-gray-700 group-hover:text-purple-700 transition-colors">
                        Click to upload or drag & drop
                      </p>
                      <p class="text-sm text-gray-500 font-medium">
                        High-quality retina images work best
                      </p>
                      <div class="flex items-center justify-center space-x-4 mt-4">
                        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">JPG</span>
                        <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">PNG</span>
                        <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">MAX 5MB</span>
                      </div>
                    </div>
                  </div>
                  
                  <input id="retinaImage" name="file" type="file" class="hidden" accept="image/*" required />
                </label>
              </div>
              
              <!-- Submit Button -->
              <div class="flex justify-center">
                <button type="submit" class="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600 text-white font-bold py-2 px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-purple-300">
                  <span class="flex items-center justify-center">
                    Analyze Retina Image
                  </span>
                  <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Results Container -->
        <div id="result" class="mt-8 hidden">
          <!-- Results will be displayed here -->
        </div>
      </div>
    </section>
    `;
  }

  async afterRender() {
    this.#elements = {
      form: document.getElementById("diabetesForm"),
      fileInput: document.getElementById("retinaImage"),
      resultContainer: document.getElementById("result"),
      formCheckPage: document.getElementById("form-check-page"),
      retinaCheckPage: document.getElementById("retina-check-page"),
    };

    await this.#loadLastResultFromIndexedDB();

    // Add click event listeners for navigation
    this.#elements.formCheckPage.addEventListener("click", () => {
      window.location.hash = "#/diabetes-form-checked-user";
    });

    this.#elements.retinaCheckPage.addEventListener("click", () => {
      window.location.hash = "#/diabetes-checked-user";
    });

    // Enhanced file selection display
    this.#elements.fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const uploadLabel = document.querySelector('label[for="retinaImage"]');
        const reader = new FileReader();
        
        reader.onload = (event) => {
          uploadLabel.innerHTML = `
            <div class="relative z-10 flex flex-col items-center justify-center pt-4 pb-4 px-6 text-center">
              <div class="mb-4 relative">
                <img src="${event.target.result}" alt="Selected retina image" class="w-32 h-32 object-cover rounded-2xl shadow-lg border-4 border-white">
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm">✓</span>
                </div>
              </div>
              <div class="space-y-2">
                <p class="text-lg font-bold text-green-700">
                  <span class="text-xl mr-2">✅</span>
                  Image Ready for Analysis
                </p>
                <p class="text-sm text-gray-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  ${file.name}
                </p>
                <p class="text-xs text-gray-500">
                  File size: ${(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          `;
        };
        
        reader.readAsDataURL(file);
      }
    });

    this.#elements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = this.#elements.fileInput.files[0];
      if (file) {
        this.#presenter.handleFileUpload(file);
      }
    });
  }

  showLoading() {
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl p-1 shadow-2xl">
        <div class="bg-white rounded-xl p-8">
          <div class="flex flex-col items-center justify-center space-y-6">
            <!-- Enhanced Loading Animation -->
            <div class="relative">
              <div class="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin"></div>
              <div class="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <div class="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animate-reverse"></div>
              <div class="absolute top-6 left-6 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-700 mb-2">🔬 AI Analysis in Progress</p>
              <p class="text-gray-600 mb-4">Processing your retina image for diabetic retinopathy detection...</p>
              <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                <div class="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  displayResults(data, saveToIndexedDB = true) {
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl p-1 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
        <div class="bg-white rounded-xl p-8">
          <div class="text-center mb-8">
            <div class="text-5xl mb-4">🩺</div>
            <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
              Analysis Results
            </h2>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Image Section -->
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-gray-800 flex items-center">
                <span class="text-blue-500 mr-2">📸</span>
                Analyzed Retina Image
              </h3>
              <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div class="relative bg-white p-4 rounded-2xl">
                  <img src="${data.image.url}" alt="Analyzed retina" class="w-full h-auto rounded-xl shadow-lg border-2 border-gray-100">
                  <div class="absolute top-6 right-6 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span class="text-xs font-medium text-gray-700">AI Analyzed</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Results Section -->
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-gray-800 flex items-center">
                <span class="text-green-500 mr-2">🎯</span>
                Diagnostic Results
              </h3>
              
              <!-- Main Diagnosis Card -->
              <div class="relative overflow-hidden rounded-2xl shadow-2xl ${
                data.prediction.class === "No_Dr"
                  ? "bg-gradient-to-br from-green-400 via-green-500 to-green-600"
                  : "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
              }">
                <div class="absolute inset-0 bg-white opacity-10"></div>
                <div class="relative p-6 text-white">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <span class="text-4xl mr-3">${
                        data.prediction.class === "No_Dr" ? "✅" : "⚠️"
                      }</span>
                      <div>
                        <h4 class="text-2xl font-bold">
                          ${
                            data.prediction.class === "No_Dr"
                              ? "No DR Detected"
                              : "DR Detected"
                          }
                        </h4>
                        <p class="text-sm opacity-90">Diabetic Retinopathy Status</p>
                      </div>
                    </div>
                    <span class="px-4 py-2 rounded-full text-sm font-bold bg-white bg-opacity-20 backdrop-blur-sm">
                      ${
                        data.prediction.class === "No_Dr"
                          ? "Negative"
                          : "Positive"
                      }
                    </span>
                  </div>
                  <p class="text-sm leading-relaxed opacity-95">
                    ${
                      data.prediction.class === "No_Dr"
                        ? "No signs of diabetic retinopathy were detected in your retina image. This is a positive result!"
                        : "Potential signs of diabetic retinopathy were detected in your retina image."
                    }
                  </p>
                </div>
              </div>
              
              <!-- Confidence Level -->
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-inner">
                <h4 class="font-bold text-gray-800 mb-4 flex items-center">
                  <span class="text-purple-500 mr-2">📊</span>
                  Confidence Analysis
                </h4>
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between mb-2">
                      <span class="text-sm font-medium text-gray-700">AI Confidence Level</span>
                      <span class="text-sm font-bold text-gray-900">${(data.prediction.confidence * 100).toFixed(2)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out" style="width: ${data.prediction.confidence * 100}%"></div>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3 mt-4">
                    <div class="text-center p-3 bg-white rounded-xl shadow-sm">
                      <div class="text-lg font-bold text-gray-800">${(data.prediction.confidence * 100).toFixed(1)}%</div>
                      <div class="text-xs text-gray-600">Accuracy</div>
                    </div>
                    <div class="text-center p-3 bg-white rounded-xl shadow-sm">
                      <div class="text-lg font-bold text-gray-800">AI</div>
                      <div class="text-xs text-gray-600">Analysis</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Recommendations -->
              <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                  <span class="text-blue-500 mr-2">💡</span>
                  Medical Recommendations
                </h4>
                <p class="text-sm text-blue-800 leading-relaxed">
                  ${
                    data.prediction.class === "No_Dr"
                      ? "Great news! No signs of diabetic retinopathy were detected. Continue regular eye check-ups and maintain good diabetes management to keep your eyes healthy."
                      : "Important: Potential signs of diabetic retinopathy detected. Please schedule an appointment with an ophthalmologist immediately for comprehensive evaluation and treatment planning."
                  }
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col space-y-3">
                <button class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  📄 Download Report
                </button>
                <button class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  👨‍⚕️ Find Specialist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (saveToIndexedDB) {
      this.#saveResultToIndexedDB(data);
    }
  }

  async #saveResultToIndexedDB(data) {
    try {
      await DiabetesDisplayResult.saveResult(data);
      console.log("Result saved to IndexedDB");
    } catch (error) {
      console.error("Failed to save to IndexedDB:", error);
    }
  }

  async #loadLastResultFromIndexedDB() {
    try {
      const results = await DiabetesDisplayResult.getAllResults();
      if (results.length > 0) {
        const lastResult = results.sort((a, b) => b.savedAt - a.savedAt)[0];
        this.displayResults(lastResult, false);
      }
    } catch (error) {
      console.error("Failed to load last result from IndexedDB:", error);
    }
  }

  displayError(error) {
    console.error("Error:", error);
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-gradient-to-r from-red-500 via-pink-500 to-red-500 rounded-2xl p-1 shadow-2xl">
        <div class="bg-white rounded-xl p-8">
          <div class="text-center">
            <div class="text-6xl mb-4">🚫</div>
            <h3 class="text-2xl font-bold text-red-600 mb-4">Analysis Failed</h3>
            <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
              <p class="font-bold text-red-800 mb-2">Error Details:</p>
              <p class="text-red-700">Failed to analyze the retina image. Please ensure you've uploaded a clear, high-quality retina image and try again.</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <button onclick="location.reload()" class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                🔄 Try Again
              </button>
              <button class="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                📞 Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}