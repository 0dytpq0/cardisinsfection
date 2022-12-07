import create from "zustand";
import { persist } from "zustand/middleware";

export const useInfo = create(
  persist((set) => ({
    carinfo: {},
    changeCarInfo: (newData) =>
      set((state) => ({
        carinfo: newData,
      })),
    carmodalinfo: {},
    changeCarModalInfo: (newData) =>
      set((state) => ({
        carmodalinfo: newData,
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
    waitingcar: [],
    waitingcurrentnumber: "",
    changeWaitingCar: (newData) =>
      set((state) => ({
        waitingcar: newData,
      })),
    changeWaitingCurrentNumber: (newData) =>
      set((state) => ({
        waitingcurrentnumber: newData,
      })),
    printedcar: [],
    changePrintedCar: (newData) =>
      set((state) => ({
        printedcar: newData,
      })),
  }))
);

export const useMqtt = create(
  persist((set) => ({
    client: null,
    changeClient: (newData) =>
      set((state) => ({
        client: newData,
      })),
    connectstatus: "",
    changeConnectStatus: (newData) =>
      set((state) => ({
        connectstatus: newData,
      })),
    payload: [],
    changePayload: (newData) =>
      set((state) => ({
        payload: newData,
      })),
    options: {
      keepalive: 3000,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 10 * 60 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    },
    ip: "",
    changeIp: (newData) =>
      set((state) => ({
        ip: newData,
      })),
    port: "",
    changePort: (newData) =>
      set((state) => ({
        port: newData,
      })),
  }))
);
