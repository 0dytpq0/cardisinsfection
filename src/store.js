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
    checkerinfo: {},
    changeCheckerInfo: (newData) =>
      set((state) => ({
        checkerinfo: newData,
      })),
    actorinfo: {},
    changeActorInfo: (newData) =>
      set((state) => ({
        actorinfo: newData,
      })),
  }))
);
