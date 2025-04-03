import { create } from "zustand";

interface CameraState {
  selectedImages: string[];
  addSelectedImage: (image: string) => void;
  clearImage: () => void;
}

export const useCameraStore = create<CameraState>()((set) => ({
  selectedImages: [],
  addSelectedImage: (image) =>
    set((state) => ({ selectedImages: [...state.selectedImages, image] })),
  clearImage: () => set({ selectedImages: [] }),
}));
