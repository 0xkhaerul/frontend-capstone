// diabetes-form-page.js
import DiabetesFormPresenterUser from "./diabetes-user-form-presenter.js";
import { DiabetesFormDisplayResult } from "../../utils/indexeddb.js";

export default class DiabetesFormPageUser {
  #presenter;
  #elements = {
    form: null,
    resultContainer: null,
    historyContainer: null,
  };

  constructor() {
    this.#presenter = new DiabetesFormPresenterUser(this);
  }

  async render() {
    return `
    <section class="container mx-auto px-4 py-8 max-w-3xl">

      <div class="flex gap-2 mb-2">
        <div id="form-check-page" class="border border-gray-300 rounded-md p-4 flex-1 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors">
            Form Check
        </div>
        
        <div id="retina-check-page" class="border border-gray-300 rounded-md p-4 flex-1 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors">
            Check Retina
        </div>
        </div>
      <div class="bg-white rounded-lg shadow-md p-6">
 
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Diabetes Risk Assessment</h1>
        <p class="text-gray-600 mb-6">Fill out the form to assess your risk of diabetes.</p>
        
        <form id="diabetesForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Existing fields -->
            <div>
              <label for="hypertension" class="block text-sm font-medium text-gray-700 mb-1">Hypertension</label>
              <select id="hypertension" name="hypertension" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="" disabled selected>Select option</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div>
              <label for="heart_disease" class="block text-sm font-medium text-gray-700 mb-1">Heart Disease</label>
              <select id="heart_disease" name="heart_disease" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="" disabled selected>Select option</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div>
              <label for="bmi" class="block text-sm font-medium text-gray-700 mb-1">BMI</label>
              <input type="number" id="bmi" name="bmi" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 28.5" required>
            </div>

            <div>
              <label for="blood_glucose_level" class="block text-sm font-medium text-gray-700 mb-1">Blood Glucose Level (mg/dL)</label>
              <input type="number" id="blood_glucose_level" name="blood_glucose_level" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 150" required>
            </div>

            <div>
              <label for="HbA1c_level" class="block text-sm font-medium text-gray-700 mb-1">HbA1c Level (%)</label>
              <input type="number" id="HbA1c_level" name="HbA1c_level" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 6.2" required>
            </div>

            <div>
              <label for="smoking_history" class="block text-sm font-medium text-gray-700 mb-1">Smoking History</label>
              <select id="smoking_history" name="smoking_history" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="" disabled selected>Select option</option>
                <option value="never">Never</option>
                <option value="former">Former</option>
                <option value="current">Current</option>
              </select>
            </div>
            <div>
              <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select id="gender" name="gender" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="" disabled selected>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label for="age" class="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input type="number" id="age" name="age" min="1" max="120" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 45" required>
            </div>
          </div>
          
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Check Diabetes Risk
          </button>
        </form>
      </div>

      <div id="result" class="mt-6 hidden">
        <!-- Results will be displayed here -->
      </div>

      <div id="history" class="mt-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Your Previous Results</h2>
          <div id="historyList" class="space-y-4">
            <!-- History items will be loaded here -->
            <div class="text-center py-8">
              <div class="animate-pulse flex flex-col items-center">
                <div class="w-10 h-10 bg-gray-300 rounded-full mb-2"></div>
                <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
  }

  async afterRender() {
    this.#elements = {
      form: document.getElementById("diabetesForm"),
      resultContainer: document.getElementById("result"),
      historyContainer: document.getElementById("historyList"),
      formCheckPage: document.getElementById("form-check-page"),
      retinaCheckPage: document.getElementById("retina-check-page"),
    };

    // Load history on page load
    try {
      await this.#presenter.loadHistory();
    } catch (error) {
      this.displayHistoryError(error);
    }

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
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-center space-x-2">
          <div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-700">Analyzing your diabetes risk...</p>
        </div>
      </div>
    `;
  }

  displayResults(data, saveToIndexedDB = true) {
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 class="text-2xl font-bold text-gray-800">Assessment Results</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-2">Input Data</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <ul class="space-y-2">
                <li class="flex justify-between">
                  <span class="text-gray-600">Gender:</span>
                  <span class="font-medium capitalize">${
                    data.inputData.gender || "N/A"
                  }</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Age:</span>
                  <span class="font-medium">${
                    data.inputData.age || "N/A"
                  } years</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Hypertension:</span>
                  <span class="font-medium">${
                    data.inputData.hypertension === "1" ? "Yes" : "No"
                  }</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Heart Disease:</span>
                  <span class="font-medium">${
                    data.inputData.heart_disease === "1" ? "Yes" : "No"
                  }</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">BMI:</span>
                  <span class="font-medium">${data.inputData.bmi}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Blood Glucose:</span>
                  <span class="font-medium">${
                    data.inputData.blood_glucose_level
                  } mg/dL</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">HbA1c Level:</span>
                  <span class="font-medium">${
                    data.inputData.HbA1c_level
                  }%</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Smoking History:</span>
                  <span class="font-medium capitalize">${
                    data.inputData.smoking_history
                  }</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-2">Diagnosis</h3>
            <div class="space-y-4">
              <div class="p-4 rounded-lg ${
                data.prediction.result === 1
                  ? "bg-red-50 border border-red-200"
                  : "bg-green-50 border border-green-200"
              }">
                <div class="flex items-center justify-between">
                  <h4 class="text-lg font-semibold ${
                    data.prediction.result === 1
                      ? "text-red-800"
                      : "text-green-800"
                  }">
                    ${
                      data.prediction.resultText === "positive"
                        ? "High Risk"
                        : "Low Risk"
                    }
                  </h4>
                  <span class="px-3 py-1 rounded-full text-sm font-medium ${
                    data.prediction.result === 1
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }">
                    ${
                      data.prediction.resultText === "positive"
                        ? "Positive"
                        : "Negative"
                    }
                  </span>
                </div>
                <p class="mt-2 text-sm ${
                  data.prediction.result === 1
                    ? "text-red-700"
                    : "text-green-700"
                }">
                  ${data.message}
                </p>
              </div>
              
              <div class="text-sm text-gray-500">
                <p>Assessment ID: ${data.recordId}</p>
                <p>Date: ${new Date(data.timestamp).toLocaleString()}</p>
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
      <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p class="font-bold">Error</p>
        <p>${
          error.message ||
          "Failed to analyze the form data. Please try again later."
        }</p>
      </div>
    `;
  }

  displayHistory(historyItems) {
    if (!Array.isArray(historyItems) || historyItems.length === 0) {
      this.#elements.historyContainer.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <p>No previous results found.</p>
        </div>
      `;
      return;
    }

    // Sort by createdAt in descending order to show latest first
    historyItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination variables
    const itemsPerPage = 5;
    let currentPage = 1;
    const totalPages = Math.ceil(historyItems.length / itemsPerPage);

    // Function to display items for current page
    const displayCurrentPage = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedItems = historyItems.slice(startIndex, endIndex);

      this.#elements.historyContainer.innerHTML = `
        ${paginatedItems
          .map(
            (item) => `
          <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors mb-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-800">
                  ${new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <p class="text-sm text-gray-500">
                  ${new Date(item.createdAt).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <span class="px-2 py-1 text-xs rounded-full ${
                item.predictionResult === "positive"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }">
                ${
                  item.predictionResult === "positive"
                    ? "High Risk"
                    : "Low Risk"
                }
              </span>
            </div>
            
            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p class="text-gray-500">Gender</p>
                <p class="capitalize">${item.gender || "N/A"}</p>
              </div>
              <div>
                <p class="text-gray-500">Age</p>
                <p>${item.age || "N/A"} years</p>
              </div>
              <div class="mt-2">
                <p class="text-gray-500">BMI</p>
                <p>${item.bmi}</p>
              </div>
              <div class="mt-2">
                <p class="text-gray-500">Glucose</p>
                <p>${item.bloodGlucoseLevel} mg/dL</p>
              </div>
              <div class="mt-2">
                <p class="text-gray-500">HbA1c</p>
                <p>${item.hba1cLevel}%</p>
              </div>
              <div class="mt-2">
                <p class="text-gray-500">Smoking</p>
                <p class="capitalize">${item.smokingHistory}</p>
              </div>
            </div>
            
            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p class="text-gray-500">Hypertension</p>
                <p>${item.hypertension ? "Yes" : "No"}</p>
              </div>
              <div>
                <p class="text-gray-500">Heart Disease</p>
                <p>${item.heartDisease ? "Yes" : "No"}</p>
              </div>
            </div>
            
            <div class="mt-3 p-3 bg-gray-50 rounded">
              <p class="text-sm text-gray-600">
                ${
                  item.predictionResult === "positive"
                    ? "Based on your assessment, you have a higher risk of diabetes. Please consult with a healthcare professional."
                    : "Based on your assessment, you have a lower risk of diabetes. Continue maintaining a healthy lifestyle."
                }
              </p>
            </div>
            
            <div class="mt-3 flex justify-between items-center">
              <div class="text-xs text-gray-400">
                User: ${item.user.name}
              </div>
              <div class="flex gap-2">
                <button 
                  class="delete-btn p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" 
                  title="Delete"
                  data-id="${item.id}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>`
          )
          .join("")}

        <div class="flex justify-between items-center mt-6">
          <button 
            id="prevPage" 
            class="px-4 py-2 border rounded-md ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }"
            ${currentPage === 1 ? "disabled" : ""}
          >
            Previous
          </button>
          <span class="text-sm text-gray-600">
            Page ${currentPage} of ${totalPages}
          </span>
          <button 
            id="nextPage" 
            class="px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }"
            ${currentPage === totalPages ? "disabled" : ""}
          >
            Next
          </button>
        </div>
      `;

      // Add event listeners for pagination buttons
      if (totalPages > 1) {
        document.getElementById("prevPage")?.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
          }
        });

        document.getElementById("nextPage")?.addEventListener("click", () => {
          if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPage();
          }
        });
      }

      // Add event listeners for delete buttons
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", async (e) => {
          e.stopPropagation();
          const id = button.getAttribute("data-id");

          if (confirm("Are you sure you want to delete this history item?")) {
            try {
              button.innerHTML = `
              <div class="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            `;
              button.disabled = true;

              await this.#presenter.deleteHistoryItem(id);

              // Remove the item from historyItems array
              const itemIndex = historyItems.findIndex(
                (item) => item.id === id
              );
              if (itemIndex > -1) {
                historyItems.splice(itemIndex, 1);
              }

              // Recalculate pagination after deletion
              const newTotalPages = Math.ceil(
                historyItems.length / itemsPerPage
              );
              if (currentPage > newTotalPages && newTotalPages > 0) {
                currentPage = newTotalPages;
              }

              // Refresh display
              if (historyItems.length === 0) {
                this.#elements.historyContainer.innerHTML = `
                  <div class="text-center py-8 text-gray-500">
                    <p>No previous results found.</p>
                  </div>
                `;
              } else {
                displayCurrentPage();
              }
            } catch (error) {
              alert("Failed to delete item. Please try again.");
              // Reset button
              button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            `;
              button.disabled = false;
            }
          }
        });
      });
    };

    // Initial display
    displayCurrentPage();
  }

  displayHistoryError(error) {
    this.#elements.historyContainer.innerHTML = `
      <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p class="font-bold">Error</p>
        <p>Failed to load history. ${
          error.message || "Please try again later."
        }</p>
      </div>
    `;
  }
}
