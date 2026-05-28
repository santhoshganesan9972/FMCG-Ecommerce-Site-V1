"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAuthCookies, clearAuthCookies } from "@/lib/auth/token-utils";
import { getJwtExpiry, getJwtRole } from "@/lib/auth/token-utils";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "vendor" | "guest";
  token: string;
  expiresAt: string; // ISO date string
}

export type SocialProvider = "google" | "apple" | "facebook";

export interface SocialProfile {
  provider: SocialProvider;
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  phoneNumber: string | null;
  user: UserProfile | null;
  /** Access token (for API calls via interceptor) */
  accessToken: string | null;
  /** Linked social accounts */
  linkedSocials: SocialProfile[];
  /** Guest session flag */
  isGuest: boolean;

  login: (user: UserProfile, phone?: string) => void;
  /** Real API login handler — stores user and token separately */
  setAuth: (user: Omit<UserProfile, "token" | "expiresAt">, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
  hydrate: () => void;
  setUser: (user: UserProfile) => void;
  /** Update the stored access token (called by refresh interceptor) */
  setAccessToken: (token: string) => void;

  /** Guest login — create a temporary guest session */
  guestLogin: () => void;

  /** Social login — authenticate via a social provider */
  socialLogin: (provider: SocialProvider) => void;

  /** Link a social account to existing user */
  linkSocial: (profile: SocialProfile) => void;

  /** Unlink a social account */
  unlinkSocial: (provider: SocialProvider) => void;

  /** Convert guest session to a full user account */
  convertGuestToUser: (phone: string, name: string) => void;
}

function isTokenExpired(expiresAt: string): boolean {
  try {
    return new Date(expiresAt).getTime() < Date.now();
  } catch {
    return true;
  }
}

function generateUserId(): string {
  return "user_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
}

function generateToken(): string {
  return "mock_jwt_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
}

function createExpiry(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

/** Mock social payloads (simulates OAuth response) */
const MOCK_SOCIAL_USERS: Record<SocialProvider, { name: string; email: string }> = {
  google: { name: "Alex G.", email: "alex.gmail@example.com" },
  apple: { name: "Alex A.", email: "alex.icloud@example.com" },
  facebook: { name: "Alex F.", email: "alex.fb@example.com" },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      phoneNumber: null,
      user: null,
      accessToken: null,
      linkedSocials: [],
      isGuest: false,

      login: (user, phone) => {
        storeAuth(user, user.token, user.role, user.expiresAt);
        set({
          isLoggedIn: true,
          phoneNumber: phone ?? null,
          user,
          accessToken: user.token,
          isGuest: false,
        });
      },

      /**
       * Real API login handler.
       * Accepts a user object and separate tokens.
       * Computes expiry and role from the JWT automatically.
       */
      setAuth: (userData, accessToken, _refreshToken) => {
        // Extract expiry and role from JWT if possible
        const expiresAt = getJwtExpiry(accessToken) ?? createExpiry(7);
        const role = (getJwtRole(accessToken) ?? userData.role ?? "user") as UserProfile["role"];

        const user: UserProfile = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role,
          token: accessToken,
          expiresAt,
        };

        storeAuth(user, accessToken, role, expiresAt);
        set({
          isLoggedIn: true,
          phoneNumber: userData.phone ?? null,
          user,
          accessToken,
          isGuest: false,
        });
      },

      logout: () => {
        clearAuthCookies();
        set({
          isLoggedIn: false,
          phoneNumber: null,
          user: null,
          accessToken: null,
          linkedSocials: [],
          isGuest: false,
        });
      },

      /** Rehydrate and validate token expiry on app startup */
      hydrate: () => {
        const { user } = get();
        if (user && isTokenExpired(user.expiresAt)) {
          set({
            isLoggedIn: false,
            phoneNumber: null,
            user: null,
            accessToken: null,
            linkedSocials: [],
            isGuest: false,
          });
        }
      },

      setUser: (user) => {
        storeAuth(user, user.token, user.role, user.expiresAt);
        set({ user, isLoggedIn: true, isGuest: false, accessToken: user.token });
      },

      setAccessToken: (token) => {
        const { user } = get();
        if (user) {
          const expiresAt = getJwtExpiry(token) ?? user.expiresAt;
          const updatedUser = { ...user, token, expiresAt };
          const role = getJwtRole(token) ?? user.role;
          storeAuth(updatedUser, token, role, expiresAt);
          set({ accessToken: token, user: updatedUser });
        } else {
          set({ accessToken: token });
        }
      },

      /** Guest login — creates a temporary session that expires in 24h */
      guestLogin: () => {
        const user: UserProfile = {
          id: "guest_" + Date.now(),
          name: "Guest",
          email: "guest@fmcgcommerce.com",
          role: "guest",
          token: generateToken(),
          expiresAt: createExpiry(1), // 24 hours
        };
        storeAuth(user, user.token, user.role, user.expiresAt);
        set({
          isLoggedIn: true,
          phoneNumber: null,
          user,
          accessToken: user.token,
          isGuest: true,
          linkedSocials: [],
        });
      },

      /** Social login — mock OAuth flow for Google / Apple / Facebook */
      socialLogin: (provider) => {
        const mock = MOCK_SOCIAL_USERS[provider];
        const profile: SocialProfile = {
          provider,
          id: `${provider}_${Date.now()}`,
          name: mock.name,
          email: mock.email,
        };

        const user: UserProfile = {
          id: generateUserId(),
          name: mock.name,
          email: mock.email,
          role: "user",
          token: generateToken(),
          expiresAt: createExpiry(30), // 30 days
        };

        storeAuth(user, user.token, user.role, user.expiresAt);
        set({
          isLoggedIn: true,
          phoneNumber: null,
          user,
          accessToken: user.token,
          isGuest: false,
          linkedSocials: [profile],
        });
      },

      /** Link a social account */
      linkSocial: (profile) =>
        set((state) => ({
          linkedSocials: [
            ...state.linkedSocials.filter((s) => s.provider !== profile.provider),
            profile,
          ],
        })),

      /** Unlink a social account */
      unlinkSocial: (provider) =>
        set((state) => ({
          linkedSocials: state.linkedSocials.filter((s) => s.provider !== provider),
        })),

      /** Convert guest to full user */
      convertGuestToUser: (phone, name) => {
        const { user: currentUser } = get();
        if (!currentUser || currentUser.role !== "guest") return;

        const user: UserProfile = {
          ...currentUser,
          name,
          role: "user",
          expiresAt: createExpiry(30),
        };
        storeAuth(user, user.token, user.role, user.expiresAt);
        set({
          user,
          isGuest: false,
          phoneNumber: phone,
          accessToken: user.token,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        phoneNumber: state.phoneNumber,
        user: state.user,
        linkedSocials: state.linkedSocials,
        isGuest: state.isGuest,
        // Do NOT persist accessToken — it lives in memory for security
      }),
    }
  )
);

/**
 * Helper to sync auth state to cookies.
 */
function storeAuth(user: UserProfile, token: string, role: string, expiresAt: string): void {
  setAuthCookies(token, role, expiresAt);
}

/** Auto-hydrate the store (validate token expiry) on initial module load */
if (typeof window !== "undefined") {
  const state = useAuthStore.getState();
  state.hydrate();
  // Sync cookies after hydration
  const { user } = useAuthStore.getState();
  if (user) {
    setAuthCookies(user.token, user.role, user.expiresAt);
  }
}