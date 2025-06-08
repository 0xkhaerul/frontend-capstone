export default class PanduanPage {
  async render() {
    return `
    
<section class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div class="container mx-auto px-4">
        <!-- Hero Section -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Panduan Pemeriksaan Diabetes
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Pelajari cara melakukan pemeriksaan risiko diabetes dengan mudah dan akurat
          </p>
        </div>
        <!-- Main Content -->
        <div class="max-w-5xl mx-auto">
          <div class="grid gap-8 lg:grid-cols-3">
            
            <!-- Preparation Card -->
            <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-white">Persiapan Sebelum Pemeriksaan</h2>
                    <p class="text-blue-100 mt-1">Siapkan data-data berikut sebelum melakukan pemeriksaan</p>
                  </div>
                </div>
              </div>
              
              <div class="p-8">
                <div class="grid gap-4 md:grid-cols-2">
                  <div class="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
                    <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">Usia</h4>
                      <p class="text-sm text-gray-600">Usia Anda saat ini</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200">
                    <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">Berat & Tinggi</h4>
                      <p class="text-sm text-gray-600">Dalam kg dan cm</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200">
                    <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">Tekanan Darah</h4>
                      <p class="text-sm text-gray-600">Sistolik/Diastolik (mmHg)</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200">
                    <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">Glukosa Darah</h4>
                      <p class="text-sm text-gray-600">Kadar dalam mg/dL</p>
                    </div>
                  </div>
                  
                  <div class="md:col-span-2 flex items-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-200">
                    <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">Riwayat Keluarga</h4>
                      <p class="text-sm text-gray-600">Riwayat diabetes dalam keluarga</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

             <!-- Steps Card -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="bg-gradient-to-r from-green-500 to-green-600 p-6">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-xl font-bold text-white">Langkah Pemeriksaan</h2>
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">1</div>
                    <p class="text-gray-700 text-sm">Isi formulir dengan data pribadi secara lengkap</p>
                  </div>
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">2</div>
                    <p class="text-gray-700 text-sm">Pastikan data tekanan darah terdiri dari nilai sistolik dan diastolik</p>
                  </div>
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">3</div>
                    <p class="text-gray-700 text-sm">Masukkan hasil pemeriksaan kadar glukosa darah</p>
                  </div>
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">4</div>
                    <p class="text-gray-700 text-sm">Pilih riwayat diabetes dalam keluarga</p>
                  </div>
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">5</div>
                    <p class="text-gray-700 text-sm">Klik "Check Risk" untuk analisis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            

           <!-- Important Notes -->
          <div class="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-yellow-200">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800">Catatan Penting</h3>
            </div>
            
            <div class="grid gap-4 md:grid-cols-3">
              <div class="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                <div class="flex items-center mb-2">
                  <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-800 text-sm">Prediktif</h4>
                </div>
                <p class="text-gray-600 text-sm">Hasil pemeriksaan bersifat prediktif, bukan diagnosis</p>
              </div>
              
              <div class="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                <div class="flex items-center mb-2">
                  <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-800 text-sm">Konsultasi</h4>
                </div>
                <p class="text-gray-600 text-sm">Konsultasikan dengan tenaga medis profesional</p>
              </div>
              
              <div class="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                <div class="flex items-center mb-2">
                  <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-800 text-sm">Monitoring</h4>
                </div>
                <p class="text-gray-600 text-sm">Lakukan pemeriksaan rutin untuk monitoring kesehatan</p>
              </div>
            </div>
          </div>

             <!-- Call to Action -->
          <div class="mt-8 text-center">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90"></div>
              <div class="relative z-10">
                <h3 class="text-2xl font-bold mb-4">Siap Melakukan Pemeriksaan?</h3>
                <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Dapatkan analisis risiko diabetes Anda dengan cepat dan mudah menggunakan teknologi machine learning terdepan
                </p>
                <a href="#/diabetes-form-checked-user" class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Mulai Pemeriksaan Sekarang
                </a>
              </div>
              
              <!-- Decorative elements -->
              <div class="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
  }
}
