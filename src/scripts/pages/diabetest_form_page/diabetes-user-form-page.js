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

    // Generate diabetes resources section if DR is detected
    const diabetesResourcesSection =
      data.prediction.class !== "No_Dr"
        ? `
      <div class="mt-6 bg-red-50 rounded-lg p-6 border border-red-200">
        <h4 class="text-lg font-semibold text-red-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          Informasi Penting tentang Diabetes
        </h4>
        
        <div class="space-y-4">
          <div>
            <h5 class="font-medium text-red-700 mb-2">📚 Panduan Pengelolaan Diabetes:</h5>
            <ul class="space-y-1 text-sm">
              <li><a href="https://www.alodokter.com/diabetes" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Panduan Lengkap Diabetes - Alodokter</a></li>
              <li><a href="https://www.halodoc.com/kesehatan/diabetes" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Informasi Diabetes Lengkap - Halodoc</a></li>
            </ul>
          </div>
          
          <div>
            <h5 class="font-medium text-red-700 mb-2">⚠️ Bahaya dan Komplikasi Diabetes:</h5>
            <ul class="space-y-1 text-sm">
              <li><a href="https://hellosehat.com/diabetes/komplikasi-diabetes/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Bahaya Komplikasi Diabetes - Hello Sehat</a></li>
            </ul>
          </div>
          
          <div>
            <h5 class="font-medium text-red-700 mb-2">🔍 Penyebab dan Faktor Risiko Diabetes:</h5>
            <ul class="space-y-1 text-sm">
              <li><a href="https://hellosehat.com/diabetes/diabetes-tipe-1/penyebab-diabetes/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Penyebab dan Faktor Risiko Diabetes - Hello Sehat</a></li>
            </ul>
          </div>
          
          <div>
            <h5 class="font-medium text-red-700 mb-2">👁️ Retinopati Diabetik:</h5>
            <ul class="space-y-1 text-sm">
              <li><a href="https://www.alodokter.com/retinopati-diabetik" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Retinopati Diabetik - Alodokter</a></li>
              <li><a href="https://hellosehat.com/diabetes/komplikasi-diabetes/retinopati-diabetik/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Retinopati Diabetik: Gejala dan Pengobatan - Hello Sehat</a></li>
            </ul>
          </div>
          
          <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
            <p class="text-sm text-yellow-800 font-medium">
              💡 <strong>Penting:</strong> Informasi di atas hanya sebagai referensi. Selalu konsultasikan dengan dokter spesialis mata dan dokter spesialis penyakit dalam untuk diagnosis dan pengobatan yang tepat.
            </p>
          </div>
        </div>
      </div>
    `
        : `
         <div class="mt-6 bg-green-50 rounded-lg p-6 border border-green-200">
      <h4 class="text-lg font-semibold text-green-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clip-rule="evenodd"></path>
        </svg>
        Jaga Kesehatan Mata & Cegah Diabetes
      </h4>
      
      <div class="space-y-4">
        <div>
          <h5 class="font-medium text-green-700 mb-2">🥗 Pola Makan Sehat untuk Mencegah Diabetes:</h5>
          <ul class="space-y-1 text-sm">
            <li><a href="https://www.siloamhospitals.com/informasi-siloam/artikel/makanan-penyebab-diabetes" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Makanan Penyebab Diabetes - Siloam Hospitals</a></li>
            <li><a href="https://www.klikdokter.com/info-sehat/diabetes/gaya-hidup-ini-bisa-tingkatkan-risiko-diabetes" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Gaya Hidup Ini Bisa Tingkatkan Risiko Diabetes</a></li>
          </ul>
        </div>
        
        <div class="mt-4 p-3 bg-blue-100 border border-blue-300 rounded">
          <p class="text-sm text-blue-800 font-medium">
            ✨ <strong>Tetap Waspada:</strong> Meskipun hasil menunjukkan tidak ada tanda retinopati diabetik, penting untuk tetap menjaga gaya hidup sehat dan melakukan pemeriksaan mata rutin setiap 1-2 tahun untuk deteksi dini.
          </p>
        </div>
      </div>
    </div>
        `;

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
        
        ${diabetesResourcesSection}
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
}
