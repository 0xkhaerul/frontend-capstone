import profileData from "./data.js";
import { getAllDiabetesUserHistory, getAllDiabetesUserFormHistory } from '../../data/api.js';

export default class ProfilePage {
  constructor() {
    this.activeTab = 'retina';
    this.retinaHistory = [];
    this.formHistory = [];
    this.retinaCurrentPage = 1;
    this.formCurrentPage = 1;
    this.itemsPerPage = 3;
  }

  async render() {
    return `
      <section class="container mx-auto p-4">
        <div class="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div class="md:flex">
            <div class="md:shrink-0">
              <img class="h-48 w-full object-cover md:h-full md:w-48" src="${profileData.avatar}" alt="Profile picture">
            </div>
            <div class="p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">My Profile</div>
              <h1 class="block mt-1 text-lg leading-tight font-medium text-black">${profileData.name}</h1>
              <p class="text-gray-500">${profileData.email}</p>
              <p class="mt-2 text-gray-700">${profileData.bio}</p>
            </div>
          </div>
        </div>

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
      </section>

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
    this.tabRetinaBtn = document.getElementById('tab-retina');
    this.tabFormBtn = document.getElementById('tab-form');
    this.historyContainer = document.getElementById('history-content-container');
    this.paginationControls = document.getElementById('pagination-controls');
    this.prevBtn = document.getElementById('prev-page-btn');
    this.nextBtn = document.getElementById('next-page-btn');
    this.pageIndicator = document.getElementById('page-indicator');
    
    this.tabRetinaBtn.addEventListener('click', () => this.setActiveTab('retina'));
    this.tabFormBtn.addEventListener('click', () => this.setActiveTab('form'));
    
    this.prevBtn.addEventListener('click', () => this.changePage(-1));
    this.nextBtn.addEventListener('click', () => this.changePage(1));
    
    await this.setActiveTab('retina');

    const modal = document.getElementById('profile-check-details-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    if (modal && modalCloseButton) {
      modalCloseButton.addEventListener('click', () => modal.classList.add('hidden'));
      modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.add('hidden');
      });
    }
  }

  async setActiveTab(tabName) {
    this.activeTab = tabName;
    
    if (tabName === 'retina') {
      this.tabRetinaBtn.classList.add('text-blue-600', 'border-blue-600');
      this.tabRetinaBtn.classList.remove('text-gray-500', 'hover:text-gray-700', 'border-transparent');
      this.tabFormBtn.classList.add('text-gray-500', 'hover:text-gray-700', 'border-transparent');
      this.tabFormBtn.classList.remove('text-blue-600', 'border-blue-600');
      
      if (this.retinaHistory.length === 0) {
        this.historyContainer.innerHTML = '<p class="text-center text-gray-500 animate-pulse pt-10">Loading retina history...</p>';
        try {
          const history = await getAllDiabetesUserHistory();
          this.retinaHistory = history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } catch (error) {
          this.historyContainer.innerHTML = `<p class="text-center text-red-500 pt-10">Error loading retina history: ${error.message}</p>`;
          return;
        }
      }
      this.retinaCurrentPage = 1;
      this.renderCurrentPageItems();

    } else {
      this.tabFormBtn.classList.add('text-blue-600', 'border-blue-600');
      this.tabFormBtn.classList.remove('text-gray-500', 'hover:text-gray-700', 'border-transparent');
      this.tabRetinaBtn.classList.add('text-gray-500', 'hover:text-gray-700', 'border-transparent');
      this.tabRetinaBtn.classList.remove('text-blue-600', 'border-blue-600');

      if (this.formHistory.length === 0) {
        this.historyContainer.innerHTML = '<p class="text-center text-gray-500 animate-pulse pt-10">Loading form history...</p>';
        try {
          const history = await getAllDiabetesUserFormHistory();
          this.formHistory = history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } catch (error) {
          this.historyContainer.innerHTML = `<p class="text-center text-red-500 pt-10">Error loading form history: ${error.message}</p>`;
          return;
        }
      }
      this.formCurrentPage = 1;
      this.renderCurrentPageItems();
    }
  }

  renderCurrentPageItems() {
    let historyData, currentPage;
    
    if (this.activeTab === 'retina') {
      historyData = this.retinaHistory;
      currentPage = this.retinaCurrentPage;
    } else {
      historyData = this.formHistory;
      currentPage = this.formCurrentPage;
    }

    this.historyContainer.innerHTML = '';

    if (!historyData || historyData.length === 0) {
      this.historyContainer.innerHTML = `<p class="text-gray-500 p-4 text-center pt-10">No ${this.activeTab} check history found.</p>`;
      this.paginationControls.classList.add('hidden');
      return;
    }

    const totalPages = Math.ceil(historyData.length / this.itemsPerPage);
    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageItems = historyData.slice(startIndex, endIndex);

    pageItems.forEach(item => {
      let itemDiv;
      if (this.activeTab === 'retina') {
        itemDiv = this.createRetinaItemElement(item);
      } else {
        itemDiv = this.createFormItemElement(item);
      }
      this.historyContainer.appendChild(itemDiv);
    });
    
    this.updatePagination(currentPage, totalPages);
  }
  
  updatePagination(currentPage, totalPages) {
    if (totalPages <= 1) {
      this.paginationControls.classList.add('hidden');
      return;
    }

    this.paginationControls.classList.remove('hidden');
    this.pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    this.prevBtn.disabled = currentPage === 1;
    this.nextBtn.disabled = currentPage === totalPages;
  }

  changePage(direction) {
    if (this.activeTab === 'retina') {
      const totalPages = Math.ceil(this.retinaHistory.length / this.itemsPerPage);
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
  
  createRetinaItemElement(checkDataFromApi) {
    const displayData = {
      image: { url: checkDataFromApi.image },
      prediction: { class: checkDataFromApi.predictedClass, confidence: checkDataFromApi.confidenceClass },
      savedAt: new Date(checkDataFromApi.createdAt),
    };
    const confidencePercentage = (displayData.prediction.confidence * 100).toFixed(2);
    const isNoDr = displayData.prediction.class === "No_Dr";
    const conditionText = isNoDr ? "No Diabetic Retinopathy Detected" : "Diabetic Retinopathy Detected";
    const conditionTagClass = isNoDr ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    const conditionTextClass = isNoDr ? "text-green-700" : "text-red-700";

    const itemDiv = document.createElement('div');
    itemDiv.className = 'bg-gray-50 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200';
    itemDiv.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <p class="text-xs text-gray-500 font-medium">${new Date(displayData.savedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <span class="px-2 py-1 text-xs rounded-full font-semibold ${conditionTagClass}">${isNoDr ? "Normal" : "Retinopathy"}</span>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 items-center">
        <img src="${displayData.image.url}" alt="Retina Scan" class="w-20 h-20 object-cover rounded border border-gray-300">
        <div class="flex-1 text-sm"><p class="font-semibold ${conditionTextClass}">${conditionText}</p><p class="text-gray-600">Confidence: ${confidencePercentage}%</p></div>
      </div>
      <p class="text-xs text-blue-600 hover:underline text-right mt-2 font-medium">View Details</p>`;
    itemDiv.addEventListener('click', () => this._showRetinaDetailsModal(displayData));
    return itemDiv;
  }

