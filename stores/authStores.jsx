"use client"
import { apiRequest } from "@/lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      isLoading: false,

      error: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      login: async ({ email, password }) => {
        set({ isLoading: true });
        try {
          const res = await apiRequest({
            method: "post",
            url: "api/auth/login",
            data: {
              email,
              password
            },
            requiresAuth: false,
          });
          console.log("res: ", res.data);
          const { accessToken, refreshToken, user } = res.data;

          set({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
            isLoggedIn: true,
            isLoading: false,
          });

          return res;
        } catch (err) {
          console.log(err);
          set({
            isLoading: false,
            isLoggedIn: false,
          });
          throw err;
        }
      },
      register: async ({ username, email, password }) => {
        set({ isLoading: true });
        try {
          const res = await apiRequest({
            method: "post",
            url: "/api/auth/register",
            data: {
              username,
              email,
              password,
            },
            requiresAuth: false,
          });
          const { accessToken, refreshToken, user } = res.data;
          set({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
            isLoggedIn: true,
            isLoading: false,
          });
          return res;
        } catch (err) {
          console.log(err);
          set({
            isLoading: false,
            isLoggedIn: false,
          });
          throw err;
        }
      },
      forgetPassword: async ({ email, newPassword }) => {
        set({ isLoading: true });
        try {
          const res = await apiRequest({
            method: "put",
            url: "api/auth/forgetPassword",
            data: {
              email,
              newPassword,
            },
            requiresAuth: false,
          });
          set({ isLoading: false })
          return res;
        } catch (err) {
          set({ isLoading: false })
          throw err;
        }
      },
      refreshAccessToken: async () => {
        try {
          const res = await apiRequest({
            method: "post",
            url: "/api/auth/refresh",
            data: {},
            requiresAuth: true,
          });
          set({
            accessToken: res.data.accessToken,
          })
        } catch (err) {
          console.log("some errors occurs in refreshToken : ", err)
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isLoggedIn: false,
          });
        }
      },
      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-storage", // localStorage key used by persist
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);