// diabetes-page.js
import DiabetesFormPresenterUser from "./diabetes-user-form-presenter.js";
import { DiabetesDisplayResult } from "../../utils/indexeddb.js";

export default class DiabetesFormPageUser {
  #presenter;
  #elements = {
    form: null,
    fileInput: null,
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
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Diabetes Form Check</h1>
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
      fileInput: document.getElementById("retinaImage"),
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

    // Add click event listeners for navigation
    this.#elements.formCheckPage.addEventListener("click", () => {
      window.location.hash = "#/diabetes-form-checked-user";
    });

    this.#elements.retinaCheckPage.addEventListener("click", () => {
      window.location.hash = "#/diabetes-checked-user";
    });

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
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-center space-x-2">
          <div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-700">Analyzing retina image...</p>
        </div>
      </div>
    `;
  }

  // Perbaiki method displayResults dengan parameter default
  displayResults(data, saveToIndexedDB = true) {
    this.#elements.resultContainer.classList.remove("hidden");
    this.#elements.resultContainer.innerHTML = `
    <div class="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 class="text-2xl font-bold text-gray-800">Analysis Results</h2>
      
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-700 mb-2">Retina Image</h3>
          <img src="${
            data.image.url
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

    // Hanya simpan ke IndexedDB jika bukan dari hasil load
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

  // Saat load dari IndexedDB
  async #loadLastResultFromIndexedDB() {
    try {
      const results = await DiabetesDisplayResult.getAllResults();
      if (results.length > 0) {
        const lastResult = results.sort((a, b) => b.savedAt - a.savedAt)[0];
        this.displayResults(lastResult, false); // Eksplisit false
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
        <p>Failed to analyze the retina image. Please try again later.</p>
      </div>
    `;
  }

  // diabetes-page.js
  displayHistory(historyItems) {
    if (historyItems.length === 0) {
      this.#elements.historyContainer.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <p>No previous results found.</p>
        </div>
      `;
      return;
    }

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
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-shrink-0">
                <img src="${
                  item.image
                }" alt="Retina scan" class="w-32 h-32 object-cover rounded-lg border border-gray-200">
              </div>
              
              <div class="flex-1">
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
                    item.predictedClass === "No_Dr"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }">
                    ${
                      item.predictedClass === "No_Dr"
                        ? "Normal"
                        : "Diabetic Retinopathy"
                    }
                  </span>
                </div>
                
                <p class="text-sm text-gray-600 mt-1">
                  Confidence: ${(item.confidenceClass * 100).toFixed(2)}%
                </p>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: ${
                    item.confidenceClass * 100
                  }%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  Saved: ${item.savedStatus ? "Yes" : "No"}
                </p>
              </div>
              
              <!-- Action Buttons Container -->
              <div class="flex flex-col items-center justify-center gap-3 px-4 border-l border-gray-200">
                <button class="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
  
        ${
          totalPages > 1
            ? `
          <div class="flex justify-between items-center mt-6">
            <button 
              id="prevPage" 
              class="px-4 py-2 bg-gray-200 rounded-lg ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
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
              class="px-4 py-2 bg-gray-200 rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }"
              ${currentPage === totalPages ? "disabled" : ""}
            >
              Next
            </button>
          </div>
        `
            : ""
        }
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
