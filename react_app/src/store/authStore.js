import { atom } from "nanostores";

export const authStore = atom({
  isAuthenticated: localStorage.getItem("accessToken") === "true",
  user: JSON.parse(localStorage.getItem("user")) || null,
});

export const loginStore = (access_token, userData) => {
  authStore.set({
    isAuthenticated: localStorage.getItem("accessToken") != null,
    user: userData,
  });
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const logoutStore = () => {
  authStore.set({ isAuthenticated: false, user: null });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userData");
};

window.addEventListener("storage", () => {
  authStore.set({
    isAuthenticated: localStorage.getItem("accessToken") != null,
    user: JSON.parse(localStorage.getItem("userData")) || null,
  });
});
