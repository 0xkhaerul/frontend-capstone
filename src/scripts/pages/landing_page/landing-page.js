export default class LandingPage {
  async render() {
    return `
   <div class="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <section 
        class="relative text-white py-20 md:py-32" 
        style="background-image: url('/assets/images/background-image.jpg'); background-size: cover; background-position: center;">
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

      <section class="py-12 lg:py-20 bg-white">
        <div class="container mx-auto px-6">
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
      </section>
      <section class="py-16 lg:py-24 px-4 bg-gray-50">
        <div class="container mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16 opacity-0 transform translate-y-10 animate-on-scroll">Mengapa Alat Kami?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div class="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out text-center transform hover:-translate-y-2 opacity-0 translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
              <div class="flex justify-center items-center mb-6">
                <div class="bg-blue-100 text-blue-600 p-6 rounded-full shadow-md">
                  <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
              </div>
              <h3 class="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">Cepat & Mudah</h3>
              <p class="text-gray-600">Dapatkan hasil penilaian risiko dalam hitungan menit melalui antarmuka yang intuitif.</p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out text-center transform hover:-translate-y-2 opacity-0 translate-y-10 animate-on-scroll" style="animation-delay: 0.2s;">
              <div class="flex justify-center items-center mb-6">
                <div class="bg-teal-100 text-teal-600 p-6 rounded-full shadow-md">
                  <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
              </div>
              <h3 class="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">Akurat & Terpercaya</h3>
              <p class="text-gray-600">Analisis berdasarkan standar medis dan penelitian ilmiah terkini.</p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out text-center transform hover:-translate-y-2 opacity-0 translate-y-10 animate-on-scroll" style="animation-delay: 0.3s;">
              <div class="flex justify-center items-center mb-6">
                <div class="bg-purple-100 text-purple-600 p-6 rounded-full shadow-md">
                  <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
              </div>
              <h3 class="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">Rekomendasi Personal</h3>
              <p class="text-gray-600">Dapatkan saran langkah preventif yang disesuaikan untuk Anda.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white py-16 lg:py-24 px-4">
        <div class="container mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16 opacity-0 transform translate-y-10 animate-on-scroll">Bagaimana Cara Kerjanya?</h2>
          <div class="flex flex-col md:flex-row justify-center items-start gap-8 lg:gap-16">
            <div class="flex-1 max-w-sm p-6 flex flex-col items-center text-center opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
              <div class="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6 shadow-lg">1</div>
              <i class="fas fa-edit fa-3x text-blue-500 mb-4"></i>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Isi Data Anda</h3>
              <p class="text-gray-600">Lengkapi beberapa informasi dasar mengenai kesehatan dan gaya hidup Anda.</p>
            </div>
            <div class="flex-1 max-w-sm p-6 flex flex-col items-center text-center opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.2s;">
              <div class="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6 shadow-lg">2</div>
              <i class="fas fa-cogs fa-3x text-blue-500 mb-4"></i>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Proses Analisis</h3>
              <p class="text-gray-600">Sistem kami akan menganalisis data Anda menggunakan algoritma cerdas.</p>
            </div>
            <div class="flex-1 max-w-sm p-6 flex flex-col items-center text-center opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.3s;">
              <div class="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6 shadow-lg">3</div>
              <i class="fas fa-file-alt fa-3x text-blue-500 mb-4"></i>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Lihat Hasilnya</h3>
              <p class="text-gray-600">Dapatkan laporan risiko diabetes beserta rekomendasi tindak lanjut.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-16 lg:py-24 px-4 bg-gray-50">
        <div class="container mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16 opacity-0 transform translate-y-10 animate-on-scroll">Apa Kata Mereka?</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            <div class="bg-white p-8 rounded-xl shadow-xl opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.1s;">
              <div class="flex items-center mb-4">
                <img src="/assets/images/avatar-1.jpg" alt="Testimoni Pengguna 1" class="w-12 h-12 rounded-full mr-4 object-cover">
                <div>
                  <h4 class="font-semibold text-gray-800">Aisha R.</h4>
                  <p class="text-sm text-teal-600">Pengguna Aktif</p>
                </div>
              </div>
              <p class="text-gray-600 italic">"Sangat membantu untuk deteksi dini! Antarmukanya mudah dipahami dan sarannya bermanfaat."</p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-xl opacity-0 transform translate-y-10 animate-on-scroll" style="animation-delay: 0.2s;">
              <div class="flex items-center mb-4">
                <img src="/assets/images/avatar-2.jpg" alt="Testimoni Pengguna 2" class="w-12 h-12 rounded-full mr-4 object-cover">
                <div>
                  <h4 class="font-semibold text-gray-800">Budi S.</h4>
                  <p class="text-sm text-teal-600">Peduli Kesehatan</p>
                </div>
              </div>
              <p class="text-gray-600 italic">"Aplikasi yang sangat berguna untuk memonitor risiko kesehatan. Saya merekomendasikannya!"</p>
            </div>
          </div>
        </div>
      </section>

      <section 
        class="relative py-20 md:py-32 px-4 text-center"
        style="background-image: url('/assets/images/background-image2.jpg'); background-size: cover; background-position: center;">
        <div class="absolute inset-0 bg-blue-800 opacity-80"></div>
        <div class="container mx-auto relative z-10">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 opacity-0 transform -translate-y-10 animate-fadeInUp" style="animation-delay: 0.2s;">Jaga Kesehatan Anda, Mulai Hari Ini.</h2>
          <p class="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto opacity-0 transform -translate-y-10 animate-fadeInUp" style="animation-delay: 0.4s;">Jangan tunda lagi, lakukan pemeriksaan risiko diabetes sekarang dan ambil langkah proaktif untuk masa depan yang lebih sehat.</p>
          <a href="#/diabetes-checked" 
             class="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-10 py-4 text-lg rounded-lg 
                    transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 
                    focus:ring-teal-400 focus:ring-opacity-75 opacity-0 transform -translate-y-10 animate-fadeInUp" 
             style="animation-delay: 0.6s;">
            <i class="fas fa-heartbeat mr-2"></i>Lakukan Pemeriksaan Gratis
          </a>
        </div>
      </section>

      <footer class="bg-gray-800 text-gray-300 py-12 px-4">
        <div class="container mx-auto text-center">
          <div class="mb-6">
             <img src="/assets/images/logo.png" alt="Logo Diabetes Risk Checker" class="h-12 mx-auto mb-4">
             <p class="text-lg font-semibold text-white">Diabetes Risk Checker</p>
          </div>
          <p class="mb-2 text-gray-400">&copy; ${new Date().getFullYear()} Diabetes Risk Checker. Semua Hak Dilindungi.</p>
          <p class="text-sm text-gray-500 mb-6 max-w-2xl mx-auto">Peringatan: Alat ini adalah alat bantu skrining dan tidak menggantikan konsultasi medis profesional. Segera hubungi dokter untuk diagnosis dan penanganan lebih lanjut.</p>
          <div class="flex justify-center space-x-6">
            <a href="#" aria-label="Facebook" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 transform hover:scale-110"><i class="fab fa-facebook-f fa-lg"></i></a>
            <a href="#" aria-label="Twitter" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 transform hover:scale-110"><i class="fab fa-twitter fa-lg"></i></a>
            <a href="#" aria-label="Instagram" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 transform hover:scale-110"><i class="fab fa-instagram fa-lg"></i></a>
            <a href="#" aria-label="Email" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 transform hover:scale-110"><i class="fas fa-envelope fa-lg"></i></a>
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
