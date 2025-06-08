import profileData from "./data.js";

export default class ProfilePage {
  async render() {
    return `
      <section class="container mx-auto p-4">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div class="md:flex">
            <div class="md:shrink-0">
              <img class="h-48 w-full object-cover md:h-full md:w-48" src="${profileData.avatar}" alt="Profile picture">
            </div>
          </div>
          
          <!-- Profile Info -->
          <div class="profile-info hidden" id="profile-info">
            <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <!-- Profile Header -->
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
                <div class="flex items-center">
                  <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h2 class="text-2xl font-bold text-white" id="header-name">Loading...</h2>
                    <p class="text-blue-100" id="header-email">Loading...</p>
                  </div>
                </div>
              </div>
              
              <!-- Profile Details -->
              <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Name Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-name">Loading...</span>
                    </div>
                  </div>
                  
                  <!-- Email Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-email">Loading...</span>
                    </div>
                  </div>
                  
                  <!-- Member Since Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-created">Loading...</span>
                    </div>
                  </div>
                </div>
                
                <!-- Last Updated -->
                <div class="pt-4 border-t border-gray-200">
                  <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>Last updated:</span>
                    <span id="user-updated" class="font-medium">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
