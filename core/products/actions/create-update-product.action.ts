import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/products";

export const updateCreateProduct = (product: Partial<Product>) => {
  if (product.id && product.id != "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  console.log(product);
  const { id, images, user, ...rest } = product;
  try {
    const { data } = await productsApi.patch(`/products/${id}`, {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error("Error to update product");
  }
};

const createProduct = async (product: Partial<Product>) => {
  const { id, images, user, ...rest } = product;
  try {
    const { data } = await productsApi.post("/products", {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error("Error to create product");
  }
};
