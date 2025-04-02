import { User } from "@/core/auth/interfaces/user";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user?: User;
}

export enum Gender {
  Kid = "kid",
  Men = "men",
  Unisex = "unisex",
  Women = "women",
}

export enum Size {
  Xs = "XS",
  S = "S",
  M = "M",
  L = "L",
  Xl = "XL",
  Xxl = "XXL",
  Xxxl = "XXXL",
}
