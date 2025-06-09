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
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Diabetes Retina Check</h1>
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
      <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p class="font-bold">Error</p>
        <p>Failed to analyze the retina image. Please try again later.</p>
      </div>
    `;
  }
}
