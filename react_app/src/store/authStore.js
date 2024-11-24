import { atom } from "nanostores";

export const authStore = atom({
  isAuthenticated: localStorage.getItem("accessToken") != null,
  user: JSON.parse(localStorage.getItem("userData")) || null,
});

export const loginStore = (access_token, userData) => {
  authStore.set({
    isAuthenticated: true,
    user: userData,
  });
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const logoutStore = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userData");
  authStore.set({ isAuthenticated: false, user: null });
};

window.addEventListener("storage", () => {
  authStore.set({
    isAuthenticated: localStorage.getItem("accessToken") != null,
    user: JSON.parse(localStorage.getItem("userData")) || null,
  });
});
