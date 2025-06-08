import routes from "../routes/routes";
import { getActiveRoute, parseActivePathname } from "../routes/url-parser";
import { isAuthenticated, removeAccessToken } from "../utils/auth";
import { DiabetesDisplayResult, DiabetesFormDisplayResult } from "../utils/indexeddb.js";
import { showNotification } from "../utils/notifications.js";

class App {
  constructor({ content, drawerButton, navigationDrawer }) {
    this.content = content;
    this.drawerButton = drawerButton;
    this.navigationDrawer = navigationDrawer;
    this._initAppShell();
    this._setupSkipToContent();
  }

  _initAppShell() {
    this._setupDrawer();
    this._setupNavigation();
    this._setupLogout();
  }

  _setupSkipToContent() {
    if (!document.querySelector(".skip-to-content")) {
      const skipLink = document.createElement("a");
      skipLink.className = "skip-to-content";
      skipLink.href = "#main-content";
      skipLink.textContent = "Skip to content";
      document.body.insertBefore(skipLink, document.body.firstChild);

      skipLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.content.setAttribute("tabindex", "-1");
        this.content.focus();
        this.content.scrollIntoView();
      });
    }
  }

  _setupDrawer() {
    if (this.drawerButton) {
      this.drawerButton.addEventListener("click", (event) => {
        if (this.navigationDrawer) {
          this.navigationDrawer.classList.toggle("open");
        }
        event.stopPropagation();
      });
    }

    document.addEventListener("click", (event) => {
      if (
        this.navigationDrawer &&
        !this.navigationDrawer.contains(event.target) &&
        this.navigationDrawer.classList.contains("open")
      ) {
        this.navigationDrawer.classList.remove("open");
      }
    });
  }

  _setupNavigation() {
    this._updateNavigation();
    window.addEventListener("hashchange", () => {
      this._updateNavigation();
    });
  }

  _updateNavigation() {
    const isLoggedIn = isAuthenticated();
    const loginContainer = document.getElementById("login-container");
    const registerContainer = document.getElementById("register-container");
    const profileContainer = document.getElementById("profile-container");
    const diabetesCheckedUserContainer = document.getElementById("diabetes-checked-user-container");
    
    // Mobile nav items
    const mobileLoginContainer = document.getElementById("mobile-login-container");
    const mobileRegisterContainer = document.getElementById("mobile-register-container");
    const mobileProfileSection = document.getElementById("mobile-profile-section");
    const mobileDiabetesCheckLink = document.getElementById("mobile-diabetes-check-link");

    const elements = [
        loginContainer, registerContainer, profileContainer, diabetesCheckedUserContainer,
        mobileLoginContainer, mobileRegisterContainer, mobileProfileSection, mobileDiabetesCheckLink
    ];

    if (!elements.every(el => el)) {
        console.warn("One or more navigation elements are missing from the DOM.");
    }

    if (isLoggedIn) {
      if (diabetesCheckedUserContainer) diabetesCheckedUserContainer.style.display = "block";
      if (loginContainer) loginContainer.style.display = "none";
      if (registerContainer) registerContainer.style.display = "none";
      if (profileContainer) profileContainer.style.display = "block";
      if (mobileLoginContainer) mobileLoginContainer.style.display = "none";
      if (mobileRegisterContainer) mobileRegisterContainer.style.display = "none";
      if (mobileProfileSection) mobileProfileSection.style.display = "block";
      if (mobileDiabetesCheckLink) mobileDiabetesCheckLink.style.display = "block";
    } else {
      if (diabetesCheckedUserContainer) diabetesCheckedUserContainer.style.display = "none";
      if (loginContainer) loginContainer.style.display = "block";
      if (registerContainer) registerContainer.style.display = "block";
      if (profileContainer) profileContainer.style.display = "none";
      if (mobileLoginContainer) mobileLoginContainer.style.display = "block";
      if (mobileRegisterContainer) mobileRegisterContainer.style.display = "block";
      if (mobileProfileSection) mobileProfileSection.style.display = "none";
      if (mobileDiabetesCheckLink) mobileDiabetesCheckLink.style.display = "none";
    }
  }

  _setupLogout() {
    const dropdownLogout = document.getElementById("dropdown-logout");
    const mobileLogoutButton = document.getElementById("mobile-logout-button");

    const handleLogoutEvent = async (event) => {
        event.preventDefault();
        await this._handleLogout();
    };

    if (dropdownLogout) {
      dropdownLogout.addEventListener("click", handleLogoutEvent);
    }
    if (mobileLogoutButton) {
      mobileLogoutButton.addEventListener("click", handleLogoutEvent);
    }
  }

  async _handleLogout() {
    removeAccessToken();

    try {
      await DiabetesDisplayResult.clearAllResults();
      await DiabetesFormDisplayResult.clearAllResults();
    } catch (error) {
      console.error("Error clearing IndexedDB on logout:", error);
    }
    
    sessionStorage.setItem('showLogoutNotification', 'true');
    
    window.location.hash = "#/login";
  }

  _checkAndShowSessionNotifications() {
    if (sessionStorage.getItem('showLoginNotification')) {
      showNotification('Login successful! Welcome.', 'success');
      sessionStorage.removeItem('showLoginNotification');
    }
    
    if (sessionStorage.getItem('showLogoutNotification')) {
      showNotification('You have successfully logged out.', 'info');
      sessionStorage.removeItem('showLogoutNotification');
    }
  }
  
  async renderPage() {
    const activeRoute = getActiveRoute();
    const routeConfig = routes[activeRoute];

    if (!routeConfig) {
      this.content.innerHTML = "<p>Page not found</p>";
      return;
    }

    if (routeConfig.check && !routeConfig.check()) {
      return;
    }
    
    try {
      const page = routeConfig.page;
      const urlParams = parseActivePathname();

      const renderContent = async () => {
        this.content.innerHTML = await page.render(urlParams);
        await page.afterRender(urlParams);
        this._updateNavigation();
        this._checkAndShowSessionNotifications();
      };

      if (document.startViewTransition) {
        document.startViewTransition(renderContent);
      } else {
        await renderContent();
      }
    } catch (error) {
      console.error("Error rendering page:", error);
      this.content.innerHTML = "<p>Error loading page</p>";
    }
  }
}

export default App;