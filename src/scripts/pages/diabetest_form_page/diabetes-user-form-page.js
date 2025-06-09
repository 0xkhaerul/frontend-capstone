// diabetes-form-page.js
import DiabetesFormPresenterUser from "./diabetes-user-form-presenter.js";
import { DiabetesFormDisplayResult } from "../../utils/indexeddb.js";

export default class DiabetesFormPageUser {
  #presenter;
  #elements = {
    form: null,
    resultContainer: null,
  };

  constructor() {
    this.#presenter = new DiabetesFormPresenterUser(this);
  }

  async render() {
    return `
    <section class="min-h-screen bg-gradient-to-br pb-8 from-blue-50 via-white to-green-50s">
      <div class="container mx-auto max-w-3xl">
        <!-- Header Navigation -->
        <div class="flex flex-col sm:flex-row gap-8 mb-8 pt-8">
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

        <!-- Main Form Container -->
        <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl p-1 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
          <div class="bg-white rounded-xl p-8">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 mb-4">
                Diabetes Risk Assessment
              </h1>
              <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                Complete this comprehensive assessment to evaluate your diabetes risk factors and receive personalized insights.
              </p>
            </div>
            
            <form id="diabetesForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <!-- Hypertension -->
                <div class="group">
                  <label for="hypertension" class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    Hypertension
                  </label>
                  <select id="hypertension" name="hypertension" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300" required>
                    <option value="" disabled selected>Select option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <!-- Heart Disease -->
                <div class="group">
                  <label for="heart_disease" class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    Heart Disease
                  </label>
                  <select id="heart_disease" name="heart_disease" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300" required>
                    <option value="" disabled selected>Select option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <!-- BMI -->
                <div class="group">
                  <label for="bmi" class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    BMI
                  </label>
                  <input type="number" id="bmi" name="bmi" step="0.1" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300" placeholder="e.g. 28.5" required>
                </div>

                <!-- Blood Glucose Level -->
                <div class="group">
                  <label for="blood_glucose_level" class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    Blood Glucose Level (mg/dL)
                  </label>
                  <input type="number" id="blood_glucose_level" name="blood_glucose_level" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 group-hover:border-green-300" placeholder="e.g. 150" required>
                </div>

                <!-- HbA1c Level -->
                <div class="group">
                  <label for="HbA1c_level" class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    HbA1c Level (%)
                  </label>
                  <input type="number" id="HbA1c_level" name="HbA1c_level" step="0.1" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300" placeholder="e.g. 6.2" required>
                </div>

                <!-- Smoking History -->
                <div class="group">
                  <label for="smoking_history" class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    Smoking History
                  </label>
                  <select id="smoking_history" name="smoking_history" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300" required>
                    <option value="" disabled selected>Select option</option>
                    <option value="never">Never</option>
                    <option value="former">Former</option>
                    <option value="current">Current</option>
                  </select>
                </div>

                <!-- Gender -->
                <div class="group">
                  <label for="gender" class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    Gender
                  </label>
                  <select id="gender" name="gender" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300" required>
                    <option value="" disabled selected>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <!-- Age -->
                <div class="group">
                  <label for="age" class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    Age
                  </label>
                  <input type="number" id="age" name="age" min="1" max="120" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-300" placeholder="e.g. 45" required>
                </div>
              </div>
              
              <!-- Submit Button -->
              <div class="flex justify-center pt-8">
                <button type="submit" class="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600 text-white font-bold py-4 px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-purple-300">
                  <span class="flex items-center justify-center">
                    Check Diabetes Risk
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
      resultContainer: document.getElementById("result"),
      formCheckPage: document.getElementById("form-check-page"),
      retinaCheckPage: document.getElementById("retina-check-page"),
    };

    await this.#loadLastResultFromIndexedDB();

    this.#elements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = {
        hypertension: this.#elements.form.hypertension.value,
        heart_disease: this.#elements.form.heart_disease.value,
        bmi: this.#elements.form.bmi.value,
        blood_glucose_level: this.#elements.form.blood_glucose_level.value,
        HbA1c_level: this.#elements.form.HbA1c_level.value,
        smoking_history: this.#elements.form.smoking_history.value,
        gender: this.#elements.form.gender.value,
        age: this.#elements.form.age.value,
      };
      this.#presenter.handleFormSubmit(formData);
    });

    // Add click event listeners for navigation
    this.#elements.formCheckPage.addEventListener("click", () => {
      window.location.hash = "#/diabetes-form-checked-user";
    });

    this.#elements.retinaCheckPage.addEventListener("click", () => {
      window.location.hash = "#/diabetes-checked-user";
    });
  }

  showLoading() {
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl p-1 shadow-2xl">
        <div class="bg-white rounded-xl p-8">
          <div class="flex flex-col items-center justify-center space-y-4">
            <div class="relative">
              <div class="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin"></div>
              <div class="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <div class="text-center">
              <p class="text-xl font-semibold text-gray-700 mb-2"> Analyzing Your Health Data</p>
              <p class="text-gray-600">Please wait while we assess your diabetes risk...</p>
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
            <h2 class="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
              Assessment Results
            </h2>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Input Data Section -->
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-gray-800 flex items-center">
                Your Health Data
              </h3>
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-2xl shadow-inner">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex items-center justify-between p-2 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600 flex items-center">
                      Gender:
                    </span>
                    <span class="font-bold text-gray-800 capitalize">${data.inputData.gender || "N/A"}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600 flex items-center">
                      Age:
                    </span>
                    <span class="font-bold text-gray-800">${data.inputData.age || "N/A"} years</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600 flex items-center">
                      Hypertension:
                    </span>
                    <span class="font-bold ${data.inputData.hypertension === "1" ? "text-red-600" : "text-green-600"}">${data.inputData.hypertension === "1" ? "Yes" : "No"}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600 flex items-center">
                      Heart Disease:
                    </span>
                    <span class="font-bold ${data.inputData.heart_disease === "1" ? "text-red-600" : "text-green-600"}">${data.inputData.heart_disease === "1" ? "Yes" : "No"}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600 flex items-center">
                      BMI:
                    </span>
                    <span class="font-bold text-gray-800">${data.inputData.bmi}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600 flex items-center">
                      Blood Glucose:
                    </span>
                    <span class="font-bold text-gray-800">${data.inputData.blood_glucose_level} mg/dL</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600 flex items-center">
                      HbA1c Level:
                    </span>
                    <span class="font-bold text-gray-800">${data.inputData.HbA1c_level}%</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600 flex items-center">
                      Smoking:
                    </span>
                    <span class="font-bold text-gray-800 capitalize">${data.inputData.smoking_history}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Results Section -->
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-gray-800 flex items-center">
                Diagnosis & Recommendations
              </h3>
              
              <!-- Main Result Card -->
              <div class="relative overflow-hidden rounded-2xl shadow-2xl ${
                data.prediction.result === 1
                  ? "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
                  : "bg-gradient-to-br from-green-400 via-green-500 to-green-600"
              }">
                <div class="absolute inset-0 bg-white opacity-10"></div>
                <div class="relative p-3 text-white">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <span class="text-2xl mr-3">${data.prediction.result === 1 ? "⚠️" : "✅"}</span>
                      <div>
                        <h4 class="text-xl font-bold">
                          ${data.prediction.resultText === "positive" ? "High Risk" : "Low Risk"}
                        </h4>
                        <p class="text-sm opacity-90">Diabetes Risk Assessment</p>
                      </div>
                    </div>
                    <span class="px-4 py-2 rounded-full text-sm font-bold bg-white bg-opacity-20 backdrop-blur-sm">
                      ${data.prediction.resultText === "positive" ? "Positive" : "Negative"}
                    </span>
                  </div>
                  <p class="text-sm leading-relaxed opacity-95">
                    ${data.message}
                  </p>
                </div>
              </div>
              
              <!-- Assessment Info -->
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl shadow-inner">
                <h4 class="font-bold text-gray-800 mb-4 flex items-center">
                  Assessment Details
                </h4>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600">Assessment ID:</span>
                    <span class="font-mono text-sm font-medium text-gray-800">${data.recordId}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                    <span class="text-gray-600">Assessment Date:</span>
                    <span class="font-medium text-gray-800">${new Date(data.timestamp).toLocaleString()}</span>
                  </div>
                </div>
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
      await DiabetesFormDisplayResult.saveResult(data);
      console.log("Result saved to IndexedDB");
    } catch (error) {
      console.error("Failed to save to IndexedDB:", error);
    }
  }

  async #loadLastResultFromIndexedDB() {
    try {
      const results = await DiabetesFormDisplayResult.getAllResults();
      if (results.length > 0) {
        const lastResult = results.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )[0];
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
            <div class="text-6xl mb-4">❌</div>
            <h3 class="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h3>
            <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
              <p class="font-bold text-red-800 mb-2">Error Details:</p>
              <p class="text-red-700">${
                error.message ||
                "Failed to analyze the form data. Please try again later."
              }</p>
            </div>
            <button onclick="location.reload()" class="mt-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    `;
  }
}