import create from "zustand";

export const useInfo = create((set) => ({
  carinfo: {},
  changeCarInfo: (newData) =>
    set((state) => ({
      carinfo: newData,
    })),
}));
