// data/api.js
import { getAccessToken } from "../utils/auth";
import CONFIG from "../config";

const ENDPOINTS = {
  // Auth
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,

  DIABETES_USER_HISTORY: `${CONFIG.BASE_URL}/retina-user`,
  DIABETES_USER_FORM_HISTORY: `${CONFIG.BASE_URL}/form-check-history`,

  // machine learning
  DIABETES_PREDICTION: `${CONFIG.DIABETES_PREDICTION}/predict`,
  DIABETES_FORM_PREDICTION: `${CONFIG.DIABETES_FORM_PREDICTION}/predict-history`,
};

export const getAllDiabetesUserFormHistory = async () => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token available");

  const response = await fetch(ENDPOINTS.DIABETES_USER_FORM_HISTORY, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch form check history");
  }

  const apiResponse = await response.json();

  // Pastikan kita mengakses data yang benar
  if (!apiResponse.success || !apiResponse.data) {
    throw new Error("Invalid API response format");
  }

  // Langsung return data tanpa transformasi
  return apiResponse.data;
};

export const deleteDiabatesUserFormHistory = async (id) => {
  const token = getAccessToken();
  const response = await fetch(
    `${ENDPOINTS.DIABETES_USER_FORM_HISTORY}/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete history");
  }

  return response.json();
};

export const predictDiabetesFormAsUser = async (formData) => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token available");

  const response = await fetch(ENDPOINTS.DIABETES_FORM_PREDICTION, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Form prediction failed");
  }

  return await response.json();
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

// data/api.js
export const deleteDiabatesUserHistory = async (id) => {
  const token = getAccessToken();
  const response = await fetch(`${ENDPOINTS.DIABETES_USER_HISTORY}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete history");
  }

  return response.json();
};

export const getAllDiabetesUserHistory = async () => {
  try {
    const token = getAccessToken();

    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(ENDPOINTS.DIABETES_USER_HISTORY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || "Failed to fetch diabetes history");
    }
  } catch (error) {
    console.error("Error fetching diabetes user history:", error);
    throw error;
  }
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
