import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interfaces/products";

const emptyProduct: Product = {
  id: "",
  description: "",
  title: "",
  price: 0,
  slug: "",
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === "new") return emptyProduct;
  try {
    const { data } = await productsApi.get<Product>(`products/${id}`);

    return {
      ...data,
      images: data.images.map((img) => `${API_URL}/files/product/${img}`),
    };
  } catch (error) {
    throw new Error(`Product with id: ${id} not found`);
  }
};