  createFormItemElement(checkDataFromApi) {
    const displayData = {
      inputData: {
        gender: checkDataFromApi.gender, age: checkDataFromApi.age, hypertension: checkDataFromApi.hypertension ? "1" : "0", heart_disease: checkDataFromApi.heartDisease ? "1" : "0", bmi: checkDataFromApi.bmi, blood_glucose_level: checkDataFromApi.bloodGlucoseLevel, HbA1c_level: checkDataFromApi.hba1cLevel, smoking_history: checkDataFromApi.smokingHistory,
      },
      prediction: { result: checkDataFromApi.predictionResult === 'positive' ? 1 : 0, resultText: checkDataFromApi.predictionResult },
      message: checkDataFromApi.predictionMessage, recordId: checkDataFromApi.id, timestamp: new Date(checkDataFromApi.createdAt),
    };
    const isHighRisk = displayData.prediction.result === 1;
    const riskText = isHighRisk ? "High Risk" : "Low Risk";
    const riskUiClass = isHighRisk ? "text-red-700" : "text-green-700";
    const riskBgClass = isHighRisk ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";

    const itemDiv = document.createElement('div');
    itemDiv.className = 'bg-gray-50 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200';
    itemDiv.innerHTML = `
      <div class="flex justify-between items-center mb-1">
        <p class="text-xs text-gray-500 font-medium">${new Date(displayData.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <span class="px-2 py-1 text-xs rounded-full font-semibold ${riskBgClass}">${displayData.prediction.resultText === "positive" ? "Positive" : "Negative"}</span>
      </div>
      <p class="text-md font-semibold ${riskUiClass}">${riskText}</p>
      <p class="text-sm text-gray-600 truncate mt-1">${displayData.message}</p>
      <p class="text-xs text-blue-600 hover:underline text-right mt-2 font-medium">View Details</p>`;
    itemDiv.addEventListener('click', () => this._showFormDetailsModal(displayData));
    return itemDiv;
  }

