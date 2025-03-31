import { productsApi } from "../../api/productsApi";
import { User } from "../interfaces/user";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export const userToken = (
  data: AuthResponse
): { user: User; token: string } => {
  const { token, ...user } = data;

  return {
    user,
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase().trim();

  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return userToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error("User and/or password not valid");
    return null;
  }
};

export const authRegister = async (
  email: string,
  fullName: string,
  password: string
) => {
  email = email.toLowerCase().trim();

  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/register", {
      email,
      fullName,
      password,
    });

    return userToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>("/auth/check-auth");

    return userToken(data);
  } catch (error) {
    return null;
  }
};
