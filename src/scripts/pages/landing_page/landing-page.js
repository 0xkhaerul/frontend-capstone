export default class LandingPage {
  async render() {
    return `
   <div class="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <section 
        class="relative text-white py-20 md:py-32" 
        style="background-image: url('/assets/images/background-image.png'); background-size: cover; background-position: center;">
        <div class="absolute inset-0 bg-blue-700 opacity-80"></div>
        <div class="container mx-auto px-6 text-center relative z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 transform -translate-y-10 animate-fadeInUp" style="animation-delay: 0.2s;">
            Ketahui Risiko Diabetes Anda Lebih Awal
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto opacity-0 transform -translate-y-10 animate-fadeInUp" style="animation-delay: 0.4s;">
            Gunakan alat pemeriksaan risiko diabetes kami yang canggih, cepat, dan berbasis data untuk menjaga kesehatan Anda.
          </p>
          <a href="#/diabetes-checked-user" 
             class="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-10 py-4 text-lg rounded-lg 
                    transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 
                    focus:ring-teal-400 focus:ring-opacity-75 opacity-0 transform -translate-y-10 animate-fadeInUp" 
             style="animation-delay: 0.6s;">
            <i class="fas fa-play-circle mr-2"></i>Mulai Pemeriksaan
          </a>
        </div>
      </section>

      <section id="features" class="py-16 lg:py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
       <div class="container mx-auto px-6 pb-6">

          <!-- Container pertama: Counter Features -->
        <div class="container mx-auto px-6 pt-8 pb-12">
          <!-- Features Analyisis -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div class="p-6 opacity-0 transform translate-y-10 animate-on-scroll">
              <div class="text-blue-600 text-5xl font-extrabold mb-2 count-up" data-target="25000">0+</div>
              <p class="text-gray-600 text-lg font-medium">Pemeriksaan Dilakukan</p>
            </div>
            <div class="p-6 opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
              <div class="text-teal-500 text-5xl font-extrabold mb-2 count-up" data-target="15000">0+</div>
              <p class="text-gray-600 text-lg font-medium">Pengguna Terpercaya</p>
            </div>
            <div class="p-6 opacity-0 transform translate-y-10 animate-on-scroll sm:col-span-2 md:col-span-1" style="animation-delay: 0.2s;">
              <div class="text-purple-600 text-5xl font-extrabold mb-2 count-up" data-target="98">0%</div>
              <p class="text-gray-600 text-lg font-medium">Tingkat Kepuasan</p>
            </div>
          </div>
        </div>

        <!-- Container kedua: Mengapa Memilih -->
        <div class="container mx-auto max-w-7xl pt-16 pb-16">
            <div class="text-center mb-16">
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 opacity-0 transform translate-y-10 animate-on-scroll">
                Mengapa Memilih 
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Alat Kami?
                </span>
              </h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
                Teknologi terdepan untuk deteksi dini diabetes dengan akurasi tinggi dan rekomendasi yang dipersonalisasi
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out text-center transform hover:-translate-y-4 opacity-0 translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
                <div class="flex justify-center items-center mb-6">
                  <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Cepat & Mudah</h3>
                <p class="text-gray-600 leading-relaxed">Dapatkan hasil penilaian risiko dalam hitungan menit melalui antarmuka yang intuitif dan user-friendly.</p>
              </div>
              
              <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out text-center transform hover:-translate-y-4 opacity-0 translate-y-10 animate-on-scroll" style="animation-delay: 0.2s;">
                <div class="flex justify-center items-center mb-6">
                  <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Akurat & Terpercaya</h3>
                <p class="text-gray-600 leading-relaxed">Analisis berdasarkan standar medis internasional dan penelitian ilmiah terkini dari berbagai institusi kesehatan.</p>
              </div>
              
              <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out text-center transform hover:-translate-y-4 opacity-0 translate-y-10 animate-on-scroll md:col-span-2 lg:col-span-1" style="animation-delay: 0.3s;">
                <div class="flex justify-center items-center mb-6">
                  <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Rekomendasi Personal</h3>
                <p class="text-gray-600 leading-relaxed">Dapatkan saran langkah preventif yang disesuaikan dengan profil kesehatan dan gaya hidup Anda.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- How It Works Section -->
        <section class="bg-white py-16 lg:py-24 px-4">
          <div class="container mx-auto max-w-7xl">
            <div class="text-center mb-16">
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 opacity-0 transform translate-y-10 animate-on-scroll">
                Bagaimana 
                <span class="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Cara Kerjanya?
                </span>
              </h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
                Proses sederhana dalam 3 langkah untuk mendapatkan analisis risiko diabetes yang komprehensif
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
              <div class="relative flex flex-col items-center text-center opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
                <div class="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full text-2xl font-bold mb-6 shadow-xl relative z-10">
                  1
                </div>
                <div class="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-green-300 transform translate-x-1/2 z-0"></div>
                
                <div class="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-2xl mb-6 shadow-lg">
                  <i class="fas fa-edit fa-3x text-blue-500 mb-4"></i>
                </div>
                <h3 class="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Isi Data Anda</h3>
                <p class="text-gray-600 leading-relaxed">Lengkapi informasi dasar mengenai kesehatan, riwayat keluarga, dan gaya hidup Anda dengan aman dan terenkripsi.</p>
              </div>
              
              <div class="relative flex flex-col items-center text-center opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.2s;">
                <div class="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full text-2xl font-bold mb-6 shadow-xl relative z-10">
                  2
                </div>
                <div class="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-300 to-purple-300 transform translate-x-1/2 z-0"></div>
                
                <div class="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-2xl mb-6 shadow-lg">
                  <i class="fas fa-cogs fa-3x text-green-500 mb-4"></i>
                </div>
                <h3 class="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Proses Analisis</h3>
                <p class="text-gray-600 leading-relaxed">Sistem AI kami menganalisis data menggunakan algoritma machine learning yang telah divalidasi secara klinis.</p>
              </div>
              
              <div class="flex flex-col items-center text-center opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.3s;">
                <div class="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full text-2xl font-bold mb-6 shadow-xl">
                  3
                </div>
                
                <div class="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-2xl mb-6 shadow-lg">
                  <i class="fas fa-file-alt fa-3x text-purple-500 mb-4"></i>
                </div>
                <h3 class="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Lihat Hasilnya</h3>
                <p class="text-gray-600 leading-relaxed">Dapatkan laporan detail risiko diabetes beserta rekomendasi tindak lanjut dan konsultasi dengan dokter.</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Testimonials Section -->
        <section class="py-16 lg:py-24 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
          <div class="container mx-auto max-w-7xl">
            <div class="text-center mb-16">
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 opacity-0 transform translate-y-10 animate-on-scroll">
                Apa Kata 
                <span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Pengguna Kami?
                </span>
              </h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
                Ribuan pengguna telah merasakan manfaat deteksi dini diabetes dengan alat kami
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              <div class="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mr-4 flex items-center justify-center text-white font-bold text-xl">
                    AR
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800 text-lg">Aisha R.</h4>
                    <p class="text-sm text-green-600 font-medium">Pengguna Aktif • Jakarta</p>
                  </div>
                </div>
                <div class="flex mb-4">
                  <span class="text-yellow-400">★★★★★</span>
                </div>
                <p class="text-gray-700 italic leading-relaxed">"Sangat membantu untuk deteksi dini! Antarmukanya mudah dipahami dan sarannya sangat bermanfaat. Saya jadi lebih aware dengan kesehatan saya."</p>
              </div>
              
              <div class="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.2s;">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mr-4 flex items-center justify-center text-white font-bold text-xl">
                    BS
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800 text-lg">Budi S.</h4>
                    <p class="text-sm text-green-600 font-medium">Peduli Kesehatan • Bandung</p>
                  </div>
                </div>
                <div class="flex mb-4">
                  <span class="text-yellow-400">★★★★★</span>
                </div>
                <p class="text-gray-700 italic leading-relaxed">"Aplikasi yang sangat berguna untuk memonitor risiko kesehatan. Hasil analisisnya detail dan mudah dipahami. Saya merekomendasikannya untuk keluarga!"</p>
              </div>
            </div>
          </div>
        </section>
      
       <!-- CTA Section -->
        <section class="relative py-20 md:py-32 px-4 text-center overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800"></div>
          
          <!-- Animated Background -->
          <div class="absolute inset-0">
            <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full animate-pulse" style="animation-delay: 2s;"></div>
            <div class="absolute top-3/4 left-3/4 w-24 h-24 bg-white/10 rounded-full animate-pulse" style="animation-delay: 4s;"></div>
          </div>
          
          <div class="container mx-auto relative z-10 max-w-4xl">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 opacity-0 transform -translate-y-10 animate-fadeInUp leading-tight" style="animation-delay: 0.2s;">
              Jaga Kesehatan Anda, 
              <span class="bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent">
                Mulai Hari Ini
              </span>
            </h2>
            <p class="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto opacity-0 transform -translate-y-10 animate-fadeInUp leading-relaxed" style="animation-delay: 0.4s;">
              Jangan tunda lagi, lakukan pemeriksaan risiko diabetes sekarang dan ambil langkah proaktif untuk masa depan yang lebih sehat bersama keluarga.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 transform -translate-y-10 animate-fadeInUp" style="animation-delay: 0.6s;">
              <a href="#/diabetes-form-checked-user" 
                 class="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-10 py-4 text-lg rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 min-w-[250px]">
                <i class="fas fa-heartbeat mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                Mulai Pemeriksaan Gratis
              </a>
            </div>
          </div>
        </section>


       <!-- Footer -->
        <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-16 px-4">
          <div class="container mx-auto max-w-7xl">
            <div class="text-center mb-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                <i class="fas fa-heartbeat text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Diabetes Risk Checker</h3>
              <p class="text-gray-400 max-w-md mx-auto">Deteksi dini untuk hidup yang lebih sehat</p>
            </div>
            
            <div class="border-t border-gray-700 pt-8 text-center">
              <p class="mb-2 text-gray-400">&copy; ${new Date().getFullYear()} Diabetes Risk Checker. Semua Hak Dilindungi.</p>
              <p class="text-sm text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed">
                <i class="fas fa-exclamation-triangle text-red-500 mr-1"></i>
                <strong>Peringatan:</strong> Alat ini adalah alat bantu skrining dan tidak menggantikan konsultasi medis profesional. Segera hubungi dokter untuk diagnosis dan penanganan lebih lanjut.
              </p>
              
              <div class="flex justify-center space-x-6">
                <a href="#" aria-label="Facebook" class="group">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <i class="fab fa-facebook-f"></i>
                  </div>
                </a>
                <a href="#" aria-label="Twitter" class="group">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <i class="fab fa-twitter"></i>
                  </div>
                </a>
                <a href="#" aria-label="Instagram" class="group">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-red-500 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <i class="fab fa-instagram"></i>
                  </div>
                </a>
                <a href="#" aria-label="Email" class="group">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <i class="fas fa-envelope"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </footer>
    </div>
    `;
  }

  async afterRender() {
    const scrollAnimatedElements =
      document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "transition-all",
              "duration-1000",
              "ease-out"
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    scrollAnimatedElements.forEach((el) => {
      observer.observe(el);
    });

    const countUpElements = document.querySelectorAll(".count-up");
    countUpElements.forEach((el) => {
      const target = +el.getAttribute("data-target");
      el.innerText = "0";
      const duration = 2000;
      const incrementTime = 10;
      const step = target / (duration / incrementTime);

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        if (el.innerHTML.includes("%")) {
          el.innerText = Math.ceil(current) + "%";
        } else if (el.innerHTML.includes("+")) {
          el.innerText = Math.ceil(current).toLocaleString() + "+";
        } else {
          el.innerText = Math.ceil(current).toLocaleString();
        }
      }, incrementTime);
    });

    const heroElements = document.querySelectorAll(".hero-animate");
    const ctaElements = document.querySelectorAll(".cta-animate");
    setTimeout(() => {
      document.querySelectorAll(".animate-fadeInUp").forEach((el) => {});
    }, 100);
  }
}