  // --- KODE MODAL YANG DIPERBAIKI ---
  _showRetinaDetailsModal(data) {
    const modal = document.getElementById('profile-check-details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContentArea = document.getElementById('modal-content-area');
    if (!modal || !modalTitle || !modalContentArea) return;
    
    modalTitle.textContent = 'Retina Check Details';
    const confidencePercentage = (data.prediction.confidence * 100).toFixed(2);
    const isNoDr = data.prediction.class === "No_Dr";
    const conditionText = isNoDr ? "No Diabetic Retinopathy Detected" : "Diabetic Retinopathy Detected";
    const conditionClass = isNoDr ? "text-green-600" : "text-red-600";
    const recommendation = isNoDr 
        ? "No signs of diabetic retinopathy were detected in your retina image. However, regular check-ups are still recommended." 
        : "Potential signs of diabetic retinopathy were detected. Please consult with an ophthalmologist for further evaluation.";

    modalContentArea.innerHTML = `
        <div class="space-y-4">
            <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="flex-1 w-full md:w-auto text-center md:text-left">
                    <h4 class="text-lg font-medium text-gray-700 mb-2">Retina Image</h4>
                    <img src="${data.image.url}" alt="Analyzed retina" class="w-full max-w-xs mx-auto md:mx-0 h-auto rounded-lg border border-gray-200 shadow-md">
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
                         <p class="text-xs text-gray-500 mt-3">Checked on: ${new Date(data.savedAt).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
            </div>
            <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                 <h4 class="text-md font-semibold text-blue-800 mb-1">Recommendation</h4>
                <p class="text-sm text-blue-700">${recommendation}</p>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    modalContentArea.scrollTop = 0;
  }

  _showFormDetailsModal(data) {
    const modal = document.getElementById('profile-check-details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContentArea = document.getElementById('modal-content-area');
    if (!modal || !modalTitle || !modalContentArea) return;
    
    modalTitle.textContent = 'Diabetes Form Check Details';
    const isHighRisk = data.prediction.result === 1;
    const riskText = isHighRisk ? "High Risk" : "Low Risk";
    const riskUiClass = isHighRisk ? "text-red-800" : "text-green-800";
    const riskBgClass = isHighRisk ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
    const riskBorderPillClass = isHighRisk ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200";

    const formatInputItem = (label, value) => `
        <li class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span class="text-gray-600 text-sm">${label}:</span>
            <span class="font-medium capitalize text-gray-800 text-sm text-right">${value !== undefined && value !== null ? value : "N/A"}</span>
        </li>`;
    
    const inputDataHtml = `
        <ul class="space-y-0">
            ${formatInputItem("Gender", data.inputData.gender)}
            ${formatInputItem("Age", `${data.inputData.age} years`)}
            ${formatInputItem("Hypertension", data.inputData.hypertension === "1" ? "Yes" : "No")}
            ${formatInputItem("Heart Disease", data.inputData.heart_disease === "1" ? "Yes" : "No")}
            ${formatInputItem("BMI", data.inputData.bmi)}
            ${formatInputItem("Blood Glucose", `${data.inputData.blood_glucose_level} mg/dL`)}
            ${formatInputItem("HbA1c Level", `${data.inputData.HbA1c_level}%`)}
            ${formatInputItem("Smoking History", data.inputData.smoking_history)}
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
                            ${data.prediction.resultText === "positive" ? "Positive" : "Negative"}
                        </span>
                    </div>
                    <p class="mt-2 text-sm ${isHighRisk ? "text-red-700" : "text-green-700"}">
                        ${data.message}
                    </p>
                </div>
                <div class="text-xs text-gray-500 mt-3">
                    <p>Assessment ID: ${data.recordId}</p>
                    <p>Checked on: ${new Date(data.timestamp).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    modalContentArea.scrollTop = 0;
  }
}