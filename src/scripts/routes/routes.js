import BacaanPage from "../pages/bacaan_page/bacaan-page";
import PanduanPage from "../pages/panduan_page/panduan-page";
import RiwayatPage from "../pages/riwayat_page/riwayat-page";
import ProfilePage from "../pages/profile_page/profile-page";
import LandingPage from "../pages/landing_page/landing-page";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import DiabetesPageUser from "../pages/diabetes_user_page/diabetes-user-page";
import DiabetesFormPageUser from "../pages/diabetest_form_page/diabetes-user-form-page";
import { checkAuth, checkUnauth } from "../utils/auth";

const createProtectedRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: checkAuth,
  };
};

const createUnauthenticatedRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: checkUnauth,
  };
};

// Membuat rute yang bisa diakses semua pengguna (tanpa check autentikasi)
const createPublicRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: () => true, // Selalu mengembalikan true, mengizinkan akses untuk semua pengguna
  };
};

const routes = {
  "/": createPublicRoute(LandingPage),
  "/diabetes-checked-user": createProtectedRoute(DiabetesPageUser),
  "/diabetes-form-checked-user": createProtectedRoute(DiabetesFormPageUser),
  "/bacaan": createPublicRoute(BacaanPage),
  "/panduan-check": createPublicRoute(PanduanPage),
  "/profile": createProtectedRoute(ProfilePage),
  "/riwayat": createProtectedRoute(RiwayatPage),
  "/login": createUnauthenticatedRoute(LoginPage),
  "/register": createUnauthenticatedRoute(RegisterPage),
};

export default routes;
