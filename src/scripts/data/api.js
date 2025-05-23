// data/api.js
import { getAccessToken } from "../utils/auth";
import CONFIG from "../config";

const ENDPOINTS = {
  // Auth
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  DIABETES_PREDICTION: `${CONFIG.DIABETES_PREDICTION}/predict`,
  DIABETES_PREDICTION_GUEST: `${CONFIG.DIABETES_PREDICTION}/predicted/guest`,
};

export const predictDiabetesAsUser = async (file) => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token available");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(ENDPOINTS.DIABETES_PREDICTION, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Authenticated prediction failed");
  }

  return await response.json();
};

export const predictDiabetes = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(ENDPOINTS.DIABETES_PREDICTION_GUEST, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
};

export async function register({ name, email, password }) {
  try {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

export async function login({ email, password }) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}
