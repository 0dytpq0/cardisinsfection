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
    checkermodalinfo: {},
    changeCheckerModalInfo: (newData) =>
      set((state) => ({
        checkermodalinfo: newData,
      })),
    actorinfo: {},
    changeActorInfo: (newData) =>
      set((state) => ({
        actorinfo: newData,
      })),
    actormodalinfo: {},
    changeActorModalInfo: (newData) =>
      set((state) => ({
        actormodalinfo: newData,
      })),
  }))
);
