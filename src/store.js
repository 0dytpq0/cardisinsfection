import create from "zustand";
import { persist, redux } from "zustand/middleware";

export const useInfo = create(
  persist((set) => ({
    carinfo: {},
    changeCarInfo: (newData) =>
      set((state) => ({
        carinfo: newData,
      })),
    areainfo: {},
    changeAreaInfo: (newData) =>
      set((state) => ({
        areainfo: newData,
      })),
  }))
);
