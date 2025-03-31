import {
  authCheckStatus,
  authLogin,
  authRegister,
} from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unaunthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  changeStatus: (
    resp: { token: string; user: User } | null
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    fullName: string,
    password: string
  ) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  changeStatus: async (resp: { token: string; user: User } | null) => {
    if (!resp) {
      get().logout();
      return false;
    }

    set({ status: "authenticated", token: resp.token, user: resp.user });

    // Guardar el token en el secure storage
    await SecureStorageAdapter.setItem("token", resp!.token);

    return true;
  },
  login: async (email, password) => {
    const resp = await authLogin(email, password);

    return get().changeStatus(resp);
  },
  register: async (email, fullName, password) => {
    const resp = await authRegister(email, fullName, password);

    return get().changeStatus(resp);
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();

    get().changeStatus(resp);
  },
  logout: async () => {
    // TODO: Clear token del secure storage
    await SecureStorageAdapter.deleteItem("token");

    set({ status: "unaunthenticated", user: undefined, token: undefined });

    return;
  },
}));
