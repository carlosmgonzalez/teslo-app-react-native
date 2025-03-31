type Roles = "user" | "admin" | "super-admin";

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}
