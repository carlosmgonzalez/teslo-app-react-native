import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/products";

export const updateCreateProduct = (product: Partial<Product>) => {
  if (product.id && product.id != "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};

const prepareImages = async (images: string[]): Promise<string[]> => {
  const fileImages = images.filter((img) => img.startsWith("file"));
  const currentImages = images.filter((img) => !img.startsWith("file"));

  if (fileImages.length > 0) {
    const uploadedImages = await Promise.all(fileImages.map(uploadImage));

    currentImages.push(...uploadedImages);
  }

  return currentImages.map((img) => img.split("/").pop()!);
};

const uploadImage = async (image: string): Promise<string> => {
  console.log(image);

  const formData = new FormData() as any;

  formData.append("file", {
    uri: image,
    type: "image/jpeg",
    name: image.split("/").pop(),
  });

  try {
    const { data } = await productsApi.post<{ secureUrl: string }>(
      "/files/product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data) => data,
      }
    );

    console.log(data);

    return data.secureUrl;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while uploading image");
  }
};

const updateProduct = async (product: Partial<Product>) => {
  const { id, images, user, ...rest } = product;
  try {
    const checkImages = await prepareImages(images!);

    const { data } = await productsApi.patch(`/products/${id}`, {
      ...rest,
      images: checkImages,
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
