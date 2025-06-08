export default class BacaanPage {
  async render() {
    return `
 <section class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div class="absolute top-32 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      <div class="container mx-auto px-4 py-16 relative z-10">
        <!-- Header with animation -->
        <div class="text-center mb-16 animate-fade-in">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
            Informasi Seputar Diabetes
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Pahami, cegah, dan kelola diabetes dengan informasi lengkap dan terpercaya
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <!-- Pengertian Diabetes -->
          <div class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-blue-700">Apa itu Diabetes?</h2>
            </div>
            <p class="text-gray-700 leading-relaxed text-lg">
              Diabetes adalah penyakit kronis yang terjadi ketika tubuh tidak dapat menghasilkan insulin yang cukup atau tidak dapat menggunakan insulin secara efektif. Insulin adalah hormon yang mengatur gula darah.
            </p>
          </div>

 <!-- Gejala Diabetes -->
          <div class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-red-700">Gejala Diabetes</h2>
            </div>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-red-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Sering merasa haus dan lapar</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-red-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Sering buang air kecil</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-red-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Penglihatan kabur</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-red-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Mudah lelah</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-red-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Berat badan turun tanpa sebab</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-red-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Luka yang sulit sembuh</span>
              </li>
            </ul>
          </div>
       
        <!-- Bahaya Diabetes -->
          <div class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-yellow-700">Bahaya Diabetes</h2>
            </div>
            
<div class="text-gray-700">
              <p class="font-semibold text-lg mb-4 text-orange-600">Komplikasi yang dapat terjadi:</p>
              <ul class="space-y-3">
                <li class="flex items-center group/item">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                  <span class="text-lg">Penyakit jantung dan pembuluh darah</span>
                </li>
                <li class="flex items-center group/item">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                  <span class="text-lg">Kerusakan ginjal (nefropati)</span>
                </li>
                <li class="flex items-center group/item">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                  <span class="text-lg">Kerusakan saraf (neuropati)</span>
                </li>
                <li class="flex items-center group/item">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                  <span class="text-lg">Kerusakan mata (retinopati)</span>
                </li>
                <li class="flex items-center group/item">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                  <span class="text-lg">Gangguan pada kaki</span>
                </li>
                <li class="flex items-center group/item">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                  <span class="text-lg">Masalah kulit</span>
                </li>

              </ul>
            </div>
          </div>


        <!-- Cara Mencegah -->
          <div class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-green-700">Cara Mencegah Diabetes</h2>
            </div>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Menjaga pola makan sehat dan seimbang</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Rutin berolahraga minimal 30 menit sehari</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Menjaga berat badan ideal</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Menghindari makanan tinggi gula dan lemak</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Rutin memeriksakan kesehatan</span>
              </li>
              <li class="flex items-center group/item">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span class="text-lg">Mengelola stres dengan baik</span>
              </li>
            </ul>
          </div>
          <!-- Cara Mengatasi -->
          <div class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 md:col-span-2">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-purple-700">Cara Mengatasi Diabetes</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <h3 class="font-bold text-xl mb-4 text-purple-700 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
                  </svg>
                  Pengobatan Medis:
                </h3>
                <ul class="space-y-3">
                  <li class="flex items-center group/item">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg">Konsumsi obat diabetes sesuai resep dokter</span>
                  </li>
                  <li class="flex items-center group/item">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg">Pemantauan gula darah rutin</span>
                  </li>
                  <li class="flex items-center group/item">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg">Suntik insulin jika diperlukan</span>
                  </li>
                  <li class="flex items-center group/item">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg">Konsultasi rutin dengan dokter</span>
                  </li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                <h3 class="font-bold text-xl mb-4 text-green-700 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Perubahan Gaya Hidup:
                </h3>
                <ul class="space-y-3">
                  <li class="flex items-center group/item">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg">Mengatur pola makan dengan diet diabetes</span>
                  </li>
                  <li class="flex items-center group/item">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg">Olahraga teratur sesuai kemampuan</span>
                  </li>
                  <li class="flex items-center group/item">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg">Berhenti merokok</span>
                  </li>
                  <li class="flex items-center group/item">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span class="text-lg">Membatasi konsumsi alkohol</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Call to Action -->
          <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl p-8 md:col-span-2 text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4">Sudahkah Anda mengetahui risiko diabetes Anda?</h3>
              <p class="text-lg mb-6 opacity-90">Lakukan pemeriksaan sederhana untuk mengetahui tingkat risiko diabetes Anda</p>
              <a href="#/diabetes-form-checked-user" class="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg group">
                <span class="mr-2">Cek Risiko Diabetes Sekarang</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
     <style>
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fade-in 1s ease-out;
      }
      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }
      /* Glass morphism effect */
      .backdrop-blur-sm {
        backdrop-filter: blur(12px);
      }
      /* Custom hover effects */
      .group:hover .group-hover\\:scale-110 {
        transform: scale(1.1);
      }
      /* Gradient text */
      .bg-clip-text {
        -webkit-background-clip: text;
        background-clip: text;
      }
      /* Pulse animation for background elements */
      @keyframes pulse {
        0%, 100% {
          opacity: 0.05;
        }
        50% {
          opacity: 0.1;
        }
      }
      .animate-pulse {
        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      .delay-700 {
        animation-delay: 700ms;
      }
      .delay-1000 {
        animation-delay: 1000ms;
      }
    </style>
    `;
  }

  async afterRender() {
    // Add any interactive features here if needed

    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fade-in 0.8s ease-out forwards";
        }
      });
    }, observerOptions);

    // Observe all card elements
    document.querySelectorAll(".group").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      observer.observe(card);
    });

    // Add stagger effect to list items
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  }
}
