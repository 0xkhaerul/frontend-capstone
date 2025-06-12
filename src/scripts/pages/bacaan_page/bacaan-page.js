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

          <!-- Faktor Risiko Diabetes -->
          <div class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 mb-12">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-purple-700">Faktor Risiko Diabetes</h2>
            </div>
            <div>
              <div class="border-l-4 border-red-400 pl-4 mb-6">
                <h3 class="font-semibold text-red-600 mb-2">🔴 Usia</h3>
                <p class="text-gray-700 text-sm">Risiko diabetes meningkat seiring bertambahnya usia, terutama setelah 45 tahun. Proses penuaan memengaruhi kemampuan tubuh memproduksi dan menggunakan insulin.</p>
              </div>
              <div class="border-l-4 border-orange-400 pl-4 mb-6">
                <h3 class="font-semibold text-orange-600 mb-2">⚖️ Indeks Massa Tubuh (BMI)</h3>
                <p class="text-gray-700 text-sm">BMI di atas 25 meningkatkan risiko diabetes tipe 2. Kelebihan berat badan menyebabkan resistensi insulin dan mempersulit kontrol gula darah.</p>
              </div>
              <div class="border-l-4 border-yellow-400 pl-4 mb-6">
                <h3 class="font-semibold text-yellow-600 mb-2">💉 Kadar Gula Darah</h3>
                <p class="text-gray-700 text-sm">Kadar gula darah puasa normal: &lt;80-100 mg/dL. Pradiabetes: 100-125 mg/dL. Diabetes: ≥126 mg/dL. Monitoring rutin sangat penting untuk deteksi dini.</p>
              </div>
              <div class="border-l-4 border-green-400 pl-4 mb-6">
                <h3 class="font-semibold text-green-600 mb-2">📊 HbA1c Level</h3>
                <p class="text-gray-700 text-sm">HbA1c menunjukkan rata-rata gula darah 2-3 bulan terakhir. Normal: &lt;5.7%, Pradiabetes: 5.7-6.4%, Diabetes: ≥6.5%. Tes penting untuk monitoring jangka panjang.</p>
              </div>
            </div>
          </div>

          <!-- Faktor Komorbid -->
          <div class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 mb-12">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-red-700">Penyakit Penyerta</h2>
            </div>
            <div>
              <div class="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                <h3 class="font-semibold text-red-700 mb-2">🩺 Hipertensi & Diabetes</h3>
                <p class="text-gray-700 text-sm">75% penderita diabetes memiliki hipertensi. Keduanya saling memperkuat risiko komplikasi kardiovaskular, stroke, dan kerusakan ginjal.</p>
              </div>
              <div class="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-6">
                <h3 class="font-semibold text-orange-700 mb-2">❤️ Penyakit Jantung</h3>
                <p class="text-gray-700 text-sm">Diabetes meningkatkan risiko penyakit jantung 2-4 kali lipat. Gula darah tinggi merusak pembuluh darah dan mempercepat aterosklerosis.</p>
              </div>
            </div>
          </div>

          <!-- Faktor Gaya Hidup -->
          <div class="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-green-700">Gaya Hidup & Gender</h2>
            </div>
            <div>
              <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                <h3 class="font-semibold text-yellow-700 mb-2">🚬 Riwayat Merokok</h3>
                <p class="text-gray-700 text-sm">Merokok meningkatkan resistensi insulin 30-40% dan risiko diabetes tipe 2. Nikotin dan tar merusak sel beta pankreas yang memproduksi insulin.</p>
              </div>
              <div class="bg-pink-50 p-4 rounded-lg border border-pink-200 mb-6">
                <h3 class="font-semibold text-pink-700 mb-2">👥 Perbedaan Gender</h3>
                <p class="text-gray-700 text-sm">Pria memiliki risiko diabetes lebih tinggi pada BMI rendah. Wanita berisiko tinggi saat menopause karena perubahan hormonal estrogen.</p>
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
